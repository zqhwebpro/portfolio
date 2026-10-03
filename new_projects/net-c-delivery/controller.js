// ═══════════════════════════════════════════════════════════════════
// DINERDASHBOARD // MODERN KITCHEN POS & MULTI-GATEWAY DISPATCH ENGINE
// ═══════════════════════════════════════════════════════════════════

// Automated Client-Side Cache Cleanup & Cache Storage Purge
(function purgeClientCaches() {
    try {
        if ('caches' in window) {
            caches.keys().then((cacheNames) => {
                cacheNames.forEach((cacheName) => {
                    caches.delete(cacheName);
                });
            }).catch(() => {});
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.unregister();
                }
            }).catch(() => {});
        }
    } catch (e) {}
})();

// Manual user cache clear & hard refresh
function clearDinerAppCache() {
    playToyClick(720, 0.05);
    try {
        localStorage.removeItem('dinerdashboard_delivery_api_state');
        sessionStorage.clear();
        if ('caches' in window) {
            caches.keys().then((names) => {
                for (const name of names) {
                    caches.delete(name);
                }
            }).catch(() => {});
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const registration of registrations) {
                    registration.unregister();
                }
            }).catch(() => {});
        }
    } catch (e) {}

    const base = window.location.origin + window.location.pathname;
    const cacheBusterUrl = base + '?nocache=' + Date.now() + (window.location.hash || '#step1');
    window.location.replace(cacheBusterUrl);
}

if (typeof window !== 'undefined') {
    window.clearDinerAppCache = clearDinerAppCache;
}

// Audio synthesizer for discrete OS feedback & tactile diner physical buttons
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Discrete micro-click for regular OS elements
function playOsClick(freq = 750, duration = 0.035) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

// Chunky mechanical baby-toy-style tactile push button click
function playToyClick(startFreq = 520, duration = 0.05) {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const t = audioCtx.currentTime;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(startFreq, t);
        osc.frequency.exponentialRampToValueAtTime(110, t + duration);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + duration);

        // Sub click for chassis resonance
        const sub = audioCtx.createOscillator();
        const subGain = audioCtx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(220, t);
        sub.frequency.exponentialRampToValueAtTime(80, t + 0.025);
        subGain.gain.setValueAtTime(0.06, t);
        subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
        sub.connect(subGain);
        subGain.connect(audioCtx.destination);
        sub.start(t);
        sub.stop(t + 0.025);
    } catch (e) {}
}

// Authentic brass metallic Diner Service Bell ("Order Up!")
function playDinerBell() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const t = audioCtx.currentTime;
        const strikeDuration = 1.4;

        // Fundamental bell frequency (A6 ~ 1760 Hz)
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1760, t);
        gain1.gain.setValueAtTime(0.16, t);
        gain1.gain.exponentialRampToValueAtTime(0.0001, t + strikeDuration);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(t);
        osc1.stop(t + strikeDuration);

        // High harmonic partial (E7 ~ 2640 Hz)
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2640, t);
        gain2.gain.setValueAtTime(0.09, t);
        gain2.gain.exponentialRampToValueAtTime(0.0001, t + (strikeDuration * 0.75));
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(t);
        osc2.stop(t + (strikeDuration * 0.75));

        // High strike transient (A7 ~ 3520 Hz)
        const strike = audioCtx.createOscillator();
        const strikeGain = audioCtx.createGain();
        strike.type = 'triangle';
        strike.frequency.setValueAtTime(3520, t);
        strikeGain.gain.setValueAtTime(0.1, t);
        strikeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
        strike.connect(strikeGain);
        strikeGain.connect(audioCtx.destination);
        strike.start(t);
        strike.stop(t + 0.08);
    } catch (e) {}
}

function toggleAudio() {
    initAudio();
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('osAudioToggleBtn');
    if (btn) {
        btn.innerHTML = soundEnabled 
            ? '<i class="fa-solid fa-volume-high"></i> <span>Audio: ON</span>' 
            : '<i class="fa-solid fa-volume-xmark"></i> <span>Audio: OFF</span>';
    }
    if (soundEnabled) playToyClick(640, 0.04);
}

