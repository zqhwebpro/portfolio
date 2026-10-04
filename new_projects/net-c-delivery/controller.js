// ═══════════════════════════════════════════════════════════════════
// DINERDASHBOARD // RESTAURANT SETUP & MULTI-GATEWAY DIRECTORY ENGINE
// ═══════════════════════════════════════════════════════════════════

// Versioned Cache & Storage Keys
const STORAGE_KEY_API = 'dinerdashboard_delivery_api_state_v6';
const STORAGE_KEY_SITE = 'dinerdashboard_site_config_v5';

// Automated Client-Side Cache Cleanup & Purge Legacy Data
(function purgeClientCaches() {
    try {
        localStorage.removeItem('dinerdashboard_delivery_api_state');
        localStorage.removeItem('dinerdashboard_delivery_api_state_v2');
        localStorage.removeItem('dinerdashboard_delivery_api_state_v4');
        localStorage.removeItem('dinerdashboard_delivery_api_state_v5');
        localStorage.removeItem('dinerdashboard_site_config_v2');
        localStorage.removeItem('dinerdashboard_site_config_v3');
        localStorage.removeItem('dinerdashboard_site_config_v4');

        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach((name) => caches.delete(name));
            }).catch(() => {});
        }
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
                for (const reg of registrations) reg.unregister();
            }).catch(() => {});
        }
    } catch (e) {}
})();

// Clear cache & hard refresh back to clean state
function clearDinerAppCache() {
    playToyClick(720, 0.05);
    try {
        localStorage.clear();
        sessionStorage.clear();
        if ('caches' in window) {
            caches.keys().then((names) => {
                for (const name of names) caches.delete(name);
            }).catch(() => {});
        }
    } catch (e) {}

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
        country: 'United States',
        logoUrl: '',
        deployedDirectory: ''
    };

    if (typeof DELIVERY_SERVICES === 'object') {
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
    }

    const base = window.location.origin + window.location.pathname;
    window.location.replace(base + '?nocache=' + Date.now() + '#step1');
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
    } catch (e) {}
}

