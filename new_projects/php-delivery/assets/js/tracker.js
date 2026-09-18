/**
 * EST 1974 // Artisanal Stone Deck Pizzeria & Dispatch
 * All-In-One Screen Multi-Item Menu & Live Real-Time Pizza Tracker
 */

(function () {
  let orderData = null;
  let timerInterval = null;
  let clockInterval = null;
  let lastAnnouncedStage = 0;
  let currentTimeMode = 'auto'; // 'auto' | 'peak' | 'slow' | 'standard'
  let currentPickupMethod = 'shelf'; // 'shelf' | 'curbside'

  const FALLBACK_KEY = 'est1974_pizzeria_order_v5';

  // Multi-item cart storage { 'option-id': quantity }
  let cart = {
    'option-soppressata': 1
  };

  // Comprehensive Authentic Italian Menu Options across 4 Categories
  const MENU_DATABASE = {
    pizzas: {
      categoryName: '🍕 Wood-Fired Specialty Pizzas',
      items: [
        {
          id: 'option-margherita',
          name: '14" Little Italy Margherita D.O.P.',
          tag: 'Classic Neapolitan',
          baseCookMinutes: 12,
          price: 22.00,
          icon: '🍕',
          description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, Genovese basil, cold-pressed Sicilian EVOO, 60-second blistered crust.'
        },
        {
          id: 'option-soppressata',
          name: '16" Hot Honey & Cupping Pepperoni Special',
          tag: 'House Signature',
          baseCookMinutes: 18,
          price: 26.50,
          icon: '🍯',
          description: 'Crispy cupping pepperoni, spicy calabrese soppressata, fior di latte, aged pecorino, and chili-infused hot honey drizzle.'
        },
        {
          id: 'option-funghi',
          name: '16" Wild Forest Truffle & Fontina Sicilian Pan',
          tag: 'Grandma Thick Crust',
          baseCookMinutes: 22,
          price: 28.00,
          icon: '🍄',
          description: 'Olive-oil fried crispy Sicilian crust, roasted cremini & chanterelles, fontina, roasted garlic crema, white truffle essence.'
        },
        {
          id: 'option-quattro',
          name: '16" Quattro Formaggi Bianca con Aglio',
          tag: 'White Pie',
          baseCookMinutes: 15,
          price: 25.00,
          icon: '🧀',
          description: 'Aged Gorgonzola dolce, fontina, smoked provolone, whole milk ricotta, roasted garlic cloves, and fresh garden rosemary.'
        }
      ]
    },
    starters: {
      categoryName: '🥖 Artisan Starters & Small Plates',
      items: [
        {
          id: 'option-garlic-knots',
          name: 'Jumbo Garlic Knots Basket (6pc with Marinara)',
          tag: 'Fresh Baked',
          baseCookMinutes: 8,
          price: 7.50,
          icon: '🥖',
          description: 'Hand-twisted sourdough knots brushed with melted garlic butter, pecorino romano, and fresh parsley with warm marinara.'
        },
        {
          id: 'option-arancini',
          name: 'Crispy Bolognese Stuffed Arancini (3pc)',
          tag: 'Chef Special',
          baseCookMinutes: 10,
          price: 10.50,
          icon: '🍘',
          description: 'Golden saffron risotto spheres filled with slow-cooked beef bolognese and smoked mozzarella, served with truffle aioli.'
        }
      ]
    },
    calzones: {
      categoryName: '🥩 Wood-Fired Calzones & Platters',
      items: [
        {
          id: 'option-calzone',
          name: "Marcello's Stuffed Calzone & Meatball Platter",
          tag: 'Hearth Platter',
          baseCookMinutes: 28,
          price: 34.50,
          icon: '🥩',
          description: "Jumbo calzone stuffed with ricotta & mozzarella, served with Marcello's slow-simmered beef meatballs and garlic knots."
        },
        {
          id: 'option-feast',
          name: 'The Godfather Family Banquet (Serves 4-6)',
          tag: 'Feast Banquet',
          baseCookMinutes: 35,
          price: 74.00,
          icon: '👑',
          description: 'Two 16" Hearth Pizzas, 8 Jumbo Garlic Knots, Stuffed Mozzarella Sticks, Marinara Pots, and 4 San Pellegrino Sodas.'
        }
      ]
    },
    sweets: {
      categoryName: '🍨 Dolci & Chilled Beverages',
      items: [
        {
          id: 'option-tiramisu',
          name: "Grandma's Espresso & Mascarpone Tiramisu",
          tag: 'Artisan Dolce',
          baseCookMinutes: 0,
          price: 8.50,
          icon: '🍨',
          description: 'Espresso-soaked savoiardi ladyfingers, velvety mascarpone cream, and Dutch dark cocoa dust.'
        },
        {
          id: 'option-soda',
          name: 'San Pellegrino Aranciata Rossa (Blood Orange)',
          tag: 'Imported Soda',
          baseCookMinutes: 0,
          price: 3.75,
          icon: '🍊',
          description: 'Chilled sparkling Italian blood orange soda in signature glass bottle.'
        }
      ]
    }
  };

  // Helper map for fast lookup
  const ALL_ITEMS_MAP = {};
  Object.values(MENU_DATABASE).forEach(cat => {
    cat.items.forEach(item => {
      ALL_ITEMS_MAP[item.id] = item;
    });
  });

  const STAGE_DESCRIPTIONS = {
    1: {
      name: 'Order Received & Dough Tossed',
      tagline: 'Hand-stretched sourdough & San Marzano base',
      desc: 'Dough tossed high, ladled with grandma’s simmered gravy and shredded fresh Grande mozzarella.'
    },
    2: {
      name: 'Stone Deck & Wood Oven Firing',
      tagline: 'Blistering at 865°F on stone hearth deck',
      desc: 'Rotating on seasoned stone deck under roaring oak flames for classic blistered crust.'
    },
    3: {
      name: 'Boxed & Hot Honey Glazed',
      tagline: 'Pecorino drizzle & thermal insulation pack',
      desc: 'Drizzled with hot honey, fresh Genovese basil, pecorino romano, and packed in insulated thermal box.'
    },
    4: {
      name: 'Hot on the Counter',
      tagline: 'Awaiting pickup on Express Shelf #B-04',
      desc: 'Hot, blistered, and ready! Grab your order from Shelf #B-04 or curbside bay #3.'
    }
  };

  /**
   * Time-of-Day Surge Calculation Engine
   * Accounts for current time and applies +10m peak or -10m slow adjustments
   */
  function resolveTimeOfDaySurge(mode = 'auto', epochMs = null) {
    if (mode === 'peak') {
      return {
        status: 'PEAK',
        adjustmentMinutes: 10,
        marker: '🔥 PEAK DINNER RUSH (+10m)',
        label: 'Peak Dinner Rush (+10 mins stone deck queue surge)',
        description: 'Dining room full! Wood ovens running at maximum capacity (+10 mins surge).',
        badgeClass: 'badge-red',
        bannerClass: 'surge-banner-peak'
      };
    }

    if (mode === 'slow') {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Speed Lull (-10 mins express oven boost)',
        description: 'Quiet neighborhood hours. Pizzaiolo fires your order immediately on hot stone deck (-10 mins boost).',
        badgeClass: 'badge-green',
        bannerClass: 'surge-banner-slow'
      };
    }

    if (mode === 'standard') {
      return {
        status: 'STANDARD',
        adjustmentMinutes: 0,
        marker: '🟡 NOMINAL KITCHEN PACE (±0m)',
        label: 'Standard Kitchen Pace (±0 mins)',
        description: 'Nominal stone deck prep and firing workflow.',
        badgeClass: 'badge-gold',
        bannerClass: 'surge-banner-standard'
      };
    }

    // Auto based on current clock
    const d = epochMs ? new Date(epochMs) : new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const timeDecimal = hours + (minutes / 60.0);

    // Peak: 11:30-13:30 or 17:30-20:30
    if ((timeDecimal >= 11.5 && timeDecimal <= 13.5) || (timeDecimal >= 17.5 && timeDecimal <= 20.5)) {
      return {
        status: 'PEAK',
        adjustmentMinutes: 10,
        marker: '🔥 PEAK DINNER RUSH (+10m)',
        label: 'Peak Rush Hour (+10 mins stone deck queue surge)',
        description: 'Live dinner rush active. Wood ovens firing at maximum capacity (+10m surge).',
        badgeClass: 'badge-red',
        bannerClass: 'surge-banner-peak'
      };
    }

    // Slow: Late night/morning or mid-afternoon
    if (timeDecimal >= 22.0 || timeDecimal < 11.0 || (timeDecimal >= 14.5 && timeDecimal <= 16.5)) {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Lull (-10 mins express oven boost)',
        description: 'Quiet neighborhood lull. Fresh dough fires immediately on stone deck (-10m boost).',
        badgeClass: 'badge-green',
        bannerClass: 'surge-banner-slow'
      };
    }

    return {
      status: 'STANDARD',
      adjustmentMinutes: 0,
      marker: '🟡 NOMINAL KITCHEN PACE (±0m)',
      label: 'Standard Kitchen Pace (±0 mins)',
      description: 'Nominal stone deck prep and firing workflow.',
      badgeClass: 'badge-gold',
      bannerClass: 'surge-banner-standard'
    };
  }

  function formatTimeString(epochMs) {
    const d = new Date(epochMs);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const seconds = d.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes}:${seconds} ${ampm}`;
  }

  function formatTimeShort(epochMs) {
    const d = new Date(epochMs);
    let hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function formatCountdown(secs) {
    if (secs <= 0) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Render All Menu Categories and Dishes on One Screen
   */
  function renderAllMenuSections() {
    const container = document.getElementById('all-menu-sections-container');
    if (!container) return;

    const surge = resolveTimeOfDaySurge(currentTimeMode);

    let html = '';

    Object.values(MENU_DATABASE).forEach(cat => {
      html += `
        <div style="margin-bottom: 1.5rem;">
          <div class="menu-category-divider">
            <h3 class="menu-category-title">${cat.categoryName}</h3>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 1rem;">
            ${cat.items.map(item => {
              const qty = cart[item.id] || 0;
              const hasQty = qty > 0;
              const adjustedCook = item.baseCookMinutes > 0 ? Math.max(5, item.baseCookMinutes + surge.adjustmentMinutes) : 0;

              return `
                <div class="menu-item-card ${hasQty ? 'has-qty' : ''}" id="card-${item.id}">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
                      <div style="display: flex; align-items: center; gap: 0.6rem;">
                        <div class="menu-item-thumb">${item.icon}</div>
                        <div>
                          <h4 style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0; line-height: 1.2;">
                            ${item.name}
                          </h4>
                          <span class="badge badge-slate" style="font-size: 0.68rem; margin-top: 2px;">
                            ${item.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin: 0.45rem 0 0.85rem;">
                      ${item.description}
                    </p>
                  </div>

                  <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 0.65rem; margin-top: 0.25rem;">
                    <div>
                      <div style="font-family: var(--font-mono); font-size: 1.05rem; font-weight: 800; color: var(--text-primary);">
                        $${item.price.toFixed(2)}
                      </div>
                      ${item.baseCookMinutes > 0 ? `
                        <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">
                          ⏱️ ~${adjustedCook}m bake
                        </div>
                      ` : `
                        <div style="font-size: 0.72rem; color: var(--basil-green-dark); font-family: var(--font-mono);">
                          ⚡ Instant ready
                        </div>
                      `}
                    </div>

                    <div>
                      ${hasQty ? `
                        <div class="qty-stepper">
                          <button class="qty-btn" onclick="window.changeItemQty('${item.id}', -1)" title="Remove 1">-</button>
                          <span class="qty-count">${qty}</span>
                          <button class="qty-btn" onclick="window.changeItemQty('${item.id}', 1)" title="Add 1">+</button>
                        </div>
                      ` : `
                        <button class="btn-add-item-direct" onclick="window.changeItemQty('${item.id}', 1)">
                          <i class="fa-solid fa-plus"></i> Add
                        </button>
                      `}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  /**
   * Cart Operations
   */
  window.changeItemQty = function (id, delta) {
    const current = cart[id] || 0;
    const next = current + delta;

    if (next <= 0) {
      delete cart[id];
    } else {
      cart[id] = next;
    }

    if (window.KitchenAudio) {
      if (delta > 0) window.KitchenAudio.playClick();
      else window.KitchenAudio.playThud();
    }

    renderAllMenuSections();
    updateOrderTicket();
  };

  window.removeItemFromCart = function (id) {
    delete cart[id];
    if (window.KitchenAudio) window.KitchenAudio.playThud();
    renderAllMenuSections();
    updateOrderTicket();
  };

  /**
   * Update the Compact Order Ticket on the Right
   */
  function updateOrderTicket() {
    const surge = resolveTimeOfDaySurge(currentTimeMode);

    const ticketListEl = document.getElementById('ticket-items-container');
    const subtotalEl = document.getElementById('ticket-subtotal-price');
    const taxEl = document.getElementById('ticket-tax-price');
    const tipEl = document.getElementById('ticket-tip-price');
    const totalEl = document.getElementById('ticket-total-price');
    const readyTimeEl = document.getElementById('ticket-ready-time');
    const readySubtextEl = document.getElementById('ticket-ready-subtext');
    const fireBtn = document.getElementById('btn-fire-mock-order');
    const heroReadyPill = document.getElementById('hero-ready-pill');

    const itemIds = Object.keys(cart);
    let subtotal = 0;
    let maxCookMinutes = 0;
    let totalItemsCount = 0;

    let itemsHtml = '';

    if (itemIds.length === 0) {
      itemsHtml = `
        <div style="text-align: center; padding: 1.5rem 0.5rem; color: var(--text-muted); font-size: 0.82rem;">
          <div style="font-size: 1.8rem; margin-bottom: 0.35rem;">🧾</div>
          <strong>No items on ticket yet</strong>
          <div style="font-size: 0.74rem; margin-top: 2px;">Click "+ Add" on any dish to order</div>
        </div>
      `;
    } else {
      itemIds.forEach(id => {
        const item = ALL_ITEMS_MAP[id];
        const qty = cart[id];
        if (!item || qty <= 0) return;

        const lineTotal = item.price * qty;
        subtotal += lineTotal;
        totalItemsCount += qty;
        if (item.baseCookMinutes > maxCookMinutes) {
          maxCookMinutes = item.baseCookMinutes;
        }

        itemsHtml += `
          <div class="ticket-item-row">
            <div style="display: flex; align-items: center; gap: 0.4rem; flex: 1;">
              <span style="font-size: 1rem;">${item.icon}</span>
              <div>
                <div class="ticket-item-name">${qty}x ${item.name}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">
                  $${item.price.toFixed(2)} ea
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 0.4rem;">
              <span class="font-mono" style="font-weight: 800; font-size: 0.84rem; color: var(--text-primary);">
                $${lineTotal.toFixed(2)}
              </span>
              <button class="ticket-delete-btn" onclick="window.removeItemFromCart('${item.id}')" title="Remove item">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        `;
      });
    }

    if (ticketListEl) ticketListEl.innerHTML = itemsHtml;

    // Time calculations: Longest cook time + rush surge
    const totalMinutes = maxCookMinutes > 0 ? Math.max(5, maxCookMinutes + surge.adjustmentMinutes) : 5;

    const tax = subtotal * 0.08875;
    const tip = subtotal > 0 ? subtotal * 0.20 : 0;
    const grandTotal = subtotal + tax + tip;

    if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${tax.toFixed(2)}`;
    if (tipEl) tipEl.innerText = `$${tip.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${grandTotal.toFixed(2)}`;

    if (readyTimeEl) readyTimeEl.innerText = `~${totalMinutes} mins`;
    if (readySubtextEl) {
      readySubtextEl.innerText = `${maxCookMinutes}m Base Max ${surge.adjustmentMinutes >= 0 ? '+' : ''}${surge.adjustmentMinutes}m Surge`;
    }

    if (heroReadyPill) {
      heroReadyPill.innerText = `~${totalMinutes} mins ready time (${totalItemsCount} items)`;
    }

    // Update fire button state
    if (fireBtn) {
      if (itemIds.length === 0) {
        fireBtn.disabled = true;
        fireBtn.innerHTML = `<span>Select Items on Menu to Fire</span>`;
      } else {
        fireBtn.disabled = false;
        fireBtn.innerHTML = `
          <span style="font-size: 1.1rem;">🔥</span>
          <span>Fire Order &amp; Launch Pizza Tracker ($${grandTotal.toFixed(2)})</span>
        `;
      }
    }

    // Update Surge Banner in Menu
    const surgeBannerEl = document.getElementById('menu-surge-banner');
    if (surgeBannerEl) {
      surgeBannerEl.className = `surge-status-banner ${surge.bannerClass}`;
      surgeBannerEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.45rem;">
          <span>${surge.status === 'PEAK' ? '🔥' : (surge.status === 'SLOW' ? '⚡' : '🟡')}</span>
          <span>${surge.label}</span>
        </div>
        <span class="badge ${surge.badgeClass}">${surge.marker}</span>
      `;
    }
  }

  /**
   * Set Simulation Rush Mode
   */
  window.setTimeMode = function (mode) {
    currentTimeMode = mode;
    if (window.KitchenAudio) window.KitchenAudio.playClick();

    document.querySelectorAll('.segmented-btn').forEach(btn => {
      if (btn.getAttribute('data-time-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderAllMenuSections();
    updateOrderTicket();
  };

  /**
   * Set Pickup Method
   */
  window.setPickupMethod = function (method) {
    currentPickupMethod = method;
    if (window.KitchenAudio) window.KitchenAudio.playClick();

    const shelfBtn = document.getElementById('pickup-btn-shelf');
    const curbsideBtn = document.getElementById('pickup-btn-curbside');

    if (shelfBtn && curbsideBtn) {
      if (method === 'shelf') {
        shelfBtn.className = 'btn-slate';
        curbsideBtn.className = 'btn-slate-secondary';
      } else {
        shelfBtn.className = 'btn-slate-secondary';
        curbsideBtn.className = 'btn-slate';
      }
    }
  };

  /**
   * Fire Order & Launch Pizza Tracker View
   */
  window.fireOrderToKitchen = function () {
    const itemIds = Object.keys(cart);
    if (itemIds.length === 0) return;

    const surge = resolveTimeOfDaySurge(currentTimeMode);

    let maxCookMinutes = 0;
    let subtotal = 0;
    const itemsList = [];

    itemIds.forEach(id => {
      const item = ALL_ITEMS_MAP[id];
      const qty = cart[id];
      if (!item || qty <= 0) return;

      subtotal += item.price * qty;
      if (item.baseCookMinutes > maxCookMinutes) {
        maxCookMinutes = item.baseCookMinutes;
      }

      itemsList.push({
        id: item.id,
        name: item.name,
        quantity: qty,
        price: item.price,
        lineTotal: item.price * qty,
        icon: item.icon
      });
    });

    const totalMinutes = maxCookMinutes > 0 ? Math.max(5, maxCookMinutes + surge.adjustmentMinutes) : 5;
    const now = Date.now();
    const readyEpoch = now + (totalMinutes * 60 * 1000);
    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    const tax = subtotal * 0.08875;
    const tip = subtotal * 0.20;
    const grandTotal = subtotal + tax + tip;

    orderData = {
      orderNumber: `EST-${orderNumber}`,
      items: itemsList,
      subtotal: subtotal,
      tax: tax,
      tip: tip,
      total: grandTotal,
      pickupMethod: currentPickupMethod === 'shelf' ? 'Store Shelf #B-04' : 'Curbside Bay #3',
      baseCookMinutes: maxCookMinutes,
      surgeAdjustment: surge.adjustmentMinutes,
      surgeStatus: surge.status,
      surgeMarker: surge.marker,
      totalMinutes: totalMinutes,
      placedEpoch: now,
      readyEpoch: readyEpoch,
      currentStage: 1,
      ovenTemp: '865°F (White Oak & Hard Maple)'
    };

    localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));

    if (window.KitchenAudio) {
      window.KitchenAudio.playBell();
    }

    window.showTrackerView();
    startLiveTracker();
  };

  /**
   * View Switchers
   */
  window.showMenuSelectionView = function () {
    const menuView = document.getElementById('view-menu-selection');
    const trackerView = document.getElementById('view-order-tracker');
    const navMenuBtn = document.getElementById('nav-btn-menu');
    const navTrackerBtn = document.getElementById('nav-btn-tracker');

    if (menuView && trackerView) {
      menuView.classList.add('active');
      trackerView.classList.remove('active');
    }

    if (navMenuBtn && navTrackerBtn) {
      navMenuBtn.className = 'btn-slate';
      navTrackerBtn.className = 'btn-slate-secondary';
    }
  };

  window.showTrackerView = function () {
    const menuView = document.getElementById('view-menu-selection');
    const trackerView = document.getElementById('view-order-tracker');
    const navMenuBtn = document.getElementById('nav-btn-menu');
    const navTrackerBtn = document.getElementById('nav-btn-tracker');

    if (menuView && trackerView) {
      menuView.classList.remove('active');
      trackerView.classList.add('active');
    }

    if (navMenuBtn && navTrackerBtn) {
      navMenuBtn.className = 'btn-slate-secondary';
      navTrackerBtn.className = 'btn-slate';
    }

    populateTrackerViewUI();
  };

  /**
   * Reset Order & Return to Menu
   */
  window.resetOrder = function () {
    if (timerInterval) clearInterval(timerInterval);
    orderData = null;
    localStorage.removeItem(FALLBACK_KEY);
    cart = { 'option-soppressata': 1 };

    if (window.KitchenAudio) window.KitchenAudio.playClick();

    window.showMenuSelectionView();
    renderAllMenuSections();
    updateOrderTicket();
  };

  /**
   * Populate Tracker View UI
   */
  function populateTrackerViewUI() {
    if (!orderData) {
      const saved = localStorage.getItem(FALLBACK_KEY);
      if (saved) {
        try { orderData = JSON.parse(saved); } catch (e) {}
      }
    }

    if (!orderData) {
      window.showMenuSelectionView();
      return;
    }

    // Header values
    const orderNumEl = document.getElementById('tracker-order-num');
    const placedTimeEl = document.getElementById('tracker-placed-time');
    const estReadyTimeEl = document.getElementById('tracker-ready-time-target');
    const pickupLocEl = document.getElementById('tracker-pickup-loc');
    const surgePillEl = document.getElementById('tracker-surge-pill');
    const orderItemsEl = document.getElementById('tracker-order-items-list');
    const totalCostEl = document.getElementById('tracker-total-cost');

    if (orderNumEl) orderNumEl.innerText = orderData.orderNumber;
    if (placedTimeEl) placedTimeEl.innerText = formatTimeShort(orderData.placedEpoch);
    if (estReadyTimeEl) estReadyTimeEl.innerText = formatTimeShort(orderData.readyEpoch);
    if (pickupLocEl) pickupLocEl.innerText = orderData.pickupMethod;
    if (totalCostEl) totalCostEl.innerText = `$${orderData.total.toFixed(2)}`;

    if (surgePillEl) {
      surgePillEl.innerText = orderData.surgeMarker;
      surgePillEl.className = `badge ${orderData.surgeAdjustment > 0 ? 'badge-red' : (orderData.surgeAdjustment < 0 ? 'badge-green' : 'badge-gold')}`;
    }

    if (orderItemsEl) {
      orderItemsEl.innerHTML = orderData.items.map(it => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0; border-bottom: 1px dotted var(--border-light); font-size: 0.84rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span>${it.icon}</span>
            <span style="font-weight: 700; color: var(--text-primary);">${it.quantity}x ${it.name}</span>
          </div>
          <span class="font-mono" style="font-weight: 800; color: var(--text-primary);">$${it.lineTotal.toFixed(2)}</span>
        </div>
      `).join('');
    }
  }

  /**
   * Start Live Tracker Timer Loop
   */
  function startLiveTracker() {
    if (timerInterval) clearInterval(timerInterval);

    function tick() {
      if (!orderData) return;

      const now = Date.now();
      const totalSecs = Math.max(1, (orderData.readyEpoch - orderData.placedEpoch) / 1000);
      const remainingSecs = Math.max(0, Math.floor((orderData.readyEpoch - now) / 1000));
      const elapsedSecs = totalSecs - remainingSecs;
      const progressRatio = Math.min(1.0, Math.max(0, elapsedSecs / totalSecs));

      // Calculate Stage 1 to 4
      let stage = 1;
      if (progressRatio >= 0.95) stage = 4;
      else if (progressRatio >= 0.60) stage = 3;
      else if (progressRatio >= 0.25) stage = 2;
      else stage = 1;

      orderData.currentStage = stage;

      // Audio notification on new stage
      if (stage !== lastAnnouncedStage && lastAnnouncedStage !== 0) {
        if (window.KitchenAudio) window.KitchenAudio.playBell();
      }
      lastAnnouncedStage = stage;

      // Update Countdown Clock
      const clockEl = document.getElementById('tracker-countdown-display');
      const progressFillEl = document.getElementById('tracker-progress-fill');
      const stageNameEl = document.getElementById('tracker-stage-title');
      const stageDescEl = document.getElementById('tracker-stage-desc');

      if (clockEl) {
        clockEl.innerText = formatCountdown(remainingSecs);
      }
      if (progressFillEl) {
        progressFillEl.style.width = `${progressRatio * 100}%`;
      }

      const stageInfo = STAGE_DESCRIPTIONS[stage];
      if (stageNameEl && stageInfo) stageNameEl.innerText = stageInfo.name;
      if (stageDescEl && stageInfo) stageDescEl.innerText = stageInfo.desc;

      // Update 4-step stepper UI
      for (let s = 1; s <= 4; s++) {
        const stepEl = document.getElementById(`step-card-${s}`);
        if (stepEl) {
          if (s < stage) {
            stepEl.className = 'tracker-step-item completed';
          } else if (s === stage) {
            stepEl.className = 'tracker-step-item active';
          } else {
            stepEl.className = 'tracker-step-item';
          }
        }
      }

      // If finished
      if (remainingSecs <= 0) {
        if (clockEl) clockEl.innerText = 'READY!';
      }
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  /**
   * Top Clock Live Display
   */
  function startClock() {
    if (clockInterval) clearInterval(clockInterval);

    function update() {
      const now = Date.now();
      const str = formatTimeString(now);
      const headerClock = document.getElementById('header-clock-display');
      const surgeClock = document.getElementById('surge-current-time-badge');

      if (headerClock) headerClock.innerText = `🕒 LIVE: ${str}`;
      if (surgeClock) surgeClock.innerText = `LIVE: ${formatTimeShort(now)}`;
    }

    update();
    clockInterval = setInterval(update, 1000);
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    startClock();
    renderAllMenuSections();
    updateOrderTicket();

    // Check if there was an active order
    const saved = localStorage.getItem(FALLBACK_KEY);
    if (saved) {
      try {
        orderData = JSON.parse(saved);
        if (orderData && orderData.readyEpoch > Date.now()) {
          window.showTrackerView();
          startLiveTracker();
        } else {
          window.showMenuSelectionView();
        }
      } catch (e) {
        window.showMenuSelectionView();
      }
    } else {
      window.showMenuSelectionView();
    }
  });

})();
