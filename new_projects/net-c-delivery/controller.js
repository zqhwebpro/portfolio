// ═══════════════════════════════════════════════════════════════════
// DINERDASHBOARD // MODERN KITCHEN POS & MULTI-GATEWAY DISPATCH ENGINE
// ═══════════════════════════════════════════════════════════════════

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
let currentSelectedGateway = 'doordash';
let currentFilter = 'all';

// Load saved state
let savedApiState = {};
try {
    const rawSaved = localStorage.getItem('dinerdashboard_delivery_api_state');
    savedApiState = JSON.parse(rawSaved || '{}');
    Object.keys(savedApiState).forEach(k => {
        if (DELIVERY_SERVICES[k] && savedApiState[k].verified) {
            DELIVERY_SERVICES[k].verified = true;
            if (savedApiState[k].clientId) DELIVERY_SERVICES[k].defaultClientId = savedApiState[k].clientId;
            if (savedApiState[k].locationId) DELIVERY_SERVICES[k].defaultLocationId = savedApiState[k].locationId;
        }
    });
} catch (e) {
    savedApiState = {};
}

// ═══════════════════════════════════════════════════════════════════
// STEPPER WIZARD ENGINE
// ═══════════════════════════════════════════════════════════════════
function goToStep(stepNum) {
    playToyClick(580, 0.04);
    currentStep = stepNum;

    // View visibility
    const s1 = document.getElementById('step1View');
    const s2 = document.getElementById('step2View');
    const s3 = document.getElementById('step3View');

    if (s1) s1.classList.toggle('d-none', stepNum !== 1);
    if (s2) s2.classList.toggle('d-none', stepNum !== 2);
    if (s3) s3.classList.toggle('d-none', stepNum !== 3);

    // Update stepper tabs
    const tab1 = document.getElementById('stepTab1');
    const tab2 = document.getElementById('stepTab2');
    const tab3 = document.getElementById('stepTab3');

    if (tab1) {
        tab1.classList.toggle('active', stepNum === 1);
        const hasVerified = Object.keys(DELIVERY_SERVICES).some(k => DELIVERY_SERVICES[k].verified);
        tab1.classList.toggle('verified', hasVerified);
    }
    if (tab2) {
        tab2.classList.toggle('active', stepNum === 2);
    }
    if (tab3) {
        tab3.classList.toggle('active', stepNum === 3);
    }

    if (stepNum === 2) {
        renderMenuCatalog();
    } else if (stepNum === 3) {
        renderKdsTickets();
    }

    // Smooth scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Switch Workbook compatibility
function switchSheet(sheetKey) {
    if (sheetKey === 'delivery') goToStep(1);
    else if (sheetKey === 'menu') goToStep(2);
    else if (sheetKey === 'telemetry') goToStep(3);
}

// ═══════════════════════════════════════════════════════════════════
// GATEWAY SELECTION & STEP ADVANCEMENT (CORE REQUIREMENT)
// ═══════════════════════════════════════════════════════════════════
function selectAndProceedGateway(serviceKey) {
    playToyClick(620, 0.07);
    currentSelectedGateway = serviceKey;
    const s = DELIVERY_SERVICES[serviceKey];
    if (!s) return;

    // Authenticate and verify this gateway
    s.verified = true;
    savedApiState[serviceKey] = {
        verified: true,
        clientId: s.defaultClientId,
        secret: s.defaultSecret,
        locationId: s.defaultLocationId,
        verifiedAt: new Date().toISOString()
    };

    try {
        localStorage.setItem('dinerdashboard_delivery_api_state', JSON.stringify(savedApiState));
    } catch (e) {}

    // Update telemetry and UI
    addTelemetryLogRow(s.name, 'GATEWAY.AUTHENTICATED_200', s.latency, `#${s.defaultLocationId}`);
    updateProgressiveState();
    renderGatewayCards();

    // Show celebratory toast
    showDinerToast(
        `${s.name} Selected! 🚀`,
        `Connected via ${s.protocol}. Moving to Step 2: Menu Catalog Sync...`,
        'fa-circle-check'
    );

    // Immediately advance to Step 2!
    setTimeout(() => {
        goToStep(2);
    }, 450);
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
        const isVerified = s.verified;
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
                            <i class="fa-solid ${isVerified ? 'fa-circle-check' : 'fa-circle-nodes'}"></i>
                            ${isVerified ? '200 OK' : 'READY'}
                        </span>
                    </div>

                    <span class="gw-demo-rank"><i class="fa-solid fa-award me-1"></i> ${s.demographicRank}</span>
                    <p class="gw-desc">${s.demographicDesc}</p>

                    <div class="gw-telemetry-specs">
                        <div><strong style="color: var(--diner-text-dark);">Protocol:</strong> ${s.protocol}</div>
                        <div><strong style="color: var(--diner-text-dark);">Webhook:</strong> ${s.endpointUrl}</div>
                        <div><strong style="color: var(--diner-text-dark);">Latency:</strong> ${isVerified ? s.latency : '18ms (Estimated)'}</div>
                    </div>
                </div>

                <div class="gw-actions-row">
                    <button type="button" 
                            class="tactile-btn ${isVerified ? 'tactile-btn-mint' : 'tactile-btn-primary'} gw-select-btn" 
                            onclick="selectAndProceedGateway('${key}')">
                        <i class="fa-solid ${isVerified ? 'fa-arrow-right' : 'fa-bolt'}"></i>
                        <span>${isVerified ? 'Select & Next Step ➔' : 'Select & Connect (Next Step ➔)'}</span>
                    </button>
                    
                    <button type="button" 
                            class="tactile-btn tactile-btn-white tactile-btn-sm" 
                            onclick="openApiConfigModal('${key}')" 
                            title="Configure Custom Keys">
                        <i class="fa-solid fa-key"></i>
                    </button>

                    ${isVerified ? `
                        <button type="button" 
                                class="tactile-btn tactile-btn-white tactile-btn-sm" 
                                onclick="disconnectApi('${key}')" 
                                title="Disconnect">
                            <i class="fa-solid fa-power-off text-danger"></i>
                        </button>
                    ` : ''}
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
        inStock: true
    },
    {
        sku: 'BUR-02',
        name: 'Double Bacon Smash Burger',
        desc: 'Twin 4oz certified Angus patties, applewood thick-cut bacon, diner secret sauce, Martins potato bun.',
        price: 12.50,
        icon: '🍔',
        category: 'Grill',
        inStock: true
    },
    {
        sku: 'WRP-03',
        name: 'Charred Buffalo Chicken Wrap',
        desc: 'Crispy buttermilk chicken tenders, fiery Frank’s RedHot glaze, buttermilk ranch, crisp iceberg in flour tortilla.',
        price: 11.75,
        icon: '🌯',
        category: 'Deli',
        inStock: true
    },
    {
        sku: 'SUB-04',
        name: 'Classic 12" Italian Deli Sub',
        desc: 'Genoa salami, hot capicola, mortadella, aged provolone, shredded lettuce, tomato, oregano vinaigrette.',
        price: 13.25,
        icon: '🥖',
        category: 'Deli',
        inStock: true
    },
    {
        sku: 'MEL-05',
        name: 'Pastrami Melt on Hearth Rye',
        desc: 'House-brined peppery beef brisket pastrami, melted Swiss cheese, spicy deli brown mustard, seeded rye.',
        price: 13.95,
        icon: '🥪',
        category: 'Grill',
        inStock: true
    },
    {
        sku: 'FRY-06',
        name: 'Garlic Truffle Parmesan Fries',
        desc: 'Fresh hand-cut Idaho Russet fries tossed with white truffle oil, shaved parmesan, garlic and chopped parsley.',
        price: 5.50,
        icon: '🍟',
        category: 'Fryer',
        inStock: true
    },
    {
        sku: 'RNG-07',
        name: 'Crispy Beer-Battered Onion Rings',
        desc: 'Colossal sweet Spanish onions dipped in craft IPA batter, served golden with smoky horseradish dipping sauce.',
        price: 5.25,
        icon: '🧅',
        category: 'Fryer',
        inStock: true
    }
];

