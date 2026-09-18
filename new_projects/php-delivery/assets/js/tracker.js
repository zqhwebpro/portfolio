/**
 * JIM & NINA'S // Little Italy Pizzeria & Ristorante // Est. 1974
 * Live Order Tracker, 5-Option Kitchen Engine & Surge Coordinator
 * Tight Modern Architecture
 */

(function () {
  let orderData = null;
  let timerInterval = null;
  let clockInterval = null;
  let lastAnnouncedStage = 0;
  let selectedOptionId = 'option-soppressata';
  let currentTimeMode = 'auto'; // 'auto' | 'peak' | 'slow' | 'standard'
  let currentPickupMethod = 'shelf'; // 'shelf' | 'curbside'

  const FALLBACK_KEY = 'jim_nina_order_state_v4';

  // 5 Authentic Italian-American Menu Cooking Options
  const MENU_OPTIONS = {
    'option-margherita': {
      id: 'option-margherita',
      name: '14" Little Italy Margherita D.O.P.',
      category: 'Classic Neapolitan Pizza',
      badge: '⚡ FASTEST PREP (12 MINS)',
      baseCookMinutes: 12,
      price: 22.00,
      icon: '🍕',
      description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, EVOO, 60-second blistered sourdough crust.',
      modifiers: [
        { name: 'Crust', value: 'Classic Leopard Blister (865°F)' },
        { name: 'Cheese', value: 'Campania Buffalo Mozzarella D.O.P.' },
        { name: 'Finishing', value: 'Cold-Pressed Sicilian EVOO & Fresh Basil' }
      ]
    },
    'option-soppressata': {
      id: 'option-soppressata',
      name: "16\" Jim & Nina's Hot Honey Pepperoni Cup Special",
      category: 'Signature House Special',
      badge: '🔥 HOUSE SPECIAL (18 MINS)',
      baseCookMinutes: 18,
      price: 26.50,
      icon: '🍯',
      description: 'Crispy cupping pepperoni, spicy calabrese soppressata, aged fior di latte, hot honey drizzle, and charred blistered crust.',
      modifiers: [
        { name: 'Crust', value: 'Well-Done Hearth Blistered' },
        { name: 'Toppings', value: 'Double Cupping Pepperoni & Fresh Oregano' },
        { name: 'Side Dip', value: "Jim & Nina's Calabrian Hot Honey Pot" }
      ]
    },
    'option-funghi': {
      id: 'option-funghi',
      name: '16" Big Mouth Sicilian Deep Dish / Forest Truffle',
      category: 'Gourmet Grandma Thick Crust',
      badge: '🍄 GRANDMA RECIPE (22 MINS)',
      baseCookMinutes: 22,
      price: 28.00,
      icon: '🌿',
      description: 'Olive-oil fried thick Sicilian crust, roasted cremini & chanterelles, fontina, roasted garlic crema, white truffle oil.',
      modifiers: [
        { name: 'Crust', value: 'Crispy Olive-Oil Fried Sicilian Pan' },
        { name: 'Sauce Base', value: 'Roasted Garlic Truffle Crema' },
        { name: 'Mushrooms', value: 'Sautéed Wild Chanterelles & Thyme' }
      ]
    },
    'option-ribeye': {
      id: 'option-ribeye',
      name: "Marcello's Stuffed Calzone & Meatball Parmigiana Platter",
      category: 'Wood-Fired Hearth Special',
      badge: "🥩 MARCELLO'S SPECIAL (28 MINS)",
      baseCookMinutes: 28,
      price: 34.50,
      icon: '🥩',
      description: "Jumbo wood-fired calzone stuffed with ricotta & mozzarella, served with Marcello's slow-simmered beef meatballs & garlic knots.",
      modifiers: [
        { name: 'Preparation', value: 'Hearth Baked with Garlic Butter Glaze' },
        { name: 'Cheese', value: 'Whole Milk Ricotta & Aged Provolone' },
        { name: 'Side', value: '4 Jumbo Garlic Knots & Warm Marinara' }
      ]
    },
    'option-feast': {
      id: 'option-feast',
      name: 'The Godfather Grand Feast for the Family (Serves 4-6)',
      category: 'Family Sharing Banquet',
      badge: '👑 GRAND FEAST (35 MINS)',
      baseCookMinutes: 35,
      price: 74.00,
      icon: '👑',
      description: "Two 16\" Hearth Pizzas (Jim & Nina's Special & Margherita), 8 Jumbo Garlic Knots, Stuffed Mozzarella Sticks, Marinara Pots, and 4 Italian Sodas.",
      modifiers: [
        { name: 'Pizza 1', value: "16\" Jim & Nina's Hot Honey Pepperoni" },
        { name: 'Pizza 2', value: '16" Little Italy Margherita D.O.P.' },
        { name: 'Sides & Drinks', value: '8 Jumbo Garlic Knots & 4 San Pellegrino Sodas' }
      ]
    }
  };

  // Kitchen stage descriptions
  const STAGE_DESCRIPTIONS = {
    1: {
      name: 'Order Received & Dough Tossed',
      tagline: 'Hand-stretched sourdough & San Marzano base',
      desc: 'Dough tossed high, ladled with grandma’s simmered gravy and shredded Grande mozzarella.'
    },
    2: {
      name: 'Stone Deck & Wood Oven Firing',
      tagline: 'Blistering at 865°F on stone hearth deck',
      desc: 'Rotating on seasoned stone deck under roaring oak flames for classic blistered crust.'
    },
    3: {
      name: 'Boxed & Garlic Butter Glazed',
      tagline: 'Hot honey drizzle, pecorino & thermal pack',
      desc: 'Drizzled with hot honey, fresh basil, pecorino romano, and packed in insulated thermal box.'
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
        description: 'Full house in the dining room! Ovens running at maximum capacity (+10 mins added).',
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
        description: 'Quiet neighborhood hours. Pizzaiolo fires your pie immediately on hot deck (-10 mins boost).',
        badgeClass: 'badge-green',
        bannerClass: 'surge-banner-slow'
      };
    }

    if (mode === 'standard') {
      return {
        status: 'STANDARD',
        adjustmentMinutes: 0,
        marker: '🟡 STANDARD KITCHEN PACE (±0m)',
        label: 'Standard Kitchen Pace (±0 mins)',
        description: 'Nominal stone deck prep and firing workflow.',
        badgeClass: 'badge-gold',
        bannerClass: 'surge-banner-standard'
      };
    }

    // Automatic detection based on current live clock
    const d = epochMs ? new Date(epochMs) : new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const timeDecimal = hours + (minutes / 60.0);

    // Peak Rush Windows: Lunch 11:30-13:30, Dinner 17:30-20:30
    if ((timeDecimal >= 11.5 && timeDecimal <= 13.5) || (timeDecimal >= 17.5 && timeDecimal <= 20.5)) {
      return {
        status: 'PEAK',
        adjustmentMinutes: 10,
        marker: '🔥 PEAK DINNER RUSH (+10m)',
        label: 'Peak Rush Hour (+10 mins stone deck queue surge)',
        description: 'Live neighborhood dinner rush active. Wood ovens firing at maximum capacity (+10m surge).',
        badgeClass: 'badge-red',
        bannerClass: 'surge-banner-peak'
      };
    }

    // Slow Lull Windows: Late night/morning 22:00-11:00, Afternoon 14:30-16:30
    if (timeDecimal >= 22.0 || timeDecimal < 11.0 || (timeDecimal >= 14.5 && timeDecimal <= 16.5)) {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Lull (-10 mins express oven boost)',
        description: 'Quiet neighborhood lull. Fresh dough fires immediately on hot stone deck (-10m boost).',
        badgeClass: 'badge-green',
        bannerClass: 'surge-banner-slow'
      };
    }

    return {
      status: 'STANDARD',
      adjustmentMinutes: 0,
      marker: '🟡 STANDARD KITCHEN PACE (±0m)',
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
   * Render the 5 Dish Cards in the Menu Selection Screen
   */
  function renderMenuDishCards() {
    const container = document.getElementById('dish-cards-container');
    if (!container) return;

    const surge = resolveTimeOfDaySurge(currentTimeMode);

    container.innerHTML = Object.values(MENU_OPTIONS).map(opt => {
      const isSelected = opt.id === selectedOptionId;
      const adjustedCookTime = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);
      
      return `
        <div class="dish-card ${isSelected ? 'selected' : ''}" onclick="window.selectMenuOption('${opt.id}')">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.6rem; line-height: 1;">${opt.icon}</span>
                <div>
                  <h4 style="font-family: var(--font-serif); font-size: 0.98rem; font-weight: 800; color: var(--slate-900); margin: 0; line-height: 1.2;">
                    ${opt.name}
                  </h4>
                  <div style="font-size: 0.72rem; color: var(--slate-600); font-family: var(--font-mono); margin-top: 2px;">
                    ${opt.category}
                  </div>
                </div>
              </div>
              <div class="dish-radio"></div>
            </div>

            <p style="font-size: 0.8rem; color: var(--slate-600); line-height: 1.4; margin: 0.45rem 0 0.85rem;">
              ${opt.description}
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 0.65rem; margin-top: 0.25rem;">
            <div style="display: flex; align-items: center; gap: 0.35rem;">
              <span class="badge badge-slate" style="font-size: 0.72rem;">
                ⏱️ ${adjustedCookTime}m
              </span>
              ${surge.adjustmentMinutes !== 0 ? `<span style="font-size: 0.68rem; font-family: var(--font-mono); color: ${surge.adjustmentMinutes > 0 ? 'var(--italian-red-dark)' : 'var(--basil-green-dark)'}; font-weight: 700;">(${surge.adjustmentMinutes > 0 ? '+' : ''}${surge.adjustmentMinutes}m rush)</span>` : ''}
            </div>
            <span class="font-mono" style="font-size: 0.95rem; font-weight: 800; color: var(--slate-900);">
              $${opt.price.toFixed(2)}
            </span>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Update the Dynamic Selection Summary in the Menu Screen
   */
  function updateSelectionSummary() {
    const opt = MENU_OPTIONS[selectedOptionId] || MENU_OPTIONS['option-soppressata'];
    const surge = resolveTimeOfDaySurge(currentTimeMode);

    const crustSelect = document.getElementById('modifier-crust-select');
    const dipSelect = document.getElementById('modifier-dip-select');

    const crustVal = crustSelect ? crustSelect.value : 'Classic Leopard Blister (865°F)';
    const dipVal = dipSelect ? dipSelect.value : 'Calabrian Hot Honey Pot ($2.50)';

    let extraSaucePrice = 0.00;
    if (dipVal.includes('2.50')) extraSaucePrice = 2.50;
    else if (dipVal.includes('2.00')) extraSaucePrice = 2.00;
    else if (dipVal.includes('3.50')) extraSaucePrice = 3.50;
    else if (dipVal.includes('1.50')) extraSaucePrice = 1.50;

    const finalMinutes = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);

    // Update Hero pill
    const heroCalc = document.getElementById('selection-calc-pill-hero');
    const heroBreakdown = document.getElementById('selection-calc-breakdown-hero');
    if (heroCalc) heroCalc.innerText = `~${finalMinutes} mins`;
    if (heroBreakdown) {
      const sign = surge.adjustmentMinutes > 0 ? '+' : (surge.adjustmentMinutes < 0 ? '-' : '±');
      heroBreakdown.innerText = `${opt.baseCookMinutes}m Base ${sign} ${Math.abs(surge.adjustmentMinutes)}m Surge`;
    }

    // Update Surge banner
    const banner = document.getElementById('menu-surge-banner');
    if (banner) {
      banner.className = `surge-status-banner ${surge.bannerClass}`;
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.45rem;">
          <span style="font-weight: 800; font-family: var(--font-mono); font-size: 0.8rem;">${surge.marker}</span>
          <span>— ${surge.description}</span>
        </div>
        <span class="badge ${surge.badgeClass}">${surge.status} LOAD</span>
      `;
    }

    // Update summary ticket
    const nameEl = document.getElementById('summary-dish-name');
    const priceEl = document.getElementById('summary-dish-price');
    const catEl = document.getElementById('summary-dish-category');
    const crustDetailEl = document.getElementById('summary-crust-detail');
    const dipDetailEl = document.getElementById('summary-dip-detail');
    const baseTimeEl = document.getElementById('summary-base-cook-time');
    const surgeTimeEl = document.getElementById('summary-surge-cook-time');
    const totalTimeEl = document.getElementById('summary-total-ready-time');

    if (nameEl) nameEl.innerText = opt.name;
    if (priceEl) priceEl.innerText = `$${opt.price.toFixed(2)}`;
    if (catEl) catEl.innerText = opt.category;
    if (crustDetailEl) crustDetailEl.innerText = `Crust: ${crustVal}`;
    if (dipDetailEl) dipDetailEl.innerText = `Sauce: ${dipVal}`;
    if (baseTimeEl) baseTimeEl.innerText = `${opt.baseCookMinutes} mins`;
    if (surgeTimeEl) {
      surgeTimeEl.innerText = surge.adjustmentMinutes !== 0 ? `${surge.adjustmentMinutes > 0 ? '+' : ''}${surge.adjustmentMinutes} mins` : '±0 mins';
      surgeTimeEl.style.color = surge.adjustmentMinutes > 0 ? 'var(--italian-red-dark)' : (surge.adjustmentMinutes < 0 ? 'var(--basil-green-dark)' : 'var(--slate-600)');
    }
    if (totalTimeEl) totalTimeEl.innerText = `~${finalMinutes} mins`;

    // Pricing
    const itemSubtotal = opt.price + extraSaucePrice;
    const tax = itemSubtotal * 0.0875;
    const tip = itemSubtotal * 0.20;
    const total = itemSubtotal + tax + tip;

    const subtotalEl = document.getElementById('summary-subtotal-price');
    const taxEl = document.getElementById('summary-tax-price');
    const tipEl = document.getElementById('summary-tip-price');
    const totalEl = document.getElementById('summary-total-price');

    if (subtotalEl) subtotalEl.innerText = `$${itemSubtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${tax.toFixed(2)}`;
    if (tipEl) tipEl.innerText = `$${tip.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;

    // Update Pickup buttons
    const shelfBtn = document.getElementById('pickup-btn-shelf');
    const curbsideBtn = document.getElementById('pickup-btn-curbside');
    if (shelfBtn && curbsideBtn) {
      if (currentPickupMethod === 'shelf') {
        shelfBtn.style.background = 'var(--slate-900)';
        shelfBtn.style.color = '#FFF';
        shelfBtn.style.borderColor = 'var(--slate-900)';
        curbsideBtn.style.background = '#FFF';
        curbsideBtn.style.color = 'var(--slate-800)';
        curbsideBtn.style.borderColor = 'var(--border-medium)';
      } else {
        curbsideBtn.style.background = 'var(--slate-900)';
        curbsideBtn.style.color = '#FFF';
        curbsideBtn.style.borderColor = 'var(--slate-900)';
        shelfBtn.style.background = '#FFF';
        shelfBtn.style.color = 'var(--slate-800)';
        shelfBtn.style.borderColor = 'var(--border-medium)';
      }
    }
  }

  /**
   * Select a Menu Option
   */
  window.selectMenuOption = function (optId) {
    if (!MENU_OPTIONS[optId]) return;
    selectedOptionId = optId;
    if (window.KitchenAudio) window.KitchenAudio.playTone(440, 'sine', 0.08, 0.1);
    renderMenuDishCards();
    updateSelectionSummary();
  };

  /**
   * Set Time Mode
   */
  window.setTimeMode = function (mode) {
    currentTimeMode = mode;
    document.querySelectorAll('[data-time-mode]').forEach(btn => {
      if (btn.getAttribute('data-time-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (window.KitchenAudio) window.KitchenAudio.playTone(520, 'triangle', 0.1, 0.12);
    renderMenuDishCards();
    updateSelectionSummary();
  };

  /**
   * Set Pickup Method
   */
  window.setPickupMethod = function (method) {
    currentPickupMethod = method;
    if (window.KitchenAudio) window.KitchenAudio.playTone(480, 'sine', 0.08, 0.1);
    updateSelectionSummary();
  };

  /**
   * Switch View: Show Starting Menu Selection View
   */
  window.showMenuSelectionView = function () {
    const menuView = document.getElementById('view-menu-selection');
    const trackerView = document.getElementById('view-order-tracker');
    const navMenu = document.getElementById('nav-btn-menu');
    const navTracker = document.getElementById('nav-btn-tracker');

    if (menuView) menuView.classList.add('active');
    if (trackerView) trackerView.classList.remove('active');

    if (navMenu) {
      navMenu.className = 'btn-slate';
    }
    if (navTracker) {
      navTracker.className = 'btn-slate-secondary';
    }

    renderMenuDishCards();
    updateSelectionSummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Switch View: Show Live Kitchen Progress Tracker View
   */
  window.showTrackerView = function () {
    const menuView = document.getElementById('view-menu-selection');
    const trackerView = document.getElementById('view-order-tracker');
    const navMenu = document.getElementById('nav-btn-menu');
    const navTracker = document.getElementById('nav-btn-tracker');
    const navIndicator = document.getElementById('nav-tracker-indicator');

    if (menuView) menuView.classList.remove('active');
    if (trackerView) trackerView.classList.add('active');

    if (navMenu) {
      navMenu.className = 'btn-slate-secondary';
    }
    if (navTracker) {
      navTracker.className = 'btn-slate';
    }
    if (navIndicator) {
      navIndicator.style.display = 'inline-block';
    }

    renderDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Fire Order to Stone Deck Kitchen
   */
  window.fireOrderToKitchen = function () {
    const opt = MENU_OPTIONS[selectedOptionId] || MENU_OPTIONS['option-soppressata'];
    const surge = resolveTimeOfDaySurge(currentTimeMode);

    const crustSelect = document.getElementById('modifier-crust-select');
    const dipSelect = document.getElementById('modifier-dip-select');

    const crustVal = crustSelect ? crustSelect.value : 'Classic Leopard Blister (865°F)';
    const dipVal = dipSelect ? dipSelect.value : 'Calabrian Hot Honey Pot ($2.50)';

    let extraSaucePrice = 0.00;
    if (dipVal.includes('2.50')) extraSaucePrice = 2.50;
    else if (dipVal.includes('2.00')) extraSaucePrice = 2.00;
    else if (dipVal.includes('3.50')) extraSaucePrice = 3.50;
    else if (dipVal.includes('1.50')) extraSaucePrice = 1.50;

    const finalMinutes = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);
    const totalDurationMs = finalMinutes * 60 * 1000;
    const nowMs = Date.now();
    const placedAt = nowMs;
    const targetReadyAt = placedAt + totalDurationMs;

    const subtotal = opt.price + extraSaucePrice;
    const tax = subtotal * 0.0875;
    const tip = subtotal * 0.20;
    const total = subtotal + tax + tip;

    const orderNumber = '#JN-' + Math.floor(10000 + Math.random() * 90000);

    const customerPickup = currentPickupMethod === 'shelf' ? 'Store Pickup (Express Shelf #B-04)' : 'Curbside Delivery (Mulberry Bay #3)';
    const shelfOrBay = currentPickupMethod === 'shelf' ? 'SHELF #B-04' : 'BAY #3';

    orderData = {
      orderNumber: orderNumber,
      placedAt: placedAt,
      placedAtFormatted: formatTimeShort(placedAt),
      targetReadyAt: targetReadyAt,
      totalDurationMs: totalDurationMs,
      baseCookMinutes: opt.baseCookMinutes,
      surgeAdjustmentMinutes: surge.adjustmentMinutes,
      surgeStatus: surge.status,
      surgeLabel: surge.label,
      surgeMarker: surge.marker,
      selectedOptionId: opt.id,
      currentStageId: 1,
      customer: {
        name: 'Zachery H.',
        phone: '(555) 749-2041',
        pickupType: customerPickup,
        shelf: shelfOrBay,
        vehicle: 'Silver Audi A4 (Mulberry Bay 3)'
      },
      store: {
        name: "Jim & Nina's Little Italy Pizzeria",
        address: '142 Mulberry Street, Little Italy, NYC',
        district: 'Historic Pizzeria Quarter',
        phone: '(555) 749-NINA',
        ovenTemp: '865°F',
        woodSource: 'Stone Deck & Wood-Fired Hearth'
      },
      items: [
        {
          id: 'item-primary',
          name: opt.name,
          category: opt.category,
          description: opt.description,
          quantity: 1,
          unitPrice: opt.price,
          totalPrice: opt.price,
          modifiers: [
            { name: 'Crust Style', value: crustVal },
            { name: 'Finishing Sauce', value: dipVal }
          ]
        }
      ],
      pricing: {
        subtotal: subtotal,
        tax: tax,
        artisanSurcharge: 0.00,
        tip: tip,
        total: total,
        paymentMethod: 'Apple Pay (•••• 4821)'
      }
    };

    localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));

    // Play sound
    if (window.KitchenAudio) window.KitchenAudio.playOrderPlaced();

    // Switch to tracker view
    showTrackerView();
  };

  /**
   * Render the Tracker Dashboard
   */
  function renderDashboard() {
    if (!orderData) return;

    // Order number
    const orderNumBadge = document.getElementById('order-number-badge');
    const receiptOrderNum = document.getElementById('receipt-order-num');
    if (orderNumBadge) orderNumBadge.innerText = `ORDER ${orderData.orderNumber}`;
    if (receiptOrderNum) receiptOrderNum.innerText = orderData.orderNumber;

    // Surge Marker
    const surgeMarker = document.getElementById('hero-surge-marker');
    if (surgeMarker) {
      surgeMarker.innerText = orderData.surgeMarker;
      surgeMarker.className = `badge ${orderData.surgeAdjustmentMinutes > 0 ? 'badge-red' : (orderData.surgeAdjustmentMinutes < 0 ? 'badge-green' : 'badge-gold')}`;
    }

    // Pickup Pill
    const pickupPill = document.getElementById('hero-pickup-pill');
    if (pickupPill) {
      pickupPill.innerText = orderData.customer.pickupType;
    }

    // Immutable Timestamps
    const metaPlaced = document.getElementById('meta-placed-time');
    const metaTarget = document.getElementById('meta-target-ready');
    const metaShelf = document.getElementById('meta-shelf');

    if (metaPlaced) metaPlaced.innerText = orderData.placedAtFormatted;
    if (metaTarget) metaTarget.innerText = formatTimeShort(orderData.targetReadyAt);
    if (metaShelf) metaShelf.innerText = orderData.customer.shelf;

    // Render receipt items
    renderReceiptCard();

    // Start timer interval
    startTimer();
  }

  /**
   * Render Receipt Card
   */
  function renderReceiptCard() {
    const container = document.getElementById('receipt-items-container');
    if (!container || !orderData) return;

    container.innerHTML = orderData.items.map(item => `
      <div style="background: var(--slate-50); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 0.85rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
          <span style="font-weight: 800; font-size: 0.85rem; color: var(--slate-900);">
            ${item.quantity}x ${item.name}
          </span>
          <span class="font-mono" style="font-weight: 800; font-size: 0.85rem; color: var(--slate-900);">
            $${item.totalPrice.toFixed(2)}
          </span>
        </div>
        
        <div style="font-size: 0.72rem; color: var(--slate-600); margin-bottom: 0.45rem;">
          ${item.category}
        </div>

        <div style="border-top: 1px dashed var(--border-medium); padding-top: 0.45rem; font-size: 0.74rem; color: var(--slate-700); display: flex; flex-direction: column; gap: 0.2rem;">
          ${item.modifiers.map(m => `
            <div>• <span style="color: var(--slate-600);">${m.name}:</span> <strong>${m.value}</strong></div>
          `).join('')}
        </div>
      </div>
    `).join('');

    const subtotalEl = document.getElementById('pricing-subtotal');
    const taxEl = document.getElementById('pricing-tax');
    const tipEl = document.getElementById('pricing-tip');
    const totalEl = document.getElementById('pricing-total');

    if (subtotalEl) subtotalEl.innerText = `$${orderData.pricing.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${orderData.pricing.tax.toFixed(2)}`;
    if (tipEl) tipEl.innerText = `$${orderData.pricing.tip.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `$${orderData.pricing.total.toFixed(2)}`;
  }

  /**
   * Start Live Timer Engine
   */
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    updateProgress();
    timerInterval = setInterval(updateProgress, 1000);
  }

  /**
   * Update Progress Cycle
   */
  function updateProgress() {
    if (!orderData) return;

    const now = Date.now();
    const placed = orderData.placedAt;
    const target = orderData.targetReadyAt;
    const total = orderData.totalDurationMs;

    const elapsed = Math.max(0, now - placed);
    const remainingMs = Math.max(0, target - now);
    const remainingSecs = Math.ceil(remainingMs / 1000);

    const progressRatio = Math.min(1, Math.max(0, elapsed / total));

    // Update Digital Countdown
    const countdownEl = document.getElementById('countdown-digits');
    if (countdownEl) {
      countdownEl.innerText = formatCountdown(remainingSecs);
    }

    // Update SVG Progress Ring (circumference: 2 * PI * 70 = 439.82)
    const circle = document.getElementById('countdown-svg-circle');
    if (circle) {
      const circ = 439.82;
      const offset = circ - (progressRatio * circ);
      circle.style.strokeDashoffset = offset;
    }

    // Determine Stage
    let stageId = 1;
    if (progressRatio >= 0.98 || remainingSecs <= 0) {
      stageId = 4;
    } else if (progressRatio >= 0.65) {
      stageId = 3;
    } else if (progressRatio >= 0.25) {
      stageId = 2;
    } else {
      stageId = 1;
    }

    orderData.currentStageId = stageId;
    updatePipelineUI(stageId, progressRatio, remainingSecs);
  }

  /**
   * Update Pipeline Nodes and Descriptions
   */
  function updatePipelineUI(stageId, progressRatio, remainingSecs) {
    const stageInfo = STAGE_DESCRIPTIONS[stageId];
    if (!stageInfo) return;

    // Sound alert on stage advance
    if (stageId > lastAnnouncedStage && lastAnnouncedStage !== 0) {
      if (stageId === 4 && window.KitchenAudio) {
        window.KitchenAudio.playReadyAlert();
      } else if (window.KitchenAudio) {
        window.KitchenAudio.playStageAdvance(stageId);
      }
    }
    lastAnnouncedStage = stageId;

    // Update Hero Text
    const heroTitle = document.getElementById('hero-title-text');
    const heroSubtext = document.getElementById('hero-subtext');
    const heroBadge = document.getElementById('hero-status-badge');

    if (heroTitle) {
      if (stageId === 4) {
        heroTitle.innerHTML = `<span style="color: var(--basil-green-dark);">PIZZA READY FOR PICKUP!</span>`;
      } else {
        const minsLeft = Math.max(1, Math.ceil(remainingSecs / 60));
        heroTitle.innerHTML = `Ready in <span style="color: var(--mozzarella-gold-dark);">~${minsLeft} mins</span>`;
      }
    }

    if (heroSubtext) {
      heroSubtext.innerText = stageInfo.desc;
    }

    if (heroBadge) {
      heroBadge.innerHTML = `<span class="live-dot${stageId === 4 ? '-green' : ''}"></span> STAGE ${stageId} OF 4: ${stageInfo.name.toUpperCase()}`;
      heroBadge.className = `badge ${stageId === 4 ? 'badge-green' : (stageId === 2 ? 'badge-red' : 'badge-gold')}`;
    }

    // Update Progress Rail Fill
    const railFill = document.getElementById('pipeline-rail-fill');
    if (railFill) {
      const pct = Math.min(100, Math.max(5, progressRatio * 100));
      railFill.style.width = `${pct}%`;
    }

    // Update 4 Stage Nodes
    for (let i = 1; i <= 4; i++) {
      const node = document.getElementById(`stage-node-${i}`);
      const text = document.getElementById(`stage-text-${i}`);
      if (!node || !text) continue;

      if (i < stageId) {
        node.className = 'pipeline-node completed';
        text.style.fontWeight = '800';
        text.style.color = 'var(--slate-900)';
      } else if (i === stageId) {
        node.className = 'pipeline-node active';
        text.style.fontWeight = '800';
        text.style.color = 'var(--slate-900)';
      } else {
        node.className = 'pipeline-node';
        text.style.fontWeight = '600';
        text.style.color = 'var(--slate-600)';
      }
    }

    // Stage callout card
    const calloutTitle = document.getElementById('stage-callout-title');
    const calloutTag = document.getElementById('stage-callout-tag');
    const calloutDesc = document.getElementById('stage-callout-desc');

    if (calloutTitle) calloutTitle.innerText = `STAGE ${stageId} OF 4: ${stageInfo.name.toUpperCase()}`;
    if (calloutTag) calloutTag.innerText = stageInfo.tagline;
    if (calloutDesc) calloutDesc.innerText = stageInfo.desc;
  }

  /**
   * Set Demo Stage Simulator (1 - 4)
   */
  window.setDemoStage = function (targetStage) {
    if (!orderData) return;
    const total = orderData.totalDurationMs;
    const now = Date.now();

    let offsetRatio = 0.1;
    if (targetStage === 2) offsetRatio = 0.35;
    else if (targetStage === 3) offsetRatio = 0.75;
    else if (targetStage === 4) offsetRatio = 1.0;

    orderData.placedAt = now - (total * offsetRatio);
    orderData.targetReadyAt = orderData.placedAt + total;
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));

    updateProgress();
    if (window.KitchenAudio) window.KitchenAudio.playTone(600, 'sine', 0.1, 0.15);
  };

  /**
   * Reset Order
   */
  window.resetOrder = function () {
    if (timerInterval) clearInterval(timerInterval);
    localStorage.removeItem(FALLBACK_KEY);
    orderData = null;
    lastAnnouncedStage = 0;

    const navIndicator = document.getElementById('nav-tracker-indicator');
    if (navIndicator) navIndicator.style.display = 'none';

    if (window.KitchenAudio) window.KitchenAudio.playTone(300, 'sawtooth', 0.15, 0.2);

    showMenuSelectionView();
  };

  /**
   * Receipt Modal Open / Close
   */
  window.openReceiptModal = function () {
    const modal = document.getElementById('receipt-modal');
    const content = document.getElementById('printable-thermal-content');
    if (!modal || !content || !orderData) return;

    const item = orderData.items[0];

    content.innerHTML = `
      <div style="text-align: center; border-bottom: 1px dashed var(--border-dark); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
        <div style="font-size: 1.25rem; font-weight: 900; font-family: var(--font-serif); color: var(--slate-900);">
          JIM &amp; NINA'S PIZZERIA
        </div>
        <div style="font-size: 0.75rem; color: var(--slate-700);">
          142 Mulberry St, Little Italy, NYC // (555) 749-NINA
        </div>
        <div style="font-size: 0.72rem; color: var(--slate-600); margin-top: 2px;">
          Stone Deck Hearth 865°F // Est. 1974
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.5rem; color: var(--slate-800);">
        <span>CHECK ${orderData.orderNumber}</span>
        <span>${orderData.placedAtFormatted}</span>
      </div>

      <div style="font-size: 0.78rem; margin-bottom: 0.65rem; color: var(--slate-800);">
        <div>GUEST: ${orderData.customer.name}</div>
        <div>METHOD: ${orderData.customer.pickupType}</div>
      </div>

      <div style="border-top: 1px dashed var(--border-dark); border-bottom: 1px dashed var(--border-dark); padding: 0.65rem 0; margin-bottom: 0.75rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 0.85rem; color: var(--slate-900); margin-bottom: 0.25rem;">
          <span>${item.quantity}x ${item.name}</span>
          <span>$${item.totalPrice.toFixed(2)}</span>
        </div>
        ${item.modifiers.map(m => `
          <div style="font-size: 0.72rem; color: var(--slate-600); padding-left: 0.5rem;">
            + ${m.name}: ${m.value}
          </div>
        `).join('')}
      </div>

      <div style="font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.75rem; color: var(--slate-800);">
        <div style="display: flex; justify-content: space-between;">
          <span>SUBTOTAL:</span>
          <span>$${orderData.pricing.subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>NYC SALES TAX (8.75%):</span>
          <span>$${orderData.pricing.tax.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>PIZZAIOLO GRATITUDE TIP (20%):</span>
          <span>$${orderData.pricing.tip.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 1.1rem; color: var(--slate-900); border-top: 1px solid var(--border-dark); padding-top: 0.4rem; margin-top: 0.2rem;">
          <span>TOTAL:</span>
          <span>$${orderData.pricing.total.toFixed(2)}</span>
        </div>
      </div>

      <div style="text-align: center; font-size: 0.72rem; color: var(--slate-600); border-top: 1px dashed var(--border-dark); padding-top: 0.65rem;">
        <div>★ GRAZIE MILLE! BUON APPETITO! ★</div>
        <div>AUTHENTIC STONE DECK OVEN BAKE</div>
      </div>
    `;

    modal.classList.add('open');
  };

  window.closeReceiptModal = function () {
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.remove('open');
  };

  window.printGuestCheck = function () {
    window.print();
  };

  /**
   * Start Top Live Clock
   */
  function startHeaderClock() {
    function updateClock() {
      const now = new Date();
      const timeStr = formatTimeString(now.getTime());
      const headerClock = document.getElementById('header-clock-display');
      const surgeClock = document.getElementById('surge-current-time-badge');

      if (headerClock) headerClock.innerText = `🕒 LIVE: ${timeStr}`;
      if (surgeClock) surgeClock.innerText = `LIVE: ${timeStr}`;
    }

    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }

  /**
   * Initialize App on DOMContentLoaded
   */
  function init() {
    startHeaderClock();

    // Check if there is an active order in localStorage
    const saved = localStorage.getItem(FALLBACK_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.placedAt && parsed.targetReadyAt) {
          orderData = parsed;
          showTrackerView();
          return;
        }
      } catch (e) {}
    }

    // Default: Show the Starting Mock Menu Selection Screen!
    showMenuSelectionView();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
