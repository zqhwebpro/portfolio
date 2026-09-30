
/**
 * ==============================================================================
 * WACKY THINGS CO. // SEED INVENTORY (REBRANDED WACKY CATALOG)
 * ==============================================================================
 */
let PRODUCTS = [
    {
        id: 1,
        name: "Annoying Hidden Beeper",
        category: "Bunkums",
        categoryLabel: "Bunkums: Useless Machines",
        price: 9.98,
        rating: 4.9,
        reviews: 248,
        badge: "Best Seller",
        badgeColor: "amber",
        description: "Emits ultra-sharp periodic acoustic chirps at random intervals between 5 and 45 minutes with a magnetic field adhesive back.",
        image: "./images/beeper.jpg",
        stock: 45
    },
    {
        id: 2,
        name: "Electric Shock USB Drive Prank",
        category: "Skuttlebutts",
        categoryLabel: "Skuttlebutts: Pranks & Traps",
        price: 24.99,
        rating: 4.8,
        reviews: 189,
        badge: "Staff Pick",
        badgeColor: "cyan",
        description: "Looks like a normal flash drive, but delivers a harmless yet surprising static jolt when plugged in.",
        image: "./images/usb.jpg",
        stock: 30
    },
    {
        id: 3,
        name: "Disappearing Ink Magic Pen",
        category: "Balderdash",
        categoryLabel: "Balderdash: Illusion & Magic",
        price: 14.99,
        rating: 4.7,
        reviews: 95,
        badge: "Trail Classic",
        badgeColor: "purple",
        description: "High-grade rollerball pen with ink that completely fades away after 2 hours. Perfect for dubious contracts.",
        image: "./images/pen.jpg",
        stock: 60
    },
    {
        id: 4,
        name: "Squeaky Office Chair Wheel",
        category: "Flummery",
        categoryLabel: "Flummery: Absurd Apparel",
        price: 16.95,
        rating: 4.6,
        reviews: 112,
        badge: "Trail Tested",
        badgeColor: "amber",
        description: "A replacement caster wheel engineered with a resonant acoustic harmonic alert (it squeaks loudly no matter what).",
        image: "./images/chair_wheel.jpg",
        stock: 18
    },
    {
        id: 5,
        name: "Caffeinated Sleepy Time Tea",
        category: "Codswallop",
        categoryLabel: "Codswallop: Questionable Novelties",
        price: 18.50,
        rating: 4.9,
        reviews: 310,
        badge: "Trending",
        badgeColor: "emerald",
        description: "Artisanal high-caffeine dark roast disguised as a relaxing chamomile blend. Do not consume before bedtime.",
        image: "./images/coffee_bag.jpg",
        stock: 40
    },
    {
        id: 6,
        name: "Desktop Missile Defense Turret",
        category: "Bunkums",
        categoryLabel: "Bunkums: Useless Machines",
        price: 34.95,
        rating: 4.9,
        reviews: 420,
        badge: "Top Rated",
        badgeColor: "rose",
        description: "Motorized office perimeter launcher with 3 soft foam projectiles, 360-degree rotation, and USB controller interface.",
        image: "./images/missile_turret.jpg",
        stock: 15
    },
    {
        id: 7,
        name: "Ultra-Realistic Fake Cockroaches (50pcs)",
        category: "Skuttlebutts",
        categoryLabel: "Skuttlebutts: Pranks & Traps",
        price: 11.95,
        rating: 4.7,
        reviews: 165,
        badge: "Ultra Realistic",
        badgeColor: "amber",
        description: "Hyper-realistic vinyl bugs with lifelike flexible antennae, segmented legs, and a terrifyingly natural reflective sheen.",
        image: "./images/fake_bugs.jpg",
        stock: 50
    },
    {
        id: 8,
        name: "Fake Car Key Shock Prank",
        category: "Balderdash",
        categoryLabel: "Balderdash: Illusion & Magic",
        price: 9.95,
        rating: 4.5,
        reviews: 88,
        badge: "Windproof",
        badgeColor: "cyan",
        description: "Authentic-looking key fob housing a safe, high-voltage instant piezoelectric arc trigger for shocking your friends.",
        image: "./images/car_key.jpg",
        stock: 35
    },
    {
        id: 9,
        name: "Self-Inflating Whoopee Cushion",
        category: "Flummery",
        categoryLabel: "Flummery: Absurd Apparel",
        price: 6.99,
        rating: 4.8,
        reviews: 530,
        badge: "Self-Inflating",
        badgeColor: "rose",
        description: "Classic high-elasticity rubber cushion equipped with a rapid intake air valve for back-to-back comedic deployment.",
        image: "./images/whoopee_cushion.jpg",
        stock: 75
    },
    {
        id: 10,
        name: "Military-Grade Stink Bombs",
        category: "Codswallop",
        categoryLabel: "Codswallop: Questionable Novelties",
        price: 19.99,
        rating: 4.8,
        reviews: 210,
        badge: "High Potency",
        badgeColor: "emerald",
        description: "Protective foam-lined box with 12 impact ampoules releasing concentrated terrible smells upon being stepped on.",
        image: "./images/stink_bomb.jpg",
        stock: 25
    },
    {
        id: 11,
        name: "No-Tear Unrippable Toilet Paper",
        category: "Bunkums",
        categoryLabel: "Bunkums: Useless Machines",
        price: 8.50,
        rating: 4.6,
        reviews: 144,
        badge: "Woven Fabric",
        badgeColor: "cyan",
        description: "Looks like soft lightweight tissue, but is woven from extreme tensile-strength rip-stop fabric that cannot be torn.",
        image: "./images/toilet_paper.jpg",
        stock: 40
    },
    {
        id: 12,
        name: "Exploding Golf Balls (3-Pack)",
        category: "Balderdash",
        categoryLabel: "Balderdash: Illusion & Magic",
        price: 15.50,
        rating: 4.9,
        reviews: 275,
        badge: "High Visibility",
        badgeColor: "amber",
        description: "Weighted dimpled golf balls that release a bright fluorescent visual locator cloud upon being struck by a club.",
        image: "./images/golf_balls.jpg",
        stock: 28
    },
    {
        id: 13,
        name: "Invisible Ink UV Spy Kit",
        category: "Balderdash",
        categoryLabel: "Balderdash: Illusion & Magic",
        price: 12.95,
        rating: 4.8,
        reviews: 203,
        badge: "Secret Agent",
        badgeColor: "purple",
        description: "Complete covert kit with a UV invisible-ink pen, micro UV flashlight, and top-secret log booklet. Write hidden messages only readable under blacklight.",
        image: "./images/spy_kit.jpg",
        stock: 32
    },
    {
        id: 14,
        name: "Confetti Explosion Party Can",
        category: "Skuttlebutts",
        categoryLabel: "Skuttlebutts: Pranks & Traps",
        price: 7.99,
        rating: 4.7,
        reviews: 318,
        badge: "Instant Chaos",
        badgeColor: "rose",
        description: "Point, press, and unleash a hurricane of metallic confetti in a 3-meter radius. Perfect for ruining someone's clean living room or a surprise desk attack.",
        image: "./images/confetti_can.jpg",
        stock: 55
    },
    {
        id: 15,
        name: "Arrow-Through-Head Headband",
        category: "Flummery",
        categoryLabel: "Flummery: Absurd Apparel",
        price: 5.49,
        rating: 4.6,
        reviews: 412,
        badge: "Classic Gag",
        badgeColor: "amber",
        description: "Foam and rubber novelty headband with dual suction-cup ends designed to look like a giant arrow piercing your skull. Adjustable for all head sizes.",
        image: "./images/arrow_hat.jpg",
        stock: 88
    }
];

// State Store
let activeCategory = 'all';
let searchQuery = '';
let sortOption = 'default';
let priceFilter = 'all';
let minRatingFilter = 0;
let currentPage = 1;
let currentFilteredProducts = [];
let currentModalIndex = 0;
const ITEMS_PER_PAGE = 12;
let cart = [];

/**
 * ==============================================================================
 * CATEGORY BADGE COLOR MAPPINGS (DISTINCT COLOR PALETTES)
 * ==============================================================================
 */
function getCategoryBadgeStyle(cat) {
    const normalized = (cat || '').toLowerCase();
    if (normalized.includes('bunkum')) {
        // Forest Emerald Green with slight gradient
        return 'bg-gradient-to-r from-emerald-100/90 to-teal-50 text-emerald-950 border border-emerald-300/80 shadow-2xs';
    } else if (normalized.includes('skuttlebutt')) {
        // Campfire Amber Gold with slight gradient
        return 'bg-gradient-to-r from-amber-100/90 to-yellow-50 text-amber-950 border border-amber-300/80 shadow-2xs';
    } else if (normalized.includes('balderdash')) {
        // Alpine Sky Blue with slight gradient
        return 'bg-gradient-to-r from-sky-100/90 to-cyan-50 text-sky-950 border border-sky-300/80 shadow-2xs';
    } else if (normalized.includes('flummery')) {
        // Warm Sunset Orange with slight gradient
        return 'bg-gradient-to-r from-orange-100/90 to-amber-50 text-orange-950 border border-orange-300/80 shadow-2xs';
    } else if (normalized.includes('codswallop')) {
        // Mountain Indigo / Pine Purple with slight gradient
        return 'bg-gradient-to-r from-indigo-100/90 to-purple-50 text-indigo-950 border border-indigo-300/80 shadow-2xs';
    } else {
        // Neutral Earth with slight gradient
        return 'bg-gradient-to-r from-purple-100/90 to-violet-50 text-purple-950 border border-purple-300/80 shadow-2xs';
    }
}

function getCategoryIcon(cat) {
    const normalized = (cat || '').toLowerCase();
    if (normalized.includes('bunkum')) return 'fa-campground';
    if (normalized.includes('skuttlebutt')) return 'fa-fire-burner';
    if (normalized.includes('balderdash')) return 'fa-compass';
    if (normalized.includes('flummery')) return 'fa-shirt';
    if (normalized.includes('codswallop')) return 'fa-mug-hot';
    return 'fa-mountain';
}

/**
 * ==============================================================================
 * RENDER CATEGORY SIDEBAR NAV
 * ==============================================================================
 */
function renderCategorySidebar() {
    const nav = document.getElementById('category-sidebar-nav');
    if (!nav) return;

    // Extract distinct categories with counts
    const categories = [
        { id: 'all', name: 'All Bizarre Gadgets & Novelties', icon: 'fa-layer-group', count: PRODUCTS.length },
        { id: 'bunkums', name: 'Bunkums (Useless Machines)', icon: 'fa-campground', count: PRODUCTS.filter(p => p.category.toLowerCase() === 'bunkums').length },
        { id: 'skuttlebutts', name: 'Skuttlebutts (Pranks & Traps)', icon: 'fa-fire-burner', count: PRODUCTS.filter(p => p.category.toLowerCase() === 'skuttlebutts').length },
        { id: 'balderdash', name: 'Balderdash (Illusion & Magic)', icon: 'fa-compass', count: PRODUCTS.filter(p => p.category.toLowerCase() === 'balderdash').length },
        { id: 'flummery', name: 'Flummery (Absurd Apparel)', icon: 'fa-shirt', count: PRODUCTS.filter(p => p.category.toLowerCase() === 'flummery').length },
        { id: 'codswallop', name: 'Codswallop (Questionable Novelties)', icon: 'fa-shield-halved', count: PRODUCTS.filter(p => p.category.toLowerCase() === 'codswallop').length },
    ];

    nav.innerHTML = categories.map(c => {
        const isActive = activeCategory.toLowerCase() === c.id.toLowerCase();
        return `
                    <button onclick="window.selectCategory('${c.id}')" 
                            class="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-teal-700 text-white border border-teal-600' : 'bg-transparent text-earth-800 hover:bg-canvas-surface hover:text-earth-950'}">
                        <div class="flex items-center gap-2.5 truncate">
                            <i class="fa-solid ${c.icon} ${isActive ? 'text-teal-300' : 'text-appetite-700'} text-xs"></i>
                            <span class="truncate">${c.name}</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${isActive ? 'bg-teal-900 text-teal-200' : 'bg-canvas-surface text-earth-600'}">
                            ${c.count}
                        </span>
                    </button>
                `;
    }).join('');
}

