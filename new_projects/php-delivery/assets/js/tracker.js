/**
 * JIM & NINA'S // Little Italy Pizzeria & Ristorante // Est. 1974
 * Live Order Tracker, 5-Option Kitchen Engine & Surge Coordinator
 */

(function () {
  let orderData = window.ORDER_DATA || null;
  let timerInterval = null;
  let lastAnnouncedStage = 0;
  let selectedOptionId = 'option-soppressata';
  let currentTimeMode = 'auto'; // 'auto' | 'peak' | 'slow' | 'standard'

  const FALLBACK_KEY = 'jim_nina_order_state_v3';

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
      description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, EVOO, and 60-second blistered sourdough crust.',
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
      description: 'Olive-oil fried thick Sicilian crust, roasted cremini & chanterelles, fontina, roasted garlic crema, and Italian white truffle oil.',
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

  // Kitchen stage descriptions with authentic Italian flair
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
        description: 'Full house in the dining room! Ovens running at maximum capacity.',
        badgeClass: 'badge-red',
        boxClass: 'surge-box-peak'
      };
    }

    if (mode === 'slow') {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Speed Lull (-10 mins express oven boost)',
        description: 'Quiet neighborhood hours. Pizzaiolo fires your pie immediately on hot deck.',
        badgeClass: 'badge-green',
        boxClass: 'surge-box-slow'
      };
    }

    if (mode === 'standard') {
      return {
        status: 'STANDARD',
        adjustmentMinutes: 0,
        marker: '🟡 STANDARD KITCHEN PACE (±0m)',
        label: 'Standard Kitchen Pace (±0 mins)',
        description: 'Smooth kitchen flow with nominal stone deck firing times.',
        badgeClass: 'badge-gold',
        boxClass: 'surge-box-standard'
      };
    }

    // Automatic detection based on current time
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
        description: 'Neighborhood dinner rush active. Wood ovens firing at maximum capacity.',
        badgeClass: 'badge-red',
        boxClass: 'surge-box-peak'
      };
    }

    // Slow Lull Windows: Late night/morning 22:00-11:00, Afternoon 14:30-16:30
    if (timeDecimal >= 22.0 || timeDecimal < 11.0 || (timeDecimal >= 14.5 && timeDecimal <= 16.5)) {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Lull (-10 mins express oven boost)',
        description: 'Quiet neighborhood lull. Fresh dough fires immediately on hot stone deck.',
        badgeClass: 'badge-green',
        boxClass: 'surge-box-slow'
      };
    }

    return {
      status: 'STANDARD',
      adjustmentMinutes: 0,
      marker: '🟡 STANDARD KITCHEN PACE (±0m)',
      label: 'Standard Kitchen Pace (±0 mins)',
      description: 'Nominal stone deck prep and firing workflow.',
      badgeClass: 'badge-gold',
      boxClass: 'surge-box-standard'
    };
  }

  function formatTimeString(epochMs) {
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

  // Load order data or prompt creation
  function initOrderData() {
    if (orderData && orderData.placedAt && orderData.targetReadyAt) {
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));
      renderDashboard();
      return;
    }

    const saved = localStorage.getItem(FALLBACK_KEY);
    if (saved) {
      try {
        orderData = JSON.parse(saved);
        if (orderData && orderData.placedAt && orderData.targetReadyAt) {
          renderDashboard();
          return;
        }
      } catch (e) {}
    }

    // If no active order exists, create default mock order for Jim & Nina's
    const opt = MENU_OPTIONS['option-soppressata'];
    const surge = resolveTimeOfDaySurge('auto');
    const finalMinutes = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);
    const totalDurationMs = finalMinutes * 60 * 1000;
    const nowMs = Date.now();
    const placedAt = nowMs;
    const targetReadyAt = placedAt + totalDurationMs;

    const subtotal = opt.price;
    const tax = subtotal * 0.0875;
    const tip = subtotal * 0.20;
    const total = subtotal + tax + tip;

    orderData = {
      orderNumber: '#JN-' + Math.floor(10000 + Math.random() * 90000),
      placedAt: placedAt,
      placedAtFormatted: formatTimeString(placedAt),
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
        pickupType: 'Store Pickup (Express Shelf)',
        shelf: 'SHELF #B-04',
        vehicle: 'Silver Audi A4 (Curbside Bay 3)'
      },
      store: {
        name: "Jim & Nina's Little Italy Pizzeria",
        address: '142 Mulberry Street, Little Italy',
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
          modifiers: opt.modifiers || []
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
    renderDashboard();
  }

  // Render static elements from orderData
  function renderDashboard() {
    if (!orderData) return;

    // Header updates
    const headerPlacedTime = document.getElementById('header-placed-time');
    if (headerPlacedTime) headerPlacedTime.innerText = orderData.placedAtFormatted;

    const metaPlacedTime = document.getElementById('meta-placed-time');
    if (metaPlacedTime) metaPlacedTime.innerText = orderData.placedAtFormatted;

    const metaTargetReady = document.getElementById('meta-target-ready');
    if (metaTargetReady) metaTargetReady.innerText = formatTimeString(orderData.targetReadyAt);

    const metaShelf = document.getElementById('meta-shelf');
    if (metaShelf) metaShelf.innerText = orderData.customer.shelf || 'SHELF #B-04';

    const orderNumBadge = document.getElementById('order-number-badge');
    if (orderNumBadge) orderNumBadge.innerText = `ORDER ${orderData.orderNumber}`;

    const receiptOrderNum = document.getElementById('receipt-order-num');
    if (receiptOrderNum) receiptOrderNum.innerText = orderData.orderNumber;

    const receiptPlacedTime = document.getElementById('receipt-placed-time');
    if (receiptPlacedTime) receiptPlacedTime.innerText = orderData.placedAtFormatted;

    // Render Surge Indicator Marker in Hero
    const heroSurgeMarker = document.getElementById('hero-surge-marker');
    if (heroSurgeMarker) {
      heroSurgeMarker.innerText = orderData.surgeMarker || '🟡 STANDARD KITCHEN PACE (±0m)';
      heroSurgeMarker.className = `badge ${orderData.surgeStatus === 'PEAK' ? 'badge-red' : (orderData.surgeStatus === 'SLOW' ? 'badge-green' : 'badge-gold')}`;
      heroSurgeMarker.title = orderData.surgeLabel || '';
    }

    // Render Itemized Order Items
    renderReceiptItems();
  }

  function renderReceiptItems() {
    if (!orderData || !orderData.items) return;

    const itemsContainer = document.getElementById('receipt-items-container');
    const modalItemsContainer = document.getElementById('modal-receipt-items');

    let html = '';
    orderData.items.forEach(item => {
      let modsHtml = '';
      if (item.modifiers && item.modifiers.length > 0) {
        modsHtml = '<div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem;">';
        item.modifiers.forEach(mod => {
          modsHtml += `<span class="badge badge-muted" style="font-size: 0.68rem; padding: 0.15rem 0.5rem;">${mod.value}</span>`;
        });
        modsHtml += '</div>';
      }

      html += `
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--vintage-border); border-radius: var(--radius-sm); padding: 0.95rem 1.15rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
            <div style="font-weight: 800; color: #FAF5EE; font-size: 0.95rem;">
              ${item.quantity}× ${item.name}
            </div>
            <div class="font-mono" style="font-weight: 800; color: var(--mozzarella-gold); font-size: 0.95rem;">
              $${Number(item.totalPrice).toFixed(2)}
            </div>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.35;">
            ${item.description}
          </div>
          ${modsHtml}
        </div>
      `;
    });

    if (itemsContainer) itemsContainer.innerHTML = html;

    // Update Pricing Breakdown
    const subtotalEl = document.getElementById('pricing-subtotal');
    const taxEl = document.getElementById('pricing-tax');
    const tipEl = document.getElementById('pricing-tip');
    const totalEl = document.getElementById('pricing-total');

    if (orderData.pricing) {
      if (subtotalEl) subtotalEl.innerText = `$${Number(orderData.pricing.subtotal).toFixed(2)}`;
      if (taxEl) taxEl.innerText = `$${Number(orderData.pricing.tax).toFixed(2)}`;
      if (tipEl) tipEl.innerText = `$${Number(orderData.pricing.tip).toFixed(2)}`;
      if (totalEl) totalEl.innerText = `$${Number(orderData.pricing.total).toFixed(2)}`;
    }

    // Also update modal print receipt
    if (modalItemsContainer) {
      let modalHtml = '';
      orderData.items.forEach(item => {
        let mods = '';
        if (item.modifiers) {
          item.modifiers.forEach(m => {
            mods += `<div style="font-size: 0.72rem; color: #555; padding-left: 0.5rem;">* ${m.value}</div>`;
          });
        }
        modalHtml += `
          <div>
            <div style="display: flex; justify-content: space-between; font-weight: 800;">
              <span>${item.quantity}× ${item.name}</span>
              <span>$${Number(item.totalPrice).toFixed(2)}</span>
            </div>
            ${mods}
          </div>
        `;
      });
      modalItemsContainer.innerHTML = modalHtml;

      const mSub = document.getElementById('modal-subtotal');
      const mTax = document.getElementById('modal-tax');
      const mTip = document.getElementById('modal-tip');
      const mTot = document.getElementById('modal-total');
      if (mSub && orderData.pricing) mSub.innerText = `$${Number(orderData.pricing.subtotal).toFixed(2)}`;
      if (mTax && orderData.pricing) mTax.innerText = `$${Number(orderData.pricing.tax).toFixed(2)}`;
      if (mTip && orderData.pricing) mTip.innerText = `$${Number(orderData.pricing.tip).toFixed(2)}`;
      if (mTot && orderData.pricing) mTot.innerText = `$${Number(orderData.pricing.total).toFixed(2)}`;
    }
  }

  // Main tick loop
  function tick() {
    if (!orderData) return;

    const nowMs = Date.now();
    const remainingMs = Math.max(0, orderData.targetReadyAt - nowMs);
    const remainingSecs = Math.ceil(remainingMs / 1000);

    const elapsedMs = nowMs - orderData.placedAt;
    const totalMs = orderData.totalDurationMs || (18 * 60 * 1000);
    const progressRatio = Math.max(0.0, Math.min(1.0, elapsedMs / totalMs));

    // Determine Stage
    let currentStage = 1;
    if (progressRatio >= 1.0 || remainingSecs <= 0) {
      currentStage = 4;
    } else if (progressRatio >= 0.70) {
      currentStage = 3;
    } else if (progressRatio >= 0.25) {
      currentStage = 2;
    }

    // Update Countdown Text
    const countdownEl = document.getElementById('countdown-digits');
    const heroTitleEl = document.getElementById('hero-title-text');
    const heroSubtextEl = document.getElementById('hero-subtext');
    const heroCard = document.getElementById('countdown-hero-card');

    if (countdownEl) {
      countdownEl.innerText = formatCountdown(remainingSecs);
    }

    // Update Progress Ring
    const progressCircle = document.getElementById('countdown-svg-circle');
    if (progressCircle) {
      const radius = 75;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - progressRatio * circumference;
      progressCircle.style.strokeDashoffset = offset;
      if (currentStage === 4) {
        progressCircle.style.stroke = 'var(--basil-green)';
      } else {
        progressCircle.style.stroke = 'var(--italian-red)';
      }
    }

    // Update Hero UI State
    if (currentStage === 4) {
      if (heroCard) heroCard.classList.add('animate-ready-pulse');
      if (heroTitleEl) {
        heroTitleEl.innerHTML = '<span style="color: var(--basil-green);">Hot on the Counter!</span>';
      }
      if (heroSubtextEl) {
        heroSubtextEl.innerText = `Hot, blistered, and boxed under thermal warmers at ${orderData.customer.shelf || 'SHELF #B-04'}. Buon appetito!`;
      }
      const readyBadge = document.getElementById('hero-status-badge');
      if (readyBadge) {
        readyBadge.className = 'badge badge-green';
        readyBadge.innerText = 'HOT ON THE COUNTER // READY FOR PICKUP';
      }

      if (lastAnnouncedStage !== 4) {
        lastAnnouncedStage = 4;
        if (window.KitchenAudio) window.KitchenAudio.playOrderReadyFanfare();
      }
    } else {
      if (heroCard) heroCard.classList.remove('animate-ready-pulse');
      const minsRemaining = Math.max(1, Math.ceil(remainingSecs / 60));
      if (heroTitleEl) {
        heroTitleEl.innerHTML = `Ready in <span style="color: var(--mozzarella-gold);">~${minsRemaining} mins</span>`;
      }
      if (heroSubtextEl) {
        heroSubtextEl.innerText = STAGE_DESCRIPTIONS[currentStage].desc;
      }
      const readyBadge = document.getElementById('hero-status-badge');
      if (readyBadge) {
        readyBadge.className = 'badge badge-red';
        readyBadge.innerText = `LIVE STATUS: ${STAGE_DESCRIPTIONS[currentStage].name.toUpperCase()}`;
      }

      if (lastAnnouncedStage !== currentStage) {
        lastAnnouncedStage = currentStage;
        if (window.KitchenAudio) window.KitchenAudio.playStageChime(currentStage);
      }
    }

    // Update Pipeline Progress Rail
    const railFill = document.getElementById('pipeline-rail-fill');
    if (railFill) {
      railFill.style.width = `${Math.min(100, Math.max(5, progressRatio * 100))}%`;
    }

    // Update Pipeline Nodes
    for (let i = 1; i <= 4; i++) {
      const node = document.getElementById(`stage-node-${i}`);
      const text = document.getElementById(`stage-text-${i}`);
      if (!node) continue;

      if (i < currentStage) {
        node.style.background = 'var(--basil-green)';
        node.style.borderColor = 'var(--basil-green)';
        node.classList.remove('animate-oven-active');
        if (text) text.style.color = 'var(--text-primary)';
      } else if (i === currentStage) {
        node.style.background = i === 2 ? 'var(--italian-red)' : 'var(--mozzarella-gold)';
        node.style.borderColor = '#FFFFFF';
        if (i === 2) node.classList.add('animate-oven-active');
        else node.classList.remove('animate-oven-active');
        if (text) {
          text.style.color = '#FFFFFF';
          text.style.fontWeight = '800';
        }
      } else {
        node.style.background = 'var(--bg-surface-elevated)';
        node.style.borderColor = 'var(--vintage-border)';
        node.classList.remove('animate-oven-active');
        if (text) {
          text.style.color = 'var(--text-muted)';
          text.style.fontWeight = '600';
        }
      }
    }

    // Update Active Stage Callout box
    const calloutTitle = document.getElementById('stage-callout-title');
    const calloutDesc = document.getElementById('stage-callout-desc');
    const calloutTag = document.getElementById('stage-callout-tag');
    if (calloutTitle) {
      calloutTitle.innerText = `STAGE ${currentStage} OF 4: ${STAGE_DESCRIPTIONS[currentStage].name.toUpperCase()}`;
    }
    if (calloutDesc) {
      calloutDesc.innerText = STAGE_DESCRIPTIONS[currentStage].desc;
    }
    if (calloutTag) {
      calloutTag.innerText = STAGE_DESCRIPTIONS[currentStage].tagline;
    }
  }

  // --- Order Modal & Wizard Methods ---

  window.openOrderModal = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    const modal = document.getElementById('order-modal');
    if (modal) {
      modal.classList.add('active');
      renderOrderModalUI();
    }
  };

  window.closeOrderModal = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    const modal = document.getElementById('order-modal');
    if (modal) modal.classList.remove('active');
  };

  window.selectOption = function (optId) {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    selectedOptionId = optId;
    renderOrderModalUI();
  };

  window.setTimeMode = function (mode) {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    currentTimeMode = mode;
    renderOrderModalUI();
  };

  function renderOrderModalUI() {
    const opt = MENU_OPTIONS[selectedOptionId] || MENU_OPTIONS['option-soppressata'];
    const surge = resolveTimeOfDaySurge(currentTimeMode);

    // Update card selection state
    document.querySelectorAll('.menu-option-card').forEach(card => {
      const cardId = card.getAttribute('data-option-id');
      if (cardId === selectedOptionId) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // Update time pill buttons
    document.querySelectorAll('.time-pill-btn').forEach(btn => {
      const mode = btn.getAttribute('data-time-mode');
      if (mode === currentTimeMode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Surge Indicator Banner inside Modal
    const surgeBanner = document.getElementById('modal-surge-banner');
    if (surgeBanner) {
      surgeBanner.className = `surge-indicator-box ${surge.boxClass}`;
      surgeBanner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="badge ${surge.badgeClass}" style="font-size: 0.75rem;">${surge.marker}</span>
          <div>
            <div style="font-weight: 700; color: #FFF; font-size: 0.88rem;">${surge.label}</div>
            <div style="font-size: 0.76rem; color: var(--text-secondary);">${surge.description}</div>
          </div>
        </div>
        <div class="font-mono" style="font-weight: 800; font-size: 0.95rem; color: #FFF; text-align: right;">
          ${surge.adjustmentMinutes > 0 ? '+' + surge.adjustmentMinutes : surge.adjustmentMinutes} MINS
        </div>
      `;
    }

    // Compute final duration and totals
    const finalCookMinutes = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);
    const subtotal = opt.price;
    const tax = subtotal * 0.0875;
    const tip = subtotal * 0.20;
    const total = subtotal + tax + tip;

    // Update preview summary box
    const modalSummaryDish = document.getElementById('modal-summary-dish');
    const modalSummaryBaseTime = document.getElementById('modal-summary-basetime');
    const modalSummarySurge = document.getElementById('modal-summary-surge');
    const modalSummaryFinalTime = document.getElementById('modal-summary-finaltime');
    const modalSummaryTotal = document.getElementById('modal-summary-total');

    if (modalSummaryDish) modalSummaryDish.innerText = opt.name;
    if (modalSummaryBaseTime) modalSummaryBaseTime.innerText = `${opt.baseCookMinutes} mins`;
    if (modalSummarySurge) {
      modalSummarySurge.innerText = surge.adjustmentMinutes === 0 ? '±0 mins' : (surge.adjustmentMinutes > 0 ? `+${surge.adjustmentMinutes} mins (Peak)` : `${surge.adjustmentMinutes} mins (Slow)`);
      modalSummarySurge.style.color = surge.adjustmentMinutes > 0 ? '#FF6B57' : (surge.adjustmentMinutes < 0 ? '#4ADE80' : 'var(--mozzarella-gold)');
    }
    if (modalSummaryFinalTime) modalSummaryFinalTime.innerText = `~${finalCookMinutes} minutes`;
    if (modalSummaryTotal) modalSummaryTotal.innerText = `$${total.toFixed(2)}`;
  }

  // Fire Order & Start the Kitchen Clock
  window.fireOrder = function () {
    if (window.KitchenAudio) {
      window.KitchenAudio.playClick();
      window.KitchenAudio.playStageChime(1);
    }

    const opt = MENU_OPTIONS[selectedOptionId] || MENU_OPTIONS['option-soppressata'];
    const surge = resolveTimeOfDaySurge(currentTimeMode);
    const finalMinutes = Math.max(5, opt.baseCookMinutes + surge.adjustmentMinutes);
    const totalDurationMs = finalMinutes * 60 * 1000;

    const nowMs = Date.now();
    const placedAt = nowMs;
    const targetReadyAt = placedAt + totalDurationMs;
    const placedAtFormatted = formatTimeString(placedAt);

    const subtotal = opt.price;
    const tax = subtotal * 0.0875;
    const tip = subtotal * 0.20;
    const total = subtotal + tax + tip;

    const orderNumber = '#JN-' + Math.floor(10000 + Math.random() * 90000);

    const pickupTypeSelect = document.getElementById('modal-pickup-type');
    const pickupType = pickupTypeSelect ? pickupTypeSelect.value : 'Store Pickup (Express Shelf)';

    orderData = {
      orderNumber: orderNumber,
      placedAt: placedAt,
      placedAtFormatted: placedAtFormatted,
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
        pickupType: pickupType,
        shelf: 'SHELF #B-04',
        vehicle: 'Silver Audi A4 (Curbside Bay 3)'
      },
      store: {
        name: "Jim & Nina's Little Italy Pizzeria",
        address: '142 Mulberry Street, Little Italy',
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
          modifiers: opt.modifiers || []
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

    // Try posting to API in background if running on PHP server
    fetch(`./api/order.php?action=create&optionId=${opt.id}&timeMode=${currentTimeMode}&pickupType=${encodeURIComponent(pickupType)}`, {
      method: 'POST'
    }).catch(() => {});

    closeOrderModal();
    renderDashboard();
    tick();

    if (!timerInterval) {
      timerInterval = setInterval(tick, 1000);
    }
  };

  // Reset Order & Return to Option Chooser
  window.resetOrder = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    
    orderData = null;
    localStorage.removeItem(FALLBACK_KEY);
    lastAnnouncedStage = 0;

    // Reset API
    fetch('./api/order.php?action=reset', { method: 'POST' }).catch(() => {});

    // Open order creator modal
    openOrderModal();
  };

  window.setDemoStage = function (stageNum) {
    if (!orderData) return;
    if (window.KitchenAudio) window.KitchenAudio.playClick();

    stageNum = parseInt(stageNum, 10);
    const nowMs = Date.now();
    const totalDuration = orderData.totalDurationMs || (18 * 60 * 1000);

    let targetReadyAt = nowMs;
    let placedAt = nowMs - totalDuration;

    if (stageNum === 1) {
      targetReadyAt = nowMs + totalDuration;
      placedAt = nowMs;
    } else if (stageNum === 2) {
      targetReadyAt = nowMs + (totalDuration * 0.6);
      placedAt = nowMs - (totalDuration * 0.4);
    } else if (stageNum === 3) {
      targetReadyAt = nowMs + (3 * 60 * 1000);
      placedAt = nowMs - (totalDuration - 3 * 60 * 1000);
    } else if (stageNum === 4) {
      targetReadyAt = nowMs;
      placedAt = nowMs - totalDuration;
    }

    orderData.placedAt = placedAt;
    orderData.placedAtFormatted = formatTimeString(placedAt);
    orderData.targetReadyAt = targetReadyAt;
    orderData.currentStageId = stageNum;

    localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));
    tick();

    fetch(`./api/order.php?action=stage&stage=${stageNum}`, { method: 'POST' }).catch(() => {});
  };

  window.openReceiptModal = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.add('active');
  };

  window.closeReceiptModal = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    const modal = document.getElementById('receipt-modal');
    if (modal) modal.classList.remove('active');
  };

  window.printReceipt = function () {
    window.print();
  };

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initOrderData();
    tick();
    timerInterval = setInterval(tick, 1000);
  });
})();