// Live Clock
function initDinerClock() {
    const clockEl = document.getElementById('dinerLiveClock');
    if (!clockEl) return;
    function update() {
        const d = new Date();
        clockEl.innerText = d.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    update();
    setInterval(update, 1000);
}

// ═══════════════════════════════════════════════════════════════════
// DELIVERY PLATFORMS & GATEWAYS REGISTRY
// ═══════════════════════════════════════════════════════════════════
const DELIVERY_SERVICES = {
    toast: {
        id: 'toast',
        name: 'Toast POS',
        categoryTag: 'Toast Delivery Services (TDS)',
        icon: 'fa-solid fa-bread-slice',
        color: '#0284c7',
        demographicRank: 'Top In-House Restaurant Direct POS',
        demographicDesc: 'Eliminates 30% third-party marketplace commissions via native in-house ordering with flat-rate DoorDash courier pass-through.',
        portalUrl: 'https://pos.toasttab.com/',
        defaultClientId: 'toast_app_parma_982',
        defaultSecret: 'tst_sec_89234bfa09e1889c201',
        defaultLocationId: 'loc_parma_grill_01',
        category: 'pos',
        protocol: 'REST / TDS Webhooks',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/toast',
        marketShare: 'Top In-House POS',
        latency: '16 ms',
        verified: false
    },
    doordash: {
        id: 'doordash',
        name: 'DoorDash Drive',
        categoryTag: 'White-Label Fulfillment API',
        icon: 'fa-solid fa-car',
        color: '#f43f5e',
        demographicRank: '#1 Demographic Choice (67% US Market)',
        demographicDesc: 'Dominant nationwide suburban footprint; highest brand recognition and driver availability across family dining.',
        portalUrl: 'https://developer.doordash.com/',
        defaultClientId: 'dd_drive_client_parma_441',
        defaultSecret: 'dd_jwt_secret_88192aacc7712',
        defaultLocationId: 'store_parma_dd_771',
        category: 'fleet',
        protocol: 'REST / JWT Bearer',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/doordash',
        marketShare: '#1 Nationwide Choice (67%)',
        latency: '22 ms',
        verified: false
    },
    uber: {
        id: 'uber',
        name: 'Uber Direct',
        categoryTag: 'On-Demand Merchant Delivery',
        icon: 'fa-brands fa-uber',
        color: '#0f172a',
        demographicRank: 'Urban & Gen-Z Demographic Choice (23% US Share)',
        demographicDesc: 'Top preference for metropolitan, college campus, and late-night demographics with dense local courier pooling.',
        portalUrl: 'https://developer.uber.com/docs/deliveries/overview',
        defaultClientId: '6ImzVINJ53LfMWCPoh_gBblTL55hqUNfIBN-7TG2',
        defaultSecret: 'ubr_sec_99120aa8772bc',
        defaultLocationId: 'uber_loc_parma_104',
        category: 'fleet',
        protocol: 'OAuth 2.0 / Webhooks',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/uber',
        marketShare: 'Urban & Gen-Z (23%)',
        latency: '18 ms',
        verified: false
    },
    grubhub: {
        id: 'grubhub',
        name: 'Grubhub Direct',
        categoryTag: 'Branded Ordering & Dispatch API',
        icon: 'fa-solid fa-utensils',
        color: '#f59e0b',
        demographicRank: 'East Coast & Campus Stronghold',
        demographicDesc: 'Favored by Northeast corporate lunch programs, regional diners, and student meal account payment ecosystems.',
        portalUrl: 'https://get.grubhub.com/',
        defaultClientId: 'gh_partner_parma_902',
        defaultSecret: 'gh_sec_token_55219bc001',
        defaultLocationId: 'gh_merchant_parma_8829',
        category: 'pos',
        protocol: 'REST / Mutual TLS',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/grubhub',
        marketShare: 'East Coast & Campus (10%)',
        latency: '24 ms',
        verified: false
    },
    square: {
        id: 'square',
        name: 'Square Delivery',
        categoryTag: 'Square Orders & Terminal Bridge',
        icon: 'fa-solid fa-square',
        color: '#10b981',
        demographicRank: 'Independent & Craft Deli Demographic',
        demographicDesc: 'Preferred choice for boutique sandwich counters seeking unified kitchen tickets and contactless counter pay.',
        portalUrl: 'https://developer.squareup.com/',
        defaultClientId: 'sq0idp-parma_88291047192aa',
        defaultSecret: 'sq0csp-99214710188bc',
        defaultLocationId: 'L8829104PARMA',
        category: 'pos',
        protocol: 'OAuth 2.0 / v2 Orders',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/square',
        marketShare: 'Craft & Independent Delis',
        latency: '19 ms',
        verified: false
    },
    clover: {
        id: 'clover',
        name: 'Clover POS API',
        categoryTag: 'Clover Station Queue & Thermal Gateway',
        icon: 'fa-solid fa-clover',
        color: '#16a34a',
        demographicRank: 'Neighborhood Diner & Grill Demographic',
        demographicDesc: 'High market penetration in traditional family diners with kitchen impact thermal printers and dedicated station queues.',
        portalUrl: 'https://www.clover.com/developers',
        defaultClientId: 'clover_app_parma_991823',
        defaultSecret: 'clv_token_8821901aa',
        defaultLocationId: 'CLV_MERCH_PARMA_7718',
        category: 'pos',
        protocol: 'REST / Clover Station',
        endpointUrl: 'https://api.dinerdashboard.io/webhooks/clover',
        marketShare: 'Family Grills & Diners',
        latency: '26 ms',
        verified: false
    }
};

// Application State
let currentStep = 1;
let currentSelectedGateway = null;
let currentFilter = 'all';

// Load saved state (starts uninstalled unless explicitly authenticated)
let savedApiState = {};
try {
    const rawSaved = localStorage.getItem('dinerdashboard_delivery_api_state');
    savedApiState = JSON.parse(rawSaved || '{}');
    let hasAnyVerified = false;
    Object.keys(savedApiState).forEach(k => {
        if (DELIVERY_SERVICES[k] && savedApiState[k].verified) {
            DELIVERY_SERVICES[k].verified = true;
            if (savedApiState[k].clientId) DELIVERY_SERVICES[k].defaultClientId = savedApiState[k].clientId;
            if (savedApiState[k].locationId) DELIVERY_SERVICES[k].defaultLocationId = savedApiState[k].locationId;
            hasAnyVerified = true;
            if (!currentSelectedGateway) currentSelectedGateway = k;
        }
    });
    if (!hasAnyVerified) {
        currentSelectedGateway = null;
    }
} catch (e) {
    savedApiState = {};
    currentSelectedGateway = null;
}

// ═══════════════════════════════════════════════════════════════════
// STEPPER WIZARD ENGINE (SIDE PANEL & OS FOLDER TABS SYNC)
// ═══════════════════════════════════════════════════════════════════
function goToStep(stepNum, pushToHistory = true) {
    playToyClick(580, 0.04);

    const hasVerifiedGateway = Object.keys(DELIVERY_SERVICES).some(k => DELIVERY_SERVICES[k].verified);
    const selectedSkuCount = DINER_MENU_ITEMS.filter(i => i.selected).length;

    // Gateways must be verified before moving to Step 2
    if (stepNum >= 2 && !hasVerifiedGateway) {
        playToyClick(320, 0.08);
        showDinerToast(
            'API Verification Required ⚠️',
            'No POS Gateway is currently installed. Please configure and verify an API in Step 1 first.',
            'fa-plug-circle-exclamation'
        );
        stepNum = 1;
    }

    // Menu SKUs must be selected before moving to Step 3
    if (stepNum === 3 && selectedSkuCount === 0) {
        playToyClick(340, 0.08);
        showDinerToast(
            'No Menu Items Selected ⚠️',
            'Please select at least 1 menu item in Step 2 before launching Kitchen KDS & Dispatch.',
            'fa-clipboard-check'
        );
        stepNum = 2;
    }

    currentStep = stepNum;

    // View visibility
    const s1 = document.getElementById('step1View');
    const s2 = document.getElementById('step2View');
    const s3 = document.getElementById('step3View');

    if (s1) s1.classList.toggle('d-none', stepNum !== 1);
    if (s2) s2.classList.toggle('d-none', stepNum !== 2);
    if (s3) s3.classList.toggle('d-none', stepNum !== 3);

    // Update side panel buttons
    const side1 = document.getElementById('sideStepTab1');
    const side2 = document.getElementById('sideStepTab2');
    const side3 = document.getElementById('sideStepTab3');

    if (side1) {
        side1.classList.toggle('active', stepNum === 1);
        side1.classList.toggle('verified', hasVerifiedGateway);
    }
    if (side2) {
        side2.classList.toggle('active', stepNum === 2);
        side2.classList.toggle('verified', selectedSkuCount > 0);
    }
    if (side3) {
        side3.classList.toggle('active', stepNum === 3);
    }

    // Update OS folder tabs
    const f1 = document.getElementById('folderTab1');
    const f2 = document.getElementById('folderTab2');
    const f3 = document.getElementById('folderTab3');

    const icon1 = document.getElementById('folderIcon1');
    const icon2 = document.getElementById('folderIcon2');
    const icon3 = document.getElementById('folderIcon3');

    if (f1) f1.classList.toggle('active', stepNum === 1);
    if (f2) f2.classList.toggle('active', stepNum === 2);
    if (f3) f3.classList.toggle('active', stepNum === 3);

    if (icon1) icon1.className = stepNum === 1 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';
    if (icon2) icon2.className = stepNum === 2 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';
    if (icon3) icon3.className = stepNum === 3 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';

    // Update OS Breadcrumb ribbon
    const bc = document.getElementById('osActiveFolderBreadcrumb');
    if (bc) {
        if (stepNum === 1) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>01_gateways';
        else if (stepNum === 2) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>02_menu_catalog';
        else if (stepNum === 3) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>03_kitchen_kds';
    }

    if (stepNum === 2) {
        renderMenuCatalog();
    } else if (stepNum === 3) {
        renderKdsTickets();
    }

    updateProgressiveState();

    // Push browser history state so browser Back button navigates back INSIDE this app
    if (pushToHistory && window.history && window.history.pushState) {
        const targetHash = '#step' + stepNum;
        if (window.location.hash !== targetHash) {
            window.history.pushState({ step: stepNum, modal: null }, '', window.location.pathname + targetHash);
        }
    } else if (!pushToHistory && window.history && window.history.replaceState) {
        const targetHash = '#step' + stepNum;
        if (window.location.hash !== targetHash && !window.location.hash.startsWith('#api-')) {
            window.history.replaceState({ step: stepNum, modal: null }, '', window.location.pathname + targetHash);
        }
    }

    // Update in-app top-right back button behavior and title
    updateBackBtnState();

    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Update top-right back button label & tooltip based on current step
function updateBackBtnState() {
    const backBtn = document.getElementById('back-btn-np');
    if (!backBtn) return;
    if (currentStep === 3) {
        backBtn.setAttribute('title', 'Back to Step 2: Menu Catalog');
        backBtn.setAttribute('aria-label', 'Back to Step 2: Menu Catalog');
    } else if (currentStep === 2) {
        backBtn.setAttribute('title', 'Back to Step 1: Gateways Setup');
        backBtn.setAttribute('aria-label', 'Back to Step 1: Gateways Setup');
    } else {
        backBtn.setAttribute('title', 'Back to Projects Hub');
        backBtn.setAttribute('aria-label', 'Back to Projects Hub');
    }
}

// In-App Back Navigation & Browser History Popstate Controller
function initBackNavigation() {
    const backBtn = document.getElementById('back-btn-np');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            // 1. If any Bootstrap modal is currently open, close it instead of leaving the application
            const openModalEl = document.querySelector('.modal.show');
            if (openModalEl) {
                e.preventDefault();
                const modalInstance = bootstrap.Modal.getInstance(openModalEl);
                if (modalInstance) {
                    modalInstance.hide();
                    return;
                }
            }

            // 2. If on Step 3, go back to Step 2 inside the application
            if (currentStep === 3) {
                e.preventDefault();
                goToStep(2);
                return;
            }

            // 3. If on Step 2, go back to Step 1 inside the application
            if (currentStep === 2) {
                e.preventDefault();
                goToStep(1);
                return;
            }

            // 4. If on Step 1, normal navigation to href="../" (Projects Hub) proceeds
        });
    }

    // Intercept browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        // If a modal is open, close it
        const openModalEl = document.querySelector('.modal.show');
        if (openModalEl) {
            const modalInstance = bootstrap.Modal.getInstance(openModalEl);
            if (modalInstance) {
                modalInstance.hide();
                return;
            }
        }

        let targetStep = 1;
        if (e.state && e.state.step) {
            targetStep = e.state.step;
        } else if (window.location.hash === '#step3') {
            targetStep = 3;
        } else if (window.location.hash === '#step2') {
            targetStep = 2;
        } else {
            targetStep = 1;
        }

        goToStep(targetStep, false);
    });

    // Cleanup URL hash when modals hide
    ['apiConfigModal', 'apiVerifiedNextStepModal'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && typeof el.addEventListener === 'function') {
            el.addEventListener('hidden.bs.modal', () => {
                if (window.location.hash.startsWith('#api-')) {
                    if (window.history && window.history.replaceState) {
                        window.history.replaceState({ step: currentStep, modal: null }, '', window.location.pathname + '#step' + currentStep);
                    }
                }
            });
        }
    });
}

