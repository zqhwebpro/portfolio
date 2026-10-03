// Audio synthesizer for discrete OS feedback
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
    if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
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

function toggleAudio() {
    initAudio();
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('osAudioToggleBtn');
    if (btn) {
        btn.innerHTML = soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
        btn.style.color = soundEnabled ? 'var(--apex-cyan)' : 'var(--apex-mid-grey)';
    }
    if (soundEnabled) playOsClick(900, 0.04);
}

// Live OS Clock
function initApexClock() {
    const clockEl = document.getElementById('apexLiveClock');
    if (!clockEl) return;
    function update() {
        const d = new Date();
        const str = d.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
        clockEl.innerText = str;
    }
    update();
    setInterval(update, 1000);
}

// Delivery Platforms Registry & Metadata
const DELIVERY_SERVICES = {
    toast: {
        id: 'toast',
        name: 'Toast POS',
        categoryTag: 'Toast Delivery Services (TDS)',
        icon: 'fa-solid fa-bread-slice',
        color: '#00d2df',
        demographicRank: 'Top In-House Restaurant Direct POS',
        demographicDesc: 'Eliminates 30% commissions via native in-house ordering with flat-rate DoorDash courier pass-through.',
        portalUrl: 'https://pos.toasttab.com/',
        defaultClientId: 'toast_app_parma_982',
        defaultSecret: 'tst_sec_89234bfa09e1889c201',
        defaultLocationId: 'loc_parma_grill_01',
        category: 'pos',
        protocol: 'REST / TDS Webhooks',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/toast',
        marketShare: 'Top In-House POS (US Market)',
        latency: '16 ms',
        verified: false
    },
    doordash: {
        id: 'doordash',
        name: 'DoorDash Drive',
        categoryTag: 'White-Label Fulfillment API',
        icon: 'fa-solid fa-car',
        color: '#00d2df',
        demographicRank: '#1 Demographic Choice (67% US Market)',
        demographicDesc: 'Dominant nationwide suburban footprint; highest brand recognition and driver availability across family dining.',
        portalUrl: 'https://developer.doordash.com/',
        defaultClientId: 'dd_drive_client_parma_441',
        defaultSecret: 'dd_jwt_secret_88192aacc7712',
        defaultLocationId: 'store_parma_dd_771',
        category: 'fleet',
        protocol: 'REST / JWT Bearer',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/doordash',
        marketShare: '#1 Nationwide Choice (67%)',
        latency: '22 ms',
        verified: false
    },
    uber: {
        id: 'uber',
        name: 'Uber Direct',
        categoryTag: 'On-Demand Merchant Delivery',
        icon: 'fa-brands fa-uber',
        color: '#00d2df',
        demographicRank: 'Urban & Gen-Z Demographic Choice (23% US Share)',
        demographicDesc: 'Top preference for metropolitan, college campus, and late-night demographics with dense local courier pooling.',
        portalUrl: 'https://developer.uber.com/docs/deliveries/overview',
        defaultClientId: '6ImzVINJ53LfMWCPoh_gBblTL55hqUNfIBN-7TG2',
        defaultSecret: 'ubr_sec_99120aa8772bc',
        defaultLocationId: 'uber_loc_parma_104',
        category: 'fleet',
        protocol: 'OAuth 2.0 / Webhooks',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/uber',
        marketShare: 'Urban & Gen-Z Choice (23%)',
        latency: '18 ms',
        verified: false
    },
    grubhub: {
        id: 'grubhub',
        name: 'Grubhub Direct',
        categoryTag: 'Branded Ordering & Dispatch API',
        icon: 'fa-solid fa-utensils',
        color: '#00d2df',
        demographicRank: 'East Coast & Campus Stronghold',
        demographicDesc: 'Favored by Northeast corporate lunch programs, regional diners, and student meal account payment ecosystems.',
        portalUrl: 'https://get.grubhub.com/',
        defaultClientId: 'gh_partner_parma_902',
        defaultSecret: 'gh_sec_token_55219bc001',
        defaultLocationId: 'gh_merchant_parma_8829',
        category: 'pos',
        protocol: 'REST / Mutual TLS',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/grubhub',
        marketShare: 'East Coast & Campus (10%)',
        latency: '24 ms',
        verified: false
    },
    square: {
        id: 'square',
        name: 'Square Delivery',
        categoryTag: 'Square Orders & Terminal Bridge',
        icon: 'fa-solid fa-square',
        color: '#00d2df',
        demographicRank: 'Independent & Craft Deli Demographic',
        demographicDesc: 'Preferred choice for boutique sandwich shops and multi-station counters seeking unified digital ticket handling.',
        portalUrl: 'https://developer.squareup.com/',
        defaultClientId: 'sq0idp-parma_88291047192aa',
        defaultSecret: 'sq0csp-99214710188bc',
        defaultLocationId: 'L8829104PARMA',
        category: 'pos',
        protocol: 'OAuth 2.0 / v2 Orders',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/square',
        marketShare: 'Craft & Independent Delis',
        latency: '19 ms',
        verified: false
    },
    clover: {
        id: 'clover',
        name: 'Clover POS API',
        categoryTag: 'Clover Station Queue & Thermal Gateway',
        icon: 'fa-solid fa-clover',
        color: '#00d2df',
        demographicRank: 'Neighborhood Diner & Grill Demographic',
        demographicDesc: 'High market penetration in traditional family grills with thermal kitchen printers and dedicated counter stations.',
        portalUrl: 'https://www.clover.com/developers',
        defaultClientId: 'clover_app_parma_991823',
        defaultSecret: 'clv_token_8821901aa',
        defaultLocationId: 'CLV_MERCH_PARMA_7718',
        category: 'pos',
        protocol: 'REST / Clover Station',
        endpointUrl: 'https://api.dinedispatch.io/webhooks/clover',
        marketShare: 'Family Grills & Diners',
        latency: '26 ms',
        verified: false
    }
};

