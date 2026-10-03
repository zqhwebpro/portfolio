/**
 * ENGINEERING KNOWLEDGE MATRIX — UNIQUE TECH OS ENGINE
 * Monospace Code Fonts, Font Awesome Icons, Crisp White Cards,
 * Interactive IDE Tabs, and Cloud Runtime Sandbox
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. MODULE REPOSITORY DATA (7 CORE TRACKS)
  // ═══════════════════════════════════════════════════════════════════
  const MODULES_DATA = [
    {
      id: 'javascript',
      fileName: 'js_engine.es6',
      tabTitle: 'js_engine.es6',
      category: 'frontend',
      categoryBadge: 'TIER.01 // CLIENT_JS',
      tier: 'Client Tier',
      icon: 'fa-brands fa-js text-amber-500',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      title: 'JavaScript (Modern ES6+, Async/Event Loop, DOM & Web APIs)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '42.0_HRS',
      summary: 'Deep-dive into modern V8 engine mechanics, event loop execution queues, microtasks vs macrotasks, prototypical inheritance, advanced asynchronous patterns, and high-performance Web APIs.',
      competencies: [
        'V8 Event Loop & Call Stack',
        'Async/Await & Microtask Queue',
        'DOM & High-FPS Canvas APIs',
        'ESNext Metaprogramming & Proxies'
      ],
      syllabus: [
        { chapter: '01. V8 Engine Internals', desc: 'JIT compilation pipeline (Ignition & TurboFan), hidden classes, and inline caches.' },
        { chapter: '02. Concurrency & Event Loop', desc: 'Call stack execution, microtask queue (Promises) vs macrotask queue (setTimeout), and starvation avoidance.' },
        { chapter: '03. Advanced Asynchrony', desc: 'AbortController, AsyncGenerators, Web Workers multithreading, and shared memory (Atomics).' },
        { chapter: '04. Modern Web Platform APIs', desc: 'IntersectionObserver, ResizeObserver, BroadcastChannel, and Web Audio API synthesis.' }
      ],
      codeSnippet: `// ⚡ V8 Event Loop Execution Order Benchmark
console.log('1. Call Stack: Synchronous Main Thread');

setTimeout(() => console.log('5. MacroTask: setTimeout (Timer Queue)'), 0);

queueMicrotask(() => console.log('3. MicroTask: queueMicrotask queue'));

Promise.resolve().then(() => {
  console.log('4. MicroTask: Promise.then (Microtask Drain)');
});

console.log('2. Call Stack: Synchronous Phase End');
// Standard Output: 1 -> 2 -> 3 -> 4 -> 5`
    },
    {
      id: 'typescript',
      fileName: 'ts_types.d.ts',
      tabTitle: 'ts_types.d.ts',
      category: 'frontend',
      categoryBadge: 'TIER.01 // STATIC_TYPES',
      tier: 'Client Tier',
      icon: 'fa-solid fa-code text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      title: 'TypeScript (Strict Typing, Generics, Utility Types, Ambient Declarations)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '38.0_HRS',
      summary: 'Master compile-time type safety with conditional types, template literal types, complex recursive generics, custom declaration files (.d.ts), and AST transformation workflows for large-scale codebases.',
      competencies: [
        'Conditional & Distributive Types',
        'Mapped & Recursive Generics',
        'Ambient (.d.ts) Declarations',
        'Strict Type-Narrowing & Soundness'
      ],
      syllabus: [
        { chapter: '01. Strict Type Soundness', desc: 'Eliminating `any`, configuring strict compiler flags, and nominal typing tricks.' },
        { chapter: '02. Advanced Generics & Inference', desc: 'Type arguments inference, conditional types (`T extends U ? X : Y`), and `infer` keyword patterns.' },
        { chapter: '03. Template Literals & Mapped Types', desc: 'Key-remapping (`as \`on\${Capitalize<string>}\``), deep read-only, and recursive JSON types.' },
        { chapter: '04. Ambient Libraries & .d.ts', desc: 'Writing ambient declarations for legacy C/WASM modules and global Window augmentations.' }
      ],
      codeSnippet: `// ⚡ Advanced Recursive DeepReadonly & Event Key-Remapping
type DeepReadonly<T> = T extends Function | boolean | number | string | null | undefined
  ? T
  : { readonly [P in keyof T]: DeepReadonly<T[P]> };

type EventRoutes<T extends Record<string, string>> = {
  [K in keyof T as \`on\${Capitalize<string & K>}Action\`]: (payload: T[K]) => void;
};

// Compile-time deterministic validation
type Payload = { click: { x: number; y: number }; submit: string };
type HandlerMatrix = EventRoutes<Payload>;`
    },
    {
      id: 'react',
      fileName: 'react_fiber.tsx',
      tabTitle: 'react_fiber.tsx',
      category: 'frontend',
      categoryBadge: 'TIER.01 // REACTIVE_UI',
      tier: 'Client Tier',
      icon: 'fa-brands fa-react text-sky-500',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      title: 'React (Component Lifecycle, Custom Hooks, State Machines, Next.js / Modern SSR)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '48.0_HRS',
      summary: 'Engineer deterministic enterprise interfaces with concurrent rendering, custom memoization hooks, finite state machines, Server Components (RSC), and hybrid Next.js SSR/SSG architectures.',
      competencies: [
        'Fiber Reconciliation Engine',
        'Custom High-Throughput Hooks',
        'Finite State Machines (XState)',
        'React Server Components & Hydration'
      ],
      syllabus: [
        { chapter: '01. Fiber Reconciliation Engine', desc: 'Concurrent Mode, scheduling priorities, startTransition, and useDeferredValue.' },
        { chapter: '02. Custom Reactive Hooks', desc: 'Decoupling side effects, subscription hooks, and high-frequency DOM listeners.' },
        { chapter: '03. Finite State Machine Architectures', desc: 'Replacing fragile boolean flags with deterministic states and transition matrices.' },
        { chapter: '04. Modern SSR & RSC Pipeline', desc: 'Next.js App Router streaming HTML, suspense boundaries, and server actions.' }
      ],
      codeSnippet: `// ⚡ High-Performance Concurrent Event Stream Hook
import { useState, useEffect, useTransition } from 'react';

export function useTelemetryStream<T>(sourceUrl: string) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const sse = new EventSource(sourceUrl);
    sse.onmessage = (event) => {
      const payload = JSON.parse(event.data) as T;
      startTransition(() => setData(payload));
    };
    return () => sse.close();
  }, [sourceUrl]);

  return { data, isPending };
}`
    },
    {
      id: 'php',
      fileName: 'php_backend.php',
      tabTitle: 'php_backend.php',
      category: 'backend',
      categoryBadge: 'TIER.02 // SERVER_PHP',
      tier: 'Server Tier',
      icon: 'fa-brands fa-php text-indigo-600',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      title: 'PHP (PHP 8.x modern OOP, PSR standards, Composer, Custom MVC & Theme Architecture)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '40.0_HRS',
      summary: 'Build robust server-side backends harnessing PHP 8.3+ features: attributes, JIT compilation, fibers, strict typing, PSR-12/PSR-4 adherence, enterprise Composer packaging, and custom modular MVC frameworks.',
      competencies: [
        'PHP 8.3 Attributes & JIT Compiler',
        'PSR-4 Autoloading & PSR-7 HTTP',
        'Dependency Injection Container',
        'Custom MVC & Data Mapper ORM'
      ],
      syllabus: [
        { chapter: '01. Modern PHP 8.3 OOP Core', desc: 'Readonly classes, constructor property promotion, match expressions, and fiber concurrency.' },
        { chapter: '02. PSR Compliance & Autoloading', desc: 'PSR-4 namespacing, PSR-11 container implementation, and PSR-7/PSR-15 middleware stacks.' },
        { chapter: '03. Enterprise Composer Architecture', desc: 'Private package repositories, semantic versioning, and build automation plugins.' },
        { chapter: '04. Custom MVC Framework Engine', desc: 'Attribute-driven routing, front controller dispatchers, and secure PDO repositories.' }
      ],
      codeSnippet: `<?php
declare(strict_types=1);

namespace Matrix\\Http;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD)]
final readonly class Route {
    public function __construct(
        public string $method,
        public string $path
    ) {}
}

final readonly class TelemetryController {
    #[Route(method: 'GET', path: '/api/v1/matrix/status')]
    public function getStatus(): array {
        return [
            'status' => 'ONLINE',
            'timestamp' => hrtime(true),
            'subsystems' => ['dns' => true, 'kestrel' => true, 'v8' => true]
        ];
    }
}`
    },
    {
      id: 'dotnet',
      fileName: 'dotnet_kestrel.cs',
      tabTitle: 'dotnet_kestrel.cs',
      category: 'backend',
      categoryBadge: 'TIER.02 // SERVER_DOTNET',
      tier: 'Server Tier',
      icon: 'fa-brands fa-windows text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      title: '.NET / C# (ASP.NET Core Web APIs, Entity Framework Core, Dependency Injection, Middleware)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '52.0_HRS',
      summary: 'Construct high-throughput distributed microservices and RESTful Web APIs on .NET 9 using Kestrel server pipelines, asynchronous EF Core query optimization, pipeline middleware, and native DI.',
      competencies: [
        'ASP.NET Core 9 Minimal APIs',
        'EF Core 9 Query Tuning & AsNoTracking',
        'Custom Pipeline Middleware',
        'Scoped DI & Service Lifecycles'
      ],
      syllabus: [
        { chapter: '01. ASP.NET Core 9 Architecture', desc: 'Kestrel HTTP/3 engine, endpoint routing, minimal APIs, and TypedResults.' },
        { chapter: '02. High-Performance EF Core 9', desc: 'Compiled queries, split queries, optimistic concurrency, and connection resiliency.' },
        { chapter: '03. Deep Pipeline Middleware', desc: 'Correlation ID tracing, centralized exception handlers, and response compression.' },
        { chapter: '04. Native Dependency Injection', desc: 'Transient vs Scoped vs Singleton lifecycles and thread-safe factory registrations.' }
      ],
      codeSnippet: `// ⚡ ASP.NET Core 9 High-Throughput Minimal Endpoint
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContextPool<MatrixDbContext>(opt => 
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

app.MapGet("/api/nodes", async (MatrixDbContext db, CancellationToken ct) => 
    TypedResults.Ok(await db.Nodes
        .AsNoTracking()
        .Where(n => n.IsActive)
        .Select(n => new NodeDto(n.Id, n.Name, n.LatencyMs))
        .ToListAsync(ct)))
    .WithName("GetActiveNodes")
    .WithOpenApi();

app.Run();`
    },
    {
      id: 'dns',
      fileName: 'dns_records.zone',
      tabTitle: 'dns_records.zone',
      category: 'infrastructure',
      categoryBadge: 'TIER.03 // NETWORK_DNS',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-network-wired text-emerald-600',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      title: 'DNS (Nameservers, A/AAAA/CNAME/MX/TXT records, Propagation, TTL, SSL/TLS handshake)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '26.0_HRS',
      summary: 'Demystify the distributed backbone of the global internet. Understand authoritative vs recursive nameservers, zone transfers, DNSSEC validation, global TTL propagation latencies, and TLS 1.3 cryptographic handshakes.',
      competencies: [
        'Zone Files & Record Types (A/AAAA/CNAME/TXT)',
        'Authoritative Anycast Routing',
        'TTL Propagation & Edge Caching',
        'TLS 1.3 Cryptographic Handshake'
      ],
      syllabus: [
        { chapter: '01. Distributed DNS Architecture', desc: 'Root servers (A-M), TLD name servers, and authoritative Anycast networks.' },
        { chapter: '02. Resource Records Deep-Dive', desc: 'A, AAAA (IPv6), CNAME canonical chaining, MX routing, and SPF/DKIM TXT authentication.' },
        { chapter: '03. Global TTL & Propagation', desc: 'Recursive resolver caching, negative TTL (SOA min), and zero-downtime DNS cutovers.' },
        { chapter: '04. Modern TLS 1.3 Handshake', desc: '0-RTT resumption, Diffie-Hellman Ephemeral key exchange, and ALPN negotiation.' }
      ],
      codeSnippet: `; ⚡ BIND9 Production Zone File with DNSSEC & CAA Records
$TTL 300 ; 5-minute fast propagation
@       IN      SOA     ns1.matrixnet.io. admin.matrixnet.io. (
                        2026100201 ; Serial YYYYMMDDNN
                        3600       ; Refresh (1 hr)
                        900        ; Retry (15 min)
                        1209600    ; Expire (2 weeks)
                        300 )      ; Negative Cache TTL

; Authoritative Anycast Nameservers
@       IN      NS      ns1.matrixnet.io.
@       IN      NS      ns2.matrixnet.io.

; High-Availability Dual-Stack Web Edge
@       IN      A       104.21.72.18
@       IN      AAAA    2606:4700:3033::6815:4812
api     IN      CNAME   ingress.matrixnet.io.

; Security: Let's Encrypt CAA Restriction
@       IN      CAA     0 issue "letsencrypt.org"`
    },
    {
      id: 'devops',
      fileName: 'devops_nginx.conf',
      tabTitle: 'devops_nginx.conf',
      category: 'infrastructure',
      categoryBadge: 'TIER.03 // CLOUD_DEVOPS',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-server text-purple-600',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      title: 'Web Hosting & DevOps (Linux/Nginx configuration, Apache vhosts, Docker containers, CI/CD pipelines, SSL provisioning)',
      level: 'LEVEL: PRODUCTION_READY',
      duration: '50.0_HRS',
      summary: 'Orchestrate zero-downtime production environments through hardened Linux kernels, high-concurrency Nginx reverse proxy tuning, multi-stage Docker container builds, automated GitHub Actions CI/CD pipelines, and Let\'s Encrypt automated ACME SSL provisioning.',
      competencies: [
        'Nginx Reverse Proxy & HTTP/3 QUIC',
        'Multi-Stage Dockerfile Optimization',
        'GitHub Actions Zero-Downtime CI/CD',
        'Automated ACME / Certbot SSL Renewal'
      ],
      syllabus: [
        { chapter: '01. Linux Kernel Tuning & Security', desc: 'sysctl file descriptors, ulimits, TCP BBR congestion control, and firewalld/UFW rules.' },
        { chapter: '02. Nginx High-Concurrency Configuration', desc: 'Worker processes, epoll event model, proxy caching, rate limiting, and HTTP/3 QUIC.' },
        { chapter: '03. Enterprise Docker Multi-Stage Builds', desc: 'Distroless images, vulnerability scanning (Trivy), and non-root execution.' },
        { chapter: '04. Automated CI/CD & SSL Provisioning', desc: 'GitHub Actions blue/green deployment scripts and Certbot standalone automated renewal hooks.' }
      ],
      codeSnippet: `# ⚡ Hardened Nginx HTTP/3 QUIC Reverse Proxy
server {
    listen 443 quic reuseport;
    listen 443 ssl http2;
    server_name api.matrixnet.io;

    ssl_certificate /etc/letsencrypt/live/matrixnet.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matrixnet.io/privkey.pem;
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers off;

    # HTTP/3 Advertisement Header
    add_header Alt-Svc 'h3=":443"; ma=86400';
    add_header X-Frame-Options "DENY" always;

    location / {
        proxy_pass http://kestrel_backend_cluster;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`
    }
  ];

  // ═══════════════════════════════════════════════════════════════════
  // 2. AUDIO SYNTHESIZER (DISCRETE OS CLICKS)
  // ═══════════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════════
  // 3. APPLICATION STATE
  // ═══════════════════════════════════════════════════════════════════
  let currentActiveTrackId = 'javascript';
  let currentSubTab = 'overview'; // 'overview', 'syllabus', 'code', 'sandbox'
  let currentViewMode = 'tabbed'; // 'tabbed' or 'grid'
  let activeSearchQuery = '';

  // ═══════════════════════════════════════════════════════════════════
  // 4. RENDERERS
  // ═══════════════════════════════════════════════════════════════════

  // Render Horizontal IDE Tab Switcher
  function renderIdeTabs() {
    const tabsContainer = document.getElementById('osIdeTabsContainer');
    if (!tabsContainer) return;

    const filtered = MODULES_DATA.filter((m) => {
      if (!activeSearchQuery) return true;
      const q = activeSearchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.fileName.toLowerCase().includes(q) ||
        m.competencies.some((c) => c.toLowerCase().includes(q))
      );
    });

    let html = filtered
      .map((mod) => {
        const isActive = currentViewMode === 'tabbed' && currentActiveTrackId === mod.id;
        return `
          <button 
            type="button" 
            class="os-ide-tab-btn ${isActive ? 'active' : ''}" 
            data-track-id="${mod.id}"
            title="Inspect ${mod.fileName}">
            <i class="${mod.icon}"></i>
            <span>${mod.fileName}</span>
          </button>
        `;
      })
      .join('');

    // Directory Grid Switcher Tab
    const isGridActive = currentViewMode === 'grid';
    html += `
      <button 
        type="button" 
        class="os-ide-tab-btn ${isGridActive ? 'active' : ''}" 
        data-view="grid"
        title="View All Modules in Grid">
        <i class="fa-solid fa-table-cells text-slate-400"></i>
        <span>directory_grid.all</span>
      </button>
    `;

    tabsContainer.innerHTML = html;

    // Attach click listeners
    tabsContainer.querySelectorAll('.os-ide-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playOsClick(800, 0.03);
        const view = btn.getAttribute('data-view');
        if (view === 'grid') {
          currentViewMode = 'grid';
        } else {
          currentViewMode = 'tabbed';
          currentActiveTrackId = btn.getAttribute('data-track-id');
        }
        renderMainView();
        renderIdeTabs();
      });
    });
  }

  // Render the Active Track in a Crisp White Card
  function renderActiveTabbedCard() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const mod = MODULES_DATA.find((m) => m.id === currentActiveTrackId) || MODULES_DATA[0];

    const competenciesHtml = mod.competencies
      .map(
        (c) =>
          `<div class="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
            <span class="text-sky-500 font-black">&bull;</span>
            <span>${c}</span>
          </div>`
      )
      .join('');

    const syllabusHtml = mod.syllabus
      .map(
        (s, idx) => `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3 hover:bg-slate-100/80 transition-colors">
          <div class="w-8 h-8 rounded bg-white border border-slate-300 flex items-center justify-center font-mono font-bold text-xs text-slate-800 shadow-xs shrink-0">
            0${idx + 1}
          </div>
          <div class="flex-1">
            <h4 class="font-headline font-bold text-slate-900 text-sm sm:text-base mb-1">
              ${s.chapter}
            </h4>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">${s.desc}</p>
          </div>
        </div>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="os-white-card w-full">
        
        <!-- Titanium Grey Window Titlebar -->
        <div class="os-window-header px-6 sm:px-10 lg:px-14 py-3">
          <div class="flex items-center gap-2.5">
            <div class="font-mono text-xs text-slate-700 flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-terminal text-slate-500 text-[11px]"></i>
              <span>/usr/local/matrix/kernel/${mod.fileName}</span>
            </div>
          </div>

          <div class="font-mono text-xs text-slate-500 font-bold">
            ${mod.duration} &bull; ${mod.level}
          </div>
        </div>

        <!-- Main Card Body -->
        <div class="py-6 sm:py-8 px-6 sm:px-10 lg:px-14 space-y-6">
          
          <!-- Title & Tier Bar -->
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-3xl shrink-0 shadow-xs">
              <i class="${mod.icon}"></i>
            </div>
            <div class="flex-1">
              <div class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                ${mod.tier} // ${mod.category.toUpperCase()}
              </div>
              <h2 class="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight mb-2">
                ${mod.title}
              </h2>
              <p class="font-sans text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                ${mod.summary}
              </p>
            </div>
          </div>

          <!-- Sub-Tab Switcher (Grey Tech Buttons with Font Awesome) -->
          <div class="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 overflow-x-auto">
            <button type="button" class="os-sub-tab-chip ${currentSubTab === 'overview' ? 'active' : ''}" data-sub="overview">
              <i class="fa-solid fa-layer-group text-[11px]"></i>
              <span>01 // OVERVIEW &amp; COMPETENCIES</span>
            </button>
            <button type="button" class="os-sub-tab-chip ${currentSubTab === 'syllabus' ? 'active' : ''}" data-sub="syllabus">
              <i class="fa-solid fa-list-check text-[11px]"></i>
              <span>02 // CURRICULUM SYLLABUS</span>
            </button>
            <button type="button" class="os-sub-tab-chip ${currentSubTab === 'code' ? 'active' : ''}" data-sub="code">
              <i class="fa-solid fa-file-code text-[11px]"></i>
              <span>03 // ARCHITECTURE CODE ARTIFACT</span>
            </button>
            <button type="button" class="os-sub-tab-chip ${currentSubTab === 'sandbox' ? 'active' : ''}" data-sub="sandbox">
              <i class="fa-solid fa-terminal text-[11px]"></i>
              <span>04 // LIVE RUNTIME SANDBOX</span>
            </button>
          </div>

          <!-- 01: Overview & Competencies Tab Content -->
          <div id="subContent-overview" class="${currentSubTab === 'overview' ? 'block' : 'hidden'} space-y-5">
            <div>
              <h3 class="font-headline font-bold text-slate-800 text-base uppercase tracking-wider mb-3">
                Core System Competencies
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                ${competenciesHtml}
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                <div class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  System Layer
                </div>
                <h4 class="font-headline font-black text-slate-900 text-lg mb-1.5">${mod.tier}</h4>
                <p class="font-sans text-xs text-slate-600 leading-relaxed">Holistic integration into enterprise distributed service mesh.</p>
              </div>

              <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                <div class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Benchmark Status
                </div>
                <h4 class="font-headline font-black text-slate-900 text-lg mb-1.5">Production Ready</h4>
                <p class="font-sans text-xs text-slate-600 leading-relaxed">Validated against 99.99% uptime zero-downtime SLA criteria.</p>
              </div>

              <div class="p-5 bg-slate-50 border border-slate-200 rounded-lg">
                <div class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Accreditation
                </div>
                <h4 class="font-headline font-black text-slate-900 text-lg mb-1.5">Full Certification</h4>
                <p class="font-sans text-xs text-slate-600 leading-relaxed">Mastery verified via automated sandbox benchmark unit tests.</p>
              </div>
            </div>
          </div>

          <!-- 02: Syllabus Breakdown Tab Content -->
          <div id="subContent-syllabus" class="${currentSubTab === 'syllabus' ? 'block' : 'hidden'} space-y-3">
            <div class="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <i class="fa-solid fa-folder-tree text-sky-600 text-[11px]"></i>
              <span>CURRICULUM CHAPTER DIRECTORY (4 MODULES):</span>
            </div>
            <div class="space-y-2">
              ${syllabusHtml}
            </div>
          </div>

          <!-- 03: Architecture Code Artifact Tab Content -->
          <div id="subContent-code" class="${currentSubTab === 'code' ? 'block' : 'hidden'} space-y-3">
            <div class="flex items-center justify-between">
              <div class="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <i class="fa-solid fa-code text-sky-600 text-[11px]"></i>
                <span>PRODUCTION CODE ARTIFACT:</span>
              </div>
              <button 
                id="copyCodeBtn" 
                type="button" 
                class="os-tech-btn-secondary">
                <i class="fa-regular fa-copy"></i>
                <span>Copy Code</span>
              </button>
            </div>
            <div class="os-code-editor-box">
              <pre><code id="activeCodeSnippetText">${mod.codeSnippet}</code></pre>
            </div>
          </div>

          <!-- 04: Runtime Sandbox Simulation Tab Content -->
          <div id="subContent-sandbox" class="${currentSubTab === 'sandbox' ? 'block' : 'hidden'} space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <i class="fa-solid fa-terminal text-sky-600 text-[11px]"></i>
                  <span>CLOUD RUNTIME TERMINAL SIMULATOR</span>
                </div>
                <p class="font-sans text-xs text-slate-600 mt-0.5">
                  Execute cloud container bootstrap, verify AST type soundness, and stream runtime diagnostics.
                </p>
              </div>
              <button 
                id="runModuleSandboxBtn" 
                type="button" 
                class="os-tech-btn-primary">
                <i class="fa-solid fa-play text-xs"></i>
                <span>Execute Simulation</span>
              </button>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden border border-slate-300">
              <div id="sandboxProgressBar" class="h-full bg-gradient-to-r from-sky-600 to-indigo-600 transition-all duration-300 rounded-full" style="width: 0%;"></div>
            </div>

            <!-- Terminal Output -->
            <div class="os-code-editor-box space-y-1.5 max-h-56" id="sandboxTerminalOutput">
              <div class="text-slate-400 text-xs">
                <span class="text-emerald-400">nexus@matrix-os:~$</span> ready. Click "Execute Simulation" to launch sandbox for [${mod.fileName}].
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    // Attach sub-tab event listeners
    container.querySelectorAll('.os-sub-tab-chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        playOsClick(900, 0.03);
        currentSubTab = btn.getAttribute('data-sub');
        renderActiveTabbedCard();
      });
    });

    // Copy code button listener
    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = document.getElementById('activeCodeSnippetText')?.textContent;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            playOsClick(1200, 0.05);
            copyBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i> Copied!`;
            setTimeout(() => {
              copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Code`;
            }, 2000);
          });
        }
      });
    }

    // Execute Sandbox Button
    const runBtn = document.getElementById('runModuleSandboxBtn');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        executeSandboxSimulation(mod);
      });
    }
  }

  // Render Grid View of All 7 White Cards
  function renderAllCardsGrid() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const filtered = MODULES_DATA.filter((m) => {
      if (!activeSearchQuery) return true;
      const q = activeSearchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.fileName.toLowerCase().includes(q) ||
        m.competencies.some((c) => c.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="os-white-card p-12 text-center max-w-xl mx-auto">
          <div class="w-12 h-12 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-xl mx-auto mb-3 border border-slate-300">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 class="font-mono font-bold text-lg text-slate-900 mb-1">NO_MODULES_FOUND</h3>
          <p class="font-sans text-xs text-slate-600 mb-4">No tracks match your current search query.</p>
          <button id="clearSearchFromEmptyBtn" type="button" class="os-tech-btn-primary">
            <i class="fa-solid fa-rotate-left"></i>
            <span>Clear Search Filter</span>
          </button>
        </div>
      `;
      document.getElementById('clearSearchFromEmptyBtn')?.addEventListener('click', () => {
        const input = document.getElementById('osGlobalSearchInput');
        if (input) input.value = '';
        activeSearchQuery = '';
        renderIdeTabs();
        renderMainView();
      });
      return;
    }

    const cardsHtml = filtered
      .map((mod) => {
        return `
          <div class="os-white-card flex flex-col justify-between cursor-pointer group hover:shadow-2xl transition-all" data-card-track-id="${mod.id}">
            <!-- Titlebar -->
            <div class="os-window-header py-2 px-4">
              <div class="font-mono text-xs text-slate-600 font-semibold flex items-center gap-1.5">
                <i class="${mod.icon}"></i> ${mod.fileName}
              </div>
              <div class="font-mono text-xs text-slate-500 font-semibold">${mod.duration}</div>
            </div>

            <!-- Body -->
            <div class="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  ${mod.tier}
                </div>

                <h3 class="font-headline font-black text-xl sm:text-2xl text-slate-900 leading-tight group-hover:text-sky-600 transition-colors mb-3 tracking-tight">
                  ${mod.title}
                </h3>

                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  ${mod.summary}
                </p>

                <div class="font-mono text-xs text-slate-500 mb-5">
                  ${mod.competencies.slice(0, 3).join(' • ')}
                </div>
              </div>

              <!-- Action Bar -->
              <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500">4 Chapters</span>
                <button type="button" class="os-tech-btn-primary text-xs py-1.5 px-3">
                  <span>Open Track</span>
                  <i class="fa-solid fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        ${cardsHtml}
      </div>
    `;

    // Click handler on cards to switch to tabbed view
    container.querySelectorAll('[data-card-track-id]').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-card-track-id');
        currentActiveTrackId = id;
        currentViewMode = 'tabbed';
        playOsClick(800, 0.03);
        renderIdeTabs();
        renderMainView();
      });
    });
  }

  function renderMainView() {
    if (currentViewMode === 'grid') {
      renderAllCardsGrid();
    } else {
      renderActiveTabbedCard();
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 5. RUNTIME SANDBOX SIMULATION
  // ═══════════════════════════════════════════════════════════════════
  function executeSandboxSimulation(mod) {
    playOsClick(950, 0.04);
    const bar = document.getElementById('sandboxProgressBar');
    const term = document.getElementById('sandboxTerminalOutput');
    const runBtn = document.getElementById('runModuleSandboxBtn');
    if (!bar || !term) return;

    if (runBtn) {
      runBtn.disabled = true;
      runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Executing...`;
    }

    term.innerHTML = '';
    bar.style.width = '0%';

    const steps = [
      { pct: 25, delay: 200, text: `BOOTSTRAP: Initializing container sandbox for [${mod.fileName}] (RAM: 128MB)` },
      { pct: 50, delay: 600, text: `COMPILATION: Validating AST and verifying static type soundess (100% compliance)` },
      { pct: 80, delay: 1000, text: `PIPELINE: Synchronizing benchmark test suite with distributed Kestrel cluster` },
      { pct: 100, delay: 1400, text: `SUCCESS: Runtime operational. All curriculum benchmarks passing with zero regression.` }
    ];

    steps.forEach((s, idx) => {
      setTimeout(() => {
        bar.style.width = `${s.pct}%`;
        const line = document.createElement('div');
        line.className = 'text-xs font-mono text-slate-200';
        const time = new Date().toLocaleTimeString();
        line.innerHTML = `<span class="text-slate-500">[${time}]</span> <span class="text-sky-400">SYS_EXEC &gt;&gt;</span> ${s.text}`;
        term.appendChild(line);
        term.scrollTop = term.scrollHeight;
        playOsClick(700 + idx * 100, 0.02);

        if (idx === steps.length - 1 && runBtn) {
          runBtn.disabled = false;
          runBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Simulation Complete`;
          setTimeout(() => {
            runBtn.innerHTML = `<i class="fa-solid fa-play text-xs"></i> <span>Execute Simulation</span>`;
          }, 3000);
        }
      }, s.delay);
    });
  }



  // ═══════════════════════════════════════════════════════════════════
  // 7. OS CLOCK & SEARCH
  // ═══════════════════════════════════════════════════════════════════
  function initOsClock() {
    const clockEls = document.querySelectorAll('.os-menu-clock, #osMenuClock');
    if (!clockEls.length) return;
    function tick() {
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
      clockEls.forEach(el => {
        el.textContent = timeStr;
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 8. DOM INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    initOsClock();
    renderIdeTabs();
    renderMainView();

    // Global Search Input
    const searchInput = document.getElementById('osGlobalSearchInput');
    const clearSearchBtn = document.getElementById('osClearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.trim();
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', !activeSearchQuery);
        }
        renderIdeTabs();
        renderMainView();
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        activeSearchQuery = '';
        clearSearchBtn.classList.add('hidden');
        searchInput.focus();
        playOsClick(500, 0.03);
        renderIdeTabs();
        renderMainView();
      });
    }

    // Audio Mute Toggle (Synchronized across both header and footer menubars)
    const audioBtns = document.querySelectorAll('.os-audio-toggle-btn, #osAudioToggleBtn');
    function updateAudioButtons() {
      audioBtns.forEach(btn => {
        btn.innerHTML = soundEnabled
          ? `<i class="fa-solid fa-volume-high text-sky-400"></i>`
          : `<i class="fa-solid fa-volume-xmark text-slate-500"></i>`;
      });
    }

    audioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        soundEnabled = !soundEnabled;
        updateAudioButtons();
        if (soundEnabled) playOsClick(900, 0.04);
      });
    });

    // In-App Home Icon Navigation (Resets curriculum view to first track smoothly)
    document.querySelectorAll('a[href="./index.html"]').forEach(homeBtn => {
      homeBtn.addEventListener('click', (e) => {
        const path = window.location.pathname;
        if (path.endsWith('index.html') || path.endsWith('/learning-module/') || path.endsWith('/learning-module')) {
          e.preventDefault();
          activeTrackId = 'javascript';
          activeCategoryFilter = 'all';
          activeSearchQuery = '';
          if (searchInput) searchInput.value = '';
          if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
          renderIdeTabs();
          renderMainView();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          playOsClick(800, 0.04);
        }
      });
    });
  });
})();