// Switch Workbook compatibility
function switchSheet(sheetKey) {
    if (sheetKey === 'delivery') goToStep(1);
    else if (sheetKey === 'menu') goToStep(2);
    else if (sheetKey === 'telemetry') goToStep(3);
}

// ═══════════════════════════════════════════════════════════════════
// GATEWAY SELECTION & STEP ADVANCEMENT (ENFORCES API VERIFICATION)
// ═══════════════════════════════════════════════════════════════════
function selectAndProceedGateway(serviceKey) {
    playToyClick(620, 0.05);
    const s = DELIVERY_SERVICES[serviceKey];
    if (!s) return;

    // The user MUST be required to add an API and verify it works!
    if (!s.verified) {
        openApiConfigModal(serviceKey);
        showDinerToast(
            'API Verification Required 🔑',
            `Please configure credentials and verify the ${s.name} API connection before selecting it.`,
            'fa-key'
        );
        return;
    }

    currentSelectedGateway = serviceKey;
    updateProgressiveState();
    renderGatewayCards();

    showDinerToast(
        `${s.name} Active 🚀`,
        `Connected via ${s.protocol}. Moving to Step 2: Menu Catalog...`,
        'fa-circle-check'
    );

    setTimeout(() => {
        goToStep(2);
    }, 350);
}

