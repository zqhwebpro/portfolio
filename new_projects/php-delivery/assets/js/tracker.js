/**
 * FORNO & GRATE // Live Order Tracker, 5-Option Kitchen Engine & Surge Coordinator
 */

(function () {
  let orderData = window.ORDER_DATA || null;
  let timerInterval = null;
  let lastAnnouncedStage = 0;
  let selectedOptionId = 'option-soppressata';
  let currentTimeMode = 'auto'; // 'auto' | 'peak' | 'slow' | 'standard'

  const FALLBACK_KEY = 'forno_order_state_v2';

  // 5 Artisanal Menu Options with Cook Times
  const MENU_OPTIONS = {
    'option-margherita': {
      id: 'option-margherita',
      name: '14" Margherita D.O.P. & Fresh Basil',
      category: 'Express Neapolitan Pizza',
      badge: '⚡ FASTEST (12 MINS)',
      baseCookMinutes: 12,
      price: 22.00,
      icon: '🍕',
      description: 'San Marzano D.O.P. tomatoes, fresh buffalo mozzarella, fragrant Genovese basil, EVOO, and 60-second blistered sourdough crust.',
      modifiers: [
        { name: 'Crust', value: 'Light Leopard Char (900°F)' },
        { name: 'Cheese', value: 'Campania Buffalo Mozzarella D.O.P.' },
        { name: 'Finishing Oil', value: 'Cold-Pressed Tuscan EVOO' }
      ]
    },
    'option-soppressata': {
      id: 'option-soppressata',
      name: '16" Wood-Fired Hot Honey Soppressata',
      category: 'Signature Hearth Pizza',
      badge: '🔥 BESTSELLER (18 MINS)',
      baseCookMinutes: 18,
      price: 26.50,
      icon: '🍯',
      description: 'Crispy cupping pepperoni, aged spicy soppressata, fior di latte, hot honey drizzle, charred sourdough crust, and fresh basil.',
      modifiers: [
        { name: 'Crust', value: 'Blistered Well-Done (+850°F)' },
        { name: 'Toppings', value: '+ Extra Fresh Basil' },
        { name: 'Side Dip', value: "Mike's Calabrian Hot Honey Pot" }
      ]
    },
    'option-funghi': {
      id: 'option-funghi',
      name: '16" Wild Truffle & Forest Funghi',
      category: 'Gourmet White Pizza',
      badge: '🍄 CHEF CHOICE (22 MINS)',
      baseCookMinutes: 22,
      price: 28.00,
      icon: '🌿',
      description: 'Roasted cremini & chanterelle mushrooms, creamy fontina, roasted garlic crema, thyme sprigs, and Italian white truffle oil.',
      modifiers: [
        { name: 'Crust', value: 'Medium Hearth Crisp' },
        { name: 'Sauce Base', value: 'Roasted Garlic Truffle Crema' },
        { name: 'Mushrooms', value: 'Pan-Seared Chanterelles & Thyme' }
      ]
    },
    'option-ribeye': {
      id: 'option-ribeye',
      name: 'Tuscan Oak-Grilled Prime Ribeye & Broccolini',
      category: 'Wood-Fired Grill Entrée',
      badge: '🥩 HEARTH GRILL (28 MINS)',
      baseCookMinutes: 28,
      price: 38.50,
      icon: '🥩',
      description: '14oz Prime Bone-in Ribeye seared over glowing white oak coals with rosemary garlic butter, sea salt flakes, and charred broccolini.',
      modifiers: [
        { name: 'Preparation', value: 'Medium Rare (Oak Coal Seared)' },
        { name: 'Butter', value: 'Whipped Rosemary & Roasted Garlic' },
        { name: 'Side', value: 'Coal-Roasted Broccolini with Lemon Zest' }
      ]
    },
    'option-feast': {
      id: 'option-feast',
      name: 'Hearth Grand Feast for Four',
      category: 'Family Sharing Banquet',
      badge: '👑 GRAND BANQUET (35 MINS)',
      baseCookMinutes: 35,
      price: 78.00,
      icon: '👑',
      description: 'Two 16" Hearth Pizzas (Hot Honey Soppressata & Funghi), Charred Broccolini, Smoked San Marzano Dipping Pots, and 4 Blood Orange sodas.',
      modifiers: [
        { name: 'Pizza 1', value: '16" Hot Honey Soppressata' },
        { name: 'Pizza 2', value: '16" Wild Truffle & Funghi' },
        { name: 'Beverages', value: '4× San Pellegrino Blood Orange' }
      ]
    }
  };

  // Kitchen stage descriptions
  const STAGE_DESCRIPTIONS = {
    1: {
      name: 'Order Received',
      tagline: 'Ticket printed at hearth station',
      desc: 'Dough stretched and San Marzano base applied by Chef Marco.'
    },
    2: {
      name: 'Fired in Wood Oven',
      tagline: 'Blistering at 865°F over White Oak',
      desc: 'Rotating near roaring oak embers for classic leopard crust blisters.'
    },
    3: {
      name: 'Quality Check & Boxed',
      tagline: 'Finishing garnish & heat packaging',
      desc: 'Drizzling hot honey, fresh basil chiffonade & boxed in thermal container.'
    },
    4: {
      name: 'Ready on Counter',
      tagline: 'Awaiting your arrival at Shelf #B-04',
      desc: 'Placed under gentle thermal warmers. Ready for express pick-up!'
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
        marker: '🔥 PEAK RUSH (+10m)',
        label: 'Peak Dinner Rush (+10 mins oven queue surge)',
        description: 'High dining volume detected. Wood ovens at peak queue capacity.',
        badgeClass: 'badge-red',
        boxClass: 'surge-box-peak'
      };
    }

    if (mode === 'slow') {
      return {
        status: 'SLOW',
        adjustmentMinutes: -10,
        marker: '⚡ OFF-PEAK EXPRESS (-10m)',
        label: 'Off-Peak Speed Lull (-10 mins express kitchen boost)',
        description: 'Quiet dining hours detected. Priority hearth firing active.',
        badgeClass: 'badge-green',
        boxClass: 'surge-box-slow'
      };
    }

    if (mode === 'standard') {
      return {
        status: 'STANDARD',
        adjustmentMinutes: 0,
        marker: '🟡 STANDARD PACE (±0m)',
        label: 'Standard Kitchen Pace (±0 mins)',
        description: 'Standard kitchen flow with nominal firing and prep times.',
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
        marker: '🔥 PEAK RUSH (+10m)',
        label: 'Peak Rush Hour (+10 mins oven queue surge)',
        description: 'High restaurant activity detected. Wood ovens at peak queue capacity.',
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
        label: 'Off-Peak Lull (-10 mins express kitchen boost)',
        description: 'Quiet dining hours detected. Priority hearth firing active.',
        badgeClass: 'badge-green',
        boxClass: 'surge-box-slow'
      };
    }

    return {
      status: 'STANDARD',
      adjustmentMinutes: 0,
      marker: '🟡 STANDARD PACE (±0m)',
      label: 'Standard Kitchen Pace (±0 mins)',
      description: 'Standard kitchen flow with nominal firing and prep times.',
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

    // If no active order exists, open the mock order creator modal
    openOrderModal();
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
      heroSurgeMarker.innerText = orderData.surgeMarker || '🟡 STANDARD PACE (±0m)';
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
        modsHtml = '<div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.35rem;">';
        item.modifiers.forEach(mod => {
          modsHtml += `<span class="badge badge-muted" style="font-size: 0.68rem; padding: 0.15rem 0.45rem;">${mod.value}</span>`;
        });
        modsHtml += '</div>';
      }

      html += `
        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--charcoal-border); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.25rem;">
            <div style="font-weight: 700; color: #FFFFFF; font-size: 0.92rem;">
              ${item.quantity}× ${item.name}
            </div>
            <div class="font-mono" style="font-weight: 800; color: var(--honey-gold); font-size: 0.92rem;">
              $${Number(item.totalPrice).toFixed(2)}
            </div>
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.3;">
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
            <div style="display: flex; justify-content: space-between; font-weight: 700;">
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
    const totalMs = orderData.totalDurationMs || (20 * 60 * 1000);
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
        progressCircle.style.stroke = 'var(--ember-red)';
      }
    }

    // Update Hero UI State
    if (currentStage === 4) {
      if (heroCard) heroCard.classList.add('animate-ready-pulse');
      if (heroTitleEl) {
        heroTitleEl.innerHTML = '<span style="color: var(--basil-green);">Ready for Pickup!</span>';
      }
      if (heroSubtextEl) {
        heroSubtextEl.innerText = `Your order is hot and boxed under thermal warmers at ${orderData.customer.shelf || 'SHELF #B-04'}.`;
      }
      const readyBadge = document.getElementById('hero-status-badge');
      if (readyBadge) {
        readyBadge.className = 'badge badge-green';
        readyBadge.innerText = 'ORDER READY ON COUNTER';
      }

      if (lastAnnouncedStage !== 4) {
        lastAnnouncedStage = 4;
        if (window.KitchenAudio) window.KitchenAudio.playOrderReadyFanfare();
      }
    } else {
      if (heroCard) heroCard.classList.remove('animate-ready-pulse');
      const minsRemaining = Math.max(1, Math.ceil(remainingSecs / 60));
      if (heroTitleEl) {
        heroTitleEl.innerHTML = `Ready in <span style="color: var(--honey-gold);">~${minsRemaining} mins</span>`;
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
        node.style.background = i === 2 ? 'var(--ember-red)' : 'var(--honey-gold)';
        node.style.borderColor = '#FFFFFF';
        if (i === 2) node.classList.add('animate-oven-active');
        else node.classList.remove('animate-oven-active');
        if (text) {
          text.style.color = '#FFFFFF';
          text.style.fontWeight = '800';
        }
      } else {
        node.style.background = 'var(--bg-surface-elevated)';
        node.style.borderColor = 'var(--charcoal-border)';
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
      modalSummarySurge.style.color = surge.adjustmentMinutes > 0 ? '#FF5A43' : (surge.adjustmentMinutes < 0 ? '#34D399' : 'var(--honey-gold)');
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

    const orderNumber = '#FG-' + Math.floor(10000 + Math.random() * 90000);

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
        phone: '(555) 839-2041',
        pickupType: pickupType,
        shelf: 'SHELF #B-04',
        vehicle: 'Silver Audi A4 (Curbside Bay 3)'
      },
      store: {
        name: 'FORNO & GRATE Artisanal Hearth',
        address: '412 S. Artisan Way, Suite 100',
        district: 'Hearthstone Historic District',
        phone: '(555) 321-PIZZA',
        ovenTemp: '865°F',
        woodSource: 'Seasoned White Oak'
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
    const totalDuration = orderData.totalDurationMs || (20 * 60 * 1000);

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
