/**
 * ENGINEERING KNOWLEDGE MATRIX — INTERACTIVE ENGINE
 * Futuristic Sci-Fi HUD / Cybernetic Directory Logic
 * Audio Synthesis, Canvas Particle Grid, Filtering, and Architecture Simulation
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. MODULE REPOSITORY DATA (7 CORE TRACKS)
  // ═══════════════════════════════════════════════════════════════════
  const MODULES_DATA = [
    {
      id: 'javascript',
      category: 'frontend',
      categoryBadge: 'CLIENT_TIER // JAVASCRIPT',
      tier: 'Client Tier',
      icon: 'fa-brands fa-js text-yellow-400',
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
// Order: 1 -> 2 -> 3 -> 4 -> 5`
    },
    {
      id: 'typescript',
      category: 'frontend',
      categoryBadge: 'CLIENT_TIER // TYPE_SYSTEM',
      tier: 'Client Tier',
      icon: 'fa-solid fa-code text-cyan-400',
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
      category: 'frontend',
      categoryBadge: 'CLIENT_TIER // REACTIVE_UI',
      tier: 'Client Tier',
      icon: 'fa-brands fa-react text-sky-400',
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
      // Yield to main thread for non-blocking rendering
      startTransition(() => setData(payload));
    };
    return () => sse.close();
  }, [sourceUrl]);

  return { data, isPending };
}`
    },
    {
      id: 'php',
      category: 'backend',
      categoryBadge: 'SERVER_TIER // ENTERPRISE_BACKEND',
      tier: 'Server Tier',
      icon: 'fa-brands fa-php text-indigo-400',
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
      category: 'backend',
      categoryBadge: 'SERVER_TIER // ENTERPRISE_SERVICES',
      tier: 'Server Tier',
      icon: 'fa-brands fa-windows text-blue-400',
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
      category: 'infrastructure',
      categoryBadge: 'INFRASTRUCTURE // NETWORK_LAYER',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-network-wired text-emerald-400',
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
      category: 'infrastructure',
      categoryBadge: 'INFRASTRUCTURE // CLOUD_CONTAINERS',
      tier: 'Infrastructure',
      icon: 'fa-solid fa-server text-purple-400',
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
  // 2. CYBERNETIC WEB AUDIO SYNTHESIZER (NO EXTERNAL FILES REQUIRED)
  // ═══════════════════════════════════════════════════════════════════
  let audioCtx = null;
  let soundEnabled = true;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playCyberTone(freq1, freq2, type = 'sine', duration = 0.05, gainValue = 0.06) {
    if (!soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq1, audioCtx.currentTime);
      if (freq2) {
        osc.frequency.exponentialRampToValueAtTime(freq2, audioCtx.currentTime + duration);
      }

      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy or device restriction
    }
  }

  const SoundFX = {
    hover: () => playCyberTone(1200, 1600, 'sine', 0.035, 0.03),
    click: () => playCyberTone(600, 2400, 'triangle', 0.05, 0.07),
    filter: () => playCyberTone(450, 900, 'sine', 0.06, 0.06),
    openModal: () => {
      playCyberTone(240, 880, 'sawtooth', 0.12, 0.05);
      setTimeout(() => playCyberTone(880, 1760, 'sine', 0.08, 0.04), 60);
    },
    success: () => {
      playCyberTone(523.25, 659.25, 'triangle', 0.08, 0.06);
      setTimeout(() => playCyberTone(659.25, 783.99, 'triangle', 0.08, 0.06), 70);
      setTimeout(() => playCyberTone(783.99, 1046.50, 'triangle', 0.12, 0.08), 140);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // 3. BACKGROUND CANVAS CYBER-GRID ANIMATION
  // ═══════════════════════════════════════════════════════════════════
  function initCyberGrid() {
    const canvas = document.getElementById('cyberGridCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Floating data nodes
    const nodeCount = 38;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    let scanY = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      // 1. Isometric Grid Lines
      const gridSize = 64;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Moving Laser Scan Bar
      scanY += 1.2;
      if (scanY > height) scanY = 0;
      const grad = ctx.createLinearGradient(0, scanY - 30, 0, scanY);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      grad.addColorStop(1, 'rgba(0, 240, 255, 0.08)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 30, width, 30);

      // 3. Floating Circuit Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        // Draw connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 240, 255, ${0.4 + glow * 0.4})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Mouse proximity link
        const mdx = n.x - mouseX;
        const mdy = n.y - mouseY;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 160) {
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.35 * (1 - mDist / 160)})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  // ═══════════════════════════════════════════════════════════════════
  // 4. DIRECTORY RENDERING & INTERACTIVE FILTERING
  // ═══════════════════════════════════════════════════════════════════
  let activeFilter = 'all';
  let searchQuery = '';

  function renderModuleCards() {
    const grid = document.getElementById('modulesGrid');
    const counterBadge = document.getElementById('activeNodesCounter');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    // Filter data
    const query = searchQuery.toLowerCase().trim();
    const filtered = MODULES_DATA.filter((mod) => {
      const matchesCategory = activeFilter === 'all' || mod.category === activeFilter;
      const matchesSearch =
        !query ||
        mod.title.toLowerCase().includes(query) ||
        mod.summary.toLowerCase().includes(query) ||
        mod.categoryBadge.toLowerCase().includes(query) ||
        mod.competencies.some((c) => c.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });

    if (counterBadge) {
      counterBadge.textContent = `[ MATCHING MODULES: ${filtered.length} / ${MODULES_DATA.length} ]`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    grid.innerHTML = filtered
      .map((mod) => {
        // Highlighting query helper
        const highlight = (text) => {
          if (!query) return text;
          const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
          return text.replace(regex, '<mark class="bg-cyan-500/30 text-cyan-200 px-1 rounded-sm">$1</mark>');
        };

        const pillsHtml = mod.competencies
          .map(
            (c) =>
              `<span class="competency-pill hud-chamfer-tag">${highlight(c)}</span>`
          )
          .join('');

        return `
          <article class="hud-panel hud-chamfer hud-bracketed flex flex-col justify-between p-6 rounded-none relative group" data-module-id="${mod.id}">
            <!-- Top Category & Level Bar -->
            <div>
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="hud-beacon beacon-cyan"></span>
                  <span class="font-mono text-xs text-cyan-400 font-semibold tracking-wider">
                    [${highlight(mod.categoryBadge)}]
                  </span>
                </div>
                <span class="font-mono text-[11px] bg-slate-900/90 text-cyan-300/80 px-2.5 py-0.5 border border-cyan-500/20 hud-chamfer-tag">
                  ${mod.duration}
                </span>
              </div>

              <!-- Module Title & Icon -->
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 shrink-0 bg-slate-950/80 border border-cyan-500/30 flex items-center justify-center text-xl hud-chamfer-sm group-hover:border-cyan-400 transition-colors">
                  <i class="${mod.icon}"></i>
                </div>
                <div>
                  <h3 class="font-['Rajdhani'] font-bold text-xl text-white tracking-wide leading-tight group-hover:text-cyan-300 transition-colors">
                    ${highlight(mod.title)}
                  </h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="font-mono text-[11px] text-emerald-400 font-medium">
                      <i class="fa-solid fa-circle-check text-[9px] mr-1"></i>${mod.level}
                    </span>
                    <span class="text-slate-600 font-mono text-xs">•</span>
                    <span class="font-mono text-[11px] text-slate-400">
                      Tier: ${mod.tier}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Summary Description -->
              <p class="text-sm text-slate-300 leading-relaxed mb-5 font-['Inter'] line-clamp-3">
                ${highlight(mod.summary)}
              </p>

              <!-- Competencies Pills -->
              <div class="mb-6">
                <div class="font-mono text-[10px] text-cyan-400/80 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <i class="fa-solid fa-microchip text-[9px]"></i> CORE COMPETENCIES:
                </div>
                <div class="flex flex-wrap gap-1.5">
                  ${pillsHtml}
                </div>
              </div>
            </div>

            <!-- Card Bottom Action Terminal -->
            <div class="pt-4 border-t border-cyan-500/15 flex items-center justify-between gap-3">
              <span class="font-mono text-[11px] text-slate-400 hidden sm:inline-block">
                STATUS: READY
              </span>
              <button 
                type="button" 
                class="btn-cyber-primary hud-chamfer-btn px-4 py-2.5 text-xs flex items-center gap-2 w-full sm:w-auto justify-center init-module-btn"
                data-id="${mod.id}"
                aria-label="Initialize Module ${mod.title}">
                <span>INITIALIZE MODULE</span>
                <i class="fa-solid fa-arrow-right text-[11px] transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
          </article>
        `;
      })
      .join('');

    // Attach click listeners to cards
    grid.querySelectorAll('.init-module-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        SoundFX.openModal();
        openModuleModal(id);
      });
      btn.addEventListener('mouseenter', () => SoundFX.hover());
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 5. CYBERNETIC MODULE INSPECTION MODAL (<dialog>)
  // ═══════════════════════════════════════════════════════════════════
  const modal = document.getElementById('moduleModal');
  let currentActiveModule = null;

  function openModuleModal(moduleId) {
    const mod = MODULES_DATA.find((m) => m.id === moduleId);
    if (!mod || !modal) return;
    currentActiveModule = mod;

    document.getElementById('modalCategoryBadge').textContent = `[ ${mod.categoryBadge} ]`;
    document.getElementById('modalTitle').textContent = mod.title;
    document.getElementById('modalLevel').textContent = `${mod.level} // ${mod.duration}`;
    document.getElementById('modalSummary').textContent = mod.summary;

    // Syllabus chapters
    const syllabusList = document.getElementById('modalSyllabusList');
    syllabusList.innerHTML = mod.syllabus
      .map(
        (s) => `
        <div class="p-3 bg-slate-950/70 border border-cyan-500/20 hud-chamfer-sm">
          <div class="font-['Rajdhani'] font-bold text-cyan-300 text-sm tracking-wide">
            ${s.chapter}
          </div>
          <div class="text-xs text-slate-300 mt-0.5 font-['Inter']">
            ${s.desc}
          </div>
        </div>
      `
      )
      .join('');

    // Code Snippet
    const codeEl = document.getElementById('modalCodeSnippet');
    if (codeEl) {
      codeEl.textContent = mod.codeSnippet;
    }

    // Reset runtime simulation view
    const simBox = document.getElementById('runtimeSimulationOutput');
    if (simBox) simBox.classList.add('hidden');
    const simBar = document.getElementById('simProgressBar');
    if (simBar) simBar.style.width = '0%';

    modal.showModal();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modal && modal.open) {
      modal.close();
      document.body.style.overflow = '';
      SoundFX.click();
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. RUNTIME SIMULATION STREAM IN MODAL
  // ═══════════════════════════════════════════════════════════════════
  function executeSimulation() {
    if (!currentActiveModule) return;
    SoundFX.click();

    const simBox = document.getElementById('runtimeSimulationOutput');
    const simBar = document.getElementById('simProgressBar');
    const simLogs = document.getElementById('simTerminalLogs');
    const simStatusText = document.getElementById('simStatusText');
    if (!simBox || !simBar || !simLogs) return;

    simBox.classList.remove('hidden');
    simLogs.innerHTML = '';
    simBar.style.width = '0%';
    simStatusText.textContent = 'ALLOCATING QUANTUM ENVIRONMENT...';

    const steps = [
      { pct: 20, delay: 200, msg: `BOOTSTRAP: Initializing runtime container sandbox for [${currentActiveModule.categoryBadge}]` },
      { pct: 45, delay: 550, msg: `COMPILER: AST validation passed. Type soundess score: 100% (Strict Soundness Verified)` },
      { pct: 75, delay: 900, msg: `NETWORKING: Establishing TLS 1.3 socket to Kestrel / V8 telemetry cluster` },
      { pct: 100, delay: 1300, msg: `SYSTEM READY: Engineering sandbox operational. All 4 chapters unlocked for execution.` }
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        simBar.style.width = `${step.pct}%`;
        const line = document.createElement('div');
        line.className = 'terminal-stream-line text-xs';
        const now = new Date().toISOString().split('T')[1].slice(0, 12);
        line.innerHTML = `<span class="ts">[${now}]</span> <span class="prefix">SYS_EXEC >></span> <span class="msg">${step.msg}</span>`;
        simLogs.appendChild(line);
        simLogs.scrollTop = simLogs.scrollHeight;
        SoundFX.hover();

        if (step.pct === 100) {
          simStatusText.textContent = 'SIMULATION COMPLETE // READY FOR TRAINING';
          SoundFX.success();
        }
      }, step.delay);
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 7. HOLISTIC STACK ARCHITECTURE PACKET TRACER
  // ═══════════════════════════════════════════════════════════════════
  function initArchitectureSimulator() {
    const traceBtn = document.getElementById('simulateArchTraceBtn');
    const logOutput = document.getElementById('archTerminalOutput');
    const tierClient = document.getElementById('tierClientBox');
    const tierServer = document.getElementById('tierServerBox');
    const tierInfra = document.getElementById('tierInfraBox');

    if (!traceBtn || !logOutput) return;

    traceBtn.addEventListener('click', () => {
      SoundFX.click();
      traceBtn.disabled = true;
      traceBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> TRACING DATA PACKET...`;

      logOutput.innerHTML = '';

      const traceEvents = [
        {
          target: tierInfra,
          delay: 200,
          text: 'PHASE 1 [INFRASTRUCTURE]: DNS Query dispatched to authoritative nameserver. Resolved CNAME -> Anycast IP in 8.4ms. TLS 1.3 handshake negotiated with Nginx reverse proxy.'
        },
        {
          target: tierServer,
          delay: 800,
          text: 'PHASE 2 [SERVER TIER]: Nginx forwards request to Kestrel (ASP.NET Core 9 / PHP 8.3 FPM). Scoped DI container resolves controller. EF Core 9 compiled query returns JSON payload in 1.9ms.'
        },
        {
          target: tierClient,
          delay: 1400,
          text: 'PHASE 3 [CLIENT TIER]: React 19 Fiber tree receives stream. Custom TypeScript hook validates payload schema. High-performance concurrent reconciliation executes DOM patch with 0 frame drops.'
        }
      ];

      traceEvents.forEach((ev, idx) => {
        setTimeout(() => {
          // Pulse tier box
          if (ev.target) {
            ev.target.classList.add('active-pulse');
            setTimeout(() => ev.target.classList.remove('active-pulse'), 700);
          }

          const line = document.createElement('div');
          line.className = 'terminal-stream-line text-xs py-0.5';
          const time = new Date().toISOString().split('T')[1].slice(0, 11);
          line.innerHTML = `<span class="ts">[${time}]</span> <span class="prefix">ROUTE_TRACE >></span> <span class="msg">${ev.text}</span>`;
          logOutput.appendChild(line);
          logOutput.scrollTop = logOutput.scrollHeight;
          SoundFX.hover();

          if (idx === traceEvents.length - 1) {
            setTimeout(() => {
              traceBtn.disabled = false;
              traceBtn.innerHTML = `<i class="fa-solid fa-play text-cyan-400 mr-2"></i> SIMULATE PACKET DISPATCH FLOW`;
              SoundFX.success();
            }, 500);
          }
        }, ev.delay);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════
  // 8. TELEMETRY CLOCK & HARDWARE SENSORS JITTER
  // ═══════════════════════════════════════════════════════════════════
  function initTelemetryClock() {
    const clockEl = document.getElementById('hudTelemetryClock');
    const cpuFreqEl = document.getElementById('hudCpuFreq');

    function update() {
      if (clockEl) {
        const now = new Date();
        const utcStr = now.toISOString().replace('T', ' // ').slice(0, 22) + ' UTC';
        clockEl.textContent = utcStr;
      }
      if (cpuFreqEl) {
        // Random micro-jitter for futuristic realism
        const base = 3.84;
        const jitter = (Math.random() * 0.08 - 0.04).toFixed(2);
        const freq = (base + parseFloat(jitter)).toFixed(2);
        cpuFreqEl.textContent = `${freq} GHz`;
      }
    }

    update();
    setInterval(update, 1000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 9. EVENT LISTENERS & INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Canvas background
    initCyberGrid();

    // 2. Initial card render
    renderModuleCards();

    // 3. Telemetry Clock
    initTelemetryClock();

    // 4. Architecture Simulator
    initArchitectureSimulator();

    // 5. Search Bar input
    const searchInput = document.getElementById('globalSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (clearSearchBtn) {
          if (searchQuery.length > 0) {
            clearSearchBtn.classList.remove('hidden');
          } else {
            clearSearchBtn.classList.add('hidden');
          }
        }
        renderModuleCards();
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.add('hidden');
        searchInput.focus();
        SoundFX.click();
        renderModuleCards();
      });
    }

    // 6. Filter Chips
    const filterButtons = document.querySelectorAll('.hud-filter-chip');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        SoundFX.filter();
        renderModuleCards();
      });
      btn.addEventListener('mouseenter', () => SoundFX.hover());
    });

    // 7. Reset filters button (in empty state)
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        activeFilter = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
        filterButtons.forEach((b) => {
          if (b.getAttribute('data-filter') === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
        SoundFX.click();
        renderModuleCards();
      });
    }

    // 8. Audio Toggle Button
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioStatusText = document.getElementById('audioStatusText');
    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        initAudioContext();
        soundEnabled = !soundEnabled;
        if (audioStatusText) {
          audioStatusText.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED';
        }
        audioToggleBtn.classList.toggle('border-cyan-400', soundEnabled);
        audioToggleBtn.classList.toggle('text-cyan-300', soundEnabled);
        audioToggleBtn.classList.toggle('text-slate-500', !soundEnabled);
        if (soundEnabled) SoundFX.success();
      });
    }

    // 9. Modal Interactions
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        const rect = modal.getBoundingClientRect();
        const isInDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width;
        if (!isInDialog) {
          closeModal();
        }
      });
    }

    // 10. Copy Code Snippet
    const copyCodeBtn = document.getElementById('copyCodeSnippetBtn');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        const code = document.getElementById('modalCodeSnippet')?.textContent;
        if (code) {
          navigator.clipboard.writeText(code).then(() => {
            SoundFX.click();
            const originalText = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = `<i class="fa-solid fa-check text-emerald-400 mr-1.5"></i> COPIED TO CLIPBOARD`;
            setTimeout(() => {
              copyCodeBtn.innerHTML = originalText;
            }, 2000);
          });
        }
      });
    }

    // 11. Execute Simulation Button in Modal
    const executeSimBtn = document.getElementById('executeSimBtn');
    if (executeSimBtn) {
      executeSimBtn.addEventListener('click', executeSimulation);
    }

    // 12. Keyboard Shortcuts: [Ctrl+K] / [/] to Search, [Esc] to Close
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== searchInput)) {
        e.preventDefault();
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
          SoundFX.hover();
        }
      } else if (e.key === 'Escape' && modal && modal.open) {
        closeModal();
      }
    });
  });
})();