// Render Gateway Cards Grid (Step 1)
function renderGatewayCards() {
    const container = document.getElementById('gatewaysGrid');
    if (!container) return;

    const searchVal = (document.getElementById('gatewaySearchInput')?.value || '').toLowerCase().trim();
    const serviceKeys = Object.keys(DELIVERY_SERVICES);
    let html = '';

    serviceKeys.forEach((key) => {
        const s = DELIVERY_SERVICES[key];
        const isVerified = !!s.verified;
        const isSelected = key === currentSelectedGateway;

        // Apply filters
        let matchesFilter = true;
        if (currentFilter === 'connected') matchesFilter = isVerified;
        else if (currentFilter === 'pending') matchesFilter = !isVerified;
        else if (currentFilter === 'pos') matchesFilter = (s.category === 'pos');
        else if (currentFilter === 'fleet') matchesFilter = (s.category === 'fleet');

        const matchesSearch = !searchVal || (
            s.name.toLowerCase().includes(searchVal) ||
            s.categoryTag.toLowerCase().includes(searchVal) ||
            s.demographicDesc.toLowerCase().includes(searchVal)
        );

        if (!matchesFilter || !matchesSearch) return;

        html += `
            <div class="gateway-card ${isVerified ? 'connected' : ''} ${isSelected ? 'selected-active' : ''}" id="gwCard_${key}">
                <div>
                    <div class="gw-top">
                        <div class="gw-brand">
                            <div class="gw-brand-icon">
                                <i class="${s.icon}"></i>
                            </div>
                            <div class="gw-title-group">
                                <h3>${s.name}</h3>
                                <span class="gw-cat-tag">${s.categoryTag}</span>
                            </div>
                        </div>
                        <span class="gw-status-badge ${isVerified ? 'ok' : 'pending'}">
                            <i class="fa-solid ${isVerified ? 'fa-circle-check' : 'fa-plug'}"></i>
                            ${isVerified ? '200 OK' : 'NOT INSTALLED'}
                        </span>
                    </div>

                    <span class="gw-demo-rank"><i class="fa-solid fa-award me-1"></i> ${s.demographicRank}</span>
                    <p class="gw-desc">${s.demographicDesc}</p>

                    <div class="gw-telemetry-specs">
                        <div><strong style="color: var(--diner-text-dark);">Protocol:</strong> ${s.protocol}</div>
                        <div><strong style="color: var(--diner-text-dark);">Webhook:</strong> ${s.endpointUrl}</div>
                        <div><strong style="color: var(--diner-text-dark);">Latency:</strong> ${isVerified ? s.latency : 'Unverified (18ms est.)'}</div>
                    </div>
                </div>

                <div class="gw-actions-row">
                    ${isVerified ? `
                        <button type="button" 
                                class="tactile-btn tactile-btn-mint gw-select-btn" 
                                onclick="selectAndProceedGateway('${key}')">
                            <i class="fa-solid fa-arrow-right me-1"></i>
                            <span>Select Active Gateway ➔</span>
                        </button>
                        <button type="button" 
                                class="tactile-btn tactile-btn-white tactile-btn-sm" 
                                onclick="openApiConfigModal('${key}')" 
                                title="Reconfigure API Keys">
                            <i class="fa-solid fa-key"></i>
                        </button>
                        <button type="button" 
                                class="tactile-btn tactile-btn-white tactile-btn-sm" 
                                onclick="disconnectApi('${key}')" 
                                title="Disconnect Gateway">
                            <i class="fa-solid fa-power-off text-danger"></i>
                        </button>
                    ` : `
                        <button type="button" 
                                class="tactile-btn tactile-btn-primary gw-select-btn" 
                                onclick="openApiConfigModal('${key}')">
                            <i class="fa-solid fa-plug me-1"></i>
                            <span>+ Install &amp; Verify API ➔</span>
                        </button>
                    `}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Filter buttons
function filterGateways(filter, btnEl) {
    playToyClick(680, 0.03);
    currentFilter = filter;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove.call(b.classList, 'active'));
    if (btnEl) btnEl.classList.add('active');
    renderGatewayCards();
}

function handleGatewaySearch() {
    renderGatewayCards();
}

// ═══════════════════════════════════════════════════════════════════
// STEP 2: MENU CATALOG & PRICING SYNCHRONIZATION
// ═══════════════════════════════════════════════════════════════════
const DINER_MENU_ITEMS = [
    {
        sku: 'SUB-01',
        name: 'Artisan Ribeye Cheesesteak Supreme',
        desc: 'Thinly shaved prime ribeye, caramelized sweet onions, Cooper Sharp American on toasted hearth Amoroso roll.',
        price: 14.95,
        icon: '🥩',
        category: 'Grill',
        inStock: true,
        selected: false
    },
    {
        sku: 'BUR-02',
        name: 'Double Bacon Smash Burger',
        desc: 'Twin 4oz certified Angus patties, applewood thick-cut bacon, diner secret sauce, Martins potato bun.',
        price: 12.50,
        icon: '🍔',
        category: 'Grill',
        inStock: true,
        selected: false
    },
    {
        sku: 'WRP-03',
        name: 'Charred Buffalo Chicken Wrap',
        desc: 'Crispy buttermilk chicken tenders, fiery Frank’s RedHot glaze, buttermilk ranch, crisp iceberg in flour tortilla.',
        price: 11.75,
        icon: '🌯',
        category: 'Deli',
        inStock: true,
        selected: false
    },
    {
        sku: 'SUB-04',
        name: 'Classic 12" Italian Deli Sub',
        desc: 'Genoa salami, hot capicola, mortadella, aged provolone, shredded lettuce, tomato, oregano vinaigrette.',
        price: 13.25,
        icon: '🥖',
        category: 'Deli',
        inStock: true,
        selected: false
    },
    {
        sku: 'MEL-05',
        name: 'Pastrami Melt on Hearth Rye',
        desc: 'House-brined peppery beef brisket pastrami, melted Swiss cheese, spicy deli brown mustard, seeded rye.',
        price: 13.95,
        icon: '🥪',
        category: 'Grill',
        inStock: true,
        selected: false
    },
    {
        sku: 'FRY-06',
        name: 'Garlic Truffle Parmesan Fries',
        desc: 'Fresh hand-cut Idaho Russet fries tossed with white truffle oil, shaved parmesan, garlic and chopped parsley.',
        price: 5.50,
        icon: '🍟',
        category: 'Fryer',
        inStock: true,
        selected: false
    },
    {
        sku: 'RNG-07',
        name: 'Crispy Beer-Battered Onion Rings',
        desc: 'Colossal sweet Spanish onions dipped in craft IPA batter, served golden with smoky horseradish dipping sauce.',
        price: 5.25,
        icon: '🧅',
        category: 'Fryer',
        inStock: true,
        selected: false
    }
];

function renderMenuCatalog() {
    const tableBody = document.getElementById('menuTableBody');
    if (!tableBody) return;

    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway] 
        : {
            name: 'Direct POS Gateway',
            categoryTag: 'Integrated POS Gateway',
            defaultLocationId: 'loc_parma_grill_01',
            protocol: 'REST / TDS Webhooks',
            icon: 'fa-solid fa-bread-slice'
        };

    // Update banner
    const bannerTitle = document.getElementById('activeGwTitle');
    const bannerSubtitle = document.getElementById('activeGwSubtitle');
    const bannerIcon = document.getElementById('activeGwIcon');

    if (bannerTitle) bannerTitle.innerText = `Active Gateway: ${activeGw.name}`;
    if (bannerSubtitle) bannerSubtitle.innerText = `${activeGw.categoryTag} • Store Location GUID: ${activeGw.defaultLocationId} • ${activeGw.protocol}`;
    if (bannerIcon) bannerIcon.className = `active-gw-icon ${activeGw.icon}`;

    // Update Alert Guidance Banner (No menu items preselected)
    const selectedCount = DINER_MENU_ITEMS.filter(i => i.selected).length;
    const bannerBox = document.getElementById('menuSelectionBanner');
    const bannerHead = document.getElementById('menuBannerHeadline');
    const bannerSub = document.getElementById('menuBannerSub');

    if (bannerBox && bannerHead && bannerSub) {
        if (selectedCount === 0) {
            bannerBox.className = 'menu-selection-alert-banner alert alert-warning border-0 rounded-4 p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3';
            bannerHead.innerText = `Notice: No Menu Items Preselected for ${activeGw.name}`;
            bannerSub.innerText = `To stage items for this gateway and push orders to the kitchen grill, click "+ Add SKU" on the items below. At least 1 item is required to launch Kitchen KDS.`;
        } else {
            bannerBox.className = 'menu-selection-alert-banner alert alert-success border-0 rounded-4 p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3';
            bannerHead.innerText = `${selectedCount} of 7 Menu SKUs Active on ${activeGw.name}`;
            bannerSub.innerText = `Selected items will sync pricing and modifiers directly to ${activeGw.name} and route tickets to Kitchen KDS.`;
        }
    }

    let html = '';
    DINER_MENU_ITEMS.forEach((item, index) => {
        const isSel = !!item.selected;
        html += `
            <tr class="${isSel ? 'item-selected' : ''}">
                <td>
                    <button type="button" 
                            class="item-select-btn ${isSel ? 'selected' : ''}" 
                            onclick="toggleMenuItemSelection(${index})"
                            title="${isSel ? 'Click to remove SKU from Gateway' : 'Click to add SKU to Gateway'}">
                        <i class="fa-solid ${isSel ? 'fa-square-check' : 'fa-square'}"></i>
                        <span>${isSel ? 'In Gateway' : '+ Add SKU'}</span>
                    </button>
                </td>
                <td class="font-mono text-secondary" style="font-weight:700;">${item.sku}</td>
                <td>
                    <div class="menu-item-cell">
                        <div class="item-thumb">${item.icon}</div>
                        <div class="item-meta">
                            <strong>${item.name}</strong>
                            <span>${item.desc}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-light text-dark border font-mono">${item.category}</span>
                </td>
                <td>
                    <div class="price-control-box">
                        <button type="button" class="price-adj-btn" onclick="adjustItemPrice(${index}, -0.50)">-</button>
                        <span>$${item.price.toFixed(2)}</span>
                        <button type="button" class="price-adj-btn" onclick="adjustItemPrice(${index}, 0.50)">+</button>
                    </div>
                </td>
                <td>
                    <button type="button" 
                            class="stock-toggle-btn ${item.inStock ? 'in-stock' : 'out-stock'}" 
                            onclick="toggleItemStock(${index})">
                        <i class="fa-solid ${item.inStock ? 'fa-check' : 'fa-ban'} me-1"></i>
                        ${item.inStock ? 'In Stock' : '86\'d (Out)'}
                    </button>
                </td>
                <td class="text-end">
                    <button type="button" class="tactile-btn tactile-btn-white tactile-btn-sm" onclick="syncMenuItem('${item.sku}', '${item.name}')">
                        <i class="fa-solid fa-arrows-rotate text-primary"></i> Sync
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
}

function toggleMenuItemSelection(index) {
    playToyClick(640, 0.03);
    DINER_MENU_ITEMS[index].selected = !DINER_MENU_ITEMS[index].selected;
    renderMenuCatalog();
    updateProgressiveState();

    const item = DINER_MENU_ITEMS[index];
    const gwName = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]?.name) || 'POS Gateway';
    showDinerToast(
        item.selected ? `${item.sku} Added to Gateway 🛒` : `${item.sku} Removed from Gateway ↩️`,
        `"${item.name}" is ${item.selected ? 'now active on' : 'removed from'} ${gwName}.`,
        item.selected ? 'fa-circle-check' : 'fa-minus'
    );
}