function selectCategory(catId) {
    activeCategory = catId;
    currentPage = 1;
    renderCategorySidebar();
    renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setPriceFilter(tier) {
    priceFilter = tier;
    const label = document.getElementById('price-filter-label');
    if (label) {
        if (tier === 'under-15') label.innerText = 'Under $15';
        else if (tier === '15-25') label.innerText = '$15 - $25';
        else if (tier === 'over-25') label.innerText = '$25 & Above';
        else label.innerText = 'All Prices';
    }
    currentPage = 1;
    renderCatalog();
}

function setRatingFilter(min) {
    minRatingFilter = min;

    const btnAll = document.getElementById('rating-btn-all');
    const btn48 = document.getElementById('rating-btn-48');
    const btn46 = document.getElementById('rating-btn-46');

    [btnAll, btn48, btn46].forEach(b => {
        if (b) {
            b.className = 'px-2.5 py-1 rounded-lg border border-canvas-border bg-white hover:bg-canvas-surface text-earth-800 text-xs font-semibold transition-all';
        }
    });

    if (min === 4.8 && btn48) {
        btn48.className = 'px-2.5 py-1 rounded-lg border border-appetite-700 bg-appetite-700 text-white font-bold text-xs transition-all shadow-xs';
    } else if (min === 4.6 && btn46) {
        btn46.className = 'px-2.5 py-1 rounded-lg border border-appetite-700 bg-appetite-700 text-white font-bold text-xs transition-all shadow-xs';
    } else if (btnAll) {
        btnAll.className = 'px-2.5 py-1 rounded-lg border border-appetite-700 bg-appetite-700 text-white font-bold text-xs transition-all shadow-xs';
    }

    currentPage = 1;
    renderCatalog();
}

/**
 * ==============================================================================
 * RENDER CLEAN E-COMMERCE PRODUCT CATALOG (Views/Product/List.cshtml)
 * ==============================================================================
 */
function renderCatalog() {
    const grid = document.getElementById('product-grid');
    const emptyState = document.getElementById('empty-state');
    const visibleCountLabel = document.getElementById('visible-count');
    const activeCatTitle = document.getElementById('active-category-title');

    if (!grid) return;

    // 1. Filter by category
    let filtered = PRODUCTS.filter(p => {
        if (activeCategory === 'all') return true;
        return p.category.toLowerCase() === activeCategory.toLowerCase();
    });

    // 2. Filter by search query
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    // 3. Filter by price tier
    if (priceFilter === 'under-15') {
        filtered = filtered.filter(p => p.price < 15.00);
    } else if (priceFilter === '15-25') {
        filtered = filtered.filter(p => p.price >= 15.00 && p.price <= 25.00);
    } else if (priceFilter === 'over-25') {
        filtered = filtered.filter(p => p.price > 25.00);
    }

    // 4. Filter by minimum rating
    if (minRatingFilter > 0) {
        filtered = filtered.filter(p => p.rating >= minRatingFilter);
    }

    // 5. Sort
    if (sortOption === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'rating-desc') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (visibleCountLabel) visibleCountLabel.innerText = filtered.length;
    if (activeCatTitle) {
        if (activeCategory === 'all') activeCatTitle.innerText = 'All Bizarre Gadgets & Novelties';
        else if (activeCategory === 'bunkums') activeCatTitle.innerText = 'Bunkums: Useless Machines';
        else if (activeCategory === 'skuttlebutts') activeCatTitle.innerText = 'Skuttlebutts: Pranks & Traps';
        else if (activeCategory === 'balderdash') activeCatTitle.innerText = 'Balderdash: Illusion & Magic';
        else if (activeCategory === 'flummery') activeCatTitle.innerText = 'Flummery: Absurd Apparel';
        else if (activeCategory === 'codswallop') activeCatTitle.innerText = 'Codswallop: Questionable Novelties';
        else activeCatTitle.innerText = activeCategory;
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        const pButtons = document.getElementById('pagination-buttons');
        const pInfo = document.getElementById('page-info-label');
        if (pButtons) pButtons.innerHTML = '';
        if (pInfo) pInfo.innerText = 'Page 0 of 0';
        return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    currentFilteredProducts = filtered;

    // 6. Paginate
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if (currentPage > totalPages) currentPage = totalPages || 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Render Product Cards with Category Badge in New Area with Unique Colors
    grid.innerHTML = paginatedItems.map(prod => {
        const cartItem = cart.find(c => c.id === prod.id);
        const inCartQty = cartItem ? cartItem.quantity : 0;
        const badgeStyle = getCategoryBadgeStyle(prod.category);
        const categoryIcon = getCategoryIcon(prod.category);

        const actionButtonHtml = inCartQty > 0 ? `
                    <div class="space-y-2">
                        <div class="w-full py-2 px-3 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-teal-500/40">
                            <i class="fa-solid fa-check text-emerald-200"></i>
                            <span>Added to Cart</span>
                        </div>
                        <div class="flex items-center justify-between bg-gradient-to-r from-canvas-surface to-purple-50/60 border border-canvas-border rounded-xl p-1 text-earth-950">
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, -1)" 
                                    class="h-7 w-7 rounded-lg bg-white border border-canvas-border hover:bg-purple-50 text-earth-900 font-bold text-sm flex items-center justify-center transition-all cursor-pointer" 
                                    title="Decrease quantity">
                                <i class="fa-solid fa-minus text-[10px]"></i>
                            </button>
                            <div class="flex items-center gap-1.5 text-xs font-semibold">
                                <span class="text-earth-600 text-[11px]">Qty:</span>
                                <input type="number" 
                                       min="1" 
                                       max="99" 
                                       value="${inCartQty}" 
                                       onchange="window.setProductQuantity(${prod.id}, this.value)" 
                                       class="w-12 text-center bg-white border border-canvas-border rounded-md px-1 py-0.5 text-earth-950 text-xs font-bold focus:outline-none focus:border-teal-700">
                            </div>
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, 1)" 
                                    class="h-7 w-7 rounded-lg bg-white border border-canvas-border hover:bg-purple-50 text-earth-900 font-bold text-sm flex items-center justify-center transition-all cursor-pointer" 
                                    title="Increase quantity">
                                <i class="fa-solid fa-plus text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                ` : `
                    <button onclick="event.stopPropagation(); window.addToCart(${prod.id})" 
                            class="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 border border-teal-500/30 cursor-pointer">
                        <i class="fa-solid fa-cart-plus text-teal-200"></i>
                        <span>Add to Cart</span>
                    </button>
                `;

        return `
                    <article class="product-card group cursor-pointer" onclick="window.openProductModal(${prod.id})"
                             data-blueprint-file="WackyStore.WebUI/Views/Shared/_ProductSummary.cshtml"
                             data-blueprint-role="Product Summary Partial View"
                             data-blueprint-layer="WebUI / Partial View"
                             data-blueprint-dom="Semantic &lt;article&gt; with off-white card background, aspect-ratio 1:1 image frame, flex layout, hover zoom, and distinctive category badge pill."
                             data-blueprint-desc="In ASP.NET MVC, _ProductSummary.cshtml maps Domain.Entities.Product model properties directly into clean HTML markup without controller bloat."
                             data-blueprint-code="@Html.Partial(&quot;_ProductSummary&quot;, product)">
                        
                        <!-- Product Photo with Feature Badge -->
                        <div class="product-image-container">
                            <img src="${prod.image}" alt="${prod.name}" class="product-image" loading="lazy" />
                            <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-earth-950/85 backdrop-blur-md text-teal-400 border border-teal-500/30 text-[10px] font-bold tracking-wide uppercase shadow-xs">
                                ${prod.badge}
                            </span>
                        </div>

                        <!-- Card Body with Category Badge Moved into Body with Distinct Individual Colors -->
                        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                            
                            <div class="space-y-2">
                                
                                <!-- NEW AREA: Category Badge with Unique Colors + Star Rating Row -->
                                <div class="flex items-center justify-between gap-2 flex-wrap">
                                    <span class="category-badge-pill ${badgeStyle}">
                                        <i class="fa-solid ${categoryIcon}"></i>
                                        <span>${prod.category}</span>
                                    </span>

                                    <!-- Star Rating in Gold Yellow -->
                                    <div class="flex items-center gap-1 text-teal-600 text-xs">
                                        <span class="text-xs">★★★★★</span>
                                        <span class="text-earth-600 text-[11px] font-medium ml-0.5">${prod.rating}</span>
                                    </div>
                                </div>

                                <!-- Product Title in Rich Espresso -->
                                <h3 class="font-heading font-bold text-base text-earth-950 group-hover:text-teal-800 transition-colors line-clamp-1 leading-snug">
                                    ${prod.name}
                                </h3>

                                <!-- Description in Muted Mocha -->
                                <p class="text-earth-600 text-xs line-clamp-2 leading-relaxed font-sans">
                                    ${prod.description}
                                </p>
                            </div>

                            <!-- Price & Add to Cart / Quantity Stepper -->
                            <div class="pt-3 border-t border-canvas-border space-y-3">
                                <div class="flex items-baseline justify-between">
                                    <div>
                                        <span class="text-lg font-black text-earth-950 font-heading">$${prod.price.toFixed(2)}</span>
                                        <span class="text-[10px] text-earth-500 ml-1 font-medium">USD</span>
                                    </div>
                                    <span class="text-[10px] text-appetite-700 font-semibold font-mono">In Stock (${prod.stock})</span>
                                </div>

                                ${actionButtonHtml}
                            </div>

                        </div>

                    </article>
                `;
    }).join('');

    // Render Pagination (HtmlHelpers/PagingHelpers.cs)
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const container = document.getElementById('pagination-buttons');
    const pageInfo = document.getElementById('page-info-label');

    if (pageInfo) pageInfo.innerText = `Page ${currentPage} of ${totalPages || 1}`;
    if (!container) return;

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        html += `
                    <button onclick="window.goToPage(${i})" 
                            class="px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${isActive ? 'bg-teal-700 text-white border border-teal-500/30' : 'bg-white text-earth-800 border border-canvas-border hover:bg-purple-50 hover:border-purple-300'}">
                        ${i}
                    </button>
                `;
    }
    container.innerHTML = html;
}

function goToPage(p) {
    currentPage = p;
    renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * ==============================================================================
 * CART CONTROLLER & MODEL BINDER LOGIC (CartController.cs & Cart.cs)
 * ==============================================================================
 */
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(c => c.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartUI();
    triggerFlashToast(`Added "${product.name}" to cart`);
}

function updateCartQty(productId, delta) {
    const item = cart.find(c => c.id === productId);
    if (!item) {
        if (delta > 0) {
            addToCart(productId);
        }
        return;
    }

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(c => c.id !== productId);
    }

    updateCartUI();
}

function setProductQuantity(productId, val) {
    const qty = parseInt(val, 10);
    if (isNaN(qty) || qty <= 0) {
        cart = cart.filter(c => c.id !== productId);
    } else {
        const item = cart.find(c => c.id === productId);
        if (item) {
            item.quantity = qty;
        } else {
            const product = PRODUCTS.find(p => p.id === productId);
            if (product) {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: qty
                });
            }
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Header Cart
    const hCount = document.getElementById('header-cart-count');
    const hTotal = document.getElementById('header-cart-total');
    const dBadge = document.getElementById('drawer-cart-count-badge');
    const dSubtotal = document.getElementById('drawer-subtotal');
    const dTotal = document.getElementById('drawer-total');
    const coTotal = document.getElementById('checkout-total-display');

    if (hCount) hCount.innerText = totalItems;
    if (hTotal) hTotal.innerText = `$${subtotal.toFixed(2)}`;
    if (dBadge) dBadge.innerText = `${totalItems} items`;
    if (dSubtotal) dSubtotal.innerText = `$${subtotal.toFixed(2)}`;
    if (dTotal) dTotal.innerText = `$${subtotal.toFixed(2)}`;
    if (coTotal) coTotal.innerText = `$${subtotal.toFixed(2)}`;

    // Free shipping progress tracker ($35 threshold)
    const threshold = 35.00;
    const bar = document.getElementById('shipping-progress-bar');
    const progText = document.getElementById('shipping-progress-text');
    const progBadge = document.getElementById('shipping-status-badge');

    if (bar && progText && progBadge) {
        if (subtotal >= threshold) {
            bar.style.width = '100%';
            bar.className = 'bg-appetite-700 h-full w-full transition-all duration-300';
            progText.innerText = '🎉 You unlocked FREE 2-Day Shipping!';
            progBadge.innerText = 'UNLOCKED';
            progBadge.className = 'text-appetite-700 font-bold';
        } else {
            const remaining = threshold - subtotal;
            const percent = Math.min(100, (subtotal / threshold) * 100);
            bar.style.width = `${percent}%`;
            bar.className = 'bg-appetite-700 h-full transition-all duration-300';
            progText.innerText = `Add $${remaining.toFixed(2)} for Free 2-Day Shipping`;
            progBadge.innerText = `$${remaining.toFixed(2)} Left`;
            progBadge.className = 'text-teal-900 font-bold';
        }
    }

    // Render Cart Drawer Items
    const container = document.getElementById('cart-items-container');
    if (container) {
        if (cart.length === 0) {
            container.innerHTML = `
                        <div class="h-48 flex flex-col items-center justify-center text-center space-y-2 text-earth-500">
                            <i class="fa-solid fa-basket-shopping text-3xl text-earth-400"></i>
                            <div class="text-xs font-medium">Your cart is currently empty.</div>
                        </div>
                    `;
        } else {
            container.innerHTML = cart.map(item => `
                        <div class="flex items-center gap-3 bg-gradient-to-r from-white via-white to-purple-50/40 p-3.5 rounded-xl border border-canvas-border text-xs shadow-xs">
                            <img src="${item.image}" alt="${item.name}" class="h-12 w-12 rounded-lg object-cover bg-canvas-surface border border-canvas-border" />
                            <div class="flex-1 min-w-0">
                                <div class="font-bold text-earth-950 truncate">${item.name}</div>
                                <div class="text-earth-600 font-mono text-[11px]">$${item.price.toFixed(2)} each</div>
                            </div>
                            <div class="flex items-center gap-1.5 bg-canvas-surface/80 border border-canvas-border rounded-lg p-1">
                                <button onclick="window.updateCartQty(${item.id}, -1)" class="h-6 w-6 rounded-md bg-white text-earth-900 hover:bg-earth-200 border border-canvas-border text-xs font-bold flex items-center justify-center transition-all cursor-pointer">
                                    -
                                </button>
                                <span class="font-bold text-earth-950 px-1 font-mono">${item.quantity}</span>
                                <button onclick="window.updateCartQty(${item.id}, 1)" class="h-6 w-6 rounded-md bg-gradient-to-b from-white to-purple-50 text-earth-900 hover:bg-earth-200 border border-canvas-border text-xs font-bold flex items-center justify-center transition-all cursor-pointer">
                                    +
                                </button>
                            </div>
                            <button onclick="window.removeCartItem(${item.id})" class="text-earth-400 hover:text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Remove item">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    `).join('');
        }
    }

    // Re-render catalog cards to reflect quantity button state
    renderCatalog();
}

function removeCartItem(productId) {
    cart = cart.filter(c => c.id !== productId);
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
    triggerFlashToast('Cart cleared');
}

/**
 * ==============================================================================
 * SEARCH, SORTING & FILTERING (ProductController.cs)
 * ==============================================================================
 */
let selectedSearchLetter = 'ALL';

function initSearchLetters() {
    const container = document.getElementById('search-letter-pills');
    if (!container) return;

    const letters = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
    const letterCounts = {};
    letters.forEach(l => {
        if (l === 'ALL') {
            letterCounts[l] = PRODUCTS.length;
        } else {
            letterCounts[l] = PRODUCTS.filter(p => p.name.toUpperCase().startsWith(l)).length;
        }
    });

    container.innerHTML = letters.map(l => {
        const count = letterCounts[l] || 0;
        const isSelected = selectedSearchLetter === l;
        const hasProducts = count > 0;
        return `
                    <button type="button" 
                            onclick="event.stopPropagation(); window.selectSearchLetter('${l}')"
                            class="px-2 py-0.5 rounded-md font-bold transition-all shrink-0 text-[10px] ${isSelected
                ? 'bg-appetite-700 text-white shadow-xs'
                : hasProducts
                    ? 'bg-white hover:bg-canvas-border text-earth-800 border border-canvas-border'
                    : 'bg-canvas-base text-earth-300 border border-canvas-border/50 opacity-60'
            }"
                            title="${l === 'ALL' ? 'All Products' : `${count} products start with ${l}`}">
                        ${l}
                    </button>
                `;
    }).join('');
}

function selectSearchLetter(letter) {
    selectedSearchLetter = letter;
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear-btn');

    if (letter === 'ALL') {
        if (input) input.value = '';
        searchQuery = '';
        if (clearBtn) clearBtn.classList.add('hidden');
    } else {
        if (input) input.value = letter;
        searchQuery = letter;
        if (clearBtn) clearBtn.classList.remove('hidden');
    }

    initSearchLetters();
    renderAjaxDropdownResults();

    currentPage = 1;
    renderCatalog();
}

function openSearchDropdown() {
    const dropdown = document.getElementById('search-ajax-dropdown');
    if (!dropdown) return;
    initSearchLetters();
    renderAjaxDropdownResults();
    dropdown.classList.remove('hidden');
}

function closeSearchDropdown() {
    const dropdown = document.getElementById('search-ajax-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

function handleSearchInput() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    searchQuery = input.value.trim();

    if (searchQuery.length > 0) {
        clearBtn.classList.remove('hidden');
        const firstChar = searchQuery.charAt(0).toUpperCase();
        if (/^[A-Z]$/.test(firstChar)) {
            selectedSearchLetter = firstChar;
        } else {
            selectedSearchLetter = 'ALL';
        }
    } else {
        clearBtn.classList.add('hidden');
        selectedSearchLetter = 'ALL';
    }

    initSearchLetters();
    renderAjaxDropdownResults();
    openSearchDropdown();

    currentPage = 1;
    renderCatalog();
}

function clearSearch() {
    const input = document.getElementById('search-input');
    const clearBtn = document.getElementById('search-clear-btn');
    if (input) input.value = '';
    searchQuery = '';
    selectedSearchLetter = 'ALL';
    if (clearBtn) clearBtn.classList.add('hidden');
    initSearchLetters();
    closeSearchDropdown();
    currentPage = 1;
    renderCatalog();
}

function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
        closeSearchDropdown();
        const input = document.getElementById('search-input');
        if (input) input.blur();
    } else if (e.key === 'Enter') {
        e.preventDefault();
        viewAllSearchResults();
    }
}

