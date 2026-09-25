const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Replace the newsletter section
c = c.replace(/style="background-image: radial-gradient\([^>]*\)"/g, "");
c = c.replace(/<div class="absolute -top-6 -left-6 text-6xl transform -rotate-12">\?\?<\/div>/g, "");
c = c.replace(/<div class="absolute -bottom-6 -right-6 text-6xl transform rotate-12">\?\?<\/div>/g, "");

// Replace the footer section
let oldFooter = `<!-- 9. STORE FOOTER (Full Width) -->
    <footer class="border-t border-earth-800 bg-earth-950 py-8 text-xs text-earth-300 mt-auto"
        data-blueprint-file="WackyStore.WebUI/Views/Shared/_Layout.cshtml" data-blueprint-role="Site Footer Layout"
        data-blueprint-layer="WebUI / Presentation"
        data-blueprint-dom="Semantic <footer> container with dark purple background and silver highlights."
        data-blueprint-desc="Shared master footer layout displaying security badges, links to the interactive case study, and framework metadata."
        data-blueprint-code="<footer>&copy; @DateTime.Now.Year Wacky Things Co.</footer>">

        <div class="store-fluid-container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <span class="text-teal-400 font-black font-heading text-sm">WACKY THINGS CO.</span>
                <span class="text-earth-700">|</span>
                <span class="text-earth-300">Gloriously Bizarre Gadgets &amp; Oddities</span>
            </div>
            <div class="flex items-center gap-4 text-earth-300">
                <!-- CASE STUDY FOOTER LINK — commented out until ready to review
                <a href="./case-study.html" class="hover:text-teal-400 transition-colors">Case Study</a>
                END CASE STUDY FOOTER LINK -->
                <a href="../index.html" class="hover:text-teal-400 transition-colors">Interactive Projects</a>
                <a href="../../2026/" class="hover:text-teal-400 transition-colors">Main Portfolio</a>
            </div>
            <div class="text-earth-500 text-[11px] font-mono">
                ASP.NET MVC 5 &bull; EF6 &bull; Ninject 3.3 &bull; Razor
            </div>
        </div>
    </footer>`;

let newFooter = `<!-- 9. STORE FOOTER (Full Width) -->
    <footer class="border-t-4 border-teal-600 bg-gradient-to-br from-earth-950 to-earth-900 py-12 text-sm text-earth-300 mt-auto relative overflow-hidden"
        data-blueprint-file="WackyStore.WebUI/Views/Shared/_Layout.cshtml" data-blueprint-role="Site Footer Layout"
        data-blueprint-layer="WebUI / Presentation"
        data-blueprint-dom="Semantic <footer> container with dark purple gradient and vibrant teal highlights."
        data-blueprint-desc="Shared master footer layout displaying security badges, links to the interactive case study, and framework metadata."
        data-blueprint-code="<footer>&copy; @DateTime.Now.Year Wacky Things Co.</footer>">

        <!-- Subtle decorative background element -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-appetite-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="store-fluid-container flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div class="flex flex-col items-center md:items-start gap-2">
                <div class="flex items-center gap-3 group">
                    <div class="h-10 w-10 rounded-xl bg-appetite-700 text-white flex items-center justify-center text-lg shadow-lg shadow-appetite-700/50 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-hat-wizard"></i>
                    </div>
                    <span class="text-white font-black font-heading text-2xl tracking-wide">WACKY<span class="text-teal-400">THINGS</span> CO.</span>
                </div>
                <span class="text-earth-400 text-sm font-medium">Gloriously Bizarre Gadgets &amp; Oddities</span>
            </div>
            
            <div class="flex flex-col items-center md:items-end gap-5">
                <div class="flex flex-wrap items-center gap-6 font-bold tracking-wide">
                    <!-- CASE STUDY FOOTER LINK — commented out until ready to review
                    <a href="./case-study.html" class="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"><i class="fa-solid fa-book-open"></i> Case Study</a>
                    END CASE STUDY FOOTER LINK -->
                    <a href="../index.html" class="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"><i class="fa-solid fa-folder-open"></i> Interactive Projects</a>
                    <a href="../../2026/" class="hover:text-teal-300 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"><i class="fa-solid fa-user-astronaut"></i> Main Portfolio</a>
                </div>
                <div class="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span class="px-3 py-1 rounded-full bg-earth-900 border border-earth-700 text-earth-300 text-xs font-mono shadow-inner">ASP.NET MVC 5</span>
                    <span class="px-3 py-1 rounded-full bg-earth-900 border border-earth-700 text-earth-300 text-xs font-mono shadow-inner">EF6</span>
                    <span class="px-3 py-1 rounded-full bg-earth-900 border border-earth-700 text-earth-300 text-xs font-mono shadow-inner">Ninject 3.3</span>
                    <span class="px-3 py-1 rounded-full bg-earth-900 border border-earth-700 text-earth-300 text-xs font-mono shadow-inner">Razor</span>
                </div>
            </div>
        </div>
    </footer>`;

// replace spaces with regex for robustness
function normalize(str) { return str.replace(/\s+/g, ' '); }
let targetNorm = normalize(oldFooter);

let startIdx = 0;
let matchIdx = -1;
let matchLength = -1;
// we will do a sliding window or something similar, or just replace with regex
c = c.replace(/<!-- 9\. STORE FOOTER \(Full Width\) -->[\s\S]*?<\/footer>/g, newFooter);

fs.writeFileSync('index.html', c);
console.log('Replaced successfully');