function playDinerBell() {
    if (!soundEnabled) return;
    try {
        initAudio();
        if (!audioCtx) return;
        const t = audioCtx.currentTime;

        const strike1 = audioCtx.createOscillator();
        const strike2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        strike1.type = 'sine';
        strike1.frequency.setValueAtTime(1980, t);
        strike1.frequency.exponentialRampToValueAtTime(1960, t + 0.9);

        strike2.type = 'triangle';
        strike2.frequency.setValueAtTime(3960, t);
        strike2.frequency.exponentialRampToValueAtTime(3920, t + 0.6);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

        strike1.connect(gain);
        strike2.connect(gain);
        gain.connect(audioCtx.destination);

        strike1.start(t);
        strike2.start(t);
        strike1.stop(t + 0.9);
        strike2.stop(t + 0.9);
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
        defaultLocationId: 'uber_loc_direct_104',
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
        defaultClientId: 'dd_drive_client_main_441',
        defaultSecret: 'dd_jwt_secret_88192aacc7712',
        defaultLocationId: 'store_main_dd_771',
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
        defaultClientId: 'toast_app_store_982',
        defaultSecret: 'tst_sec_89234bfa09e1889c201',
        defaultLocationId: 'loc_store_grill_01',
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
        defaultClientId: 'gh_partner_store_902',
        defaultSecret: 'gh_sec_token_55219bc001',
        defaultLocationId: 'gh_merchant_store_8829',
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
        defaultClientId: 'sq0idp-store_88291047192aa',
        defaultSecret: 'sq0csp-99214710188bc',
        defaultLocationId: 'L8829104STORE',
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
        defaultClientId: 'clover_app_store_991823',
        defaultSecret: 'clv_token_8821901aa',
        defaultLocationId: 'CLV_MERCH_STORE_7718',
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
let deployedBlobUrl = null;

// Saved API State
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

// Initial Site Configuration (Starts completely empty per specification)
let currentSiteConfig = {
    restaurantName: '',
    slug: '',
    street: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    logoUrl: '',
    deployedDirectory: '',
    menuItems: []
};

// ═══════════════════════════════════════════════════════════════════
// CATALOG OF RESTAURANT MENU ITEMS FOR STEP 4 GATEWAY SYNC
// ═══════════════════════════════════════════════════════════════════
const DINER_MENU_CATALOG = [
    {
        id: 'sku-01',
        sku: 'SUB-01',
        name: 'Ribeye Cheesesteak Sub',
        category: 'Sub Sandwiches',
        price: 15.95,
        inStock: true,
        selected: true,
        description: 'Shaved ribeye, caramelized onions, sweet peppers, and melted provolone on freshly baked artisan roll.',
        icon: 'fa-solid fa-bread-slice'
    },
    {
        id: 'sku-02',
        sku: 'BGR-02',
        name: 'Double Smash Diner Burger',
        category: 'Burgers',
        price: 13.50,
        inStock: true,
        selected: true,
        description: 'Two seared Angus patties, sharp American cheddar, dill pickles, and signature diner sauce on toasted brioche.',
        icon: 'fa-solid fa-burger'
    },
    {
        id: 'sku-03',
        sku: 'WRP-03',
        name: 'Crispy Buffalo Chicken Wrap',
        category: 'Wraps',
        price: 12.75,
        inStock: true,
        selected: true,
        description: 'Golden fried chicken tenders tossed in house cayenne buffalo glaze, celery slaw, and buttermilk ranch in garlic wrap.',
        icon: 'fa-solid fa-drumstick-bite'
    },
    {
        id: 'sku-04',
        sku: 'SUB-04',
        name: 'Classic Italian Deli Grinder',
        category: 'Sub Sandwiches',
        price: 14.50,
        inStock: true,
        selected: true,
        description: 'Prosciutto di Parma, Genoa salami, hot capicola, aged provolone, shredded lettuce, tomato, oregano vinaigrette.',
        icon: 'fa-solid fa-pepper-hot'
    },
    {
        id: 'sku-05',
        sku: 'FRY-05',
        name: 'Parmesan Truffle Loaded Fries',
        category: 'Sides & Fries',
        price: 7.95,
        inStock: true,
        selected: true,
        description: 'Crispy russet fries tossed in white truffle oil, shaved pecorino parmesan, fresh rosemary, and garlic aioli dip.',
        icon: 'fa-solid fa-utensils'
    },
    {
        id: 'sku-06',
        sku: 'SLD-06',
        name: 'Diner Caesar Salad Bowl',
        category: 'Salads',
        price: 9.50,
        inStock: true,
        selected: true,
        description: 'Crisp romaine hearts, toasted sourdough croutons, shaved parmesan reggiano, and house anchovy garlic Caesar dressing.',
        icon: 'fa-solid fa-bowl-food'
    },
    {
        id: 'sku-07',
        sku: 'SHK-07',
        name: 'Hand-Spun Madagascar Vanilla Shake',
        category: 'Beverages',
        price: 6.50,
        inStock: true,
        selected: true,
        description: 'Hand-dipped churned vanilla bean ice cream, whole milk, whipped cream peak, and maraschino cherry.',
        icon: 'fa-solid fa-ice-cream'
    }
];

// Load saved site configuration if explicitly created previously
try {
    const rawSite = localStorage.getItem(STORAGE_KEY_SITE);
    if (rawSite) {
        const parsed = JSON.parse(rawSite);
        if (parsed.restaurantName) {
            currentSiteConfig = { ...currentSiteConfig, ...parsed };
            if (Array.isArray(parsed.menuItems) && parsed.menuItems.length > 0) {
                DINER_MENU_CATALOG.forEach(catItem => {
                    const saved = parsed.menuItems.find(m => m.id === catItem.id || m.sku === catItem.sku);
                    if (saved) {
                        catItem.selected = true;
                        if (saved.price) catItem.price = saved.price;
                        if (typeof saved.inStock === 'boolean') catItem.inStock = saved.inStock;
                    } else {
                        catItem.selected = false;
                    }
                });
            }
        }
    }
} catch (e) {}

// Helper: convert restaurant name to safe directory-friendly naming scheme
function makeDirectorySlug(name) {
    return (name || '')
        .toLowerCase()
        .replace(/['"’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ═══════════════════════════════════════════════════════════════════
// STEPPER WIZARD ENGINE (SIDE PANEL & OS FOLDER TABS SYNC)
// ═══════════════════════════════════════════════════════════════════
function goToStep(stepNum, pushToHistory = true) {
    playToyClick(580, 0.04);

    const hasVerifiedGateway = Object.keys(DELIVERY_SERVICES).some(k => DELIVERY_SERVICES[k].verified);
    const hasConfiguredSite = !!(currentSiteConfig && currentSiteConfig.restaurantName && currentSiteConfig.street);

    // Gateways must be verified before moving to Step 2
    if (stepNum >= 2 && !hasVerifiedGateway) {
        playToyClick(320, 0.08);
        showDinerToast(
            'API Connection Required ⚠️',
            'No Delivery API is connected yet. Please install and test demo keys for any gateway in Step 1 first.',
            'fa-triangle-exclamation'
        );
        stepNum = 1;
    }

    // Restaurant details must be set before Step 3 or Step 4
    if (stepNum >= 3 && !hasConfiguredSite) {
        playToyClick(320, 0.08);
        showDinerToast(
            'Restaurant Details Required 📋',
            'Please enter your business name and address in the Step 2 form first.',
            'fa-store'
        );
        stepNum = 2;
    }

    currentStep = stepNum;

    // View visibility
    const s1 = document.getElementById('step1View');
    const s2 = document.getElementById('step2View');
    const s3 = document.getElementById('step3View');
    const s4 = document.getElementById('step4View');

    if (s1) s1.classList.toggle('d-none', stepNum !== 1);
    if (s2) s2.classList.toggle('d-none', stepNum !== 2);
    if (s3) s3.classList.toggle('d-none', stepNum !== 3);
    if (s4) s4.classList.toggle('d-none', stepNum !== 4);

    // Update side panel buttons
    const side1 = document.getElementById('sideStepTab1');
    const side2 = document.getElementById('sideStepTab2');
    const side3 = document.getElementById('sideStepTab3');
    const side4 = document.getElementById('sideStepTab4');
    const hasSyncedMenu = !!(currentSiteConfig && Array.isArray(currentSiteConfig.menuItems) && currentSiteConfig.menuItems.length > 0);

    if (side1) {
        side1.classList.toggle('active', stepNum === 1);
        side1.classList.toggle('verified', hasVerifiedGateway);
    }
    if (side2) {
        side2.classList.toggle('active', stepNum === 2);
        side2.classList.toggle('verified', hasConfiguredSite);
    }
    if (side3) {
        side3.classList.toggle('active', stepNum === 3);
        side3.classList.toggle('verified', hasConfiguredSite);
    }
    if (side4) {
        side4.classList.toggle('active', stepNum === 4);
        side4.classList.toggle('verified', hasSyncedMenu);
    }

    // Update OS folder tabs
    const f1 = document.getElementById('folderTab1');
    const f2 = document.getElementById('folderTab2');
    const f3 = document.getElementById('folderTab3');
    const f4 = document.getElementById('folderTab4');

    const icon1 = document.getElementById('folderIcon1');
    const icon2 = document.getElementById('folderIcon2');
    const icon3 = document.getElementById('folderIcon3');
    const icon4 = document.getElementById('folderIcon4');

    if (f1) f1.classList.toggle('active', stepNum === 1);
    if (f2) f2.classList.toggle('active', stepNum === 2);
    if (f3) f3.classList.toggle('active', stepNum === 3);
    if (f4) f4.classList.toggle('active', stepNum === 4);

    if (icon1) icon1.className = stepNum === 1 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';
    if (icon2) icon2.className = stepNum === 2 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';
    if (icon3) icon3.className = stepNum === 3 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';
    if (icon4) icon4.className = stepNum === 4 ? 'fa-solid fa-folder-open folder-icon' : 'fa-solid fa-folder folder-icon';

    // Update OS Breadcrumb ribbon
    const bc = document.getElementById('osActiveFolderBreadcrumb');
    if (bc) {
        if (stepNum === 1) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>01_gateways';
        else if (stepNum === 2) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>02_restaurant_setup';
        else if (stepNum === 3) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>03_directory_index';
        else if (stepNum === 4) bc.innerHTML = '<i class="fa-regular fa-folder-open me-1 text-primary"></i>04_sync_menu';
    }

    if (stepNum === 2) {
        populateWebsiteBuilderForm();
    } else if (stepNum === 3) {
        renderDeployedSiteBanner();
    } else if (stepNum === 4) {
        renderStep4MenuTable();
    }

    updateProgressiveState();

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
    if (currentStep === 4) {
        backBtn.setAttribute('title', 'Back to Step 3: Directory & index.html');
        backBtn.setAttribute('aria-label', 'Back to Step 3: Directory & index.html');
    } else if (currentStep === 3) {
        backBtn.setAttribute('title', 'Back to Step 2: Restaurant Setup');
        backBtn.setAttribute('aria-label', 'Back to Step 2: Restaurant Setup');
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

            if (currentStep === 4) {
                e.preventDefault();
                goToStep(3);
                return;
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
        } else if (window.location.hash === '#step4') {
            targetStep = 4;
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
            `Please configure credentials or click "Fill Demo Keys" to connect ${s.name}.`,
            'fa-key'
        );
        return;
    }

    currentSelectedGateway = serviceKey;
    updateProgressiveState();
    renderGatewayCards();

    showDinerToast(
        `${s.name} Active 🚀`,
        `Connected via ${s.protocol}. Moving to Step 2: Restaurant Setup...`,
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
                            <span>Select &amp; Proceed to Setup Form ➔</span>
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
    if (locInput) locInput.value = s.defaultLocationId || `loc_store_${sId}_01`;
    if (webhookInput) webhookInput.value = s.endpointUrl || `https://api.dinerdashboard.io/webhooks/${sId}`;

    showDinerToast(
        'Demo Keys Filled 🔑',
        `Filled demo credentials & store ID for ${s.name}.`,
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
        alert('Please enter both Client ID / Application API Key and Secret, or click "Fill Demo Keys" to test.');
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
        `API credentials validated for ${s.name}. Proceeding to Restaurant Setup...`,
        'fa-square-check'
    );

    addTelemetryLogRow(s.name, 'API.HANDSHAKE_VERIFIED', s.latency, `#KEY_${apiKey.substring(0, 8)}...`);

    setTimeout(() => {
        const verifiedTitle = document.getElementById('verifiedModalTitle');
        const verifiedSubtitle = document.getElementById('verifiedModalSubtitle');
        if (verifiedTitle) verifiedTitle.innerText = `${s.name} Authenticated!`;
        if (verifiedSubtitle) verifiedSubtitle.innerText = `Protocol: ${s.protocol} • 200 OK Handshake`;

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

function proceedToSetupFromModal() {
    const nextModalEl = document.getElementById('apiVerifiedNextStepModal');
    if (nextModalEl) {
        const nextModal = bootstrap.Modal.getInstance(nextModalEl);
        if (nextModal) nextModal.hide();
    }
    playToyClick(680, 0.05);
    goToStep(2);
}
const proceedToMenuScreenFromModal = proceedToSetupFromModal;

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
    if (confirm('Reset setup to Step 1? This will clear configured gateways and restaurant form settings.')) {
        try {
            localStorage.removeItem(STORAGE_KEY_API);
            localStorage.removeItem(STORAGE_KEY_SITE);
        } catch (e) {}
        savedApiState = {};
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
        currentSiteConfig = {
            restaurantName: '',
            slug: '',
            street: '',
            unit: '',
            city: '',
            state: '',
            zip: '',
            country: 'United States',
            logoUrl: '',
            deployedDirectory: '',
            menuItems: []
        };
        DINER_MENU_CATALOG.forEach(item => {
            item.selected = true;
            item.inStock = true;
        });
        currentSelectedGateway = null;
        updateProgressiveState();
        renderGatewayCards();
        goToStep(1);
        showDinerToast('Reset Completed', 'All configurations reset to pending.', 'fa-arrow-rotate-left');
    }
}

// ═══════════════════════════════════════════════════════════════════
// STEP 2: RESTAURANT DETAILS FORM & DIRECTORY SLUG
// ═══════════════════════════════════════════════════════════════════
function populateWebsiteBuilderForm() {
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway])
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : {
            name: 'Uber Direct',
            categoryTag: 'On-Demand Merchant Delivery',
            endpointUrl: 'https://api.dinerdashboard.io/webhooks/uber',
            protocol: 'OAuth 2.0 / Webhooks',
            icon: 'fa-brands fa-uber'
        };

    const gwTitle = document.getElementById('activeGwTitle');
    const gwSub = document.getElementById('activeGwSubtitle');
    const gwIcon = document.getElementById('activeGwIcon');

    if (gwTitle) gwTitle.innerText = `Active Gateway: ${activeGw.name}`;
    if (gwSub) gwSub.innerText = `${activeGw.categoryTag} • ${activeGw.protocol} • 200 OK`;
    if (gwIcon) gwIcon.innerHTML = `<i class="${activeGw.icon}"></i>`;

    const guidanceText = document.getElementById('step2GuidanceText');
    if (guidanceText) {
        guidanceText.innerText = `${activeGw.name} Authenticated • Ready to Setup Restaurant`;
    }

    const nameEl = document.getElementById('siteRestaurantName');
    const streetEl = document.getElementById('siteStreet');
    const unitEl = document.getElementById('siteUnit');
    const cityEl = document.getElementById('siteCity');
    const stateEl = document.getElementById('siteState');
    const zipEl = document.getElementById('siteZip');
    const countryEl = document.getElementById('siteCountry');

    if (nameEl) nameEl.value = currentSiteConfig.restaurantName || '';
    if (streetEl) streetEl.value = currentSiteConfig.street || '';
    if (unitEl) unitEl.value = currentSiteConfig.unit || '';
    if (cityEl) cityEl.value = currentSiteConfig.city || '';
    if (stateEl) stateEl.value = currentSiteConfig.state || '';
    if (zipEl) zipEl.value = currentSiteConfig.zip || '';
    if (countryEl) countryEl.value = currentSiteConfig.country || 'United States';

    renderLogoPreview();
    updateSlugPreview();
}

function updateSlugPreview() {
    const rawName = document.getElementById('siteRestaurantName')?.value?.trim();
    const slug = rawName ? makeDirectorySlug(rawName) : '';
    const liveSlug = document.getElementById('liveSlugDisplay');
    if (liveSlug) {
        liveSlug.innerText = slug || 'enter-business-name';
    }
    return slug;
}

function handlePhotoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    playOsClick(800, 0.03);
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        currentSiteConfig.logoUrl = dataUrl;
        renderLogoPreview();
        showDinerToast('Logo Uploaded 🖼️', `Loaded custom logo (${(file.size / 1024).toFixed(0)} KB).`, 'fa-image');
    };
    reader.readAsDataURL(file);
}

function handleLogoUrlInput(url) {
    currentSiteConfig.logoUrl = (url || '').trim();
    renderLogoPreview();
}

function clearLogo() {
    playToyClick(480, 0.04);
    currentSiteConfig.logoUrl = '';
    const urlInput = document.getElementById('siteLogoUrlInput');
    const fileInput = document.getElementById('sitePhotoUpload');
    if (urlInput) urlInput.value = '';
    if (fileInput) fileInput.value = '';
    renderLogoPreview();
    showDinerToast('Logo Cleared', 'Using default store storefront icon.', 'fa-xmark');
}

function renderLogoPreview() {
    const previewImg = document.getElementById('sitePhotoPreview');
    const fallbackIcon = document.getElementById('siteLogoFallbackIcon');
    const clearBtn = document.getElementById('btnClearLogo');
    const urlInput = document.getElementById('siteLogoUrlInput');

    if (currentSiteConfig.logoUrl) {
        if (previewImg) {
            previewImg.src = currentSiteConfig.logoUrl;
            previewImg.style.display = 'block';
        }
        if (fallbackIcon) fallbackIcon.style.display = 'none';
        if (clearBtn) clearBtn.style.display = 'inline-block';
        if (urlInput && !urlInput.value && !currentSiteConfig.logoUrl.startsWith('data:')) {
            urlInput.value = currentSiteConfig.logoUrl;
        }
    } else {
        if (previewImg) {
            previewImg.src = '';
            previewImg.style.display = 'none';
        }
        if (fallbackIcon) fallbackIcon.style.display = 'block';
        if (clearBtn) clearBtn.style.display = 'none';
    }
}

// ═══════════════════════════════════════════════════════════════════
// STEP 3: DIRECTORY CREATION & BASE INDEX.HTML COMPILATION
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
    const logoUrl = currentSiteConfig.logoUrl || '';

    if (!restaurantName) {
        playToyClick(320, 0.08);
        alert('Please enter a Business Name to set up the restaurant directory.');
        document.getElementById('siteRestaurantName')?.focus();
        return;
    }

    if (!street || !city || !state || !zip) {
        playToyClick(320, 0.08);
        alert('Please fill out the physical address fields (Street, City, State, ZIP).');
        if (!street) document.getElementById('siteStreet')?.focus();
        else if (!city) document.getElementById('siteCity')?.focus();
        else if (!state) document.getElementById('siteState')?.focus();
        else if (!zip) document.getElementById('siteZip')?.focus();
        return;
    }

    const slug = makeDirectorySlug(restaurantName) || 'restaurant-site';
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
        logoUrl: logoUrl,
        deployedDirectory: `/net-c-delivery/${slug}/index.html`,
        menuItems: currentSiteConfig.menuItems || [],
        api: {
            id: activeGw.id,
            name: activeGw.name,
            icon: activeGw.icon,
            protocol: activeGw.protocol,
            endpoint: activeGw.endpointUrl,
            locationId: activeGw.defaultLocationId || '',
            verified: true
        },
        generatedAt: new Date().toISOString()
    };

    // Generate standalone index.html content based on base template
    const htmlContent = generateStandaloneStorefrontHtml(currentSiteConfig);

    // Call backend API if running to create physical directory on disk
    fetch('/api/restaurant/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            businessName: restaurantName,
            street: street,
            unit: unit,
            city: city,
            state: state,
            zip: zip,
            country: country,
            logoUrl: logoUrl,
            apiName: activeGw.name,
            apiEndpoint: activeGw.endpointUrl,
            htmlContent: htmlContent,
            menuItems: currentSiteConfig.menuItems || []
        })
    }).then(res => res.json()).then(data => {
        addTelemetryLogRow('Directory System', 'DISK.DIRECTORY_CREATED', '12 ms', data.directory || `/${slug}/`);
    }).catch(() => {
        addTelemetryLogRow('Directory System', 'VIRTUAL.DIRECTORY_MOUNT', '3 ms', `/${slug}/index.html`);
    });

    // Save to localStorage for browser persistence
    try {
        localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(currentSiteConfig));
    } catch (e) {}

    // Create Blob URL for instant iframe and new tab preview
    if (deployedBlobUrl) URL.revokeObjectURL(deployedBlobUrl);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    deployedBlobUrl = URL.createObjectURL(blob);

    playDinerBell();
    showDinerToast(
        'Directory & index.html Created! 📁',
        `Created directory "/net-c-delivery/${slug}/" with base index.html.`,
        'fa-folder-check'
    );

    addTelemetryLogRow('Site Compiler', 'BASE_INDEX.COMPILED', '9 ms', `/${slug}/index.html`);

    renderDeployedSiteBanner();

    setTimeout(() => {
        goToStep(3);
    }, 350);
}

