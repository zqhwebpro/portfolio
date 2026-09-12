/**
 * FORNO & GRATE // Live Order Tracker & Readiness Engine
 */

(function () {
  let orderData = window.ORDER_DATA || null;
  let timerInterval = null;
  let lastAnnouncedStage = 0;

  // Fallback storage key if offline / static preview mode
  const FALLBACK_KEY = 'forno_order_state_v1';

  // Load order data from global window, API, or localStorage fallback
  function initOrderData() {
    if (orderData && orderData.placedAt && orderData.targetReadyAt) {
      // Save snapshot to localStorage as backup
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));
      return;
    }

    // Attempt localStorage recovery
    const saved = localStorage.getItem(FALLBACK_KEY);
    if (saved) {
      try {
        orderData = JSON.parse(saved);
        return;
      } catch (e) {}
    }

    // Default mock fallback
    const nowMs = Date.now();
    const elapsedOffsetMs = 6 * 60 * 1000;
    const totalDurationMs = 22 * 60 * 1000;
    const placedAt = nowMs - elapsedOffsetMs;

    orderData = {
      orderNumber: '#FG-84920',
      placedAt: placedAt,
      placedAtFormatted: formatTimeString(placedAt),
      targetReadyAt: placedAt + totalDurationMs,
      totalDurationMs: totalDurationMs,
      currentStageId: 2,
      customer: {
        name: 'Zachery H.',
        phone: '(555) 839-2041',
        pickupType: 'Store Pickup (Express Shelf)',
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
          id: 'item-1',
          name: '16" Wood-Fired Hot Honey Soppressata',
          category: 'Artisanal Pizza',
          description: 'Crispy cup pepperoni, spicy soppressata, fior di latte, hot honey glaze, charred blistered sourdough crust.',
          quantity: 1,
          unitPrice: 26.50,
          totalPrice: 26.50,
          modifiers: [
            { name: 'Crust', value: 'Blistered Well-Done (+850°F)' },
            { name: 'Toppings', value: '+ Extra Fresh Basil' },
            { name: 'Side Dip', value: "Mike's Calabrian Hot Honey Pot" }
          ]
        },
        {
          id: 'item-2',
          name: 'Charred Broccolini & Garlic Confit',
          category: 'Wood-Grilled Small Plates',
          description: 'Coal-roasted broccolini, aged pecorino toscano, toasted breadcrumbs, Meyer lemon zest.',
          quantity: 1,
          unitPrice: 14.00,
          totalPrice: 14.00,
          modifiers: [
            { name: 'Dressing', value: 'Lemon Garlic Vinaigrette' }
          ]
        },
        {
          id: 'item-3',
          name: 'Smoked San Marzano Marinara Dipping Pot',
          category: 'House Sauces',
          description: 'DOP San Marzano tomatoes simmered with charred wood garlic & oregano.',
          quantity: 1,
          unitPrice: 3.50,
          totalPrice: 3.50,
          modifiers: []
        },
        {
          id: 'item-4',
          name: 'San Pellegrino Blood Orange (Aranciata Rossa)',
          category: 'Beverages',
          description: 'Imported Italian sparkling blood orange, 330ml glass bottle.',
          quantity: 2,
          unitPrice: 4.50,
          totalPrice: 9.00,
          modifiers: [
            { name: 'Service', value: 'Chilled / Lime Wedge' }
          ]
        }
      ],
      pricing: {
        subtotal: 53.00,
        tax: 4.64,
        artisanSurcharge: 0.00,
        tip: 10.60,
        total: 68.24,
        paymentMethod: 'Apple Pay (•••• 4821)'
      }
    };
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));
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

  // Main tick loop
  function tick() {
    if (!orderData) return;

    const nowMs = Date.now();
    const remainingMs = Math.max(0, orderData.targetReadyAt - nowMs);
    const remainingSecs = Math.ceil(remainingMs / 1000);

    const elapsedMs = nowMs - orderData.placedAt;
    const totalMs = orderData.totalDurationMs || (22 * 60 * 1000);
    const progressRatio = Math.max(0.0, Math.min(1.0, elapsedMs / totalMs));

    // Determine stage from ratio
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
      const radius = 80;
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
        heroSubtextEl.innerText = `Your order is hot and boxed under thermal warmers at ${orderData.customer.shelf}.`;
      }
      const readyBadge = document.getElementById('hero-status-badge');
      if (readyBadge) {
        readyBadge.className = 'badge badge-green';
        readyBadge.innerText = 'ORDER READY ON COUNTER';
      }

      // Play chime if just transitioned to Stage 4
      if (lastAnnouncedStage !== 4) {
        lastAnnouncedStage = 4;
        if (window.KitchenAudio) {
          window.KitchenAudio.playOrderReadyFanfare();
        }
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

      // Check stage chime
      if (lastAnnouncedStage !== currentStage) {
        lastAnnouncedStage = currentStage;
        if (window.KitchenAudio) {
          window.KitchenAudio.playStageChime(currentStage);
        }
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
        // Completed
        node.style.background = 'var(--basil-green)';
        node.style.borderColor = 'var(--basil-green)';
        node.classList.remove('animate-oven-active');
        if (text) text.style.color = 'var(--text-primary)';
      } else if (i === currentStage) {
        // Active
        node.style.background = i === 2 ? 'var(--ember-red)' : 'var(--honey-gold)';
        node.style.borderColor = '#FFFFFF';
        if (i === 2) node.classList.add('animate-oven-active');
        else node.classList.remove('animate-oven-active');
        if (text) {
          text.style.color = '#FFFFFF';
          text.style.fontWeight = '800';
        }
      } else {
        // Pending
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

  // Global action utilities
  window.resetOrder = function () {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    
    // Attempt API reset first
    fetch('./api/order.php?action=reset', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.order) {
          orderData = data.order;
          localStorage.setItem(FALLBACK_KEY, JSON.stringify(orderData));
          window.location.reload();
        }
      })
      .catch(() => {
        // Local fallback
        localStorage.removeItem(FALLBACK_KEY);
        window.location.reload();
      });
  };

  window.setDemoStage = function (stageNum) {
    if (window.KitchenAudio) window.KitchenAudio.playClick();
    stageNum = parseInt(stageNum, 10);
    const nowMs = Date.now();
    const totalDuration = 22 * 60 * 1000;

    let targetReadyAt = nowMs;
    let placedAt = nowMs - totalDuration;

    if (stageNum === 1) {
      targetReadyAt = nowMs + (18 * 60 * 1000);
      placedAt = nowMs - (4 * 60 * 1000);
    } else if (stageNum === 2) {
      targetReadyAt = nowMs + (10 * 60 * 1000);
      placedAt = nowMs - (12 * 60 * 1000);
    } else if (stageNum === 3) {
      targetReadyAt = nowMs + (3 * 60 * 1000);
      placedAt = nowMs - (19 * 60 * 1000);
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

    // Call API in background if available
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