function selectAllMenuItems() {
    playToyClick(720, 0.04);
    DINER_MENU_ITEMS.forEach(i => i.selected = true);
    renderMenuCatalog();
    updateProgressiveState();
    showDinerToast('All 7 SKUs Selected! ✅', 'All menu items configured for POS gateway sync.', 'fa-check-double');
}

function clearMenuItemSelections() {
    playToyClick(480, 0.04);
    DINER_MENU_ITEMS.forEach(i => i.selected = false);
    renderMenuCatalog();
    updateProgressiveState();
    showDinerToast('Selection Cleared', 'No menu items are currently selected.', 'fa-xmark');
}

function validateAndProceedToStep3() {
    const selectedCount = DINER_MENU_ITEMS.filter(i => i.selected).length;
    if (selectedCount === 0) {
        playToyClick(350, 0.08);
        showDinerToast(
            'No Menu Items Selected! ⚠️',
            'Please select at least 1 menu item before proceeding to Kitchen KDS & Dispatch.',
            'fa-triangle-exclamation'
        );
        const banner = document.getElementById('menuSelectionBanner');
        if (banner) {
            banner.classList.add('border', 'border-danger');
            setTimeout(() => banner.classList.remove('border-danger'), 1500);
        }
        return;
    }
    goToStep(3);
}

function adjustItemPrice(index, delta) {
    playToyClick(720, 0.03);
    DINER_MENU_ITEMS[index].price = Math.max(1.00, +(DINER_MENU_ITEMS[index].price + delta).toFixed(2));
    renderMenuCatalog();
}

function toggleItemStock(index) {
    playToyClick(480, 0.04);
    DINER_MENU_ITEMS[index].inStock = !DINER_MENU_ITEMS[index].inStock;
    renderMenuCatalog();
    const item = DINER_MENU_ITEMS[index];
    const gwName = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway].name 
        : 'POS Gateway';
    showDinerToast(
        `${item.sku} ${item.inStock ? 'Available' : '86\'d'} 📋`,
        `"${item.name}" stock updated on ${gwName}.`,
        item.inStock ? 'fa-check' : 'fa-ban'
    );
}

function syncAllMenuItems() {
    playToyClick(800, 0.05);
    const selectedItems = DINER_MENU_ITEMS.filter(i => i.selected);
    const s = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway] 
        : DELIVERY_SERVICES.toast;

    if (selectedItems.length === 0) {
        showDinerToast(
            'No Menu SKUs Selected ⚠️',
            `Select items using the "+ Add SKU" button before syncing to ${s.name}.`,
            'fa-triangle-exclamation'
        );
        return;
    }

    showDinerToast(
        `${selectedItems.length} SKUs Synced! ⚡`,
        `Selected prices & modifiers broadcast to ${s.name} at ${s.endpointUrl}.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow(s.name, 'CATALOG.BULK_SYNC_200', s.latency, `#${selectedItems.length}_SKUS_OK`);
}

