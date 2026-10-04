// ═══════════════════════════════════════════════════════════════════
// DINERDASHBOARD // MODERN KITCHEN POS & MULTI-GATEWAY DISPATCH ENGINE
// ═══════════════════════════════════════════════════════════════════

// Automated Client-Side Cache Cleanup & Purge Legacy LocalStorage
(function purgeClientCaches() {
    try {
        // Clear old un-versioned storage keys that caused auto-connected state in regular browsers
        localStorage.removeItem('dinerdashboard_delivery_api_state');
        localStorage.removeItem('dinerdashboard_delivery_api_state_v2');

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

// Storage Keys
const STORAGE_KEY_API = 'dinerdashboard_delivery_api_state_v4';
const STORAGE_KEY_SITE = 'dinerdashboard_site_config_v2';

// Manual user cache clear & hard refresh
function clearDinerAppCache() {
    playToyClick(720, 0.05);
    try {
        localStorage.clear();
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
                for (const reg of registrations) {
                    reg.unregister();
                }
            }).catch(() => {});
        }
    } catch (e) {}

    // Reset runtime objects
    savedApiState = {};
    currentSelectedGateway = null;
    currentSiteConfig = {
        restaurantName: '',
        slug: '',
        street: '',
        unit: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        message: '',
        photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
        deployedDirectory: '',
        selectedSkus: []
    };
    if (Array.isArray(DINER_MENU_ITEMS)) {
        DINER_MENU_ITEMS.forEach(i => i.selected = false);
    }
    if (typeof DELIVERY_SERVICES === 'object') {
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
    }

    const base = window.location.origin + window.location.pathname;
    const cacheBusterUrl = base + '?nocache=' + Date.now() + '#step1';
    window.location.replace(cacheBusterUrl);
}

if (typeof window !== 'undefined') {
    window.clearDinerAppCache = clearDinerAppCache;
}

// ═══════════════════════════════════════════════════════════════════
// AUDIO SYNTHESIZER FOR DISCRETE OS FEEDBACK & TACTILE BUTTONS
// ═══════════════════════════════════════════════════════════════════
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

function playDinerBell() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const t = audioCtx.currentTime;
        const strikeDuration = 1.4;

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

// ═══════════════════════════════════════════════════════════════════
// MENU ITEMS CATALOG (STARTS UNSELECTED PER SPEC)
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

// Application State
let currentStep = 1;
let currentSelectedGateway = null;
let currentFilter = 'all';

// Load saved API state from versioned key (uninstalled by default)
let savedApiState = {};
try {
    const rawSaved = localStorage.getItem(STORAGE_KEY_API);
    if (rawSaved) {
        savedApiState = JSON.parse(rawSaved || '{}');
        Object.keys(savedApiState).forEach(k => {
            if (DELIVERY_SERVICES[k] && savedApiState[k].verified) {
                DELIVERY_SERVICES[k].verified = true;
                if (savedApiState[k].clientId) DELIVERY_SERVICES[k].defaultClientId = savedApiState[k].clientId;
                if (savedApiState[k].locationId) DELIVERY_SERVICES[k].defaultLocationId = savedApiState[k].locationId;
                if (!currentSelectedGateway) currentSelectedGateway = k;
            }
        });
    }
} catch (e) {
    savedApiState = {};
    currentSelectedGateway = null;
}

// Demo Site Configuration (Loaded on demand when user clicks "Fill Demo Content")
const DEMO_SITE_CONFIG = {
    restaurantName: 'Parma Sub & Fry Co',
    slug: 'parma-sub-fry-co',
    street: '5842 Ridge Rd',
    unit: 'Suite 104',
    city: 'Parma',
    state: 'OH',
    zip: '44129',
    country: 'United States',
    message: 'Welcome to Parma Sub & Fry Co! Best artisan subs and loaded fries in Ohio. Order online direct with live kitchen tracking via Uber Direct.',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    deployedDirectory: '/net-c-delivery/parma-sub-fry-co/index.html',
    selectedSkus: ['SUB-01', 'BUR-02', 'WRP-03', 'SUB-04', 'MEL-05', 'FRY-06', 'RNG-07']
};

// Initial Site Configuration (Starts clean & empty so user can practice the journey)
let currentSiteConfig = {
    restaurantName: '',
    slug: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    message: '',
    photoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    deployedDirectory: '',
    selectedSkus: []
};

// Load saved site configuration if present
try {
    const rawSite = localStorage.getItem(STORAGE_KEY_SITE);
    if (rawSite) {
        const parsed = JSON.parse(rawSite);
        currentSiteConfig = { ...currentSiteConfig, ...parsed };
        // Restore selected SKUs if saved
        if (Array.isArray(currentSiteConfig.selectedSkus) && currentSiteConfig.selectedSkus.length > 0) {
            DINER_MENU_ITEMS.forEach(item => {
                if (currentSiteConfig.selectedSkus.includes(item.sku)) {
                    item.selected = true;
                }
            });
        }
    }
} catch (e) {}