function viewAllSearchResults() {
    closeSearchDropdown();
    if (window.currentView === 'blog') {
        window.toggleViewStoreBlog();
    }
    const catalogSec = document.getElementById('store-main-view');
    if (catalogSec) {
        catalogSec.scrollIntoView({ behavior: 'smooth' });
    }
}

function selectAjaxProduct(productId) {
    closeSearchDropdown();
    if (window.currentView === 'blog') {
        window.toggleViewStoreBlog();
    }
    openProductModal(productId);
}

function renderAjaxDropdownResults() {
    const resultsContainer = document.getElementById('search-ajax-results');
    const countLabel = document.getElementById('search-results-count');
    const statusLabel = document.getElementById('search-ajax-status');
    if (!resultsContainer) return;

    const q = (searchQuery || '').trim().toLowerCase();
    const letter = (selectedSearchLetter && selectedSearchLetter !== 'ALL') ? selectedSearchLetter.toLowerCase() : null;

    let matches = PRODUCTS;

    if (letter && (!q || q.toLowerCase() === letter)) {
        matches = PRODUCTS.filter(p => p.name.toLowerCase().startsWith(letter) || p.category.toLowerCase().startsWith(letter));
        if (statusLabel) statusLabel.innerText = `LINQ .Where(p => p.Name.StartsWith("${letter.toUpperCase()}"))`;
    } else if (q) {
        matches = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
        if (statusLabel) statusLabel.innerText = `LINQ .Where(p => p.Name.Contains("${q}"))`;
    } else {
        if (statusLabel) statusLabel.innerText = `LINQ .Take(8) [Live Preview]`;
        matches = PRODUCTS.slice(0, 8);
    }

    if (countLabel) {
        countLabel.innerText = `${matches.length} ${matches.length === 1 ? 'item' : 'items'} found`;
    }

    if (matches.length === 0) {
        resultsContainer.innerHTML = `
                    <div class="p-6 text-center text-earth-500">
                        <i class="fa-solid fa-ghost text-2xl text-earth-300 mb-2"></i>
                        <p class="text-xs font-semibold text-earth-800">No bizarre gadgets found matching "${searchQuery || selectedSearchLetter}"</p>
                        <p class="text-[11px] text-earth-400 mt-1">Try another letter or clear the search to browse all items.</p>
                        <button type="button" onclick="window.clearSearch()" class="mt-3 px-3 py-1 bg-earth-100 hover:bg-earth-200 text-earth-900 rounded-lg text-xs font-bold transition-all">
                            Show All Products
                        </button>
                    </div>
                `;
        return;
    }

    resultsContainer.innerHTML = matches.map(prod => {
        const badgeStyle = getCategoryBadgeStyle(prod.category);
        const categoryIcon = getCategoryIcon(prod.category);
        let displayName = prod.name;
        const highlightTerm = q || letter;
        if (highlightTerm) {
            const escaped = highlightTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`(${escaped})`, 'gi');
            displayName = prod.name.replace(regex, '<mark class="bg-yellow-200 text-earth-950 px-0.5 rounded font-black">$1</mark>');
        }

        return `
                    <div onclick="window.selectAjaxProduct(${prod.id})" 
                         class="p-2.5 sm:p-3 hover:bg-canvas-surface cursor-pointer transition-colors flex items-center justify-between gap-3 group">
                        <div class="flex items-center gap-3 min-w-0">
                            <img src="${prod.image}" alt="${prod.name}" class="w-11 h-11 rounded-xl object-cover border border-canvas-border shrink-0 shadow-2xs group-hover:scale-105 transition-transform" />
                            <div class="min-w-0">
                                <div class="font-bold text-xs text-earth-900 group-hover:text-appetite-700 transition-colors truncate">
                                    ${displayName}
                                </div>
                                <div class="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span class="text-[10px] font-bold px-1.5 py-0.2 rounded-md ${badgeStyle} inline-flex items-center gap-1">
                                        <i class="${categoryIcon} text-[9px]"></i>
                                        <span>${prod.category}</span>
                                    </span>
                                    <span class="text-[10px] text-earth-400 font-medium">★ ${prod.rating.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-2.5 shrink-0">
                            <span class="font-mono font-black text-teal-800 text-xs sm:text-sm">$${prod.price.toFixed(2)}</span>
                            <button type="button" onclick="event.stopPropagation(); window.addToCart(${prod.id});" 
                                    class="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white text-[11px] font-bold hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 border border-teal-500/30 cursor-pointer"
                                    title="Add to Cart">
                                <i class="fa-solid fa-cart-plus text-[10px] text-teal-200"></i>
                                <span class="hidden sm:inline">Add</span>
                            </button>
                        </div>
                    </div>
                `;
    }).join('');
}

// Close search dropdown on click outside
document.addEventListener('click', (e) => {
    const wrapper = document.getElementById('search-bar-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        closeSearchDropdown();
    }
});

window.openSearchDropdown = openSearchDropdown;
window.closeSearchDropdown = closeSearchDropdown;
window.selectSearchLetter = selectSearchLetter;
window.handleSearchInput = handleSearchInput;
window.clearSearch = clearSearch;
window.handleSearchKeydown = handleSearchKeydown;
window.viewAllSearchResults = viewAllSearchResults;
window.selectAjaxProduct = selectAjaxProduct;
window.renderAjaxDropdownResults = renderAjaxDropdownResults;

function handleSortChange() {
    const select = document.getElementById('sort-select');
    sortOption = select.value;
    currentPage = 1;
    renderCatalog();
}

function goToStoreCatalog() {
    if (typeof closeProductModal === 'function') closeProductModal();
    if (typeof closeCartDrawer === 'function') closeCartDrawer();
    if (typeof closeBlogReaderModal === 'function') closeBlogReaderModal();
    const adminModal = document.getElementById('admin-modal-backdrop');
    if (adminModal) adminModal.classList.add('hidden');
    const archModal = document.getElementById('arch-modal-backdrop');
    if (archModal) archModal.classList.add('hidden');
    const checkoutModal = document.getElementById('checkout-modal-backdrop');
    if (checkoutModal) checkoutModal.classList.add('hidden');

    if (window.currentView && window.currentView !== 'store') {
        if (typeof window.toggleViewStoreBlog === 'function') {
            window.toggleViewStoreBlog('store');
        }
    }

    resetFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.goToStoreCatalog = goToStoreCatalog;

function resetFilters() {
    if (window.currentView && window.currentView !== 'store') {
        if (typeof window.toggleViewStoreBlog === 'function') {
            window.toggleViewStoreBlog('store');
        }
    }
    activeCategory = 'all';
    clearSearch();
    priceFilter = 'all';
    minRatingFilter = 0;
    const priceRadioAll = document.querySelector('input[name="price-filter"][value="all"]');
    if (priceRadioAll) priceRadioAll.checked = true;
    const label = document.getElementById('price-filter-label');
    if (label) label.innerText = 'All Prices';
    setRatingFilter(0);

    const select = document.getElementById('sort-select');
    if (select) select.value = 'default';
    sortOption = 'default';
    currentPage = 1;
    renderCategorySidebar();
    renderCatalog();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * ==============================================================================
 * MODAL CONTROLS & CHECKOUT WORKFLOW (Views/Cart/Checkout.cshtml)
 * ==============================================================================
 */

/**
 * ==============================================================================
 * PRODUCT DETAILS MODAL LOGIC
 * ==============================================================================
 */
function openProductModal(productId) {
    const index = currentFilteredProducts.findIndex(p => p.id === productId);
    if (index === -1) return;

    currentModalIndex = index;
    renderProductModal();
    document.getElementById('product-modal-backdrop').classList.remove('hidden');
}

function closeProductModal() {
    document.getElementById('product-modal-backdrop').classList.add('hidden');
}

function modalNextProduct() {
    if (currentFilteredProducts.length <= 1) return;
    currentModalIndex = (currentModalIndex + 1) % currentFilteredProducts.length;
    renderProductModal();
}

function modalPrevProduct() {
    if (currentFilteredProducts.length <= 1) return;
    currentModalIndex = (currentModalIndex - 1 + currentFilteredProducts.length) % currentFilteredProducts.length;
    renderProductModal();
}

function renderProductModal() {
    const prod = currentFilteredProducts[currentModalIndex];
    if (!prod) return;

    document.getElementById('pm-image').src = prod.image;
    document.getElementById('pm-image').alt = prod.name;
    document.getElementById('pm-badge').innerText = prod.badge;
    document.getElementById('pm-category').innerText = prod.category;
    document.getElementById('pm-rating').innerText = prod.rating;
    document.getElementById('pm-name').innerText = prod.name;
    document.getElementById('pm-desc').innerText = prod.description;
    document.getElementById('pm-price').innerText = '$' + prod.price.toFixed(2);
    document.getElementById('pm-stock').innerText = 'In Stock (' + prod.stock + ')';

    const cartItem = cart.find(c => c.id === prod.id);
    const inCartQty = cartItem ? cartItem.quantity : 0;
    const container = document.getElementById('pm-action-container');

    if (inCartQty > 0) {
        container.innerHTML = `
                    <div class="space-y-3">
                        <div class="w-full py-3 px-4 rounded-xl bg-teal-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-teal-500/40">
                            <i class="fa-solid fa-check text-emerald-200"></i>
                            <span>Added to Cart</span>
                        </div>
                        <div class="flex items-center justify-between bg-gradient-to-r from-canvas-surface to-purple-50/60 border border-canvas-border rounded-xl p-1.5 text-earth-950">
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, -1); window.renderProductModal();" 
                                    class="h-10 w-10 rounded-lg bg-white border border-canvas-border hover:bg-purple-50 text-earth-900 font-bold text-lg flex items-center justify-center transition-all cursor-pointer">
                                <i class="fa-solid fa-minus text-sm"></i>
                            </button>
                            <div class="flex items-center gap-2 text-sm font-semibold">
                                <span class="text-earth-600 font-medium">Qty:</span>
                                <input type="number" min="1" max="99" value="${inCartQty}" 
                                       onclick="event.stopPropagation();"
                                       onchange="window.setProductQuantity(${prod.id}, this.value); window.renderProductModal();" 
                                       class="w-16 text-center bg-white border border-canvas-border rounded-lg px-2 py-1.5 text-earth-950 text-sm font-bold focus:outline-none focus:border-teal-700">
                            </div>
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, 1); window.renderProductModal();" 
                                    class="h-10 w-10 rounded-lg bg-white border border-canvas-border hover:bg-purple-50 text-earth-900 font-bold text-lg flex items-center justify-center transition-all cursor-pointer">
                                <i class="fa-solid fa-plus text-sm"></i>
                            </button>
                        </div>
                    </div>
                `;
    } else {
        container.innerHTML = `
                    <button onclick="event.stopPropagation(); window.addToCart(${prod.id}); window.renderProductModal();" 
                            class="w-full py-3.5 rounded-xl bg-teal-700 hover:bg-teal-600 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 border border-teal-500/30 cursor-pointer">
                        <i class="fa-solid fa-cart-plus text-teal-200"></i>
                        <span>Add to Cart</span>
                    </button>
                `;
    }
}

function openCartDrawer() {
    document.getElementById('cart-drawer-backdrop').classList.remove('hidden');
}

function closeCartDrawer() {
    document.getElementById('cart-drawer-backdrop').classList.add('hidden');
}

function openCheckoutModal() {
    if (cart.length === 0) {
        triggerFlashToast('Please add items to your cart before checkout');
        return;
    }
    closeCartDrawer();
    document.getElementById('checkout-modal-backdrop').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal-backdrop').classList.add('hidden');
}

function processCheckout() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const name = document.getElementById('co-name').value;
    const city = document.getElementById('co-city').value;

    // Generate Order Id
    const orderId = '#WT-' + Math.floor(100000 + Math.random() * 900000);

    // Populate Receipt
    document.getElementById('rec-order-id').innerText = orderId;
    document.getElementById('rec-name').innerText = name;
    document.getElementById('rec-dest').innerText = city;
    document.getElementById('rec-total').innerText = `$${subtotal.toFixed(2)}`;

    // Clear Cart & Close Modal
    cart = [];
    updateCartUI();
    closeCheckoutModal();

    // Open Receipt
    document.getElementById('receipt-modal-backdrop').classList.remove('hidden');
}

function closeReceiptModal() {
    document.getElementById('receipt-modal-backdrop').classList.add('hidden');
}

/**
 * ==============================================================================
 * ADMIN CRUD PORTAL (AdminController.cs & EFProductRepository.cs)
 * ==============================================================================
 */
function openAdminModal() {
    renderAdminInventoryList();
    document.getElementById('admin-modal-backdrop').classList.remove('hidden');
}

function closeAdminModal() {
    document.getElementById('admin-modal-backdrop').classList.add('hidden');
}

function renderAdminInventoryList() {
    const container = document.getElementById('admin-inventory-list');
    if (!container) return;

    container.innerHTML = PRODUCTS.map(p => `
                <div class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-canvas-border">
                    <div class="flex items-center gap-2.5">
                        <img src="${p.image}" alt="${p.name}" class="h-8 w-8 rounded object-cover border border-canvas-border" />
                        <div>
                            <div class="font-bold text-earth-950">${p.name}</div>
                            <div class="text-[10.5px] text-earth-600 font-mono">${p.category} &bull; $${p.price.toFixed(2)}</div>
                        </div>
                    </div>
                    <button onclick="window.handleAdminDelete(${p.id})" class="px-2 py-1 rounded bg-earth-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all text-xs font-bold">
                        Delete
                    </button>
                </div>
            `).join('');
}

function handleAdminAddProduct() {
    const name = document.getElementById('adm-name').value;
    const cat = document.getElementById('adm-cat').value;
    const price = parseFloat(document.getElementById('adm-price').value);
    const desc = document.getElementById('adm-desc').value;

    const newId = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1;

    PRODUCTS.unshift({
        id: newId,
        name: name,
        category: cat,
        categoryLabel: `${cat}: Wacky Thing`,
        price: price,
        rating: 5.0,
        reviews: 1,
        badge: "New Arrival",
        badgeColor: "emerald",
        description: desc,
        image: "./images/beeper.jpg",
        stock: 20
    });

    document.getElementById('admin-add-form').reset();
    renderAdminInventoryList();
    renderCategorySidebar();
    renderCatalog();
    triggerFlashToast(`Added "${name}" to database`);
}

function handleAdminDelete(productId) {
    PRODUCTS = PRODUCTS.filter(p => p.id !== productId);
    cart = cart.filter(c => c.id !== productId);
    renderAdminInventoryList();
    renderCategorySidebar();
    updateCartUI();
    triggerFlashToast('Product deleted from EF repository');
}

/**
 * ==============================================================================
 * ARCHITECTURE MODAL
 * ==============================================================================
 */
function openArchitectureModal() {
    document.getElementById('arch-modal-backdrop').classList.remove('hidden');
}

function closeArchitectureModal() {
    document.getElementById('arch-modal-backdrop').classList.add('hidden');
}

/**
 * ==============================================================================
 * BLUEPRINT HOVER TOOLTIP ENGINE
 * ==============================================================================
 */
const tooltip = document.getElementById('blueprint-tooltip');
const ttRole = document.getElementById('tt-role');
const ttLayerBadge = document.getElementById('tt-layer-badge');
const ttDomCss = document.getElementById('tt-dom-css');
const ttFile = document.getElementById('tt-file');
const ttCode = document.getElementById('tt-code');
const ttDesc = document.getElementById('tt-desc');

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-blueprint-file]');
    if (!target) return;

    const file = target.getAttribute('data-blueprint-file') || 'WackyStore.WebUI/...';
    const role = target.getAttribute('data-blueprint-role') || 'UI Component';
    const layer = target.getAttribute('data-blueprint-layer') || 'Presentation';
    const dom = target.getAttribute('data-blueprint-dom') || 'HTML & CSS Fluid Grid/Flexbox Layout';
    const desc = target.getAttribute('data-blueprint-desc') || 'Architectural component in the ASP.NET MVC pipeline.';
    const code = target.getAttribute('data-blueprint-code') || '// ASP.NET MVC action';

    ttRole.innerText = role;
    ttLayerBadge.innerText = layer;
    ttDomCss.innerText = dom;
    ttFile.innerText = file;
    ttCode.innerText = code;
    ttDesc.innerText = desc;

    tooltip.classList.add('visible');
    positionTooltip(e);
});