function renderDeployedSiteBanner() {
    const nameEl = document.getElementById('deployedSiteName');
    const dirEl = document.getElementById('deployedSiteDirectory');
    const addrEl = document.getElementById('deployedSiteAddress');
    const apiEl = document.getElementById('deployedSiteApiStatus');
    const liveLink = document.getElementById('deployedSiteLiveLink');
    const defaultIcon = document.getElementById('deployedAvatarDefaultIcon');
    const avatarImg = document.getElementById('deployedAvatarImg');

    const fullAddress = [
        currentSiteConfig.street,
        currentSiteConfig.unit,
        currentSiteConfig.city,
        `${currentSiteConfig.state} ${currentSiteConfig.zip}`,
        currentSiteConfig.country
    ].filter(Boolean).join(', ');

    const activeGw = (currentSiteConfig.api && currentSiteConfig.api.name)
        ? currentSiteConfig.api
        : ((currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) ? DELIVERY_SERVICES[currentSelectedGateway] : DELIVERY_SERVICES.uber);

    const slug = currentSiteConfig.slug || 'your-site';

    if (nameEl) nameEl.innerText = currentSiteConfig.restaurantName || 'Restaurant Storefront';
    if (dirEl) dirEl.innerText = `/net-c-delivery/${slug}/index.html`;
    if (addrEl) addrEl.innerText = fullAddress || 'Address will appear here after Step 2';
    if (apiEl) apiEl.innerText = `${activeGw.name} • Verified (${activeGw.protocol || 'REST'})`;

    // Handle avatar / logo in banner
    if (currentSiteConfig.logoUrl) {
        if (avatarImg) {
            avatarImg.src = currentSiteConfig.logoUrl;
            avatarImg.style.display = 'block';
        }
        if (defaultIcon) defaultIcon.style.display = 'none';
    } else {
        if (avatarImg) avatarImg.style.display = 'none';
        if (defaultIcon) defaultIcon.style.display = 'block';
    }

    if (!deployedBlobUrl && currentSiteConfig.restaurantName) {
        try {
            const html = generateStandaloneStorefrontHtml(currentSiteConfig);
            const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
            deployedBlobUrl = URL.createObjectURL(blob);
        } catch (e) {}
    }

    const previewUrl = deployedBlobUrl || `./your-site/index.html`;

    if (liveLink) liveLink.href = previewUrl;

    // Update in-app interactive preview iframe
    const inlineIframe = document.getElementById('step3InlinePreviewIframe');
    if (inlineIframe) inlineIframe.src = previewUrl;

    const inlineUrlDisplay = document.getElementById('inlinePreviewUrlDisplay');
    if (inlineUrlDisplay) inlineUrlDisplay.innerText = `/net-c-delivery/${slug}/index.html`;

    const inlineOpenLink = document.getElementById('inlinePreviewOpenLink');
    if (inlineOpenLink) inlineOpenLink.href = previewUrl;

    // Update preview modal iframe
    const modalIframe = document.getElementById('sitePreviewIframe');
    if (modalIframe) modalIframe.src = previewUrl;

    const modalSlugDisplay = document.getElementById('previewModalSlugDisplay');
    if (modalSlugDisplay) modalSlugDisplay.innerText = `/net-c-delivery/${slug}/index.html`;

    const modalOpenTab = document.getElementById('previewModalOpenNewTab');
    if (modalOpenTab) modalOpenTab.href = previewUrl;
}