// ═══════════════════════════════════════════════════════════════════
// STEP 3: LIVE KITCHEN KDS & FLEET QUEUE
// ═══════════════════════════════════════════════════════════════════
let LIVE_KDS_TICKETS = [
    {
        id: '#TKT-4829',
        item: 'Artisan Ribeye Cheesesteak Supreme',
        side: 'Garlic Truffle Fries',
        gateway: 'Toast POS',
        courier: 'DoorDash Drive (Courier #DD-81)',
        eta: '2.4 mins',
        status: 'PREPARING',
        timeAgo: '3m 12s',
        statusClass: 'ready'
    },
    {
        id: '#TKT-4830',
        item: 'Double Bacon Smash Burger',
        side: 'Sea Salt Fries + Pickle',
        gateway: 'Uber Direct',
        courier: 'Uber Courier (Toyota Prius)',
        eta: '4.8 mins',
        status: 'READY FOR COURIER',
        timeAgo: '1m 45s',
        statusClass: 'ready'
    },
    {
        id: '#TKT-4831',
        item: 'Charred Buffalo Chicken Wrap',
        side: 'Crispy Onion Rings',
        gateway: 'DoorDash Drive',
        courier: 'DoorDash Courier (Honda Scooter)',
        eta: '6.1 mins',
        status: 'IN GRILL QUEUE',
        timeAgo: '38s',
        statusClass: ''
    }
];

function renderKdsTickets() {
    const container = document.getElementById('kdsTicketsQueue');
    if (!container) return;

    let html = '';
    LIVE_KDS_TICKETS.forEach(tkt => {
        html += `
            <div class="kds-ticket-card ${tkt.statusClass}">
                <div class="ticket-main">
                    <div class="ticket-header-row">
                        <span class="ticket-num">${tkt.id}</span>
                        <span class="ticket-gateway-tag">${tkt.gateway}</span>
                        <span class="ticket-status-pill ${tkt.statusClass}">${tkt.status}</span>
                    </div>
                    <div class="ticket-items-text">${tkt.item} + ${tkt.side}</div>
                    <div class="ticket-courier-sub">
                        <i class="fa-solid fa-motorcycle me-1 text-primary"></i> ${tkt.courier} &bull; ETA: <strong>${tkt.eta}</strong>
                    </div>
                </div>
                <div class="ticket-time-box">
                    <div class="ticket-timer">${tkt.timeAgo}</div>
                    <button type="button" class="tactile-btn tactile-btn-white tactile-btn-sm mt-1" onclick="expediteTicket('${tkt.id}')" title="Bump Ticket">
                        <i class="fa-solid fa-check text-success"></i> Bump
                    </button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function expediteTicket(ticketId) {
    playToyClick(750, 0.04);
    LIVE_KDS_TICKETS = LIVE_KDS_TICKETS.filter(t => t.id !== ticketId);
    renderKdsTickets();
    showDinerToast(
        `${ticketId} Picked Up! 🛵`,
        'Order handed off to courier for delivery route.',
        'fa-box-check'
    );
    addTelemetryLogRow('Kitchen KDS', 'TICKET.BUMP_PICKUP', '4 ms', ticketId);
}

// ═══════════════════════════════════════════════════════════════════
// TACTILE ACTIONS (BELL, NEW TICKET, RUSH FLEET)
// ═══════════════════════════════════════════════════════════════════

function ringDinerBell() {
    playDinerBell();
    showDinerToast(
        'Order Up! 🔔',
        'Kitchen service bell rang! All grill tickets expedited for courier pickup.',
        'fa-bell-concierge'
    );
    addTelemetryLogRow('Kitchen Counter', 'COUNTER.ORDER_UP_BELL', '3 ms', '#EXPEDITE_ALL');
}

function spawnDinerTicket() {
    playToyClick(540, 0.05);

    const selectedPool = DINER_MENU_ITEMS.filter(i => i.selected);
    const pool = selectedPool.length > 0 ? selectedPool : DINER_MENU_ITEMS;
    const menu = pool[Math.floor(Math.random() * pool.length)];
    const ticketNum = Math.floor(Math.random() * 8999) + 1000;
    const ticketId = `#TKT-${ticketNum}`;
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway] 
        : DELIVERY_SERVICES.toast;

    const newTicket = {
        id: ticketId,
        item: menu.name,
        side: 'Garlic Fries',
        gateway: activeGw.name,
        courier: `${activeGw.name} Courier Dispatch`,
        eta: `${(Math.random() * 4 + 2).toFixed(1)} mins`,
        status: 'FRESH ON GRILL',
        timeAgo: 'Just now',
        statusClass: 'rush'
    };

    LIVE_KDS_TICKETS.unshift(newTicket);
    renderKdsTickets();
    updateProgressiveState();

    showDinerToast(
        `New Ticket: ${ticketId} 🍳`,
        `${menu.name} ordered via ${activeGw.name}. Line prep started.`,
        'fa-fire-burner'
    );

    addTelemetryLogRow(activeGw.name, 'KITCHEN.TICKET_SPAWN', '11 ms', `${ticketId}: ${menu.name}`);
}

function rushFleetDispatch() {
    playToyClick(720, 0.06);
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway] 
        : DELIVERY_SERVICES.doordash;

    showDinerToast(
        'Priority Courier Rushed! 🛵',
        `${activeGw.name} expedited courier re-routed to Parma Diner pickup window. ETA: 2.1 mins.`,
        'fa-motorcycle'
    );

    addTelemetryLogRow(activeGw.name, 'COURIER.PRIORITY_RUSH', '8 ms', '#RUSH_PICKUP_ZONE_A');
}