document.addEventListener('mousemove', (e) => {
    if (tooltip && tooltip.classList.contains('visible')) {
        positionTooltip(e);
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('[data-blueprint-file]');
    if (target && !e.relatedTarget?.closest('[data-blueprint-file]')) {
        if (tooltip) tooltip.classList.remove('visible');
    }
});

function positionTooltip(e) {
    if (!tooltip) return;
    const padding = 15;
    let left = e.clientX + padding;
    let top = e.clientY + padding;

    const tooltipRect = tooltip.getBoundingClientRect();

    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = e.clientX - tooltipRect.width - padding;
    }
    if (top + tooltipRect.height > window.innerHeight - 10) {
        top = e.clientY - tooltipRect.height - padding;
    }

    tooltip.style.left = `${Math.max(10, left)}px`;
    tooltip.style.top = `${Math.max(10, top)}px`;
}

function triggerFlashToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-appetite-700 text-white font-bold text-xs shadow-2xl transition-all flex items-center gap-2';
    toast.innerHTML = `<i class="fa-solid fa-cart-shopping text-teal-300"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 250);
    }, 1800);
}

// Global Keybindings
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCartDrawer();
        closeCheckoutModal();
        closeReceiptModal();
        closeAdminModal();
        closeArchitectureModal();
    }
});

// Global Dark Mode Toggle Logic
window.updateThemeUI = function (isDark) {
    const headerIcon = document.getElementById('headerThemeIcon');
    const headerText = document.getElementById('headerThemeText');
    const path = document.getElementById('wavyTrianglePath');

    if (isDark) {
        if (headerIcon) headerIcon.className = 'fa-solid fa-sun text-amber-400';
        if (headerText) headerText.innerText = 'Light';
        if (path) {
            path.setAttribute('fill', 'url(#wavyGradientDark)');
            path.setAttribute('stroke', '#6B21A8');
        }
    } else {
        if (headerIcon) headerIcon.className = 'fa-solid fa-moon text-amber-500';
        if (headerText) headerText.innerText = 'Theme';
        if (path) {
            path.setAttribute('fill', 'url(#wavyGradientLight)');
            path.setAttribute('stroke', '#4C1D95');
        }
    }
};

window.toggleDarkMode = function () {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    window.updateThemeUI(isDark);
    localStorage.setItem('wacky_store_theme', isDark ? 'dark' : 'light');
};

// ==============================================================================
// WACKY STORE <-> BLOG VIEW SWITCHER WITH FALL-DOWN ANIMATION
// ==============================================================================
window.BLOG_POSTS = [
    {
        id: 'un-popcorn',
        title: 'The Secret Science of Un-Popcorn: Why Kernels Un-Pop Under Lunar Light',
        category: 'Quantum Gastronomy',
        author: 'Dr. Barnaby Fizz',
        authorRole: 'Chief Mischief Scientist',
        date: 'October 14, 2026',
        readTime: '3 min read',
        image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
        excerpt: 'Have you ever wondered why our Inverse Popcorn Kernels return to raw corn when exposed to moonlight? We sat down with our lead laboratory gnome to understand reverse munching.',
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">It began as an accidental laboratory mishap during our midnight popcorn experiments. When senior researcher Dr. Barnaby left a bowl of freshly popped buttered popcorn under direct full-moon illumination, something astonishing occurred: every single white fluffy kernel imploded backward into a shiny, raw, un-popped kernel!</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">The Lunar Reversion Effect</h3>
                    <p>Our quantum physics division isolated the phenomenon down to subatomic moonlight resonance. Unlike sunlight, moonlight carries a unique phase-shifted photon energy that vibrates at precisely 432 Hz. When these photons collide with expanded corn starch matrixes, they cause instant thermo-kinetic deflation.</p>
                    <blockquote class="p-4 rounded-2xl bg-amber-50 border-l-4 border-amber-500 italic text-earth-900 font-serif my-4">
                        "It's the only food on Earth that lets you un-snack your movie night mistakes. Ate too much? Just step onto the balcony under the moon!" &mdash; Dr. Barnaby Fizz
                    </blockquote>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">How to Store Your Un-Popcorn</h3>
                    <p>To prevent accidental un-popping during daytime storage, keep your kernels sealed inside our certified lead-lined Mischief Tin. For gourmet results, serve under artificial neon lamps!</p>
                `
    },
    {
        id: 'invisible-chameleon',
        title: "How to Train Your Invisible Pet Chameleon: A Beginner's Guide",
        category: 'Pet Care & Illusion',
        author: 'Lady Genevieve Void',
        authorRole: 'Subtle Specimen Specialist',
        date: 'October 12, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=600&q=80',
        excerpt: "Invisible chameleons are notoriously hard to spot (literally). Here are 4 essential tricks to ensure your invisible companion doesn't get lost behind the sofa cushions.",
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">Adopting an Invisible Pet Chameleon is one of the most rewarding decisions a wacky enthusiast can make. However, owners frequently report misplacing their pets on day one. Here is our official handbook for happy, non-visible pet parenting.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">1. The Flour Powder Trick</h3>
                    <p>Dust a tiny sprinkle of organic baking flour across your chameleon's designated lounging rock. When your pet climbs onto the rock, tiny invisible footprints will appear in the flour, confirming their exact coordinates!</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">2. Bell Harness Etiquette</h3>
                    <p>Attach our ultra-lightweight micro brass bell harness around your chameleon's neck. A gentle <em>tinkle-tinkle</em> sound will announce when your pet is stalking a housefly or taking an afternoon stroll across your desk.</p>
                    <blockquote class="p-4 rounded-2xl bg-teal-50 border-l-4 border-teal-500 italic text-earth-900 font-serif my-4">
                        "Remember: If you accidentally sit on a warm, squishy air pocket on your couch, apologize immediately!"
                    </blockquote>
                `
    },
    {
        id: 'talking-cactus',
        title: 'Interview with a Talking Cactus: Life on the Windowsill',
        category: 'Botanical Gossip',
        author: 'Professor Needlewick',
        authorRole: 'Flora Telepathist',
        date: 'October 09, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
        excerpt: 'We spoke with Spike, a 7-year-old potted saguaro who claims to know all the secret family drama in house #42. Here is what he had to say about ambient sunbathing.',
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">Spike the Cactus has spent the last seven years perched on a sunny windowsill overlooking Elm Street. Thanks to our Botanical Speech Translator, we conducted a 45-minute exclusive interview with him.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">The Daily Routine of a Prickly Observer</h3>
                    <p><em>"People think house plants just sit around drinking water,"</em> Spike grunted via output frequency. <em>"In reality, we keep tabs on everything. I saw the mailman drop a package last Tuesday, and the dog across the street knows exactly what he did."</em></p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">Spike's Top Care Advice for Humans</h3>
                    <ul class="list-disc pl-5 space-y-1 text-earth-800">
                        <li>Stop over-watering us when you get emotional.</li>
                        <li>Rotate our pots 90 degrees every Sunday so we get an even tan.</li>
                        <li>Play 80s synthwave music; the bass vibrations stimulate root cell growth!</li>
                    </ul>
                `
    },
    {
        id: 'tuesday-gravity',
        title: 'Why Gravity Is Just a Suggestion on Tuesdays: A Scientific Investigation',
        category: 'Cosmic Anomalies',
        author: 'Archimedes Wobble',
        authorRole: 'Levitation Engineer',
        date: 'October 04, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
        excerpt: 'Ever feel lighter on Tuesday mornings? Our astrophysics department confirmed that Tuesdays experience a 14% drop in planetary pull due to cosmic laughter waves.',
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">Have you ever noticed your coffee spoon drifting slightly upward off the table on Tuesday mornings? You are not imagining things. According to our planetary sensors, Earth's gravitational pull fluctuates significantly every Tuesday.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">The Tuesday Dip Phenomenon</h3>
                    <p>Our orbital satellite <em>Mischief-1</em> recorded a recurring 14.2% drop in gravitational acceleration between 8:00 AM and 11:30 AM every Tuesday. Scientists believe this is caused by a tidal resonance between Jupiter and Earth's magnetic core.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">Practical Uses for Reduced Tuesday Gravity</h3>
                    <p>Take advantage of Tuesday buoyancy! It is the perfect day to practice high jumps, reorganize top shelf books without a step stool, or float your morning pancakes directly into your mouth.</p>
                `
    },
    {
        id: 'dehydrated-water',
        title: 'The History of Dehydrated Water: From Emergency Use to Gourmet Dining',
        category: 'Quantum Gastronomy',
        author: 'Chef Lorenzo Vapor',
        authorRole: 'Dry Hydration Master',
        date: 'September 28, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
        excerpt: 'Dehydrated water has revolutionized camping and space exploration. Learn how to reconstitute your canned dry moisture using genuine tap water.',
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">First patented in 1924 by eccentric inventor Barnaby Dry, Dehydrated Water remains one of the greatest inventions of the modern age. By removing 100% of H2O content from water, we created a lightweight powder that weighs zero grams!</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">Reconstitution Instructions</h3>
                    <p>To enjoy a refreshing glass of reconstituted water, simply pour 1 can of Dehydrated Water powder into a glass, add 8 oz of liquid tap water, stir for 10 seconds, and voila! You now have fresh, wet water ready to drink.</p>
                    <blockquote class="p-4 rounded-2xl bg-purple-50 border-l-4 border-purple-500 italic text-earth-900 font-serif my-4">
                        "It's ideal for dry hiking! Carry 10 cans without any weight penalty!"
                    </blockquote>
                `
    },
    {
        id: 'left-handed-mug',
        title: 'The Ergonomics of the Left-Handed Coffee Mug: Fluid Dynamics & Ceramics',
        category: 'Quantum Gastronomy',
        author: 'Dr. Barnaby Siphon',
        authorRole: 'Chief Hydro-Dynamist',
        date: 'October 14, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        excerpt: 'Standard mugs spill when tilted south-southwest by left-handed coffee drinkers. Our team engineered a dual-channel ceramic lip that prevents liquid turbulence.',
        content: `
                    <p class="text-base font-semibold text-earth-800 leading-relaxed">For centuries, left-handed coffee enthusiasts suffered from subtle liquid spills caused by asymmetric right-handed mug rim curves. In this paper, we explore the fluid mechanics of our patent-pending double-handled ergonomic mug.</p>
                    <h3 class="font-heading font-black text-xl text-earth-950 pt-2">Hydrodynamic Spill Prevention</h3>
                    <p>By analyzing the angular velocity of a morning coffee sip, Dr. Siphon discovered that left-handed tilt angles generate counter-clockwise vortex eddies. Our internal micro-ridge rim counteracts this swirl completely!</p>
                    <blockquote class="p-4 rounded-2xl bg-teal-50 border-l-4 border-teal-500 italic text-earth-900 font-serif my-4">
                        "Finally, a mug that respects the laws of fluid dynamics regardless of which hand holds it!"
                    </blockquote>
                `
    }
];