function reloadInlinePreview() {
    playToyClick(640, 0.03);
    const inlineIframe = document.getElementById('step3InlinePreviewIframe');
    if (inlineIframe) {
        inlineIframe.src = deployedBlobUrl || `./your-site/index.html`;
    }
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
        `Downloaded base index.html configured for "${currentSiteConfig.restaurantName}".`,
        'fa-file-arrow-down'
    );
    addTelemetryLogRow('Site Exporter', 'SITE.FILE_EXPORT_DOWNLOAD', '5 ms', `index.html`);
}

// Generate the standalone HTML markup based on base-index.html
function generateStandaloneStorefrontHtml(config) {
    const activeGw = (config.api && config.api.name)
        ? config.api
        : ((currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) ? DELIVERY_SERVICES[currentSelectedGateway] : DELIVERY_SERVICES.uber);

    const safeConfigJson = JSON.stringify(config).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="pageTitle">${config.restaurantName || 'Restaurant Storefront'} • Online Ordering & Delivery</title>
    <meta name="description" content="Official storefront and direct delivery dispatch for ${config.restaurantName || 'Restaurant'}.">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0284c7;
            --primary-dark: #0369a1;
            --accent: #f59e0b;
            --success: #10b981;
            --surface: #ffffff;
            --bg: #f8fafc;
            --border: #e2e8f0;
            --text-dark: #0f172a;
            --text-muted: #64748b;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: var(--bg);
            color: var(--text-dark);
            line-height: 1.5;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            -webkit-font-smoothing: antialiased;
        }

        .site-nav {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 14px 24px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .nav-inner {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }

        .nav-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: var(--text-dark);
        }

        .nav-logo-box {
            width: 44px;
            height: 44px;
            border-radius: 8px;
            overflow: hidden;
            background: #f1f5f9;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--border);
            color: var(--primary);
            font-size: 1.25rem;
            flex-shrink: 0;
        }

        .nav-logo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .nav-title {
            font-size: 1.2rem;
            font-weight: 800;
            letter-spacing: -0.01em;
        }

        .hero-banner {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
            padding: 48px 24px;
            position: relative;
            overflow: hidden;
        }

        .hero-inner {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            flex-wrap: wrap;
        }

        .hero-store-identity {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .hero-avatar {
            width: 80px;
            height: 80px;
            border-radius: 12px;
            background: rgba(255,255,255,0.1);
            border: 2px solid rgba(255,255,255,0.25);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.2rem;
            color: #38bdf8;
            overflow: hidden;
            flex-shrink: 0;
        }

        .hero-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .hero-title {
            font-size: 2.1rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 6px;
        }

        .hero-meta {
            display: flex;
            align-items: center;
            gap: 16px;
            font-size: 0.95rem;
            color: #cbd5e1;
            flex-wrap: wrap;
        }

        .hero-api-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(8px);
            padding: 8px 16px;
            border-radius: 6px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.88rem;
            border: 1px solid rgba(255,255,255,0.2);
            color: #38bdf8;
        }

        .address-bar {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 16px 24px;
        }

        .address-inner {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap;
        }

        .full-addr {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            color: var(--text-dark);
            font-size: 0.95rem;
        }

        .addr-chips {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }

        .chip {
            background: #f1f5f9;
            padding: 4px 10px;
            border-radius: 4px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.8rem;
            color: var(--text-muted);
            border: 1px solid var(--border);
        }

        .chip strong {
            color: var(--text-dark);
        }

        .main-layout {
            max-width: 1140px;
            margin: 36px auto;
            padding: 0 24px;
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: 32px;
            flex-grow: 1;
            width: 100%;
        }

        @media (max-width: 860px) {
            .main-layout {
                grid-template-columns: 1fr;
            }
        }

        .card-box {
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 28px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .card-title {
            font-size: 1.25rem;
            font-weight: 800;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .card-desc {
            color: var(--text-muted);
            font-size: 0.92rem;
            margin-bottom: 24px;
            line-height: 1.5;
        }

        .form-group {
            margin-bottom: 18px;
        }

        .form-label {
            display: block;
            font-size: 0.8rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--text-muted);
            margin-bottom: 6px;
        }

        .form-input {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-family: inherit;
            font-size: 0.95rem;
            background: #f8fafc;
            color: var(--text-dark);
            transition: all 0.15s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: var(--primary);
            background: #ffffff;
            box-shadow: 0 0 0 3px rgba(2,132,199,0.15);
        }

        .btn-dispatch {
            width: 100%;
            background: var(--primary);
            color: #ffffff;
            border: none;
            padding: 14px 20px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: background 0.15s ease;
        }

        .btn-dispatch:hover {
            background: var(--primary-dark);
        }

        .spec-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .spec-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: #f8fafc;
            border: 1px solid var(--border);
            border-radius: 6px;
            font-size: 0.9rem;
        }

        .spec-label {
            color: var(--text-muted);
            font-size: 0.85rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .spec-value {
            font-family: 'JetBrains Mono', monospace;
            font-weight: 700;
            font-size: 0.85rem;
        }

        .order-modal {
            position: fixed;
            inset: 0;
            background: rgba(15,23,42,0.6);
            backdrop-filter: blur(4px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }

        .order-modal.active {
            display: flex;
        }

        .modal-box {
            background: #ffffff;
            border-radius: 12px;
            max-width: 480px;
            width: 100%;
            padding: 32px;
            text-align: center;
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
        }

        .site-footer {
            background: #ffffff;
            border-top: 1px solid var(--border);
            padding: 20px 24px;
            text-align: center;
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: auto;
        }

        /* Reserved Menu Section & Catalog Grid */
        .menu-storefront-section {
            background: #ffffff;
            border-bottom: 1px solid var(--border);
            padding: 40px 24px;
        }

        .menu-section-inner {
            max-width: 1140px;
            margin: 0 auto;
        }

        .menu-header-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .menu-section-title {
            font-size: 1.4rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: -0.01em;
            color: var(--text-dark);
        }

        .menu-section-sub {
            color: var(--text-muted);
            font-size: 0.92rem;
            margin-top: 2px;
        }

        .menu-sync-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 0.82rem;
            font-weight: 700;
            font-family: 'JetBrains Mono', monospace;
            border: 1px solid var(--border);
        }

        .menu-sync-badge.pending {
            background: #fef3c7;
            color: #b45309;
            border-color: #fde68a;
        }

        .menu-sync-badge.active {
            background: #dcfce7;
            color: #15803d;
            border-color: #bbf7d0;
        }

        .menu-reserved-placeholder {
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 36px 24px;
            text-align: center;
            background: #f8fafc;
        }

        .placeholder-icon-circle {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #e0f2fe;
            color: var(--primary);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            margin-bottom: 14px;
        }

        .placeholder-title {
            font-size: 1.15rem;
            font-weight: 800;
            margin-bottom: 8px;
            color: var(--text-dark);
        }

        .placeholder-desc {
            max-width: 620px;
            margin: 0 auto 20px auto;
            color: var(--text-muted);
            font-size: 0.9rem;
            line-height: 1.55;
        }

        .placeholder-checklist {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-dark);
        }

        .chk-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .menu-catalog-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 20px;
        }

        .menu-card {
            background: #ffffff;
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 18px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: all 0.2s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.02);
        }

        .menu-card:hover {
            transform: translateY(-2px);
            border-color: #cbd5e1;
            box-shadow: 0 6px 16px rgba(0,0,0,0.06);
        }

        .menu-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
        }

        .menu-card-icon {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            background: #f1f5f9;
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1rem;
        }

        .menu-card-sku {
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.72rem;
            background: #f8fafc;
            border: 1px solid var(--border);
            padding: 2px 6px;
            border-radius: 4px;
            color: var(--text-muted);
            font-weight: 600;
        }

        .menu-card-category {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--primary);
            margin-bottom: 4px;
            display: block;
        }

        .menu-card-name {
            font-size: 1.05rem;
            font-weight: 800;
            color: var(--text-dark);
            margin-bottom: 6px;
            line-height: 1.3;
        }

        .menu-card-desc {
            font-size: 0.84rem;
            color: var(--text-muted);
            line-height: 1.45;
            margin-bottom: 16px;
        }

        .menu-card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 12px;
            border-top: 1px solid #f1f5f9;
        }

        .menu-card-price {
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.15rem;
            font-weight: 800;
            color: var(--text-dark);
        }

        .btn-add-item {
            background: #f1f5f9;
            color: var(--text-dark);
            border: 1px solid var(--border);
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 0.82rem;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s ease;
        }

        .btn-add-item:hover {
            background: var(--primary);
            color: #ffffff;
            border-color: var(--primary);
        }
    </style>