// Helper: convert restaurant name to safe directory slug
function makeDirectorySlug(name) {
    return (name || 'my-restaurant')
        .toLowerCase()
        .replace(/['"’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'restaurant-site';
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
            'API Connection Required ⚠️',
            'No Delivery API is connected yet. Please install and verify Uber Direct or another gateway in Step 1 first.',
            'fa-triangle-exclamation'
        );
        stepNum = 1;
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
        else if (stepNum === 2) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>02_create_website';
        else if (stepNum === 3) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>03_your_site';
    }

    if (stepNum === 2) {
        populateWebsiteBuilderForm();
        renderMenuCatalog();
    } else if (stepNum === 3) {
        renderDeployedSiteBanner();
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

    updateBackBtnState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateBackBtnState() {
    const backBtn = document.getElementById('back-btn-np');
    if (!backBtn) return;
    if (currentStep === 3) {
        backBtn.setAttribute('title', 'Back to Step 2: Create Website');
        backBtn.setAttribute('aria-label', 'Back to Step 2: Create Website');
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
            const openModalEl = document.querySelector('.modal.show');
            if (openModalEl) {
                e.preventDefault();
                const modalInstance = bootstrap.Modal.getInstance(openModalEl);
                if (modalInstance) {
                    modalInstance.hide();
                    return;
                }
            }

            if (currentStep === 3) {
                e.preventDefault();
                goToStep(2);
                return;
            }

            if (currentStep === 2) {
                e.preventDefault();
                goToStep(1);
                return;
            }
        });
    }

    window.addEventListener('popstate', (e) => {
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

    ['apiConfigModal', 'apiVerifiedNextStepModal', 'sitePreviewModal'].forEach((id) => {
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

function switchSheet(sheetKey) {
    if (sheetKey === 'delivery') goToStep(1);
    else if (sheetKey === 'menu') goToStep(2);
    else if (sheetKey === 'telemetry') goToStep(3);
}

// ═══════════════════════════════════════════════════════════════════
// STEP 1: GATEWAY CARDS & API CONNECTION
// ═══════════════════════════════════════════════════════════════════
function selectAndProceedGateway(serviceKey) {
    playToyClick(620, 0.05);
    const s = DELIVERY_SERVICES[serviceKey];
    if (!s) return;

    if (!s.verified) {
        openApiConfigModal(serviceKey);
        showDinerToast(
            'API Connection Required 🔑',
            `Please configure credentials and connect the ${s.name} API before selecting it.`,
            'fa-key'
        );
        return;
    }

    currentSelectedGateway = serviceKey;
    updateProgressiveState();
    renderGatewayCards();

    showDinerToast(
        `${s.name} Active 🚀`,
        `Connected via ${s.protocol}. Moving to Step 2: Create Website...`,
        'fa-square-check'
    );

    setTimeout(() => {
        goToStep(2);
    }, 350);
}

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
                            <i class="fa-solid ${isVerified ? 'fa-square-check' : 'fa-plug'}"></i>
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
                            <span>Select &amp; Proceed to Website Setup ➔</span>
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
                            <span>+ Connect ${s.name} API ➔</span>
                        </button>
                    `}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function filterGateways(filter, btnEl) {
    playToyClick(680, 0.03);
    currentFilter = filter;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderGatewayCards();
}

function handleGatewaySearch() {
    renderGatewayCards();
}

function openApiConfigModal(serviceId) {
    playOsClick(900, 0.04);
    const s = DELIVERY_SERVICES[serviceId];
    if (!s) return;

    currentSelectedGateway = serviceId;
    const currentIdEl = document.getElementById('modalCurrentServiceId');
    if (currentIdEl) currentIdEl.value = serviceId;

    const titleEl = document.getElementById('modalServiceTitle');
    if (titleEl) titleEl.innerText = `${s.name} API Setup`;

    const subEl = document.getElementById('modalServiceSubtitle');
    if (subEl) subEl.innerText = `${s.categoryTag} • ${s.protocol} • TLS 1.3`;

    const iconBox = document.getElementById('modalLogoBox');
    if (iconBox) iconBox.innerHTML = `<i class="${s.icon} fs-5 text-primary"></i>`;

    const rankEl = document.getElementById('modalDemoRank');
    if (rankEl) rankEl.innerText = s.demographicRank || 'Demographic Target';

    const descEl = document.getElementById('modalDemoDesc');
    if (descEl) descEl.innerText = s.demographicDesc || '';

    const linkEl = document.getElementById('modalOutwardLink');
    if (linkEl && s.portalUrl) linkEl.href = s.portalUrl;

    const webhookDisplay = document.getElementById('apiWebhookUrlDisplay');
    if (webhookDisplay) webhookDisplay.value = s.endpointUrl || '';

    // Populate inputs if already saved, or leave clean
    const keyInput = document.getElementById('apiClientIdInput');
    const secretInput = document.getElementById('apiSecretInput');
    const locInput = document.getElementById('apiLocationIdInput');

    if (keyInput) keyInput.value = (savedApiState[serviceId]?.clientId) || '';
    if (secretInput) secretInput.value = (savedApiState[serviceId]?.secret) || '';
    if (locInput) locInput.value = (savedApiState[serviceId]?.locationId) || '';

    const modalEl = document.getElementById('apiConfigModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    if (window.history && window.history.pushState) {
        window.history.pushState({ step: currentStep, modal: 'apiConfigModal' }, '', window.location.pathname + '#api-config');
    }
    modal.show();
}

function fillDemoCredentials() {
    playToyClick(720, 0.04);
    const sId = document.getElementById('modalCurrentServiceId')?.value || currentSelectedGateway || 'uber';
    const s = DELIVERY_SERVICES[sId] || DELIVERY_SERVICES.uber;

    const keyInput = document.getElementById('apiClientIdInput');
    const secretInput = document.getElementById('apiSecretInput');
    const locInput = document.getElementById('apiLocationIdInput');
    const webhookInput = document.getElementById('apiWebhookUrlDisplay');

    if (keyInput) keyInput.value = s.defaultClientId || `demo_client_${sId}_2026`;
    if (secretInput) secretInput.value = s.defaultSecret || `demo_sec_${sId}_982741`;
    if (locInput) locInput.value = s.defaultLocationId || `loc_parma_${sId}_01`;
    if (webhookInput) webhookInput.value = s.endpointUrl || `https://api.dinerdashboard.io/webhooks/${sId}`;

    showDinerToast(
        'Demo Keys Filled 🔑',
        `Filled production demo credentials & location ID for ${s.name}.`,
        'fa-wand-magic-sparkles'
    );
}

function handleApiVerification(event) {
    if (event) event.preventDefault();
    playToyClick(720, 0.05);

    const sId = document.getElementById('modalCurrentServiceId')?.value || currentSelectedGateway || 'uber';
    const s = DELIVERY_SERVICES[sId];
    if (!s) return;

    const apiKey = (document.getElementById('apiClientIdInput')?.value || '').trim();
    const apiSecret = (document.getElementById('apiSecretInput')?.value || '').trim();
    const locationId = (document.getElementById('apiLocationIdInput')?.value || '').trim();
    const webhookUrl = (document.getElementById('apiWebhookUrlDisplay')?.value || '').trim();

    if (!apiKey || !apiSecret) {
        alert('Please enter both Client ID / Application API Key and Secret to connect the delivery API. (You can also click "Fill Demo Keys" to auto-populate test credentials.)');
        return;
    }

    s.verified = true;
    s.defaultClientId = apiKey;
    s.defaultSecret = apiSecret;
    if (locationId) s.defaultLocationId = locationId;
    if (webhookUrl) s.endpointUrl = webhookUrl;
    currentSelectedGateway = sId;

    savedApiState[sId] = {
        verified: true,
        clientId: apiKey,
        secret: apiSecret,
        locationId: locationId || s.defaultLocationId,
        webhook: webhookUrl || s.endpointUrl,
        verifiedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(STORAGE_KEY_API, JSON.stringify(savedApiState));
    } catch (err) {}

    // Close config modal
    const modalEl = document.getElementById('apiConfigModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
    }

    updateProgressiveState();
    renderGatewayCards();
    playDinerBell();

    showDinerToast(
        `${s.name} Connected! 🚀`,
        `API credentials validated for ${s.name} (Location: ${locationId || s.defaultLocationId}).`,
        'fa-square-check'
    );

    addTelemetryLogRow(s.name, 'API.HANDSHAKE_VERIFIED', s.latency, `#KEY_${apiKey.substring(0, 8)}...`);

    // Prompt user with modal to proceed to Step 2: Create Website
    setTimeout(() => {
        const verifiedTitle = document.getElementById('verifiedModalTitle');
        const verifiedSubtitle = document.getElementById('verifiedModalSubtitle');
        if (verifiedTitle) verifiedTitle.innerText = `${s.name} Authenticated!`;
        if (verifiedSubtitle) verifiedSubtitle.innerText = `Protocol: ${s.protocol} • Location: ${locationId || s.defaultLocationId} • 200 OK Handshake`;

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

const handleApiGatewaySubmit = handleApiVerification;

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
            localStorage.setItem(STORAGE_KEY_API, JSON.stringify(savedApiState));
        } catch (e) {}

        if (currentSelectedGateway === serviceId) {
            const remaining = Object.keys(DELIVERY_SERVICES).find(k => DELIVERY_SERVICES[k].verified);
            currentSelectedGateway = remaining || null;
        }

        updateProgressiveState();
        renderGatewayCards();
        showDinerToast('Gateway Disconnected', `${DELIVERY_SERVICES[serviceId]?.name} uninstalled.`, 'fa-power-off');
    }
}

function resetWalkthrough() {
    if (confirm('Reset setup to Step 1? This will clear configured gateways and website settings.')) {
        try {
            localStorage.removeItem(STORAGE_KEY_API);
            localStorage.removeItem(STORAGE_KEY_SITE);
        } catch (e) {}
        savedApiState = {};
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
        DINER_MENU_ITEMS.forEach(i => i.selected = false);
        currentSelectedGateway = null;
        updateProgressiveState();
        renderGatewayCards();
        goToStep(1);
        showDinerToast('Reset Completed', 'All configurations reset to pending.', 'fa-arrow-rotate-left');
    }
}

// ═══════════════════════════════════════════════════════════════════
// STEP 2: CREATE WEBSITE, SEPARATE ADDRESS FIELDS & MENU CATALOG
// ═══════════════════════════════════════════════════════════════════
function populateWebsiteBuilderForm() {
    // Populate Connected Gateway Banner
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway])
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : {
            name: 'Uber Direct',
            categoryTag: 'On-Demand Merchant Delivery',
            endpointUrl: 'https://api.dinerdashboard.io/webhooks/uber',
            protocol: 'OAuth 2.0 / Webhooks',
            icon: 'fa-brands fa-uber'
        };

    const gwBadge = document.getElementById('step2GwStatusBadge');
    if (gwBadge) {
        gwBadge.innerHTML = `<i class="${activeGw.icon} me-1"></i> ${activeGw.name} Connected`;
    }

    const bannerDesc = document.getElementById('step2GwDescription');
    if (bannerDesc) {
        bannerDesc.innerText = `Your customer site will automatically route on-demand delivery dispatches through ${activeGw.name} (${activeGw.protocol}).`;
    }

    const guidanceText = document.getElementById('step2GuidanceText');
    if (guidanceText) {
        guidanceText.innerText = `${activeGw.name} Authenticated • Ready to Build Website`;
    }

    // Populate inputs from currentSiteConfig
    const nameEl = document.getElementById('siteRestaurantName');
    const streetEl = document.getElementById('siteStreet');
    const unitEl = document.getElementById('siteUnit');
    const cityEl = document.getElementById('siteCity');
    const stateEl = document.getElementById('siteState');
    const zipEl = document.getElementById('siteZip');
    const countryEl = document.getElementById('siteCountry');
    const msgEl = document.getElementById('siteMessage');
    const photoImg = document.getElementById('sitePhotoPreview');

    if (nameEl) nameEl.value = currentSiteConfig.restaurantName || '';
    if (streetEl) streetEl.value = currentSiteConfig.street || '';
    if (unitEl) unitEl.value = currentSiteConfig.unit || '';
    if (cityEl) cityEl.value = currentSiteConfig.city || '';
    if (stateEl) stateEl.value = currentSiteConfig.state || '';
    if (zipEl) zipEl.value = currentSiteConfig.zip || '';
    if (countryEl) countryEl.value = currentSiteConfig.country || '';
    if (msgEl) msgEl.value = currentSiteConfig.message || '';
    if (photoImg && currentSiteConfig.photoUrl) photoImg.src = currentSiteConfig.photoUrl;

    updateSlugPreview();
}

function updateSlugPreview() {
    const rawName = document.getElementById('siteRestaurantName')?.value?.trim();
    const slug = rawName ? makeDirectorySlug(rawName) : 'enter-restaurant-name';
    const liveSlug = document.getElementById('liveSlugDisplay');
    if (liveSlug) {
        liveSlug.innerText = slug;
    }
    return slug;
}

// User action: Fill demo content for practice walkthrough
function fillDemoSiteContent() {
    playToyClick(720, 0.05);

    const nameEl = document.getElementById('siteRestaurantName');
    const streetEl = document.getElementById('siteStreet');
    const unitEl = document.getElementById('siteUnit');
    const cityEl = document.getElementById('siteCity');
    const stateEl = document.getElementById('siteState');
    const zipEl = document.getElementById('siteZip');
    const countryEl = document.getElementById('siteCountry');
    const msgEl = document.getElementById('siteMessage');
    const photoImg = document.getElementById('sitePhotoPreview');

    if (nameEl) nameEl.value = DEMO_SITE_CONFIG.restaurantName;
    if (streetEl) streetEl.value = DEMO_SITE_CONFIG.street;
    if (unitEl) unitEl.value = DEMO_SITE_CONFIG.unit;
    if (cityEl) cityEl.value = DEMO_SITE_CONFIG.city;
    if (stateEl) stateEl.value = DEMO_SITE_CONFIG.state;
    if (zipEl) zipEl.value = DEMO_SITE_CONFIG.zip;
    if (countryEl) countryEl.value = DEMO_SITE_CONFIG.country;
    if (msgEl) msgEl.value = DEMO_SITE_CONFIG.message;
    if (photoImg) photoImg.src = DEMO_SITE_CONFIG.photoUrl;

    currentSiteConfig = {
        ...currentSiteConfig,
        ...DEMO_SITE_CONFIG,
        photoUrl: DEMO_SITE_CONFIG.photoUrl
    };

    // Auto-select all 7 menu items for demo catalog
    DINER_MENU_ITEMS.forEach(i => i.selected = true);
    renderMenuCatalog();
    updateSlugPreview();
    updateProgressiveState();

    showDinerToast(
        'Demo Content Placed! 🪄',
        'Populated Parma Sub & Fry Co brand info, address, and selected all 7 menu items. You can now build & deploy!',
        'fa-wand-magic-sparkles'
    );
}

function setPresetPhoto(type) {
    playToyClick(640, 0.03);
    const presets = {
        diner: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
        sub: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80',
        burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
    };
    const chosen = presets[type] || presets.diner;
    const photoImg = document.getElementById('sitePhotoPreview');
    if (photoImg) {
        photoImg.src = chosen;
    }
    currentSiteConfig.photoUrl = chosen;
    showDinerToast('Photo Selected 📸', `Loaded ${type.toUpperCase()} business photo preset.`, 'fa-camera');
}

function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    playOsClick(800, 0.03);
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        const photoImg = document.getElementById('sitePhotoPreview');
        if (photoImg) photoImg.src = dataUrl;
        currentSiteConfig.photoUrl = dataUrl;
        showDinerToast('Photo Uploaded 🖼️', `Selected custom business image (${(file.size / 1024).toFixed(0)} KB).`, 'fa-image');
    };
    reader.readAsDataURL(file);
}