function simulateFullApiHealthCheck() {
    playOsClick(800, 0.03);
    const activeCount = Object.keys(DELIVERY_SERVICES).filter(k => DELIVERY_SERVICES[k].verified).length;
    showDinerToast(
        'Ping Radar Broadcast 📡',
        `Diagnostic scan completed. ${activeCount} active, ${6 - activeCount} pending with avg 18.4ms latency.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow('Ping Radar', 'HEALTH_CHECK.PING_OK', '18 ms', `#${activeCount}_OF_6_VERIFIED`);
}

function syncMenuItem(sku, name) {
    playToyClick(640, 0.04);
    const gwName = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway].name 
        : 'POS Gateway';
    showDinerToast(
        `Synced: ${sku} 🔄`,
        `"${name}" live pricing & inventory broadcast to ${gwName}.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow('POS Catalog', 'CATALOG.SKU_SYNC_OK', '15 ms', `${sku} (${name})`);
}

// ═══════════════════════════════════════════════════════════════════
// TELEMETRY LOG STREAM (STEP 3)
// ═══════════════════════════════════════════════════════════════════
function addTelemetryLogRow(provider, eventName, latency, ref) {
    const list = document.getElementById('telemetryStreamList');
    if (!list) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const row = document.createElement('div');
    row.className = 'stream-row';
    row.innerHTML = `
        <span class="stream-time">${timeStr}</span>
        <span class="stream-source">${provider}</span>
        <span class="stream-event">${eventName}</span>
        <span class="stream-latency">${latency}</span>
        <span class="stream-status">200 OK</span>
    `;

    list.insertBefore(row, list.firstChild);
    if (list.children.length > 25) {
        list.lastChild.remove();
    }

    // Update scorecard metric
    const eventMetric = document.getElementById('metricEventCount');
    if (eventMetric) {
        const cur = parseInt(eventMetric.innerText.replace(/,/g, '')) || 1428;
        eventMetric.innerText = (cur + 1).toLocaleString();
    }
}

// ═══════════════════════════════════════════════════════════════════
// SCORECARD METRIC BAR UPDATES
// ═══════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════
// SCORECARD METRIC BAR, OS FOLDER TABS & SIDE PANEL SYNC
// ═══════════════════════════════════════════════════════════════════
function updateProgressiveState() {
    let activeCount = 0;
    Object.keys(DELIVERY_SERVICES).forEach(k => {
        if (DELIVERY_SERVICES[k].verified) activeCount++;
    });

    const selectedSkuCount = DINER_MENU_ITEMS.filter(i => i.selected).length;
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway] && DELIVERY_SERVICES[currentSelectedGateway].verified)
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : null;

    // 1. Top OS Folder Tabs & Chips
    const folderGwBadge = document.getElementById('folderGatewaysBadge');
    if (folderGwBadge) folderGwBadge.innerText = `${activeCount}/6 Active`;

    const folderMenuBadge = document.getElementById('folderMenuBadge');
    if (folderMenuBadge) folderMenuBadge.innerText = `${selectedSkuCount}/7 Selected`;

    const folderKdsBadge = document.getElementById('folderKdsBadge');
    if (folderKdsBadge) folderKdsBadge.innerText = `${LIVE_KDS_TICKETS.length} Prep Queue`;

    // 2. OS Bar Status Pill & Metrics
    const osApiStatusPill = document.getElementById('osApiStatusPill');
    const osApiStatusText = document.getElementById('osApiStatusText');
    if (osApiStatusPill && osApiStatusText) {
        if (activeGw) {
            osApiStatusPill.className = 'os-status-pill active';
            osApiStatusText.innerText = `${activeGw.name.toUpperCase()} (200 OK)`;
        } else {
            osApiStatusPill.className = 'os-status-pill pending';
            osApiStatusText.innerText = 'API NOT INSTALLED';
        }
    }

    const osWebhookDisplay = document.getElementById('osWebhookDisplay');
    if (osWebhookDisplay) osWebhookDisplay.innerText = `${activeCount}/6 CONNECTED`;

    const osLatencyDisplay = document.getElementById('osLatencyDisplay');
    if (osLatencyDisplay) osLatencyDisplay.innerText = activeGw ? activeGw.latency : '18.4 ms';

    // 3. Side Panel Badges & States
    const side1Badge = document.getElementById('sideStep1StatusBadge');
    if (side1Badge) {
        side1Badge.className = activeCount > 0 ? 'side-step-badge verified' : 'side-step-badge pending';
        side1Badge.innerText = activeCount > 0 ? `${activeCount}/6 Verified` : 'Not Installed';
    }

    const side2Badge = document.getElementById('sideStep2StatusBadge');
    if (side2Badge) {
        side2Badge.className = selectedSkuCount > 0 ? 'side-step-badge verified' : 'side-step-badge neutral';
        side2Badge.innerText = `${selectedSkuCount}/7 Selected`;
    }

    const side3Badge = document.getElementById('sideStep3StatusBadge');
    if (side3Badge) {
        side3Badge.className = 'side-step-badge neutral';
        side3Badge.innerText = `${LIVE_KDS_TICKETS.length} Live Queue`;
    }

    // 4. Side Panel Active Gateway Widget Card
    const sideGwIconBox = document.getElementById('sideGwIconBox');
    const sideGwIcon = document.getElementById('sideGwIcon');
    const sideGwName = document.getElementById('sideGwName');
    const sideGwSub = document.getElementById('sideGwSub');
    const sideGwTlsBadge = document.getElementById('sideGwTlsBadge');

    if (sideGwName && sideGwSub) {
        if (activeGw) {
            if (sideGwIconBox) sideGwIconBox.className = 'side-gw-icon';
            if (sideGwIcon) sideGwIcon.className = activeGw.icon;
            sideGwName.innerText = activeGw.name;
            sideGwSub.innerText = `${activeGw.defaultLocationId} • 200 OK`;
            if (sideGwTlsBadge) sideGwTlsBadge.innerText = 'ONLINE TLS 1.3';
        } else {
            if (sideGwIconBox) sideGwIconBox.className = 'side-gw-icon unverified';
            if (sideGwIcon) sideGwIcon.className = 'fa-solid fa-triangle-exclamation';
            sideGwName.innerText = 'No Gateway Active';
            sideGwSub.innerText = 'Install & verify API in Step 1';
            if (sideGwTlsBadge) sideGwTlsBadge.innerText = 'PENDING';
        }
    }
}

// ═══════════════════════════════════════════════════════════════════
// FLOATING TOAST NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════
function showDinerToast(title, message, iconClass = 'fa-bell-concierge') {
    let container = document.getElementById('dinerToastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'dinerToastContainer';
        container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99998;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'diner-toast-notification';
    toast.style.pointerEvents = 'auto';
    toast.innerHTML = `
        <div class="diner-toast-icon">
            <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="diner-toast-content">
            <div class="diner-toast-title">${title}</div>
            <div class="diner-toast-desc">${message}</div>
        </div>
        <button type="button" class="btn-close ms-2" style="font-size:0.75rem;" onclick="this.parentElement.remove()"></button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast && toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 320);
        }
    }, 3800);
}

