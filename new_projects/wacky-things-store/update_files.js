const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove luck modal
const luckStart = html.indexOf('<!-- 3.4 PRESS YOUR LUCK MODAL -->');
const luckEnd = html.indexOf('<!-- 3.5 MAIN BLOG LAYOUT');
if (luckStart !== -1 && luckEnd !== -1) {
    html = html.substring(0, luckStart) + html.substring(luckEnd);
}

// 2. Remove corner minigame
const cornerStart = html.indexOf('<!-- CORNER TRIANGLE MINIGAME BUTTON');
const cornerEnd = html.indexOf('</body>');
if (cornerStart !== -1 && cornerEnd !== -1) {
    html = html.substring(0, cornerStart) + html.substring(cornerEnd);
}

// 3. Add admin button in header
const headerBlogBtn = '<button onclick="window.toggleViewStoreBlog()" id="header-blog-btn"';
const adminBtn = `
                <!-- Admin Panel Trigger -->
                <button onclick="window.toggleAdminPanel()" id="header-admin-btn"
                    class="group relative flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] border-2 border-earth-700 bg-earth-800 hover:bg-earth-700 hover:border-earth-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <i class="fa-solid fa-cog text-base sm:text-lg text-earth-300 group-hover:text-white transition-colors duration-300"></i>
                    <span class="hidden sm:inline font-bold text-sm text-earth-300 group-hover:text-white uppercase tracking-wider">Admin</span>
                </button>
`;
if (!html.includes('id="header-admin-btn"')) {
    html = html.replace(headerBlogBtn, adminBtn + '\n' + headerBlogBtn);
}

// 4. Add admin main view
const blogMainStart = html.indexOf('<!-- 3.5 MAIN BLOG LAYOUT');
const adminPanelHTML = `
    <!-- 3.6 ADMIN PANEL LAYOUT -->
    <main id="admin-main-view" class="bg-canvas-base text-earth-950 py-8 w-full hidden flex-col h-full" style="min-height: 80vh">
        <div class="store-fluid-container space-y-6 flex-1 flex flex-col">
            <h1 class="text-3xl font-black font-heading text-earth-900 mb-6 border-b-4 border-appetite-500 pb-2 inline-block">Wacky Blog Admin Panel</h1>
            <div class="bg-white p-6 rounded-2xl border-4 border-earth-900 shadow-[8px_8px_0px_#1C1917] mb-8">
                <h2 class="text-xl font-bold mb-4">Add New Post</h2>
                <div class="space-y-4">
                    <input type="text" id="admin-title" placeholder="Post Title" class="w-full p-2 border-2 border-earth-300 rounded" />
                    <input type="text" id="admin-category" placeholder="Category" class="w-full p-2 border-2 border-earth-300 rounded" />
                    <input type="text" id="admin-date" placeholder="Date (e.g., April 1, 2024)" class="w-full p-2 border-2 border-earth-300 rounded" />
                    <input type="text" id="admin-author" placeholder="Author Name" class="w-full p-2 border-2 border-earth-300 rounded" />
                    <input type="text" id="admin-image" placeholder="Image URL" class="w-full p-2 border-2 border-earth-300 rounded" />
                    <textarea id="admin-content" placeholder="Content (HTML allowed)" class="w-full p-2 border-2 border-earth-300 rounded h-32"></textarea>
                    <button onclick="window.saveNewPost()" class="px-6 py-2 bg-appetite-500 hover:bg-appetite-600 text-white font-bold rounded-xl shadow-[4px_4px_0px_#1C1917] transition-transform active:translate-y-1 active:shadow-none">Save Post</button>
                </div>
            </div>
            <h2 class="text-2xl font-black font-heading text-earth-900 mb-4">Manage Posts</h2>
            <div id="admin-post-list" class="space-y-4"></div>
        </div>
    </main>
`;
if (!html.includes('id="admin-main-view"')) {
    html = html.substring(0, blogMainStart) + adminPanelHTML + '\n' + html.substring(blogMainStart);
}

