/**
 * EST 1974 // Artisanal Stone Deck Pizzeria & Live Dispatch
 * All-In-One Screen Menu & Full-Space Real-Time Pizza Tracker
 * (SFX Completely Removed)
 */

(function () {
  let orderData = null;
  let timerInterval = null;
  let clockInterval = null;
  let currentPickupMethod = 'shelf'; // 'shelf' | 'curbside'

  const STORAGE_KEY = 'est1974_pizzeria_order_v7';

  // Multi-item cart storage { 'option-id': quantity }
  let cart = {
    'option-pepperoni': 1,
    'option-garlic-knots': 1
  };

  // Comprehensive Authentic Italian Menu Database
  const MENU_DATABASE = {
    pizzas: {
      categoryName: 'Wood-Fired Specialty Pizzas',
      icon: '🍕',
      items: [
        {
          id: 'option-pepperoni',
          name: '16" Hot Honey & Cupping Pepperoni',
          tag: 'House Signature',
          baseCookMinutes: 18,
          price: 26.50,
          img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
          description: 'Crispy cupping pepperoni, spicy calabrese soppressata, fior di latte mozzarella, aged pecorino, and chili-infused hot honey drizzle.'
        },
        {
          id: 'option-margherita',
          name: '14" Little Italy Margherita D.O.P.',
          tag: 'Classic Neapolitan',
          baseCookMinutes: 12,
          price: 22.00,
          img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&auto=format&fit=crop&q=80',
          description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, Genovese basil, cold-pressed Sicilian EVOO, 60-second blistered crust.'
        },
        {
          id: 'option-truffle',
          name: '16" Wild Forest Truffle & Fontina Pan',
          tag: 'Sicilian Thick Crust',
          baseCookMinutes: 22,
          price: 28.00,
          img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
          description: 'Olive-oil fried crispy Sicilian crust, roasted cremini & chanterelles, fontina, roasted garlic crema, white truffle essence.'
        },
        {
          id: 'option-quattro',
          name: '16" Quattro Formaggi Bianca con Aglio',
          tag: 'White Pie',
          baseCookMinutes: 15,
          price: 25.00,
          img: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?w=600&auto=format&fit=crop&q=80',
          description: 'Aged Gorgonzola dolce, fontina, smoked provolone, whole milk ricotta, roasted garlic cloves, and fresh garden rosemary.'
        },
        {
          id: 'option-diavola',
          name: '16" Spicy Diavola Calabrian Salami',
          tag: 'Fire Roasted',
          baseCookMinutes: 16,
          price: 27.00,
          img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80',
          description: 'Spicy Calabrian chili paste, cured hot salami, roasted red peppers, smoked provolone, and fresh crushed basil.'
        },
        {
          id: 'option-bbq-smoke',
          name: '16" BBQ Brick-Oven Chicken Specialty',
          tag: 'Chef Special',
          baseCookMinutes: 18,
          price: 26.00,
          img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80',
          description: 'Hickory smoked chicken breast, sweet smoky BBQ reduction, red onion shavings, cilantro, and smoked gouda blend.'
        }
      ]
    },
    starters: {
      categoryName: 'Artisan Starters & Small Plates',
      icon: '🥖',
      items: [
        {
          id: 'option-garlic-knots',
          name: 'Jumbo Garlic Knots Basket (6pc)',
          tag: 'Fresh Baked',
          baseCookMinutes: 8,
          price: 7.50,
          img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80',
          description: 'Hand-twisted sourdough knots brushed with melted garlic butter, pecorino romano, and fresh parsley with warm marinara dip.'
        },
        {
          id: 'option-arancini',
          name: 'Crispy Bolognese Stuffed Arancini (3pc)',
          tag: 'House Special',
          baseCookMinutes: 10,
          price: 10.50,
          img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
          description: 'Golden saffron risotto spheres filled with slow-cooked beef bolognese and smoked mozzarella, served with truffle aioli.'
        }
      ]
    },
    calzones: {
      categoryName: 'Wood-Fired Calzones & Platters',
      icon: '🥩',
      items: [
        {
          id: 'option-calzone',
          name: "Marcello's Stuffed Calzone & Meatball Platter",
          tag: 'Hearth Platter',
          baseCookMinutes: 28,
          price: 34.50,
          img: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=600&auto=format&fit=crop&q=80',
          description: "Jumbo calzone stuffed with ricotta & mozzarella, served with Marcello's slow-simmered beef meatballs and garlic knots."
        },
        {
          id: 'option-feast',
          name: 'The Godfather Family Banquet (Serves 4-6)',
          tag: 'Feast Banquet',
          baseCookMinutes: 35,
          price: 74.00,
          img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&auto=format&fit=crop&q=80',
          description: 'Two 16" Hearth Pizzas, 8 Jumbo Garlic Knots, Stuffed Mozzarella Sticks, Marinara Pots, and 4 San Pellegrino Sodas.'
        }
      ]
    },
    sweets: {
      categoryName: 'Dolci & Chilled Beverages',
      icon: '🍨',
      items: [
        {
          id: 'option-tiramisu',
          name: "Grandma's Espresso & Mascarpone Tiramisu",
          tag: 'Artisan Dolce',
          baseCookMinutes: 0,
          price: 8.50,
          img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&auto=format&fit=crop&q=80',
          description: 'Espresso-soaked savoiardi ladyfingers, velvety mascarpone cream, and Dutch dark cocoa dust.'
        },
        {
          id: 'option-soda',
          name: 'San Pellegrino Aranciata Rossa (Blood Orange)',
          tag: 'Chilled Can',
          baseCookMinutes: 0,
          price: 3.75,
          img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&auto=format&fit=crop&q=80',
          description: 'Sparkling Italian citrus soda crafted with sun-ripened Mediterranean blood oranges.'
        }
      ]
    }
  };

  function getAllItemsFlat() {
    const list = [];
    Object.keys(MENU_DATABASE).forEach(catKey => {
      MENU_DATABASE[catKey].items.forEach(item => {
        list.push({ ...item, categoryKey: catKey });
      });
    });
    return list;
  }

  function findItemById(id) {
    const all = getAllItemsFlat();
    return all.find(item => item.id === id);
  }

  function calculateCartTotals() {
    let subtotal = 0;
    let maxBaseCookMinutes = 0;
    let totalItemCount = 0;

    Object.keys(cart).forEach(id => {
      const qty = cart[id];
      if (qty > 0) {
        const item = findItemById(id);
        if (item) {
          subtotal += item.price * qty;
          totalItemCount += qty;
          if (item.baseCookMinutes > maxBaseCookMinutes) {
            maxBaseCookMinutes = item.baseCookMinutes;
          }
        }
      }
    });

    if (maxBaseCookMinutes === 0 && totalItemCount > 0) {
      maxBaseCookMinutes = 15;
    }

    const finalEstimatedMinutes = maxBaseCookMinutes || 18;
    const tax = subtotal * 0.08875; // NYC Tax
    const tip = subtotal > 0 ? subtotal * 0.20 : 0; // 20% Pizzaiolo Gratuity
    const grandTotal = subtotal + tax + tip;

    return {
      subtotal,
      tax,
      tip,
      grandTotal,
      finalEstimatedMinutes,
      totalItemCount
    };
  }

  // Render All Menu Sections on One Screen (No Category Filter Bar)
  function renderAppMenu() {
    const container = document.getElementById('menu-items-grid-container');
    if (!container) return;

    let html = '';

    Object.keys(MENU_DATABASE).forEach(catKey => {
      const cat = MENU_DATABASE[catKey];
      html += `
        <div class="menu-category-divider" style="grid-column: 1 / -1;">
          <h3 class="menu-category-divider-title">
            <span>${cat.icon}</span>
            <span>${cat.categoryName}</span>
          </h3>
        </div>
      `;

      cat.items.forEach(item => {
        const qty = cart[item.id] || 0;
        html += `
          <div class="food-item-card" data-item-id="${item.id}">
            <div class="food-image-container">
              <img src="${item.img}" alt="${item.name}" loading="lazy" />
              <span class="food-item-tag">${item.tag}</span>
            </div>

            <div>
              <h4 class="food-item-title">${item.name}</h4>
              <p class="food-item-desc">${item.description}</p>
            </div>

            <div class="food-card-bottom-row">
              <div class="food-size-price-pill">
                <span>Large</span>
                <span class="food-price-val">$${item.price.toFixed(2)}</span>
              </div>

              <div class="food-qty-stepper">
                ${qty > 0 ? `
                  <button class="stepper-btn" onclick="window.updateItemQuantity('${item.id}', -1)" title="Decrease">-</button>
                  <span class="stepper-qty">${qty}</span>
                  <button class="stepper-btn" onclick="window.updateItemQuantity('${item.id}', 1)" title="Increase">+</button>
                ` : `
                  <button class="btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.76rem;" onclick="window.updateItemQuantity('${item.id}', 1)">
                    + Add to Order
                  </button>
                `}
              </div>
            </div>
          </div>
        `;
      });
    });

    container.innerHTML = html;
    updateCartUI();
  }

  function updateCartUI() {
    const totals = calculateCartTotals();

    // Update Bottom Order Bar (Off-White Area)
    const orderBar = document.getElementById('bottom-order-bar');
    const badgeEl = document.getElementById('order-bar-badge');
    const timeEl = document.getElementById('order-bar-ready-time');
    const totalEl = document.getElementById('order-bar-total-price');

    if (badgeEl) badgeEl.innerText = `${totals.totalItemCount} Item${totals.totalItemCount !== 1 ? 's' : ''}`;
    if (timeEl) timeEl.innerText = `Ready in ~${totals.finalEstimatedMinutes} mins`;
    if (totalEl) totalEl.innerText = `$${totals.grandTotal.toFixed(2)}`;

    if (orderBar) {
      if (totals.totalItemCount > 0) {
        orderBar.classList.remove('hidden');
      } else {
        orderBar.classList.add('hidden');
      }
    }

    // Update Header cart count
    const headerCartBtn = document.getElementById('header-cart-btn-text');
    if (headerCartBtn) {
      headerCartBtn.innerText = `Cart (${totals.totalItemCount})`;
    }
  }

  // Quantity Management
  window.updateItemQuantity = function (id, delta) {
    const current = cart[id] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) {
      delete cart[id];
    } else {
      cart[id] = next;
    }
    renderAppMenu();
  };

  window.setPickupMethod = function (method) {
    currentPickupMethod = method;
    const shelfBtn = document.getElementById('pickup-btn-shelf');
    const curbsideBtn = document.getElementById('pickup-btn-curbside');
    if (shelfBtn) shelfBtn.classList.toggle('active', method === 'shelf');
    if (curbsideBtn) curbsideBtn.classList.toggle('active', method === 'curbside');
  };

  // =========================================================================
  // SUBMIT ORDER & TRANSITION TO FULL-SCREEN LIVE TRACKER
  // =========================================================================
  window.fireOrderToKitchen = function () {
    const totals = calculateCartTotals();
    if (totals.totalItemCount === 0) {
      alert('Please select at least one menu item before submitting your order.');
      return;
    }

    const itemsOrdered = [];
    Object.keys(cart).forEach(id => {
      const qty = cart[id];
      if (qty > 0) {
        const it = findItemById(id);
        if (it) {
          itemsOrdered.push({
            id: it.id,
            name: it.name,
            qty: qty,
            price: it.price,
            lineTotal: it.price * qty
          });
        }
      }
    });

    const now = new Date();
    const orderNumber = 'EST-' + Math.floor(1000 + Math.random() * 9000);
    const durationSeconds = totals.finalEstimatedMinutes * 60;
    const readyDate = new Date(now.getTime() + durationSeconds * 1000);

    orderData = {
      orderNumber: orderNumber,
      placedAt: now.toISOString(),
      placedAtFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      readyAtFormatted: readyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedMinutes: totals.finalEstimatedMinutes,
      durationSeconds: durationSeconds,
      pickupMethod: currentPickupMethod === 'shelf' ? 'Store Shelf #B-04' : 'Curbside Bay #3',
      totals: totals,
      items: itemsOrdered,
      currentStage: 1,
      startTimeMs: Date.now()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));

    // Automatically transition to the Full-Screen Live Tracker
    window.showTrackerView();
  };

  window.showMenuSelectionView = function () {
    document.getElementById('view-menu-selection')?.classList.add('active');
    document.getElementById('view-order-tracker')?.classList.remove('active');
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    renderAppMenu();
  };

  window.showTrackerView = function () {
    document.getElementById('view-menu-selection')?.classList.remove('active');
    document.getElementById('view-order-tracker')?.classList.add('active');
    if (typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    initTrackerEngine();
  };

  window.resetOrder = function () {
    cart = { 'option-pepperoni': 1, 'option-garlic-knots': 1 };
    orderData = null;
    localStorage.removeItem(STORAGE_KEY);
    if (timerInterval) clearInterval(timerInterval);
    window.showMenuSelectionView();
  };

  // =========================================================================
  // LIVE TRACKER DASHBOARD ENGINE
  // =========================================================================
  function initTrackerEngine() {
    if (!orderData) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          orderData = JSON.parse(stored);
        } catch (e) {}
      }
    }

    if (!orderData) {
      // Create default active order
      const totals = calculateCartTotals();
      const now = new Date();
      const durationSeconds = 18 * 60;
      const readyDate = new Date(now.getTime() + durationSeconds * 1000);

      orderData = {
        orderNumber: 'EST-7492',
        placedAt: now.toISOString(),
        placedAtFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        readyAtFormatted: readyDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: 18,
        durationSeconds: durationSeconds,
        pickupMethod: 'Store Shelf #B-04',
        totals: totals,
        items: [
          { id: 'option-pepperoni', name: '16" Hot Honey & Cupping Pepperoni', qty: 1, price: 26.50, lineTotal: 26.50 },
          { id: 'option-garlic-knots', name: 'Jumbo Garlic Knots Basket (6pc)', qty: 1, price: 7.50, lineTotal: 7.50 }
        ],
        currentStage: 1,
        startTimeMs: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
    }

    // Populate static receipt & details
    const orderBadge = document.getElementById('tracker-order-id-label');
    const timestampEl = document.getElementById('tracker-placed-timestamp');
    const readyTargetEl = document.getElementById('tracker-ready-time-target');
    const pickupDestEl = document.getElementById('tracker-pickup-destination-label');

    if (orderBadge) orderBadge.innerHTML = `<span class="live-dot-red"></span> ORDER #${orderData.orderNumber}`;
    if (timestampEl) timestampEl.innerText = `Fired at ${orderData.placedAtFormatted}`;
    if (readyTargetEl) readyTargetEl.innerText = orderData.readyAtFormatted;
    if (pickupDestEl) pickupDestEl.innerText = orderData.pickupMethod;

    // Render itemized off-white guest check receipt
    const receiptContainer = document.getElementById('tracker-receipt-items-list');
    if (receiptContainer) {
      receiptContainer.innerHTML = orderData.items.map(it => `
        <div class="receipt-item-row">
          <div>
            <span class="receipt-item-name">${it.name}</span>
            <span class="receipt-item-qty">×${it.qty}</span>
          </div>
          <span class="receipt-item-price">$${it.lineTotal.toFixed(2)}</span>
        </div>
      `).join('');
    }

    const subEl = document.getElementById('tracker-subtotal-val');
    const taxEl = document.getElementById('tracker-tax-val');
    const tipEl = document.getElementById('tracker-tip-val');
    const grandEl = document.getElementById('tracker-grandtotal-val');

    if (subEl) subEl.innerText = `$${orderData.totals.subtotal.toFixed(2)}`;
    if (taxEl) taxEl.innerText = `$${orderData.totals.tax.toFixed(2)}`;
    if (tipEl) tipEl.innerText = `$${orderData.totals.tip.toFixed(2)}`;
    if (grandEl) grandEl.innerText = `$${orderData.totals.grandTotal.toFixed(2)}`;

    // Start Live Second-by-Second Countdown Timer
    startLiveCountdown();
  }

  function startLiveCountdown() {
    if (timerInterval) clearInterval(timerInterval);

    function tick() {
      if (!orderData) return;

      const elapsedSec = Math.floor((Date.now() - orderData.startTimeMs) / 1000);
      const totalSec = orderData.durationSeconds || (18 * 60);
      const remainingSec = Math.max(0, totalSec - elapsedSec);

      const mins = Math.floor(remainingSec / 60);
      const secs = remainingSec % 60;
      const countdownStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      // Update Countdown Display
      const timerDisplay = document.getElementById('tracker-countdown-val');
      if (timerDisplay) {
        timerDisplay.innerText = countdownStr;
      }

      // Progress Percentage
      const progressRatio = Math.min(1, elapsedSec / totalSec);
      const progressPercent = Math.round(progressRatio * 100);

      const progressFill = document.getElementById('tracker-progress-bar-fill');
      if (progressFill) {
        progressFill.style.width = `${Math.max(5, progressPercent)}%`;
      }

      // 4-Stage Pipeline Computation
      let stage = 1;
      if (progressRatio >= 0.88 || remainingSec === 0) stage = 4;
      else if (progressRatio >= 0.55) stage = 3;
      else if (progressRatio >= 0.25) stage = 2;
      else stage = 1;

      orderData.currentStage = stage;
      updateStageUI(stage, remainingSec);
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function updateStageUI(stage, remainingSec) {
    const STAGES = [
      {
        num: 1,
        title: "Impasto Tossed & Hand-Stretched",
        desc: "72-hour cold-fermented sourdough hand-stretched and ladled with San Marzano D.O.P. sauce."
      },
      {
        num: 2,
        title: "Sauced & Mozzarella Layered",
        desc: "Fresh fior di latte mozzarella layered with cupping pepperoni, Sicilian oregano, and aged pecorino."
      },
      {
        num: 3,
        title: "865°F White Oak Hearth Deck Bake",
        desc: "Charring and blistering on white oak hearth stones with continuous infrared oven telemetry."
      },
      {
        num: 4,
        title: "Sliced, Boxed & Ready for Pickup",
        desc: `Freshly sliced, boxed, and waiting on ${orderData ? orderData.pickupMethod : 'Store Shelf'}. Buon Appetito!`
      }
    ];

    const currentStageInfo = STAGES[stage - 1];
    const stageTitleEl = document.getElementById('tracker-stage-title-heading');
    const stageDescEl = document.getElementById('tracker-stage-description-p');

    if (stageTitleEl) stageTitleEl.innerText = currentStageInfo.title;
    if (stageDescEl) stageDescEl.innerText = currentStageInfo.desc;

    // Update Stage Cards
    for (let i = 1; i <= 4; i++) {
      const card = document.getElementById(`pipeline-stage-${i}`);
      if (card) {
        card.classList.remove('active', 'completed');
        if (i < stage) {
          card.classList.add('completed');
        } else if (i === stage) {
          card.classList.add('active');
        }
      }
    }
  }

  // Fast Forward / Speed Boost Simulator
  window.triggerSpeedBoost = function () {
    if (!orderData) return;
    const stepSec = Math.floor(orderData.durationSeconds / 4);
    orderData.startTimeMs -= (stepSec * 1000);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
  };

  // Clock in Header
  function startClock() {
    function updateHeaderClock() {
      const now = new Date();
      const str = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const clockEl = document.getElementById('header-live-clock');
      if (clockEl) clockEl.innerText = `🕒 LIVE NYC: ${str}`;
    }
    updateHeaderClock();
    clockInterval = setInterval(updateHeaderClock, 1000);
  }

  // Initialize on Load
  document.addEventListener('DOMContentLoaded', () => {
    startClock();
    renderAppMenu();

    // Check if there is an active ongoing order
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        orderData = JSON.parse(stored);
      } catch (e) {}
    }
  });
})();