// Saved persistent state in LocalStorage
let savedApiState = {};
try {
    savedApiState = JSON.parse(localStorage.getItem('dinedispatch_delivery_api_state') || '{}');
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

let currentActiveSheet = 'delivery';
let currentSelectedRowKey = 'uber';
let currentFilter = 'all';

// Render the Apex/Spider Data Grid
function renderSpiderTable() {
    const tbody = document.getElementById('spiderTableBody');
    if (!tbody) return;

    const serviceKeys = Object.keys(DELIVERY_SERVICES);
    let html = '';

    serviceKeys.forEach((key, index) => {
        const s = DELIVERY_SERVICES[key];
        const isSelected = key === currentSelectedRowKey;
        const statusClass = s.verified ? 'apex-status-200' : 'apex-status-401';
        const statusText = s.verified ? '200 OK' : '401 PENDING';
        const latencyText = s.verified ? s.latency : '--';
        const clientDisplay = s.verified ? s.defaultClientId : 'Pending Configuration';
        const locationDisplay = s.verified ? s.defaultLocationId : 'Pending Location';

        html += `
            <tr class="${isSelected ? 'row-selected' : ''}" 
                data-service-key="${key}"
                data-category="${s.category}"
                data-status="${s.verified ? 'connected' : 'pending'}"
                onclick="selectSpiderRow('${key}')">
                <td class="apex-row-num">${index + 1}</td>
                <td>
                    <span class="apex-status-pill ${statusClass}">
                        <i class="fa-solid ${s.verified ? 'fa-check' : 'fa-clock'}"></i>
                        <span>${statusText}</span>
                    </span>
                </td>
                <td>
                    <div class="fw-bold text-white d-flex align-items-center gap-2">
                        <i class="${s.icon}" style="color: var(--apex-cyan);"></i>
                        <span>${s.name}</span>
                    </div>
                    <span class="font-mono text-secondary text-xs">${s.categoryTag}</span>
                </td>
                <td class="font-mono text-secondary">${s.protocol}</td>
                <td><span class="badge text-bg-dark border border-secondary border-opacity-40 font-mono text-xs">${s.demographicRank}</span></td>
                <td class="font-mono text-info text-xs" style="color: var(--apex-cyan) !important;">${clientDisplay}</td>
                <td class="font-mono text-secondary text-xs">${locationDisplay}</td>
                <td class="font-mono fw-bold" style="color: ${s.verified ? 'var(--apex-cyan)' : 'var(--apex-mid-grey)'};">${latencyText}</td>
                <td class="text-center">
                    ${s.verified 
                        ? `<div class="d-flex align-items-center justify-content-center gap-1.5">
                            <button type="button" class="apex-btn-subtle" onclick="event.stopPropagation(); openApiConfigModal('${key}')" title="Edit Configuration">
                                <i class="fa-solid fa-gear"></i>
                            </button>
                            <button type="button" class="apex-btn-subtle" style="color: var(--apex-cyan);" onclick="event.stopPropagation(); seedSampleDispatchLog('${key}')" title="Test Dispatch Ping">
                                <i class="fa-solid fa-paper-plane"></i>
                            </button>
                            <button type="button" class="apex-btn-subtle text-danger" onclick="event.stopPropagation(); disconnectApi('${key}')" title="Disconnect Gateway">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                           </div>`
                        : `<button type="button" class="apex-btn-primary" onclick="event.stopPropagation(); openApiConfigModal('${key}')">
                            <i class="fa-solid fa-plug"></i> Configure API
                           </button>`
                    }
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    updateSpiderDrawer(currentSelectedRowKey);
}

// Select a row in the table
function selectSpiderRow(serviceKey) {
    currentSelectedRowKey = serviceKey;
    const s = DELIVERY_SERVICES[serviceKey];
    if (!s) return;
    playOsClick(700, 0.02);

    document.querySelectorAll('#spiderTableBody tr').forEach(tr => {
        if (tr.getAttribute('data-service-key') === serviceKey) {
            tr.classList.add('row-selected');
        } else {
            tr.classList.remove('row-selected');
        }
    });

    const rowIdx = Object.keys(DELIVERY_SERVICES).indexOf(serviceKey) + 2;
    updateFormulaBar(`B${rowIdx}`, `=GATEWAY.DISPATCH(Provider="${s.name}", Status="${s.verified ? '200_OK' : '401_PENDING'}", Protocol="${s.protocol.replace(/\s+/g, '_')}", Latency="${s.verified ? s.latency : '0ms'}")`);

    updateSpiderDrawer(serviceKey);
}

function updateFormulaBar(cell, formula) {
    const cellEl = document.getElementById('excelActiveCellLabel');
    const formEl = document.getElementById('excelFormulaInput');
    if (cellEl) cellEl.innerText = cell;
    if (formEl) formEl.value = formula;
}

// Update Bottom Spider Diagnostic Drawer
function updateSpiderDrawer(serviceKey) {
    const s = DELIVERY_SERVICES[serviceKey];
    const contentPane = document.getElementById('drawerPaneContent');
    if (!s || !contentPane) return;

    const activeTab = document.querySelector('.apex-drawer-tabs .apex-drawer-tab-btn.active')?.innerText.toLowerCase() || 'overview';

    if (activeTab.includes('headers')) {
        contentPane.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <span class="text-secondary fw-bold d-block mb-1" style="color: var(--apex-mid-grey) !important;">INBOUND REQUEST HEADERS (REST HTTP/2):</span>
                    <div class="p-2 border" style="background: var(--apex-black); border-color: var(--apex-border) !important;">
                        <div><span style="color: var(--apex-cyan);">Host:</span> api.dinedispatch.io</div>
                        <div><span style="color: var(--apex-cyan);">Authorization:</span> Bearer ${s.verified ? s.defaultClientId.substring(0, 16) + '...' : '[PENDING_BEARER_TOKEN]'}</div>
                        <div><span style="color: var(--apex-cyan);">X-Gateway-Protocol:</span> ${s.protocol}</div>
                        <div><span style="color: var(--apex-cyan);">X-Location-GUID:</span> ${s.defaultLocationId}</div>
                        <div><span style="color: var(--apex-cyan);">Content-Type:</span> application/json; charset=utf-8</div>
                    </div>
                </div>
                <div class="col-md-6">
                    <span class="text-secondary fw-bold d-block mb-1" style="color: var(--apex-mid-grey) !important;">SECURITY &amp; TLS SPECIFICATION:</span>
                    <div class="p-2 border" style="background: var(--apex-black); border-color: var(--apex-border) !important;">
                        <div><span style="color: var(--apex-cyan);">&bull; Cipher Suite:</span> TLS_AES_256_GCM_SHA384 (TLS 1.3)</div>
                        <div><span style="color: var(--apex-cyan);">&bull; Geofence Verification:</span> loc_parma_grill_01 (40.7128 N, -74.0060 W)</div>
                        <div><span style="color: var(--apex-cyan);">&bull; Verification Status:</span> ${s.verified ? '<span style="color: var(--apex-cyan); font-weight: bold;">ONLINE (200 OK)</span>' : '<span style="color: var(--apex-mid-grey); font-weight: bold;">UNCONFIGURED (401 PENDING)</span>'}</div>
                    </div>
                </div>
            </div>
        `;
    } else if (activeTab.includes('pipeline')) {
        contentPane.innerHTML = `
            <div class="d-flex align-items-center gap-3 py-2 flex-wrap font-mono">
                <div class="p-2 border" style="background: var(--apex-panel); border-color: var(--apex-border) !important;">
                    <span class="text-secondary text-xs d-block">STEP 1. POS DISPATCH</span>
                    <strong class="text-white">Kitchen Ticket #4829</strong>
                </div>
                <i class="fa-solid fa-arrow-right" style="color: var(--apex-cyan);"></i>
                <div class="p-2 border" style="background: var(--apex-panel); border-color: var(--apex-border) !important;">
                    <span class="text-secondary text-xs d-block">STEP 2. ${s.name.toUpperCase()} GATEWAY</span>
                    <strong style="color: var(--apex-cyan);">${s.endpointUrl}</strong>
                </div>
                <i class="fa-solid fa-arrow-right" style="color: var(--apex-cyan);"></i>
                <div class="p-2 border" style="background: var(--apex-panel); border-color: var(--apex-border) !important;">
                    <span class="text-secondary text-xs d-block">STEP 3. COURIER TELEMETRY</span>
                    <strong style="color: var(--apex-white);">Round-trip ${s.verified ? s.latency : 'Pending'}</strong>
                </div>
            </div>
        `;
    } else if (activeTab.includes('schema')) {
        contentPane.innerHTML = `
            <pre class="mb-0 p-2 border" style="background: var(--apex-black); border-color: var(--apex-border) !important; color: var(--apex-cyan); max-height: 120px; overflow-y: auto;">{
  "event": "dispatch.order.created",
  "gateway": "${s.id}",
  "location_id": "${s.defaultLocationId}",
  "status": "${s.verified ? "VERIFIED_ACTIVE" : "PENDING_CONFIGURATION"}",
  "latency_ms": ${s.verified ? parseInt(s.latency) : 0},
  "auth_type": "OAuth2.0_Bearer"
}</pre>
        `;
    } else {
        // Overview
        contentPane.innerHTML = `
            <div class="d-flex flex-column flex-md-row justify-content-between gap-3">
                <div>
                    <span class="text-secondary fw-bold text-xs d-block mb-1" style="color: var(--apex-mid-grey) !important;">AUDIT SUMMARY &bull; ${s.name.toUpperCase()}</span>
                    <p class="font-sans text-xs text-white mb-1.5">${s.demographicDesc}</p>
                    <span class="badge text-bg-dark border border-secondary border-opacity-40 font-mono text-xs">${s.demographicRank}</span>
                </div>
                <div class="font-mono text-xs text-secondary shrink-0">
                    <div><strong class="text-white">Developer Portal:</strong> <a href="${s.portalUrl}" target="_blank" style="color: var(--apex-cyan); text-decoration: none;">${s.portalUrl}</a></div>
                    <div><strong class="text-white">Webhook Route:</strong> <span class="text-secondary">${s.endpointUrl}</span></div>
                    <div><strong class="text-white">Status:</strong> ${s.verified ? '<span style="color: var(--apex-cyan); font-weight: bold;">Active 200 OK</span>' : '<span style="color: var(--apex-mid-grey); font-weight: bold;">Step 1 Pending</span>'}</div>
                </div>
            </div>
        `;
    }
}

function switchDrawerTab(tabKey, btnEl) {
    playOsClick(800, 0.02);
    document.querySelectorAll('.apex-drawer-tabs .apex-drawer-tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    updateSpiderDrawer(currentSelectedRowKey);
}

// Filter Rows in Spider Table
function filterSpiderRows(filter, btnEl) {
    playOsClick(750, 0.02);
    currentFilter = filter;
    if (btnEl) {
        document.querySelectorAll('.apex-spider-toolbar .apex-filter-btn').forEach(b => b.classList.remove('active'));
        btnEl.classList.add('active');
    }

    const searchVal = (document.getElementById('spiderSearchInput')?.value || '').toLowerCase().trim();
    const rows = document.querySelectorAll('#spiderTableBody tr');

    rows.forEach(tr => {
        const sKey = tr.getAttribute('data-service-key');
        const cat = tr.getAttribute('data-category');
        const status = tr.getAttribute('data-status');
        const s = DELIVERY_SERVICES[sKey];

        let matchesFilter = true;
        if (filter === 'connected') matchesFilter = (status === 'connected');
        else if (filter === 'pending') matchesFilter = (status === 'pending');
        else if (filter === 'pos') matchesFilter = (cat === 'pos');
        else if (filter === 'fleet') matchesFilter = (cat === 'fleet');

        const matchesSearch = !searchVal || (s && (s.name.toLowerCase().includes(searchVal) || s.endpointUrl.toLowerCase().includes(searchVal) || s.defaultClientId.toLowerCase().includes(searchVal)));

        tr.style.display = (matchesFilter && matchesSearch) ? '' : 'none';
    });
}

function handleSpiderSearch(val) {
    filterSpiderRows(currentFilter, null);
}

// Switch Workbook Sheets (Step 1, Step 2, Step 3)
function switchSheet(sheetKey) {
    const hasVerified = Object.keys(DELIVERY_SERVICES).some(k => DELIVERY_SERVICES[k].verified);

    if ((sheetKey === 'menu' || sheetKey === 'telemetry') && !hasVerified) {
        alert('Please connect and verify at least one delivery API in Step 1 before accessing Sheet2 or Sheet3.');
        return;
    }

    playOsClick(850, 0.03);
    currentActiveSheet = sheetKey;

    document.getElementById('sheet-view-delivery').classList.toggle('d-none', sheetKey !== 'delivery');
    document.getElementById('sheet-view-menu').classList.toggle('d-none', sheetKey !== 'menu');
    document.getElementById('sheet-view-telemetry').classList.toggle('d-none', sheetKey !== 'telemetry');

    document.getElementById('sheetTab1').classList.toggle('active', sheetKey === 'delivery');
    document.getElementById('sheetTab2').classList.toggle('active', sheetKey === 'menu');
    document.getElementById('sheetTab3').classList.toggle('active', sheetKey === 'telemetry');

    if (sheetKey === 'delivery') {
        selectSpiderRow(currentSelectedRowKey);
    } else if (sheetKey === 'menu') {
        updateFormulaBar('B2', '=POS.CATALOG(Provider="Active_Gateways", SKUs=4, SyncStatus="100%_SYNCHRONIZED")');
    } else if (sheetKey === 'telemetry') {
        updateFormulaBar('B2', '=STREAM.EVENT_LOG(Source="Dispatch_Webhooks", Protocol="HTTP/2_TLS1.3")');
    }
}

// Open API Modal
function openApiConfigModal(serviceId) {
    playOsClick(900, 0.04);
    const s = DELIVERY_SERVICES[serviceId];
    if (!s) return;

    document.getElementById('modalCurrentServiceId').value = serviceId;
    document.getElementById('modalServiceTitle').innerText = `${s.name} API Configuration`;
    document.getElementById('modalServiceSubtitle').innerText = `${s.categoryTag} &bull; REST Webhooks &bull; TLS 1.3`;
    
    const logoBox = document.getElementById('modalLogoBox');
    if (logoBox) {
        logoBox.style.background = 'var(--apex-cyan-dim)';
        logoBox.style.borderColor = 'var(--apex-cyan)';
    }

    const logoIcon = document.getElementById('modalLogoIcon');
    if (logoIcon) {
        logoIcon.className = `${s.icon} fs-5`;
        logoIcon.style.color = 'var(--apex-cyan)';
    }

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
        document.getElementById('apiClientIdInput').value = '';
        document.getElementById('apiSecretInput').value = '';
        document.getElementById('apiLocationIdInput').value = '';
    }

    const c = document.getElementById('verificationConsole');
    if (c) c.classList.add('d-none');
    document.getElementById('step1').className = 'text-info mb-1';
    document.getElementById('step2').classList.add('d-none');
    document.getElementById('step3').classList.add('d-none');
    document.getElementById('step4').classList.add('d-none');

    const submitBtn = document.getElementById('btnSubmitVerify');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-shield-check me-1"></i> Submit &amp; Verify API';
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

// Disconnect API
function disconnectApi(serviceId) {
    if (confirm(`Disconnect ${DELIVERY_SERVICES[serviceId]?.name} gateway?`)) {
        DELIVERY_SERVICES[serviceId].verified = false;
        delete savedApiState[serviceId];
        try {
            localStorage.setItem('dinedispatch_delivery_api_state', JSON.stringify(savedApiState));
        } catch (e) {}
        updateProgressiveState();
        renderSpiderTable();
    }
}

// Handle Verification Submit
function handleApiVerification(event) {
    event.preventDefault();
    const sId = document.getElementById('modalCurrentServiceId').value;
    const s = DELIVERY_SERVICES[sId];
    if (!s) return;

    const clientId = document.getElementById('apiClientIdInput').value.trim();
    const secret = document.getElementById('apiSecretInput').value.trim();
    const locationId = document.getElementById('apiLocationIdInput').value.trim();

    if (!clientId || !secret || !locationId) {
        alert('Please enter all credential fields.');
        return;
    }

    const submitBtn = document.getElementById('btnSubmitVerify');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Verifying...';

    const consoleBox = document.getElementById('verificationConsole');
    consoleBox.classList.remove('d-none');

    const timer = document.getElementById('consoleTimer');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    let ms = 0;
    const interval = setInterval(() => {
        ms += 12;
        timer.innerText = `${ms} ms`;
    }, 12);

    setTimeout(() => {
        step1.className = 'text-info mb-1';
        step1.style.color = 'var(--apex-cyan)';
        step1.innerHTML = '<i class="fa-solid fa-check me-1"></i> [TLS 1.3] Encrypted socket established';
        step2.classList.remove('d-none');
        step2.className = 'text-info mb-1';
        step2.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> [OAuth 2.0] Authenticating bearer token...';
    }, 300);

    setTimeout(() => {
        step2.className = 'text-info mb-1';
        step2.style.color = 'var(--apex-cyan)';
        step2.innerHTML = `<i class="fa-solid fa-check me-1"></i> [OAuth 2.0] Client authenticated: [${clientId.substring(0, 14)}...]`;
        step3.classList.remove('d-none');
        step3.className = 'text-info mb-1';
        step3.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> [Location GUID] Validating store geofence...';
    }, 700);

    setTimeout(() => {
        step3.className = 'text-info mb-1';
        step3.style.color = 'var(--apex-cyan)';
        step3.innerHTML = `<i class="fa-solid fa-check me-1"></i> [Location GUID] Store verified: [${locationId}]`;
        step4.classList.remove('d-none');
        clearInterval(interval);

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
            localStorage.setItem('dinedispatch_delivery_api_state', JSON.stringify(savedApiState));
        } catch (err) {}

        updateProgressiveState();
        renderSpiderTable();

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Verified Successfully!';

        addTelemetryLogRow(s.name, 'API.HANDSHAKE_VERIFIED', `${ms} ms`, `#${locationId.toUpperCase()}`);

        setTimeout(() => {
            closeApiConfigModal();
            submitBtn.innerHTML = '<i class="fa-solid fa-shield-check me-1"></i> Submit &amp; Verify API';
        }, 800);

    }, 1150);
}

// Progressive State Engine
function updateProgressiveState() {
    let count = 0;
    const verifiedNames = [];

    Object.keys(DELIVERY_SERVICES).forEach(k => {
        if (DELIVERY_SERVICES[k].verified) {
            count++;
            verifiedNames.push(DELIVERY_SERVICES[k].name);
        }
    });

    const activeCountEl = document.getElementById('metricActiveCount');
    if (activeCountEl) activeCountEl.innerText = `${count} / 6`;

    const activeDeltaEl = document.getElementById('metricActiveDelta');
    if (activeDeltaEl) {
        if (count > 0) {
            activeDeltaEl.className = 'apex-metric-tag';
            activeDeltaEl.innerText = `+${Math.round((count / 6) * 100)}% Active`;
        } else {
            activeDeltaEl.className = 'apex-metric-tag neutral';
            activeDeltaEl.innerText = 'Step 1 Ready';
        }
    }

    const catSyncEl = document.getElementById('metricCatalogSync');
    const catDeltaEl = document.getElementById('metricCatalogDelta');
    if (catSyncEl) catSyncEl.innerText = count > 0 ? '100% Synced' : 'Pending API';
    if (catDeltaEl) {
        catDeltaEl.className = count > 0 ? 'apex-metric-tag' : 'apex-metric-tag neutral';
        catDeltaEl.innerText = count > 0 ? 'Step 2 Active' : 'Step 2 Target';
    }

    const rtText = document.getElementById('realtimeStatusText');
    if (rtText) rtText.innerText = count > 0 ? `${count}/6 STREAMING` : '0/6 CONNECTED';

    const fcConnected = document.getElementById('filterCountConnected');
    const fcPending = document.getElementById('filterCountPending');
    if (fcConnected) fcConnected.innerText = count;
    if (fcPending) fcPending.innerText = 6 - count;

    const excelStatus = document.getElementById('excelStatusVerifiedCount');
    if (excelStatus) excelStatus.innerText = `${count} ACTIVE`;

    const b1 = document.getElementById('badgeStep1');
    const b2 = document.getElementById('badgeStep2');
    const b3 = document.getElementById('badgeStep3');
    const guideMsg = document.getElementById('stepperGuidanceMessage');

    const sheetTab2 = document.getElementById('sheetTab2');
    const sheetTab3 = document.getElementById('sheetTab3');
    const lockIcon2 = document.getElementById('sheet2LockIcon');
    const lockIcon3 = document.getElementById('sheet3LockIcon');

    if (count === 0) {
        if (b1) b1.className = 'apex-step-chip active';
        if (b2) b2.className = 'apex-step-chip locked';
        if (b3) b3.className = 'apex-step-chip locked';
        if (guideMsg) guideMsg.innerHTML = '<i class="fa-solid fa-circle-info" style="color: var(--apex-cyan);"></i> Select a delivery provider row below and click <strong>Configure API</strong> to initiate Step 1.';

        if (sheetTab2) sheetTab2.classList.add('is-locked');
        if (sheetTab3) sheetTab3.classList.add('is-locked');
        if (lockIcon2) lockIcon2.style.display = 'inline-block';
        if (lockIcon3) lockIcon3.style.display = 'inline-block';
    } else {
        if (b1) {
            b1.className = 'apex-step-chip verified';
            b1.innerHTML = '<i class="fa-solid fa-check"></i> Step 1: Verified';
        }
        if (b2) {
            b2.className = 'apex-step-chip verified';
            b2.innerHTML = '<i class="fa-solid fa-check"></i> Step 2: Menu Synced';
        }
        if (b3) {
            b3.className = 'apex-step-chip active';
            b3.innerHTML = '<i class="fa-solid fa-signal"></i> Step 3: Telemetry Live';
        }
        if (guideMsg) {
            guideMsg.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--apex-cyan);"></i> <strong>${count} API${count > 1 ? 's' : ''} Online (${verifiedNames.join(', ')}).</strong> Click <strong>Sheet2: Menu_Catalog_Sync</strong> or <strong>Sheet3: Live_Telemetry_Log</strong> below to inspect!`;
        }

        if (sheetTab2) sheetTab2.classList.remove('is-locked');
        if (sheetTab3) sheetTab3.classList.remove('is-locked');
        if (lockIcon2) lockIcon2.style.display = 'none';
        if (lockIcon3) lockIcon3.style.display = 'none';
    }
}

// Add Row to Telemetry Stream
function addTelemetryLogRow(provider, eventName, latency, ref) {
    const tbody = document.getElementById('telemetryTableBody');
    if (!tbody) return;
    const now = new Date();
    const timeStr = now.toISOString().replace('T', ' ').substring(11, 19);
    const rowCount = tbody.children.length + 1;

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="apex-row-num">${rowCount}</td>
        <td class="font-mono text-secondary">${timeStr} UTC</td>
        <td class="fw-bold text-white">${provider}</td>
        <td><code class="px-1.5 py-0.5 border font-mono text-xs" style="color: var(--apex-cyan); background: var(--apex-black); border-color: var(--apex-border);">${eventName}</code></td>
        <td><span class="apex-status-pill apex-status-200">200 OK</span></td>
        <td class="font-mono fw-bold" style="color: var(--apex-cyan);">${latency}</td>
        <td class="font-mono text-secondary text-xs">${ref}</td>
    `;
    tbody.insertBefore(tr, tbody.firstChild);

    const eventMetric = document.getElementById('metricEventCount');
    if (eventMetric) {
        const current = parseInt(eventMetric.innerText.replace(/,/g, '')) || 1428;
        eventMetric.innerText = (current + 1).toLocaleString();
    }
}

// Simulate Test Dispatch Ping
function seedSampleDispatchLog(serviceKey) {
    playOsClick(900, 0.04);
    const verifiedKeys = Object.keys(DELIVERY_SERVICES).filter(k => DELIVERY_SERVICES[k].verified);
    let providerName = 'Uber Direct';
    if (serviceKey && DELIVERY_SERVICES[serviceKey]) {
        providerName = DELIVERY_SERVICES[serviceKey].name;
    } else if (verifiedKeys.length > 0) {
        providerName = DELIVERY_SERVICES[verifiedKeys[Math.floor(Math.random() * verifiedKeys.length)]].name;
    }
    const lat = Math.floor(Math.random() * 16) + 14 + ' ms';
    const orderNum = Math.floor(Math.random() * 8999) + 1000;
    addTelemetryLogRow(providerName, 'DISPATCH.COURIER_PING', lat, `#ORDER-${orderNum} (Cheesesteak Combo)`);
    alert(`Simulated live courier ping sent to ${providerName}!
Round-trip latency: ${lat}.
Logged in Sheet3: Live_Telemetry_Log.`);
}

// Health Check All
function simulateFullApiHealthCheck() {
    playOsClick(800, 0.03);
    const btn = document.querySelector('button[onclick="simulateFullApiHealthCheck()"]');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Pinging...';
    setTimeout(() => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--apex-cyan);"></i> All Gateways OK';
        setTimeout(() => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Ping All';
        }, 2000);
    }, 600);
}

// Reset Walkthrough
function resetWalkthrough() {
    playOsClick(600, 0.05);
    if (confirm('Reset setup walkthrough to Step 1? This will unconfigure all simulated delivery APIs.')) {
        try {
            localStorage.removeItem('dinedispatch_delivery_api_state');
        } catch (e) {}
        savedApiState = {};
        Object.keys(DELIVERY_SERVICES).forEach(k => {
            DELIVERY_SERVICES[k].verified = false;
        });
        updateProgressiveState();
        renderSpiderTable();
        switchSheet('delivery');
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initApexClock();
    renderSpiderTable();
    updateProgressiveState();

    addTelemetryLogRow('System Gateway', 'GATEWAY.BOOT_SEQUENCE', '8 ms', '#SYSTEM_INITIALIZE');
    addTelemetryLogRow('Cloud Router', 'DNS.ANYCAST_SYNC', '12 ms', '#GLOBAL_ROUTE_READY');
});