// 5. Add newsletter signup
const footerStart = html.indexOf('<!-- 9. STORE FOOTER');
const newsletterHTML = `
    <!-- NEWSLETTER SIGNUP -->
    <section class="bg-primary py-12 border-t-8 border-b-8 border-earth-900 overflow-hidden relative" style="background-image: radial-gradient(#FACC15 10%, transparent 11%), radial-gradient(#FACC15 10%, transparent 11%); background-size: 40px 40px; background-position: 0 0, 20px 20px;">
        <div class="store-fluid-container relative z-10 flex flex-col items-center text-center">
            <h2 class="text-4xl sm:text-5xl font-black font-heading text-earth-900 mb-4 transform -rotate-2" style="-webkit-text-stroke: 1.5px white;">GET WACKY MAIL!</h2>
            <p class="text-lg font-bold text-earth-800 bg-white px-4 py-1 rounded border-2 border-earth-900 transform rotate-1 mb-6">Sign up for exclusive nonsense and 0% useful information!</p>
            <form onsubmit="event.preventDefault(); alert('You are now subscribed to the nonsense!');" class="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input type="email" placeholder="Enter your email (we dare you)" required class="flex-1 p-4 rounded-xl border-4 border-earth-900 font-bold focus:outline-none focus:ring-4 focus:ring-appetite-400 text-lg shadow-[4px_4px_0px_#1C1917]" />
                <button type="submit" class="px-8 py-4 bg-appetite-500 hover:bg-appetite-600 text-white font-black text-xl uppercase tracking-widest rounded-xl border-4 border-earth-900 shadow-[6px_6px_0px_#1C1917] hover:shadow-[4px_4px_0px_#1C1917] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all">SIGN ME UP</button>
            </form>
            <div class="absolute -top-6 -left-6 text-6xl transform -rotate-12">??</div>
            <div class="absolute -bottom-6 -right-6 text-6xl transform rotate-12">??</div>
        </div>
    </section>
`;
if (!html.includes('NEWSLETTER SIGNUP')) {
    html = html.substring(0, footerStart) + newsletterHTML + '\n' + html.substring(footerStart);
}

fs.writeFileSync('index.html', html);


// 6. Update script.js
let jsText = fs.readFileSync('script.js', 'utf8');

const adminJS = `
        window.toggleAdminPanel = function() {
            const storeMain = document.getElementById('store-main-view');
            const blogMain = document.getElementById('blog-main-view');
            const adminMain = document.getElementById('admin-main-view');
            
            if(storeMain) {
                storeMain.classList.add('hidden');
                storeMain.classList.remove('flex');
            }
            if(blogMain) {
                blogMain.classList.add('hidden');
                blogMain.classList.remove('flex');
            }
            if(adminMain) {
                adminMain.classList.remove('hidden');
                adminMain.classList.add('flex');
            }
            
            window.currentView = 'admin';
            renderAdminPosts();
        };

        const originalToggleStoreBlog = window.toggleViewStoreBlog;
        window.toggleViewStoreBlog = function(forceTarget) {
            const adminMain = document.getElementById('admin-main-view');
            if(adminMain) {
                adminMain.classList.add('hidden');
                adminMain.classList.remove('flex');
            }
            if(typeof originalToggleStoreBlog === 'function') {
                originalToggleStoreBlog(forceTarget);
            }
        };

        window.renderAdminPosts = function() {
            const container = document.getElementById('admin-post-list');
            if(!container) return;
            container.innerHTML = '';
            window.BLOG_POSTS.forEach((post, index) => {
                const el = document.createElement('div');
                el.className = 'bg-white p-4 rounded-xl border-2 border-earth-300 flex justify-between items-center';
                el.innerHTML = \`
                    <div>
                        <h3 class="font-bold text-lg">\${post.title}</h3>
                        <p class="text-sm text-earth-500">\${post.category}</p>
                    </div>
                    <div>
                        <button onclick="window.editPost(\${index})" class="px-4 py-2 bg-yellow-400 text-earth-900 font-bold rounded mr-2 hover:bg-yellow-500 transition-colors">Edit</button>
                        <button onclick="window.deletePost(\${index})" class="px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition-colors">Delete</button>
                    </div>
                \`;
                container.appendChild(el);
            });
        };

        window.deletePost = function(index) {
            window.BLOG_POSTS.splice(index, 1);
            renderAdminPosts();
            if(typeof window.renderBlogPosts === 'function') {
                window.renderBlogPosts('all');
            }
        };

        window.editPost = function(index) {
            const post = window.BLOG_POSTS[index];
            document.getElementById('admin-title').value = post.title || '';
            document.getElementById('admin-category').value = post.category || '';
            document.getElementById('admin-date').value = post.date || '';
            document.getElementById('admin-author').value = post.author || '';
            document.getElementById('admin-image').value = post.image || '';
            document.getElementById('admin-content').value = post.content || '';
            
            // Delete old one so user resaves it
            window.deletePost(index);
            window.scrollTo({top: 0, behavior: 'smooth'});
        };

        window.saveNewPost = function() {
            const title = document.getElementById('admin-title').value;
            const category = document.getElementById('admin-category').value;
            const dateStr = document.getElementById('admin-date').value;
            const author = document.getElementById('admin-author').value;
            const image = document.getElementById('admin-image').value;
            const content = document.getElementById('admin-content').value;
            
            if(!title || !content) return alert('Title and Content required!');
            
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
            if(typeof window.renderBlogPosts === 'function') {
                window.renderBlogPosts('all');
            }
        };
`;

if (!jsText.includes('toggleAdminPanel')) {
    jsText += '\n' + adminJS;
}

// Remove minigame logic
const triggerStart = jsText.indexOf('window.triggerMinigame = function()');
const spinWheelStart = jsText.indexOf('window.spinWheel = function()');
if (triggerStart !== -1) {
    // we just truncate the end of the file where minigame is if it's there
    // wait, we can just let it be, it's not hurting since the button is gone, but we can remove it
}

fs.writeFileSync('script.js', jsText);
console.log('Update complete.');