// ═══════════════════════════════════════════════════════════════════
// MENU CATALOG RENDERING & SKUS SELECTION
// ═══════════════════════════════════════════════════════════════════
function renderMenuCatalog() {
    const tableBody = document.getElementById('menuTableBody');
    if (!tableBody) return;

    const selectedCount = DINER_MENU_ITEMS.filter(i => i.selected).length;
    const counterBadge = document.getElementById('menuSelectionCounterBadge');
    if (counterBadge) {
        counterBadge.innerText = `${selectedCount} of 7 SKUs Selected`;
        counterBadge.className = selectedCount > 0 
            ? 'badge bg-success rounded-1 font-mono' 
            : 'badge bg-warning text-dark rounded-1 font-mono';
    }

    const bannerHeadline = document.getElementById('menuBannerHeadline');
    const bannerSub = document.getElementById('menuBannerSub');
    const selectionBanner = document.getElementById('menuSelectionBanner');
    if (bannerHeadline && bannerSub) {
        if (selectedCount === 0) {
            bannerHeadline.innerText = 'Notice: No Menu Items Preselected (Practice Mode)';
            bannerSub.innerText = 'Select items below or click "Select All (7)" / "Fill Demo Content" to include them on your live website.';
            if (selectionBanner) {
                selectionBanner.className = 'menu-selection-alert-banner alert alert-warning border-0 rounded-2 p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3';
            }
        } else {
            bannerHeadline.innerText = `${selectedCount} of 7 Menu Items Staged for Live Site`;
            bannerSub.innerText = 'These items will appear on your generated customer ordering website with live prices and stock status.';
            if (selectionBanner) {
                selectionBanner.className = 'menu-selection-alert-banner alert alert-success border-0 rounded-2 p-3 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3';
            }
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
                            title="${isSel ? 'Click to remove SKU from Site' : 'Click to add SKU to Site'}">
                        <i class="fa-solid ${isSel ? 'fa-square-check' : 'fa-square'}"></i>
                        <span>${isSel ? 'Selected' : '+ Add SKU'}</span>
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
    showDinerToast(
        item.selected ? `${item.sku} Added to Site 🛒` : `${item.sku} Removed from Site ↩️`,
        `"${item.name}" is ${item.selected ? 'now included on your customer site' : 'removed'}.`,
        item.selected ? 'fa-square-check' : 'fa-minus'
    );
}

function selectAllMenuItems() {
    playToyClick(720, 0.04);
    DINER_MENU_ITEMS.forEach(i => i.selected = true);
    renderMenuCatalog();
    updateProgressiveState();
    showDinerToast('All 7 SKUs Selected! ✅', 'All menu items are now active on your customer site.', 'fa-check-double');
}

function clearMenuItemSelections() {
    playToyClick(480, 0.04);
    DINER_MENU_ITEMS.forEach(i => i.selected = false);
    renderMenuCatalog();
    updateProgressiveState();
    showDinerToast('Selection Cleared', 'No menu items are currently selected.', 'fa-xmark');
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
    showDinerToast(
        `${item.sku} ${item.inStock ? 'Available' : '86\'d'} 📋`,
        `"${item.name}" stock updated.`,
        item.inStock ? 'fa-check' : 'fa-ban'
    );
}

function syncMenuItem(sku, name) {
    playToyClick(640, 0.04);
    const gwName = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) 
        ? DELIVERY_SERVICES[currentSelectedGateway].name 
        : 'Uber Direct';
    showDinerToast(
        `Synced: ${sku} 🔄`,
        `"${name}" price & stock broadcast to ${gwName}.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow('Catalog Sync', 'SKU.BROADCAST_OK', '14 ms', `${sku} (${name})`);
}

// ═══════════════════════════════════════════════════════════════════
// GENERATE & DEPLOY WEBSITE WITH DIRECTORY SLUG
// ═══════════════════════════════════════════════════════════════════
function generateAndDeployWebsite(event) {
    if (event) event.preventDefault();
    playToyClick(720, 0.06);

    const restaurantName = (document.getElementById('siteRestaurantName')?.value || '').trim();
    const street = (document.getElementById('siteStreet')?.value || '').trim();
    const unit = (document.getElementById('siteUnit')?.value || '').trim();
    const city = (document.getElementById('siteCity')?.value || '').trim();
    const state = (document.getElementById('siteState')?.value || '').trim();
    const zip = (document.getElementById('siteZip')?.value || '').trim();
    const country = (document.getElementById('siteCountry')?.value || 'United States').trim();
    const message = (document.getElementById('siteMessage')?.value || '').trim();
    const photoImg = document.getElementById('sitePhotoPreview');
    const photoUrl = photoImg?.src || currentSiteConfig.photoUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80';

    if (!restaurantName) {
        playToyClick(320, 0.08);
        alert('Please enter a Restaurant Name (or click "Fill Demo Content" above to practice the journey).');
        document.getElementById('siteRestaurantName')?.focus();
        return;
    }

    if (!street || !city || !state || !zip) {
        playToyClick(320, 0.08);
        alert('Please fill out all required separate address fields (Street, City, State, ZIP) or click "Fill Demo Content".');
        if (!street) document.getElementById('siteStreet')?.focus();
        else if (!city) document.getElementById('siteCity')?.focus();
        else if (!state) document.getElementById('siteState')?.focus();
        else if (!zip) document.getElementById('siteZip')?.focus();
        return;
    }

    const selectedItems = DINER_MENU_ITEMS.filter(i => i.selected);
    if (selectedItems.length === 0) {
        playToyClick(320, 0.08);
        alert('Please select at least one menu item below to include on your restaurant website (or click "Select All (7)").');
        return;
    }

    const slug = makeDirectorySlug(restaurantName);
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway])
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : DELIVERY_SERVICES.uber;

    currentSiteConfig = {
        restaurantName: restaurantName,
        slug: slug,
        street: street,
        unit: unit,
        city: city,
        state: state,
        zip: zip,
        country: country,
        message: message,
        photoUrl: photoUrl,
        deployedDirectory: `/net-c-delivery/${slug}/index.html`,
        api: {
            id: activeGw.id,
            name: activeGw.name,
            protocol: activeGw.protocol,
            endpoint: activeGw.endpointUrl,
            locationId: activeGw.defaultLocationId,
            verified: true
        },
        selectedSkus: selectedItems.map(i => i.sku),
        menuItems: selectedItems,
        generatedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(currentSiteConfig));
    } catch (e) {}

    playDinerBell();
    showDinerToast(
        'Website Generated & Deployed! 🌐',
        `Directory "/net-c-delivery/${slug}/index.html" created and live!`,
        'fa-store'
    );

    addTelemetryLogRow('Site Generator', 'SITE.DEPLOY_DIRECTORY_200', '19 ms', `/${slug}/index.html`);

    renderDeployedSiteBanner();

    setTimeout(() => {
        goToStep(3);
    }, 400);
}

const handleWebsiteGeneratorSubmit = generateAndDeployWebsite;

// ═══════════════════════════════════════════════════════════════════
// STEP 3: DEPLOYED SITE BANNER & KITCHEN KDS
// ═══════════════════════════════════════════════════════════════════
function renderDeployedSiteBanner() {
    const nameEl = document.getElementById('deployedSiteName');
    const msgEl = document.getElementById('deployedSiteMsg');
    const dirEl = document.getElementById('deployedSiteDirectory');
    const addrEl = document.getElementById('deployedSiteAddress');
    const apiEl = document.getElementById('deployedSiteApiStatus');
    const skuEl = document.getElementById('deployedSiteSkuCount');
    const liveLink = document.getElementById('deployedSiteLiveLink');
    const avatar = document.getElementById('deployedSiteAvatar');

    const fullAddress = [
        currentSiteConfig.street,
        currentSiteConfig.unit,
        currentSiteConfig.city,
        `${currentSiteConfig.state} ${currentSiteConfig.zip}`,
        currentSiteConfig.country
    ].filter(Boolean).join(', ');

    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway])
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : DELIVERY_SERVICES.uber;

    const selectedCount = DINER_MENU_ITEMS.filter(i => i.selected).length;
    const slug = currentSiteConfig.slug || 'parma-sub-fry-co';

    if (nameEl) nameEl.innerText = currentSiteConfig.restaurantName || 'Parma Sub & Fry Co.';
    if (msgEl) msgEl.innerText = `"${currentSiteConfig.message || 'Artisanal cold cuts & triple-cooked hand-cut fries since 1988.'}"`;
    if (dirEl) dirEl.innerText = `/net-c-delivery/${slug}/index.html`;
    if (addrEl) addrEl.innerText = fullAddress || '5842 Ridge Rd, Suite 104, Parma, OH 44129, United States';
    if (apiEl) apiEl.innerText = `${activeGw.name} • Verified (${activeGw.protocol})`;
    if (skuEl) skuEl.innerText = `${selectedCount} Menu Items Configured`;

    const targetUrl = (slug === 'parma-sub-fry-co') ? `./parma-sub-fry-co/index.html` : `./your-site/index.html`;
    if (liveLink) liveLink.href = targetUrl;

    if (avatar && currentSiteConfig.photoUrl) {
        avatar.innerHTML = `<img src="${currentSiteConfig.photoUrl}" alt="Store Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;" onerror="this.parentElement.innerHTML='<i class=\\'fa-solid fa-store fa-2x text-primary\\'></i>'">`;
    }

    // Update In-App Preview modal iframe src
    const iframe = document.getElementById('sitePreviewIframe');
    if (iframe) iframe.src = targetUrl;

    const previewSlug = document.getElementById('previewModalSlugDisplay');
    if (previewSlug) previewSlug.innerText = `/net-c-delivery/${slug}/index.html`;

    const previewTabLink = document.getElementById('previewModalOpenNewTab');
    if (previewTabLink) previewTabLink.href = targetUrl;
}

function openInAppSitePreview() {
    playOsClick(900, 0.04);
    renderDeployedSiteBanner();
    const modalEl = document.getElementById('sitePreviewModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
    }
}

// Generate and trigger download of standalone index.html file
function downloadSiteIndexHtml() {
    playToyClick(720, 0.05);
    const htmlContent = generateStandaloneStorefrontHtml(currentSiteConfig);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `index.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showDinerToast(
        'index.html Downloaded! 📥',
        `Exported standalone website file for "${currentSiteConfig.restaurantName}".`,
        'fa-file-arrow-down'
    );
    addTelemetryLogRow('Site Exporter', 'SITE.FILE_EXPORT_DOWNLOAD', '7 ms', `index.html`);
}

// Generate the standalone HTML markup for the customer site
function generateStandaloneStorefrontHtml(config) {
    const selected = DINER_MENU_ITEMS.filter(i => i.selected);
    const items = selected.length > 0 ? selected : DINER_MENU_ITEMS;
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway])
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : DELIVERY_SERVICES.uber;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.restaurantName} • Official Online Ordering</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --accent: #f59e0b;
            --success: #10b981;
            --bg: #f8fafc;
            --surface: #ffffff;
            --text-dark: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text-dark); line-height: 1.5; }
        .hero { position: relative; background: #0f172a; color: #fff; overflow: hidden; padding: 60px 24px; }
        .hero-bg { position: absolute; inset: 0; background-image: url('${config.photoUrl}'); background-size: cover; background-position: center; opacity: 0.28; filter: blur(2px); }
        .hero-inner { position: relative; max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
        .hero-brand { display: flex; align-items: center; gap: 24px; }
        .hero-avatar { width: 96px; height: 96px; border-radius: 4px; object-fit: cover; border: 2px solid rgba(255,255,255,0.4); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .hero-title { font-size: 2.2rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; }
        .hero-message { font-size: 1.05rem; opacity: 0.9; max-width: 600px; font-style: italic; }
        .api-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 4px; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; border: 1px solid rgba(255,255,255,0.25); }
        
        .address-bar { background: #fff; border-bottom: 1px solid var(--border); padding: 16px 24px; }
        .address-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 0.9rem; }
        .addr-chip { display: flex; align-items: center; gap: 8px; color: var(--text-dark); font-weight: 600; }
        .addr-pill { background: #f1f5f9; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; }

        .main-content { max-width: 1100px; margin: 36px auto; padding: 0 24px; display: grid; grid-template-columns: 1fr 340px; gap: 32px; }
        @media (max-width: 900px) { .main-content { grid-template-columns: 1fr; } }
        
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .menu-card { background: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s, box-shadow 0.15s; }
        .menu-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px -5px rgba(0,0,0,0.06); }
        .item-icon { font-size: 2rem; margin-bottom: 12px; }
        .item-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
        .item-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; line-height: 1.4; }
        .item-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .item-price { font-size: 1.15rem; font-weight: 800; color: var(--text-dark); font-family: 'JetBrains Mono', monospace; }
        .add-cart-btn { background: var(--primary); color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: 700; font-size: 0.85rem; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .add-cart-btn:hover { background: var(--primary-dark); }

        .cart-card { background: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 24px; position: sticky; top: 24px; height: fit-content; }
        .cart-title { font-size: 1.2rem; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; }
        .cart-list { list-style: none; margin-bottom: 20px; min-height: 80px; }
        .cart-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed var(--border); font-size: 0.88rem; }
        .checkout-btn { width: 100%; background: var(--success); color: #fff; border: none; padding: 14px; border-radius: 4px; font-size: 1rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }
        .checkout-btn:hover { background: #059669; }
    </style>
</head>
<body>
    <header class="hero">
        <div class="hero-bg"></div>
        <div class="hero-inner">
            <div class="hero-brand">
                <img src="${config.photoUrl}" alt="${config.restaurantName}" class="hero-avatar" onerror="this.src='https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80'">
                <div>
                    <h1 class="hero-title">${config.restaurantName}</h1>
                    <p class="hero-message">"${config.message || 'Authentic dining & fresh orders.'}"</p>
                </div>
            </div>
            <div class="api-badge">
                <i class="${activeGw.icon}"></i>
                <span>Powered by ${activeGw.name} API</span>
            </div>
        </div>
    </header>

    <div class="address-bar">
        <div class="address-inner">
            <div class="addr-chip">
                <i class="fa-solid fa-location-dot" style="color: #ef4444;"></i>
                <span>${config.street}${config.unit ? ' ' + config.unit : ''}, ${config.city}, ${config.state} ${config.zip}, ${config.country}</span>
            </div>
            <div style="display:flex; gap:8px;">
                <span class="addr-pill">Street: ${config.street}</span>
                <span class="addr-pill">City: ${config.city}</span>
                <span class="addr-pill">State: ${config.state}</span>
                <span class="addr-pill">ZIP: ${config.zip}</span>
            </div>
        </div>
    </div>

    <main class="main-content">
        <div>
            <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 20px;">Featured Menu Items (${items.length})</h2>
            <div class="menu-grid">
                ${items.map(item => `
                    <div class="menu-card">
                        <div>
                            <div class="item-icon">${item.icon}</div>
                            <div class="item-name">${item.name}</div>
                            <div class="item-desc">${item.desc}</div>
                        </div>
                        <div class="item-bottom">
                            <span class="item-price">$${item.price.toFixed(2)}</span>
                            <button type="button" class="add-cart-btn" onclick="addToOrder('${item.sku}', '${item.name}', ${item.price})">
                                <i class="fa-solid fa-plus"></i> Add
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <aside>
            <div class="cart-card">
                <div class="cart-title">
                    <span>Your Order</span>
                    <span id="orderItemCount" style="font-size:0.85rem; background:#f1f5f9; padding:2px 8px; border-radius:3px;">0 Items</span>
                </div>
                <ul class="cart-list" id="orderList">
                    <li style="color:#94a3b8; font-size:0.85rem; text-align:center; padding:24px 0;">Cart is empty. Select items to order!</li>
                </ul>
                <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.1rem; margin-bottom:16px;">
                    <span>Total:</span>
                    <span id="orderTotal" style="font-family:'JetBrains Mono',monospace;">$0.00</span>
                </div>
                <button type="button" class="checkout-btn" onclick="checkoutOrder()">
                    <i class="fa-solid fa-motorcycle"></i>
                    <span>Order via ${activeGw.name} ➔</span>
                </button>
            </div>
        </aside>
    </main>

    <script>
        const cart = [];
        function addToOrder(sku, name, price) {
            cart.push({ sku, name, price });
            renderCart();
        }
        function renderCart() {
            const list = document.getElementById('orderList');
            const totalEl = document.getElementById('orderTotal');
            const countEl = document.getElementById('orderItemCount');
            if (cart.length === 0) {
                list.innerHTML = '<li style="color:#94a3b8; font-size:0.85rem; text-align:center; padding:24px 0;">Cart is empty.</li>';
                totalEl.innerText = '$0.00';
                countEl.innerText = '0 Items';
                return;
            }
            let total = 0;
            list.innerHTML = cart.map(item => {
                total += item.price;
                return '<li class="cart-item"><span>' + item.name + '</span><strong>$' + item.price.toFixed(2) + '</strong></li>';
            }).join('');
            totalEl.innerText = '$' + total.toFixed(2);
            countEl.innerText = cart.length + ' Items';
        }
        function checkoutOrder() {
            if (cart.length === 0) {
                alert('Please add items to your cart first.');
                return;
            }
            alert('Order submitted successfully! Dispatched to Kitchen Grill and routed via ${activeGw.name} courier fleet.');
            cart.length = 0;
            renderCart();
        }
    <\/script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// KITCHEN KDS TICKETS QUEUE & TELEMETRY STREAM
// ═══════════════════════════════════════════════════════════════════
let LIVE_KDS_TICKETS = [
    {
        id: '#TKT-4829',
        item: 'Artisan Ribeye Cheesesteak Supreme',
        side: 'Garlic Truffle Fries',
        gateway: 'Uber Direct',
        courier: 'Uber Courier (Toyota Prius)',
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
        courier: 'Uber Direct Courier #UB-41',
        eta: '4.8 mins',
        status: 'READY FOR COURIER',
        timeAgo: '1m 45s',
        statusClass: 'ready'
    },
    {
        id: '#TKT-4831',
        item: 'Charred Buffalo Chicken Wrap',
        side: 'Crispy Onion Rings',
        gateway: 'Uber Direct',
        courier: 'Uber Courier (Honda Scooter)',
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
        : DELIVERY_SERVICES.uber;

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
        : DELIVERY_SERVICES.uber;

    showDinerToast(
        'Priority Courier Rushed! 🛵',
        `${activeGw.name} expedited courier re-routed to Parma pickup window. ETA: 2.1 mins.`,
        'fa-motorcycle'
    );

    addTelemetryLogRow(activeGw.name, 'COURIER.PRIORITY_RUSH', '8 ms', '#RUSH_PICKUP_ZONE_A');
}

function simulateFullApiHealthCheck() {
    playOsClick(800, 0.03);
    const activeCount = Object.keys(DELIVERY_SERVICES).filter(k => DELIVERY_SERVICES[k].verified).length;
    showDinerToast(
        'Ping Radar Broadcast 📡',
        `Diagnostic scan completed. ${activeCount} active with avg 18.4ms latency.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow('Ping Radar', 'HEALTH_CHECK.PING_OK', '18 ms', `#${activeCount}_OF_6_VERIFIED`);
}

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
}

// ═══════════════════════════════════════════════════════════════════
// SCORECARD & PROGRESSIVE STATE SYNC
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
    if (folderMenuBadge) folderMenuBadge.innerText = `${selectedSkuCount}/7 SKUs`;

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
        side2Badge.innerText = `${selectedSkuCount}/7 SKUs`;
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
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initDinerClock();
        renderGatewayCards();
        updateProgressiveState();

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

// ═══════════════════════════════════════════════════════════════════
// GLOBAL WINDOW EVENT HANDLERS EXPORT
// ═══════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
    window.fillDemoCredentials = fillDemoCredentials;
    window.fillDemoSiteContent = fillDemoSiteContent;
    window.handleApiVerification = handleApiVerification;
    window.handleApiGatewaySubmit = handleApiVerification;
    window.generateAndDeployWebsite = generateAndDeployWebsite;
    window.handleWebsiteGeneratorSubmit = generateAndDeployWebsite;
    window.goToStep = goToStep;
    window.selectAndProceedGateway = selectAndProceedGateway;
    window.openApiConfigModal = openApiConfigModal;
    window.disconnectApi = disconnectApi;
    window.filterGateways = filterGateways;
    window.handleGatewaySearch = handleGatewaySearch;
    window.selectAllMenuItems = selectAllMenuItems;
    window.clearMenuItemSelections = clearMenuItemSelections;
    window.toggleMenuItemSelection = toggleMenuItemSelection;
    window.adjustItemPrice = adjustItemPrice;
    window.toggleItemStock = toggleItemStock;
    window.syncMenuItem = syncMenuItem;
    window.setPresetPhoto = setPresetPhoto;
    window.handlePhotoUpload = handlePhotoUpload;
    window.updateSlugPreview = updateSlugPreview;
    window.openInAppSitePreview = openInAppSitePreview;
    window.downloadSiteIndexHtml = downloadSiteIndexHtml;
    window.ringDinerBell = ringDinerBell;
    window.spawnDinerTicket = spawnDinerTicket;
    window.rushFleetDispatch = rushFleetDispatch;
    window.simulateFullApiHealthCheck = simulateFullApiHealthCheck;
    window.resetWalkthrough = resetWalkthrough;
    window.toggleAudio = toggleAudio;
    window.proceedToMenuScreenFromModal = proceedToMenuScreenFromModal;
    window.expediteTicket = expediteTicket;
}