window.currentView = 'store'; // 'store' or 'blog'
window.activeBlogCategory = 'all';

window.playSpinMinigame = function () {
    window.triggerMinigame(); // Forward to the same function for consistency
};

window.closeMinigameModal = function () {
    const luckMain = document.getElementById('luck-main-view');
    luckMain.classList.add('hidden');
    luckMain.classList.remove('flex');

};

window.triggerMinigame = function () {
    window.minigamePlayed = true;
    const luckMain = document.getElementById('luck-main-view');
    luckMain.classList.remove('hidden');
    luckMain.classList.add('flex', 'animate-rise-up');

    // Reset game board state
    document.getElementById('spin-wheel-btn').disabled = false;
    document.getElementById('spin-wheel-btn').innerHTML = '<i class="fa-solid fa-dice text-5xl sm:text-6xl"></i>';
    document.getElementById('prize-result-box').classList.add('hidden');
    document.getElementById('prize-coupon-code-container').classList.add('hidden');

    document.querySelectorAll('.luck-sq').forEach(s => {
        s.classList.remove('bg-purple-500', 'border-purple-300', 'scale-105', 'z-10', 'bg-purple-500', 'border-purple-300', 'animate-pulse', 'shadow-[0_0_30px_rgba(168,85,247,0.8)]');
        s.classList.add('bg-earth-800', 'border-earth-700', 'shadow-[0_0_15px_rgba(88,28,135,0.3)]');
    });

    setTimeout(() => luckMain.classList.remove('animate-rise-up'), 500);
};

/**
 * ==============================================================================
 * UNIFIED VIEW SWITCHER ENGINE (Store <-> Blog <-> Funny Academy <-> Admin)
 * ==============================================================================
 */
window.activeBlogCategory = 'all';
window.activeCourseCategory = 'all';
window.selectedCourseForModal = null;

window.switchView = function (targetView) {
    const storeMain = document.getElementById('store-main-view');
    const blogMain = document.getElementById('blog-main-view');
    const learningMain = document.getElementById('learning-main-view');
    const luckMain = document.getElementById('luck-main-view');
    const adminMain = document.getElementById('admin-main-view');

    const hBlogText = document.getElementById('headerBlogText');
    const hBlogIcon = document.getElementById('headerBlogIcon');
    const hLearningText = document.getElementById('headerLearningText');
    const hLearningIcon = document.getElementById('headerLearningIcon');

    if (window.currentView === targetView) return;

    // Active view to transition out
    let currentMain;
    if (window.currentView === 'luck') currentMain = luckMain;
    else if (window.currentView === 'admin') currentMain = adminMain;
    else if (window.currentView === 'blog') currentMain = blogMain;
    else if (window.currentView === 'learning') currentMain = learningMain;
    else currentMain = storeMain;

    let nextMain;
    if (targetView === 'blog') nextMain = blogMain;
    else if (targetView === 'learning') nextMain = learningMain;
    else if (targetView === 'admin') nextMain = adminMain;
    else nextMain = storeMain;

    if (currentMain) {
        currentMain.classList.remove('animate-blur-fade-in');
        currentMain.classList.add('animate-blur-fade-out');
    }

    setTimeout(() => {
        if (currentMain) {
            currentMain.classList.remove('animate-blur-fade-out');
            currentMain.classList.add('hidden');
        }
        if (storeMain && storeMain !== nextMain) storeMain.classList.add('hidden');
        if (blogMain && blogMain !== nextMain) blogMain.classList.add('hidden');
        if (learningMain && learningMain !== nextMain) learningMain.classList.add('hidden');
        if (adminMain && adminMain !== nextMain) adminMain.classList.add('hidden');
        if (luckMain && luckMain !== nextMain) luckMain.classList.add('hidden');

        if (targetView === 'blog') {
            if (blogMain) {
                blogMain.classList.remove('hidden');
                blogMain.classList.add('animate-blur-fade-in');
            }
            if (typeof window.renderBlogPosts === 'function') {
                window.renderBlogPosts(window.activeBlogCategory || 'all');
            }
            window.currentView = 'blog';
            if (hBlogText) hBlogText.innerText = 'Store Catalog';
            if (hBlogIcon) hBlogIcon.className = 'fa-solid fa-shop text-appetite-700';
            if (hLearningText) hLearningText.innerText = 'Funny Academy';
            if (hLearningIcon) hLearningIcon.className = 'fa-solid fa-graduation-cap text-amber-200';
        } else if (targetView === 'learning') {
            if (learningMain) {
                learningMain.classList.remove('hidden');
                learningMain.classList.add('animate-blur-fade-in');
            }
            if (typeof window.renderCourses === 'function') {
                window.renderCourses(window.activeCourseCategory || 'all');
            }
            window.currentView = 'learning';
            if (hBlogText) hBlogText.innerText = 'The Wacky Blog';
            if (hBlogIcon) hBlogIcon.className = 'fa-solid fa-newspaper text-earth-300';
            if (hLearningText) hLearningText.innerText = 'Store Catalog';
            if (hLearningIcon) hLearningIcon.className = 'fa-solid fa-shop text-white';
        } else {
            if (storeMain) {
                storeMain.classList.remove('hidden');
                storeMain.classList.add('animate-blur-fade-in');
            }
            window.currentView = 'store';
            if (hBlogText) hBlogText.innerText = 'The Wacky Blog';
            if (hBlogIcon) hBlogIcon.className = 'fa-solid fa-newspaper text-earth-300';
            if (hLearningText) hLearningText.innerText = 'Funny Academy';
            if (hLearningIcon) hLearningIcon.className = 'fa-solid fa-graduation-cap text-amber-200';
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            if (nextMain) nextMain.classList.remove('animate-blur-fade-in');
        }, 600);
    }, 550);
};

window.toggleViewStoreBlog = function (forceTarget) {
    if (forceTarget) {
        window.switchView(forceTarget);
    } else if (window.currentView === 'blog') {
        window.switchView('store');
    } else {
        window.switchView('blog');
    }
};

window.toggleViewStoreLearning = function (forceTarget) {
    if (forceTarget) {
        window.switchView(forceTarget);
    } else if (window.currentView === 'learning') {
        window.switchView('store');
    } else {
        window.switchView('learning');
    }
};

window.goToStoreCatalog = function () {
    window.switchView('store');
};

window.returnToStore = function () {
    window.switchView('store');
};

/**
 * ==============================================================================
 * WACKYDASH-STYLE COURSES & LMS ENGINE (Decoupled from Store Catalog)
 * ==============================================================================
 */
window.COURSES = [
    {
        id: 'course-101',
        title: 'The Alchemy of Weird Physics: Quantum Fluidity & Squirting Mechanics',
        category: 'Absurd Physics',
        level: 'Intermediate Trickery',
        rating: 4.9,
        reviews: 142,
        price: 129.00,
        originalPrice: 189.00,
        image: 'images/course_illusion.jpg',
        duration: '6 Modules • 18 Lessons • 7.5 Hours',
        instructor: {
            name: 'Dr. Barnaby Fizzle',
            title: 'Chair of Non-Newtonian Comedy',
            avatar: 'images/coffee_bag.jpg'
        },
        description: 'Explore the thermodynamic equations governing left-handed spill-proof mugs, reverse-friction banana skins, and perpetual whoopee bladders. Includes hands-on lab schematics.',
        isLocked: true,
        curriculum: [
            {
                module: 'Module 1: Fluid Dynamics of Whimsical Drinkware',
                lessons: [
                    { title: '1.1 Micro-Vortex Creation in Ceramic Rims', duration: '18m', code: 'FluidDynamics.CalculateEddies()' },
                    { title: '1.2 Viscosity Calculations for Invisible Gravy', duration: '24m', code: 'GravyViscosity.SimulateFlow()' },
                    { title: '1.3 Lab Practicum: Fabricating Siphon Nozzles', duration: '32m', code: 'SiphonFabricator.Build()' }
                ]
            },
            {
                module: 'Module 2: High-Pressure Acoustic Bladder Rupture Limits',
                lessons: [
                    { title: '2.1 Elastic Acoustic Resonators (Whoopee Theory)', duration: '22m', code: 'ResonanceMatrix.EvaluateFrequencies()' },
                    { title: '2.2 Chair-Cushion Pressure Triggers & Microswitches', duration: '35m', code: 'SensorTrigger.RegisterEvent()' },
                    { title: '2.3 Audio Frequency Tuning for Maximum Surprise', duration: '28m', code: 'DecibelOptimizer.Tune()' }
                ]
            },
            {
                module: 'Module 3: Enterprise C# Integration & SignalR WebSockets',
                lessons: [
                    { title: '3.1 Remote Bladder Triggering via ASP.NET SignalR Hub', duration: '45m', code: 'Hub.Clients.All.TriggerPrank()' },
                    { title: '3.2 Ninject Dependency Injection for IoT Gag Devices', duration: '38m', code: 'Kernel.Bind<IGagDevice>().To<WhoopeeIoT>()' },
                    { title: '3.3 Capstone Lab: Automated Breakroom Prank Server', duration: '50m', code: 'PrankServer.DeployMicroservice()' }
                ]
            }
        ]
    },
    {
        id: 'course-102',
        title: 'Absurd Engineering: The Art & Mechanics of Wacky Inventions',
        category: 'Novelty Engineering',
        level: 'Foundational & Applied',
        rating: 4.8,
        reviews: 218,
        price: 149.00,
        originalPrice: 219.00,
        image: 'images/course_absurd.jpg',
        duration: '8 Modules • 26 Lessons • 11.2 Hours',
        instructor: {
            name: 'Prof. Clementine Cogwheel',
            title: 'Chief Absurdity Architect',
            avatar: 'images/arrow_hat.jpg'
        },
        description: 'From ultrasonic fake insect resonance to optical camouflage for invisible chameleons, master physical prototyping, spring-loaded surprises, and foolproof comedic timing.',
        isLocked: true,
        curriculum: [
            {
                module: 'Module 1: Spring-Loaded Trajectory & Ballistics',
                lessons: [
                    { title: '1.1 Compressed Air Springs in Confetti Cannons', duration: '20m', code: 'TrajectoryVector.ComputeVelocity()' },
                    { title: '1.2 Tension Wire Release Latches & Escapements', duration: '30m', code: 'LatchRelease.Trigger()' },
                    { title: '1.3 Decibel Measurement & Hearing Safety Standards', duration: '15m', code: 'AcousticThreshold.Validate()' }
                ]
            },
            {
                module: 'Module 2: Ultrasonic Acoustics & Audio Camouflage',
                lessons: [
                    { title: '2.1 The 15kHz Chirper: Psychoacoustic Localization', duration: '28m', code: 'ChirpFrequency.Modulate()' },
                    { title: '2.2 Battery Optimization for Long-Term Desk Deployment', duration: '40m', code: 'PowerManager.SleepCycles()' },
                    { title: '2.3 Building the Chirp Daemon with C# BackgroundService', duration: '35m', code: 'IHostedService.ExecuteAsync()' }
                ]
            },
            {
                module: 'Module 3: Safety Standards & Human Factors in Novelties',
                lessons: [
                    { title: '3.1 The Golden Rule of Novelties: Laughs Over Spills', duration: '25m', code: 'PrankEthics.EvaluateBoundary()' },
                    { title: '3.2 ISO-9001 Compliance for Rubber Reptiles', duration: '30m', code: 'QualityInspector.CheckCompliance()' },
                    { title: '3.3 Capstone Project: Automated Cubicle Confetti Sentry', duration: '55m', code: 'ConfettiSentry.EngageTarget()' }
                ]
            }
        ]
    },
    {
        id: 'course-103',
        title: 'Enterprise Gag Architecture: C# Magic, MVC 5 & Ninject DI',
        category: 'C# & Gag Architecture',
        level: 'Advanced Master Class',
        rating: 5.0,
        reviews: 310,
        price: 199.00,
        originalPrice: 279.00,
        image: 'images/course_architecture.jpg',
        duration: '5 Modules • 20 Lessons • 9.0 Hours',
        instructor: {
            name: 'Zach Heindel',
            title: 'Lead Full-Stack .NET Systems Illusionist',
            avatar: 'favicon.png'
        },
        description: 'Deconstruct the full-stack architecture behind Mischief & Magic Co. Deep-dive into Ninject IoC binding, custom ModelBinders, EF6 code-first repository patterns, BLOB image streaming, and decoupling domain logic from UI sessions.',
        isLocked: true,
        curriculum: [
            {
                module: 'Module 1: Decoupling Domain Entities from Session State',
                lessons: [
                    { title: '1.1 CartModelBinder: Custom Model Binding Without Session Bloat', duration: '35m', code: 'ModelBinders.Binders.Add(typeof(Cart), new CartModelBinder())' },
                    { title: '1.2 Pure Domain Testing: Asserting Cart Calculations in Isolation', duration: '40m', code: 'Assert.AreEqual(expectedTotal, cart.ComputeTotalValue())' },
                    { title: '1.3 Value Objects vs Entity Identity in Novelty Carts', duration: '30m', code: 'CartLine.CreateOrUpdate(product, quantity)' }
                ]
            },
            {
                module: 'Module 2: IoC Containers & Entity Framework 6 Code-First',
                lessons: [
                    { title: '2.1 Ninject Dependency Resolver & Kernel Binding Scopes', duration: '45m', code: 'kernel.Bind<IProductRepository>().To<EFProductRepository>()' },
                    { title: '2.2 Mocking IProductRepository with Moq for Instant Unit Tests', duration: '35m', code: 'mock.Setup(m => m.Products).Returns(fakeProducts)' },
                    { title: '2.3 Database Initializers & Seeding Bizarre Product Catalogs', duration: '30m', code: 'Database.SetInitializer(new DatabaseInitializer())' }
                ]
            },
            {
                module: 'Module 3: Custom Razor HTML Helpers & Enterprise Administration',
                lessons: [
                    { title: '3.1 Building @Html.PageLinks() Fluent Extension Methods', duration: '30m', code: 'public static MvcHtmlString PageLinks(this HtmlHelper html, PagingInfo info, Func<int, string> pageUrl)' },
                    { title: '3.2 CRUD Administration with BLOB Byte[] Image Streaming', duration: '40m', code: 'File(product.ImageData, product.ImageMimeType)' },
                    { title: '3.3 Production Hardening, AntiForgeryTokens & Model Validation', duration: '50m', code: '[ValidateAntiForgeryToken] public ActionResult Edit(Product p)' }
                ]
            }
        ]
    }
];

