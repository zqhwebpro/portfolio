const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The new Admin button styled to match the left ones
let adminBtnNew = `
                <!-- Admin Panel Trigger -->
                <button onclick="window.toggleAdminPanel()" id="header-admin-btn"
                    class="px-3.5 py-2 rounded-xl bg-white border border-canvas-border hover:border-earth-700 text-earth-800 hover:text-earth-900 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs">
                    <i class="fa-solid fa-cog text-earth-700"></i>
                    <span class="hidden sm:inline">Admin</span>
                </button>`;

// The new Wacky Blog button styled reversed
let blogBtnNew = `
                <!-- Blog Reading Portal Trigger -->
                <button onclick="window.toggleViewStoreBlog()" id="header-blog-btn"
                    class="px-3.5 py-2 rounded-xl bg-earth-800 hover:bg-earth-900 border border-earth-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    title="Read The Mischief Gazette">
                    <i class="fa-solid fa-newspaper text-earth-300"></i>
                    <span id="headerBlogText" class="hidden sm:inline">The Wacky Blog</span>
                </button>`;

// 1. Remove the old Admin button
const oldAdminStart = html.indexOf('<!-- Admin Panel Trigger -->');
if (oldAdminStart !== -1) {
    const oldAdminEnd = html.indexOf('</button>', oldAdminStart) + 9;
    html = html.substring(0, oldAdminStart) + html.substring(oldAdminEnd);
}

// 2. Remove the old Blog button
const oldBlogStart = html.indexOf('<button onclick="window.toggleViewStoreBlog()"');
if (oldBlogStart !== -1) {
    const oldBlogEnd = html.indexOf('</button>', oldBlogStart) + 9;
    
    // Check if there's a <!-- Blog Reading Portal Trigger --> before it that we should also clean up
    const triggerComment = '<!-- Blog Reading Portal Trigger -->';
    const triggerIdx = html.lastIndexOf(triggerComment, oldBlogStart);
    if (triggerIdx !== -1 && oldBlogStart - triggerIdx < 100) {
        html = html.substring(0, triggerIdx) + blogBtnNew + html.substring(oldBlogEnd);
    } else {
        html = html.substring(0, oldBlogStart) + blogBtnNew + html.substring(oldBlogEnd);
    }
}

// 3. Insert the new Admin button after the Admin CRUD button
const crudBtnText = '<span class="hidden sm:inline">Admin CRUD</span>\r\n                </button>';
const crudIdx = html.indexOf(crudBtnText);
if (crudIdx !== -1) {
    const insertPos = crudIdx + crudBtnText.length;
    html = html.substring(0, insertPos) + '\n' + adminBtnNew + html.substring(insertPos);
} else {
    // try different newline formatting
    const crudBtnText2 = '<span class="hidden sm:inline">Admin CRUD</span>\n                </button>';
    const crudIdx2 = html.indexOf(crudBtnText2);
    if (crudIdx2 !== -1) {
        const insertPos = crudIdx2 + crudBtnText2.length;
        html = html.substring(0, insertPos) + '\n' + adminBtnNew + html.substring(insertPos);
    } else {
        console.log("Could not find Admin CRUD button");
    }
}

fs.writeFileSync('index.html', html);
console.log('Done');