function renderMenuCatalog() {
    const tableBody = document.getElementById('menuTableBody');
    if (!tableBody) return;

    const activeGw = DELIVERY_SERVICES[currentSelectedGateway] || DELIVERY_SERVICES.doordash;

    // Update banner
    const bannerTitle = document.getElementById('activeGwTitle');
    const bannerSubtitle = document.getElementById('activeGwSubtitle');
    const bannerIcon = document.getElementById('activeGwIcon');

    if (bannerTitle) bannerTitle.innerText = `Active Gateway: ${activeGw.name}`;
    if (bannerSubtitle) bannerSubtitle.innerText = `${activeGw.categoryTag} • Store Location GUID: ${activeGw.defaultLocationId} • ${activeGw.protocol}`;
    if (bannerIcon) bannerIcon.className = `active-gw-icon ${activeGw.icon}`;

    let html = '';
    DINER_MENU_ITEMS.forEach((item, index) => {
        html += `
            <tr>
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
        `"${item.name}" updated on ${DELIVERY_SERVICES[currentSelectedGateway].name}.`,
        item.inStock ? 'fa-check' : 'fa-ban'
    );
}

function syncAllMenuItems() {
    playToyClick(800, 0.05);
    const s = DELIVERY_SERVICES[currentSelectedGateway];
    showDinerToast(
        `All 7 Menu SKUs Synced! ⚡`,
        `Prices & modifiers broadcast to ${s.name} at ${s.endpointUrl}.`,
        'fa-arrows-rotate'
    );
    addTelemetryLogRow(s.name, 'CATALOG.BULK_SYNC_200', s.latency, `#ALL_SKUS_OK`);
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

    const menu = DINER_MENU_ITEMS[Math.floor(Math.random() * DINER_MENU_ITEMS.length)];
    const ticketNum = Math.floor(Math.random() * 8999) + 1000;
    const ticketId = `#TKT-${ticketNum}`;
    const activeGw = DELIVERY_SERVICES[currentSelectedGateway] || DELIVERY_SERVICES.toast;

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

    showDinerToast(
        `New Ticket: ${ticketId} 🍳`,
        `${menu.name} ordered via ${activeGw.name}. Line prep started.`,
        'fa-fire-burner'
    );

    addTelemetryLogRow(activeGw.name, 'KITCHEN.TICKET_SPAWN', '11 ms', `${ticketId}: ${menu.name}`);
}

function rushFleetDispatch() {
    playToyClick(720, 0.06);
    const activeGw = DELIVERY_SERVICES[currentSelectedGateway] || DELIVERY_SERVICES.doordash;

    showDinerToast(
        'Priority Courier Rushed! 🛵',
        `${activeGw.name} expedited courier re-routed to Parma Diner pickup window. ETA: 2.1 mins.`,
        'fa-motorcycle'
    );

    addTelemetryLogRow(activeGw.name, 'COURIER.PRIORITY_RUSH', '8 ms', '#RUSH_PICKUP_ZONE_A');
}

function autoConnectAllGateways() {
    playToyClick(620, 0.08);

    Object.keys(DELIVERY_SERVICES).forEach(k => {
        DELIVERY_SERVICES[k].verified = true;
        savedApiState[k] = {
            verified: true,
            clientId: DELIVERY_SERVICES[k].defaultClientId,
            secret: DELIVERY_SERVICES[k].defaultSecret,
            locationId: DELIVERY_SERVICES[k].defaultLocationId,
            verifiedAt: new Date().toISOString()
        };
    });

    try {
        localStorage.setItem('dinerdashboard_delivery_api_state', JSON.stringify(savedApiState));
    } catch (e) {}

    updateProgressiveState();
    renderGatewayCards();

    showDinerToast(
        '6/6 Gateways Online! ⚡',
        'Toast POS, DoorDash, Uber Direct, Grubhub, Square, and Clover fully authenticated.',
        'fa-bolt'
    );

    addTelemetryLogRow('FastSync Hub', 'GATEWAY.BULK_CONNECT_200', '14 ms', '#ALL_6_ACTIVE');
}

function simulateFullApiHealthCheck() {
    playOsClick(800, 0.03);
    showDinerToast(
        'Ping Radar Broadcast 📡',
        'All 6 POS & Delivery APIs verified online with avg 18.4ms latency.',
        'fa-arrows-rotate'
    );
    addTelemetryLogRow('Ping Radar', 'HEALTH_CHECK.PING_OK', '18 ms', '#6_OF_6_HEALTHY');
}

function syncMenuItem(sku, name) {
    playToyClick(640, 0.04);
    showDinerToast(
        `Synced: ${sku} 🔄`,
        `"${name}" live pricing & inventory broadcast to ${DELIVERY_SERVICES[currentSelectedGateway].name}.`,
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
function updateProgressiveState() {
    let count = 0;
    Object.keys(DELIVERY_SERVICES).forEach(k => {
        if (DELIVERY_SERVICES[k].verified) count++;
    });

    const activeCountEl = document.getElementById('metricActiveCount');
    if (activeCountEl) activeCountEl.innerText = `${count} / 6`;

    const statusPill = document.getElementById('realtimeStatusText');
    if (statusPill) statusPill.innerText = count > 0 ? `${count}/6 STREAMING` : '0/6 CONNECTED';
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

    s.verified = true;
    s.defaultClientId = clientId;
    s.defaultLocationId = locationId;

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

    updateProgressiveState();
    renderGatewayCards();
    closeApiConfigModal();

    showDinerToast(
        `${s.name} Verified! ✅`,
        `Credentials authenticated. Moving to Step 2: Menu Catalog...`,
        'fa-circle-check'
    );

    addTelemetryLogRow(s.name, 'API.HANDSHAKE_VERIFIED', s.latency, `#${locationId.toUpperCase()}`);

    setTimeout(() => {
        goToStep(2);
    }, 400);
}

function disconnectApi(serviceId) {
    if (confirm(`Disconnect ${DELIVERY_SERVICES[serviceId]?.name} gateway?`)) {
        DELIVERY_SERVICES[serviceId].verified = false;
        delete savedApiState[serviceId];
        try {
            localStorage.setItem('dinerdashboard_delivery_api_state', JSON.stringify(savedApiState));
        } catch (e) {}
        updateProgressiveState();
        renderGatewayCards();
        showDinerToast('Gateway Disconnected', `${DELIVERY_SERVICES[serviceId]?.name} set to pending.`, 'fa-power-off');
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
document.addEventListener('DOMContentLoaded', () => {
    initDinerClock();
    renderGatewayCards();
    updateProgressiveState();

    addTelemetryLogRow('DinerDashboard', 'KERNEL.BOOT_READY', '6 ms', '#KITCHEN_DISPATCH_ONLINE');
    addTelemetryLogRow('System Gateway', 'GATEWAY.BOOT_SEQUENCE', '8 ms', '#SYSTEM_INITIALIZE');
    addTelemetryLogRow('Cloud Router', 'DNS.ANYCAST_SYNC', '12 ms', '#GLOBAL_ROUTE_READY');
});