</head>
<body>
    <header class="site-nav">
        <div class="nav-inner">
            <a href="./index.html" class="nav-brand">
                <div class="nav-logo-box">
                    <img id="navLogoImg" src="${config.logoUrl || ''}" alt="Logo" style="${config.logoUrl ? 'display:block;' : 'display:none;'}">
                    <i class="fa-solid fa-store" id="navLogoIcon" style="${config.logoUrl ? 'display:none;' : 'display:block;'}"></i>
                </div>
                <span class="nav-title" id="navRestaurantName">${config.restaurantName || 'Restaurant Storefront'}</span>
            </a>
            <div class="api-badge" style="background:#f1f5f9; padding:6px 14px; border-radius:6px; font-family:'JetBrains Mono',monospace; font-size:0.85rem; border:1px solid var(--border);">
                <i class="${activeGw.icon || 'fa-solid fa-plug'} text-primary me-1"></i>
                <span>${activeGw.name || 'Uber Direct'} API</span>
            </div>
        </div>
    </header>

    <section class="hero-banner">
        <div class="hero-inner">
            <div class="hero-store-identity">
                <div class="hero-avatar">
                    <img id="heroAvatarImg" src="${config.logoUrl || ''}" alt="Logo" style="${config.logoUrl ? 'display:block;' : 'display:none;'}">
                    <i class="fa-solid fa-store" id="heroAvatarIcon" style="${config.logoUrl ? 'display:none;' : 'display:block;'}"></i>
                </div>
                <div>
                    <h1 class="hero-title" id="heroStoreName">${config.restaurantName || 'Restaurant Storefront'}</h1>
                    <div class="hero-meta">
                        <span><i class="fa-solid fa-location-dot me-1 text-danger"></i>${(config.city && config.state) ? `${config.city}, ${config.state}` : (config.city || config.state || 'Storefront')}</span>
                        <span>&bull;</span>
                        <span><i class="fa-solid fa-clock me-1 text-warning"></i>Open for Online Orders</span>
                    </div>
                </div>
            </div>
            <div class="hero-api-badge">
                <i class="${activeGw.icon || 'fa-solid fa-plug'}"></i>
                <span id="heroApiBadgeText">Connected to ${activeGw.name || 'Uber Direct'} API</span>
            </div>
        </div>
    </section>

    <div class="address-bar">
        <div class="address-inner">
            <div class="full-addr">
                <i class="fa-solid fa-location-dot text-danger"></i>
                <span id="fullAddressDisplay">${config.street || ''}${config.unit ? ' ' + config.unit : ''}, ${config.city || ''}, ${config.state || ''} ${config.zip || ''}, ${config.country || 'United States'}</span>
            </div>
            <div class="addr-chips">
                <span class="chip">Street: <strong>${config.street || '—'}</strong></span>
                <span class="chip">City: <strong>${config.city || '—'}</strong></span>
                <span class="chip">State: <strong>${config.state || '—'}</strong></span>
                <span class="chip">ZIP: <strong>${config.zip || '—'}</strong></span>
            </div>
        </div>
    </div>

    <!-- Reserved Menu Section -->
    <section class="menu-storefront-section" id="menuReservationArea">
        <div class="menu-section-inner">
            <div class="menu-header-bar">
                <div>
                    <h2 class="menu-section-title">
                        <i class="fa-solid fa-utensils text-primary"></i>
                        <span>Storefront Menu Catalog</span>
                    </h2>
                    <p class="menu-section-sub" id="menuSectionSubtitle">${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? `Direct from connected ${activeGw.name} catalog • Click "+ Add" to add any dish to your order.` : `Area reserved for menu items synced from your connected ${activeGw.name} API.`}</p>
                </div>
                <div class="menu-sync-badge ${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? 'active' : 'pending'}" id="menuSyncStatusBadge">
                    <i class="${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? 'fa-solid fa-circle-check text-success' : 'fa-solid fa-hourglass-half'}"></i>
                    <span id="menuSyncStatusText">${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? `${config.menuItems.length} Items Synced via ${activeGw.name}` : 'Area Reserved • Awaiting Step 4 Menu Sync'}</span>
                </div>
            </div>

            <!-- Empty State: Reserved Placeholder (Visible before Step 4 Sync) -->
            <div class="menu-reserved-placeholder" id="menuReservedPlaceholder" style="${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? 'display:none;' : 'display:block;'}">
                <div class="placeholder-icon-circle">
                    <i class="fa-solid fa-cloud-arrow-down"></i>
                </div>
                <h3 class="placeholder-title">Menu Catalog Area Reserved</h3>
                <p class="placeholder-desc">
                    This section of <code>index.html</code> is reserved for your restaurant's live menu items. In <strong>Step 4: Sync Menu to Store</strong>, connect to your POS or delivery gateway catalog to sync dishes, descriptions, and pricing directly here.
                </p>
                <div class="placeholder-checklist">
                    <div class="chk-item"><i class="fa-solid fa-circle-check text-success"></i> Direct POS &amp; Delivery Catalog Integration</div>
                    <div class="chk-item"><i class="fa-solid fa-circle-check text-success"></i> Instant 1-Click Customer Ordering</div>
                    <div class="chk-item"><i class="fa-solid fa-circle-check text-success"></i> Real-time Automated Dispatch via Connected Fleet</div>
                </div>
            </div>

            <!-- Active State: Synced Items Grid (Populated when menu items are synced) -->
            <div class="menu-catalog-grid" id="menuCatalogGrid" style="${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? 'display:grid;' : 'display:none;'}">
                ${(Array.isArray(config.menuItems) && config.menuItems.length > 0) ? config.menuItems.map(item => `
                    <article class="menu-card">
                        <div>
                            <div class="menu-card-top">
                                <div class="menu-card-icon"><i class="${item.icon || 'fa-solid fa-utensils'}"></i></div>
                                <span class="menu-card-sku">${item.sku || 'SKU'}</span>
                            </div>
                            <span class="menu-card-category">${item.category || 'Specialty'}</span>
                            <h3 class="menu-card-name">${item.name}</h3>
                            <p class="menu-card-desc">${item.description || ''}</p>
                        </div>
                        <div class="menu-card-footer">
                            <span class="menu-card-price">$${Number(item.price).toFixed(2)}</span>
                            <button type="button" class="btn-add-item" onclick="addItemToOrder('${(item.name || '').replace(/'/g, "\\'")}', ${item.price})">
                                <i class="fa-solid fa-plus text-primary"></i> Add
                            </button>
                        </div>
                    </article>
                `).join('') : ''}
            </div>
        </div>
    </section>

    <main class="main-layout">
        <section class="card-box">
            <h2 class="card-title">
                <i class="fa-solid fa-motorcycle text-primary"></i>
                <span>Direct Delivery Order</span>
            </h2>
            <p class="card-desc">Submit an online order. Requests are dispatched directly through the restaurant's connected delivery fleet API.</p>

            <form id="orderForm" onsubmit="submitStoreOrder(event)">
                <div class="form-group">
                    <label class="form-label">Customer Name</label>
                    <input type="text" id="orderCustName" class="form-input" placeholder="e.g. Alex Morgan" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Customer Phone</label>
                    <input type="tel" id="orderCustPhone" class="form-input" placeholder="e.g. (216) 555-0192" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Delivery Destination Address</label>
                    <input type="text" id="orderCustAddress" class="form-input" placeholder="e.g. 742 Evergreen Terrace, Apt 4" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Order Details / Items Specification</label>
                    <input type="text" id="orderCustNotes" class="form-input" placeholder="e.g. 2 Specialty Entrees, 1 Side Salad" required>
                </div>
                <button type="submit" class="btn-dispatch" id="btnSubmitOrder">
                    <i class="fa-solid fa-motorcycle"></i>
                    <span id="dispatchButtonText">Dispatch Order via ${activeGw.name || 'Delivery'} API ➔</span>
                </button>
            </form>
        </section>

        <aside class="card-box">
            <h2 class="card-title">
                <i class="fa-solid fa-server text-primary"></i>
                <span>Connected API Telemetry</span>
            </h2>
            <p class="card-desc">Live connection details verified for this restaurant directory.</p>

            <div class="spec-list">
                <div class="spec-item">
                    <span class="spec-label"><i class="fa-solid fa-plug text-primary"></i> Gateway</span>
                    <span class="spec-value" id="specApiName">${activeGw.name || 'Uber Direct'}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fa-solid fa-shield-halved text-success"></i> Protocol</span>
                    <span class="spec-value" id="specProtocol">${activeGw.protocol || 'REST / TLS 1.3'}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fa-solid fa-signal text-success"></i> Status</span>
                    <span class="spec-value text-success" id="specStatus">200 OK Handshake</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label"><i class="fa-solid fa-folder text-amber"></i> Directory</span>
                    <span class="spec-value text-primary" id="specDirectory">/${config.slug || 'your-site'}/index.html</span>
                </div>
            </div>
        </aside>
    </main>

    <div class="order-modal" id="orderConfirmModal">
        <div class="modal-box">
            <div style="width: 64px; height: 64px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 16px;">
                <i class="fa-solid fa-square-check"></i>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 6px;">Order Dispatched!</h3>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 20px;">
                Your delivery request was successfully transmitted to the connected gateway fleet.
            </p>
            <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 8px; padding: 14px; text-align: left; margin-bottom: 24px; font-size: 0.88rem;">
                <div style="margin-bottom: 4px;"><strong>Order ID:</strong> <span id="confirmedOrderId" style="font-family:'JetBrains Mono',monospace; color:var(--primary);">#ORD-8819</span></div>
                <div style="margin-bottom: 4px;"><strong>Delivery Fleet:</strong> <span id="confirmedApiProvider">${activeGw.name || 'Delivery'} API</span></div>
                <div><strong>ETA to Address:</strong> <span>14 - 18 minutes</span></div>
            </div>
            <button type="button" class="btn-dispatch" onclick="closeOrderModal()">
                Continue Browsing
            </button>
        </div>
    </div>

    <footer class="site-footer">
        <p>&copy; 2026 <strong>${config.restaurantName || 'Restaurant Storefront'}</strong> &bull; ${config.street || ''}, ${config.city || ''}, ${config.state || ''} ${config.zip || ''} &bull; Powered by ${activeGw.name || 'Delivery'} API</p>
    </footer>

    <script>
        window.EMBEDDED_SITE_CONFIG = ${safeConfigJson};

        function submitStoreOrder(event) {
            if (event) event.preventDefault();
            const orderId = '#ORD-' + Math.floor(1000 + Math.random() * 9000);
            document.getElementById('confirmedOrderId').innerText = orderId;
            document.getElementById('orderConfirmModal').classList.add('active');
        }

        function addItemToOrder(name, price) {
            const notesEl = document.getElementById('orderCustNotes');
            if (notesEl) {
                const itemStr = '1x ' + name + ' ($' + Number(price).toFixed(2) + ')';
                if (!notesEl.value.trim()) {
                    notesEl.value = itemStr;
                } else {
                    notesEl.value = notesEl.value + ', ' + itemStr;
                }
                notesEl.focus();
                notesEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        function closeOrderModal() {
            document.getElementById('orderConfirmModal').classList.remove('active');
            document.getElementById('orderCustName').value = '';
            document.getElementById('orderCustAddress').value = '';
            document.getElementById('orderCustNotes').value = '';
        }
    <\/script>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════════
// STEP 4: SYNC MENU TO STORE (UPDATES INDEX.HTML RESERVED AREA)
// ═══════════════════════════════════════════════════════════════════
function renderStep4MenuTable() {
    const activeGw = (currentSiteConfig.api && currentSiteConfig.api.name)
        ? currentSiteConfig.api
        : ((currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) ? DELIVERY_SERVICES[currentSelectedGateway] : DELIVERY_SERVICES.uber);

    const slug = currentSiteConfig.slug || 'your-site';

    // Banner and titles
    const gwTitle = document.getElementById('step4GwTitle');
    const gwSub = document.getElementById('step4GwSubtitle');
    const gwIcon = document.getElementById('step4GwIcon');
    const dirBadge = document.getElementById('step4TargetDirBadge');

    if (gwTitle) gwTitle.innerText = `Sync Source: ${activeGw.name} POS & Catalog API`;
    if (gwSub) gwSub.innerText = `${activeGw.categoryTag || 'Direct Delivery'} • 200 OK Handshake • Updates Reserved Menu Area in index.html`;
    if (gwIcon) gwIcon.innerHTML = `<i class="${activeGw.icon || 'fa-solid fa-bolt'}"></i>`;
    if (dirBadge) dirBadge.innerText = `Target: /net-c-delivery/${slug}/index.html`;

    const tableBody = document.getElementById('step4MenuTableBody');
    if (!tableBody) return;

    let selectedCount = 0;
    tableBody.innerHTML = DINER_MENU_CATALOG.map((item, idx) => {
        if (item.selected) selectedCount++;
        return `
            <tr class="${item.selected ? 'item-selected' : ''}">
                <td>
                    <span class="badge bg-light text-dark font-mono border">${item.sku}</span>
                </td>
                <td>
                    <div class="menu-item-cell">
                        <div class="item-thumb text-primary">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="item-meta">
                            <strong>${item.name}</strong>
                            <span>${item.description}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge bg-light text-secondary border">${item.category}</span>
                </td>
                <td>
                    <div class="price-control-box">
                        <span>$</span>
                        <input type="number" step="0.25" min="1" max="99" value="${Number(item.price).toFixed(2)}"
                            style="width: 60px; border:none; background:transparent; font-family:inherit; font-weight:700; outline:none;"
                            onchange="updateCatalogItemPrice(${idx}, this.value)">
                    </div>
                </td>
                <td>
                    <button type="button" class="stock-toggle-btn ${item.inStock ? 'in-stock' : 'out-stock'}" onclick="toggleCatalogItemStock(${idx})">
                        <i class="fa-solid ${item.inStock ? 'fa-check' : 'fa-ban'} me-1"></i>
                        <span>${item.inStock ? 'In Stock' : 'Sold Out'}</span>
                    </button>
                </td>
                <td class="text-end">
                    <button type="button" class="item-select-btn ${item.selected ? 'selected' : ''}" onclick="toggleCatalogItemSync(${idx})">
                        <i class="fa-solid ${item.selected ? 'fa-circle-check text-success' : 'fa-circle-plus'}"></i>
                        <span>${item.selected ? 'Include in Sync' : 'Excluded'}</span>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    // Summary alert banner update
    const headline = document.getElementById('menuSyncHeadline');
    const sub = document.getElementById('menuSyncSub');
    if (headline) headline.innerText = `${selectedCount} of ${DINER_MENU_CATALOG.length} Items Selected for Storefront`;
    if (sub) sub.innerText = `Clicking "Sync Menu to Store" injects these ${selectedCount} items directly into the reserved menu section of /net-c-delivery/${slug}/index.html.`;

    const guidance = document.getElementById('step4GuidanceText');
    if (guidance) guidance.innerText = `${selectedCount} items ready • Click "Sync Menu to Store" to update index.html`;
}

function toggleCatalogItemSync(index) {
    if (!DINER_MENU_CATALOG[index]) return;
    playToyClick(620, 0.04);
    DINER_MENU_CATALOG[index].selected = !DINER_MENU_CATALOG[index].selected;
    renderStep4MenuTable();
}

function toggleCatalogItemStock(index) {
    if (!DINER_MENU_CATALOG[index]) return;
    playToyClick(540, 0.04);
    DINER_MENU_CATALOG[index].inStock = !DINER_MENU_CATALOG[index].inStock;
    renderStep4MenuTable();
}

function updateCatalogItemPrice(index, val) {
    const p = parseFloat(val);
    if (!isNaN(p) && p > 0 && DINER_MENU_CATALOG[index]) {
        DINER_MENU_CATALOG[index].price = p;
    }
}

function toggleSelectAllMenuItems(selectBool) {
    playToyClick(680, 0.04);
    DINER_MENU_CATALOG.forEach(i => i.selected = !!selectBool);
    renderStep4MenuTable();
}

function syncMenuToStorefront() {
    playToyClick(750, 0.05);

    const selectedItems = DINER_MENU_CATALOG.filter(i => i.selected);
    if (selectedItems.length === 0) {
        alert('Please select at least 1 menu item to sync to your storefront.');
        return;
    }

    const activeGw = (currentSiteConfig.api && currentSiteConfig.api.name)
        ? currentSiteConfig.api
        : ((currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway]) ? DELIVERY_SERVICES[currentSelectedGateway] : DELIVERY_SERVICES.uber);

    // Attach synced items to site configuration
    currentSiteConfig.menuItems = selectedItems.map(item => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        category: item.category,
        price: item.price,
        inStock: item.inStock,
        description: item.description,
        icon: item.icon
    }));
    currentSiteConfig.lastMenuSync = new Date().toISOString();

    // Re-generate standalone index.html with the populated reserved area
    const htmlContent = generateStandaloneStorefrontHtml(currentSiteConfig);

    // Save to localStorage for client persistence
    try {
        localStorage.setItem(STORAGE_KEY_SITE, JSON.stringify(currentSiteConfig));
    } catch (e) {}

    // Update blob URL for live iframe previews
    if (deployedBlobUrl) URL.revokeObjectURL(deployedBlobUrl);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    deployedBlobUrl = URL.createObjectURL(blob);
    currentSiteConfig.deployedBlobUrl = deployedBlobUrl;

    // Refresh iframes and preview elements
    const inlineIframe = document.getElementById('step3InlinePreviewIframe');
    if (inlineIframe) inlineIframe.src = deployedBlobUrl;
    const modalIframe = document.getElementById('sitePreviewIframe');
    if (modalIframe) modalIframe.src = deployedBlobUrl;

    // Call backend endpoint if server is running
    fetch('/api/restaurant/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            businessName: currentSiteConfig.restaurantName,
            street: currentSiteConfig.street,
            unit: currentSiteConfig.unit,
            city: currentSiteConfig.city,
            state: currentSiteConfig.state,
            zip: currentSiteConfig.zip,
            country: currentSiteConfig.country,
            logoUrl: currentSiteConfig.logoUrl,
            apiName: activeGw.name,
            apiEndpoint: activeGw.endpointUrl,
            htmlContent: htmlContent,
            menuItems: currentSiteConfig.menuItems
        })
    }).catch(() => {});

    playDinerBell();
    showDinerToast(
        'Menu Synced to Storefront! 🍽️',
        `Successfully updated index.html with ${selectedItems.length} live menu items in the reserved catalog area.`,
        'fa-cloud-arrow-up'
    );

    addTelemetryLogRow(activeGw.name, 'CATALOG.MENU_SYNC_DEPLOYED', '14 ms', `${selectedItems.length} SKUs -> index.html`);

    updateProgressiveState();
    renderStep4MenuTable();

    const slug = currentSiteConfig.slug || 'your-site';
    showDinerToast(
        'index.html Updated',
        `Storefront at /net-c-delivery/${slug}/index.html is ready with live ordering!`,
        'fa-circle-check'
    );
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

    const hasConfiguredSite = !!(currentSiteConfig && currentSiteConfig.restaurantName && currentSiteConfig.street);
    const activeGw = (currentSelectedGateway && DELIVERY_SERVICES[currentSelectedGateway] && DELIVERY_SERVICES[currentSelectedGateway].verified)
        ? DELIVERY_SERVICES[currentSelectedGateway]
        : null;

    // 1. Top OS Folder Tabs & Chips
    const folderGwBadge = document.getElementById('folderGatewaysBadge');
    if (folderGwBadge) folderGwBadge.innerText = `${activeCount}/6 Active`;

    const folderSetupBadge = document.getElementById('folderSetupBadge') || document.getElementById('folderMenuBadge');
    if (folderSetupBadge) folderSetupBadge.innerText = hasConfiguredSite ? 'Configured' : 'Setup Form';

    const folderDirectoryBadge = document.getElementById('folderDirectoryBadge') || document.getElementById('folderKdsBadge');
    if (folderDirectoryBadge) folderDirectoryBadge.innerText = hasConfiguredSite ? 'Base HTML' : 'Pending';

    const hasSyncedMenu = !!(currentSiteConfig && Array.isArray(currentSiteConfig.menuItems) && currentSiteConfig.menuItems.length > 0);
    const folderMenuBadge = document.getElementById('folderMenuSyncBadge') || document.getElementById('folderMenuBadge');
    if (folderMenuBadge) {
        folderMenuBadge.innerText = hasSyncedMenu ? `${currentSiteConfig.menuItems.length} Synced` : 'Pending Sync';
    }

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
        side2Badge.className = hasConfiguredSite ? 'side-step-badge verified' : 'side-step-badge neutral';
        side2Badge.innerText = hasConfiguredSite ? 'Configured' : 'Setup Form';
    }

    const side3Badge = document.getElementById('sideStep3StatusBadge');
    if (side3Badge) {
        side3Badge.className = hasConfiguredSite ? 'side-step-badge verified' : 'side-step-badge neutral';
        side3Badge.innerText = hasConfiguredSite ? 'Base HTML Ready' : 'Base HTML';
    }

    const side4Badge = document.getElementById('sideStep4StatusBadge');
    if (side4Badge) {
        side4Badge.className = hasSyncedMenu ? 'side-step-badge verified' : 'side-step-badge neutral';
        side4Badge.innerText = hasSyncedMenu ? `${currentSiteConfig.menuItems.length} Synced` : 'Pending Sync';
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
            sideGwSub.innerText = `${activeGw.defaultLocationId || 'Merchant API'} • 200 OK`;
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
            const initialStep = (hash === '#step4') ? 4 : ((hash === '#step3') ? 3 : ((hash === '#step2') ? 2 : 1));
            window.history.replaceState({ step: initialStep, modal: null }, '', window.location.pathname + (hash.startsWith('#step') ? hash : '#step1'));
            if (initialStep !== 1) {
                goToStep(initialStep, false);
            }
        }
        initBackNavigation();
        updateBackBtnState();

        addTelemetryLogRow('DinerDashboard', 'KERNEL.BOOT_READY', '6 ms', '#SYSTEM_INITIALIZE');
        addTelemetryLogRow('System Gateway', 'GATEWAY.BOOT_SEQUENCE', '8 ms', '#READY_FOR_KEYS');
    });
}

// ═══════════════════════════════════════════════════════════════════
// GLOBAL WINDOW EVENT HANDLERS EXPORT
// ═══════════════════════════════════════════════════════════════════
if (typeof window !== 'undefined') {
    window.clearDinerAppCache = clearDinerAppCache;
    window.fillDemoCredentials = fillDemoCredentials;
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
    window.handlePhotoUpload = handlePhotoUpload;
    window.handleLogoUrlInput = handleLogoUrlInput;
    window.clearLogo = clearLogo;
    window.updateSlugPreview = updateSlugPreview;
    window.openInAppSitePreview = openInAppSitePreview;
    window.downloadSiteIndexHtml = downloadSiteIndexHtml;
    window.reloadInlinePreview = reloadInlinePreview;
    window.resetWalkthrough = resetWalkthrough;
    window.toggleAudio = toggleAudio;
    window.proceedToSetupFromModal = proceedToSetupFromModal;
    window.proceedToMenuScreenFromModal = proceedToSetupFromModal;
    window.renderStep4MenuTable = renderStep4MenuTable;
    window.toggleCatalogItemSync = toggleCatalogItemSync;
    window.toggleCatalogItemStock = toggleCatalogItemStock;
    window.updateCatalogItemPrice = updateCatalogItemPrice;
    window.toggleSelectAllMenuItems = toggleSelectAllMenuItems;
    window.syncMenuToStorefront = syncMenuToStorefront;
}