// ═══════════════════════════════════════════════════════════════════
// MODAL DIALOG HANDLERS
// ═══════════════════════════════════════════════════════════════════
function openApiConfigModal(serviceId) {
    playOsClick(900, 0.04);
    const s = DELIVERY_SERVICES[serviceId];
    if (!s) return;

    currentSelectedGateway = serviceId;
    document.getElementById('modalCurrentServiceId').value = serviceId;
    document.getElementById('modalServiceTitle').innerText = `${s.name} API Configuration`;
    document.getElementById('modalServiceSubtitle').innerText = `${s.categoryTag} • REST Webhooks • TLS 1.3`;

    document.getElementById('modalDemoRank').innerText = s.demographicRank;
    document.getElementById('modalDemoDesc').innerText = s.demographicDesc;

    const linkEl = document.getElementById('modalOutwardLink');
    if (linkEl) linkEl.href = s.portalUrl;

    document.getElementById('apiWebhookUrlDisplay').value = s.endpointUrl;

    if (s.verified) {
        document.getElementById('apiClientIdInput').value = s.defaultClientId;
        document.getElementById('apiSecretInput').value = s.defaultSecret;
        document.getElementById('apiLocationIdInput').value = s.defaultLocationId;
    } else {
        document.getElementById('apiClientIdInput').value = s.defaultClientId;
        document.getElementById('apiSecretInput').value = s.defaultSecret;
        document.getElementById('apiLocationIdInput').value = s.defaultLocationId;
    }

    const modalEl = document.getElementById('apiConfigModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    if (window.history && window.history.pushState) {
        window.history.pushState({ step: currentStep, modal: 'apiConfigModal' }, '', window.location.pathname + '#api-config');
    }
    modal.show();
}

function closeApiConfigModal() {
    const modalEl = document.getElementById('apiConfigModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}

function fillDemoCredentials() {
    playOsClick(700, 0.02);
    const sId = document.getElementById('modalCurrentServiceId').value;
    const s = DELIVERY_SERVICES[sId];
    if (!s) return;
    document.getElementById('apiClientIdInput').value = s.defaultClientId;
    document.getElementById('apiSecretInput').value = s.defaultSecret;
    document.getElementById('apiLocationIdInput').value = s.defaultLocationId;
}

function handleApiVerification(event) {
    event.preventDefault();
    const sId = document.getElementById('modalCurrentServiceId').value;
    const s = DELIVERY_SERVICES[sId];
    if (!s) return;

    const clientId = document.getElementById('apiClientIdInput').value.trim();
    const secret = document.getElementById('apiSecretInput').value.trim();
    const locationId = document.getElementById('apiLocationIdInput').value.trim();

    if (!clientId || !secret || !locationId) {
        alert('Please fill out all credentials to verify the POS Gateway API.');
        return;
    }

    s.verified = true;
    s.defaultClientId = clientId;
    s.defaultLocationId = locationId;
    currentSelectedGateway = sId;

    savedApiState[sId] = {
        verified: true,
        clientId: clientId,
        secret: secret,
        locationId: locationId,
        verifiedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem('dinerdashboard_delivery_api_state', JSON.stringify(savedApiState));
    } catch (err) {}

    closeApiConfigModal();
    updateProgressiveState();
    renderGatewayCards();

    // Sound effect & bell
    playDinerBell();

    showDinerToast(
        `${s.name} Verified & Connected! 🚀`,
        `API credentials validated for ${locationId}.`,
        'fa-circle-check'
    );

    addTelemetryLogRow(s.name, 'API.HANDSHAKE_VERIFIED', s.latency, `#${locationId.toUpperCase()}`);

    // Prompt user to move to menu screen to set it up (since no menu items are preselected)
    setTimeout(() => {
        const verifiedTitle = document.getElementById('verifiedModalTitle');
        const verifiedSubtitle = document.getElementById('verifiedModalSubtitle');
        if (verifiedTitle) verifiedTitle.innerText = `${s.name} Authenticated!`;
        if (verifiedSubtitle) verifiedSubtitle.innerText = `Store: ${locationId} • Protocol: ${s.protocol} • 200 OK Handshake`;

        const nextModalEl = document.getElementById('apiVerifiedNextStepModal');
        if (nextModalEl) {
            const nextModal = bootstrap.Modal.getOrCreateInstance(nextModalEl);
            if (window.history && window.history.pushState) {
                window.history.pushState({ step: currentStep, modal: 'apiVerifiedNextStepModal' }, '', window.location.pathname + '#api-verified');
            }
            nextModal.show();
        }
    }, 380);
}

function proceedToMenuScreenFromModal() {
    const nextModalEl = document.getElementById('apiVerifiedNextStepModal');
    if (nextModalEl) {
        const nextModal = bootstrap.Modal.getInstance(nextModalEl);
        if (nextModal) nextModal.hide();
    }
    playToyClick(680, 0.05);
    goToStep(2);
}

function disconnectApi(serviceId) {
    if (confirm(`Disconnect ${DELIVERY_SERVICES[serviceId]?.name} gateway?`)) {
        DELIVERY_SERVICES[serviceId].verified = false;
        delete savedApiState[serviceId];
        try {
            localStorage.setItem('dinerdashboard_delivery_api_state', JSON.stringify(savedApiState));
        } catch (e) {}

        if (currentSelectedGateway === serviceId) {
            const remaining = Object.keys(DELIVERY_SERVICES).find(k => DELIVERY_SERVICES[k].verified);
            currentSelectedGateway = remaining || null;
        }

        updateProgressiveState();
        renderGatewayCards();
        showDinerToast('Gateway Disconnected', `${DELIVERY_SERVICES[serviceId]?.name} set to uninstalled.`, 'fa-power-off');
    }
}

function resetWalkthrough() {
    if (confirm('Reset setup to Step 1? This will clear all configured gateways.')) {
        try {
            localStorage.removeItem('dinerdashboard_delivery_api_state');
        } catch (e) {}
        savedApiState = {};
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
        updateProgressiveState();
        renderGatewayCards();
        goToStep(1);
        showDinerToast('Reset Completed', 'All gateways reset to pending.', 'fa-arrow-rotate-left');
    }
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initDinerClock();
        renderGatewayCards();
        updateProgressiveState();

        // Initialize in-app back navigation & browser history
        if (typeof window !== 'undefined' && window.history && window.history.replaceState) {
            const hash = window.location.hash;
            const initialStep = (hash === '#step3') ? 3 : ((hash === '#step2') ? 2 : 1);
            window.history.replaceState({ step: initialStep, modal: null }, '', window.location.pathname + (hash.startsWith('#step') ? hash : '#step1'));
            if (initialStep !== 1) {
                goToStep(initialStep, false);
            }
        }
        initBackNavigation();
        updateBackBtnState();

        addTelemetryLogRow('DinerDashboard', 'KERNEL.BOOT_READY', '6 ms', '#KITCHEN_DISPATCH_ONLINE');
        addTelemetryLogRow('System Gateway', 'GATEWAY.BOOT_SEQUENCE', '8 ms', '#SYSTEM_INITIALIZE');
        addTelemetryLogRow('Cloud Router', 'DNS.ANYCAST_SYNC', '12 ms', '#GLOBAL_ROUTE_READY');
    });
}