window.renderCourses = function (filterCategory) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    const category = filterCategory || window.activeCourseCategory || 'all';
    const filtered = category === 'all'
        ? window.COURSES
        : window.COURSES.filter(c => c.category === category);

    // Update active filter button styles
    document.querySelectorAll('.course-cat-btn').forEach(btn => {
        const btnText = btn.innerText.trim();
        const isMatch = (category === 'all' && btnText.includes('All')) ||
            (category === 'Absurd Physics' && btnText.includes('Physics')) ||
            (category === 'Novelty Engineering' && btnText.includes('Engineering')) ||
            (category === 'C# & Gag Architecture' && btnText.includes('C#'));
        if (isMatch) {
            btn.className = 'course-cat-btn px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition-all bg-[#F59E0B] text-white shadow-xs text-[11px] sm:text-xs cursor-pointer';
        } else {
            btn.className = 'course-cat-btn px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition-all bg-canvas-surface hover:bg-canvas-border text-earth-800 border border-canvas-border text-[11px] sm:text-xs cursor-pointer';
        }
    });

    grid.innerHTML = filtered.map(course => {
        const totalLessons = course.curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
        return `
                <div class="course-card bg-white border border-canvas-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    id="card-${course.id}"
                    data-blueprint-file="WackyStore.Domain/Entities/Course.cs"
                    data-blueprint-role="WackyDash Course Card Component"
                    data-blueprint-layer="Domain / Entity &amp; WebUI LMS"
                    data-blueprint-dom="Composite course card with lock authorization gates, instructor metadata, and expandable syllabus."
                    data-blueprint-desc="LMS aggregate root maintaining course identity, pricing, prerequisite modules, and student enrollment claims."
                    data-blueprint-code="public class Course { public int Id { get; set; } public string Title { get; set; } public bool IsLocked { get; set; } }">

                    <!-- Course Cover Image & Floating Badges -->
                    <div class="relative h-48 sm:h-52 w-full overflow-hidden bg-earth-950">
                        <img src="${course.image}" alt="${course.title}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        <div class="absolute inset-0 bg-gradient-to-t from-earth-950/80 via-earth-950/20 to-transparent"></div>
                        
                        <!-- Category Badge Top-Left -->
                        <span class="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#FFFBEB]/95 text-[#92400E] border border-[#FDE68A] font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs shadow-xs"
                            data-blueprint-file="WackyStore.Domain/Entities/CourseCategory.cs"
                            data-blueprint-role="Curriculum Taxonomy Badge"
                            data-blueprint-layer="Domain / Taxonomy"
                            data-blueprint-dom="Pill badge displaying mapped course track."
                            data-blueprint-desc="Categorical taxonomy classification used for route indexing and student prerequisites."
                            data-blueprint-code="public virtual CourseCategory Category { get; set; }">
                            ${course.category}
                        </span>

                        <!-- Lock Status Badge Top-Right -->
                        <div class="absolute top-3 right-3">
                            ${course.isLocked ? `
                                <span class="px-2.5 py-1 rounded-full bg-amber-400 text-earth-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5"
                                     data-blueprint-file="WackyStore.Infrastructure/Security/CourseAuthorizationFilter.cs"
                                    data-blueprint-role="Authorization Gate Indicator"
                                    data-blueprint-layer="Infrastructure / Security"
                                    data-blueprint-dom="Warning badge indicating course access is locked to purchase."
                                    data-blueprint-desc="Evaluates ClaimsPrincipal to verify whether current identity possesses active CourseAccess claim for this course ID."
                                    data-blueprint-code="if (!user.HasCourseClaim(courseId)) return RedirectToAction(&quot;Locked&quot;);">
                                    <i class="fa-solid fa-lock text-[#92400E]"></i>
                                    <span>Locked Course</span>
                                </span>
                            ` : `
                                <span class="px-2.5 py-1 rounded-full bg-teal-400 text-earth-950 font-mono text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5">
                                    <i class="fa-solid fa-circle-check text-teal-950"></i>
                                    <span>Unlocked &bull; Enrolled</span>
                                </span>
                            `}
                        </div>

                        <!-- Course Level Bottom-Left -->
                        <div class="absolute bottom-3 left-3 text-white text-[11px] font-mono flex items-center gap-1.5">
                            <i class="fa-solid fa-signal text-amber-300"></i>
                            <span>${course.level}</span>
                        </div>
                    </div>

                    <!-- Course Body -->
                    <div class="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div class="space-y-3">
                            <h3 class="font-heading font-black text-lg sm:text-xl text-earth-950 hover:text-[#D97706] transition-colors leading-snug cursor-pointer"
                                onclick="window.toggleCourseSyllabus('${course.id}')"
                                data-blueprint-file="WackyStore.Domain/Entities/Course.cs"
                                data-blueprint-role="Course Title &amp; Entity Identity"
                                data-blueprint-layer="Domain / Entity"
                                data-blueprint-dom="H3 header bound to Model.Title."
                                data-blueprint-desc="Primary descriptor and slug route parameter for course syllabus queries."
                                data-blueprint-code="public string Title { get; set; }">
                                ${course.title}
                            </h3>

                            <!-- Instructor Info -->
                            <div class="flex items-center gap-3 py-1">
                                <img src="${course.instructor.avatar}" alt="${course.instructor.name}" class="h-9 w-9 rounded-full object-cover border border-canvas-border" />
                                <div class="text-xs min-w-0">
                                    <div class="font-bold text-earth-900 truncate">${course.instructor.name}</div>
                                    <div class="text-[11px] text-gray-500 truncate">${course.instructor.title}</div>
                                </div>
                            </div>

                            <p class="text-xs text-gray-600 leading-relaxed">
                                ${course.description}
                            </p>

                            <!-- Course Duration / Lessons Strip -->
                            <div class="flex items-center justify-between text-[11.5px] text-gray-500 font-mono py-2 border-y border-canvas-border">
                                <span class="flex items-center gap-1">
                                    <i class="fa-regular fa-clock text-[#F59E0B]"></i>
                                    <span>${course.duration}</span>
                                </span>
                                <span class="flex items-center gap-1 text-amber-500 font-bold">
                                    <i class="fa-solid fa-star"></i>
                                    <span>${course.rating} (${course.reviews})</span>
                                </span>
                            </div>

                            <!-- WackyDash Progress Bar -->
                            <div class="space-y-1.5 pt-1"
                                data-blueprint-file="WackyStore.WebUI/Views/Course/_WackyDashProgress.cshtml"
                                data-blueprint-role="WackyDash Progress Indicator"
                                data-blueprint-layer="WebUI / LMS Partial"
                                data-blueprint-dom="Progress meter displaying completion percentage and enrollment lock state."
                                data-blueprint-desc="Queries StudentCourseProgress table to calculate completed lesson modules vs total required credits."
                                data-blueprint-code="public decimal CalculateProgress(int studentId, int courseId)">
                                <div class="flex items-center justify-between text-[11px] font-mono font-bold">
                                    <span class="${course.isLocked ? 'text-amber-700' : 'text-teal-700'} flex items-center gap-1">
                                        <i class="fa-solid ${course.isLocked ? 'fa-lock' : 'fa-unlock'}"></i>
                                        <span>${course.isLocked ? '0% Complete (Enrollment Required)' : '100% Unlocked (Access Granted)'}</span>
                                    </span>
                                    <span class="text-gray-400 text-[10px]">WackyDash V2.4</span>
                                </div>
                                <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                    <div class="${course.isLocked ? 'bg-amber-400 w-0' : 'bg-teal-500 w-full'} h-full transition-all duration-500"></div>
                                </div>
                            </div>

                            <!-- Expandable WackyDash Syllabus Accordion -->
                            <div class="pt-2">
                                <button onclick="window.toggleCourseSyllabus('${course.id}')"
                                    data-blueprint-file="WackyStore.WebUI/Views/Course/_SyllabusAccordion.cshtml"
                                    data-blueprint-role="Curriculum Accordion Toggle"
                                    data-blueprint-layer="WebUI / View Component"
                                    data-blueprint-dom="Accordion toggle exposing module tree, lesson durations, and code references."
                                    data-blueprint-desc="Renders hierarchical course tree composed of Modules and child Lesson entities."
                                    data-blueprint-code="@Html.Partial(&quot;_SyllabusAccordion&quot;, Model.Curriculum)"
                                    class="w-full py-2 px-3 rounded-xl bg-canvas-surface hover:bg-canvas-border text-earth-800 text-xs font-bold flex items-center justify-between transition-colors border border-canvas-border cursor-pointer">
                                    <span class="flex items-center gap-1.5">
                                        <i class="fa-solid fa-list-check text-[#F59E0B]"></i>
                                        <span>Curriculum Breakdown (${course.curriculum.length} Modules &bull; ${totalLessons} Lessons)</span>
                                    </span>
                                    <i id="chevron-${course.id}" class="fa-solid fa-chevron-down text-gray-400 text-xs transition-transform"></i>
                                </button>

                                <div id="syllabus-${course.id}" class="hidden mt-2.5 space-y-2 text-xs border border-canvas-border p-3 rounded-xl bg-canvas-base max-h-64 overflow-y-auto">
                                    ${course.curriculum.map((mod, modIdx) => `
                                        <div class="space-y-1.5 pb-2 ${modIdx > 0 ? 'border-t border-canvas-border pt-2' : ''}">
                                            <!-- Clickable Module Header with Video Demo Trigger -->
                                            <div class="font-bold text-earth-950 flex items-center justify-between text-[11.5px] p-1.5 rounded-lg hover:bg-amber-100/70 transition-all cursor-pointer group/mod border border-transparent hover:border-amber-300/60"
                                                onclick="window.openVideoDemoModal('${course.id}', '${course.title.replace(/'/g, "\\'")}', '${mod.module.replace(/'/g, "\\'")}', '${mod.lessons[0] ? mod.lessons[0].title.replace(/'/g, "\\'") : mod.module.replace(/'/g, "\\'")}', '${mod.lessons[0] ? mod.lessons[0].duration : "20m"}', '${mod.lessons[0] ? mod.lessons[0].code.replace(/'/g, "\\'") : ""}', '${course.instructor ? course.instructor.name.replace(/'/g, "\\'") : "Dr. Barnaby Fizzle"}')"
                                                title="Click to preview video demo for this module">
                                                <span class="flex items-center gap-1.5 truncate">
                                                    <span class="h-4.5 w-4.5 rounded-full bg-amber-100 text-[#D97706] flex items-center justify-center text-[9px] group-hover/mod:scale-110 transition-transform shrink-0">
                                                        <i class="fa-solid fa-play"></i>
                                                    </span>
                                                    <span class="group-hover/mod:text-[#D97706] transition-colors truncate">${mod.module}</span>
                                                </span>
                                                <span class="text-[10px] text-gray-500 font-mono flex items-center gap-1 shrink-0 ml-1">
                                                    <span class="text-[#D97706] font-bold text-[9px] uppercase tracking-wide opacity-0 group-hover/mod:opacity-100 transition-opacity">Watch Demo</span>
                                                    <span>&bull; ${mod.lessons.length} lessons</span>
                                                </span>
                                            </div>

                                            <!-- Clickable Individual Lesson Rows -->
                                            <div class="space-y-1 pl-1">
                                                ${mod.lessons.map(lesson => `
                                                    <div class="flex items-center justify-between text-[11px] text-gray-600 hover:text-earth-900 py-1 px-1.5 rounded-md hover:bg-amber-50/80 transition-all cursor-pointer group/lesson border border-transparent hover:border-amber-200"
                                                        onclick="window.openVideoDemoModal('${course.id}', '${course.title.replace(/'/g, "\\'")}', '${mod.module.replace(/'/g, "\\'")}', '${lesson.title.replace(/'/g, "\\'")}', '${lesson.duration}', '${lesson.code.replace(/'/g, "\\'")}', '${course.instructor ? course.instructor.name.replace(/'/g, "\\'") : "Dr. Barnaby Fizzle"}')"
                                                        data-blueprint-file="WackyStore.Domain/Entities/Lesson.cs"
                                                        data-blueprint-role="Course Lesson Entity &amp; Video Claims"
                                                        data-blueprint-layer="Domain / Entities"
                                                        data-blueprint-dom="List item representing video lesson module. Clickable to open WackyDash video demo pop-up."
                                                        data-blueprint-desc="Opens interactive video lecture demo for this curriculum unit."
                                                        data-blueprint-code="${lesson.code}"
                                                        title="Click to preview video demo of ${lesson.title}">
                                                        <span class="flex items-center gap-1.5 truncate">
                                                            <i class="fa-solid fa-circle-play text-[#F59E0B] text-[11px] group-hover/lesson:scale-125 transition-transform shrink-0"></i>
                                                            <span class="truncate group-hover/lesson:text-[#D97706] transition-colors font-medium">${lesson.title}</span>
                                                        </span>
                                                        <span class="flex items-center gap-2 shrink-0 ml-2">
                                                            <span class="text-[9.5px] px-1.5 py-0.5 rounded bg-amber-100/70 text-[#92400E] font-mono font-bold opacity-0 group-hover/lesson:opacity-100 transition-opacity">Watch Demo</span>
                                                            <span class="font-mono text-[10px] text-gray-400">${lesson.duration}</span>
                                                        </span>
                                                    </div>
                                                `).join('')}
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Card Action / Pricing Footer -->
                        <div class="pt-4 border-t border-canvas-border flex items-center justify-between gap-3 mt-4">
                            <div>
                                <div class="text-[10.5px] text-gray-400 font-medium">Curriculum Price:</div>
                                <div class="flex items-baseline gap-1.5">
                                    <span class="text-xl sm:text-2xl font-black font-heading text-earth-950">${course.price.toFixed(2)}</span>
                                    <span class="text-xs text-gray-400 line-through">${course.originalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            ${course.isLocked ? `
                                <button onclick="window.openCourseModal('${course.id}')"
                                    data-blueprint-file="WackyStore.WebUI/Controllers/CourseController.cs"
                                    data-blueprint-role="Course Purchase &amp; Enrollment Gate"
                                    data-blueprint-layer="WebUI / Action Method"
                                    data-blueprint-dom="Warm yellow/orange CTA button opening enrollment transaction modal."
                                    data-blueprint-desc="Gated action redirecting unauthorized students to purchase flow before granting curriculum access."
                                    data-blueprint-code="[Authorize(Roles = &quot;Enrolled&quot;)] public ActionResult ViewLessons(int id)"
                                    class="px-5 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                                    <i class="fa-solid fa-lock text-amber-100"></i>
                                    <span>Unlock Course</span>
                                </button>
                            ` : `
                                <button onclick="alert('Access Granted! Welcome to ${course.title}. All lessons are unlocked for your student account.');"
                                    class="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer">
                                    <i class="fa-solid fa-circle-play text-white"></i>
                                    <span>Resume Course</span>
                                </button>
                            `}
                        </div>

                    </div>
                </div>
                `;
    }).join('');
};

window.filterCourseCategory = function (category) {
    window.activeCourseCategory = category;
    window.renderCourses(category);
};

window.toggleCourseSyllabus = function (courseId) {
    const syllabus = document.getElementById(`syllabus-${courseId}`);
    const chevron = document.getElementById(`chevron-${courseId}`);
    if (!syllabus) return;

    const isHidden = syllabus.classList.contains('hidden');
    if (isHidden) {
        syllabus.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
    } else {
        syllabus.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
    }
};

window.openCourseModal = function (courseId) {
    const course = window.COURSES.find(c => c.id === courseId);
    if (!course) return;

    window.selectedCourseForModal = course;
    const modalTitle = document.getElementById('enroll-modal-title');
    const modalCat = document.getElementById('enroll-modal-category');
    const modalPrice = document.getElementById('enroll-modal-price');
    const modalOrigPrice = document.getElementById('enroll-modal-original-price');
    const modalDuration = document.getElementById('enroll-modal-duration');

    if (modalTitle) modalTitle.innerText = course.title;
    if (modalCat) modalCat.innerText = course.category;
    if (modalPrice) modalPrice.innerText = `${course.price.toFixed(2)}`;
    if (modalOrigPrice) modalOrigPrice.innerText = `${course.originalPrice.toFixed(2)}`;
    if (modalDuration) modalDuration.innerText = course.duration;

    const modal = document.getElementById('course-enrollment-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeCourseModal = function () {
    const modal = document.getElementById('course-enrollment-modal');
    if (modal) modal.classList.add('hidden');
    window.selectedCourseForModal = null;
};

window.confirmCoursePurchase = function () {
    if (!window.selectedCourseForModal) return;
    const course = window.selectedCourseForModal;
    course.isLocked = false;

    window.closeCourseModal();
    window.renderCourses(window.activeCourseCategory);

    alert(`🎉 Success! You have enrolled in "${course.title}". All video lessons and lab blueprints are now UNLOCKED!`);

    const card = document.getElementById(`card-${course.id}`);
    if (card) {
        card.classList.add('ring-4', 'ring-[#F59E0B]', 'animate-pulse');
        setTimeout(() => card.classList.remove('ring-4', 'ring-[#F59E0B]', 'animate-pulse'), 2500);
    }
};

/**
 * ==============================================================================
 * WACKYDASH VIDEO DEMO POP-UP CONTROLLER
 * ==============================================================================
 */
window.activeVideoDemoCourseId = null;
window.isVideoDemoPlaying = false;
window.videoDemoInterval = null;
window.videoDemoCurrentSec = 255;
window.videoDemoTotalSec = 1122;

function formatSecToMMSS(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

window.openVideoDemoModal = function (courseId, courseTitle, moduleTitle, lessonTitle, durationStr, codeSnippet, instructorName) {
    window.activeVideoDemoCourseId = courseId;

    // Stop any ongoing playback
    if (window.videoDemoInterval) {
        clearInterval(window.videoDemoInterval);
        window.videoDemoInterval = null;
    }
    window.isVideoDemoPlaying = false;

    // Parse duration or fallback
    let durationSeconds = 1122;
    if (durationStr && durationStr.includes('m')) {
        const mins = parseInt(durationStr.replace('m', '').trim(), 10);
        if (!isNaN(mins) && mins > 0) {
            durationSeconds = mins * 60;
        }
    }
    window.videoDemoTotalSec = durationSeconds;
    window.videoDemoCurrentSec = Math.min(75, Math.floor(durationSeconds * 0.12));

    // Populate DOM elements
    const courseNameEl = document.getElementById('video-demo-course-name');
    const modTitleEl = document.getElementById('video-demo-module-title');
    const lessonCodeEl = document.getElementById('video-demo-lesson-code');
    const instructorEl = document.getElementById('video-instructor-name');
    const totalDurEl = document.getElementById('video-total-duration');
    const currentDurEl = document.getElementById('video-current-time');
    const scrubberEl = document.getElementById('video-scrubber-progress');
    const statusEl = document.getElementById('video-stream-status');
    const dotEl = document.getElementById('video-stream-dot');
    const bigPlayIcon = document.getElementById('video-big-play-icon');
    const ctrlPlayIcon = document.getElementById('video-ctrl-play-icon');

    if (courseNameEl) courseNameEl.innerText = courseTitle || 'WackyDash Academy';
    if (modTitleEl) modTitleEl.innerText = lessonTitle ? `${moduleTitle} • ${lessonTitle}` : moduleTitle;
    if (lessonCodeEl) lessonCodeEl.innerText = codeSnippet || 'WackyLecture.StreamVideoChunk()';
    if (instructorEl) instructorEl.innerText = instructorName || 'Dr. Barnaby Fizzle';
    if (totalDurEl) totalDurEl.innerText = formatSecToMMSS(window.videoDemoTotalSec);
    if (currentDurEl) currentDurEl.innerText = formatSecToMMSS(window.videoDemoCurrentSec);

    if (scrubberEl) {
        const pct = (window.videoDemoCurrentSec / window.videoDemoTotalSec) * 100;
        scrubberEl.style.width = `${pct}%`;
    }

    if (statusEl) statusEl.innerText = 'WackyDash HLS Stream • 1080p 60fps';
    if (dotEl) dotEl.className = 'h-2 w-2 rounded-full bg-emerald-400 animate-pulse';
    if (bigPlayIcon) bigPlayIcon.className = 'fa-solid fa-play ml-1';
    if (ctrlPlayIcon) ctrlPlayIcon.className = 'fa-solid fa-play';

    const modal = document.getElementById('module-video-demo-modal');
    if (modal) modal.classList.remove('hidden');
};

window.closeVideoDemoModal = function () {
    if (window.videoDemoInterval) {
        clearInterval(window.videoDemoInterval);
        window.videoDemoInterval = null;
    }
    window.isVideoDemoPlaying = false;
    const modal = document.getElementById('module-video-demo-modal');
    if (modal) modal.classList.add('hidden');
};

window.toggleVideoDemoPlayback = function () {
    const bigPlayIcon = document.getElementById('video-big-play-icon');
    const ctrlPlayIcon = document.getElementById('video-ctrl-play-icon');
    const statusEl = document.getElementById('video-stream-status');
    const dotEl = document.getElementById('video-stream-dot');
    const currentDurEl = document.getElementById('video-current-time');
    const scrubberEl = document.getElementById('video-scrubber-progress');

    if (window.isVideoDemoPlaying) {
        // Pause
        window.isVideoDemoPlaying = false;
        if (window.videoDemoInterval) {
            clearInterval(window.videoDemoInterval);
            window.videoDemoInterval = null;
        }
        if (bigPlayIcon) bigPlayIcon.className = 'fa-solid fa-play ml-1';
        if (ctrlPlayIcon) ctrlPlayIcon.className = 'fa-solid fa-play';
        if (statusEl) statusEl.innerText = 'Demo Paused • Click to Resume';
        if (dotEl) dotEl.className = 'h-2 w-2 rounded-full bg-amber-400';
    } else {
        // Play
        window.isVideoDemoPlaying = true;
        if (bigPlayIcon) bigPlayIcon.className = 'fa-solid fa-pause';
        if (ctrlPlayIcon) ctrlPlayIcon.className = 'fa-solid fa-pause';
        if (statusEl) statusEl.innerText = '● STREAMING (WackyDash HLS CDN)';
        if (dotEl) dotEl.className = 'h-2 w-2 rounded-full bg-emerald-400 animate-ping';

        window.videoDemoInterval = setInterval(() => {
            window.videoDemoCurrentSec += 1;
            if (window.videoDemoCurrentSec >= window.videoDemoTotalSec) {
                window.videoDemoCurrentSec = 0;
            }
            if (currentDurEl) currentDurEl.innerText = formatSecToMMSS(window.videoDemoCurrentSec);
            if (scrubberEl) {
                const pct = (window.videoDemoCurrentSec / window.videoDemoTotalSec) * 100;
                scrubberEl.style.width = `${pct}%`;
            }
        }, 1000);
    }
};

window.restartVideoDemo = function () {
    window.videoDemoCurrentSec = 0;
    const currentDurEl = document.getElementById('video-current-time');
    const scrubberEl = document.getElementById('video-scrubber-progress');
    if (currentDurEl) currentDurEl.innerText = formatSecToMMSS(0);
    if (scrubberEl) scrubberEl.style.width = '0%';
    if (!window.isVideoDemoPlaying) {
        window.toggleVideoDemoPlayback();
    }
};

window.scrubVideoDemo = function (e) {
    const scrubberContainer = e.currentTarget;
    const rect = scrubberContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const pct = Math.max(0, Math.min(1, clickX / width));
    window.videoDemoCurrentSec = Math.floor(pct * window.videoDemoTotalSec);
    const currentDurEl = document.getElementById('video-current-time');
    const scrubberEl = document.getElementById('video-scrubber-progress');
    if (currentDurEl) currentDurEl.innerText = formatSecToMMSS(window.videoDemoCurrentSec);
    if (scrubberEl) scrubberEl.style.width = `${pct * 100}%`;
};

window.toggleVideoDemoFullscreen = function () {
    const modalBox = document.querySelector('#module-video-demo-modal > div');
    if (!modalBox) return;
    if (!document.fullscreenElement) {
        if (modalBox.requestFullscreen) {
            modalBox.requestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};

window.enrollFromVideoDemo = function () {
    const courseId = window.activeVideoDemoCourseId;
    window.closeVideoDemoModal();
    if (courseId) {
        window.openCourseModal(courseId);
    }
};

/**
 * ==============================================================================
 * ZOOM WEBINAR REGISTRATION ENGINE
 * ==============================================================================
 */
window.handleWebinarSubmit = function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('webinar-name');
    const emailInput = document.getElementById('webinar-email');
    const form = document.getElementById('zoom-webinar-form');
    const confirmation = document.getElementById('webinar-confirmation');
    const confirmedName = document.getElementById('confirmed-attendee-name');
    const confirmedEmail = document.getElementById('confirmed-attendee-email');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!name || !email) return alert('Please enter your name and email address.');

    if (confirmedName) confirmedName.innerText = name;
    if (confirmedEmail) confirmedEmail.innerText = email;

    if (form) form.classList.add('hidden');
    if (confirmation) confirmation.classList.remove('hidden');
};

window.resetWebinarForm = function () {
    const form = document.getElementById('zoom-webinar-form');
    const confirmation = document.getElementById('webinar-confirmation');
    if (form) {
        form.reset();
        form.classList.remove('hidden');
    }
    if (confirmation) confirmation.classList.add('hidden');
};

window.scrollToZoomWebinar = function () {
    const section = document.getElementById('zoom-webinar-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

window.downloadWebinarCalendarInvite = function () {
    const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Mischief & Magic Co.//Wacky Funny Academy//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'SUMMARY:Live Zoom Masterclass: Architecting Absurdity & .NET EF6',
        'DESCRIPTION:Live masterclass with Zach Heindel & Dr. Barnaby Fizzle. Zoom Meeting ID: 984 2490 8812 Passcode: MISCHIEF2026',
        'LOCATION:https://zoom.us/j/98424908812?pwd=MISCHIEF2026',
        'DTSTART:20261015T220000Z',
        'DTEND:20261015T233000Z',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'WackyStore-Zoom-Webinar.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

window.playPressYourLuckGame = function () {
    const btn = document.getElementById('spin-wheel-btn');
    const resultBox = document.getElementById('prize-result-box');
    const resultTitle = document.getElementById('prize-result-title');
    const couponContainer = document.getElementById('prize-coupon-code-container');
    const couponBadge = document.getElementById('prize-coupon-badge');
    const squares = Array.from(document.querySelectorAll('.luck-sq')).sort((a, b) => parseInt(a.dataset.prizeIdx) - parseInt(b.dataset.prizeIdx));

    if (btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-white text-5xl sm:text-6xl"></i>';
    resultBox.classList.add('hidden');

    let currentIdx = 0;
    let speed = 20;
    let jumps = 0;
    const minJumps = 20;
    const maxJumps = 30 + Math.floor(Math.random() * 10);

    const r = Math.random();
    let targetPrize;
    if (r < 0.20) targetPrize = "TRY AGAIN TOMORROW";
    else if (r < 0.70) targetPrize = "10% OFF";
    else if (r < 0.85) targetPrize = "15% OFF";
    else if (r < 0.95) targetPrize = "20% OFF";
    else targetPrize = "50% OFF!";

    const targetSquares = squares.filter(s => s.dataset.prize === targetPrize);
    const finalSquare = targetSquares[Math.floor(Math.random() * targetSquares.length)];
    const finalTargetIdx = parseInt(finalSquare.dataset.prizeIdx);

    const highlightSquare = (idx) => {
        squares.forEach(s => {
            s.classList.remove('bg-purple-500', 'border-purple-300', 'scale-105', 'z-10', 'active-sq');
            s.classList.add('bg-earth-800', 'border-earth-700', 'shadow-[0_0_15px_rgba(88,28,135,0.3)]');
        });
        const sq = squares[idx];
        sq.classList.remove('bg-earth-800', 'border-earth-700', 'shadow-[0_0_15px_rgba(88,28,135,0.3)]');
        sq.classList.add('bg-purple-500', 'border-purple-300', 'scale-105', 'z-10', 'shadow-[0_0_25px_rgba(168,85,247,0.8)]', 'active-sq');
    };

    const jump = () => {
        highlightSquare(currentIdx);
        jumps++;

        if (jumps > minJumps) {
            speed += 15;
        }

        if (jumps >= maxJumps && currentIdx === finalTargetIdx) {
            setTimeout(() => {
                squares[currentIdx].classList.remove('bg-purple-500', 'shadow-[0_0_25px_rgba(168,85,247,0.8)]');
                squares[currentIdx].classList.add('bg-purple-500', 'border-purple-300', 'animate-pulse', 'shadow-[0_0_30px_rgba(168,85,247,0.8)]');

                btn.innerHTML = '<i class="fa-solid fa-check text-white text-5xl sm:text-7xl"></i>';
                resultTitle.innerText = targetPrize === 'TRY AGAIN TOMORROW' ? 'Better luck tomorrow!' : 'You Won ' + targetPrize;

                if (targetPrize !== 'TRY AGAIN TOMORROW') {
                    couponContainer.classList.remove('hidden');
                    const val = targetPrize.replace('% OFF', '').replace('!', '');
                    const code = 'WACKY' + val;
                    couponBadge.innerText = code;

                    window.currentWonCoupon = code;
                    window.minigamePlayed = true;
                    window.activeDiscount = parseInt(val) / 100;
                    if (window.updateCartUI) window.updateCartUI();
                    if (window.showToast) window.showToast(`🎉 Coupon ${code} auto-applied!`);

                    // Auto close after 6 seconds for winners
                    setTimeout(() => {
                        window.closeMinigameModal();
                    }, 6000);
                } else {
                    couponContainer.classList.add('hidden');

                    // Auto close after 3 seconds for try again
                    setTimeout(() => {
                        window.closeMinigameModal();
                    }, 3000);
                }

                resultBox.classList.remove('hidden');
            }, 500);
            return;
        }

        currentIdx = (currentIdx + 1) % 8;
        setTimeout(jump, speed);
    };

    jump();
};

window.copyCouponCode = function () {
    if (window.currentWonCoupon) {
        navigator.clipboard.writeText(window.currentWonCoupon);
        if (window.showToast) window.showToast(`Copied ${window.currentWonCoupon} to clipboard!`);
    }
};

window.renderBlogPosts = function (categoryFilter = 'all') {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    const filtered = categoryFilter === 'all'
        ? window.BLOG_POSTS
        : window.BLOG_POSTS.filter(p => p.category === categoryFilter);

    grid.innerHTML = filtered.map(post => `
                <article onclick="window.openBlogReaderModal('${post.id}')"
                         data-blueprint-file="WackyStore.WebUI/Views/Blog/_ArticleSummary.cshtml"
                         data-blueprint-role="BlogPost Summary Partial Model"
                         data-blueprint-layer="WebUI / Partial View"
                         data-blueprint-dom="Clickable article card opening full blog reader modal."
                         data-blueprint-desc="Maps Domain.Entities.BlogPost entity properties (Title, Author, Excerpt, Content) to HTML preview markup."
                         data-blueprint-code="@model WackyStore.Domain.Entities.BlogPost"
                         class="blog-article-card bg-white border border-canvas-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 cursor-pointer">
                    <div class="relative h-44 sm:h-48 w-full overflow-hidden bg-earth-900 shrink-0">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                        <div class="absolute top-3 left-3">
                            <span class="px-3 py-1 rounded-full bg-teal-400 text-earth-950 font-mono font-black text-[10px] uppercase tracking-wider shadow-sm">
                                ${post.category}
                            </span>
                        </div>
                    </div>

                    <div class="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between gap-3 sm:gap-4">
                        <div class="space-y-2">
                            <div class="flex items-center justify-between text-xs text-earth-500 font-medium">
                                <span>${post.date}</span>
                                <span class="font-mono text-purple-700 font-bold">${post.readTime}</span>
                            </div>
                            <h3 class="font-heading font-black text-base sm:text-lg md:text-xl text-earth-950 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                                ${post.title}
                            </h3>
                            <p class="text-xs sm:text-sm text-earth-600 line-clamp-3 leading-relaxed">
                                ${post.excerpt}
                            </p>
                        </div>

                        <div class="pt-3 sm:pt-4 border-t border-canvas-border flex items-center justify-between gap-2 flex-wrap">
                            <div class="flex items-center gap-1.5 text-xs font-bold text-earth-900 min-w-0 truncate">
                                <i class="fa-solid fa-user-astronaut text-appetite-700"></i>
                                <span class="truncate">${post.author}</span>
                            </div>
                            <span class="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-[11px] sm:text-xs transition-all flex items-center gap-1.5 shrink-0 group-hover:scale-105">
                                <span>Read Story</span>
                                <i class="fa-solid fa-arrow-right text-[10px]"></i>
                            </span>
                        </div>
                    </div>
                </article>
            `).join('');
};

window.filterBlogCategory = function (cat) {
    window.activeBlogCategory = cat;
    window.renderBlogPosts(cat);

    document.querySelectorAll('.blog-cat-btn').forEach(btn => {
        if (btn.innerText.toLowerCase().includes(cat.toLowerCase()) || (cat === 'all' && btn.innerText.includes('All'))) {
            btn.className = 'blog-cat-btn px-4 py-2 rounded-xl font-bold text-xs transition-all bg-[#F59E0B] text-white scale-105 cursor-pointer shadow-md shadow-amber-500/20';
        } else {
            btn.className = 'blog-cat-btn px-4 py-2 rounded-xl font-bold text-xs transition-all bg-white text-earth-800 border border-black/5 hover:border-amber-300 cursor-pointer';
        }
    });
};

window.openBlogReaderModal = function (postId) {
    const post = window.BLOG_POSTS.find(p => p.id === postId);
    if (!post) return;

    document.getElementById('blog-modal-cover').src = post.image;
    document.getElementById('blog-modal-category').innerText = post.category;
    document.getElementById('blog-modal-title').innerText = post.title;
    document.getElementById('blog-modal-author').innerHTML = `<i class="fa-solid fa-user-astronaut text-appetite-700"></i> ${post.author} (${post.authorRole})`;
    document.getElementById('blog-modal-date').innerHTML = `<i class="fa-regular fa-calendar text-teal-800"></i> ${post.date}`;
    document.getElementById('blog-modal-readtime').innerHTML = `<i class="fa-solid fa-clock"></i> ${post.readTime}`;
    document.getElementById('blog-modal-body').innerHTML = post.content;

    document.getElementById('blog-reader-modal').classList.remove('hidden');
};

window.closeBlogReaderModal = function () {
    document.getElementById('blog-reader-modal').classList.add('hidden');
};

// Initialize Theme State on Load
if (localStorage.getItem('wacky_store_theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    const isDark = document.body.classList.contains('dark-mode');
    window.updateThemeUI(isDark);
    renderCategorySidebar();
    renderCatalog();
    updateCartUI();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    const isDark = document.body.classList.contains('dark-mode');
    window.updateThemeUI(isDark);
    renderCategorySidebar();
    renderCatalog();
    updateCartUI();
}



window.toggleAdminPanel = function () {
    const storeMain = document.getElementById('store-main-view');
    const blogMain = document.getElementById('blog-main-view');
    const adminMain = document.getElementById('admin-main-view');

    if (storeMain) {
        storeMain.classList.add('hidden');
        storeMain.classList.remove('flex');
    }
    if (blogMain) {
        blogMain.classList.add('hidden');
        blogMain.classList.remove('flex');
    }
    if (adminMain) {
        adminMain.classList.remove('hidden');
        adminMain.classList.add('flex');
    }

    window.currentView = 'admin';
    renderAdminPosts();
};

const originalToggleStoreBlog = window.toggleViewStoreBlog;
window.toggleViewStoreBlog = function (forceTarget) {
    const adminMain = document.getElementById('admin-main-view');
    if (adminMain) {
        adminMain.classList.add('hidden');
        adminMain.classList.remove('flex');
    }
    if (typeof originalToggleStoreBlog === 'function') {
        originalToggleStoreBlog(forceTarget);
    }
};

window.renderAdminPosts = function () {
    const container = document.getElementById('admin-post-list');
    if (!container) return;
    container.innerHTML = '';
    window.BLOG_POSTS.forEach((post, index) => {
        const el = document.createElement('div');
        el.className = 'p-4 rounded-2xl bg-gradient-to-br from-white via-amber-50/20 to-amber-100/30 dark:from-slate-800 dark:to-slate-900 border border-black/5 dark:border-white/10 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3';
        el.innerHTML = `
                    <div>
                        <h3 class="font-bold text-base sm:text-lg text-earth-950 dark:text-earth-100">${post.title}</h3>
                        <p class="text-xs text-earth-500 font-medium">${post.category}</p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button onclick="window.editPost(${index})" class="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs transition-all active:scale-95 cursor-pointer">Edit</button>
                        <button onclick="window.deletePost(${index})" class="px-3.5 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer">Delete</button>
                    </div>
                `;
        container.appendChild(el);
    });
};

window.deletePost = function (index) {
    window.BLOG_POSTS.splice(index, 1);
    renderAdminPosts();
    if (typeof window.renderBlogPosts === 'function') {
        window.renderBlogPosts('all');
    }
};

window.editPost = function (index) {
    const post = window.BLOG_POSTS[index];
    document.getElementById('admin-title').value = post.title || '';
    document.getElementById('admin-category').value = post.category || '';
    document.getElementById('admin-date').value = post.date || '';
    document.getElementById('admin-author').value = post.author || '';
    document.getElementById('admin-image').value = post.image || '';
    document.getElementById('admin-content').value = post.content || '';

    // Delete old one so user resaves it
    window.deletePost(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.saveNewPost = function () {
    const title = document.getElementById('admin-title').value;
    const category = document.getElementById('admin-category').value;
    const dateStr = document.getElementById('admin-date').value;
    const author = document.getElementById('admin-author').value;
    const image = document.getElementById('admin-image').value;
    const content = document.getElementById('admin-content').value;

    if (!title || !content) return alert('Title and Content required!');

    window.BLOG_POSTS.unshift({
        id: 'post-' + Date.now(),
        title: title,
        date: dateStr,
        category: category,
        author: author,
        image: image,
        content: content
    });

    document.getElementById('admin-title').value = '';
    document.getElementById('admin-category').value = '';
    document.getElementById('admin-date').value = '';
    document.getElementById('admin-author').value = '';
    document.getElementById('admin-image').value = '';
    document.getElementById('admin-content').value = '';

    renderAdminPosts();
    if (typeof window.renderBlogPosts === 'function') {
        window.renderBlogPosts('all');
    }
};

// Initialize Funny Academy & URL Hash Routing
if (typeof window.renderCourses === 'function') {
    window.renderCourses('all');
}
if (window.location.hash === '#learning' || window.location.search.includes('view=learning')) {
    setTimeout(() => {
        if (typeof window.switchView === 'function') {
            window.switchView('learning');
        }
    }, 100);
} else if (window.location.hash === '#blog' || window.location.search.includes('view=blog')) {
    setTimeout(() => {
        if (typeof window.switchView === 'function') {
            window.switchView('blog');
        }
    }, 100);
}

