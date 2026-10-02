/**
 * ENGINEERING KNOWLEDGE MATRIX — NEXT-GEN OS ENGINE
 * Tabbed White Cards, Interactive Architecture Sandbox & Clean OS Chrome
 * No CRT / No moving dots or lines. Full responsive OS interface.
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. MODULE REPOSITORY DATA (7 CORE TRACKS)
  // ═══════════════════════════════════════════════════════════════════
  const MODULES_DATA = [
    {
      id: 'javascript',
      tabName: 'JavaScript',
      category: 'frontend',
      categoryBadge: 'CLIENT TIER // JAVASCRIPT',
      tier: 'Client Tier',
      icon: 'fa-brands fa-js text-amber-500',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'JavaScript (Modern ES6+, Async/Event Loop, DOM & Web APIs)',
      level: 'Level: Production Ready',
      duration: '42 Hours',
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
      codeSnippet: `// ⚡ V8 Event Loop Priority Demystified
console.log('1. Script Execution Starts');

setTimeout(() => console.log('5. MacroTask: setTimeout (Timer Queue)'), 0);

queueMicrotask(() => console.log('3. MicroTask: queueMicrotask queue'));

Promise.resolve().then(() => {
  console.log('4. MicroTask: Promise.then (Microtask Drain)');
});

console.log('2. Synchronous Call Stack Cleared');
// Execution Order: 1 -> 2 -> 3 -> 4 -> 5`
    },
    {
      id: 'typescript',
      tabName: 'TypeScript',
      category: 'frontend',
      categoryBadge: 'CLIENT TIER // TYPE SYSTEM',
      tier: 'Client Tier',
      icon: 'fa-solid fa-code text-sky-600',
      tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
      title: 'TypeScript (Strict Typing, Generics, Utility Types, Ambient Declarations)',
      level: 'Level: Production Ready',
      duration: '38 Hours',
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
      tabName: 'React 19 / SSR',
      category: 'frontend',
      categoryBadge: 'CLIENT TIER // REACTIVE UI',
      tier: 'Client Tier',
      icon: 'fa-brands fa-react text-cyan-600',
      tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      title: 'React (Component Lifecycle, Custom Hooks, State Machines, Next.js / Modern SSR)',
      level: 'Level: Production Ready',
      duration: '48 Hours',
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
      tabName: 'PHP 8.x',
      category: 'backend',
      categoryBadge: 'SERVER TIER // ENTERPRISE BACKEND',
      tier: 'Server Tier',
      icon: 'fa-brands fa-php text-indigo-600',
      tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: 'PHP (PHP 8.x modern OOP, PSR standards, Composer, Custom MVC & Theme Architecture)',
      level: 'Level: Production Ready',
      duration: '40 Hours',
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
      tabName: '.NET / C#',
      category: 'backend',
      categoryBadge: 'SERVER TIER // ENTERPRISE SERVICES',
      tier: 'Server Tier',
      icon: 'fa-brands fa-windows text-blue-600',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '.NET / C# (ASP.NET Core Web APIs, Entity Framework Core, Dependency Injection, Middleware)',
      level: 'Level: Production Ready',
      duration: '52 Hours',
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
      tabName: 'DNS & Protocols',
      category: 'infrastructure',
      categoryBadge: 'INFRASTRUCTURE // NETWORK LAYER',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-network-wired text-emerald-600',
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'DNS (Nameservers, A/AAAA/CNAME/MX/TXT records, Propagation, TTL, SSL/TLS handshake)',
      level: 'Level: Production Ready',
      duration: '26 Hours',
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
      tabName: 'Web Hosting & DevOps',
      category: 'infrastructure',
      categoryBadge: 'INFRASTRUCTURE // CLOUD & OPS',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-server text-purple-600',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: 'Web Hosting & DevOps (Linux/Nginx configuration, Apache vhosts, Docker containers, CI/CD pipelines, SSL provisioning)',
      level: 'Level: Production Ready',
      duration: '50 Hours',
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
  // 2. SOUND EFFECTS (CLEAN OS CLICKS)
  // ═══════════════════════════════════════════════════════════════════
  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }

  function playOsClick(freq = 600, duration = 0.04) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
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
  let currentInnerTab = 'overview'; // 'overview', 'syllabus', 'code', 'sandbox'
  let currentViewMode = 'tabbed'; // 'tabbed' or 'grid'
  let activeSearchQuery = '';

  // ═══════════════════════════════════════════════════════════════════
  // 4. RENDERERS
  // ═══════════════════════════════════════════════════════════════════

  // Render the horizontal track tab buttons
  function renderTrackTabs() {
    const tabsContainer = document.getElementById('osTrackTabsContainer');
    if (!tabsContainer) return;

    const filtered = MODULES_DATA.filter((m) => {
      if (!activeSearchQuery) return true;
      const q = activeSearchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        m.competencies.some((c) => c.toLowerCase().includes(q))
      );
    });

    let html = filtered
      .map((mod) => {
        const isActive = currentViewMode === 'tabbed' && currentActiveTrackId === mod.id;
        return `
          <button 
            type="button" 
            class="os-track-tab-btn ${isActive ? 'active' : ''}" 
            data-track-id="${mod.id}">
            <i class="${mod.icon}"></i>
            <span>${mod.tabName}</span>
          </button>
        `;
      })
      .join('');

    // Also include "Browse All (Grid)" tab
    const isGridActive = currentViewMode === 'grid';
    html += `
      <button 
        type="button" 
        class="os-track-tab-btn ${isGridActive ? 'active' : ''}" 
        data-view="grid">
        <i class="fa-solid fa-table-cells text-slate-300"></i>
        <span>Directory Grid (All 7)</span>
      </button>
    `;

    tabsContainer.innerHTML = html;

    // Attach listeners
    tabsContainer.querySelectorAll('.os-track-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playOsClick(700, 0.03);
        const view = btn.getAttribute('data-view');
        if (view === 'grid') {
          currentViewMode = 'grid';
        } else {
          currentViewMode = 'tabbed';
          currentActiveTrackId = btn.getAttribute('data-track-id');
        }
        renderMainView();
        renderTrackTabs();
      });
    });
  }

  // Render the Tabbed White Card for the selected track
  function renderActiveTabbedCard() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const mod = MODULES_DATA.find((m) => m.id === currentActiveTrackId) || MODULES_DATA[0];

    const competenciesHtml = mod.competencies
      .map((c) => `<span class="os-pill-tag"><i class="fa-solid fa-check text-[10px] text-sky-600"></i> ${c}</span>`)
      .join('');

    const syllabusHtml = mod.syllabus
      .map(
        (s, idx) => `
        <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3.5 hover:bg-slate-100/70 transition-colors">
          <div class="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-sky-700 shadow-xs shrink-0">
            0${idx + 1}
          </div>
          <div class="flex-1">
            <h4 class="font-['Outfit'] font-bold text-slate-900 text-sm md:text-base">${s.chapter}</h4>
            <p class="text-xs md:text-sm text-slate-600 mt-0.5 leading-relaxed">${s.desc}</p>
          </div>
          <span class="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200 shrink-0">
            Active
          </span>
        </div>
      `
      )
      .join('');

    container.innerHTML = `
      <div class="os-white-card p-6 md:p-9 shadow-2xl">
        
        <!-- White Card OS Titlebar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
              <span class="os-window-dot os-dot-red"></span>
              <span class="os-window-dot os-dot-yellow"></span>
              <span class="os-window-dot os-dot-green"></span>
            </div>
            <span class="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${mod.tagColor} border">
              ${mod.categoryBadge}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-mono bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-full border border-slate-200">
              <i class="fa-regular fa-clock mr-1 text-slate-500"></i> ${mod.duration}
            </span>
            <span class="text-xs font-mono bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full border border-emerald-200">
              ${mod.level}
            </span>
          </div>
        </div>

        <!-- Main Title & Summary -->
        <div class="flex items-start gap-4 mb-6">
          <div class="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-3xl shadow-sm shrink-0">
            <i class="${mod.icon}"></i>
          </div>
          <div>
            <h2 class="font-['Outfit'] font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight leading-snug">
              ${mod.title}
            </h2>
            <p class="text-sm md:text-base text-slate-600 mt-1.5 leading-relaxed max-w-4xl">
              ${mod.summary}
            </p>
          </div>
        </div>

        <!-- Inner White Card Tab Navigation -->
        <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 mb-6 overflow-x-auto">
          <button type="button" class="os-sub-tab-btn ${currentInnerTab === 'overview' ? 'active' : ''}" data-sub-tab="overview">
            <i class="fa-solid fa-compass mr-1.5"></i> Overview &amp; Competencies
          </button>
          <button type="button" class="os-sub-tab-btn ${currentInnerTab === 'syllabus' ? 'active' : ''}" data-sub-tab="syllabus">
            <i class="fa-solid fa-list-check mr-1.5"></i> Curriculum Syllabus (4 Chapters)
          </button>
          <button type="button" class="os-sub-tab-btn ${currentInnerTab === 'code' ? 'active' : ''}" data-sub-tab="code">
            <i class="fa-solid fa-code mr-1.5"></i> Architecture Code Artifact
          </button>
          <button type="button" class="os-sub-tab-btn ${currentInnerTab === 'sandbox' ? 'active' : ''}" data-sub-tab="sandbox">
            <i class="fa-solid fa-play mr-1.5"></i> Runtime Sandbox Simulation
          </button>
        </div>

        <!-- Tab 1: Overview & Competencies -->
        <div id="subTabContent-overview" class="${currentInnerTab === 'overview' ? 'block' : 'hidden'} space-y-6">
          <div>
            <h3 class="font-['Outfit'] font-bold text-slate-900 text-lg mb-3 flex items-center gap-2">
              <i class="fa-solid fa-microchip text-sky-600"></i> Core Architectural Competencies
            </h3>
            <div class="flex flex-wrap gap-2.5">
              ${competenciesHtml}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div class="font-mono text-xs text-slate-500 uppercase font-semibold">ENGINEERING TIER</div>
              <div class="font-['Outfit'] font-bold text-slate-900 text-lg mt-0.5">${mod.tier}</div>
              <div class="text-xs text-slate-600 mt-1">Holistic integration into enterprise distributed architecture.</div>
            </div>
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div class="font-mono text-xs text-slate-500 uppercase font-semibold">EXECUTION PARADIGM</div>
              <div class="font-['Outfit'] font-bold text-slate-900 text-lg mt-0.5">Production Standard</div>
              <div class="text-xs text-slate-600 mt-1">Validated against high-throughput zero-downtime benchmarks.</div>
            </div>
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div class="font-mono text-xs text-slate-500 uppercase font-semibold">CERTIFICATION CREDENTIAL</div>
              <div class="font-['Outfit'] font-bold text-slate-900 text-lg mt-0.5">Accredited</div>
              <div class="text-xs text-slate-600 mt-1">Full chapter mastery verified upon sandbox execution.</div>
            </div>
          </div>
        </div>

        <!-- Tab 2: Syllabus Breakdown -->
        <div id="subTabContent-syllabus" class="${currentInnerTab === 'syllabus' ? 'block' : 'hidden'} space-y-3">
          <h3 class="font-['Outfit'] font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
            <i class="fa-solid fa-graduation-cap text-sky-600"></i> Chapter-by-Chapter Curriculum
          </h3>
          <div class="space-y-2.5">
            ${syllabusHtml}
          </div>
        </div>

        <!-- Tab 3: Code Artifact -->
        <div id="subTabContent-code" class="${currentInnerTab === 'code' ? 'block' : 'hidden'} space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-['Outfit'] font-bold text-slate-900 text-lg flex items-center gap-2">
              <i class="fa-solid fa-file-code text-sky-600"></i> Production Code Snippet
            </h3>
            <button 
              id="copyCodeBtn" 
              type="button" 
              class="os-btn-secondary text-xs py-1.5 px-3">
              <i class="fa-regular fa-copy"></i> Copy Snippet
            </button>
          </div>
          <div class="os-terminal-box overflow-x-auto">
            <pre><code id="activeCodeSnippetText">${mod.codeSnippet}</code></pre>
          </div>
        </div>

        <!-- Tab 4: Interactive Sandbox Simulation -->
        <div id="subTabContent-sandbox" class="${currentInnerTab === 'sandbox' ? 'block' : 'hidden'} space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="font-['Outfit'] font-bold text-slate-900 text-lg flex items-center gap-2">
                <i class="fa-solid fa-terminal text-sky-600"></i> Cloud Runtime Simulator
              </h3>
              <p class="text-xs text-slate-600 mt-0.5">
                Simulate environment bootstrap, strict validation tests, and runtime telemetry.
              </p>
            </div>
            <button 
              id="runModuleSandboxBtn" 
              type="button" 
              class="os-btn-primary">
              <i class="fa-solid fa-bolt"></i> Execute Simulation
            </button>
          </div>

          <!-- Progress Bar -->
          <div class="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div id="sandboxProgressBar" class="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 rounded-full" style="width: 0%;"></div>
          </div>

          <!-- Output Terminal -->
          <div class="os-terminal-box space-y-1.5 max-h-56 overflow-y-auto" id="sandboxTerminalOutput">
            <div class="text-slate-400 text-xs">
              <span class="text-sky-400">[READY]</span> Click "Execute Simulation" to bootstrap runtime container for ${mod.tabName}.
            </div>
          </div>
        </div>

      </div>
    `;

    // Attach sub-tab event listeners
    container.querySelectorAll('.os-sub-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        playOsClick(800, 0.03);
        currentInnerTab = btn.getAttribute('data-sub-tab');
        renderActiveTabbedCard();
      });
    });

    // Copy code button
    const copyBtn = document.getElementById('copyCodeBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = document.getElementById('activeCodeSnippetText')?.textContent;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            playOsClick(1200, 0.05);
            copyBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-600"></i> Copied!`;
            setTimeout(() => {
              copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Snippet`;
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
        m.competencies.some((c) => c.toLowerCase().includes(q))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="os-white-card p-12 text-center max-w-xl mx-auto">
          <div class="w-14 h-14 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-3">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 class="font-['Outfit'] font-bold text-xl text-slate-900 mb-1">No Modules Match Your Query</h3>
          <p class="text-sm text-slate-600 mb-4">Clear or adjust your search filter to see available curriculum tracks.</p>
          <button id="clearSearchFromEmptyBtn" type="button" class="os-btn-primary">
            Clear Search Filter
          </button>
        </div>
      `;
      document.getElementById('clearSearchFromEmptyBtn')?.addEventListener('click', () => {
        const input = document.getElementById('osGlobalSearchInput');
        if (input) input.value = '';
        activeSearchQuery = '';
        renderTrackTabs();
        renderMainView();
      });
      return;
    }

    const cardsHtml = filtered
      .map((mod) => {
        const pills = mod.competencies
          .slice(0, 3)
          .map((c) => `<span class="os-pill-tag text-[11px] py-1 px-2.5">${c}</span>`)
          .join('');

        return `
          <div class="os-white-card p-6 flex flex-col justify-between cursor-pointer group" data-card-track-id="${mod.id}">
            <div>
              <!-- Window top header -->
              <div class="flex items-center justify-between mb-4">
                <span class="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${mod.tagColor} border">
                  ${mod.tier}
                </span>
                <span class="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  ${mod.duration}
                </span>
              </div>

              <!-- Title & Icon -->
              <div class="flex items-start gap-3.5 mb-3">
                <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <i class="${mod.icon}"></i>
                </div>
                <div>
                  <h3 class="font-['Outfit'] font-bold text-lg text-slate-900 leading-snug group-hover:text-sky-600 transition-colors">
                    ${mod.tabName}
                  </h3>
                  <div class="text-xs text-emerald-600 font-semibold font-mono mt-0.5">
                    ${mod.level}
                  </div>
                </div>
              </div>

              <!-- Summary -->
              <p class="text-xs md:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                ${mod.summary}
              </p>

              <!-- Competencies -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                ${pills}
              </div>
            </div>

            <!-- Action Button -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span class="text-xs font-mono text-slate-400">4 Chapters</span>
              <button type="button" class="os-btn-primary text-xs py-1.5 px-3 select-track-btn" data-track="${mod.id}">
                <span>Open Tab</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    `;

    // Click handler on cards
    container.querySelectorAll('[data-card-track-id]').forEach((card) => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-card-track-id');
        currentActiveTrackId = id;
        currentViewMode = 'tabbed';
        playOsClick(700, 0.03);
        renderTrackTabs();
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
    playOsClick(900, 0.04);
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
      { pct: 25, delay: 200, text: `BOOTSTRAP: Initializing isolated cloud container for [${mod.categoryBadge}]` },
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
        line.innerHTML = `<span class="text-slate-500">[${time}]</span> <span class="text-sky-400">SYS &gt;&gt;</span> ${s.text}`;
        term.appendChild(line);
        term.scrollTop = term.scrollHeight;
        playOsClick(700 + idx * 100, 0.02);

        if (idx === steps.length - 1 && runBtn) {
          runBtn.disabled = false;
          runBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Simulation Complete`;
          setTimeout(() => {
            runBtn.innerHTML = `<i class="fa-solid fa-bolt"></i> Execute Simulation`;
          }, 3000);
        }
      }, s.delay);
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. EXECUTIVE ARCHITECTURE PACKET TRACER
  // ═══════════════════════════════════════════════════════════════════
  function initArchitectureSimulator() {
    const traceBtn = document.getElementById('execArchTraceBtn');
    const logOutput = document.getElementById('execArchLogOutput');
    const tierClient = document.getElementById('execTierClient');
    const tierServer = document.getElementById('execTierServer');
    const tierInfra = document.getElementById('execTierInfra');

    if (!traceBtn || !logOutput) return;

    traceBtn.addEventListener('click', () => {
      playOsClick(800, 0.03);
      traceBtn.disabled = true;
      traceBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1.5"></i> Tracing Stack Dispatch...`;
      logOutput.innerHTML = '';

      const traceEvents = [
        {
          target: tierInfra,
          delay: 200,
          text: 'PHASE 1 [INFRASTRUCTURE]: DNS Query dispatched to Anycast nameserver (8.2ms). TLS 1.3 negotiated via Nginx.'
        },
        {
          target: tierServer,
          delay: 750,
          text: 'PHASE 2 [SERVER TIER]: Nginx routes to Kestrel ASP.NET Core 9 / PHP 8.3. EF Core query completes in 1.4ms.'
        },
        {
          target: tierClient,
          delay: 1300,
          text: 'PHASE 3 [CLIENT TIER]: React 19 Fiber tree reconciles state. TypeScript validated payload hydrated with 0 frame drops.'
        }
      ];

      traceEvents.forEach((ev, idx) => {
        setTimeout(() => {
          if (ev.target) {
            ev.target.classList.add('ring-2', 'ring-sky-400');
            setTimeout(() => ev.target.classList.remove('ring-2', 'ring-sky-400'), 600);
          }

          const line = document.createElement('div');
          line.className = 'text-xs font-mono text-slate-200 py-0.5';
          const time = new Date().toLocaleTimeString();
          line.innerHTML = `<span class="text-slate-500">[${time}]</span> <span class="text-sky-400">TRACE &gt;&gt;</span> ${ev.text}`;
          logOutput.appendChild(line);
          logOutput.scrollTop = logOutput.scrollHeight;
          playOsClick(600 + idx * 120, 0.02);

          if (idx === traceEvents.length - 1) {
            setTimeout(() => {
              traceBtn.disabled = false;
              traceBtn.innerHTML = `<i class="fa-solid fa-play text-sky-400 mr-1.5"></i> Trace Stack Dispatch`;
            }, 400);
          }
        }, ev.delay);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 7. OS CLOCK & SEARCH
  // ═══════════════════════════════════════════════════════════════════
  function initOsClock() {
    const clockEl = document.getElementById('osMenuClock');
    if (!clockEl) return;
    function tick() {
      const now = new Date();
      clockEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
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
    renderTrackTabs();
    renderMainView();
    initArchitectureSimulator();

    // Global Search Bar
    const searchInput = document.getElementById('osGlobalSearchInput');
    const clearSearchBtn = document.getElementById('osClearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        activeSearchQuery = e.target.value.trim();
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('hidden', !activeSearchQuery);
        }
        renderTrackTabs();
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
        renderTrackTabs();
        renderMainView();
      });
    }

    // Audio Mute Toggle
    const audioBtn = document.getElementById('osAudioToggleBtn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        initAudio();
        soundEnabled = !soundEnabled;
        audioBtn.innerHTML = soundEnabled
          ? `<i class="fa-solid fa-volume-high text-sky-400"></i>`
          : `<i class="fa-solid fa-volume-xmark text-slate-500"></i>`;
        if (soundEnabled) playOsClick(900, 0.04);
      });
    }
  });
})();
