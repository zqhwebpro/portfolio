/**
 * ENGINEERING KNOWLEDGE MATRIX — UNIQUE TECH OS ENGINE
 * Monospace Code Fonts, Font Awesome Icons, Crisp White Cards,
 * Interactive IDE Tabs, and 3x3 Progressive Curriculum Syllabuses
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. MODULE REPOSITORY DATA (JSE 1 CURRICULUM & 7 CORE TRACKS)
  // ═══════════════════════════════════════════════════════════════════
  const JSE_MODULES = [
    {
      num: "01",
      code: "1.0 – 1.4",
      title: "JSE: Module 1: Introduction to JavaScript and Computer Programming",
      shortTitle: "Intro & Computer Programming",
      desc: "Foundations of computation, language history, modern JS engines, dev environment setup, and execution lifecycle.",
      sections: [
        { id: "1.0", title: "1.0. Welcome to JavaScript Essentials 1", summary: "Orientation to modern JavaScript fundamentals, computational thinking, and developer tooling." },
        { id: "1.1", title: "1.1. Section 1 – About JavaScript", summary: "History, ECMAScript standards, engine runtime architecture, and client vs server execution." },
        { id: "1.2", title: "1.2. Section 2 – Setting up programming environment", summary: "Node.js, browser developer tools, code editors (VS Code), and command line basics." },
        { id: "1.3", title: "1.3. Section 3 – Hello, World!", summary: "Writing, linking, and running your first executable JavaScript programs in browser and console." },
        { id: "1.4", title: "1.4. Module 1 Completion – Module Test", summary: "Comprehensive assessment covering programming basics, syntax rules, and environment setup." }
      ]
    },
    {
      num: "02",
      code: "2.0 – 2.4",
      title: "JSE: Module 2: Variables, Data Types, Type Casting, and Comments",
      shortTitle: "Variables, Types & Comments",
      desc: "Memory management with let/const/var, primitive types, type coercion, dynamic casting, and code documentation.",
      sections: [
        { id: "2.0", title: "2.0. Section 1 – Variables", summary: "Variable declaration, initialization, assignment, identifier naming rules, and block scoping." },
        { id: "2.1", title: "2.1. Section 2 – Data types and type casting – Part 1", summary: "Primitive types: numbers, strings, booleans, undefined, null, and typeof operator inspections." },
        { id: "2.2", title: "2.2. Section 3 – Data types and type casting – Part 2", summary: "Explicit vs implicit type conversion, BigInt, Symbols, and common NaN conversion pitfalls." },
        { id: "2.3", title: "2.3. Section 4 – Comments", summary: "Single-line and multi-line comments, JSDoc annotations, and code self-documentation best practices." },
        { id: "2.4", title: "2.4. Module 2 Completion – Module Test", summary: "Comprehensive examination testing type coercion, variable scope, and primitive allocations." }
      ]
    },
    {
      num: "03",
      code: "3.0 – 3.3",
      title: "JSE: Module 3: Operators and User Interaction",
      shortTitle: "Operators & User Interaction",
      desc: "Arithmetic, assignment, logical operators, string concatenation, dialog prompts, and basic input/output.",
      sections: [
        { id: "3.0", title: "3.0. Section 1 – Assignment, arithmetic, and logical operators", summary: "Binary/unary operators, precedence rules, logical AND/OR/NOT, and short-circuit evaluation." },
        { id: "3.1", title: "3.1. Section 2 – String, comparison, and other JS operators", summary: "Strict equality (===) vs loose equality (==), relational operators, template literals, and ternary operator." },
        { id: "3.2", title: "3.2. Section 3 – Interacting with the user", summary: "Modal interaction dialogs: window.alert(), window.prompt(), window.confirm(), and console logging." },
        { id: "3.3", title: "3.3. Module 3 Completion – Module Test", summary: "Assessment testing operator evaluation precedence, truthy/falsy logic, and user dialog handling." }
      ]
    },
    {
      num: "04",
      code: "4.0 – 4.2",
      title: "JSE: Module 4: Control Flow – Conditional Execution and Loops",
      shortTitle: "Control Flow & Loops",
      desc: "Decision branching with if/else/switch, deterministic loops, while iterations, and loop jump controls.",
      sections: [
        { id: "4.0", title: "4.0. Section 1 – Conditional execution", summary: "Conditional branching using if, if-else cascades, nested conditions, and switch-case statements." },
        { id: "4.1", title: "4.1. Section 2 – Loops", summary: "Iteration mechanics: while loops, do-while loops, for loops, break and continue flow control." },
        { id: "4.2", title: "4.2. Module 4 Completion – Module Test", summary: "Module examination validating loop termination invariants, nested iteration, and condition trees." }
      ]
    },
    {
      num: "05",
      code: "5.0 – 5.2",
      title: "JSE: Module 5: Functions",
      shortTitle: "Functions & Execution Context",
      desc: "Function declarations, expressions, arrow functions, parameter defaults, return statements, and call stack scoping.",
      sections: [
        { id: "5.0", title: "5.0. Section 1 – Functions – Part 1", summary: "Function declaration syntax, parameter passing, return statements, and local vs global scope." },
        { id: "5.1", title: "5.1. Section 2 – Functions – Part 2", summary: "Function expressions, first-class functions, arrow syntax, callbacks, and recursion basics." },
        { id: "5.2", title: "5.2. Module 5 Completion – Module Test", summary: "Comprehensive test covering functional modularity, return value flow, and closure scoping." }
      ]
    },
    {
      num: "06",
      code: "6.0 – 6.3",
      title: "JSE: Module 6: Errors, exceptions, debugging, and troubleshooting",
      shortTitle: "Errors, Debugging & Troubleshooting",
      desc: "Error categories, runtime exceptions, try/catch/finally error handling, throw statements, and DevTools troubleshooting.",
      sections: [
        { id: "6.0", title: "6.0. Section 1 – Errors and Exceptions – Part 1", summary: "Syntax errors, reference errors, type errors, range errors, and error propagation mechanics." },
        { id: "6.1", title: "6.1. Section 2 – Errors and Exceptions – Part 2", summary: "Structured exception handling with try-catch-finally blocks and throwing custom Error objects." },
        { id: "6.2", title: "6.2. Section 3 – Code Debugging and Troubleshooting", summary: "Using browser debugger, setting breakpoints, stepping through call frames, and watch expressions." },
        { id: "6.3", title: "6.3. Module 6 Completion – Module Test", summary: "Final certification module test evaluating error interception, debugging techniques, and troubleshooting." }
      ]
    }
  ];

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
    "title": "JavaScript Essentials (JSE: Modules 1–6 Outline)",
    "level": "LEVEL: ESSENTIALS_TO_PRO",
    "duration": "48.0_HRS",
    "summary": "Comprehensive 6-module curriculum outline for JavaScript Essentials 1 (JSE 1): from computer programming and variable mechanics to operators, control flow loops, functions, and runtime error debugging.",
    "jseModules": JSE_MODULES,
    "syllabus": [
      {
        "num": "01",
        "tier": "Beginner",
        "chapter": "JSE: Module 1: Introduction to JavaScript and Computer Programming",
        "desc": "1.0. Welcome to JavaScript Essentials 1 | 1.1. Section 1 – About JavaScript | 1.2. Section 2 – Setting up programming environment | 1.3. Section 3 – Hello, World! | 1.4. Module 1 Completion – Module Test",
        "keyConcepts": [
          "1.0. Welcome to JSE 1",
          "1.1. About JavaScript",
          "1.2. Dev Environment",
          "1.3. Hello, World!",
          "1.4. Module 1 Test"
        ]
      },
      {
        "num": "02",
        "tier": "Beginner",
        "chapter": "JSE: Module 2: Variables, Data Types, Type Casting, and Comments",
        "desc": "2.0. Section 1 – Variables | 2.1. Section 2 – Data types and type casting – Part 1 | 2.2. Section 3 – Data types and type casting – Part 2 | 2.3. Section 4 – Comments | 2.4. Module 2 Completion – Module Test",
        "keyConcepts": [
          "2.0. Variables",
          "2.1. Data Types Pt 1",
          "2.2. Data Types Pt 2",
          "2.3. Comments",
          "2.4. Module 2 Test"
        ]
      },
      {
        "num": "03",
        "tier": "Beginner",
        "chapter": "JSE: Module 3: Operators and User Interaction",
        "desc": "3.0. Section 1 – Assignment, arithmetic, and logical operators | 3.1. Section 2 – String, comparison, and other JS operators | 3.2. Section 3 – Interacting with the user | 3.3. Module 3 Completion – Module Test",
        "keyConcepts": [
          "3.0. Arithmetic & Logic",
          "3.1. Comparison & String",
          "3.2. User Interaction",
          "3.3. Module 3 Test"
        ]
      },
      {
        "num": "04",
        "tier": "Advanced",
        "chapter": "JSE: Module 4: Control Flow – Conditional Execution and Loops",
        "desc": "4.0. Section 1 – Conditional execution | 4.1. Section 2 – Loops | 4.2. Module 4 Completion – Module Test",
        "keyConcepts": [
          "4.0. Conditional execution",
          "4.1. Loops & Iterations",
          "4.2. Module 4 Test"
        ]
      },
      {
        "num": "05",
        "tier": "Advanced",
        "chapter": "JSE: Module 5: Functions",
        "desc": "5.0. Section 1 – Functions – Part 1 | 5.1. Section 2 – Functions – Part 2 | 5.2. Module 5 Completion – Module Test",
        "keyConcepts": [
          "5.0. Functions Pt 1",
          "5.1. Functions Pt 2",
          "5.2. Module 5 Test"
        ]
      },
      {
        "num": "06",
        "tier": "Expert",
        "chapter": "JSE: Module 6: Errors, exceptions, debugging, and troubleshooting",
        "desc": "6.0. Section 1 – Errors and Exceptions – Part 1 | 6.1. Section 2 – Errors and Exceptions – Part 2 | 6.2. Section 3 – Code Debugging and Troubleshooting | 6.3. Module 6 Completion – Module Test",
        "keyConcepts": [
          "6.0. Errors & Exceptions Pt 1",
          "6.1. Errors & Exceptions Pt 2",
          "6.2. Debugging & Tools",
          "6.3. Module 6 Test"
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
  // 3. APPLICATION STATE & JSE CURRICULUM PAGINATION
  // ═══════════════════════════════════════════════════════════════════
  let currentActiveTrackId = 'javascript';
  let currentViewMode = 'tabbed'; // 'tabbed' or 'grid'
  let activeSearchQuery = '';
  let jseCurriculumPage = 0; // 0 for modules 01-03, 1 for modules 04-06

  window.switchJsePage = function (targetPage) {
    if (typeof targetPage === 'number') {
      jseCurriculumPage = targetPage;
    } else {
      jseCurriculumPage = jseCurriculumPage === 0 ? 1 : 0;
    }
    playOsClick(840, 0.035);
    renderActiveTabbedCard();
    const anchor = document.getElementById('jseCurriculumOutlineAnchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  window.startJseSection = function (moduleNum, sectionId) {
    playOsClick(840, 0.04);
    const modal = document.getElementById('jseLessonModal');
    if (!modal) return;

    const mod = JSE_MODULES.find((m) => m.num === moduleNum);
    const sec = mod ? mod.sections.find((s) => s.id === sectionId) : null;
    if (!sec) return;

    const headerTag = document.getElementById('jseModalHeaderTag');
    const moduleBadge = document.getElementById('jseModalModuleBadge');
    const lessonTitle = document.getElementById('jseModalLessonTitle');
    const lessonDesc = document.getElementById('jseModalLessonDesc');
    const codeSnippetEl = document.getElementById('jseModalCodeSnippet');
    const consoleOutput = document.getElementById('jseModalConsoleOutput');

    if (headerTag) headerTag.textContent = `JSE.1 // MODULE_${moduleNum} // SEC_${sectionId}`;
    if (moduleBadge) moduleBadge.textContent = mod ? mod.title : `MODULE ${moduleNum}`;
    if (lessonTitle) lessonTitle.textContent = sec.title;
    if (lessonDesc) lessonDesc.textContent = sec.summary || 'Interactive lesson runtime and syllabus objectives.';

    if (consoleOutput) {
      consoleOutput.classList.add('hidden');
      consoleOutput.innerHTML = '';
    }

    let sampleCode = `// JavaScript Essentials 1: Section ${sectionId}\n// ${sec.title}\n\n`;
    if (moduleNum === '01') {
      sampleCode += `console.log("Welcome to JavaScript Essentials 1!");\nconsole.log("Environment: Ready. Execution Context: Active.");\nconsole.log("Status: Hello, World! program executed successfully.");`;
    } else if (moduleNum === '02') {
      sampleCode += `let userRole = "Software Engineer";\nconst version = 1.0;\nlet isVerified = Boolean(userRole);\nconsole.log("Variable:", userRole, "Type:", typeof userRole);\nconsole.log("Type Casting Check:", isVerified);`;
    } else if (moduleNum === '03') {
      sampleCode += `let price = 49.99;\nlet quantity = 3;\nlet total = price * quantity;\nlet isFreeShipping = total > 100;\nconsole.log("Total: $" + total.toFixed(2), "Free Shipping:", isFreeShipping);`;
    } else if (moduleNum === '04') {
      sampleCode += `let counter = 0;\nwhile (counter < 3) {\n  counter++;\n  console.log("Loop iteration", counter, "executing conditional logic.");\n}`;
    } else if (moduleNum === '05') {
      sampleCode += `function calculateSquare(num) {\n  return num * num;\n}\nconst result = calculateSquare(8);\nconsole.log("Function Return Output:", result);`;
    } else {
      sampleCode += `try {\n  console.log("Diagnosing runtime execution...");\n  // Error prevention and breakpoint logging\n  console.log("Diagnostics pass: 0 errors detected.");\n} catch (err) {\n  console.error("Intercepted exception:", err.message);\n}`;
    }
    if (codeSnippetEl) codeSnippetEl.textContent = sampleCode;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  };

  window.runJseDemo = function () {
    playOsClick(980, 0.05);
    const consoleOutput = document.getElementById('jseModalConsoleOutput');
    if (!consoleOutput) return;

    consoleOutput.classList.remove('hidden');
    consoleOutput.innerHTML = `<span class="text-slate-400 font-bold">&gt; OUTPUT:</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Executing script in sandbox environment...</span><br/><span class="text-slate-700">&gt;&gt; Compilation successful: 0 errors, 0 warnings.</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Console output: [Sandbox execution completed in 14ms]</span>`;
  };

  window.closeJseModal = function () {
    playOsClick(600, 0.03);
    const modal = document.getElementById('jseLessonModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeJseModal();
    }
  });

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
        (m.syllabus && m.syllabus.some((s) => s.chapter.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))) ||
        (m.id === 'javascript' && JSE_MODULES.some((jm) => jm.title.toLowerCase().includes(q) || jm.sections.some((sec) => sec.title.toLowerCase().includes(q))))
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

  // Render JavaScript Custom 3-Block Outline View (01. 02 in middle to 03 on right)
  function renderJsCurriculumPanel(container, mod) {
    const activeModules = jseCurriculumPage === 0 ? JSE_MODULES.slice(0, 3) : JSE_MODULES.slice(3, 6);

    const blocksHtml = activeModules
      .map((m, idx) => {
        const isMiddle = idx === 1; // "01. 02 in the middle to 03 on the right"

        const sectionsHtml = m.sections
          .map((sec) => `
            <div class="p-2 sm:p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-amber-50/80 hover:border-amber-300 transition-all flex items-center justify-between gap-2.5 group/item">
              <div class="flex items-center gap-2 min-w-0">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                <span class="font-mono text-xs font-semibold text-slate-800 leading-snug truncate" title="${sec.title}">
                  ${sec.title}
                </span>
              </div>
              <button 
                type="button" 
                onclick="window.startJseSection('${m.num}', '${sec.id}')"
                class="shrink-0 px-2.5 py-1 rounded bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-mono text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer">
                <span>start</span>
                <i class="fa-solid fa-play text-[8px]"></i>
              </button>
            </div>
          `)
          .join('');

        let blockNavHtml = '';
        if (m.num === '01') {
          blockNavHtml = `
            <div class="text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>PREREQUISITES: NONE</span>
              <span class="text-amber-600 font-bold">NEXT: MOD 02 &rarr;</span>
            </div>
          `;
        } else if (m.num === '02') {
          blockNavHtml = `
            <div class="text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>CORE_TYPES: PRIMITIVES</span>
              <span class="text-amber-600 font-bold">NEXT: MOD 03 &rarr;</span>
            </div>
          `;
        } else if (m.num === '03') {
          blockNavHtml = `
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-slate-500 font-mono">STAGE 1 WRAP-UP</span>
              <button type="button" onclick="window.switchJsePage(1)" class="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs">
                <span>Next: Modules 04–06</span>
                <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          `;
        } else if (m.num === '04') {
          blockNavHtml = `
            <div class="flex items-center justify-between">
              <button type="button" onclick="window.switchJsePage(0)" class="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1">
                <i class="fa-solid fa-arrow-left text-[10px]"></i>
                <span>Modules 01–03</span>
              </button>
              <span class="text-[11px] text-amber-600 font-mono font-bold">NEXT: MOD 05 &rarr;</span>
            </div>
          `;
        } else if (m.num === '05') {
          blockNavHtml = `
            <div class="text-[11px] text-slate-500 font-mono flex items-center justify-between">
              <span>CALL_STACK: FUNCTIONAL</span>
              <span class="text-amber-600 font-bold">NEXT: MOD 06 &rarr;</span>
            </div>
          `;
        } else if (m.num === '06') {
          blockNavHtml = `
            <div class="flex items-center justify-between">
              <span class="text-[11px] text-emerald-600 font-mono font-bold flex items-center gap-1">
                <i class="fa-solid fa-certificate"></i> JSE 1 FINAL EXAM
              </span>
              <button type="button" onclick="window.switchJsePage(0)" class="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-1">
                <span>&larr; Back to 01</span>
              </button>
            </div>
          `;
        }

        return `
          <div class="p-5 sm:p-6 bg-white border-2 ${isMiddle ? 'border-amber-400 shadow-md ring-1 ring-amber-400/20' : 'border-slate-300'} rounded-xl flex flex-col justify-between hover:border-slate-500 transition-all group">
            <div>
              <!-- Top Header Strip with Outline Number -->
              <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div class="flex items-center gap-2.5">
                  <span class="font-mono text-3xl sm:text-4xl font-black text-amber-500 tracking-tight leading-none">${m.num}.</span>
                  <div class="flex flex-col">
                    <span class="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      ${isMiddle ? 'MIDDLE_BLOCK' : (idx === 0 ? 'START_BLOCK' : 'RIGHT_BLOCK')}
                    </span>
                    <span class="font-mono text-xs font-semibold text-slate-700">${m.code}</span>
                  </div>
                </div>
                <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  STAGE § ${m.num}
                </span>
              </div>

              <!-- Module Title & Outline Scope -->
              <h4 class="font-headline font-bold text-slate-900 text-base sm:text-lg mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                ${m.title}
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed font-sans mb-4">
                ${m.desc}
              </p>

              <!-- Outline Checklist -->
              <div class="space-y-2 pt-2 border-t border-slate-100">
                <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider pb-1">
                  <span>Curriculum Outline</span>
                  <span>Interactive</span>
                </div>
                ${sectionsHtml}
              </div>
            </div>

            <!-- Block Navigation / Footer -->
            <div class="pt-4 mt-5 border-t border-slate-200">
              ${blockNavHtml}
            </div>
          </div>
        `;
      })
      .join('');

    container.innerHTML = `
      <div class="os-white-card w-full">
        <!-- Scientific Specification Window Titlebar -->
        <div class="os-window-header px-6 sm:px-10 lg:px-14 py-3" id="jseCurriculumOutlineAnchor">
          <div class="flex items-center gap-2.5">
            <div class="font-mono text-xs text-slate-700 flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-terminal text-amber-500 text-[11px]"></i>
              <span>/usr/local/matrix/curriculum/js_engine.es6</span>
            </div>
          </div>

          <div class="font-mono text-xs text-slate-600 font-bold flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">JSE 1</span>
            <span>06 MODULES // 3-BLOCK OUTLINE</span>
          </div>
        </div>

        <!-- Main Card Body -->
        <div class="py-6 sm:py-8 px-6 sm:px-10 lg:px-14 space-y-8">
          
          <!-- Scientific Header & Technical Parameters -->
          <div class="pb-5 border-b border-slate-200">
            <div class="font-mono text-xs text-slate-500 tracking-wider mb-2.5 flex items-center gap-2 flex-wrap">
              <span class="font-bold text-slate-800">SPEC_ID: JSE_ESSENTIALS_1</span>
              <span class="text-slate-300">/</span>
              <span>TIER: CLIENT TIER</span>
              <span class="text-slate-300">/</span>
              <span>DOMAIN: JAVASCRIPT ESSENTIALS</span>
              <span class="text-slate-300">/</span>
              <span>DURATION: 48.0_HRS</span>
              <span class="text-slate-300">/</span>
              <span class="text-amber-600 font-bold">STRUCTURE: 3 BLOCKS IN A ROW</span>
            </div>
            <h2 class="font-headline font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mb-2.5">
              ${mod.title}
            </h2>
            <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              ${mod.summary}
            </p>
          </div>

          <!-- 3-Block Outline Interactive Switcher / Pagination Toolbar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-slate-100 border border-slate-300 rounded-xl font-mono text-xs">
            <div class="flex items-center gap-2.5 flex-wrap">
              <span class="font-bold text-slate-700 flex items-center gap-1.5">
                <i class="fa-solid fa-layer-group text-amber-500"></i>
                <span>OUTLINE_BLOCKS:</span>
              </span>
              <div class="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 shadow-2xs">
                <button 
                  type="button" 
                  onclick="window.switchJsePage(0)"
                  class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${jseCurriculumPage === 0 ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'}">
                  01. 02. 03. Modules 1–3
                </button>
                <button 
                  type="button" 
                  onclick="window.switchJsePage(1)"
                  class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${jseCurriculumPage === 1 ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'}">
                  04. 05. 06. Modules 4–6
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button 
                type="button" 
                onclick="window.switchJsePage()"
                class="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs">
                <span>${jseCurriculumPage === 0 ? 'Next Modules (04–06) →' : '← Previous Modules (01–03)'}</span>
              </button>
            </div>
          </div>

          <!-- THE THREE BLOCKS IN A ROW (01., 02. IN THE MIDDLE, 03. ON THE RIGHT) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            ${blocksHtml}
          </div>

        </div>
      </div>
    `;
  }

  // Render the Active Track in a Crisp White Card (Directly Showing the 3x3 Curriculum Syllabus)
  function renderActiveTabbedCard() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const mod = MODULES_DATA.find((m) => m.id === currentActiveTrackId) || MODULES_DATA[0];

    // If JavaScript track is selected, render custom 3-block outline design
    if (mod.id === 'javascript') {
      renderJsCurriculumPanel(container, mod);
      return;
    }

    // Helper to render each 3-module progression tier with scientific formatting
    function renderSyllabusTier(tierName, tierNumber, modules) {
      const modulesHtml = modules
        .map((m) => `
          <div class="p-4 sm:p-5 bg-white border border-slate-200 hover:border-slate-400 transition-colors flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between font-mono text-[11px] text-slate-500 mb-2 pb-1.5 border-b border-slate-100">
                <span class="font-bold text-slate-800 tracking-wider">MODULE § ${m.num}</span>
                <span class="text-slate-400 tracking-wider">${m.tier.toUpperCase()} [STAGE ${m.num}/09]</span>
              </div>
              <h4 class="font-headline font-bold text-slate-900 text-sm sm:text-base mb-2 leading-snug">
                ${m.chapter}
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed font-sans mb-3">
                ${m.desc}
              </p>
            </div>
            <div class="pt-2.5 border-t border-slate-100 font-mono text-[11px] text-slate-600 mt-auto leading-relaxed">
              <span class="text-slate-400 font-semibold">CORE_CONCEPTS:</span> ${m.keyConcepts.join('; ')}
            </div>
          </div>
        `)
        .join('');

      return `
        <div class="space-y-3.5">
          <!-- Scientific Section Header Strip -->
          <div class="flex items-baseline justify-between gap-3 pb-2 border-b-2 border-slate-300">
            <h3 class="font-mono font-bold text-slate-900 text-sm sm:text-base tracking-wide uppercase">
              ${tierName}
            </h3>
            <span class="font-mono text-xs text-slate-500 font-semibold tracking-wider">
              [ ADVANCEMENT_TIER_${tierNumber} // 03_MODULES ]
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
        
        <!-- Scientific Specification Window Titlebar -->
        <div class="os-window-header px-6 sm:px-10 lg:px-14 py-3">
          <div class="flex items-center gap-2.5">
            <div class="font-mono text-xs text-slate-700 flex items-center gap-2 font-semibold">
              <i class="fa-solid fa-terminal text-slate-500 text-[11px]"></i>
              <span>/usr/local/matrix/curriculum/${mod.fileName}</span>
            </div>
          </div>

          <div class="font-mono text-xs text-slate-500 font-bold">
            ${mod.duration} // 09 PROGRESSIVE MODULES (3x3)
          </div>
        </div>

        <!-- Main Card Body -->
        <div class="py-6 sm:py-8 px-6 sm:px-10 lg:px-14 space-y-8">
          
          <!-- Scientific Header & Technical Parameters -->
          <div class="pb-5 border-b border-slate-200">
            <div class="font-mono text-xs text-slate-500 tracking-wider mb-2.5 flex items-center gap-2 flex-wrap">
              <span class="font-bold text-slate-800">SPEC_ID: ${mod.id.toUpperCase()}</span>
              <span class="text-slate-300">/</span>
              <span>TIER: ${mod.tier.toUpperCase()}</span>
              <span class="text-slate-300">/</span>
              <span>DOMAIN: ${mod.category.toUpperCase()}</span>
              <span class="text-slate-300">/</span>
              <span>EST_HOURS: ${mod.duration}</span>
              <span class="text-slate-300">/</span>
              <span>STRUCTURE: 3x3 PROGRESSIVE MATRIX</span>
            </div>
            <h2 class="font-headline font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-tight mb-2.5">
              ${mod.title}
            </h2>
            <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              ${mod.summary}
            </p>
          </div>

          <!-- THE 3x3 CURRICULUM SYLLABUSES (3 Beginner, 3 Advanced, 3 Expert) -->
          <div class="space-y-8">
            ${renderSyllabusTier(
              '01. Beginner Foundations (Core Mechanics & Execution Lifecycle)',
              '01',
              beginnerTier
            )}

            ${renderSyllabusTier(
              '02. Advanced Architecture (System Design & Concurrency)',
              '02',
              advancedTier
            )}

            ${renderSyllabusTier(
              '03. Expert Internals (Low-Level Mastery & Enterprise Scaling)',
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
        (m.syllabus && m.syllabus.some((s) => s.chapter.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))) ||
        (m.id === 'javascript' && JSE_MODULES.some((jm) => jm.title.toLowerCase().includes(q) || jm.sections.some((sec) => sec.title.toLowerCase().includes(q))))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="os-white-card p-12 text-center max-w-xl mx-auto border border-slate-200">
          <div class="w-12 h-12 bg-slate-100 text-slate-500 rounded flex items-center justify-center text-xl mx-auto mb-3 border border-slate-300">
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
        const isJs = mod.id === 'javascript';
        return `
          <div class="os-white-card flex flex-col justify-between cursor-pointer group hover:shadow-xl transition-all border border-slate-200" data-card-track-id="${mod.id}">
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
                <div class="font-mono text-xs text-slate-500 uppercase tracking-wider mb-2 font-bold">
                  ${mod.tier} // ${mod.category.toUpperCase()}
                </div>

                <h3 class="font-headline font-bold text-xl sm:text-2xl text-slate-900 leading-tight group-hover:text-sky-600 transition-colors mb-3 tracking-tight">
                  ${mod.title}
                </h3>

                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  ${mod.summary}
                </p>

                ${isJs ? `
                  <!-- JSE 6-Module Breakdown -->
                  <div class="py-2.5 px-3 bg-amber-50/80 border border-amber-200 font-mono text-xs text-slate-800 mb-4 space-y-1 rounded-lg">
                    <div class="flex justify-between font-bold text-amber-900"><span>JSE 1: 6-Module Curriculum Outline</span><span class="text-amber-600">[01–06]</span></div>
                    <div class="flex justify-between text-slate-600"><span>[01–03] Intro, Variables, Operators:</span><span class="font-bold text-slate-800">3 Blocks</span></div>
                    <div class="flex justify-between text-slate-600"><span>[04–06] Control Flow, Functions, Errors:</span><span class="font-bold text-slate-800">3 Blocks</span></div>
                  </div>
                ` : `
                  <!-- Scientific 3x3 Breakdown -->
                  <div class="py-2.5 px-3 bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 mb-4 space-y-1">
                    <div class="flex justify-between"><span>[01-03] Beginner Foundations:</span><span class="font-bold">3 Chapters</span></div>
                    <div class="flex justify-between"><span>[04-06] Advanced Architecture:</span><span class="font-bold">3 Chapters</span></div>
                    <div class="flex justify-between"><span>[07-09] Expert Internals:</span><span class="font-bold">3 Chapters</span></div>
                  </div>
                `}
              </div>

              <!-- Action Bar -->
              <div class="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span class="text-xs font-mono text-slate-500 font-semibold">${isJs ? '6 OUTLINE MODULES' : '9 PROGRESSIVE MODULES'}</span>
                <button type="button" class="font-mono text-xs font-bold text-slate-900 hover:text-sky-600 flex items-center gap-1.5 transition-colors">
                  <span>${isJs ? 'INSPECT_OUTLINE &rarr;' : 'INSPECT_SYLLABUS &rarr;'}</span>
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

  // Global API for Sitemap & In-Page Technical Navigation
  window.openMatrixTrack = function (trackId) {
    if (MODULES_DATA.some((m) => m.id === trackId)) {
      currentActiveTrackId = trackId;
      currentViewMode = 'tabbed';
      renderIdeTabs();
      renderMainView();
      const mainEl = document.getElementById('osMainContentArea');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      playOsClick(800, 0.04);
    }
  };

  window.openMatrixGrid = function () {
    currentViewMode = 'grid';
    renderIdeTabs();
    renderMainView();
    const mainEl = document.getElementById('osMainContentArea');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    playOsClick(800, 0.04);
  };
})();
