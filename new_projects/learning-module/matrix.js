/**
 * ENGINEERING KNOWLEDGE MATRIX — UNIQUE TECH OS ENGINE
 * Monospace Code Fonts, Font Awesome Icons, Crisp White Cards,
 * Interactive IDE Tabs, and 3x3 Progressive Curriculum Syllabuses
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. MODULE REPOSITORY DATA (7 CORE TRACKS WITH 3x3 SYLLABUS)
  // ═══════════════════════════════════════════════════════════════════
  const MODULES_DATA = [
  {
    "id": "javascript",
    "fileName": "js_engine.es6",
    "tabTitle": "js_engine.es6",
    "category": "frontend",
    "categoryBadge": "TIER.01 // CLIENT_JS",
    "tier": "Client Tier",
    "icon": "fa-brands fa-js text-amber-500",
    "badgeColor": "bg-amber-100 text-amber-900 border-amber-300",
    "title": "JavaScript (Modern ES6+, Async/Event Loop, DOM & Web APIs)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "42.0_HRS",
    "summary": "Deep-dive into modern V8 engine mechanics, event loop execution queues, microtasks vs macrotasks, prototypal inheritance, advanced asynchronous patterns, and high-performance Web APIs.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Execution Contexts, Hoisting & Lexical Scope",
        "desc": "Master the V8 execution context lifecycle (creation vs execution phases), lexical environments, variable hoisting rules, the temporal dead zone (TDZ), block scoping with let/const, and call stack frame management.",
        "keyConcepts": [
          "Call Stack Frames",
          "Temporal Dead Zone",
          "Lexical Environments"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Prototypal Inheritance & Object Prototypes",
        "desc": "Understand prototype chains (__proto__ vs prototype), constructor functions, class syntax desugaring, Object.create(), prototypal delegation, and mitigating prototype pollution security vectors.",
        "keyConcepts": [
          "Prototype Chain",
          "Object.create()",
          "Class Desugaring"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Asynchronous Foundations & Promises Architecture",
        "desc": "Transition from callback patterns to Promises. Grasp Promise state machines (pending, fulfilled, rejected), chaining, microtask queue scheduling, Promise.all vs Promise.allSettled vs Promise.race, and async/await syntax.",
        "keyConcepts": [
          "Promise State Machine",
          "Async/Await",
          "Promise Combinators"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "V8 Event Loop & Queue Scheduling Mechanics",
        "desc": "In-depth study of the browser event loop: Call Stack execution, Microtasks (Promise resolutions, queueMicrotask, MutationObserver) draining, Macrotasks (setTimeout, setImmediate, I/O), render frame intervals, and starvation avoidance.",
        "keyConcepts": [
          "Microtask Drain",
          "Macrotask Queue",
          "Render Timing"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Metaprogramming with Proxies & Reflect API",
        "desc": "Intercept core object operations using Proxy handlers and traps (get, set, has, apply, construct), paired with the Reflect API for reflection. Leverage unique Symbol keys and Well-Known Symbols (Symbol.iterator, Symbol.toPrimitive).",
        "keyConcepts": [
          "Proxy Traps",
          "Reflect API",
          "Well-Known Symbols"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "High-Throughput Web APIs & Stream Processing",
        "desc": "Harness performance-critical browser APIs: IntersectionObserver for lazy layout, ResizeObserver for responsive containers, BroadcastChannel for zero-latency cross-tab sync, Structured Clone algorithm, and Web Streams (ReadableStream/WritableStream).",
        "keyConcepts": [
          "IntersectionObserver",
          "BroadcastChannel",
          "Web Streams"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "V8 JIT Pipeline: Ignition, TurboFan & Hidden Classes",
        "desc": "Examine V8 internals: parsing ASTs, Ignition bytecode interpreter execution, TurboFan feedback vectors and speculative JIT compilation, Hidden Classes (Shapes), transition trees, Inline Caches (ICs), and avoiding catastrophic deoptimizations.",
        "keyConcepts": [
          "Ignition & TurboFan",
          "Hidden Shapes",
          "Inline Caches"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "Multithreading with Web Workers, SharedArrayBuffer & Atomics",
        "desc": "True multi-threaded JavaScript execution using dedicated/shared Web Workers, SharedArrayBuffer memory allocations, and synchronization primitives with Atomics (Atomics.wait, Atomics.notify, Atomics.compareExchange) for lock-free parallel data structures.",
        "keyConcepts": [
          "SharedArrayBuffer",
          "Atomics Concurrency",
          "Lock-Free Queues"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "Garbage Collection Internals & Memory Leak Profiling",
        "desc": "Low-level memory management: V8 generational heap architecture, Scavenger Minor GC (semi-spaces copying algorithm), Major Mark-Sweep-Compact GC, analyzing heap snapshots, allocation timelines, and weak references with WeakRef & FinalizationRegistry.",
        "keyConcepts": [
          "Minor/Major GC",
          "Heap Snapshots",
          "WeakRef & Memory Profiling"
        ]
      }
    ]
  },
  {
    "id": "typescript",
    "fileName": "ts_types.d.ts",
    "tabTitle": "ts_types.d.ts",
    "category": "frontend",
    "categoryBadge": "TIER.01 // STATIC_TYPES",
    "tier": "Client Tier",
    "icon": "fa-solid fa-code text-blue-600",
    "badgeColor": "bg-blue-100 text-blue-900 border-blue-300",
    "title": "TypeScript (Strict Typing, Generics, Utility Types, Ambient Declarations)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "38.0_HRS",
    "summary": "Master compile-time type safety with conditional types, template literal types, complex recursive generics, custom declaration files (.d.ts), and AST transformation workflows for large-scale codebases.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Static Type Foundations & Compiler Configuration",
        "desc": "Establish rock-solid static type fundamentals: primitive types, type annotations vs inference, union and intersection types, interfaces vs type aliases, and configuring strict compiler flags in tsconfig.json (noImplicitAny, strictNullChecks).",
        "keyConcepts": [
          "Strict tsconfig",
          "Union & Intersection",
          "Interfaces vs Types"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Function Signatures, Labeled Tuples & Type Guards",
        "desc": "Construct robust function overloads, optional and rest parameters, labeled tuple types, literal types, and deterministic control flow analysis using type narrowing guards (typeof, instanceof, in, and custom is type predicates).",
        "keyConcepts": [
          "Function Overloads",
          "Type Predicates",
          "Control Flow Narrowing"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Reusable Generics & Parameter Constraints",
        "desc": "Architect type-safe, reusable collection components and utility functions using generic parameters, extends constraints (T extends object), default type arguments, and keyof constraint lookups for dictionary data structures.",
        "keyConcepts": [
          "Generic Constraints",
          "keyof Indexing",
          "Reusable Type Factories"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "Conditional Types & Pattern Matching with 'infer'",
        "desc": "Implement type-level branching logic using conditional types (T extends U ? X : Y), distributive conditional types over naked type parameters, and unpacking nested types using the infer keyword (extracting ReturnType, Promise unwrap, and tuple tails).",
        "keyConcepts": [
          "Conditional Branching",
          "infer Keyword",
          "Distributive Types"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Mapped Types & Template Literal Remapping",
        "desc": "Engineer dynamic mapped types: iterating over keys with in keyof, property modifier toggling (-readonly, -?), template literal type manipulation, and key remapping with as clauses to generate type-safe event handler maps.",
        "keyConcepts": [
          "Mapped Types",
          "Template Literal Types",
          "Key Remapping (as)"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Recursive Types & Branded Nominal Type Systems",
        "desc": "Design deeply recursive data structures including DeepReadonly<T>, DeepPartial<T>, and JSON AST types. Implement nominal type safety via branded primitive wrappers (e.g. UserId vs OrderId) to prevent compile-time domain leakage.",
        "keyConcepts": [
          "DeepReadonly<T>",
          "Recursive AST Types",
          "Nominal Branded Types"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "Ambient Declarations & Library Definitions (.d.ts)",
        "desc": "Author production-grade ambient declaration packages (.d.ts): typing untyped legacy C/WASM libraries, global namespace augmentation (declare global), module augmentation for existing NPM packages, and UMD wrapper definitions.",
        "keyConcepts": [
          "Ambient .d.ts",
          "declare global",
          "Module Augmentation"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "TypeScript Compiler API & Custom AST Transformers",
        "desc": "Harness the internal TypeScript Compiler API (ts.createProgram, ts.TypeChecker): traversing and inspecting the Abstract Syntax Tree (AST), using visitor patterns, and building custom compile-time codegen transformers for build pipelines.",
        "keyConcepts": [
          "Compiler API",
          "AST Traversal",
          "Custom Transformers"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "Strict Soundness, Variance & Monorepo Scaling",
        "desc": "Master structural vs nominal subtyping, function parameter contravariance vs return covariance, tsconfig Project References (composite: true), declaration maps, path aliases, and diagnosing type-checker compiler performance bottlenecks.",
        "keyConcepts": [
          "Type Variance",
          "Project References",
          "Monorepo Compilation Tuning"
        ]
      }
    ]
  },
  {
    "id": "react",
    "fileName": "react_fiber.tsx",
    "tabTitle": "react_fiber.tsx",
    "category": "frontend",
    "categoryBadge": "TIER.01 // REACTIVE_UI",
    "tier": "Client Tier",
    "icon": "fa-brands fa-react text-sky-500",
    "badgeColor": "bg-sky-100 text-sky-900 border-sky-300",
    "title": "React (Component Lifecycle, Custom Hooks, State Machines, Next.js / Modern SSR)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "48.0_HRS",
    "summary": "Engineer deterministic enterprise interfaces with concurrent rendering, custom memoization hooks, finite state machines, Server Components (RSC), and hybrid Next.js SSR/SSG architectures.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Component Model, JSX & Virtual DOM Mechanics",
        "desc": "Understand the foundational mental model: component tree composition, JSX transpilations to createElement/_jsx, immutable props contracts, conditional rendering patterns, list reconciliation keys, and unidirectional data flow.",
        "keyConcepts": [
          "Component Composition",
          "Virtual DOM",
          "Reconciliation Keys"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Core Hooks Lifecycle & State Batching",
        "desc": "Master essential state and lifecycle hooks: useState asynchronous update batching, useEffect dependency array mechanics and cleanup handlers, useRef mutable memory containers, and resolving stale closure pitfalls.",
        "keyConcepts": [
          "useState Batching",
          "useEffect Cleanups",
          "useRef Persistence"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Synthetic Events, Controlled UI & Form Architectures",
        "desc": "Explore synthetic event pooling and delegation, controlled vs uncontrolled inputs using useId and FormData, building resilient custom input components, and form validation state architectures.",
        "keyConcepts": [
          "SyntheticEvent",
          "Controlled Components",
          "useId Form Binding"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "Performance Optimization & Referential Stability",
        "desc": "Audit and eliminate unnecessary renders: memoizing expensive calculations with useMemo, stabilizing function references with useCallback, shallow props comparisons with React.memo, and React DevTools Profiler audits.",
        "keyConcepts": [
          "useMemo & useCallback",
          "React.memo",
          "Profiler Auditing"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Custom Reusable Hook Pipelines & Subscriptions",
        "desc": "Decouple complex UI logic from presentation: building bespoke hooks for WebSocket/SSE event subscriptions, high-frequency throttled scroll/resize listeners, and abortable HTTP query pipelines with AbortController.",
        "keyConcepts": [
          "Custom Hook Design",
          "Event Subscriptions",
          "AbortController Integration"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Finite State Machines & Strategic Context Splitting",
        "desc": "Replace fragile boolean flags with deterministic state machines via useReducer and XState. Implement strategic Context splitting (separating State from Dispatch) to completely prevent cascade re-renders across consumers.",
        "keyConcepts": [
          "useReducer & XState",
          "Deterministic State",
          "Context Splitting"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "React Fiber Reconciliation & Concurrent Engine",
        "desc": "Demystify Fiber internals: double-buffering work-in-progress trees, Fiber node properties (child, sibling, return), cooperative time-slicing scheduler, lanes priority levels, and concurrent UI transitions with useTransition and useDeferredValue.",
        "keyConcepts": [
          "Fiber Work Trees",
          "Lanes Priority",
          "Concurrent useTransition"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "React Server Components (RSC) & Streaming SSR Pipeline",
        "desc": "Master the server-client continuum: zero-bundle-size React Server Components (RSC), flight data streaming protocol, Suspense HTML streaming boundaries, Server Actions execution flow, and client-server boundary boundaries.",
        "keyConcepts": [
          "RSC Architecture",
          "Suspense HTML Streaming",
          "Server Actions"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "Custom Reconcilers & Low-Level Architectural Embedding",
        "desc": "Implement custom host renderers utilizing package react-reconciler (rendering React trees into Canvas, WebGL, or Terminal viewports), micro-frontend mounting/unmounting lifecycles, and memory leak mitigation in long-running SPAs.",
        "keyConcepts": [
          "react-reconciler",
          "Custom Host Renderers",
          "Micro-Frontend Lifecycles"
        ]
      }
    ]
  },
  {
    "id": "php",
    "fileName": "php_backend.php",
    "tabTitle": "php_backend.php",
    "category": "backend",
    "categoryBadge": "TIER.02 // SERVER_PHP",
    "tier": "Server Tier",
    "icon": "fa-brands fa-php text-indigo-600",
    "badgeColor": "bg-indigo-100 text-indigo-900 border-indigo-300",
    "title": "PHP (PHP 8.x modern OOP, PSR standards, Composer, Custom MVC & Theme Architecture)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "40.0_HRS",
    "summary": "Build robust server-side backends harnessing PHP 8.3+ features: attributes, JIT compilation, fibers, strict typing, PSR-12/PSR-4 adherence, enterprise Composer packaging, and custom modular MVC frameworks.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Modern PHP 8.x Syntax & Strict Type System",
        "desc": "Master contemporary language features: strict type declarations (declare(strict_types=1)), scalar and compound type hints, union & intersection types, named arguments, match expressions, and the nullsafe operator (?->).",
        "keyConcepts": [
          "declare(strict_types=1)",
          "Match Expressions",
          "Nullsafe Operator"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Object-Oriented Programming (OOP) Core & Attributes",
        "desc": "Construct clean OOP systems: constructor property promotion, readonly classes and properties, interfaces, abstract classes, traits, typed class constants, and metadata decoration using PHP 8 Attributes (#[Attribute]).",
        "keyConcepts": [
          "Constructor Promotion",
          "Readonly Classes",
          "PHP 8 Attributes"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Secure Database Connectivity with PDO",
        "desc": "Build secure data layers using PDO: prepared statements, parameterized query binding, SQL injection immunity, database transactions (commit/rollback), and robust error handling with PDOException modes.",
        "keyConcepts": [
          "PDO Prepared Statements",
          "Transaction Isolation",
          "SQL Injection Mitigation"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "PSR Standards Compliance & Modular Namespaces",
        "desc": "Adopt PHP-FIG enterprise standards: PSR-4 class autoloading hierarchies, PSR-12 coding standard compliance, PSR-7 HTTP message abstractions, and PSR-15 HTTP server request handlers and middleware stacks.",
        "keyConcepts": [
          "PSR-4 Autoloading",
          "PSR-7 HTTP Messages",
          "PSR-15 Middleware"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Enterprise Composer Architecture & Package Management",
        "desc": "Manage enterprise dependencies: composer.json configuration, private Git repository hosting, semantic versioning constraints, autoloader optimization (composer dump-autoload -o), and custom Composer automation scripts.",
        "keyConcepts": [
          "Composer Optimization",
          "Semantic Versioning",
          "Private Package Repositories"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Custom Modular MVC Framework Engineering",
        "desc": "Engineer a decoupled MVC framework: front controller pattern, attribute-based routing (#[Route('/api/v1/...')]), PSR-11 dependency injection container, and secure template rendering engines.",
        "keyConcepts": [
          "Front Controller",
          "Attribute Routing",
          "PSR-11 DI Container"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "PHP 8 JIT Compiler & OPcache Internal Optimization",
        "desc": "Analyze low-level execution: OPcache shared memory buffers, opcode generation and caching, Tracing JIT compilation pipeline, compiling hot opcodes to native x86/ARM machine code, and server preloading (opcache.preload).",
        "keyConcepts": [
          "Tracing JIT Engine",
          "OPcache Buffers",
          "opcache.preload Preloading"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "Fibers Concurrency & Asynchronous Event Loops",
        "desc": "Harness lightweight cooperative multitasking: PHP 8.1+ Fiber primitives, asynchronous non-blocking event loops with ReactPHP / Amp, concurrent socket handling, and cooperative promise resolution.",
        "keyConcepts": [
          "PHP 8.1 Fibers",
          "Non-blocking I/O",
          "ReactPHP / Amp Event Loops"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "High-Throughput Runtimes & Performance Profiling",
        "desc": "Deploy long-running PHP applications with Swoole / RoadRunner (bypassing traditional CGI process restart overhead), request state isolation, and low-level memory profiling with Xdebug and Blackfire.",
        "keyConcepts": [
          "RoadRunner / Swoole Runtimes",
          "State Isolation",
          "Blackfire Profiling"
        ]
      }
    ]
  },
  {
    "id": "dotnet",
    "fileName": "dotnet_kestrel.cs",
    "tabTitle": "dotnet_kestrel.cs",
    "category": "backend",
    "categoryBadge": "TIER.02 // SERVER_DOTNET",
    "tier": "Server Tier",
    "icon": "fa-brands fa-windows text-blue-600",
    "badgeColor": "bg-blue-100 text-blue-900 border-blue-300",
    "title": ".NET / C# (ASP.NET Core Web APIs, Entity Framework Core, Dependency Injection, Middleware)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "52.0_HRS",
    "summary": "Construct high-throughput distributed microservices and RESTful Web APIs on .NET 9 using Kestrel server pipelines, asynchronous EF Core query optimization, pipeline middleware, and native DI.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Modern C# Syntax & Type System Foundations",
        "desc": "Master modern C# features: value types vs reference types, immutable records and record structs, pattern matching expressions, nullable reference types, and asynchronous task foundations (Task, ValueTask, CancellationToken).",
        "keyConcepts": [
          "Records & Pattern Matching",
          "Nullable Reference Types",
          "ValueTask & CancellationTokens"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "ASP.NET Core Architecture & Host Bootstrap",
        "desc": "Understand WebApplicationBuilder bootstrap, dependency injection service lifecycles (Transient, Scoped, Singleton), configuration providers (appsettings.json, environment variables), and the built-in ILogger pipeline.",
        "keyConcepts": [
          "WebApplicationBuilder",
          "DI Lifecycles (Scoped/Singleton)",
          "Configuration Providers"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Minimal APIs & Route Endpoint Binding",
        "desc": "Build lightning-fast HTTP endpoints: route mapping, route groups, model binding from JSON/query/route parameters, data validation, and returning strongly-typed HTTP results using TypedResults (Ok, NotFound, Created).",
        "keyConcepts": [
          "Minimal APIs",
          "Model Binding",
          "TypedResults"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "Entity Framework Core 9 Query Optimization",
        "desc": "Master EF Core data access: DbContext pooling, compiled LINQ queries, AsNoTracking read optimization, eager vs explicit vs lazy loading, split queries for 1:N relations, and code-first database migrations.",
        "keyConcepts": [
          "DbContext Pooling",
          "AsNoTracking Optimization",
          "Split Query Execution"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Custom Pipeline Middleware & Action Filters",
        "desc": "Construct enterprise middleware: RequestDelegate pipelines, centralized exception handling middleware, distributed correlation ID tracking headers, endpoint action filters, and response compression.",
        "keyConcepts": [
          "RequestDelegate Pipeline",
          "Centralized Exception Middleware",
          "Correlation ID Logging"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Clean Architecture & CQRS with MediatR",
        "desc": "Architect enterprise microservices: Domain-Driven Design (DDD) layer separation, Command Query Responsibility Segregation (CQRS) using MediatR, pipeline validation behaviors with FluentValidation, and repository patterns.",
        "keyConcepts": [
          "Clean Architecture",
          "CQRS with MediatR",
          "Pipeline Validation Behaviors"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "High-Performance Memory Engineering with Span & Memory",
        "desc": "Zero-allocation memory mastery: Span<T>, ReadOnlySpan<char>, Memory<T>, stackalloc stack memory, zero-allocation string slicing, ArrayPool<T> buffer reuse, and avoiding garbage collection overhead.",
        "keyConcepts": [
          "Span<T> & Memory<T>",
          "stackalloc",
          "ArrayPool<T> Recycling"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "Kestrel Web Server Tuning & HTTP/3 QUIC Protocol",
        "desc": "Tune Kestrel for extreme throughput: socket transport layer configuration, connection pooling, thread pool starvation mitigation, HTTP/2 multiplexing, and configuring HTTP/3 over QUIC transport.",
        "keyConcepts": [
          "Kestrel Socket Transport",
          "Thread Pool Tuning",
          "HTTP/3 QUIC Protocol"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "CLR Internals, Garbage Collection & Native AOT",
        "desc": "Explore runtime execution: Generational GC (Gen 0, 1, 2, LOH, POH), server vs workstation GC modes, JIT tiered compilation, and ahead-of-time (Native AOT) compilation producing lightning-fast native binary executables.",
        "keyConcepts": [
          "Generational GC (Gen 0/1/2/LOH)",
          "Tiered JIT Compilation",
          "Native AOT Compilation"
        ]
      }
    ]
  },
  {
    "id": "dns",
    "fileName": "dns_records.zone",
    "tabTitle": "dns_records.zone",
    "category": "infrastructure",
    "categoryBadge": "TIER.03 // NETWORK_DNS",
    "tier": "Infrastructure",
    "icon": "fa-solid fa-network-wired text-emerald-600",
    "badgeColor": "bg-emerald-100 text-emerald-900 border-emerald-300",
    "title": "DNS (Nameservers, A/AAAA/CNAME/MX/TXT records, Propagation, TTL, SSL/TLS handshake)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "26.0_HRS",
    "summary": "Demystify the distributed backbone of the global internet. Understand authoritative vs recursive nameservers, zone transfers, DNSSEC validation, global TTL propagation latencies, and TLS 1.3 cryptographic handshakes.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Distributed DNS Architecture & Global Root Hierarchy",
        "desc": "Understand the global resolution hierarchy: Root nameservers (A through M), Top-Level Domain (TLD) registries, authoritative vs recursive resolver nameservers, and tracing an end-to-end recursive lookup.",
        "keyConcepts": [
          "Root & TLD Servers",
          "Authoritative vs Recursive",
          "Iterative Lookup Traces"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Core Resource Records: A, AAAA, CNAME, MX & TXT",
        "desc": "Master the fundamental DNS resource record types: A (IPv4) and AAAA (IPv6) host mappings, CNAME canonical alias chaining, MX mail exchanger routing priorities, and TXT generic data records.",
        "keyConcepts": [
          "A & AAAA Records",
          "CNAME Chaining",
          "MX Routing Priorities"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "TTL Mechanics, Caching Layers & Propagation Dynamics",
        "desc": "Deconstruct caching: Time-to-Live (TTL) countdown timers, recursive resolver caching layers, negative caching via SOA minimum TTL, and orchestrating zero-downtime DNS cutover migration strategies.",
        "keyConcepts": [
          "TTL Caching Expiration",
          "SOA Minimum Negative Cache",
          "Zero-Downtime DNS Cutovers"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "Anycast BGP Routing & Edge Traffic Steering",
        "desc": "Deploy resilient global DNS: BGP Anycast IP routing topology, latency-based geo-DNS routing, multi-CDN edge traffic steering, health-checking probes, and automated DNS failover during datacenter outages.",
        "keyConcepts": [
          "BGP Anycast Routing",
          "Geo-DNS Latency Steering",
          "Automated Health Failover"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Enterprise Email Authentication: SPF, DKIM & DMARC",
        "desc": "Harden email deliverability and prevent spoofing: SPF mechanism syntax (v=spf1), DKIM cryptographic public key TXT records, and DMARC enforcement policies (p=reject) with aggregate XML telemetry reporting.",
        "keyConcepts": [
          "SPF Verification",
          "DKIM Public Keys",
          "DMARC Enforcement (p=reject)"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Encrypted Transport Protocols & TLS 1.3 Handshake",
        "desc": "Secure name resolution against eavesdropping: DNS over HTTPS (DoH), DNS over TLS (DoT), privacy against ISP surveillance, and the modern TLS 1.3 1-RTT/0-RTT cryptographic key exchange handshake.",
        "keyConcepts": [
          "DNS over HTTPS (DoH)",
          "DNS over TLS (DoT)",
          "TLS 1.3 Handshake"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "DNSSEC Cryptographic Zone Signing & Trust Chains",
        "desc": "Protect against cache poisoning (Kaminsky attacks): asymmetric cryptographic signing, RRSIG signature records, DNSKEY public keys, DS delegation signer records, and root trust anchor validation.",
        "keyConcepts": [
          "DNSSEC Trust Anchors",
          "RRSIG & DNSKEY Records",
          "Kaminsky Attack Mitigation"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "BIND9 Zone File Authoring & Secure Zone Transfers",
        "desc": "Enterprise nameserver operations: RFC 1035 zone file syntax, SOA serial increment automation (YYYYMMDDNN), authoritative AXFR (full) and IXFR (incremental) zone transfer security with TSIG shared keys.",
        "keyConcepts": [
          "RFC 1035 Zone Files",
          "AXFR & IXFR Transfers",
          "TSIG Shared Key Auth"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "Certificate Authority Authorization & Low-Level Protocols",
        "desc": "Advanced security and low-level protocol engineering: RFC 8659 CAA record restrictions (certificate authority pinning), parsing raw binary DNS UDP/TCP wire format packets, and building custom DNS servers.",
        "keyConcepts": [
          "CAA Certificate Pinning",
          "DNS Wire Format Packets",
          "Custom DNS Proxy Servers"
        ]
      }
    ]
  },
  {
    "id": "devops",
    "fileName": "devops_nginx.conf",
    "tabTitle": "devops_nginx.conf",
    "category": "infrastructure",
    "categoryBadge": "TIER.03 // CLOUD_DEVOPS",
    "tier": "Infrastructure",
    "icon": "fa-solid fa-server text-purple-600",
    "badgeColor": "bg-purple-100 text-purple-900 border-purple-300",
    "title": "Web Hosting & DevOps (Linux/Nginx configuration, Apache vhosts, Docker containers, CI/CD pipelines, SSL provisioning)",
    "level": "LEVEL: PRODUCTION_READY",
    "duration": "50.0_HRS",
    "summary": "Orchestrate zero-downtime production environments through hardened Linux kernels, high-concurrency Nginx reverse proxy tuning, multi-stage Docker container builds, automated GitHub Actions CI/CD pipelines, and Let's Encrypt automated ACME SSL provisioning.",
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "Linux Server Administration & Hardening Essentials",
        "desc": "Core server administration: SSH public key authentication, Linux user permissions (chmod, chown, sudoers), systemd service management (systemctl, journalctl), and firewall configuration with UFW / firewalld.",
        "keyConcepts": [
          "SSH Hardening",
          "systemd Service Daemons",
          "UFW / Firewalld Rules"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "Web Server Foundations: Nginx & Apache Virtual Hosts",
        "desc": "Host web applications: static asset serving, Nginx server blocks vs Apache virtual hosts, MIME types, directory index routing, and crafting custom HTTP error response pages.",
        "keyConcepts": [
          "Nginx Server Blocks",
          "Apache Virtual Hosts",
          "MIME Type Handling"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "Automated SSL Provisioning with Let's Encrypt & Certbot",
        "desc": "Implement ubiquitous HTTPS: ACME protocol automation, Certbot client operations, HTTP-01 vs DNS-01 verification challenges, and configuring automated systemd timers for zero-touch SSL certificate renewal.",
        "keyConcepts": [
          "ACME Protocol",
          "Certbot Automation",
          "Systemd Renewal Timers"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "Nginx High-Concurrency Reverse Proxy Tuning",
        "desc": "Scale high-traffic gateways: upstream load balancing algorithms (round-robin, least_conn, ip_hash), fastcgi/proxy micro-caching, gzip and brotli compression, rate limiting with leaky bucket, and connection keep-alives.",
        "keyConcepts": [
          "Upstream Load Balancing",
          "Proxy Micro-Caching",
          "Leaky Bucket Rate Limiting"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "Docker Containerization & Multi-Stage Builds",
        "desc": "Containerize enterprise workloads: Dockerfile optimization, layer caching, multi-stage builds producing minimal images, non-root user security execution, and multi-container Docker Compose networks.",
        "keyConcepts": [
          "Multi-Stage Dockerfiles",
          "Layer Cache Optimization",
          "Non-Root Security"
        ]
      },
      {
        "num": "06",
        "tier": "Advanced",
        "chapter": "Automated CI/CD Pipelines with GitHub Actions",
        "desc": "Automate delivery pipelines: GitHub Actions workflow YAML syntax, matrix testing builds, secret management, container registry publishing, and automated zero-downtime SSH deployment scripts.",
        "keyConcepts": [
          "GitHub Actions Workflows",
          "Secrets Management",
          "Automated Registry Pushes"
        ]
      },
      {
        "num": "07",
        "tier": "Expert",
        "chapter": "Linux Kernel Performance & TCP Socket Optimization",
        "desc": "Tune operating system limits: sysctl.conf network parameters, TCP BBR congestion control algorithm, mitigating ephemeral port exhaustion, and epoll file descriptor limits (ulimit -n) for 100k+ concurrent sockets.",
        "keyConcepts": [
          "sysctl.conf Socket Tuning",
          "TCP BBR Congestion Control",
          "epoll ulimit Tuning"
        ]
      },
      {
        "num": "08",
        "tier": "Expert",
        "chapter": "Zero-Downtime Deployment & Traffic Rollouts",
        "desc": "Orchestrate zero-downtime upgrades: Blue/Green deployments, Canary rollouts with weighted Nginx upstreams, health-check gating, database migration rollback strategies, and graceful Nginx reloads (nginx -s reload).",
        "keyConcepts": [
          "Blue/Green Deployments",
          "Canary Rollouts",
          "Graceful Process Reloads"
        ]
      },
      {
        "num": "09",
        "tier": "Expert",
        "chapter": "Enterprise Container Hardening & Telemetry Monitoring",
        "desc": "Secure and observe production clusters: Distroless / Scratch minimal attack-surface base images, CVE vulnerability scanning with Trivy, Prometheus metrics scraping endpoints, and centralized Grafana/Loki logging.",
        "keyConcepts": [
          "Distroless Containers",
          "Trivy CVE Scanning",
          "Prometheus & Loki Monitoring"
        ]
      }
    ]
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
        m.syllabus.some((s) => s.chapter.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))
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
            title="Inspect ${mod.fileName} Curriculum">
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

  // Render the Active Track in a Crisp White Card (Directly Showing the 3x3 Curriculum Syllabus)
  function renderActiveTabbedCard() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const mod = MODULES_DATA.find((m) => m.id === currentActiveTrackId) || MODULES_DATA[0];

    // Helper to render each 3-module progression tier
    function renderSyllabusTier(tierName, tierBadgeStyle, tierDotColor, tierPillStyle, tierNumber, modules) {
      const modulesHtml = modules
        .map((m) => `
          <div class="p-4 sm:p-5 bg-slate-50 border border-slate-200/90 rounded-xl hover:bg-white hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2.5">
                <span class="font-mono text-[11px] font-bold px-2 py-0.5 rounded ${tierBadgeStyle} border">
                  ${m.tier.toUpperCase()} // ${m.num}
                </span>
                <span class="font-mono text-[11px] text-slate-400 font-semibold">
                  STAGE ${m.num} / 09
                </span>
              </div>
              <h4 class="font-headline font-bold text-slate-900 text-sm sm:text-base mb-2 leading-snug">
                ${m.chapter}
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                ${m.desc}
              </p>
            </div>
            <div class="pt-3 border-t border-slate-200/80 flex flex-wrap gap-1.5 mt-auto">
              ${m.keyConcepts
                .map(
                  (c) => `
                <span class="text-[10.5px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                  ${c}
                </span>
              `
                )
                .join('')}
            </div>
          </div>
        `)
        .join('');

      return `
        <div class="space-y-3.5">
          <!-- Progression Header Strip -->
          <div class="flex items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div class="flex items-center gap-2.5">
              <span class="w-2.5 h-2.5 rounded-full ${tierDotColor}"></span>
              <h3 class="font-headline font-black text-slate-900 text-sm sm:text-base uppercase tracking-wider">
                ${tierName}
              </h3>
            </div>
            <span class="font-mono text-xs font-bold px-2.5 py-0.5 rounded ${tierPillStyle} border">
              3 Modules &bull; Advancement Tier ${tierNumber}
            </span>
          </div>

          <!-- 3 Modules Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            ${modulesHtml}
          </div>
        </div>
      `;
    }

    const beginnerTier = mod.syllabus.filter((s) => s.tier === 'Beginner');
    const advancedTier = mod.syllabus.filter((s) => s.tier === 'Advanced');
    const expertTier = mod.syllabus.filter((s) => s.tier === 'Expert');

    container.innerHTML = `
      <div class="os-white-card w-full">
        
        <!-- Titanium Grey Window Titlebar -->
        <div class="os-window-header px-6 sm:px-10 lg:px-14 py-3">
          <div class="flex items-center gap-2.5">
            <div class="font-mono text-xs text-slate-700 flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-terminal text-slate-500 text-[11px]"></i>
              <span>/usr/local/matrix/curriculum/${mod.fileName}</span>
            </div>
          </div>

          <div class="font-mono text-xs text-slate-500 font-bold">
            ${mod.duration} &bull; 9 CURRICULUM CHAPTERS (3x3)
          </div>
        </div>

        <!-- Main Card Body -->
        <div class="py-6 sm:py-8 px-6 sm:px-10 lg:px-14 space-y-8">
          
          <!-- Title & Tier Bar -->
          <div class="flex items-start gap-4 pb-4 border-b border-slate-200">
            <div class="w-14 h-14 rounded-lg bg-slate-100 border border-slate-300 flex items-center justify-center text-3xl shrink-0 shadow-xs">
              <i class="${mod.icon}"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1.5 flex-wrap">
                <span class="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
                  ${mod.tier} // ${mod.category.toUpperCase()}
                </span>
                <span class="text-slate-300">&bull;</span>
                <span class="font-mono text-xs text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  3x3 CURRICULUM SYLLABUS (9 PROGRESSIVE CHAPTERS)
                </span>
              </div>
              <h2 class="font-headline font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mb-2">
                ${mod.title}
              </h2>
              <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                ${mod.summary}
              </p>
            </div>
          </div>

          <!-- THE 3x3 CURRICULUM SYLLABUSES (3 Beginner, 3 Advanced, 3 Expert) -->
          <div class="space-y-8">
            ${renderSyllabusTier(
              '01. Beginner Foundations (Building Core Knowledge)',
              'bg-emerald-100 text-emerald-900 border-emerald-300',
              'bg-emerald-500',
              'bg-emerald-50 text-emerald-800 border-emerald-200',
              '01',
              beginnerTier
            )}

            ${renderSyllabusTier(
              '02. Advanced Architecture (System Design & Concurrency)',
              'bg-sky-100 text-sky-900 border-sky-300',
              'bg-sky-500',
              'bg-sky-50 text-sky-800 border-sky-200',
              '02',
              advancedTier
            )}

            ${renderSyllabusTier(
              '03. Expert Internals (Low-Level Mastery & Enterprise Scaling)',
              'bg-purple-100 text-purple-900 border-purple-300',
              'bg-purple-500',
              'bg-purple-50 text-purple-800 border-purple-200',
              '03',
              expertTier
            )}
          </div>

        </div>
      </div>
    `;
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
        m.syllabus.some((s) => s.chapter.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))
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
        </div>
      `;
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

                <!-- 3x3 Advancement Badges -->
                <div class="grid grid-cols-3 gap-2 text-center font-mono text-[11px] mb-5">
                  <div class="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    3 Beginner
                  </div>
                  <div class="p-2 rounded bg-sky-50 border border-sky-200 text-sky-800 font-bold">
                    3 Advanced
                  </div>
                  <div class="p-2 rounded bg-purple-50 border border-purple-200 text-purple-800 font-bold">
                    3 Expert
                  </div>
                </div>
              </div>

              <!-- Action Bar -->
              <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500">9 Progressive Modules</span>
                <button type="button" class="os-tech-btn-primary text-xs py-1.5 px-3">
                  <span>Open Syllabus</span>
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
  // 5. OS CLOCK & SEARCH
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
      clockEls.forEach((el) => {
        el.textContent = timeStr;
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. DOM INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    initOsClock();
    renderIdeTabs();
    renderMainView();

    // Audio Mute Toggle (Synchronized across both header and footer menubars)
    const audioBtns = document.querySelectorAll('.os-audio-toggle-btn, #osAudioToggleBtn');
    function updateAudioButtons() {
      audioBtns.forEach((btn) => {
        btn.innerHTML = soundEnabled
          ? `<i class="fa-solid fa-volume-high text-sky-400"></i>`
          : `<i class="fa-solid fa-volume-xmark text-slate-500"></i>`;
      });
    }

    audioBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        initAudio();
        soundEnabled = !soundEnabled;
        updateAudioButtons();
        if (soundEnabled) playOsClick(900, 0.04);
      });
    });

    // In-App Home Icon Navigation (Resets curriculum view to first track smoothly)
    document.querySelectorAll('a[href="./index.html"]').forEach((homeBtn) => {
      homeBtn.addEventListener('click', (e) => {
        const path = window.location.pathname;
        if (path.endsWith('index.html') || path.endsWith('/learning-module/') || path.endsWith('/learning-module')) {
          e.preventDefault();
          currentActiveTrackId = 'javascript';
          currentViewMode = 'tabbed';
          renderIdeTabs();
          renderMainView();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          playOsClick(800, 0.04);
        }
      });
    });
  });
})();
