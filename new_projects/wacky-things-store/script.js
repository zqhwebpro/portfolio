
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
                // Forest Emerald Green
                return 'bg-emerald-100 text-emerald-900 border border-emerald-300/90 shadow-2xs';
            } else if (normalized.includes('skuttlebutt')) {
                // Campfire Amber Gold
                return 'bg-amber-100 text-amber-950 border border-amber-300/90 shadow-2xs';
            } else if (normalized.includes('balderdash')) {
                // Alpine Sky Blue
                return 'bg-sky-100 text-sky-950 border border-sky-300/90 shadow-2xs';
            } else if (normalized.includes('flummery')) {
                // Cedar Terracotta / Orange
                return 'bg-orange-100 text-orange-950 border border-orange-300/90 shadow-2xs';
            } else if (normalized.includes('codswallop')) {
                // Mountain Indigo / Pine Purple
                return 'bg-indigo-100 text-indigo-950 border border-indigo-300/90 shadow-2xs';
            } else {
                // Neutral Earth
                return 'bg-earth-200 text-earth-900 border border-earth-300 shadow-2xs';
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
                            class="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-appetite-700 text-white shadow-sm' : 'bg-transparent text-earth-800 hover:bg-canvas-surface hover:text-earth-950'}">
                        <div class="flex items-center gap-2.5 truncate">
                            <i class="fa-solid ${c.icon} ${isActive ? 'text-teal-300' : 'text-appetite-700'} text-xs"></i>
                            <span class="truncate">${c.name}</span>
                        </div>
                        <span class="px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold ${isActive ? 'bg-appetite-800 text-teal-200' : 'bg-canvas-surface text-earth-600'}">
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
                        <div class="w-full py-2 px-3 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                            <i class="fa-solid fa-check"></i>
                            <span>Added to Cart</span>
                        </div>
                        <div class="flex items-center justify-between bg-canvas-surface border border-canvas-border rounded-xl p-1 text-earth-950">
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, -1)" 
                                    class="h-7 w-7 rounded-lg bg-white border border-canvas-border hover:bg-earth-200 text-earth-900 font-bold text-sm flex items-center justify-center transition-all shadow-xs" 
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
                                    class="h-7 w-7 rounded-lg bg-white border border-canvas-border hover:bg-earth-200 text-earth-900 font-bold text-sm flex items-center justify-center transition-all shadow-xs" 
                                    title="Increase quantity">
                                <i class="fa-solid fa-plus text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                ` : `
                    <button onclick="event.stopPropagation(); window.addToCart(${prod.id})" 
                            class="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-appetite-800/20">
                        <i class="fa-solid fa-cart-plus text-teal-300"></i>
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
                            class="px-3.5 py-1.5 rounded-xl font-bold transition-all ${isActive ? 'bg-appetite-700 text-white shadow-md' : 'bg-white text-earth-800 border border-canvas-border hover:bg-canvas-surface'}">
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
                        <div class="flex items-center gap-3 bg-white p-3 rounded-xl border border-canvas-border text-xs shadow-xs">
                            <img src="${item.image}" alt="${item.name}" class="h-12 w-12 rounded-lg object-cover bg-canvas-surface border border-canvas-border" />
                            <div class="flex-1 min-w-0">
                                <div class="font-bold text-earth-950 truncate">${item.name}</div>
                                <div class="text-earth-600 font-mono text-[11px]">$${item.price.toFixed(2)} each</div>
                            </div>
                            <div class="flex items-center gap-1.5 bg-canvas-surface border border-canvas-border rounded-lg p-1">
                                <button onclick="window.updateCartQty(${item.id}, -1)" class="h-5 w-5 rounded bg-white text-earth-900 hover:bg-earth-200 text-xs font-bold flex items-center justify-center">
                                    -
                                </button>
                                <span class="font-bold text-earth-950 px-1 font-mono">${item.quantity}</span>
                                <button onclick="window.updateCartQty(${item.id}, 1)" class="h-5 w-5 rounded bg-white text-earth-900 hover:bg-earth-200 text-xs font-bold flex items-center justify-center">
                                    +
                                </button>
                            </div>
                            <button onclick="window.removeCartItem(${item.id})" class="text-earth-400 hover:text-rose-600 p-1">
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
        function handleSearchInput() {
            const input = document.getElementById('search-input');
            const clearBtn = document.getElementById('search-clear-btn');
            searchQuery = input.value.trim();

            if (searchQuery.length > 0) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }

            currentPage = 1;
            renderCatalog();
        }

        function clearSearch() {
            const input = document.getElementById('search-input');
            const clearBtn = document.getElementById('search-clear-btn');
            input.value = '';
            searchQuery = '';
            clearBtn.classList.add('hidden');
            currentPage = 1;
            renderCatalog();
        }

        function handleSortChange() {
            const select = document.getElementById('sort-select');
            sortOption = select.value;
            currentPage = 1;
            renderCatalog();
        }

        function resetFilters() {
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
                        <div class="w-full py-3 px-4 rounded-xl bg-purple-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm">
                            <i class="fa-solid fa-check"></i>
                            <span>Added to Cart</span>
                        </div>
                        <div class="flex items-center justify-between bg-canvas-surface border border-canvas-border rounded-xl p-1.5 text-earth-950">
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, -1); window.renderProductModal();" 
                                    class="h-10 w-10 rounded-lg bg-white border border-canvas-border hover:bg-earth-200 text-earth-900 font-bold text-lg flex items-center justify-center transition-all shadow-xs">
                                <i class="fa-solid fa-minus text-sm"></i>
                            </button>
                            <div class="flex items-center gap-2 text-sm font-semibold">
                                <span class="text-earth-600">Qty:</span>
                                <input type="number" min="1" max="99" value="${inCartQty}" 
                                       onclick="event.stopPropagation();"
                                       onchange="window.setProductQuantity(${prod.id}, this.value); window.renderProductModal();" 
                                       class="w-16 text-center bg-white border border-canvas-border rounded-md px-2 py-1.5 text-earth-950 text-sm font-bold focus:outline-none focus:border-purple-600">
                            </div>
                            <button onclick="event.stopPropagation(); window.updateCartQty(${prod.id}, 1); window.renderProductModal();" 
                                    class="h-10 w-10 rounded-lg bg-white border border-canvas-border hover:bg-earth-200 text-earth-900 font-bold text-lg flex items-center justify-center transition-all shadow-xs">
                                <i class="fa-solid fa-plus text-sm"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <button onclick="event.stopPropagation(); window.addToCart(${prod.id}); window.renderProductModal();" 
                            class="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/20">
                        <i class="fa-solid fa-cart-plus text-white/90"></i>
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
                    path.setAttribute('stroke', '#14B8A6');
                }
            } else {
                if (headerIcon) headerIcon.className = 'fa-solid fa-moon text-amber-500';
                if (headerText) headerText.innerText = 'Theme';
                if (path) {
                    path.setAttribute('fill', 'url(#wavyGradientLight)');
                    path.setAttribute('stroke', '#0D9488');
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
                image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
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

        window.closeMinigameModal = function() {
            const luckMain = document.getElementById('luck-main-view');
            luckMain.classList.add('hidden');
            luckMain.classList.remove('flex');
            const cornerBtn = document.getElementById('wacky-corner-toggle');
                if (cornerBtn && window.minigamePlayed) {
                cornerBtn.classList.add('hidden');
                cornerBtn.style.display = 'none';
            }
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

        window.toggleViewStoreBlog = function (forceTarget) {
            const storeMain = document.getElementById('store-main-view');
            const blogMain = document.getElementById('blog-main-view');
            const luckMain = document.getElementById('luck-main-view');
            const hBlogText = document.getElementById('headerBlogText');

            const isCurrentlyLuck = window.currentView === 'luck';
            const isCurrentlyStore = window.currentView === 'store';
            const intendedTarget = (hBlogText && hBlogText.innerText.includes('Store')) ? 'store' : 'blog';
            const targetView = forceTarget || intendedTarget;

            if (window.currentView === targetView) return; // already there

            // Determine which elements to animate out based on current view
            let outSelector = '';
            if (isCurrentlyStore) {
                outSelector = '#store-main-view header, #store-main-view section, #store-main-view aside, #product-grid > div, #store-main-view .store-fluid-container > *';
            } else {
                outSelector = '#blog-main-view .store-fluid-container > div, #blog-posts-grid > article';
            }

            const outElements = Array.from(document.querySelectorAll(outSelector));
            outElements.forEach((el, idx) => {
                const tiltStart = (Math.random() - 0.5) * 16;
                const tiltEnd = (Math.random() - 0.5) * 44;
                el.style.setProperty('--fall-tilt', `${tiltStart}deg`);
                el.style.setProperty('--fall-tilt-end', `${tiltEnd}deg`);
                el.style.animationDelay = `${(idx % 10) * 0.04 + Math.random() * 0.05}s`;
                el.style.animationDuration = `${0.45 + (idx % 4) * 0.07}s`;
                el.classList.add('animate-fall-sporadic');
            });

            setTimeout(() => {
                outElements.forEach(el => {
                    el.classList.remove('animate-fall-sporadic');
                    el.style.animationDelay = '';
                    el.style.animationDuration = '';
                });

                if (isCurrentlyStore) storeMain.classList.add('hidden');
                else blogMain.classList.add('hidden');

                // Explicitly show the corner button in case it was hidden
                const cornerBtn = document.getElementById('wacky-corner-toggle');
                if (cornerBtn && !window.minigamePlayed) {
                    cornerBtn.classList.remove('hidden');
                    cornerBtn.style.display = 'flex';
                }

                if (targetView === 'blog') {
                    blogMain.classList.remove('hidden');
                    blogMain.classList.add('animate-rise-up');
                    window.renderBlogPosts(window.activeBlogCategory);
                    window.currentView = 'blog';

                    const hBlogText = document.getElementById('headerBlogText');
                    const hBlogIcon = document.getElementById('headerBlogIcon');
                    if (hBlogText) hBlogText.innerText = 'Store Catalog';
                    if (hBlogIcon) hBlogIcon.className = 'fa-solid fa-shop text-appetite-700';
                } else {
                    storeMain.classList.remove('hidden');
                    storeMain.classList.add('animate-rise-up');
                    window.currentView = 'store';

                    const hBlogText = document.getElementById('headerBlogText');
                    const hBlogIcon = document.getElementById('headerBlogIcon');
                    if (hBlogText) hBlogText.innerText = 'Wacky Blog';
                    if (hBlogIcon) hBlogIcon.className = 'fa-solid fa-book-open-reader text-appetite-700';
                }

                window.scrollTo({ top: 0, behavior: 'smooth' });

                setTimeout(() => {
                    if (targetView === 'blog') blogMain.classList.remove('animate-rise-up');
                    else storeMain.classList.remove('animate-rise-up');
                }, 500);
            }, 520);
        };

        window.returnToStore = function () {
            window.toggleViewStoreBlog('store');
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
            let speed = 50;
            let jumps = 0;
            const minJumps = 40;
            const maxJumps = 60 + Math.floor(Math.random() * 20);

            const r = Math.random();
            let targetPrize;
            if (r < 0.20) targetPrize = "Try again tomorrow";
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
                        resultTitle.innerText = targetPrize === 'Try again tomorrow' ? 'Better luck tomorrow!' : 'You Won ' + targetPrize;

                        if (targetPrize !== 'Try again tomorrow') {
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
                         class="bg-white border border-canvas-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5 cursor-pointer">
                    <div class="relative h-48 w-full overflow-hidden bg-earth-900">
                        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" />
                        <div class="absolute top-3 left-3">
                            <span class="px-3 py-1 rounded-full bg-teal-400 text-earth-950 font-mono font-black text-[10px] uppercase tracking-wider shadow-sm">
                                ${post.category}
                            </span>
                        </div>
                    </div>

                    <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div class="space-y-2">
                            <div class="flex items-center justify-between text-xs text-earth-500 font-medium">
                                <span>${post.date}</span>
                                <span class="font-mono text-purple-700 font-bold">${post.readTime}</span>
                            </div>
                            <h3 class="font-heading font-black text-xl text-earth-950 leading-tight group-hover:text-purple-700 transition-colors">
                                ${post.title}
                            </h3>
                            <p class="text-xs sm:text-sm text-earth-600 line-clamp-3 leading-relaxed">
                                ${post.excerpt}
                            </p>
                        </div>

                        <div class="pt-4 border-t border-canvas-border flex items-center justify-between">
                            <div class="flex items-center gap-2 text-xs font-bold text-earth-900">
                                <i class="fa-solid fa-user-astronaut text-appetite-700"></i>
                                <span>${post.author}</span>
                            </div>
                            <span class="px-3.5 py-1.5 rounded-xl bg-canvas-surface group-hover:bg-purple-100 text-purple-900 font-bold text-xs transition-all flex items-center gap-1.5">
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
                    btn.className = 'blog-cat-btn px-3.5 py-1.5 rounded-xl font-bold transition-all bg-appetite-700 text-white shadow-xs';
                } else {
                    btn.className = 'blog-cat-btn px-3.5 py-1.5 rounded-xl font-bold transition-all bg-canvas-surface hover:bg-canvas-border text-earth-800 border border-canvas-border';
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
    </script>

    <!-- BLOG POST READER MODAL -->
    <div id="blog-reader-modal" data-blueprint-file="WackyStore.WebUI/Views/Blog/ReaderModal.cshtml"
        data-blueprint-role="Article Reader Modal Partial" data-blueprint-layer="WebUI / View Component"
        data-blueprint-dom="Modal dialog displaying full article content, cover image, author info, and navigation action."
        data-blueprint-desc="Renders full BlogPost content when an article card is selected."
        data-blueprint-code="public ViewResult ArticleModal(string id) => View(repository.GetById(id));"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4 sm:p-6"
        onclick="if(event.target===this) window.closeBlogReaderModal()">
        <div
            class="bg-white border border-canvas-border rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-rise-up">

            <!-- Modal Header / Cover -->
            <div class="relative h-48 sm:h-64 w-full overflow-hidden bg-earth-950">
                <img id="blog-modal-cover" src="" alt="Blog Cover" class="w-full h-full object-cover opacity-85" />
                <div class="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/40 to-transparent"></div>
                <button onclick="window.closeBlogReaderModal()"
                    class="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all border border-white/20 z-20">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
                <div class="absolute bottom-4 left-6 right-6 text-white space-y-1 z-10">
                    <span id="blog-modal-category"
                        class="px-3 py-1 rounded-full bg-teal-400 text-earth-950 text-xs font-mono font-black uppercase">Category</span>
                    <h2 id="blog-modal-title"
                        class="font-heading font-black text-xl sm:text-3xl text-amber-100 leading-tight">Title</h2>
                </div>
            </div>

            <!-- Modal Meta Info -->
            <div
                class="px-6 sm:px-8 py-3 bg-canvas-surface border-b border-canvas-border flex items-center justify-between text-xs text-earth-600 font-medium flex-wrap gap-2">
                <div class="flex items-center gap-4 flex-wrap">
                    <span id="blog-modal-author" class="flex items-center gap-1.5 font-bold text-earth-900">
                        <i class="fa-solid fa-user-astronaut text-appetite-700"></i>
                        <span>Author</span>
                    </span>
                    <span id="blog-modal-date" class="flex items-center gap-1.5">
                        <i class="fa-regular fa-calendar text-teal-800"></i>
                        <span>Date</span>
                    </span>
                </div>
                <span id="blog-modal-readtime" class="flex items-center gap-1 font-mono text-purple-700 font-bold">
                    <i class="fa-solid fa-clock"></i>
                    <span>Read time</span>
                </span>
            </div>

            <!-- Modal Article Body -->
            <div id="blog-modal-body"
                class="p-6 sm:p-8 overflow-y-auto space-y-4 text-earth-900 font-sans leading-relaxed text-sm sm:text-base">
                <!-- Inserted by JS -->
            </div>

            <!-- Modal Footer -->
            <div
                class="px-6 sm:px-8 py-4 bg-canvas-base border-t border-canvas-border flex items-center justify-between">
                <button onclick="window.closeBlogReaderModal()"
                    class="px-5 py-2.5 rounded-xl bg-earth-200 hover:bg-earth-300 text-earth-900 font-bold text-xs transition-all">
                    Close Article
                </button>
                <button onclick="window.toggleViewStoreBlog(); window.closeBlogReaderModal();"
                    class="px-5 py-2.5 rounded-xl bg-appetite-700 hover:bg-appetite-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md">
                    <i class="fa-solid fa-store"></i>
                    <i class="fa-solid fa-store"></i>
                    <span>Browse Wacky Store</span>
                </button>
            </div>

        </div>
    </div>



    <!-- CORNER TRIANGLE MINIGAME BUTTON (SPIN & WIN) -->
    <div id="wacky-corner-toggle" onclick="window.triggerMinigame()"
        data-blueprint-file="WackyStore.WebUI/Views/Shared/_Layout.cshtml"
        data-blueprint-role="Wacky Minigame (Prize Wheel)" data-blueprint-layer="WebUI / View Component"
        data-blueprint-dom="Bottom-left corner triangle button triggering Prize Wheel minigame &amp; falling item animation."
        data-blueprint-desc="Triggers item gravity drop animation and opens the interactive Spin &amp; Win Discount Wheel."
        data-blueprint-code="window.triggerMinigame();"
        class="fixed bottom-0 left-0 z-50 group cursor-pointer select-none filter drop-shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95"
        title="Spin the Prize Wheel for Secret Coupons!">

        <svg width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="block w-[85px] h-[85px] sm:w-[95px] sm:h-[95px]">
            <!-- Straight Corner Triangle Background Path: Solid Teal -->
            <path id="wavyTrianglePath" d="M 0 95 L 0 0 L 95 95 Z" fill="url(#wavyGradientLight)" stroke="#6B21A8"
                stroke-width="2.5" stroke-linejoin="round" class="transition-all duration-500" />

            <defs>
                <!-- Light Mode Gradient: Solid Whimsical Teal -->
                <linearGradient id="wavyGradientLight" x1="0" y1="95" x2="65" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#4C1D95" />
                    <stop offset="60%" stop-color="#6B21A8" />
                    <stop offset="100%" stop-color="#9333EA" />
                </linearGradient>

                <!-- Dark Mode Gradient: Solid Cyberpunk Teal -->
                <linearGradient id="wavyGradientDark" x1="0" y1="95" x2="65" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#4C1D95" />
                    <stop offset="60%" stop-color="#6B21A8" />
                    <stop offset="100%" stop-color="#9333EA" />
                </linearGradient>
            </defs>
        </svg>

        <!-- Centered Icon and Text Label inside the Corner Triangle -->
        <div
            class="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex flex-col items-center justify-center text-white pointer-events-none transition-transform duration-300 group-hover:scale-110">
            <i id="viewToggleIcon" class="fa-solid fa-dice text-xl sm:text-2xl text-white"></i>
            <span id="viewToggleText"
                class="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-white leading-tight mt-0.5">PLAY!</span>
        </div>
    </div>
</body>

</html>