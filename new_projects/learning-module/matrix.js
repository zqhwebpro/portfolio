/**
 * ENGINEERING KNOWLEDGE MATRIX — UNIQUE TECH OS ENGINE
 * Monospace Code Fonts, Font Awesome Icons, Crisp White Cards,
 * Interactive IDE Tabs, and Progressive 3-Block Curriculum Outlines for ALL 7 Tracks
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════
  // 1. TRACK THEMES & VISUAL TOKENS
  // ═══════════════════════════════════════════════════════════════════
  const TRACK_THEMES = {
  "javascript": {
    "accentText": "text-amber-500",
    "accentTextDark": "text-amber-600",
    "accentBg": "bg-amber-500",
    "accentBgHover": "hover:bg-amber-400",
    "accentBgLight": "bg-amber-100",
    "accentTextBadge": "text-amber-900",
    "accentBorderBadge": "border-amber-300",
    "middleBorder": "border-amber-400",
    "middleRing": "ring-amber-400/20",
    "hoverBorder": "hover:border-amber-300",
    "hoverBg": "hover:bg-amber-50/80",
    "btnText": "text-slate-950",
    "btnBg": "bg-amber-500 hover:bg-amber-400 text-slate-950",
    "icon": "fa-brands fa-js text-amber-500",
    "runnerExt": "js",
    "specPrefix": "JSE.1",
    "certName": "JavaScript Essentials Certification Track",
    "primaryHex": "#f59e0b",
    "darkHex": "#d97706",
    "lightBg": "#fffbeb",
    "borderHex": "#fcd34d",
    "darkTextHex": "#78350f",
    "textHex": "#0f172a",
    "pillContainerBg": "rgba(0, 0, 0, 0.12)",
    "pillContainerBorder": "rgba(0, 0, 0, 0.2)",
    "activeBtnBg": "#0f172a",
    "activeBtnText": "#ffffff",
    "inactiveBtnText": "rgba(15, 23, 42, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(0, 0, 0, 0.3)"
  },
  "typescript": {
    "accentText": "text-blue-500",
    "accentTextDark": "text-blue-600",
    "accentBg": "bg-blue-600",
    "accentBgHover": "hover:bg-blue-500",
    "accentBgLight": "bg-blue-100",
    "accentTextBadge": "text-blue-900",
    "accentBorderBadge": "border-blue-300",
    "middleBorder": "border-blue-400",
    "middleRing": "ring-blue-400/20",
    "hoverBorder": "hover:border-blue-300",
    "hoverBg": "hover:bg-blue-50/80",
    "btnText": "text-white",
    "btnBg": "bg-blue-600 hover:bg-blue-500 text-white",
    "icon": "fa-solid fa-code text-blue-600",
    "runnerExt": "ts",
    "specPrefix": "TS.5",
    "certName": "TypeScript Advanced Type System Certification Track",
    "primaryHex": "#2563eb",
    "darkHex": "#1d4ed8",
    "lightBg": "#eff6ff",
    "borderHex": "#93c5fd",
    "darkTextHex": "#1e3a8a",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#1e3a8a",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  },
  "react": {
    "accentText": "text-sky-500",
    "accentTextDark": "text-sky-600",
    "accentBg": "bg-sky-500",
    "accentBgHover": "hover:bg-sky-400",
    "accentBgLight": "bg-sky-100",
    "accentTextBadge": "text-sky-900",
    "accentBorderBadge": "border-sky-300",
    "middleBorder": "border-sky-400",
    "middleRing": "ring-sky-400/20",
    "hoverBorder": "hover:border-sky-300",
    "hoverBg": "hover:bg-sky-50/80",
    "btnText": "text-slate-950",
    "btnBg": "bg-sky-500 hover:bg-sky-400 text-slate-950",
    "icon": "fa-brands fa-react text-sky-500",
    "runnerExt": "tsx",
    "specPrefix": "REACT.19",
    "certName": "React 19 & Concurrent Fiber Architecture Certification Track",
    "primaryHex": "#0284c7",
    "darkHex": "#0369a1",
    "lightBg": "#f0f9ff",
    "borderHex": "#7dd3fc",
    "darkTextHex": "#075985",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#075985",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  },
  "php": {
    "accentText": "text-indigo-500",
    "accentTextDark": "text-indigo-600",
    "accentBg": "bg-indigo-600",
    "accentBgHover": "hover:bg-indigo-500",
    "accentBgLight": "bg-indigo-100",
    "accentTextBadge": "text-indigo-900",
    "accentBorderBadge": "border-indigo-300",
    "middleBorder": "border-indigo-400",
    "middleRing": "ring-indigo-400/20",
    "hoverBorder": "hover:border-indigo-300",
    "hoverBg": "hover:bg-indigo-50/80",
    "btnText": "text-white",
    "btnBg": "bg-indigo-600 hover:bg-indigo-500 text-white",
    "icon": "fa-brands fa-php text-indigo-600",
    "runnerExt": "php",
    "specPrefix": "PHP.8",
    "certName": "PHP 8.x Enterprise Backend Architecture Certification Track",
    "primaryHex": "#4f46e5",
    "darkHex": "#4338ca",
    "lightBg": "#eef2ff",
    "borderHex": "#a5b4fc",
    "darkTextHex": "#312e81",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#312e81",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  },
  "dotnet": {
    "accentText": "text-purple-600",
    "accentTextDark": "text-purple-700",
    "accentBg": "bg-purple-600",
    "accentBgHover": "hover:bg-purple-500",
    "accentBgLight": "bg-purple-100",
    "accentTextBadge": "text-purple-900",
    "accentBorderBadge": "border-purple-300",
    "middleBorder": "border-purple-400",
    "middleRing": "ring-purple-400/20",
    "hoverBorder": "hover:border-purple-300",
    "hoverBg": "hover:bg-purple-50/80",
    "btnText": "text-white",
    "btnBg": "bg-purple-600 hover:bg-purple-500 text-white",
    "icon": "fa-brands fa-windows text-purple-500",
    "runnerExt": "cs",
    "specPrefix": "DOTNET.9",
    "certName": ".NET 9 & C# Enterprise Systems Certification Track",
    "primaryHex": "#7c3aed",
    "darkHex": "#6d28d9",
    "lightBg": "#f5f3ff",
    "borderHex": "#c4b5fd",
    "darkTextHex": "#581c87",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#581c87",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  },
  "dns": {
    "accentText": "text-emerald-500",
    "accentTextDark": "text-emerald-600",
    "accentBg": "bg-emerald-600",
    "accentBgHover": "hover:bg-emerald-500",
    "accentBgLight": "bg-emerald-100",
    "accentTextBadge": "text-emerald-900",
    "accentBorderBadge": "border-emerald-300",
    "middleBorder": "border-emerald-400",
    "middleRing": "ring-emerald-400/20",
    "hoverBorder": "hover:border-emerald-300",
    "hoverBg": "hover:bg-emerald-50/80",
    "btnText": "text-white",
    "btnBg": "bg-emerald-600 hover:bg-emerald-500 text-white",
    "icon": "fa-solid fa-network-wired text-emerald-600",
    "runnerExt": "zone",
    "specPrefix": "DNS.RFC",
    "certName": "Global DNS & Network Infrastructure Certification Track",
    "primaryHex": "#059669",
    "darkHex": "#047857",
    "lightBg": "#ecfdf5",
    "borderHex": "#6ee7b7",
    "darkTextHex": "#064e3b",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#064e3b",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  },
  "devops": {
    "accentText": "text-fuchsia-500",
    "accentTextDark": "text-fuchsia-600",
    "accentBg": "bg-fuchsia-600",
    "accentBgHover": "hover:bg-fuchsia-500",
    "accentBgLight": "bg-fuchsia-100",
    "accentTextBadge": "text-fuchsia-900",
    "accentBorderBadge": "border-fuchsia-300",
    "middleBorder": "border-fuchsia-400",
    "middleRing": "ring-fuchsia-400/20",
    "hoverBorder": "hover:border-fuchsia-300",
    "hoverBg": "hover:bg-fuchsia-50/80",
    "btnText": "text-white",
    "btnBg": "bg-fuchsia-600 hover:bg-fuchsia-500 text-white",
    "icon": "fa-solid fa-server text-fuchsia-500",
    "runnerExt": "conf",
    "specPrefix": "DEVOPS.CI",
    "certName": "DevOps, Cloud Containers & CI/CD Certification Track",
    "primaryHex": "#c026d3",
    "darkHex": "#a21caf",
    "lightBg": "#fdf4ff",
    "borderHex": "#f0abfc",
    "darkTextHex": "#701a75",
    "textHex": "#ffffff",
    "pillContainerBg": "rgba(0, 0, 0, 0.22)",
    "pillContainerBorder": "rgba(255, 255, 255, 0.25)",
    "activeBtnBg": "#ffffff",
    "activeBtnText": "#701a75",
    "inactiveBtnText": "rgba(255, 255, 255, 0.85)",
    "actionBtnBg": "#0f172a",
    "actionBtnText": "#ffffff",
    "actionBtnBorder": "rgba(255, 255, 255, 0.3)"
  }
};

  // ═══════════════════════════════════════════════════════════════════
  // 2. CURRICULUM MODULES DATA FOR ALL 7 TRACKS
  // ═══════════════════════════════════════════════════════════════════
  const JSE_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "JSE: Module 1: Introduction to JavaScript and Computer Programming",
    "shortTitle": "Intro & Computer Programming",
    "desc": "Foundations of computation, language history, modern JS engines, dev environment setup, and execution lifecycle.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to JavaScript Essentials 1",
        "summary": "Orientation to modern JavaScript fundamentals, computational thinking, and developer tooling."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – About JavaScript",
        "summary": "History, ECMAScript standards, engine runtime architecture, and client vs server execution."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Setting up programming environment",
        "summary": "Node.js, browser developer tools, code editors (VS Code), and command line basics."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Hello, World!",
        "summary": "Writing, linking, and running your first executable JavaScript programs in browser and console."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – Module Test",
        "summary": "Comprehensive assessment covering programming basics, syntax rules, and environment setup."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "JSE: Module 2: Variables, Data Types, Type Casting, and Comments",
    "shortTitle": "Variables, Types & Comments",
    "desc": "Memory management with let/const/var, primitive types, type coercion, dynamic casting, and code documentation.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – Variables",
        "summary": "Variable declaration, initialization, assignment, identifier naming rules, and block scoping."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – Data types and type casting – Part 1",
        "summary": "Primitive types: numbers, strings, booleans, undefined, null, and typeof operator inspections."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – Data types and type casting – Part 2",
        "summary": "Explicit vs implicit type conversion, BigInt, Symbols, and common NaN conversion pitfalls."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – Comments",
        "summary": "Single-line and multi-line comments, JSDoc annotations, and code self-documentation best practices."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Module Test",
        "summary": "Comprehensive examination testing type coercion, variable scope, and primitive allocations."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "JSE: Module 3: Operators and User Interaction",
    "shortTitle": "Operators & User Interaction",
    "desc": "Arithmetic, assignment, logical operators, string concatenation, dialog prompts, and basic input/output.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – Assignment, arithmetic, and logical operators",
        "summary": "Binary/unary operators, precedence rules, logical AND/OR/NOT, and short-circuit evaluation."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – String, comparison, and other JS operators",
        "summary": "Strict equality (===) vs loose equality (==), relational operators, template literals, and ternary operator."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – Interacting with the user",
        "summary": "Modal interaction dialogs: window.alert(), window.prompt(), window.confirm(), and console logging."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – Module Test",
        "summary": "Assessment testing operator evaluation precedence, truthy/falsy logic, and user dialog handling."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.2",
    "title": "JSE: Module 4: Control Flow – Conditional Execution and Loops",
    "shortTitle": "Control Flow & Loops",
    "desc": "Decision branching with if/else/switch, deterministic loops, while iterations, and loop jump controls.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – Conditional execution",
        "summary": "Conditional branching using if, if-else cascades, nested conditions, and switch-case statements."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – Loops",
        "summary": "Iteration mechanics: while loops, do-while loops, for loops, break and continue flow control."
      },
      {
        "id": "4.2",
        "title": "4.2. Module 4 Completion – Module Test",
        "summary": "Module examination validating loop termination invariants, nested iteration, and condition trees."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.2",
    "title": "JSE: Module 5: Functions",
    "shortTitle": "Functions & Execution Context",
    "desc": "Function declarations, expressions, arrow functions, parameter defaults, return statements, and call stack scoping.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – Functions – Part 1",
        "summary": "Function declaration syntax, parameter passing, return statements, and local vs global scope."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – Functions – Part 2",
        "summary": "Function expressions, first-class functions, arrow syntax, callbacks, and recursion basics."
      },
      {
        "id": "5.2",
        "title": "5.2. Module 5 Completion – Module Test",
        "summary": "Comprehensive test covering functional modularity, return value flow, and closure scoping."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "JSE: Module 6: Errors, exceptions, debugging, and troubleshooting",
    "shortTitle": "Errors, Debugging & Troubleshooting",
    "desc": "Error categories, runtime exceptions, try/catch/finally error handling, throw statements, and DevTools troubleshooting.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – Errors and Exceptions – Part 1",
        "summary": "Syntax errors, reference errors, type errors, range errors, and error propagation mechanics."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – Errors and Exceptions – Part 2",
        "summary": "Structured exception handling with try-catch-finally blocks and throwing custom Error objects."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – Code Debugging and Troubleshooting",
        "summary": "Using browser debugger, setting breakpoints, stepping through call frames, and watch expressions."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Module Test",
        "summary": "Final certification module test evaluating error interception, debugging techniques, and troubleshooting."
      }
    ]
  }
];

  const TS_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "TS: Module 1: Static Type Foundations & Compiler Configuration",
    "shortTitle": "Static Types & Compiler Config",
    "desc": "Architect robust enterprise applications with tsc compiler options, strict mode verification, primitives, unions, and interfaces.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to TypeScript 5 Type System",
        "summary": "Introduction to JavaScript superset mechanics, compiler architecture, and static type safety."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – Compiler Configuration & Strict Modes (tsconfig.json)",
        "summary": "Configuring strict flags, target ECMAScript versions, module resolution, and path aliases."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Primitives, Literal Types & Type Inference",
        "summary": "Static primitives, string/number literals, any vs unknown, void, never, and contextual typing."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Interfaces vs Type Aliases & Structural Subtyping",
        "summary": "Duck typing mental model, interface extension, declaration merging, and union/intersection types."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – Compiler & Type Assignment Test",
        "summary": "Evaluation testing tsconfig strictness, type compatibility, and structural duck typing."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "TS: Module 2: Function Signatures, Labeled Tuples & Type Guards",
    "shortTitle": "Functions, Tuples & Type Guards",
    "desc": "Construct robust function overloads, labeled tuples, custom type predicates, and discriminated unions.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – Function Overloads & Implementation Signatures",
        "summary": "Defining multiple call signatures, implementation contracts, and return type narrowing."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – Labeled Tuples, Rest Elements & Readonly Tuples",
        "summary": "Fixed-length arrays, labeled elements for IDE auto-complete, and immutable readonly tuples."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – Custom Type Predicates (val is Type) & Assertion Functions",
        "summary": "Building user-defined type guards, assertion functions (asserts condition), and control flow narrowing."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – Discriminated Unions & Exhaustiveness Checking",
        "summary": "Tagging objects with literal discriminant keys and ensuring compile-time completeness via never."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Signatures & Type Guards Exam",
        "summary": "Assessment covering function overload dispatch, type predicates, and exhaustiveness guards."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "TS: Module 3: Reusable Generics & Parameter Constraints",
    "shortTitle": "Generics & Parameter Constraints",
    "desc": "Architect reusable generic components, class factories, extends constraints, and keyof lookup indexing.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – Generic Functions, Interfaces & Classes",
        "summary": "Type variables <T>, generic identity functions, multi-parameter type signatures, and class factories."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Generic Constraints with extends & Default Types",
        "summary": "Restricting type parameters with interface bounds, conditional defaults, and primitive constraints."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – The keyof Index Operator & Indexed Access Types",
        "summary": "Extracting property keys (keyof T), indexed access types (T[K]), and type-safe property extractors."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – Generic Abstraction Assessment",
        "summary": "Comprehensive test evaluating generic container design, constraint enforcement, and key indexing."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": "TS: Module 4: Conditional Types & Pattern Matching with 'infer'",
    "shortTitle": "Conditional Types & 'infer'",
    "desc": "Type-level ternary expressions, distributive conditional branching, and pattern matching return types with infer.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – Conditional Type Syntax (T extends U ? X : Y)",
        "summary": "Type-level ternary expressions, boolean logic at compile time, and non-nullable type extraction."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – Distributive Conditional Types & Union Filtering",
        "summary": "Automatic distribution over naked type parameters, Exclude<T, U>, and Extract<T, U> mechanics."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – Pattern Matching with the infer Keyword",
        "summary": "Unpacking promise resolutions (Awaited<T>), function return types (ReturnType<T>), and parameters."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – Type-Level Logic Assessment",
        "summary": "Examination testing conditional type algebra, distribution suppression, and infer unpacking."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": "TS: Module 5: Mapped Types & Template Literal Remapping",
    "shortTitle": "Mapped Types & Template Literals",
    "desc": "Transform object shapes dynamically with mapped types, modifiers, key remapping via as, and template literal strings.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – Mapped Type Foundations ([K in keyof T])",
        "summary": "Iterating object keys, homomorphic mapping, and building Partial<T>, Required<T>, Readonly<T>."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – Modifier Prefixing (+readonly, -readonly, +?, -?)",
        "summary": "Stripping optionality and mutability flags to produce strict immutable schemas."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – Key Remapping via as & Template Literal Types",
        "summary": "Prefixing getters/setters with key remapping, string union interpolation, and regex string patterns."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – Advanced Type Transformation Test",
        "summary": "Assessment validating custom mapped utility types, template literal concatenation, and key remapping."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "TS: Module 6: Recursive Types & Branded Nominal Type Systems",
    "shortTitle": "Recursive Types & Nominal Branding",
    "desc": "Infinite data structures with recursive type aliases and nominal type safety using unique symbol branding.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – Recursive Types (JSONValue, DeepPartial, DeepReadonly)",
        "summary": "Self-referencing type definitions, arbitrary nested JSON objects, and recursive tree walking."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – Nominal Typing via Unique Symbol Branding",
        "summary": "Overcoming structural typing limitations: creating distinct UserId, OrderId, and Currency types."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – Type-Safe Domain Identifiers & Validated Primitives",
        "summary": "Sanitized strings, validated email brand tags, and preventing accidental ID swaps at compile time."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Type Safety & Branding Exam",
        "summary": "Test covering recursive compiler depth limits, nominal branding tags, and domain primitive validation."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": "TS: Module 7: Ambient Declarations & Library Definitions (.d.ts)",
    "shortTitle": "Ambient Declarations & .d.ts",
    "desc": "Type legacy JavaScript with ambient declarations, module augmentations, declare global, and definitely typed packages.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – Ambient Declarations & declare Keyword",
        "summary": "Declaring external variables, functions, and global constants without emitting runtime JavaScript."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – Module Declarations (.d.ts) & Triple-Slash Directives",
        "summary": "Writing module definition files for non-typed npm libraries and managing reference paths."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – Declaration Merging & Global Namespace Augmentation",
        "summary": "Extending window, express Request, and process.env with type-safe environmental variables."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – Definition File Authoring Test",
        "summary": "Assessment covering library typing, ambient module resolution, and declaration merging."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": "TS: Module 8: TypeScript Compiler API & Custom AST Transformers",
    "shortTitle": "Compiler API & AST Transformers",
    "desc": "Inspect, analyze, and transform TypeScript source code programmatically using the compiler API and AST transformers.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – Program, SourceFile & Abstract Syntax Tree (AST)",
        "summary": "Parsing source code into Node trees, token scanning, syntax kinds, and AST inspection tools."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – TypeChecker API & Symbol Resolution",
        "summary": "Querying semantic information: resolved types, interface definitions, call signatures, and diagnostics."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – Custom AST Transformation Pipelines",
        "summary": "Writing visitor functions to inject telemetry, auto-generate serializers, and rewrite decorators."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – AST Metaprogramming Assessment",
        "summary": "Evaluation testing syntax tree traversal, symbol lookup, and custom node factory emission."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": "TS: Module 9: Strict Soundness, Variance & Monorepo Scaling",
    "shortTitle": "Soundness, Variance & Monorepos",
    "desc": "Master structural vs nominal subtyping, function parameter contravariance, Project References, and monorepos.",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – Subtyping, Covariance, Contravariance & Invariance",
        "summary": "Type soundness rules: strictFunctionTypes parameter contravariance and return type covariance."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – TypeScript Project References & Composite Builds",
        "summary": "Architecting large monorepos with tsconfig references, incremental compilation, and build caches."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Enterprise Monorepo Compilation Tuning",
        "summary": "Optimizing type-checking latency, skipLibCheck tradeoffs, and CI validation pipelines."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – TypeScript Master Certification Exam",
        "summary": "Comprehensive certification exam evaluating type theory soundness, variance, and monorepo scaling."
      }
    ]
  }
];

  const REACT_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "React: Module 1: Component Model, JSX & Virtual DOM Mechanics",
    "shortTitle": "Component Model & Virtual DOM",
    "desc": "Understand the foundational mental model: component tree composition, JSX compilation, Virtual DOM, and reconciliation keys.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to React 19 & Component Architecture",
        "summary": "Foundations of declarative UI rendering, pure functions with props, and UI as a function of state."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – JSX Transpilation & React Element Objects",
        "summary": "How JSX compiles to jsxRuntime calls, element immutability, and component vs element distinctions."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Virtual DOM Diffing & Reconciliation Keys",
        "summary": "Heuristic O(n) diffing algorithm, key prop identity preservation, and list reordering hazards."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Component Composition & Prop Drilling Mitigation",
        "summary": "Children composition patterns, slots, render props, and building compound components."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – Virtual DOM & Component Fundamentals",
        "summary": "Assessment testing element tree reconciliation, key mechanics, and declarative composition."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "React: Module 2: Core Hooks Lifecycle & State Batching",
    "shortTitle": "Hooks Lifecycle & State Batching",
    "desc": "Master execution lifecycle: useState setter batching, useEffect cleanup timing, useRef instance preservation, and hook dispatcher queues.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – useState Execution Semantics & Automatic Batching",
        "summary": "State setter queues, functional updater forms, and automatic microtask batching in React 19."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – useEffect Dependencies, Subscriptions & Cleanup Timing",
        "summary": "Synchronizing with external systems, passive effect scheduling, and memory leak cleanup cycles."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – useRef Mutable Values & DOM Node Referencing",
        "summary": "Preserving mutable references without triggering re-renders, forwardRef, and DOM measurement."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – Hook Rules & Internal Dispatcher Call Stacks",
        "summary": "Rules of Hooks, internal linked-list state storage in Fiber nodes, and debugging hook mismatches."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Core Hooks Lifecycle Assessment",
        "summary": "Examination testing effect execution order, updater closures, and state batching invariants."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "React: Module 3: Synthetic Events, Controlled UI & Form Architectures",
    "shortTitle": "Synthetic Events & Form Actions",
    "desc": "Event delegation pool, controlled vs uncontrolled inputs, React 19 useActionState, and native server action binding.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – React SyntheticEvent System & Event Delegation",
        "summary": "Cross-browser event normalization, bubbling phases, and root container event delegation."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Controlled vs Uncontrolled Form Components",
        "summary": "Two-way state binding vs uncontrolled ref inputs, defaultValue, and form validation."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – React 19 useActionState & Server Action Form Handlers",
        "summary": "Handling async form submissions natively with pending states, optimistic UI, and FormData."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – Event Handling & Form Binding Test",
        "summary": "Assessment covering synthetic event propagation, input synchronization, and form actions."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": "React: Module 4: Performance Optimization & Referential Stability",
    "shortTitle": "Performance & Referential Stability",
    "desc": "Audit and eliminate unnecessary renders: memoizing expensive calculations, stable function references, and Profiler auditing.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – Re-render Causes & The React Compiler Mental Model",
        "summary": "Tracking why components re-render: state updates, parent re-renders, and context consumers."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – useMemo, useCallback & Referential Equality",
        "summary": "Caches across renders, shallow dependency comparison, and preventing child invalidations."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – Component Memoization (React.memo) & Profiler DevTools",
        "summary": "Custom arePropsEqual comparators, flamegraphs, commit timing, and interaction tracing."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – Performance Optimization Assessment",
        "summary": "Test evaluating render bottleneck diagnostics, memoization trade-offs, and referential stability."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": "React: Module 5: Custom Reusable Hook Pipelines & Subscriptions",
    "shortTitle": "Custom Hooks & Subscriptions",
    "desc": "Package complex stateful workflows into testable custom hooks, external store subscriptions, and AbortController integration.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – Custom Hook Design & State Logic Encapsulation",
        "summary": "Extracting reusable behavioral primitives, composable hook pipelines, and API ergonomics."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – useSyncExternalStore for Concurrent-Safe Stores",
        "summary": "Subscribing to external stores without tearing under concurrent rendering, snapshot memoization."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – Network Request Hooks with AbortController Cleanups",
        "summary": "Race-condition prevention, request cancellation on unmount, and automated error retries."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – Custom Hook Pipeline Examination",
        "summary": "Assessment covering custom hook composability, external store subscriptions, and async cleanups."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "React: Module 6: Finite State Machines & Strategic Context Splitting",
    "shortTitle": "FSM & Context Architecture",
    "desc": "Replace fragile boolean flags with deterministic state machines via useReducer and split React Context to prevent tree re-renders.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – Complex State with useReducer & Action Creators",
        "summary": "Deterministic transition tables, discriminated union actions, and predictable state transitions."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – React Context API & Provider Hierarchy",
        "summary": "Propagating global dependencies, Theme/Auth providers, and custom hook access wrappers."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – Context Splitting to Prevent Unnecessary Tree Re-renders",
        "summary": "Separating State and Dispatch contexts to isolate active consumers from passive listeners."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Global State & FSM Architecture Test",
        "summary": "Test evaluating reducer purity, context subscription boundaries, and FSM transition safety."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": "React: Module 7: React Fiber Reconciliation & Concurrent Engine",
    "shortTitle": "Fiber Architecture & Concurrency",
    "desc": "Deep-dive into Fiber nodes, double-buffering work trees, Lanes priority bitmasks, and non-blocking transitions.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – Fiber Node Architecture (Child, Sibling, Return)",
        "summary": "Linked-list tree data structure, units of work, and alternate work-in-progress double buffering."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – WorkLoop, Render Phase vs Commit Phase",
        "summary": "Interruptible render phase, time-slicing scheduler, and synchronous DOM mutation commit phase."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – Concurrent Transitions (useTransition) & Lanes Priority",
        "summary": "Urgent vs non-urgent updates, 31-bit Lanes priority allocation, and cooperative multitasking."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – Fiber Engine & Concurrency Exam",
        "summary": "Comprehensive exam testing Fiber traversal, double buffering, and Lane priority preemption."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": "React: Module 8: React Server Components (RSC) & Streaming SSR Pipeline",
    "shortTitle": "Server Components & Streaming SSR",
    "desc": "Unify server and client: zero-bundle-size server components, HTML streaming with Suspense, and Server Actions.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – Server Components vs Client Components ('use client')",
        "summary": "The client-server boundary, module graph splitting, and serializable prop restrictions."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – Streaming SSR with <Suspense> & Progressive Hydration",
        "summary": "Out-of-order HTML chunk delivery over HTTP, selective hydration, and instant First Contentful Paint."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – Zero-Bundle-Size Server Dependencies & Direct DB Queries",
        "summary": "Executing database queries directly in components without client bundle weight or REST endpoints."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – RSC Architecture & Streaming Assessment",
        "summary": "Evaluation testing component graph serialization, selective hydration, and streaming SSR."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": "React: Module 9: Custom Reconcilers & Low-Level Architectural Embedding",
    "shortTitle": "Custom Reconcilers & Embedding",
    "desc": "Implement custom host renderers utilizing package react-reconciler (rendering to Canvas, Terminal, or Three.js).",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – The react-reconciler Package & Host Config",
        "summary": "Implementing appendInitialChild, createInstance, prepareUpdate, and commitUpdate methods."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – Building Custom Renderers (Terminal/Canvas/Three.js)",
        "summary": "Translating React declarative trees into custom graphics or CLI terminal primitives."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Micro-Frontend Lifecycle & Custom Element Hydration",
        "summary": "Wrapping React trees into Web Components, shadow DOM style isolation, and multi-root mounting."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – React 19 Master Architect Certification",
        "summary": "Master certification examination covering custom reconciler pipelines and enterprise scalability."
      }
    ]
  }
];

  const PHP_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "PHP: Module 1: Modern PHP 8.x Syntax & Strict Type System",
    "shortTitle": "Modern PHP 8 Syntax & Types",
    "desc": "Execute with declare(strict_types=1), match expressions, nullsafe operator (?->), and named arguments.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to PHP 8 & Zend Engine Overview",
        "summary": "Architecture of modern PHP, Zend Engine compilation, opcodes, and strict typing mental model."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – declare(strict_types=1) & Scalar Type Declarations",
        "summary": "Enforcing scalar parameter types, return type declarations, and union types (int|float)."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Match Expressions vs Switch & Nullsafe Operator (?->)",
        "summary": "Strict equality matching, value returning expressions, and chaining safe navigation operators."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Named Arguments, Mixed Type & Intersection Types",
        "summary": "Calling functions with named parameters, mixed return types, and intersection types (&)."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – PHP 8 Modern Syntax Test",
        "summary": "Assessment covering strict type coercion prevention, match expression returns, and null handling."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "PHP: Module 2: Object-Oriented Programming (OOP) Core & Attributes",
    "shortTitle": "OOP Core & Native Attributes",
    "desc": "Constructor property promotion, readonly classes, backed enums, interfaces, and native PHP 8 attributes.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – Constructor Property Promotion & Readonly Classes",
        "summary": "Boilerplate reduction, immutable data transfer objects (DTOs), and readonly class modifiers."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – Enums with Backed Values & Interface Implementation",
        "summary": "String/int backed enums, match integration, and implementing custom methods on enums."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – PHP 8 Native Attributes (#[Route], #[Inject])",
        "summary": "Replacing docblock annotations with native structured metadata and ReflectionAttribute parsing."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – Interfaces, Abstract Classes & Trait Precedence",
        "summary": "Polymorphism, interface segregation, trait conflict resolution, and abstract templates."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – OOP Core & Attributes Exam",
        "summary": "Comprehensive test covering constructor promotion, readonly invariants, and attribute reflection."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "PHP: Module 3: Secure Database Connectivity with PDO",
    "shortTitle": "Secure Database with PDO",
    "desc": "Robust database access using PDO: parameterized prepared statements, ACID transactions, and error handling.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – PDO Connection DSN & Error Modes (ERRMODE_EXCEPTION)",
        "summary": "Configuring PostgreSQL/MySQL DSN strings, connection pooling, and exception attributes."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Prepared Statements & Parameter Binding",
        "summary": "Eliminating SQL injection through parameterized bindValue/bindParam, and fetch object hydration."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – ACID Transaction Isolation & Rollback Handling",
        "summary": "Atomic multi-table mutations, beginTransaction, commit, and catching PDOExceptions to rollback."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – Secure Database Operations Test",
        "summary": "Assessment testing SQL injection defenses, transaction boundaries, and prepared statement caching."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": "PHP: Module 4: PSR Standards Compliance & Modular Namespaces",
    "shortTitle": "PSR Standards & Namespaces",
    "desc": "Build interoperable enterprise backends: PSR-4 autoloading, PSR-7 HTTP messages, and PSR-15 middleware.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – PSR-4 Autoloading Standard & Namespace Architecture",
        "summary": "Mapping namespace hierarchies to file directories and eliminating manual require/include."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – PSR-7 HTTP Message Interfaces (Request / Response)",
        "summary": "Immutable ServerRequestInterface, ResponseInterface, URI parsing, and stream bodies."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – PSR-15 HTTP Server Handlers & Middleware Pipelines",
        "summary": "Building onion-architecture middleware pipelines (authentication, CORS, logging, compression)."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – PSR Compliance & Standards Exam",
        "summary": "Test evaluating autoloading resolution, immutable HTTP message transformations, and middleware chains."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": "PHP: Module 5: Enterprise Composer Architecture & Package Management",
    "shortTitle": "Composer Architecture & Packages",
    "desc": "Dependency management: composer.json schema, classmap optimization (-o), lock files, and semantic versioning.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – composer.json Schema & Classmap Optimization (-o)",
        "summary": "Managing require vs require-dev, optimizing the autoloader for production with dump-autoload -o."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – Semantic Version Constraints (^, ~) & Lock Files",
        "summary": "Deterministic reproducible builds via composer.lock, version resolution, and security audits."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – Authoring & Publishing Custom Packagist Libraries",
        "summary": "Package anatomy, creating reusable enterprise packages, and configuring private Git repositories."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – Dependency Management & Composer Test",
        "summary": "Assessment covering autoloader optimization benchmarks, version constraint solving, and package release."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "PHP: Module 6: Custom Modular MVC Framework Engineering",
    "shortTitle": "Custom MVC Framework Design",
    "desc": "Engineer a decoupled MVC framework: front controller pattern, attribute routing, and PSR-11 DI container.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – Front Controller Pattern & .htaccess URL Rewriting",
        "summary": "Directing all HTTP traffic through public/index.php, request parsing, and environment loading."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – Attribute-Based Routing Engine & Controller Dispatch",
        "summary": "Matching HTTP methods and URI paths with regex parameters to invoke controller actions."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – PSR-11 Dependency Injection Container & Reflection",
        "summary": "Recursive constructor auto-wiring via ReflectionClass, service bindings, and singletons."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Custom MVC Framework Architecture Exam",
        "summary": "Examination testing front controller routing, DI container auto-wiring, and MVC response flow."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": "PHP: Module 7: PHP 8 JIT Compiler & OPcache Internal Optimization",
    "shortTitle": "PHP JIT Compiler & OPcache",
    "desc": "Zend OPcache internals, bytecode optimization, Tracing JIT compilation, and opcache.preload configuration.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – OPcache Bytecode Compilation & Memory Internals",
        "summary": "How PHP caches AST opcode compilations in shared memory (SHM) to skip redundant parsing."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – Tracing JIT vs Function JIT Compilation Modes",
        "summary": "Compiling hot opcode traces directly into machine code (x86_64) for CPU-bound computations."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – OPcache Preloading (opcache.preload) for Fast Boot",
        "summary": "Compiling framework classes into permanent memory at server boot to achieve near-instant requests."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – OPcache & JIT Compilation Assessment",
        "summary": "Test covering shared memory tuning, JIT buffer sizing, and preloading script verification."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": "PHP: Module 8: Fibers Concurrency & Asynchronous Event Loops",
    "shortTitle": "Fibers Concurrency & Event Loops",
    "desc": "Non-blocking concurrency with PHP 8.1 Fibers (suspend/resume), streams, and async event loops with Revolt and ReactPHP.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – PHP 8.1 Fibers Architecture (Suspend & Resume)",
        "summary": "Full-stack coroutines, managing execution stack contexts, and cooperative multitasking."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – Non-Blocking I/O with Streams (stream_select)",
        "summary": "Multiplexing network sockets without blocking the main process, timeout management."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – Async Concurrency with Revolt, ReactPHP & Amp",
        "summary": "Building asynchronous HTTP clients, concurrent file reading, and event loop scheduling."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – Asynchronous Execution & Fibers Exam",
        "summary": "Assessment testing fiber stack switching, non-blocking socket loops, and async flow control."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": "PHP: Module 9: High-Throughput Runtimes & Performance Profiling",
    "shortTitle": "High-Throughput Runtimes & Profiling",
    "desc": "Eliminate traditional request lifecycle overhead: RoadRunner and Swoole application servers and profiling.",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – Persistent Worker Runtimes: RoadRunner & Swoole",
        "summary": "Booting framework once in memory, processing thousands of requests per second with worker pools."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – Memory Leak Prevention in Long-Running PHP Daemons",
        "summary": "Garbage collection cycles, clearing static caches, and unsetting circular references."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Performance Bottleneck Profiling with Xdebug & Blackfire",
        "summary": "Generating call graphs, memory allocation flame charts, and micro-optimizing critical paths."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – PHP 8 Backend Master Certification Exam",
        "summary": "Master certification examination evaluating persistent daemon runtimes and high-concurrency architectures."
      }
    ]
  }
];

  const DOTNET_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": ".NET: Module 1: Modern C# Syntax & Type System Foundations",
    "shortTitle": "Modern C# Syntax & Type System",
    "desc": "Master modern C# features: value types vs reference types, immutable records, pattern matching, and nullable references.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to .NET 9 & CLR Runtime Architecture",
        "summary": "Overview of Common Language Runtime (CLR), Common Intermediate Language (CIL), and modern C# 13."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – Value Types vs Reference Types & Memory Layout",
        "summary": "Stack vs Heap allocation, structs vs classes, boxing/unboxing overhead, and readonly structs."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Records, Pattern Matching & Positional Deconstruction",
        "summary": "Record structs/classes, with-expressions, switch expressions, property patterns, and relational patterns."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Nullable Reference Types & ValueTask<T> Async Basics",
        "summary": "Compiler null-state analysis, null-forgiving operator (!), and zero-allocation ValueTask for synchronous returns."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – Modern C# Language Fundamentals Test",
        "summary": "Assessment covering stack/heap memory, pattern matching exhaustiveness, and null safety."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": ".NET: Module 2: ASP.NET Core Architecture & Host Bootstrap",
    "shortTitle": "ASP.NET Core Host & DI Bootstrap",
    "desc": "Understand WebApplicationBuilder bootstrap, dependency injection service lifetimes, and configuration providers.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – WebApplicationBuilder & Host Configuration",
        "summary": "Configuring Kestrel server options, environment-specific configs, and building the web application host."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – Native Dependency Injection: Scoped, Transient, Singleton",
        "summary": "Service container registrations, captive dependency hazards, and IServiceScopeFactory disposal."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – Configuration Providers (appsettings.json, Env Vars)",
        "summary": "Hierarchical configuration, strongly-typed Options pattern (IOptions<T>, IOptionsSnapshot<T>)."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – Structured Logging with Serilog & OpenTelemetry",
        "summary": "Log event formatting, structured semantic tokens, and exporting distributed traces via OTLP."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Host Bootstrap & DI Lifecycle Exam",
        "summary": "Evaluation testing DI scope validation, captive dependency detection, and configuration binding."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": ".NET: Module 3: Minimal APIs & Route Endpoint Binding",
    "shortTitle": "Minimal APIs & Route Endpoints",
    "desc": "Build lightning-fast HTTP endpoints: route mapping, parameter binding, endpoint filters, and TypedResults.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – Minimal API Route Handlers (app.MapGet, MapPost)",
        "summary": "High-performance endpoint routing without controller overhead, lambda handlers, and route groups."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Model Binding, Route Parameters & Validation",
        "summary": "Binding from route, query, headers, and JSON body; integrating FluentValidation."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – Response Formatting with TypedResults & OpenAPI",
        "summary": "Type-safe HTTP responses (Results.Ok, Results.NotFound), OpenAPI metadata, and Swagger generation."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – Minimal APIs Architecture Test",
        "summary": "Assessment covering route constraint matching, typed result union return types, and endpoint filters."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": ".NET: Module 4: Entity Framework Core 9 Query Optimization",
    "shortTitle": "EF Core 9 Query Optimization",
    "desc": "Master EF Core data access: DbContext pooling, compiled LINQ queries, AsNoTracking, and split query execution.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – DbContext Configuration, Pooling & Migrations",
        "summary": "AddDbContextPool for high-throughput connection recycling, code-first migrations, and model caching."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – LINQ Queries, AsNoTracking & Compiled Queries",
        "summary": "Eliminating change tracker overhead for read queries, and pre-compiled LINQ queries (EF.CompileQuery)."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – Split Queries, Batch Updates & Raw SQL Interpolation",
        "summary": "Mitigating cartesian explosion via AsSplitQuery, ExecuteUpdate/ExecuteDelete batching, and FromSqlRaw."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – EF Core 9 High-Performance Data Access",
        "summary": "Test evaluating query plan diagnostics, change tracker performance, and database indexing."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": ".NET: Module 5: Custom Pipeline Middleware & Action Filters",
    "shortTitle": "Custom Middleware & Filters",
    "desc": "Construct enterprise middleware: RequestDelegate pipelines, global exception handlers, and correlation logging.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – RequestDelegate Middleware Execution Pipeline",
        "summary": "The bidirectional HTTP pipeline, invoke next delegate, short-circuiting responses, and branch routes."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – Centralized Exception Handling Middleware",
        "summary": "ProblemDetails standard (RFC 7807), exception interception, and hiding internal stack traces in prod."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – Correlation ID Propagation & Request Timing Headers",
        "summary": "Injecting X-Correlation-ID into HttpContext and logging scopes for distributed microservice tracing."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – HTTP Pipeline Middleware Assessment",
        "summary": "Evaluation testing middleware order invariants, error masking, and correlation tracing."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": ".NET: Module 6: Clean Architecture & CQRS with MediatR",
    "shortTitle": "Clean Architecture & CQRS",
    "desc": "Architect enterprise microservices: Domain-Driven Design (DDD), CQRS commands/queries, and MediatR pipeline behaviors.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – Clean Architecture Layers (Domain, App, Infra, Web)",
        "summary": "Dependency inversion principle: domain entities at the core, decoupled persistence, and ports/adapters."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – CQRS Commands & Queries Separation with MediatR",
        "summary": "Decoupling mutations from queries with IRequest and IRequestHandler interfaces for single responsibility."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – MediatR Pipeline Behaviors (Validation, Caching, Logging)",
        "summary": "Cross-cutting concerns via IPipelineBehavior<TRequest, TResponse>, fluent validation decorators."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Enterprise Clean Architecture Exam",
        "summary": "Test covering domain encapsulation, command/query separation, and pipeline behavior sequencing."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": ".NET: Module 7: High-Performance Memory Engineering with Span & Memory",
    "shortTitle": "Zero-Allocation Memory & Span",
    "desc": "Zero-allocation memory mastery: Span<T>, ReadOnlySpan<char>, stackalloc, and ArrayPool buffer recycling.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – Span<T> and ReadOnlySpan<char> Zero-Copy Slicing",
        "summary": "Ref structs on the stack, sub-string slicing without heap allocations, and contiguous memory access."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – stackalloc Memory Allocation & Safety Limits",
        "summary": "Direct stack memory buffers for fast operations, avoiding Garbage Collection overhead completely."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – Buffer Pooling with ArrayPool<T>.Shared",
        "summary": "Renting and returning byte buffers for high-volume network streams and file I/O operations."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – Zero-Allocation Memory Engineering Test",
        "summary": "Assessment covering Span ref struct lifetime rules, stackoverflow prevention, and pool returns."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": ".NET: Module 8: Kestrel Web Server Tuning & HTTP/3 QUIC Protocol",
    "shortTitle": "Kestrel Tuning & HTTP/3 QUIC",
    "desc": "Tune Kestrel for extreme throughput: socket transport layer, connection limits, and HTTP/3 QUIC protocol.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – Kestrel Socket Transport & Connection Multiplexing",
        "summary": "SocketsHttpHandler, epoll/kqueue IO loops, connection limits, and Keep-Alive timeouts."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – ThreadPool Tuning & Starvation Prevention",
        "summary": "Configuring worker and I/O completion threads, avoiding sync-over-async deadlocks (.Result / .Wait())."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – HTTP/3 over QUIC UDP Transport Setup",
        "summary": "Eliminating head-of-line blocking with UDP-based QUIC, multiplexed streams, and 0-RTT handshakes."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – Kestrel Server Throughput & QUIC Exam",
        "summary": "Examination testing socket transport benchmarks, thread starvation diagnostics, and QUIC packet flows."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": ".NET: Module 9: CLR Internals, Garbage Collection & Native AOT",
    "shortTitle": "CLR Internals, GC & Native AOT",
    "desc": "Explore runtime execution: Generational GC (Gen 0, 1, 2, LOH, POH), Tiered JIT compilation, and Native AOT compilation.",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – Generational Garbage Collection: Gen 0, 1, 2, LOH & POH",
        "summary": "Ephemeron collector, Large Object Heap (LOH), Pinned Object Heap (POH), and Server vs Workstation GC."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – Tiered JIT Compilation & Dynamic PGO Optimization",
        "summary": "QuickJit startup speed, Profile-Guided Optimization (PGO), and re-compiling hot methods with Tier 1."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Native AOT Compilation for Instant Cold Starts",
        "summary": "Ahead-of-Time native binary compilation, zero JIT overhead, minimal memory footprints, and trimmer warnings."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – .NET 9 Enterprise Architect Certification",
        "summary": "Master certification exam testing GC pressure reduction, native AOT compatibility, and runtime tuning."
      }
    ]
  }
];

  const DNS_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "DNS: Module 1: Distributed DNS Architecture & Global Root Hierarchy",
    "shortTitle": "Distributed DNS & Root Hierarchy",
    "desc": "Understand the global resolution hierarchy: Root nameservers, TLDs, Authoritative vs Recursive resolvers, and lookups.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to DNS & Global Distributed Name Resolution",
        "summary": "The architectural foundation of the internet: distributed namespace, RFC 1034/1035, and UDP port 53."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – The 13 Root Server Clusters & Top-Level Domains (TLDs)",
        "summary": "Global root server clusters (A through M), Anycast distribution, generic TLDs (gTLDs), and country codes."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Authoritative vs Recursive Resolver Functions",
        "summary": "Recursive resolver caching layers (ISP/1.1.1.1/8.8.8.8) vs Authoritative zone custodians."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – Iterative Resolution Walkthrough with dig +trace",
        "summary": "Tracing packet delegations from root (.) to TLD (.com) down to domain authoritative nameservers."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – DNS Global Hierarchy Assessment",
        "summary": "Assessment testing resolver recursion, delegation referrals, and dig packet analysis."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "DNS: Module 2: Core Resource Records: A, AAAA, CNAME, MX & TXT",
    "shortTitle": "Core Resource Records (A/MX/TXT)",
    "desc": "Master fundamental DNS resource record types: IPv4/IPv6 host addresses, canonical alias chains, and mail routing.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – A (IPv4) & AAAA (IPv6) Host Address Records",
        "summary": "Mapping fully qualified domain names (FQDN) directly to 32-bit IPv4 and 128-bit IPv6 network endpoints."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – CNAME Alias Records & Canonical Chain Limits",
        "summary": "Aliasing domain names, the zone apex restriction (CNAME at root domain), and ALIAS/ANAME workarounds."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – MX Mail Routing Priorities & Server Fallback",
        "summary": "Mail exchanger records, priority metric integers, fallback backup mail servers, and MX host FQDN rules."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – TXT Records for Domain Verification & Custom Metadata",
        "summary": "Arbitrary text attributes, Google/Domain ownership challenges, and security policy containers."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Core DNS Records Configuration Exam",
        "summary": "Comprehensive test evaluating record syntax, apex restrictions, and MX routing priorities."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "DNS: Module 3: TTL Mechanics, Caching Layers & Propagation Dynamics",
    "shortTitle": "TTL Caching & Propagation",
    "desc": "Deconstruct caching: Time-to-Live (TTL) countdown timers, recursive resolver cache eviction, and negative caching.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – Time-To-Live (TTL) Seconds & Cache Eviction Timers",
        "summary": "Authoritative TTL headers, intermediate cache countdowns, and balancing performance vs flexibility."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Negative Caching & SOA Minimum TTL Records",
        "summary": "Caching NXDOMAIN errors (RFC 2308), SOA minimum field, and preventing resolver denial-of-service."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – Zero-Downtime Migration Strategies & TTL Pre-Lowering",
        "summary": "Pre-lowering TTL 48 hours prior to server IP cutover to guarantee immediate global traffic migration."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – DNS Caching & Propagation Test",
        "summary": "Assessment covering caching hierarchies, negative caching rules, and migration execution plans."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": "DNS: Module 4: Anycast BGP Routing & Edge Traffic Steering",
    "shortTitle": "Anycast BGP & Geo-DNS Steering",
    "desc": "Deploy resilient global DNS: BGP Anycast IP routing topology, latency-based Geo-DNS steering, and health checks.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – Unicast vs BGP Anycast Single-IP Routing Topology",
        "summary": "Announcing identical IP prefixes from 200+ PoPs via BGP, automatic shortest AS-path routing."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – Latency-Based Geo-DNS Steering & EDNS Client Subnet (ECS)",
        "summary": "Routing clients to the closest edge server using EDNS0 client IP subnet information (RFC 7871)."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – Health Probing & Automated Failover DNS Routing",
        "summary": "Continuous synthetic HTTP/ICMP health probes, withdrawing dead IP addresses within 30 seconds."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – Global Edge Routing Assessment",
        "summary": "Test evaluating BGP route propagation, Geo-DNS policy configuration, and automated failover."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": "DNS: Module 5: Enterprise Email Authentication: SPF, DKIM & DMARC",
    "shortTitle": "Email Security: SPF, DKIM & DMARC",
    "desc": "Harden email deliverability and prevent spoofing: SPF mechanisms, DKIM public key signatures, and DMARC enforcement.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – SPF (Sender Policy Framework) Mechanics & IP Includes",
        "summary": "Specifying authorized mail server IPs (v=spf1), ip4, include mechanisms, and hard fail (-all)."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – DKIM (DomainKeys Identified Mail) Public Key Records",
        "summary": "Asymmetric cryptography in email: selector TXT records, private key header signing, and public verification."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – DMARC Policy Enforcement (p=reject) & Forensic Reports",
        "summary": "Aligning SPF and DKIM domains, quarantine vs reject policies, and aggregate rua reporting."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – Email Security & Anti-Spoofing Exam",
        "summary": "Examination testing SPF lookup limits (10 DNS lookups max), DKIM key rotation, and DMARC alignment."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "DNS: Module 6: Encrypted Transport Protocols & TLS 1.3 Handshake",
    "shortTitle": "Encrypted DNS & TLS 1.3 Handshake",
    "desc": "Secure name resolution against eavesdropping: DNS over HTTPS (DoH), DNS over TLS (DoT), and TLS 1.3 handshakes.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – DNS over HTTPS (DoH) & DNS over TLS (DoT) Architecture",
        "summary": "Encrypting last-mile resolver queries via port 853 (DoT) and port 443 (DoH RFC 8484) against ISP snooping."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – TLS 1.3 1-RTT Handshake & Key Exchange (ECDHE)",
        "summary": "Diffie-Hellman ephemeral key exchange, eliminating plaintext SNI snooping, and forward secrecy."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – Encrypted Client Hello (ECH) & Server Name Indication",
        "summary": "Next-generation cryptographic privacy preventing on-path observers from seeing visited domain names."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Secure Transport Protocols Assessment",
        "summary": "Assessment covering DoH binary wire format, TLS certificate validation, and ECH key distribution."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": "DNS: Module 7: DNSSEC Cryptographic Zone Signing & Trust Chains",
    "shortTitle": "DNSSEC Zone Signing & Trust Chains",
    "desc": "Protect against cache poisoning (Kaminsky attacks): asymmetric signatures (RRSIG), DNSKEY, and DS record trust chains.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – Cache Poisoning Attacks (Kaminsky) & DNSSEC Defenses",
        "summary": "Vulnerabilities of classic DNS spoofing, transaction ID guessing, and cryptographic proof of authenticity."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – RRSIG Signatures, DNSKEY Public Keys & DS Hashes",
        "summary": "Zone Signing Keys (ZSK), Key Signing Keys (KSK), signing resource record sets (RRsets), and DS digests."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – Cryptographic Chain of Trust from Root to Leaf",
        "summary": "Validating signatures upward to the IANA Root trust anchor, NSEC/NSEC3 authenticated denial of existence."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – DNSSEC Cryptographic Signing Test",
        "summary": "Test evaluating KSK rollovers, validating resolver verification logs, and NSEC3 hash collisions."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": "DNS: Module 8: BIND9 Zone File Authoring & Secure Zone Transfers",
    "shortTitle": "BIND9 Zone Files & Zone Transfers",
    "desc": "Enterprise nameserver operations: RFC 1035 zone file syntax, SOA serial number conventions, AXFR/IXFR, and TSIG keys.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – RFC 1035 Zone File Syntax & SOA Serial Number Rules",
        "summary": "Start of Authority (SOA) parameters: primary nameserver, admin email, refresh, retry, expire, and YYYYMMDDNN serials."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – AXFR Full & IXFR Incremental Zone Transfers",
        "summary": "Synchronizing secondary nameservers over TCP port 53, zone serial comparisons, and transfer logs."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – TSIG Transaction Signature Shared Key Security",
        "summary": "Authenticating primary-secondary communications with HMAC-SHA256 secret keys to prevent rogue zone injection."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – Authoritative Zone Authoring Exam",
        "summary": "Assessment covering BIND9 syntax errors, named-checkzone diagnostics, and secure transfer configs."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": "DNS: Module 9: Certificate Authority Authorization & Low-Level Protocols",
    "shortTitle": "CAA Records & Low-Level Protocols",
    "desc": "Advanced security and low-level protocol engineering: RFC 8659 CAA records, DNS binary wire format, and proxy servers.",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – CAA Records for SSL/TLS Issuer Restriction",
        "summary": "Restricting authorized Certificate Authorities (issue/issuewild), incident reporting (iodef), and rogue cert prevention."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – DNS Binary Wire Format Packets (UDP 512b & TCP Fallback)",
        "summary": "Header bit flags (QR, Opcode, AA, TC, RD, RA, RCODE), question/answer sections, and EDNS0 buffer expansion."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Writing Custom DNS Proxies in Rust/Go",
        "summary": "Parsing UDP datagrams, implementing in-memory bloom filter ad-blockers, and upstream forwarding."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – DNS & Internet Infrastructure Master Certification",
        "summary": "Master certification examination covering binary wire packet inspection and enterprise DNS architectures."
      }
    ]
  }
];

  const DEVOPS_MODULES = [
  {
    "num": "01",
    "code": "1.0 – 1.4",
    "title": "DevOps: Module 1: Linux Server Administration & Hardening Essentials",
    "shortTitle": "Linux Server Hardening Essentials",
    "desc": "Core server administration: SSH public key authentication, Linux user permissions, systemd service daemons, and firewalls.",
    "sections": [
      {
        "id": "1.0",
        "title": "1.0. Welcome to Linux Server Administration & DevOps Engineering",
        "summary": "Linux kernel architecture, user space vs kernel space, file system hierarchy (FHS), and POSIX security."
      },
      {
        "id": "1.1",
        "title": "1.1. Section 1 – User Privilege Separation, Sudoers & SSH Key Hardening",
        "summary": "Disabling root password login, Ed25519 SSH keys, configuring /etc/sudoers.d, and sshd_config hardening."
      },
      {
        "id": "1.2",
        "title": "1.2. Section 2 – Systemd Service Daemons & Journalctl Log Analysis",
        "summary": "Writing custom .service unit files, restart policies (on-failure), timers, and querying system logs with journalctl."
      },
      {
        "id": "1.3",
        "title": "1.3. Section 3 – UFW & Iptables Firewall Security Rules",
        "summary": "Default drop policy, rate-limiting SSH connections, and opening ports 80/443 with Uncomplicated Firewall."
      },
      {
        "id": "1.4",
        "title": "1.4. Module 1 Completion – Linux Server Administration Assessment",
        "summary": "Assessment covering systemd service orchestration, permission modes (chmod/chown), and firewall validation."
      }
    ]
  },
  {
    "num": "02",
    "code": "2.0 – 2.4",
    "title": "DevOps: Module 2: Web Server Foundations: Nginx & Apache Virtual Hosts",
    "shortTitle": "Web Server Foundations (Nginx/Apache)",
    "desc": "Host web applications: static asset serving, Nginx server blocks, Apache VirtualHosts, .htaccess, and MIME types.",
    "sections": [
      {
        "id": "2.0",
        "title": "2.0. Section 1 – Nginx Architecture (Event-Driven vs Process-Per-Connection)",
        "summary": "Master/worker process model, asynchronous non-blocking event loops, and handling 10,000+ concurrent connections."
      },
      {
        "id": "2.1",
        "title": "2.1. Section 2 – Server Blocks, Locations & Static Asset Caching",
        "summary": "Location block regex matching precedence, root vs alias, try_files directives, and Cache-Control headers."
      },
      {
        "id": "2.2",
        "title": "2.2. Section 3 – Apache VirtualHosts, .htaccess Rules & Mod_Rewrite",
        "summary": "Configuring Apache vhosts, directory permissions (AllowOverride), and URL rewriting rules."
      },
      {
        "id": "2.3",
        "title": "2.3. Section 4 – MIME Types, Gzip & Brotli Compression Tuning",
        "summary": "Text/binary MIME mappings, tuning gzip_comp_level, and Brotli dynamic stream compression."
      },
      {
        "id": "2.4",
        "title": "2.4. Module 2 Completion – Web Server Virtual Hosting Exam",
        "summary": "Comprehensive test evaluating server block routing, location precedence rules, and compression headers."
      }
    ]
  },
  {
    "num": "03",
    "code": "3.0 – 3.3",
    "title": "DevOps: Module 3: Automated SSL Provisioning with Let's Encrypt & Certbot",
    "shortTitle": "Automated SSL with Let's Encrypt",
    "desc": "Implement ubiquitous HTTPS: ACME protocol automation, Certbot CLI, automated certificate renewal, and TLS 1.3.",
    "sections": [
      {
        "id": "3.0",
        "title": "3.0. Section 1 – ACME Protocol Fundamentals & Challenge Types (HTTP-01, DNS-01)",
        "summary": "Automated Certificate Management Environment (ACME), cryptographic challenge verification, and SAN certs."
      },
      {
        "id": "3.1",
        "title": "3.1. Section 2 – Certbot CLI Automation & Nginx Configuration Injection",
        "summary": "Running certbot --nginx, automated SSL block generation, and strong DH parameter generation."
      },
      {
        "id": "3.2",
        "title": "3.2. Section 3 – Automated Certificate Renewal with Systemd Timers & Reloads",
        "summary": "Scheduling dry-run renewals, post-renewal hooks (nginx -s reload), and monitoring expiration alerts."
      },
      {
        "id": "3.3",
        "title": "3.3. Module 3 Completion – HTTPS & Automated SSL Assessment",
        "summary": "Assessment covering ACME HTTP-01 token placement, renewal hook scripts, and SSL Labs A+ rating checks."
      }
    ]
  },
  {
    "num": "04",
    "code": "4.0 – 4.3",
    "title": "DevOps: Module 4: Nginx High-Concurrency Reverse Proxy Tuning",
    "shortTitle": "Nginx Reverse Proxy & Load Balancing",
    "desc": "Scale high-traffic gateways: upstream load balancing algorithms, proxy micro-caching, and leaky bucket rate limiting.",
    "sections": [
      {
        "id": "4.0",
        "title": "4.0. Section 1 – Reverse Proxy Configuration & Upstream Load Balancing",
        "summary": "proxy_pass directives, HTTP header forwarding (X-Forwarded-For), and algorithms (round_robin, least_conn, ip_hash)."
      },
      {
        "id": "4.1",
        "title": "4.1. Section 2 – FastCGI Caching & Proxy Micro-Caching",
        "summary": "In-memory caching of dynamic PHP/Node responses for 1 second to withstand massive traffic spikes (Slashdot effect)."
      },
      {
        "id": "4.2",
        "title": "4.2. Section 3 – Leaky Bucket Rate Limiting (limit_req_zone) against DDoS",
        "summary": "Defining rate limit zones, burst buffers, nodelay directives, and blocking abusive scraper IP ranges."
      },
      {
        "id": "4.3",
        "title": "4.3. Module 4 Completion – Reverse Proxy Architecture Exam",
        "summary": "Test evaluating upstream connection pooling, micro-cache bypass headers, and rate limiting rules."
      }
    ]
  },
  {
    "num": "05",
    "code": "5.0 – 5.3",
    "title": "DevOps: Module 5: Docker Containerization & Multi-Stage Builds",
    "shortTitle": "Docker & Multi-Stage Container Builds",
    "desc": "Containerize enterprise workloads: Dockerfile optimization, layer caching, non-root security, and Docker Compose orchestration.",
    "sections": [
      {
        "id": "5.0",
        "title": "5.0. Section 1 – Docker Engine Architecture, Namespaces & Cgroups",
        "summary": "Linux kernel primitives: PID/Network namespaces, cgroup resource limits (CPU/Memory), and overlay2 storage."
      },
      {
        "id": "5.1",
        "title": "5.1. Section 2 – Multi-Stage Dockerfile Optimization & Minimal Base Images",
        "summary": "Separating compile-time SDK tools from runtime production images (Alpine/Distroless) to reduce sizes by 90%."
      },
      {
        "id": "5.2",
        "title": "5.2. Section 3 – Container Security: Non-Root Users & Read-Only Filesystems",
        "summary": "Creating unprivileged appuser accounts, drop Linux capabilities, and mounting ephemeral volume mounts."
      },
      {
        "id": "5.3",
        "title": "5.3. Module 5 Completion – Docker Containerization Test",
        "summary": "Assessment covering Docker layer cache optimization, multi-stage artifact extraction, and container security."
      }
    ]
  },
  {
    "num": "06",
    "code": "6.0 – 6.3",
    "title": "DevOps: Module 6: Automated CI/CD Pipelines with GitHub Actions",
    "shortTitle": "CI/CD with GitHub Actions",
    "desc": "Automate delivery pipelines: GitHub Actions workflow YAML syntax, automated test suites, secrets management, and deployments.",
    "sections": [
      {
        "id": "6.0",
        "title": "6.0. Section 1 – GitHub Actions Workflow Syntax, Triggers & Runners",
        "summary": "Configuring on: [push, pull_request], hosted ubuntu-latest runners, and concurrency group cancellation."
      },
      {
        "id": "6.1",
        "title": "6.1. Section 2 – Automated Testing, Linting & Build Matrix Execution",
        "summary": "Parallel test execution across Node/PHP/Python versions using strategy: matrix, and caching node_modules."
      },
      {
        "id": "6.2",
        "title": "6.2. Section 3 – Secure Secrets Injection & Container Registry Push",
        "summary": "GitHub Encrypted Secrets, OpenID Connect (OIDC) cloud authentication, and pushing to Docker Hub / GHCR."
      },
      {
        "id": "6.3",
        "title": "6.3. Module 6 Completion – Continuous Integration & Delivery Assessment",
        "summary": "Test covering YAML pipeline syntax, artifact passing between jobs, and production deployment gating."
      }
    ]
  },
  {
    "num": "07",
    "code": "7.0 – 7.3",
    "title": "DevOps: Module 7: Linux Kernel Performance & TCP Socket Optimization",
    "shortTitle": "Kernel Performance & TCP Sockets",
    "desc": "Tune operating system limits: sysctl.conf network parameters, TCP BBR congestion control, and file descriptor limits.",
    "sections": [
      {
        "id": "7.0",
        "title": "7.0. Section 1 – sysctl.conf Network Tuning (somaxconn, tcp_max_syn_backlog)",
        "summary": "Expanding the TCP listen backlog, enabling TCP SYN cookies, and preventing packet drops during traffic surges."
      },
      {
        "id": "7.1",
        "title": "7.1. Section 2 – TCP BBR Congestion Control Protocol Enablement",
        "summary": "Replacing legacy CUBIC with Google BBR model-based congestion control for higher throughput and lower latency."
      },
      {
        "id": "7.2",
        "title": "7.2. Section 3 – File Descriptor Limits (ulimit -n) & Epoll Concurrency",
        "summary": "Tuning /etc/security/limits.conf (nofile 65535) and worker_rlimit_nofile for high-scale reverse proxies."
      },
      {
        "id": "7.3",
        "title": "7.3. Module 7 Completion – Kernel & Socket Performance Test",
        "summary": "Assessment testing sysctl parameter benchmarking, TIME_WAIT socket recycling, and ulimit configurations."
      }
    ]
  },
  {
    "num": "08",
    "code": "8.0 – 8.3",
    "title": "DevOps: Module 8: Zero-Downtime Deployment & Traffic Rollouts",
    "shortTitle": "Zero-Downtime Deployments & Rollouts",
    "desc": "Orchestrate zero-downtime upgrades: Blue/Green deployments, Canary traffic weighting, and graceful process reloading.",
    "sections": [
      {
        "id": "8.0",
        "title": "8.0. Section 1 – Blue/Green Deployment Topology & Load Balancer Switching",
        "summary": "Maintaining duplicate identical production clusters, running smoke tests on Green, and flipping upstream router."
      },
      {
        "id": "8.1",
        "title": "8.1. Section 2 – Canary Releases & Weighted Traffic Routing",
        "summary": "Routing 5% of production traffic to the new version, monitoring error rate metrics, and expanding rollout."
      },
      {
        "id": "8.2",
        "title": "8.2. Section 3 – Graceful Application Process Reloads without Dropping Conns",
        "summary": "Nginx master binary upgrade (USR2 signal) and Node/Gunicorn graceful shutdown (SIGTERM waiting for requests)."
      },
      {
        "id": "8.3",
        "title": "8.3. Module 8 Completion – Zero-Downtime Deployment Exam",
        "summary": "Evaluation testing health check circuit breakers, zero-drop reload validation, and automated rollback triggers."
      }
    ]
  },
  {
    "num": "09",
    "code": "9.0 – 9.3",
    "title": "DevOps: Module 9: Enterprise Container Hardening & Telemetry Monitoring",
    "shortTitle": "Container Hardening & Telemetry",
    "desc": "Secure and observe production clusters: Distroless containers, Trivy CVE vulnerability scans, and Prometheus/Grafana monitoring.",
    "sections": [
      {
        "id": "9.0",
        "title": "9.0. Section 1 – Distroless & Scratch Containers for CVE Attack Surface Reduction",
        "summary": "Stripping package managers, shells, and utilities from container images so attackers cannot execute commands."
      },
      {
        "id": "9.1",
        "title": "9.1. Section 2 – Container Vulnerability Scanning with Trivy in CI",
        "summary": "Automated vulnerability scanning in pull requests, blocking builds with Critical/High CVE disclosures."
      },
      {
        "id": "9.2",
        "title": "9.2. Section 3 – Telemetry Collection with Prometheus, Grafana & Loki",
        "summary": "Scraping application metrics (RED method: Rate, Errors, Duration), log aggregation, and real-time alerts."
      },
      {
        "id": "9.3",
        "title": "9.3. Module 9 Completion – Cloud Infrastructure & DevOps Master Certification",
        "summary": "Master certification examination covering zero-trust container security, Prometheus metrics, and automated alerts."
      }
    ]
  }
];

  // ═══════════════════════════════════════════════════════════════════
  // 3. COMPLETE MODULES REPOSITORY (7 TRACKS)
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
    "title": "JavaScript Essentials (JSE: Modules 1–6 Outline)",
    "level": "LEVEL: ESSENTIALS_TO_PRO",
    "duration": "48.0_HRS",
    "specId": "JSE_ESSENTIALS_1",
    "trackBadge": "JSE 1",
    "summary": "Comprehensive 6-module curriculum outline for JavaScript Essentials 1 (JSE 1): from computer programming and variable mechanics to operators, control flow loops, functions, and runtime error debugging.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "JSE: Module 1: Introduction to JavaScript and Computer Programming",
        "shortTitle": "Intro & Computer Programming",
        "desc": "Foundations of computation, language history, modern JS engines, dev environment setup, and execution lifecycle.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to JavaScript Essentials 1",
            "summary": "Orientation to modern JavaScript fundamentals, computational thinking, and developer tooling."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – About JavaScript",
            "summary": "History, ECMAScript standards, engine runtime architecture, and client vs server execution."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Setting up programming environment",
            "summary": "Node.js, browser developer tools, code editors (VS Code), and command line basics."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Hello, World!",
            "summary": "Writing, linking, and running your first executable JavaScript programs in browser and console."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Module Test",
            "summary": "Comprehensive assessment covering programming basics, syntax rules, and environment setup."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "JSE: Module 2: Variables, Data Types, Type Casting, and Comments",
        "shortTitle": "Variables, Types & Comments",
        "desc": "Memory management with let/const/var, primitive types, type coercion, dynamic casting, and code documentation.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – Variables",
            "summary": "Variable declaration, initialization, assignment, identifier naming rules, and block scoping."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Data types and type casting – Part 1",
            "summary": "Primitive types: numbers, strings, booleans, undefined, null, and typeof operator inspections."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – Data types and type casting – Part 2",
            "summary": "Explicit vs implicit type conversion, BigInt, Symbols, and common NaN conversion pitfalls."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Comments",
            "summary": "Single-line and multi-line comments, JSDoc annotations, and code self-documentation best practices."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Module Test",
            "summary": "Comprehensive examination testing type coercion, variable scope, and primitive allocations."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "JSE: Module 3: Operators and User Interaction",
        "shortTitle": "Operators & User Interaction",
        "desc": "Arithmetic, assignment, logical operators, string concatenation, dialog prompts, and basic input/output.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – Assignment, arithmetic, and logical operators",
            "summary": "Binary/unary operators, precedence rules, logical AND/OR/NOT, and short-circuit evaluation."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – String, comparison, and other JS operators",
            "summary": "Strict equality (===) vs loose equality (==), relational operators, template literals, and ternary operator."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – Interacting with the user",
            "summary": "Modal interaction dialogs: window.alert(), window.prompt(), window.confirm(), and console logging."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Module Test",
            "summary": "Assessment testing operator evaluation precedence, truthy/falsy logic, and user dialog handling."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.2",
        "title": "JSE: Module 4: Control Flow – Conditional Execution and Loops",
        "shortTitle": "Control Flow & Loops",
        "desc": "Decision branching with if/else/switch, deterministic loops, while iterations, and loop jump controls.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Conditional execution",
            "summary": "Conditional branching using if, if-else cascades, nested conditions, and switch-case statements."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – Loops",
            "summary": "Iteration mechanics: while loops, do-while loops, for loops, break and continue flow control."
          },
          {
            "id": "4.2",
            "title": "4.2. Module 4 Completion – Module Test",
            "summary": "Module examination validating loop termination invariants, nested iteration, and condition trees."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.2",
        "title": "JSE: Module 5: Functions",
        "shortTitle": "Functions & Execution Context",
        "desc": "Function declarations, expressions, arrow functions, parameter defaults, return statements, and call stack scoping.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – Functions – Part 1",
            "summary": "Function declaration syntax, parameter passing, return statements, and local vs global scope."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Functions – Part 2",
            "summary": "Function expressions, first-class functions, arrow syntax, callbacks, and recursion basics."
          },
          {
            "id": "5.2",
            "title": "5.2. Module 5 Completion – Module Test",
            "summary": "Comprehensive test covering functional modularity, return value flow, and closure scoping."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "JSE: Module 6: Errors, exceptions, debugging, and troubleshooting",
        "shortTitle": "Errors, Debugging & Troubleshooting",
        "desc": "Error categories, runtime exceptions, try/catch/finally error handling, throw statements, and DevTools troubleshooting.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Errors and Exceptions – Part 1",
            "summary": "Syntax errors, reference errors, type errors, range errors, and error propagation mechanics."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – Errors and Exceptions – Part 2",
            "summary": "Structured exception handling with try-catch-finally blocks and throwing custom Error objects."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Code Debugging and Troubleshooting",
            "summary": "Using browser debugger, setting breakpoints, stepping through call frames, and watch expressions."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Module Test",
            "summary": "Final certification module test evaluating error interception, debugging techniques, and troubleshooting."
          }
        ]
      }
    ],
    "jseModules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "JSE: Module 1: Introduction to JavaScript and Computer Programming",
        "shortTitle": "Intro & Computer Programming",
        "desc": "Foundations of computation, language history, modern JS engines, dev environment setup, and execution lifecycle.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to JavaScript Essentials 1",
            "summary": "Orientation to modern JavaScript fundamentals, computational thinking, and developer tooling."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – About JavaScript",
            "summary": "History, ECMAScript standards, engine runtime architecture, and client vs server execution."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Setting up programming environment",
            "summary": "Node.js, browser developer tools, code editors (VS Code), and command line basics."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Hello, World!",
            "summary": "Writing, linking, and running your first executable JavaScript programs in browser and console."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Module Test",
            "summary": "Comprehensive assessment covering programming basics, syntax rules, and environment setup."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "JSE: Module 2: Variables, Data Types, Type Casting, and Comments",
        "shortTitle": "Variables, Types & Comments",
        "desc": "Memory management with let/const/var, primitive types, type coercion, dynamic casting, and code documentation.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – Variables",
            "summary": "Variable declaration, initialization, assignment, identifier naming rules, and block scoping."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Data types and type casting – Part 1",
            "summary": "Primitive types: numbers, strings, booleans, undefined, null, and typeof operator inspections."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – Data types and type casting – Part 2",
            "summary": "Explicit vs implicit type conversion, BigInt, Symbols, and common NaN conversion pitfalls."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Comments",
            "summary": "Single-line and multi-line comments, JSDoc annotations, and code self-documentation best practices."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Module Test",
            "summary": "Comprehensive examination testing type coercion, variable scope, and primitive allocations."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "JSE: Module 3: Operators and User Interaction",
        "shortTitle": "Operators & User Interaction",
        "desc": "Arithmetic, assignment, logical operators, string concatenation, dialog prompts, and basic input/output.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – Assignment, arithmetic, and logical operators",
            "summary": "Binary/unary operators, precedence rules, logical AND/OR/NOT, and short-circuit evaluation."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – String, comparison, and other JS operators",
            "summary": "Strict equality (===) vs loose equality (==), relational operators, template literals, and ternary operator."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – Interacting with the user",
            "summary": "Modal interaction dialogs: window.alert(), window.prompt(), window.confirm(), and console logging."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Module Test",
            "summary": "Assessment testing operator evaluation precedence, truthy/falsy logic, and user dialog handling."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.2",
        "title": "JSE: Module 4: Control Flow – Conditional Execution and Loops",
        "shortTitle": "Control Flow & Loops",
        "desc": "Decision branching with if/else/switch, deterministic loops, while iterations, and loop jump controls.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Conditional execution",
            "summary": "Conditional branching using if, if-else cascades, nested conditions, and switch-case statements."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – Loops",
            "summary": "Iteration mechanics: while loops, do-while loops, for loops, break and continue flow control."
          },
          {
            "id": "4.2",
            "title": "4.2. Module 4 Completion – Module Test",
            "summary": "Module examination validating loop termination invariants, nested iteration, and condition trees."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.2",
        "title": "JSE: Module 5: Functions",
        "shortTitle": "Functions & Execution Context",
        "desc": "Function declarations, expressions, arrow functions, parameter defaults, return statements, and call stack scoping.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – Functions – Part 1",
            "summary": "Function declaration syntax, parameter passing, return statements, and local vs global scope."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Functions – Part 2",
            "summary": "Function expressions, first-class functions, arrow syntax, callbacks, and recursion basics."
          },
          {
            "id": "5.2",
            "title": "5.2. Module 5 Completion – Module Test",
            "summary": "Comprehensive test covering functional modularity, return value flow, and closure scoping."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "JSE: Module 6: Errors, exceptions, debugging, and troubleshooting",
        "shortTitle": "Errors, Debugging & Troubleshooting",
        "desc": "Error categories, runtime exceptions, try/catch/finally error handling, throw statements, and DevTools troubleshooting.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Errors and Exceptions – Part 1",
            "summary": "Syntax errors, reference errors, type errors, range errors, and error propagation mechanics."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – Errors and Exceptions – Part 2",
            "summary": "Structured exception handling with try-catch-finally blocks and throwing custom Error objects."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Code Debugging and Troubleshooting",
            "summary": "Using browser debugger, setting breakpoints, stepping through call frames, and watch expressions."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Module Test",
            "summary": "Final certification module test evaluating error interception, debugging techniques, and troubleshooting."
          }
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
    "title": "TypeScript (Static Typing, Generics, Utility Types, Interfaces, Modules)",
    "level": "LEVEL: ADVANCED_TYPE_ENGINE",
    "duration": "38.0_HRS",
    "specId": "TS_SYSTEM_5",
    "trackBadge": "TS 5",
    "summary": "Architect bulletproof web applications with compile-time correctness: recursive generic abstractions, distributive conditional types, template literal key remapping, and compiler AST transformations.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "TS: Module 1: Static Type Foundations & Compiler Configuration",
        "shortTitle": "Static Types & Compiler Config",
        "desc": "Architect robust enterprise applications with tsc compiler options, strict mode verification, primitives, unions, and interfaces.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to TypeScript 5 Type System",
            "summary": "Introduction to JavaScript superset mechanics, compiler architecture, and static type safety."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – Compiler Configuration & Strict Modes (tsconfig.json)",
            "summary": "Configuring strict flags, target ECMAScript versions, module resolution, and path aliases."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Primitives, Literal Types & Type Inference",
            "summary": "Static primitives, string/number literals, any vs unknown, void, never, and contextual typing."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Interfaces vs Type Aliases & Structural Subtyping",
            "summary": "Duck typing mental model, interface extension, declaration merging, and union/intersection types."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Compiler & Type Assignment Test",
            "summary": "Evaluation testing tsconfig strictness, type compatibility, and structural duck typing."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "TS: Module 2: Function Signatures, Labeled Tuples & Type Guards",
        "shortTitle": "Functions, Tuples & Type Guards",
        "desc": "Construct robust function overloads, labeled tuples, custom type predicates, and discriminated unions.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – Function Overloads & Implementation Signatures",
            "summary": "Defining multiple call signatures, implementation contracts, and return type narrowing."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Labeled Tuples, Rest Elements & Readonly Tuples",
            "summary": "Fixed-length arrays, labeled elements for IDE auto-complete, and immutable readonly tuples."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – Custom Type Predicates (val is Type) & Assertion Functions",
            "summary": "Building user-defined type guards, assertion functions (asserts condition), and control flow narrowing."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Discriminated Unions & Exhaustiveness Checking",
            "summary": "Tagging objects with literal discriminant keys and ensuring compile-time completeness via never."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Signatures & Type Guards Exam",
            "summary": "Assessment covering function overload dispatch, type predicates, and exhaustiveness guards."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "TS: Module 3: Reusable Generics & Parameter Constraints",
        "shortTitle": "Generics & Parameter Constraints",
        "desc": "Architect reusable generic components, class factories, extends constraints, and keyof lookup indexing.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – Generic Functions, Interfaces & Classes",
            "summary": "Type variables <T>, generic identity functions, multi-parameter type signatures, and class factories."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Generic Constraints with extends & Default Types",
            "summary": "Restricting type parameters with interface bounds, conditional defaults, and primitive constraints."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – The keyof Index Operator & Indexed Access Types",
            "summary": "Extracting property keys (keyof T), indexed access types (T[K]), and type-safe property extractors."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Generic Abstraction Assessment",
            "summary": "Comprehensive test evaluating generic container design, constraint enforcement, and key indexing."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": "TS: Module 4: Conditional Types & Pattern Matching with 'infer'",
        "shortTitle": "Conditional Types & 'infer'",
        "desc": "Type-level ternary expressions, distributive conditional branching, and pattern matching return types with infer.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Conditional Type Syntax (T extends U ? X : Y)",
            "summary": "Type-level ternary expressions, boolean logic at compile time, and non-nullable type extraction."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – Distributive Conditional Types & Union Filtering",
            "summary": "Automatic distribution over naked type parameters, Exclude<T, U>, and Extract<T, U> mechanics."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – Pattern Matching with the infer Keyword",
            "summary": "Unpacking promise resolutions (Awaited<T>), function return types (ReturnType<T>), and parameters."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – Type-Level Logic Assessment",
            "summary": "Examination testing conditional type algebra, distribution suppression, and infer unpacking."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": "TS: Module 5: Mapped Types & Template Literal Remapping",
        "shortTitle": "Mapped Types & Template Literals",
        "desc": "Transform object shapes dynamically with mapped types, modifiers, key remapping via as, and template literal strings.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – Mapped Type Foundations ([K in keyof T])",
            "summary": "Iterating object keys, homomorphic mapping, and building Partial<T>, Required<T>, Readonly<T>."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Modifier Prefixing (+readonly, -readonly, +?, -?)",
            "summary": "Stripping optionality and mutability flags to produce strict immutable schemas."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – Key Remapping via as & Template Literal Types",
            "summary": "Prefixing getters/setters with key remapping, string union interpolation, and regex string patterns."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – Advanced Type Transformation Test",
            "summary": "Assessment validating custom mapped utility types, template literal concatenation, and key remapping."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "TS: Module 6: Recursive Types & Branded Nominal Type Systems",
        "shortTitle": "Recursive Types & Nominal Branding",
        "desc": "Infinite data structures with recursive type aliases and nominal type safety using unique symbol branding.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Recursive Types (JSONValue, DeepPartial, DeepReadonly)",
            "summary": "Self-referencing type definitions, arbitrary nested JSON objects, and recursive tree walking."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – Nominal Typing via Unique Symbol Branding",
            "summary": "Overcoming structural typing limitations: creating distinct UserId, OrderId, and Currency types."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Type-Safe Domain Identifiers & Validated Primitives",
            "summary": "Sanitized strings, validated email brand tags, and preventing accidental ID swaps at compile time."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Type Safety & Branding Exam",
            "summary": "Test covering recursive compiler depth limits, nominal branding tags, and domain primitive validation."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": "TS: Module 7: Ambient Declarations & Library Definitions (.d.ts)",
        "shortTitle": "Ambient Declarations & .d.ts",
        "desc": "Type legacy JavaScript with ambient declarations, module augmentations, declare global, and definitely typed packages.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – Ambient Declarations & declare Keyword",
            "summary": "Declaring external variables, functions, and global constants without emitting runtime JavaScript."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – Module Declarations (.d.ts) & Triple-Slash Directives",
            "summary": "Writing module definition files for non-typed npm libraries and managing reference paths."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – Declaration Merging & Global Namespace Augmentation",
            "summary": "Extending window, express Request, and process.env with type-safe environmental variables."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – Definition File Authoring Test",
            "summary": "Assessment covering library typing, ambient module resolution, and declaration merging."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": "TS: Module 8: TypeScript Compiler API & Custom AST Transformers",
        "shortTitle": "Compiler API & AST Transformers",
        "desc": "Inspect, analyze, and transform TypeScript source code programmatically using the compiler API and AST transformers.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – Program, SourceFile & Abstract Syntax Tree (AST)",
            "summary": "Parsing source code into Node trees, token scanning, syntax kinds, and AST inspection tools."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – TypeChecker API & Symbol Resolution",
            "summary": "Querying semantic information: resolved types, interface definitions, call signatures, and diagnostics."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – Custom AST Transformation Pipelines",
            "summary": "Writing visitor functions to inject telemetry, auto-generate serializers, and rewrite decorators."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – AST Metaprogramming Assessment",
            "summary": "Evaluation testing syntax tree traversal, symbol lookup, and custom node factory emission."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": "TS: Module 9: Strict Soundness, Variance & Monorepo Scaling",
        "shortTitle": "Soundness, Variance & Monorepos",
        "desc": "Master structural vs nominal subtyping, function parameter contravariance, Project References, and monorepos.",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – Subtyping, Covariance, Contravariance & Invariance",
            "summary": "Type soundness rules: strictFunctionTypes parameter contravariance and return type covariance."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – TypeScript Project References & Composite Builds",
            "summary": "Architecting large monorepos with tsconfig references, incremental compilation, and build caches."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Enterprise Monorepo Compilation Tuning",
            "summary": "Optimizing type-checking latency, skipLibCheck tradeoffs, and CI validation pipelines."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – TypeScript Master Certification Exam",
            "summary": "Comprehensive certification exam evaluating type theory soundness, variance, and monorepo scaling."
          }
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
    "title": "React (Components, Hooks, State Management, Virtual DOM, React 19)",
    "level": "LEVEL: ARCHITECT_CONCURRENT",
    "duration": "45.0_HRS",
    "specId": "REACT_19_FIBER",
    "trackBadge": "REACT 19",
    "summary": "Engineer deterministic enterprise interfaces with concurrent rendering, Fiber double-buffering reconciliation, custom hook pipelines, and streaming React Server Components.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "React: Module 1: Component Model, JSX & Virtual DOM Mechanics",
        "shortTitle": "Component Model & Virtual DOM",
        "desc": "Understand the foundational mental model: component tree composition, JSX compilation, Virtual DOM, and reconciliation keys.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to React 19 & Component Architecture",
            "summary": "Foundations of declarative UI rendering, pure functions with props, and UI as a function of state."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – JSX Transpilation & React Element Objects",
            "summary": "How JSX compiles to jsxRuntime calls, element immutability, and component vs element distinctions."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Virtual DOM Diffing & Reconciliation Keys",
            "summary": "Heuristic O(n) diffing algorithm, key prop identity preservation, and list reordering hazards."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Component Composition & Prop Drilling Mitigation",
            "summary": "Children composition patterns, slots, render props, and building compound components."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Virtual DOM & Component Fundamentals",
            "summary": "Assessment testing element tree reconciliation, key mechanics, and declarative composition."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "React: Module 2: Core Hooks Lifecycle & State Batching",
        "shortTitle": "Hooks Lifecycle & State Batching",
        "desc": "Master execution lifecycle: useState setter batching, useEffect cleanup timing, useRef instance preservation, and hook dispatcher queues.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – useState Execution Semantics & Automatic Batching",
            "summary": "State setter queues, functional updater forms, and automatic microtask batching in React 19."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – useEffect Dependencies, Subscriptions & Cleanup Timing",
            "summary": "Synchronizing with external systems, passive effect scheduling, and memory leak cleanup cycles."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – useRef Mutable Values & DOM Node Referencing",
            "summary": "Preserving mutable references without triggering re-renders, forwardRef, and DOM measurement."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Hook Rules & Internal Dispatcher Call Stacks",
            "summary": "Rules of Hooks, internal linked-list state storage in Fiber nodes, and debugging hook mismatches."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Core Hooks Lifecycle Assessment",
            "summary": "Examination testing effect execution order, updater closures, and state batching invariants."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "React: Module 3: Synthetic Events, Controlled UI & Form Architectures",
        "shortTitle": "Synthetic Events & Form Actions",
        "desc": "Event delegation pool, controlled vs uncontrolled inputs, React 19 useActionState, and native server action binding.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – React SyntheticEvent System & Event Delegation",
            "summary": "Cross-browser event normalization, bubbling phases, and root container event delegation."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Controlled vs Uncontrolled Form Components",
            "summary": "Two-way state binding vs uncontrolled ref inputs, defaultValue, and form validation."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – React 19 useActionState & Server Action Form Handlers",
            "summary": "Handling async form submissions natively with pending states, optimistic UI, and FormData."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Event Handling & Form Binding Test",
            "summary": "Assessment covering synthetic event propagation, input synchronization, and form actions."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": "React: Module 4: Performance Optimization & Referential Stability",
        "shortTitle": "Performance & Referential Stability",
        "desc": "Audit and eliminate unnecessary renders: memoizing expensive calculations, stable function references, and Profiler auditing.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Re-render Causes & The React Compiler Mental Model",
            "summary": "Tracking why components re-render: state updates, parent re-renders, and context consumers."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – useMemo, useCallback & Referential Equality",
            "summary": "Caches across renders, shallow dependency comparison, and preventing child invalidations."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – Component Memoization (React.memo) & Profiler DevTools",
            "summary": "Custom arePropsEqual comparators, flamegraphs, commit timing, and interaction tracing."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – Performance Optimization Assessment",
            "summary": "Test evaluating render bottleneck diagnostics, memoization trade-offs, and referential stability."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": "React: Module 5: Custom Reusable Hook Pipelines & Subscriptions",
        "shortTitle": "Custom Hooks & Subscriptions",
        "desc": "Package complex stateful workflows into testable custom hooks, external store subscriptions, and AbortController integration.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – Custom Hook Design & State Logic Encapsulation",
            "summary": "Extracting reusable behavioral primitives, composable hook pipelines, and API ergonomics."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – useSyncExternalStore for Concurrent-Safe Stores",
            "summary": "Subscribing to external stores without tearing under concurrent rendering, snapshot memoization."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – Network Request Hooks with AbortController Cleanups",
            "summary": "Race-condition prevention, request cancellation on unmount, and automated error retries."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – Custom Hook Pipeline Examination",
            "summary": "Assessment covering custom hook composability, external store subscriptions, and async cleanups."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "React: Module 6: Finite State Machines & Strategic Context Splitting",
        "shortTitle": "FSM & Context Architecture",
        "desc": "Replace fragile boolean flags with deterministic state machines via useReducer and split React Context to prevent tree re-renders.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Complex State with useReducer & Action Creators",
            "summary": "Deterministic transition tables, discriminated union actions, and predictable state transitions."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – React Context API & Provider Hierarchy",
            "summary": "Propagating global dependencies, Theme/Auth providers, and custom hook access wrappers."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Context Splitting to Prevent Unnecessary Tree Re-renders",
            "summary": "Separating State and Dispatch contexts to isolate active consumers from passive listeners."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Global State & FSM Architecture Test",
            "summary": "Test evaluating reducer purity, context subscription boundaries, and FSM transition safety."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": "React: Module 7: React Fiber Reconciliation & Concurrent Engine",
        "shortTitle": "Fiber Architecture & Concurrency",
        "desc": "Deep-dive into Fiber nodes, double-buffering work trees, Lanes priority bitmasks, and non-blocking transitions.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – Fiber Node Architecture (Child, Sibling, Return)",
            "summary": "Linked-list tree data structure, units of work, and alternate work-in-progress double buffering."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – WorkLoop, Render Phase vs Commit Phase",
            "summary": "Interruptible render phase, time-slicing scheduler, and synchronous DOM mutation commit phase."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – Concurrent Transitions (useTransition) & Lanes Priority",
            "summary": "Urgent vs non-urgent updates, 31-bit Lanes priority allocation, and cooperative multitasking."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – Fiber Engine & Concurrency Exam",
            "summary": "Comprehensive exam testing Fiber traversal, double buffering, and Lane priority preemption."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": "React: Module 8: React Server Components (RSC) & Streaming SSR Pipeline",
        "shortTitle": "Server Components & Streaming SSR",
        "desc": "Unify server and client: zero-bundle-size server components, HTML streaming with Suspense, and Server Actions.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – Server Components vs Client Components ('use client')",
            "summary": "The client-server boundary, module graph splitting, and serializable prop restrictions."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – Streaming SSR with <Suspense> & Progressive Hydration",
            "summary": "Out-of-order HTML chunk delivery over HTTP, selective hydration, and instant First Contentful Paint."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – Zero-Bundle-Size Server Dependencies & Direct DB Queries",
            "summary": "Executing database queries directly in components without client bundle weight or REST endpoints."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – RSC Architecture & Streaming Assessment",
            "summary": "Evaluation testing component graph serialization, selective hydration, and streaming SSR."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": "React: Module 9: Custom Reconcilers & Low-Level Architectural Embedding",
        "shortTitle": "Custom Reconcilers & Embedding",
        "desc": "Implement custom host renderers utilizing package react-reconciler (rendering to Canvas, Terminal, or Three.js).",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – The react-reconciler Package & Host Config",
            "summary": "Implementing appendInitialChild, createInstance, prepareUpdate, and commitUpdate methods."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – Building Custom Renderers (Terminal/Canvas/Three.js)",
            "summary": "Translating React declarative trees into custom graphics or CLI terminal primitives."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Micro-Frontend Lifecycle & Custom Element Hydration",
            "summary": "Wrapping React trees into Web Components, shadow DOM style isolation, and multi-root mounting."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – React 19 Master Architect Certification",
            "summary": "Master certification examination covering custom reconciler pipelines and enterprise scalability."
          }
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
    "title": "PHP 8 (OOP, PDO, Composer, PSR standards, Modern PHP 8.x features)",
    "level": "LEVEL: ENTERPRISE_BACKEND",
    "duration": "40.0_HRS",
    "specId": "PHP_8_BACKEND",
    "trackBadge": "PHP 8.3",
    "summary": "Build ultra-reliable server-side business engines utilizing PHP 8.3 strict types, constructor property promotion, PDO prepared transactions, PSR-4 autoloading, and RoadRunner worker runtimes.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "PHP: Module 1: Modern PHP 8.x Syntax & Strict Type System",
        "shortTitle": "Modern PHP 8 Syntax & Types",
        "desc": "Execute with declare(strict_types=1), match expressions, nullsafe operator (?->), and named arguments.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to PHP 8 & Zend Engine Overview",
            "summary": "Architecture of modern PHP, Zend Engine compilation, opcodes, and strict typing mental model."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – declare(strict_types=1) & Scalar Type Declarations",
            "summary": "Enforcing scalar parameter types, return type declarations, and union types (int|float)."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Match Expressions vs Switch & Nullsafe Operator (?->)",
            "summary": "Strict equality matching, value returning expressions, and chaining safe navigation operators."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Named Arguments, Mixed Type & Intersection Types",
            "summary": "Calling functions with named parameters, mixed return types, and intersection types (&)."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – PHP 8 Modern Syntax Test",
            "summary": "Assessment covering strict type coercion prevention, match expression returns, and null handling."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "PHP: Module 2: Object-Oriented Programming (OOP) Core & Attributes",
        "shortTitle": "OOP Core & Native Attributes",
        "desc": "Constructor property promotion, readonly classes, backed enums, interfaces, and native PHP 8 attributes.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – Constructor Property Promotion & Readonly Classes",
            "summary": "Boilerplate reduction, immutable data transfer objects (DTOs), and readonly class modifiers."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Enums with Backed Values & Interface Implementation",
            "summary": "String/int backed enums, match integration, and implementing custom methods on enums."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – PHP 8 Native Attributes (#[Route], #[Inject])",
            "summary": "Replacing docblock annotations with native structured metadata and ReflectionAttribute parsing."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Interfaces, Abstract Classes & Trait Precedence",
            "summary": "Polymorphism, interface segregation, trait conflict resolution, and abstract templates."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – OOP Core & Attributes Exam",
            "summary": "Comprehensive test covering constructor promotion, readonly invariants, and attribute reflection."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "PHP: Module 3: Secure Database Connectivity with PDO",
        "shortTitle": "Secure Database with PDO",
        "desc": "Robust database access using PDO: parameterized prepared statements, ACID transactions, and error handling.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – PDO Connection DSN & Error Modes (ERRMODE_EXCEPTION)",
            "summary": "Configuring PostgreSQL/MySQL DSN strings, connection pooling, and exception attributes."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Prepared Statements & Parameter Binding",
            "summary": "Eliminating SQL injection through parameterized bindValue/bindParam, and fetch object hydration."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – ACID Transaction Isolation & Rollback Handling",
            "summary": "Atomic multi-table mutations, beginTransaction, commit, and catching PDOExceptions to rollback."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Secure Database Operations Test",
            "summary": "Assessment testing SQL injection defenses, transaction boundaries, and prepared statement caching."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": "PHP: Module 4: PSR Standards Compliance & Modular Namespaces",
        "shortTitle": "PSR Standards & Namespaces",
        "desc": "Build interoperable enterprise backends: PSR-4 autoloading, PSR-7 HTTP messages, and PSR-15 middleware.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – PSR-4 Autoloading Standard & Namespace Architecture",
            "summary": "Mapping namespace hierarchies to file directories and eliminating manual require/include."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – PSR-7 HTTP Message Interfaces (Request / Response)",
            "summary": "Immutable ServerRequestInterface, ResponseInterface, URI parsing, and stream bodies."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – PSR-15 HTTP Server Handlers & Middleware Pipelines",
            "summary": "Building onion-architecture middleware pipelines (authentication, CORS, logging, compression)."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – PSR Compliance & Standards Exam",
            "summary": "Test evaluating autoloading resolution, immutable HTTP message transformations, and middleware chains."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": "PHP: Module 5: Enterprise Composer Architecture & Package Management",
        "shortTitle": "Composer Architecture & Packages",
        "desc": "Dependency management: composer.json schema, classmap optimization (-o), lock files, and semantic versioning.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – composer.json Schema & Classmap Optimization (-o)",
            "summary": "Managing require vs require-dev, optimizing the autoloader for production with dump-autoload -o."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Semantic Version Constraints (^, ~) & Lock Files",
            "summary": "Deterministic reproducible builds via composer.lock, version resolution, and security audits."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – Authoring & Publishing Custom Packagist Libraries",
            "summary": "Package anatomy, creating reusable enterprise packages, and configuring private Git repositories."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – Dependency Management & Composer Test",
            "summary": "Assessment covering autoloader optimization benchmarks, version constraint solving, and package release."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "PHP: Module 6: Custom Modular MVC Framework Engineering",
        "shortTitle": "Custom MVC Framework Design",
        "desc": "Engineer a decoupled MVC framework: front controller pattern, attribute routing, and PSR-11 DI container.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Front Controller Pattern & .htaccess URL Rewriting",
            "summary": "Directing all HTTP traffic through public/index.php, request parsing, and environment loading."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – Attribute-Based Routing Engine & Controller Dispatch",
            "summary": "Matching HTTP methods and URI paths with regex parameters to invoke controller actions."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – PSR-11 Dependency Injection Container & Reflection",
            "summary": "Recursive constructor auto-wiring via ReflectionClass, service bindings, and singletons."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Custom MVC Framework Architecture Exam",
            "summary": "Examination testing front controller routing, DI container auto-wiring, and MVC response flow."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": "PHP: Module 7: PHP 8 JIT Compiler & OPcache Internal Optimization",
        "shortTitle": "PHP JIT Compiler & OPcache",
        "desc": "Zend OPcache internals, bytecode optimization, Tracing JIT compilation, and opcache.preload configuration.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – OPcache Bytecode Compilation & Memory Internals",
            "summary": "How PHP caches AST opcode compilations in shared memory (SHM) to skip redundant parsing."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – Tracing JIT vs Function JIT Compilation Modes",
            "summary": "Compiling hot opcode traces directly into machine code (x86_64) for CPU-bound computations."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – OPcache Preloading (opcache.preload) for Fast Boot",
            "summary": "Compiling framework classes into permanent memory at server boot to achieve near-instant requests."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – OPcache & JIT Compilation Assessment",
            "summary": "Test covering shared memory tuning, JIT buffer sizing, and preloading script verification."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": "PHP: Module 8: Fibers Concurrency & Asynchronous Event Loops",
        "shortTitle": "Fibers Concurrency & Event Loops",
        "desc": "Non-blocking concurrency with PHP 8.1 Fibers (suspend/resume), streams, and async event loops with Revolt and ReactPHP.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – PHP 8.1 Fibers Architecture (Suspend & Resume)",
            "summary": "Full-stack coroutines, managing execution stack contexts, and cooperative multitasking."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – Non-Blocking I/O with Streams (stream_select)",
            "summary": "Multiplexing network sockets without blocking the main process, timeout management."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – Async Concurrency with Revolt, ReactPHP & Amp",
            "summary": "Building asynchronous HTTP clients, concurrent file reading, and event loop scheduling."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – Asynchronous Execution & Fibers Exam",
            "summary": "Assessment testing fiber stack switching, non-blocking socket loops, and async flow control."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": "PHP: Module 9: High-Throughput Runtimes & Performance Profiling",
        "shortTitle": "High-Throughput Runtimes & Profiling",
        "desc": "Eliminate traditional request lifecycle overhead: RoadRunner and Swoole application servers and profiling.",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – Persistent Worker Runtimes: RoadRunner & Swoole",
            "summary": "Booting framework once in memory, processing thousands of requests per second with worker pools."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – Memory Leak Prevention in Long-Running PHP Daemons",
            "summary": "Garbage collection cycles, clearing static caches, and unsetting circular references."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Performance Bottleneck Profiling with Xdebug & Blackfire",
            "summary": "Generating call graphs, memory allocation flame charts, and micro-optimizing critical paths."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – PHP 8 Backend Master Certification Exam",
            "summary": "Master certification examination evaluating persistent daemon runtimes and high-concurrency architectures."
          }
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
    "icon": "fa-brands fa-windows text-purple-500",
    "badgeColor": "bg-purple-100 text-purple-900 border-purple-300",
    "title": ".NET / C# (ASP.NET Core Web APIs, Entity Framework Core, Dependency Injection)",
    "level": "LEVEL: HIGH_THROUGHPUT_DISTRIBUTED",
    "duration": "52.0_HRS",
    "specId": "DOTNET_9_KESTREL",
    "trackBadge": ".NET 9",
    "summary": "Construct high-throughput distributed microservices and RESTful Web APIs on .NET 9 using Kestrel server pipelines, asynchronous EF Core query optimization, pipeline middleware, and native DI.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": ".NET: Module 1: Modern C# Syntax & Type System Foundations",
        "shortTitle": "Modern C# Syntax & Type System",
        "desc": "Master modern C# features: value types vs reference types, immutable records, pattern matching, and nullable references.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to .NET 9 & CLR Runtime Architecture",
            "summary": "Overview of Common Language Runtime (CLR), Common Intermediate Language (CIL), and modern C# 13."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – Value Types vs Reference Types & Memory Layout",
            "summary": "Stack vs Heap allocation, structs vs classes, boxing/unboxing overhead, and readonly structs."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Records, Pattern Matching & Positional Deconstruction",
            "summary": "Record structs/classes, with-expressions, switch expressions, property patterns, and relational patterns."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Nullable Reference Types & ValueTask<T> Async Basics",
            "summary": "Compiler null-state analysis, null-forgiving operator (!), and zero-allocation ValueTask for synchronous returns."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Modern C# Language Fundamentals Test",
            "summary": "Assessment covering stack/heap memory, pattern matching exhaustiveness, and null safety."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": ".NET: Module 2: ASP.NET Core Architecture & Host Bootstrap",
        "shortTitle": "ASP.NET Core Host & DI Bootstrap",
        "desc": "Understand WebApplicationBuilder bootstrap, dependency injection service lifetimes, and configuration providers.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – WebApplicationBuilder & Host Configuration",
            "summary": "Configuring Kestrel server options, environment-specific configs, and building the web application host."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Native Dependency Injection: Scoped, Transient, Singleton",
            "summary": "Service container registrations, captive dependency hazards, and IServiceScopeFactory disposal."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – Configuration Providers (appsettings.json, Env Vars)",
            "summary": "Hierarchical configuration, strongly-typed Options pattern (IOptions<T>, IOptionsSnapshot<T>)."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – Structured Logging with Serilog & OpenTelemetry",
            "summary": "Log event formatting, structured semantic tokens, and exporting distributed traces via OTLP."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Host Bootstrap & DI Lifecycle Exam",
            "summary": "Evaluation testing DI scope validation, captive dependency detection, and configuration binding."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": ".NET: Module 3: Minimal APIs & Route Endpoint Binding",
        "shortTitle": "Minimal APIs & Route Endpoints",
        "desc": "Build lightning-fast HTTP endpoints: route mapping, parameter binding, endpoint filters, and TypedResults.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – Minimal API Route Handlers (app.MapGet, MapPost)",
            "summary": "High-performance endpoint routing without controller overhead, lambda handlers, and route groups."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Model Binding, Route Parameters & Validation",
            "summary": "Binding from route, query, headers, and JSON body; integrating FluentValidation."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – Response Formatting with TypedResults & OpenAPI",
            "summary": "Type-safe HTTP responses (Results.Ok, Results.NotFound), OpenAPI metadata, and Swagger generation."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – Minimal APIs Architecture Test",
            "summary": "Assessment covering route constraint matching, typed result union return types, and endpoint filters."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": ".NET: Module 4: Entity Framework Core 9 Query Optimization",
        "shortTitle": "EF Core 9 Query Optimization",
        "desc": "Master EF Core data access: DbContext pooling, compiled LINQ queries, AsNoTracking, and split query execution.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – DbContext Configuration, Pooling & Migrations",
            "summary": "AddDbContextPool for high-throughput connection recycling, code-first migrations, and model caching."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – LINQ Queries, AsNoTracking & Compiled Queries",
            "summary": "Eliminating change tracker overhead for read queries, and pre-compiled LINQ queries (EF.CompileQuery)."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – Split Queries, Batch Updates & Raw SQL Interpolation",
            "summary": "Mitigating cartesian explosion via AsSplitQuery, ExecuteUpdate/ExecuteDelete batching, and FromSqlRaw."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – EF Core 9 High-Performance Data Access",
            "summary": "Test evaluating query plan diagnostics, change tracker performance, and database indexing."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": ".NET: Module 5: Custom Pipeline Middleware & Action Filters",
        "shortTitle": "Custom Middleware & Filters",
        "desc": "Construct enterprise middleware: RequestDelegate pipelines, global exception handlers, and correlation logging.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – RequestDelegate Middleware Execution Pipeline",
            "summary": "The bidirectional HTTP pipeline, invoke next delegate, short-circuiting responses, and branch routes."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Centralized Exception Handling Middleware",
            "summary": "ProblemDetails standard (RFC 7807), exception interception, and hiding internal stack traces in prod."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – Correlation ID Propagation & Request Timing Headers",
            "summary": "Injecting X-Correlation-ID into HttpContext and logging scopes for distributed microservice tracing."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – HTTP Pipeline Middleware Assessment",
            "summary": "Evaluation testing middleware order invariants, error masking, and correlation tracing."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": ".NET: Module 6: Clean Architecture & CQRS with MediatR",
        "shortTitle": "Clean Architecture & CQRS",
        "desc": "Architect enterprise microservices: Domain-Driven Design (DDD), CQRS commands/queries, and MediatR pipeline behaviors.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – Clean Architecture Layers (Domain, App, Infra, Web)",
            "summary": "Dependency inversion principle: domain entities at the core, decoupled persistence, and ports/adapters."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – CQRS Commands & Queries Separation with MediatR",
            "summary": "Decoupling mutations from queries with IRequest and IRequestHandler interfaces for single responsibility."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – MediatR Pipeline Behaviors (Validation, Caching, Logging)",
            "summary": "Cross-cutting concerns via IPipelineBehavior<TRequest, TResponse>, fluent validation decorators."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Enterprise Clean Architecture Exam",
            "summary": "Test covering domain encapsulation, command/query separation, and pipeline behavior sequencing."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": ".NET: Module 7: High-Performance Memory Engineering with Span & Memory",
        "shortTitle": "Zero-Allocation Memory & Span",
        "desc": "Zero-allocation memory mastery: Span<T>, ReadOnlySpan<char>, stackalloc, and ArrayPool buffer recycling.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – Span<T> and ReadOnlySpan<char> Zero-Copy Slicing",
            "summary": "Ref structs on the stack, sub-string slicing without heap allocations, and contiguous memory access."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – stackalloc Memory Allocation & Safety Limits",
            "summary": "Direct stack memory buffers for fast operations, avoiding Garbage Collection overhead completely."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – Buffer Pooling with ArrayPool<T>.Shared",
            "summary": "Renting and returning byte buffers for high-volume network streams and file I/O operations."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – Zero-Allocation Memory Engineering Test",
            "summary": "Assessment covering Span ref struct lifetime rules, stackoverflow prevention, and pool returns."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": ".NET: Module 8: Kestrel Web Server Tuning & HTTP/3 QUIC Protocol",
        "shortTitle": "Kestrel Tuning & HTTP/3 QUIC",
        "desc": "Tune Kestrel for extreme throughput: socket transport layer, connection limits, and HTTP/3 QUIC protocol.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – Kestrel Socket Transport & Connection Multiplexing",
            "summary": "SocketsHttpHandler, epoll/kqueue IO loops, connection limits, and Keep-Alive timeouts."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – ThreadPool Tuning & Starvation Prevention",
            "summary": "Configuring worker and I/O completion threads, avoiding sync-over-async deadlocks (.Result / .Wait())."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – HTTP/3 over QUIC UDP Transport Setup",
            "summary": "Eliminating head-of-line blocking with UDP-based QUIC, multiplexed streams, and 0-RTT handshakes."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – Kestrel Server Throughput & QUIC Exam",
            "summary": "Examination testing socket transport benchmarks, thread starvation diagnostics, and QUIC packet flows."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": ".NET: Module 9: CLR Internals, Garbage Collection & Native AOT",
        "shortTitle": "CLR Internals, GC & Native AOT",
        "desc": "Explore runtime execution: Generational GC (Gen 0, 1, 2, LOH, POH), Tiered JIT compilation, and Native AOT compilation.",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – Generational Garbage Collection: Gen 0, 1, 2, LOH & POH",
            "summary": "Ephemeron collector, Large Object Heap (LOH), Pinned Object Heap (POH), and Server vs Workstation GC."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – Tiered JIT Compilation & Dynamic PGO Optimization",
            "summary": "QuickJit startup speed, Profile-Guided Optimization (PGO), and re-compiling hot methods with Tier 1."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Native AOT Compilation for Instant Cold Starts",
            "summary": "Ahead-of-Time native binary compilation, zero JIT overhead, minimal memory footprints, and trimmer warnings."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – .NET 9 Enterprise Architect Certification",
            "summary": "Master certification exam testing GC pressure reduction, native AOT compatibility, and runtime tuning."
          }
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
    "title": "DNS (Nameservers, A/AAAA/CNAME/MX/TXT records, Propagation, TTL, TLS 1.3)",
    "level": "LEVEL: DISTRIBUTED_BACKBONE",
    "duration": "26.0_HRS",
    "specId": "DNS_NETWORKING_RFC",
    "trackBadge": "DNS RFC",
    "summary": "Demystify the distributed backbone of the global internet: authoritative vs recursive nameservers, zone transfers, DNSSEC validation, global TTL propagation latencies, and TLS 1.3 cryptographic handshakes.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "DNS: Module 1: Distributed DNS Architecture & Global Root Hierarchy",
        "shortTitle": "Distributed DNS & Root Hierarchy",
        "desc": "Understand the global resolution hierarchy: Root nameservers, TLDs, Authoritative vs Recursive resolvers, and lookups.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to DNS & Global Distributed Name Resolution",
            "summary": "The architectural foundation of the internet: distributed namespace, RFC 1034/1035, and UDP port 53."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – The 13 Root Server Clusters & Top-Level Domains (TLDs)",
            "summary": "Global root server clusters (A through M), Anycast distribution, generic TLDs (gTLDs), and country codes."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Authoritative vs Recursive Resolver Functions",
            "summary": "Recursive resolver caching layers (ISP/1.1.1.1/8.8.8.8) vs Authoritative zone custodians."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – Iterative Resolution Walkthrough with dig +trace",
            "summary": "Tracing packet delegations from root (.) to TLD (.com) down to domain authoritative nameservers."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – DNS Global Hierarchy Assessment",
            "summary": "Assessment testing resolver recursion, delegation referrals, and dig packet analysis."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "DNS: Module 2: Core Resource Records: A, AAAA, CNAME, MX & TXT",
        "shortTitle": "Core Resource Records (A/MX/TXT)",
        "desc": "Master fundamental DNS resource record types: IPv4/IPv6 host addresses, canonical alias chains, and mail routing.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – A (IPv4) & AAAA (IPv6) Host Address Records",
            "summary": "Mapping fully qualified domain names (FQDN) directly to 32-bit IPv4 and 128-bit IPv6 network endpoints."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – CNAME Alias Records & Canonical Chain Limits",
            "summary": "Aliasing domain names, the zone apex restriction (CNAME at root domain), and ALIAS/ANAME workarounds."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – MX Mail Routing Priorities & Server Fallback",
            "summary": "Mail exchanger records, priority metric integers, fallback backup mail servers, and MX host FQDN rules."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – TXT Records for Domain Verification & Custom Metadata",
            "summary": "Arbitrary text attributes, Google/Domain ownership challenges, and security policy containers."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Core DNS Records Configuration Exam",
            "summary": "Comprehensive test evaluating record syntax, apex restrictions, and MX routing priorities."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "DNS: Module 3: TTL Mechanics, Caching Layers & Propagation Dynamics",
        "shortTitle": "TTL Caching & Propagation",
        "desc": "Deconstruct caching: Time-to-Live (TTL) countdown timers, recursive resolver cache eviction, and negative caching.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – Time-To-Live (TTL) Seconds & Cache Eviction Timers",
            "summary": "Authoritative TTL headers, intermediate cache countdowns, and balancing performance vs flexibility."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Negative Caching & SOA Minimum TTL Records",
            "summary": "Caching NXDOMAIN errors (RFC 2308), SOA minimum field, and preventing resolver denial-of-service."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – Zero-Downtime Migration Strategies & TTL Pre-Lowering",
            "summary": "Pre-lowering TTL 48 hours prior to server IP cutover to guarantee immediate global traffic migration."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – DNS Caching & Propagation Test",
            "summary": "Assessment covering caching hierarchies, negative caching rules, and migration execution plans."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": "DNS: Module 4: Anycast BGP Routing & Edge Traffic Steering",
        "shortTitle": "Anycast BGP & Geo-DNS Steering",
        "desc": "Deploy resilient global DNS: BGP Anycast IP routing topology, latency-based Geo-DNS steering, and health checks.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Unicast vs BGP Anycast Single-IP Routing Topology",
            "summary": "Announcing identical IP prefixes from 200+ PoPs via BGP, automatic shortest AS-path routing."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – Latency-Based Geo-DNS Steering & EDNS Client Subnet (ECS)",
            "summary": "Routing clients to the closest edge server using EDNS0 client IP subnet information (RFC 7871)."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – Health Probing & Automated Failover DNS Routing",
            "summary": "Continuous synthetic HTTP/ICMP health probes, withdrawing dead IP addresses within 30 seconds."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – Global Edge Routing Assessment",
            "summary": "Test evaluating BGP route propagation, Geo-DNS policy configuration, and automated failover."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": "DNS: Module 5: Enterprise Email Authentication: SPF, DKIM & DMARC",
        "shortTitle": "Email Security: SPF, DKIM & DMARC",
        "desc": "Harden email deliverability and prevent spoofing: SPF mechanisms, DKIM public key signatures, and DMARC enforcement.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – SPF (Sender Policy Framework) Mechanics & IP Includes",
            "summary": "Specifying authorized mail server IPs (v=spf1), ip4, include mechanisms, and hard fail (-all)."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – DKIM (DomainKeys Identified Mail) Public Key Records",
            "summary": "Asymmetric cryptography in email: selector TXT records, private key header signing, and public verification."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – DMARC Policy Enforcement (p=reject) & Forensic Reports",
            "summary": "Aligning SPF and DKIM domains, quarantine vs reject policies, and aggregate rua reporting."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – Email Security & Anti-Spoofing Exam",
            "summary": "Examination testing SPF lookup limits (10 DNS lookups max), DKIM key rotation, and DMARC alignment."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "DNS: Module 6: Encrypted Transport Protocols & TLS 1.3 Handshake",
        "shortTitle": "Encrypted DNS & TLS 1.3 Handshake",
        "desc": "Secure name resolution against eavesdropping: DNS over HTTPS (DoH), DNS over TLS (DoT), and TLS 1.3 handshakes.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – DNS over HTTPS (DoH) & DNS over TLS (DoT) Architecture",
            "summary": "Encrypting last-mile resolver queries via port 853 (DoT) and port 443 (DoH RFC 8484) against ISP snooping."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – TLS 1.3 1-RTT Handshake & Key Exchange (ECDHE)",
            "summary": "Diffie-Hellman ephemeral key exchange, eliminating plaintext SNI snooping, and forward secrecy."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Encrypted Client Hello (ECH) & Server Name Indication",
            "summary": "Next-generation cryptographic privacy preventing on-path observers from seeing visited domain names."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Secure Transport Protocols Assessment",
            "summary": "Assessment covering DoH binary wire format, TLS certificate validation, and ECH key distribution."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": "DNS: Module 7: DNSSEC Cryptographic Zone Signing & Trust Chains",
        "shortTitle": "DNSSEC Zone Signing & Trust Chains",
        "desc": "Protect against cache poisoning (Kaminsky attacks): asymmetric signatures (RRSIG), DNSKEY, and DS record trust chains.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – Cache Poisoning Attacks (Kaminsky) & DNSSEC Defenses",
            "summary": "Vulnerabilities of classic DNS spoofing, transaction ID guessing, and cryptographic proof of authenticity."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – RRSIG Signatures, DNSKEY Public Keys & DS Hashes",
            "summary": "Zone Signing Keys (ZSK), Key Signing Keys (KSK), signing resource record sets (RRsets), and DS digests."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – Cryptographic Chain of Trust from Root to Leaf",
            "summary": "Validating signatures upward to the IANA Root trust anchor, NSEC/NSEC3 authenticated denial of existence."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – DNSSEC Cryptographic Signing Test",
            "summary": "Test evaluating KSK rollovers, validating resolver verification logs, and NSEC3 hash collisions."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": "DNS: Module 8: BIND9 Zone File Authoring & Secure Zone Transfers",
        "shortTitle": "BIND9 Zone Files & Zone Transfers",
        "desc": "Enterprise nameserver operations: RFC 1035 zone file syntax, SOA serial number conventions, AXFR/IXFR, and TSIG keys.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – RFC 1035 Zone File Syntax & SOA Serial Number Rules",
            "summary": "Start of Authority (SOA) parameters: primary nameserver, admin email, refresh, retry, expire, and YYYYMMDDNN serials."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – AXFR Full & IXFR Incremental Zone Transfers",
            "summary": "Synchronizing secondary nameservers over TCP port 53, zone serial comparisons, and transfer logs."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – TSIG Transaction Signature Shared Key Security",
            "summary": "Authenticating primary-secondary communications with HMAC-SHA256 secret keys to prevent rogue zone injection."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – Authoritative Zone Authoring Exam",
            "summary": "Assessment covering BIND9 syntax errors, named-checkzone diagnostics, and secure transfer configs."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": "DNS: Module 9: Certificate Authority Authorization & Low-Level Protocols",
        "shortTitle": "CAA Records & Low-Level Protocols",
        "desc": "Advanced security and low-level protocol engineering: RFC 8659 CAA records, DNS binary wire format, and proxy servers.",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – CAA Records for SSL/TLS Issuer Restriction",
            "summary": "Restricting authorized Certificate Authorities (issue/issuewild), incident reporting (iodef), and rogue cert prevention."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – DNS Binary Wire Format Packets (UDP 512b & TCP Fallback)",
            "summary": "Header bit flags (QR, Opcode, AA, TC, RD, RA, RCODE), question/answer sections, and EDNS0 buffer expansion."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Writing Custom DNS Proxies in Rust/Go",
            "summary": "Parsing UDP datagrams, implementing in-memory bloom filter ad-blockers, and upstream forwarding."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – DNS & Internet Infrastructure Master Certification",
            "summary": "Master certification examination covering binary wire packet inspection and enterprise DNS architectures."
          }
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
    "icon": "fa-solid fa-server text-fuchsia-500",
    "badgeColor": "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300",
    "title": "Web Hosting & DevOps (Linux/Nginx, Apache vhosts, Docker, CI/CD, SSL)",
    "level": "LEVEL: CLOUD_PRODUCTION_INFRA",
    "duration": "50.0_HRS",
    "specId": "DEVOPS_CONTAINERS_CI",
    "trackBadge": "DEVOPS",
    "summary": "Orchestrate zero-downtime production environments through hardened Linux kernels, high-concurrency Nginx reverse proxy tuning, multi-stage Docker builds, automated GitHub Actions CI/CD, and ACME SSL.",
    "modules": [
      {
        "num": "01",
        "code": "1.0 – 1.4",
        "title": "DevOps: Module 1: Linux Server Administration & Hardening Essentials",
        "shortTitle": "Linux Server Hardening Essentials",
        "desc": "Core server administration: SSH public key authentication, Linux user permissions, systemd service daemons, and firewalls.",
        "sections": [
          {
            "id": "1.0",
            "title": "1.0. Welcome to Linux Server Administration & DevOps Engineering",
            "summary": "Linux kernel architecture, user space vs kernel space, file system hierarchy (FHS), and POSIX security."
          },
          {
            "id": "1.1",
            "title": "1.1. Section 1 – User Privilege Separation, Sudoers & SSH Key Hardening",
            "summary": "Disabling root password login, Ed25519 SSH keys, configuring /etc/sudoers.d, and sshd_config hardening."
          },
          {
            "id": "1.2",
            "title": "1.2. Section 2 – Systemd Service Daemons & Journalctl Log Analysis",
            "summary": "Writing custom .service unit files, restart policies (on-failure), timers, and querying system logs with journalctl."
          },
          {
            "id": "1.3",
            "title": "1.3. Section 3 – UFW & Iptables Firewall Security Rules",
            "summary": "Default drop policy, rate-limiting SSH connections, and opening ports 80/443 with Uncomplicated Firewall."
          },
          {
            "id": "1.4",
            "title": "1.4. Module 1 Completion – Linux Server Administration Assessment",
            "summary": "Assessment covering systemd service orchestration, permission modes (chmod/chown), and firewall validation."
          }
        ]
      },
      {
        "num": "02",
        "code": "2.0 – 2.4",
        "title": "DevOps: Module 2: Web Server Foundations: Nginx & Apache Virtual Hosts",
        "shortTitle": "Web Server Foundations (Nginx/Apache)",
        "desc": "Host web applications: static asset serving, Nginx server blocks, Apache VirtualHosts, .htaccess, and MIME types.",
        "sections": [
          {
            "id": "2.0",
            "title": "2.0. Section 1 – Nginx Architecture (Event-Driven vs Process-Per-Connection)",
            "summary": "Master/worker process model, asynchronous non-blocking event loops, and handling 10,000+ concurrent connections."
          },
          {
            "id": "2.1",
            "title": "2.1. Section 2 – Server Blocks, Locations & Static Asset Caching",
            "summary": "Location block regex matching precedence, root vs alias, try_files directives, and Cache-Control headers."
          },
          {
            "id": "2.2",
            "title": "2.2. Section 3 – Apache VirtualHosts, .htaccess Rules & Mod_Rewrite",
            "summary": "Configuring Apache vhosts, directory permissions (AllowOverride), and URL rewriting rules."
          },
          {
            "id": "2.3",
            "title": "2.3. Section 4 – MIME Types, Gzip & Brotli Compression Tuning",
            "summary": "Text/binary MIME mappings, tuning gzip_comp_level, and Brotli dynamic stream compression."
          },
          {
            "id": "2.4",
            "title": "2.4. Module 2 Completion – Web Server Virtual Hosting Exam",
            "summary": "Comprehensive test evaluating server block routing, location precedence rules, and compression headers."
          }
        ]
      },
      {
        "num": "03",
        "code": "3.0 – 3.3",
        "title": "DevOps: Module 3: Automated SSL Provisioning with Let's Encrypt & Certbot",
        "shortTitle": "Automated SSL with Let's Encrypt",
        "desc": "Implement ubiquitous HTTPS: ACME protocol automation, Certbot CLI, automated certificate renewal, and TLS 1.3.",
        "sections": [
          {
            "id": "3.0",
            "title": "3.0. Section 1 – ACME Protocol Fundamentals & Challenge Types (HTTP-01, DNS-01)",
            "summary": "Automated Certificate Management Environment (ACME), cryptographic challenge verification, and SAN certs."
          },
          {
            "id": "3.1",
            "title": "3.1. Section 2 – Certbot CLI Automation & Nginx Configuration Injection",
            "summary": "Running certbot --nginx, automated SSL block generation, and strong DH parameter generation."
          },
          {
            "id": "3.2",
            "title": "3.2. Section 3 – Automated Certificate Renewal with Systemd Timers & Reloads",
            "summary": "Scheduling dry-run renewals, post-renewal hooks (nginx -s reload), and monitoring expiration alerts."
          },
          {
            "id": "3.3",
            "title": "3.3. Module 3 Completion – HTTPS & Automated SSL Assessment",
            "summary": "Assessment covering ACME HTTP-01 token placement, renewal hook scripts, and SSL Labs A+ rating checks."
          }
        ]
      },
      {
        "num": "04",
        "code": "4.0 – 4.3",
        "title": "DevOps: Module 4: Nginx High-Concurrency Reverse Proxy Tuning",
        "shortTitle": "Nginx Reverse Proxy & Load Balancing",
        "desc": "Scale high-traffic gateways: upstream load balancing algorithms, proxy micro-caching, and leaky bucket rate limiting.",
        "sections": [
          {
            "id": "4.0",
            "title": "4.0. Section 1 – Reverse Proxy Configuration & Upstream Load Balancing",
            "summary": "proxy_pass directives, HTTP header forwarding (X-Forwarded-For), and algorithms (round_robin, least_conn, ip_hash)."
          },
          {
            "id": "4.1",
            "title": "4.1. Section 2 – FastCGI Caching & Proxy Micro-Caching",
            "summary": "In-memory caching of dynamic PHP/Node responses for 1 second to withstand massive traffic spikes (Slashdot effect)."
          },
          {
            "id": "4.2",
            "title": "4.2. Section 3 – Leaky Bucket Rate Limiting (limit_req_zone) against DDoS",
            "summary": "Defining rate limit zones, burst buffers, nodelay directives, and blocking abusive scraper IP ranges."
          },
          {
            "id": "4.3",
            "title": "4.3. Module 4 Completion – Reverse Proxy Architecture Exam",
            "summary": "Test evaluating upstream connection pooling, micro-cache bypass headers, and rate limiting rules."
          }
        ]
      },
      {
        "num": "05",
        "code": "5.0 – 5.3",
        "title": "DevOps: Module 5: Docker Containerization & Multi-Stage Builds",
        "shortTitle": "Docker & Multi-Stage Container Builds",
        "desc": "Containerize enterprise workloads: Dockerfile optimization, layer caching, non-root security, and Docker Compose orchestration.",
        "sections": [
          {
            "id": "5.0",
            "title": "5.0. Section 1 – Docker Engine Architecture, Namespaces & Cgroups",
            "summary": "Linux kernel primitives: PID/Network namespaces, cgroup resource limits (CPU/Memory), and overlay2 storage."
          },
          {
            "id": "5.1",
            "title": "5.1. Section 2 – Multi-Stage Dockerfile Optimization & Minimal Base Images",
            "summary": "Separating compile-time SDK tools from runtime production images (Alpine/Distroless) to reduce sizes by 90%."
          },
          {
            "id": "5.2",
            "title": "5.2. Section 3 – Container Security: Non-Root Users & Read-Only Filesystems",
            "summary": "Creating unprivileged appuser accounts, drop Linux capabilities, and mounting ephemeral volume mounts."
          },
          {
            "id": "5.3",
            "title": "5.3. Module 5 Completion – Docker Containerization Test",
            "summary": "Assessment covering Docker layer cache optimization, multi-stage artifact extraction, and container security."
          }
        ]
      },
      {
        "num": "06",
        "code": "6.0 – 6.3",
        "title": "DevOps: Module 6: Automated CI/CD Pipelines with GitHub Actions",
        "shortTitle": "CI/CD with GitHub Actions",
        "desc": "Automate delivery pipelines: GitHub Actions workflow YAML syntax, automated test suites, secrets management, and deployments.",
        "sections": [
          {
            "id": "6.0",
            "title": "6.0. Section 1 – GitHub Actions Workflow Syntax, Triggers & Runners",
            "summary": "Configuring on: [push, pull_request], hosted ubuntu-latest runners, and concurrency group cancellation."
          },
          {
            "id": "6.1",
            "title": "6.1. Section 2 – Automated Testing, Linting & Build Matrix Execution",
            "summary": "Parallel test execution across Node/PHP/Python versions using strategy: matrix, and caching node_modules."
          },
          {
            "id": "6.2",
            "title": "6.2. Section 3 – Secure Secrets Injection & Container Registry Push",
            "summary": "GitHub Encrypted Secrets, OpenID Connect (OIDC) cloud authentication, and pushing to Docker Hub / GHCR."
          },
          {
            "id": "6.3",
            "title": "6.3. Module 6 Completion – Continuous Integration & Delivery Assessment",
            "summary": "Test covering YAML pipeline syntax, artifact passing between jobs, and production deployment gating."
          }
        ]
      },
      {
        "num": "07",
        "code": "7.0 – 7.3",
        "title": "DevOps: Module 7: Linux Kernel Performance & TCP Socket Optimization",
        "shortTitle": "Kernel Performance & TCP Sockets",
        "desc": "Tune operating system limits: sysctl.conf network parameters, TCP BBR congestion control, and file descriptor limits.",
        "sections": [
          {
            "id": "7.0",
            "title": "7.0. Section 1 – sysctl.conf Network Tuning (somaxconn, tcp_max_syn_backlog)",
            "summary": "Expanding the TCP listen backlog, enabling TCP SYN cookies, and preventing packet drops during traffic surges."
          },
          {
            "id": "7.1",
            "title": "7.1. Section 2 – TCP BBR Congestion Control Protocol Enablement",
            "summary": "Replacing legacy CUBIC with Google BBR model-based congestion control for higher throughput and lower latency."
          },
          {
            "id": "7.2",
            "title": "7.2. Section 3 – File Descriptor Limits (ulimit -n) & Epoll Concurrency",
            "summary": "Tuning /etc/security/limits.conf (nofile 65535) and worker_rlimit_nofile for high-scale reverse proxies."
          },
          {
            "id": "7.3",
            "title": "7.3. Module 7 Completion – Kernel & Socket Performance Test",
            "summary": "Assessment testing sysctl parameter benchmarking, TIME_WAIT socket recycling, and ulimit configurations."
          }
        ]
      },
      {
        "num": "08",
        "code": "8.0 – 8.3",
        "title": "DevOps: Module 8: Zero-Downtime Deployment & Traffic Rollouts",
        "shortTitle": "Zero-Downtime Deployments & Rollouts",
        "desc": "Orchestrate zero-downtime upgrades: Blue/Green deployments, Canary traffic weighting, and graceful process reloading.",
        "sections": [
          {
            "id": "8.0",
            "title": "8.0. Section 1 – Blue/Green Deployment Topology & Load Balancer Switching",
            "summary": "Maintaining duplicate identical production clusters, running smoke tests on Green, and flipping upstream router."
          },
          {
            "id": "8.1",
            "title": "8.1. Section 2 – Canary Releases & Weighted Traffic Routing",
            "summary": "Routing 5% of production traffic to the new version, monitoring error rate metrics, and expanding rollout."
          },
          {
            "id": "8.2",
            "title": "8.2. Section 3 – Graceful Application Process Reloads without Dropping Conns",
            "summary": "Nginx master binary upgrade (USR2 signal) and Node/Gunicorn graceful shutdown (SIGTERM waiting for requests)."
          },
          {
            "id": "8.3",
            "title": "8.3. Module 8 Completion – Zero-Downtime Deployment Exam",
            "summary": "Evaluation testing health check circuit breakers, zero-drop reload validation, and automated rollback triggers."
          }
        ]
      },
      {
        "num": "09",
        "code": "9.0 – 9.3",
        "title": "DevOps: Module 9: Enterprise Container Hardening & Telemetry Monitoring",
        "shortTitle": "Container Hardening & Telemetry",
        "desc": "Secure and observe production clusters: Distroless containers, Trivy CVE vulnerability scans, and Prometheus/Grafana monitoring.",
        "sections": [
          {
            "id": "9.0",
            "title": "9.0. Section 1 – Distroless & Scratch Containers for CVE Attack Surface Reduction",
            "summary": "Stripping package managers, shells, and utilities from container images so attackers cannot execute commands."
          },
          {
            "id": "9.1",
            "title": "9.1. Section 2 – Container Vulnerability Scanning with Trivy in CI",
            "summary": "Automated vulnerability scanning in pull requests, blocking builds with Critical/High CVE disclosures."
          },
          {
            "id": "9.2",
            "title": "9.2. Section 3 – Telemetry Collection with Prometheus, Grafana & Loki",
            "summary": "Scraping application metrics (RED method: Rate, Errors, Duration), log aggregation, and real-time alerts."
          },
          {
            "id": "9.3",
            "title": "9.3. Module 9 Completion – Cloud Infrastructure & DevOps Master Certification",
            "summary": "Master certification examination covering zero-trust container security, Prometheus metrics, and automated alerts."
          }
        ]
      }
    ]
  }
];

  // ═══════════════════════════════════════════════════════════════════
  // 4. CODE SAMPLES & RUNTIME EXECUTOR
  // ═══════════════════════════════════════════════════════════════════
// Code samples and console outputs for all 7 tracks

function getTrackCodeSample(trackId, moduleNum, sectionId, secTitle) {
  if (trackId === 'javascript') {
    if (moduleNum === '01') {
      return '// JavaScript Essentials 1: Section ' + sectionId + ' - ' + secTitle + '\n' +
        'console.log("Welcome to JavaScript Essentials 1!");\n' +
        'console.log("Environment: Ready. Execution Context: Active.");\n' +
        'console.log("Status: Hello, World! program executed successfully.");';
    } else if (moduleNum === '02') {
      return '// Variable declarations and dynamic type casting\n' +
        'let userRole = "Software Engineer";\n' +
        'const version = 1.0;\n' +
        'let isVerified = Boolean(userRole);\n' +
        'console.log("Variable:", userRole, "Type:", typeof userRole);\n' +
        'console.log("Type Casting Check:", isVerified);';
    } else if (moduleNum === '03') {
      return '// Operator precedence and user interaction\n' +
        'let price = 49.99;\n' +
        'let quantity = 3;\n' +
        'let total = price * quantity;\n' +
        'let isFreeShipping = total > 100;\n' +
        'console.log("Total: $" + total.toFixed(2), "Free Shipping:", isFreeShipping);';
    } else if (moduleNum === '04') {
      return '// Control flow conditional iterations\n' +
        'let counter = 0;\n' +
        'while (counter < 3) {\n' +
        '  counter++;\n' +
        '  console.log("Loop iteration", counter, "executing conditional logic.");\n' +
        '}';
    } else if (moduleNum === '05') {
      return '// Function declarations and invocation call stack\n' +
        'function calculateSquare(num) {\n' +
        '  return num * num;\n' +
        '}\n' +
        'const result = calculateSquare(8);\n' +
        'console.log("Function Return Output:", result);';
    } else {
      return '// Structured exception handling\n' +
        'try {\n' +
        '  console.log("Diagnosing runtime execution...");\n' +
        '  console.log("Diagnostics pass: 0 errors detected.");\n' +
        '} catch (err) {\n' +
        '  console.error("Intercepted exception:", err.message);\n' +
        '}';
    }
  }

  if (trackId === 'typescript') {
    if (moduleNum === '01') {
      return '// TypeScript: ' + secTitle + '\n' +
        'interface UserProfile {\n' +
        '  readonly id: string;\n' +
        '  name: string;\n' +
        '  role: "admin" | "engineer" | "guest";\n' +
        '}\n\n' +
        'const currentDev: UserProfile = {\n' +
        '  id: "usr_9981",\n' +
        '  name: "Alex Vance",\n' +
        '  role: "engineer"\n' +
        '};\n' +
        'console.log("Active User:", currentDev.name, "| Role:", currentDev.role);';
    } else if (moduleNum === '02') {
      return '// Function Overloads and Type Predicates\n' +
        'type ResponseSuccess<T> = { status: "success"; data: T };\n' +
        'type ResponseError = { status: "error"; message: string };\n' +
        'type ApiResponse<T> = ResponseSuccess<T> | ResponseError;\n\n' +
        'function isSuccess<T>(res: ApiResponse<T>): res is ResponseSuccess<T> {\n' +
        '  return res.status === "success";\n' +
        '}\n\n' +
        'const res: ApiResponse<string[]> = { status: "success", data: ["app.ts", "server.ts"] };\n' +
        'if (isSuccess(res)) {\n' +
        '  console.log("Payload items count:", res.data.length);\n' +
        '}';
    } else if (moduleNum === '03') {
      return '// Generic Containers & Keyof Indexing\n' +
        'function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {\n' +
        '  return obj[key];\n' +
        '}\n\n' +
        'const serverConfig = { port: 8080, env: "production", ssl: true };\n' +
        'const activePort = getProperty(serverConfig, "port");\n' +
        'console.log("Server listening on port:", activePort);';
    } else if (moduleNum === '04') {
      return '// Conditional Types & Pattern Matching with infer\n' +
        'type UnpackPromise<T> = T extends Promise<infer U> ? U : T;\n\n' +
        'type AsyncData = Promise<{ token: string; expires: number }>;\n' +
        'type ResolvedData = UnpackPromise<AsyncData>;\n\n' +
        'console.log("Type-level conditional resolution validated successfully.");';
    } else if (moduleNum === '05') {
      return '// Mapped Types with Key Remapping via as\n' +
        'type Getters<T> = {\n' +
        '  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];\n' +
        '};\n\n' +
        'interface SystemMetrics {\n' +
        '  cpu: number;\n' +
        '  memory: number;\n' +
        '}\n' +
        'type MetricGetters = Getters<SystemMetrics>;\n' +
        'console.log("Mapped type interface created: getCpu() and getMemory().");';
    } else if (moduleNum === '06') {
      return '// Nominal Branded Types for Safety\n' +
        'declare const __brand: unique symbol;\n' +
        'type Brand<K, T> = K & { readonly [__brand]: T };\n\n' +
        'type UserId = Brand<string, "UserId">;\n' +
        'type OrderId = Brand<string, "OrderId">;\n\n' +
        'const id = "usr_001" as UserId;\n' +
        'console.log("Branded UserId validated with compile-time nominal isolation:", id);';
    } else if (moduleNum === '07') {
      return '// Ambient Declaration & Module Augmentation\n' +
        'declare global {\n' +
        '  interface Window {\n' +
        '    __ENGINE_DEBUG_BUILD: boolean;\n' +
        '  }\n' +
        '}\n' +
        'const debugMode = typeof window !== "undefined" ? window.__ENGINE_DEBUG_BUILD : false;\n' +
        'console.log("Ambient window declaration loaded. Debug mode:", Boolean(debugMode));';
    } else if (moduleNum === '08') {
      return '// TypeScript Compiler API & AST Traversal\n' +
        'import ts from "typescript";\n\n' +
        'const sourceCode = "const latencyMs: number = 42;";\n' +
        'const sourceFile = ts.createSourceFile("sample.ts", sourceCode, ts.ScriptTarget.Latest);\n\n' +
        'console.log("Root AST Node:", ts.SyntaxKind[sourceFile.kind], "| Statements:", sourceFile.statements.length);';
    } else {
      return '// Soundness & Project References\n' +
        '// tsconfig.json { "compilerOptions": { "strict": true, "composite": true } }\n' +
        'console.log("Composite monorepo project reference type check passed with 0 errors.");';
    }
  }

  if (trackId === 'react') {
    if (moduleNum === '01') {
      return '// React 19: ' + secTitle + '\n' +
        'import React from "react";\n\n' +
        'export function NavigationBadge({ label, count }: { label: string; count: number }) {\n' +
        '  return (\n' +
        '    <div className="flex items-center gap-2 p-2 bg-slate-900 text-white rounded">\n' +
        '      <span className="font-bold">{label}</span>\n' +
        '      <span className="px-2 py-0.5 bg-sky-500 rounded-md text-xs">{count}</span>\n' +
        '    </div>\n' +
        '  );\n' +
        '}';
    } else if (moduleNum === '02') {
      return '// Core Hooks Lifecycle & State Batching\n' +
        'import { useState, useEffect } from "react";\n\n' +
        'export function MetricsWatcher() {\n' +
        '  const [ticks, setTicks] = useState(0);\n\n' +
        '  useEffect(() => {\n' +
        '    const timer = setInterval(() => setTicks(t => t + 1), 1000);\n' +
        '    return () => clearInterval(timer);\n' +
        '  }, []);\n\n' +
        '  return <div>Active Ticks: {ticks}</div>;\n' +
        '}';
    } else if (moduleNum === '03') {
      return '// React 19 useActionState Form Binding\n' +
        'import { useActionState } from "react";\n\n' +
        'async function submitOrder(previousState: any, formData: FormData) {\n' +
        '  const item = formData.get("item");\n' +
        '  return { status: "success", message: `Ordered: ${item}` };\n' +
        '}\n\n' +
        'export function OrderForm() {\n' +
        '  const [state, formAction, isPending] = useActionState(submitOrder, null);\n' +
        '  return (\n' +
        '    <form action={formAction}>\n' +
        '      <input name="item" defaultValue="Enterprise Cloud License" />\n' +
        '      <button disabled={isPending}>{isPending ? "Submitting..." : "Order"}</button>\n' +
        '    </form>\n' +
        '  );\n' +
        '}';
    } else if (moduleNum === '04') {
      return '// Performance Optimization with useMemo & React.memo\n' +
        'import React, { useMemo } from "react";\n\n' +
        'export const ExpensiveList = React.memo(({ items }: { items: number[] }) => {\n' +
        '  const total = useMemo(() => items.reduce((acc, n) => acc + n, 0), [items]);\n' +
        '  return <div className="font-mono">Aggregated Sum: {total}</div>;\n' +
        '});';
    } else if (moduleNum === '05') {
      return '// Custom Hook with AbortController Cleanup\n' +
        'import { useState, useEffect } from "react";\n\n' +
        'export function useFetchData<T>(url: string) {\n' +
        '  const [data, setData] = useState<T | null>(null);\n\n' +
        '  useEffect(() => {\n' +
        '    const controller = new AbortController();\n' +
        '    fetch(url, { signal: controller.signal })\n' +
        '      .then(res => res.json())\n' +
        '      .then(setData)\n' +
        '      .catch(() => {});\n' +
        '    return () => controller.abort();\n' +
        '  }, [url]);\n\n' +
        '  return data;\n' +
        '}';
    } else if (moduleNum === '06') {
      return '// Finite State Machine with useReducer\n' +
        'type State = { status: "idle" } | { status: "loading" } | { status: "success"; data: string };\n' +
        'type Action = { type: "FETCH" } | { type: "RESOLVE"; payload: string };\n\n' +
        'function fsmReducer(state: State, action: Action): State {\n' +
        '  switch (action.type) {\n' +
        '    case "FETCH": return { status: "loading" };\n' +
        '    case "RESOLVE": return { status: "success", data: action.payload };\n' +
        '    default: return state;\n' +
        '  }\n' +
        '}';
    } else if (moduleNum === '07') {
      return '// React Fiber Concurrency with useTransition\n' +
        'import { useState, useTransition } from "react";\n\n' +
        'export function SearchFilter() {\n' +
        '  const [isPending, startTransition] = useTransition();\n' +
        '  const [query, setQuery] = useState("");\n\n' +
        '  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {\n' +
        '    startTransition(() => {\n' +
        '      setQuery(e.target.value);\n' +
        '    });\n' +
        '  }\n' +
        '  return <input onChange={handleChange} placeholder="Instant responsiveness..." />;\n' +
        '}';
    } else if (moduleNum === '08') {
      return '// React Server Component (RSC)\n' +
        'import { Suspense } from "react";\n\n' +
        'export default async function DashboardPage() {\n' +
        '  return (\n' +
        '    <main>\n' +
        '      <h1>Enterprise Server Dashboard</h1>\n' +
        '      <Suspense fallback={<div>Streaming metrics HTML chunk...</div>}>\n' +
        '        <MetricsServerStream />\n' +
        '      </Suspense>\n' +
        '    </main>\n' +
        '  );\n' +
        '}';
    } else {
      return '// Custom React Reconciler\n' +
        'import ReactReconciler from "react-reconciler";\n\n' +
        'const HostConfig = {\n' +
        '  createInstance(type, props) { return { type, props, children: [] }; },\n' +
        '  appendInitialChild(parent, child) { parent.children.push(child); },\n' +
        '  finalizeInitialChildren() { return false; },\n' +
        '  supportsMutation: true\n' +
        '};\n' +
        'const customRenderer = ReactReconciler(HostConfig);\n' +
        'console.log("Custom reconciler initialized successfully.");';
    }
  }

  if (trackId === 'php') {
    if (moduleNum === '01') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// PHP 8.3 Match Expressions and Nullsafe Operator\n' +
        'function getTierLabel(string $role): string {\n' +
        '    return match($role) {\n' +
        '        "admin" => "System Administrator",\n' +
        '        "dev"   => "Core Engineer",\n' +
        '        default => "Standard User"\n' +
        '    };\n' +
        '}\n\n' +
        '$user = (object)["role" => "dev", "session" => null];\n' +
        'echo "Assigned Tier: " . getTierLabel($user->role) . "\\n";\n' +
        'echo "Session ID: " . ($user->session?->id ?? "ANONYMOUS");';
    } else if (moduleNum === '02') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// Constructor Property Promotion & Readonly Class\n' +
        'readonly class MicroserviceEndpoint {\n' +
        '    public function __construct(\n' +
        '        public string $host,\n' +
        '        public int $port = 8443,\n' +
        '        public array $headers = []\n' +
        '    ) {}\n' +
        '}\n\n' +
        '$ep = new MicroserviceEndpoint("api.internal.cluster", 9000);\n' +
        'echo "Connected to: {$ep->host}:{$ep->port}\\n";';
    } else if (moduleNum === '03') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// Secure PDO Prepared Statements\n' +
        '$dsn = "pgsql:host=localhost;port=5432;dbname=matrix_db;sslmode=require";\n' +
        '$pdo = new PDO($dsn, "db_admin", "vault_secret", [\n' +
        '    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n' +
        '    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC\n' +
        ']);\n\n' +
        '$stmt = $pdo->prepare("SELECT id, username, email FROM users WHERE status = :status");\n' +
        '$stmt->execute(["status" => "active"]);\n' +
        '$users = $stmt->fetchAll();\n' +
        'echo "Hydrated " . count($users) . " active user records.\\n";';
    } else if (moduleNum === '04') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// PSR-7 HTTP Message & Middleware Pipeline\n' +
        'use Psr\\Http\\Message\\ServerRequestInterface;\n' +
        'use Psr\\Http\\Message\\ResponseInterface;\n' +
        'use Psr\\Http\\Server\\MiddlewareInterface;\n' +
        'use Psr\\Http\\Server\\RequestHandlerInterface;\n\n' +
        'class AuthMiddleware implements MiddlewareInterface {\n' +
        '    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface {\n' +
        '        return $handler->handle($request);\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '05') {
      return '// composer.json Optimization\n' +
        '{\n' +
        '    "name": "enterprise/matrix-core",\n' +
        '    "type": "project",\n' +
        '    "require": {\n' +
        '        "php": ">=8.3",\n' +
        '        "psr/http-message": "^1.1",\n' +
        '        "monolog/monolog": "^3.5"\n' +
        '    },\n' +
        '    "autoload": {\n' +
        '        "psr-4": { "Matrix\\\\": "src/" }\n' +
        '    },\n' +
        '    "config": { "optimize-autoloader": true }\n' +
        '}';
    } else if (moduleNum === '06') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// Custom Attribute Routing Engine\n' +
        '#[Attribute(Attribute::TARGET_METHOD)]\n' +
        'class Route {\n' +
        '    public function __construct(public string $path, public string $method = "GET") {}\n' +
        '}\n\n' +
        'class DashboardController {\n' +
        '    #[Route("/api/v1/metrics", method: "GET")]\n' +
        '    public function getMetrics(): array {\n' +
        '        return ["status" => "healthy", "uptime" => 99.99];\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '07') {
      return '// php.ini OPcache & JIT Configuration\n' +
        'opcache.enable=1\n' +
        'opcache.enable_cli=1\n' +
        'opcache.memory_consumption=256\n' +
        'opcache.interned_strings_buffer=16\n' +
        'opcache.max_accelerated_files=20000\n' +
        'opcache.jit=tracing\n' +
        'opcache.jit_buffer_size=128M\n' +
        'opcache.preload=/var/www/preload.php';
    } else if (moduleNum === '08') {
      return '<?php\ndeclare(strict_types=1);\n\n' +
        '// PHP 8.1 Fibers Coroutines\n' +
        '$fiber = new Fiber(function (): void {\n' +
        '    echo "[Fiber] Starting async workload...\\n";\n' +
        '    $val = Fiber::suspend("WAITING_FOR_IO");\n' +
        '    echo "[Fiber] Resumed with data: {$val}\\n";\n' +
        '});\n\n' +
        '$result = $fiber->start();\n' +
        'echo "[Main] Fiber suspended with status: {$result}\\n";\n' +
        '$fiber->resume("PAYLOAD_RECEIVED");';
    } else {
      return '// RoadRunner Application Daemon Bootstrapper\n' +
        'use Spiral\\RoadRunner\\Worker;\n' +
        'use Nyholm\\Psr7\\Factory\\Psr17Factory;\n\n' +
        '$worker = Worker::create();\n' +
        '$factory = new Psr17Factory();\n' +
        'while ($req = $worker->waitRequest()) {\n' +
        '    $res = $factory->createResponse(200)->withBody($factory->createStream("OK"));\n' +
        '    $worker->respond($res);\n' +
        '}';
    }
  }

  if (trackId === 'dotnet') {
    if (moduleNum === '01') {
      return '// .NET 9: ' + secTitle + '\n' +
        'using System;\n\n' +
        'public record struct SystemHealth(string Service, bool IsHealthy, double LatencyMs);\n\n' +
        'var status = new SystemHealth("Kestrel_Gateway", true, 1.45);\n' +
        'var report = status switch {\n' +
        '    { IsHealthy: true, LatencyMs: < 2.0 } => "HEALTHY_OPTIMAL",\n' +
        '    { IsHealthy: true } => "HEALTHY_DEGRADED",\n' +
        '    _ => "CRITICAL_UNAVAILABLE"\n' +
        '};\n' +
        'Console.WriteLine($"Service: {status.Service} | Status: {report}");';
    } else if (moduleNum === '02') {
      return '// ASP.NET Core Host Bootstrap\n' +
        'var builder = WebApplication.CreateBuilder(args);\n\n' +
        '// Native Dependency Injection Lifecycles\n' +
        'builder.Services.AddSingleton<ITelemetryMetrics, OpenTelemetryMetrics>();\n' +
        'builder.Services.AddScoped<IOrderService, OrderProcessingService>();\n' +
        'builder.Services.AddTransient<ITransactionHasher, Sha256Hasher>();\n\n' +
        'var app = builder.Build();\n' +
        'app.MapGet("/health", () => Results.Ok(new { status = "online", clr = Environment.Version.ToString() }));\n' +
        'app.Run();';
    } else if (moduleNum === '03') {
      return '// Minimal APIs with TypedResults\n' +
        'app.MapGet("/api/v1/orders/{id:guid}", async (Guid id, IOrderService service) => {\n' +
        '    var order = await service.GetOrderByIdAsync(id);\n' +
        '    return order is not null \n' +
        '        ? TypedResults.Ok(order) \n' +
        '        : (IResult)TypedResults.NotFound();\n' +
        '})\n' +
        '.WithName("GetOrderById")\n' +
        '.WithOpenApi();';
    } else if (moduleNum === '04') {
      return '// EF Core 9 Query Optimization\n' +
        'using Microsoft.EntityFrameworkCore;\n\n' +
        'var activeUsers = await dbContext.Users\n' +
        '    .AsNoTracking()\n' +
        '    .Where(u => u.IsActive && u.TenantId == tenantId)\n' +
        '    .Select(u => new UserDto(u.Id, u.Email, u.Role))\n' +
        '    .ToListAsync(cancellationToken);';
    } else if (moduleNum === '05') {
      return '// Custom Middleware Pipeline\n' +
        'public class CorrelationMiddleware\n' +
        '{\n' +
        '    private readonly RequestDelegate _next;\n' +
        '    public CorrelationMiddleware(RequestDelegate next) => _next = next;\n\n' +
        '    public async Task InvokeAsync(HttpContext context)\n' +
        '    {\n' +
        '        var correlationId = context.Request.Headers["X-Correlation-ID"].FirstOrDefault() ?? Guid.NewGuid().ToString();\n' +
        '        context.Response.Headers.Append("X-Correlation-ID", correlationId);\n' +
        '        await _next(context);\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '06') {
      return '// Clean Architecture & CQRS with MediatR\n' +
        'public record CreateUserCommand(string Email, string Name) : IRequest<Guid>;\n\n' +
        'public class CreateUserHandler : IRequestHandler<CreateUserCommand, Guid>\n' +
        '{\n' +
        '    public async Task<Guid> Handle(CreateUserCommand cmd, CancellationToken ct)\n' +
        '    {\n' +
        '        var user = User.Create(cmd.Email, cmd.Name);\n' +
        '        return user.Id;\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '07') {
      return '// Zero-Allocation Memory with Span<T>\n' +
        'using System;\n' +
        'using System.Buffers;\n\n' +
        'ReadOnlySpan<char> payload = "AUTH_TOKEN_788912903_VALID".AsSpan();\n' +
        'ReadOnlySpan<char> token = payload.Slice(11, 9);\n\n' +
        'Console.WriteLine($"Zero-copy sliced token: {token.ToString()}");';
    } else if (moduleNum === '08') {
      return '// Kestrel HTTP/3 over QUIC Configuration\n' +
        'builder.WebHost.ConfigureKestrel(serverOptions =>\n' +
        '{\n' +
        '    serverOptions.ListenAnyIP(5001, listenOptions =>\n' +
        '    {\n' +
        '        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;\n' +
        '        listenOptions.UseHttps();\n' +
        '    });\n' +
        '});';
    } else {
      return '// Native AOT Compilation & Generational GC\n' +
        '// Project.csproj: <PublishAot>true</PublishAot>\n' +
        'Console.WriteLine($"GC Total Memory: {GC.GetTotalMemory(false) / 1024} KB");\n' +
        'Console.WriteLine($"Gen 0 Collections: {GC.CollectionCount(0)} | Gen 2: {GC.CollectionCount(2)}");';
    }
  }

  if (trackId === 'dns') {
    if (moduleNum === '01') {
      return ';; DNS Root & Authoritative Delegation Trace\n' +
        ';; dig +trace example.com\n' +
        '.                       518400  IN      NS      a.root-servers.net.\n' +
        'com.                    172800  IN      NS      a.gtld-servers.net.\n' +
        'example.com.            172800  IN      NS      ns1.cloudprovider.net.\n' +
        ';; Received 452 bytes from 198.41.0.4#53(a.root-servers.net) in 12 ms';
    } else if (moduleNum === '02') {
      return ';; Core Resource Records: A, AAAA, CNAME, MX, TXT\n' +
        '$ORIGIN enterprise-matrix.com.\n' +
        '$TTL 3600\n\n' +
        '@       IN      A       192.0.2.1\n' +
        '@       IN      AAAA    2001:db8::1\n' +
        'www     IN      CNAME   @\n' +
        '@       IN      MX      10 mail.enterprise-matrix.com.\n' +
        '@       IN      TXT     "v=spf1 mx ~all"';
    } else if (moduleNum === '03') {
      return ';; TTL Mechanics & SOA Configuration\n' +
        '@       IN      SOA     ns1.matrix.com. admin.matrix.com. (\n' +
        '                        2026100301 ; Serial YYYYMMDDNN\n' +
        '                        7200       ; Refresh (2 hours)\n' +
        '                        3600       ; Retry (1 hour)\n' +
        '                        1209600    ; Expire (2 weeks)\n' +
        '                        300        ; Negative Cache Minimum TTL (5 mins)\n' +
        '                        )';
    } else if (moduleNum === '04') {
      return ';; BGP Anycast Routing & Geo-DNS Policy\n' +
        '; Global Anycast IP: 198.51.100.1 announced from 250+ Edge PoPs\n' +
        '; EDNS Client Subnet (ECS) routes clients to closest regional cluster:\n' +
        '; EU-West clients -> 198.51.100.1 (Frankfurt PoP)\n' +
        '; US-East clients -> 198.51.100.1 (Ashburn PoP)';
    } else if (moduleNum === '05') {
      return ';; Email Authentication: SPF, DKIM & DMARC\n' +
        '@               IN  TXT  "v=spf1 ip4:192.0.2.0/24 include:_spf.google.com ~all"\n' +
        's1._domainkey   IN  TXT  "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBC..."\n' +
        '_dmarc          IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc-reports@matrix.com; pct=100"';
    } else if (moduleNum === '06') {
      return ';; Encrypted DNS over HTTPS (DoH) & TLS 1.3\n' +
        '; Resolver: https://dns.google/dns-query\n' +
        '; Method: POST /dns-query HTTP/2\n' +
        '; Content-Type: application/dns-message\n' +
        '; TLS 1.3 1-RTT Handshake: Cipher TLS_AES_256_GCM_SHA384';
    } else if (moduleNum === '07') {
      return ';; DNSSEC RRSIG and DNSKEY Validation\n' +
        '@       IN      DNSKEY  256 3 13 ( mdsswUyr3DPW132mOi8V9x6... ) ; ZSK\n' +
        '@       IN      DNSKEY  257 3 13 ( oJMRESz5E4gYzS098... )     ; KSK\n' +
        '@       IN      RRSIG   A 13 2 3600 20261101000000 20261001000000 12345 enterprise-matrix.com. ...';
    } else if (moduleNum === '08') {
      return ';; BIND9 named.conf Zone Declaration with TSIG\n' +
        'key "transfer-key" {\n' +
        '    algorithm hmac-sha256;\n' +
        '    secret "K3Y_S3CR3T_TR4NSF3R==";\n' +
        '};\n\n' +
        'zone "matrix.internal" {\n' +
        '    type master;\n' +
        '    file "/etc/bind/zones/db.matrix.internal";\n' +
        '    allow-transfer { key transfer-key; };\n' +
        '};';
    } else {
      return ';; Certificate Authority Authorization (CAA RFC 8659)\n' +
        '@       IN      CAA     0 issue "letsencrypt.org"\n' +
        '@       IN      CAA     0 issuewild "letsencrypt.org"\n' +
        '@       IN      CAA     0 iodef "mailto:security-alerts@matrix.com"';
    }
  }

  if (trackId === 'devops') {
    if (moduleNum === '01') {
      return '# Linux Systemd Service Unit: /etc/systemd/system/matrix-api.service\n' +
        '[Unit]\n' +
        'Description=Matrix Core Backend Microservice\n' +
        'After=network.target\n\n' +
        '[Service]\n' +
        'Type=simple\n' +
        'User=matrixapp\n' +
        'WorkingDirectory=/var/www/matrix\n' +
        'ExecStart=/usr/bin/node dist/server.js\n' +
        'Restart=on-failure\n' +
        'RestartSec=5s\n' +
        'Environment=NODE_ENV=production PORT=3000\n\n' +
        '[Install]\n' +
        'WantedBy=multi-user.target';
    } else if (moduleNum === '02') {
      return '# Nginx Server Block: /etc/nginx/sites-available/matrix.conf\n' +
        'server {\n' +
        '    listen 80;\n' +
        '    server_name matrix.enterprise.com;\n' +
        '    root /var/www/matrix/public;\n' +
        '    index index.html;\n\n' +
        '    location / {\n' +
        '        try_files $uri $uri/ /index.html;\n' +
        '    }\n\n' +
        '    location ~* \\.(js|css|png|jpg|svg|woff2)$ {\n' +
        '        expires 30d;\n' +
        '        add_header Cache-Control "public, no-transform";\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '03') {
      return '# Certbot Automated SSL Let\'s Encrypt Provisioning\n' +
        'certbot --nginx \\\n' +
        '  -d matrix.enterprise.com \\\n' +
        '  --non-interactive \\\n' +
        '  --agree-tos \\\n' +
        '  -m admin@matrix.enterprise.com \\\n' +
        '  --redirect\n\n' +
        '# Systemd Auto-Renewal Timer Verification\n' +
        'systemctl list-timers certbot.timer';
    } else if (moduleNum === '04') {
      return '# Nginx High-Concurrency Reverse Proxy & Leaky Bucket Rate Limiting\n' +
        'limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s;\n\n' +
        'upstream backend_nodes {\n' +
        '    least_conn;\n' +
        '    server 10.0.1.11:8080 max_fails=3 fail_timeout=10s;\n' +
        '    server 10.0.1.12:8080 max_fails=3 fail_timeout=10s;\n' +
        '    keepalive 64;\n' +
        '}\n\n' +
        'server {\n' +
        '    listen 443 ssl http2;\n' +
        '    location /api/ {\n' +
        '        limit_req zone=api_limit burst=10 nodelay;\n' +
        '        proxy_pass http://backend_nodes;\n' +
        '        proxy_set_header Host $host;\n' +
        '        proxy_set_header X-Real-IP $remote_addr;\n' +
        '        proxy_set_header Connection "";\n' +
        '        proxy_http_version 1.1;\n' +
        '    }\n' +
        '}';
    } else if (moduleNum === '05') {
      return '# Multi-Stage Dockerfile Optimization\n' +
        '# Stage 1: Build & Compile\n' +
        'FROM node:20-alpine AS builder\n' +
        'WORKDIR /app\n' +
        'COPY package*.json ./\n' +
        'RUN npm ci\n' +
        'COPY . .\n' +
        'RUN npm run build\n\n' +
        '# Stage 2: Minimal Distroless Production Runtime\n' +
        'FROM gcr.io/distroless/nodejs20-debian12\n' +
        'WORKDIR /app\n' +
        'COPY --from=builder /app/dist ./dist\n' +
        'COPY --from=builder /app/node_modules ./node_modules\n' +
        'USER nonroot\n' +
        'EXPOSE 3000\n' +
        'CMD ["dist/server.js"]';
    } else if (moduleNum === '06') {
      return '# GitHub Actions CI/CD: .github/workflows/deploy.yml\n' +
        'name: Build, Test & Deploy\n' +
        'on:\n' +
        '  push:\n' +
        '    branches: [main]\n\n' +
        'jobs:\n' +
        '  test-and-build:\n' +
        '    runs-on: ubuntu-latest\n' +
        '    steps:\n' +
        '      - uses: actions/checkout@v4\n' +
        '      - uses: actions/setup-node@v4\n' +
        '        with:\n' +
        '          node-version: 20\n' +
        '          cache: "npm"\n' +
        '      - run: npm ci\n' +
        '      - run: npm run test -- --ci\n' +
        '      - run: npm run build';
    } else if (moduleNum === '07') {
      return '# Kernel Socket Performance Tuning: /etc/sysctl.d/99-network.conf\n' +
        'net.core.somaxconn = 65535\n' +
        'net.ipv4.tcp_max_syn_backlog = 16384\n' +
        'net.ipv4.tcp_congestion_control = bbr\n' +
        'net.core.default_qdisc = fq\n' +
        'net.ipv4.ip_local_port_range = 1024 65535\n' +
        'fs.file-max = 2097152';
    } else if (moduleNum === '08') {
      return '# Zero-Downtime Blue/Green Deployment Script\n' +
        '#!/bin/bash\n' +
        'TARGET_PORT=$1 # Switch between 8081 (Blue) and 8082 (Green)\n' +
        'echo "Running healthcheck on port ${TARGET_PORT}..."\n' +
        'curl -f http://127.0.0.1:${TARGET_PORT}/health || exit 1\n\n' +
        '# Reload Nginx upstream with zero dropped connections\n' +
        'sed -i "s/server 127.0.0.1:.*/server 127.0.0.1:${TARGET_PORT};/" /etc/nginx/conf.d/upstream.conf\n' +
        'nginx -s reload\n' +
        'echo "Zero-downtime cutover to port ${TARGET_PORT} completed."';
    } else {
      return '# Prometheus Telemetry & Trivy Container Security\n' +
        'trivy image --severity HIGH,CRITICAL matrix-api:latest\n\n' +
        '# Prometheus Scrape Target: prometheus.yml\n' +
        'scrape_configs:\n' +
        '  - job_name: "matrix_microservices"\n' +
        '    scrape_interval: 5s\n' +
        '    static_configs:\n' +
        '      - targets: ["api-node-1:3000", "api-node-2:3000"]';
    }
  }

  return '// Code execution sample for ' + trackId + ' - Module ' + moduleNum;
}

function getTrackConsoleOutput(trackId, moduleNum, sectionId) {
  if (trackId === 'javascript') {
    return '<span class="text-slate-400 font-bold">&gt; OUTPUT:</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Executing script in sandbox environment...</span><br/><span class="text-slate-700">&gt;&gt; Compilation successful: 0 errors, 0 warnings.</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Console output: [Sandbox execution completed in 14ms]</span>';
  }
  if (trackId === 'typescript') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // tsc --strict --noEmit ts_types.ts</span><br/><span class="text-blue-700 font-bold">&gt;&gt; Running TypeScript 5 TypeChecker &amp; AST validation...</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Compilation successful: 0 type errors, 0 warnings.</span><br/><span class="text-slate-700">&gt;&gt; Emitted bundle: ts_types.js + ts_types.d.ts (Declaration map generated).</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Type checking completed in 18ms.</span>';
  }
  if (trackId === 'react') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // react_fiber_runtime.tsx</span><br/><span class="text-sky-700 font-bold">&gt;&gt; Initializing React 19 Fiber tree &amp; Concurrent Scheduler...</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Root mounted successfully. Fiber work loop executed across Lanes 0b0001.</span><br/><span class="text-slate-700">&gt;&gt; Render phase: 1.8ms | Commit phase: 0.4ms | DOM reconciliation complete.</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Active listeners bound to synthetic event delegation pool.</span>';
  }
  if (trackId === 'php') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // php -d opcache.enable_cli=1 php_backend.php</span><br/><span class="text-indigo-700 font-bold">&gt;&gt; Booting Zend Engine 4.3 + PHP 8.3 OPcache JIT...</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Script executed with strict types: declare(strict_types=1).</span><br/><span class="text-slate-700">&gt;&gt; Output stream flushed: HTTP 200 OK [Content-Type: application/json].</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Peak memory usage: 2.14 MB | Execution time: 6.2ms.</span>';
  }
  if (trackId === 'dotnet') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // dotnet run --configuration Release</span><br/><span class="text-purple-700 font-bold">&gt;&gt; Compiling with Roslyn C# 13 compiler &amp; Native AOT...</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Build succeeded: 0 Warning(s), 0 Error(s).</span><br/><span class="text-slate-700">&gt;&gt; Kestrel Web Server started on https://localhost:5001 [HTTP/3 enabled].</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Zero-allocation Span&lt;T&gt; pipeline benchmark: 0 bytes Gen0/Gen1 GC heap allocated.</span>';
  }
  if (trackId === 'dns') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // dig +trace +dnssec dns_records.zone</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; Initiating recursive iterative lookup from Root [198.41.0.4#53]...</span><br/><span class="text-slate-700">&gt;&gt; TLD authoritative delegation verified: DS key digest match validated.</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; DNSSEC RRSIG cryptographic signature: VALID (Trust anchor confirmed).</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Query time: 14 msec | Status: NOERROR | Answers: 1.</span>';
  }
  if (trackId === 'devops') {
    return '<span class="text-slate-400 font-bold">&gt; RUNNER // nginx -t &amp;&amp; docker compose up -d</span><br/><span class="text-fuchsia-700 font-bold">&gt;&gt; Validating Nginx configuration syntax &amp; upstream pool health...</span><br/><span class="text-emerald-700 font-bold">&gt;&gt; nginx: the configuration file /etc/nginx/nginx.conf syntax is ok.</span><br/><span class="text-slate-700">&gt;&gt; Docker multi-stage container image verified [trivy security scan: 0 critical].</span><br/><span class="text-sky-700 font-semibold">&gt;&gt; Container devops-web-1 Started [HTTP 443 TLS 1.3 active].</span>';
  }
  return '<span class="text-emerald-700 font-bold">&gt;&gt; Sandbox execution completed successfully.</span>';
}

// Exports omitted


  // ═══════════════════════════════════════════════════════════════════
  // 5. APPLICATION STATE & AUDIO SYNTHESIZER
  // ═══════════════════════════════════════════════════════════════════
  let currentActiveTrackId = 'javascript';
  let currentViewMode = 'tabbed'; // 'tabbed' or 'grid'
  let activeSearchQuery = '';
  
  // Track active page for each module (0 for 01-03, 1 for 04-06, 2 for 07-09)
  const trackPages = {
    javascript: 0,
    typescript: 0,
    react: 0,
    php: 0,
    dotnet: 0,
    dns: 0,
    devops: 0
  };

  // Active lesson modal context
  let activeLessonContext = {
    trackId: 'javascript',
    moduleNum: '01',
    sectionId: '1.0'
  };

  // Web Audio Context Synthesizer
  let audioCtx = null;
  let isAudioMuted = false;

  function initAudio() {
    if (!audioCtx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
  }

  function playOsClick(freq, duration) {
    if (typeof freq !== 'number') freq = 750;
    if (typeof duration !== 'number') duration = 0.035;
    if (isAudioMuted) return;
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy quiet fallback
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. GLOBAL WINDOW NAVIGATION & INTERACTIVE MODAL HANDLERS
  // ═══════════════════════════════════════════════════════════════════

  // Switch between curriculum pages (Smoothly scrolls to appropriate module)
  window.switchCurriculumPage = function (targetPage, trackId) {
    const targetModuleNum = ((targetPage || 0) * 3 + 1).toString().padStart(2, '0');
    window.scrollToModule(targetModuleNum);
  };

  // Backward compatibility alias for JSE page switcher
  window.switchJsePage = function (targetPage) {
    window.switchCurriculumPage(targetPage, 'javascript');
  };

  // Retrieve linear flat sequence of all lessons across modules for a track
  function getTrackLessonSequence(trackId) {
    const tid = trackId || currentActiveTrackId;
    const mod = MODULES_DATA.find((m) => m.id === tid) || MODULES_DATA[0];
    if (!mod || !mod.modules) return [];
    const list = [];
    mod.modules.forEach((moduleItem) => {
      (moduleItem.sections || []).forEach((secItem) => {
        list.push({
          trackId: mod.id,
          moduleNum: moduleItem.num,
          moduleTitle: moduleItem.title,
          sectionId: secItem.id,
          sectionTitle: secItem.title
        });
      });
    });
    return list;
  }

  // Smooth scroll to a specific module white panel
  window.scrollToModule = function (moduleNum) {
    playOsClick(750, 0.025);
    const target = document.getElementById('module-panel-' + moduleNum);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    updateActiveSidebarModule(moduleNum);
  };

  function updateActiveSidebarModule(moduleNum) {
    const allLinks = document.querySelectorAll('.sidebar-module-link');
    allLinks.forEach((link) => {
      const num = link.getAttribute('data-sidebar-module');
      if (num === String(moduleNum)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const mobilePills = document.querySelectorAll('.mobile-module-pill');
    mobilePills.forEach((pill) => {
      const num = pill.getAttribute('data-mobile-module');
      if (num === String(moduleNum)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Close / Collapse Inline Lesson Sandbox
  window.closeInlineSandbox = function (moduleNum, sectionId) {
    playOsClick(600, 0.02);
    const container = document.getElementById('inline-sandbox-' + moduleNum + '-' + sectionId);
    if (container) {
      container.classList.add('hidden');
      container.innerHTML = '';
    }
  };

  window.closeAllInlineSandboxes = function () {
    document.querySelectorAll('.inline-lesson-sandbox').forEach((el) => {
      el.classList.add('hidden');
      el.innerHTML = '';
    });
  };

  // Launch Inline Interactive Lesson Sandbox (Replaces Pop-up Modal)
  window.startCurriculumSection = function (moduleNum, sectionId, trackId) {
    playOsClick(840, 0.035);
    const tid = trackId || currentActiveTrackId;
    const mod = MODULES_DATA.find((m) => m.id === tid);
    if (!mod) return;

    const currModule = mod.modules.find((m) => m.num === moduleNum);
    const sec = currModule ? currModule.sections.find((s) => s.id === sectionId) : null;
    if (!sec) return;

    activeLessonContext = { trackId: tid, moduleNum: moduleNum, sectionId: sectionId };
    const theme = TRACK_THEMES[tid] || TRACK_THEMES.javascript;

    // Target container for inline sandbox
    const targetSandbox = document.getElementById('inline-sandbox-' + moduleNum + '-' + sectionId);
    if (!targetSandbox) return;

    // Close any other open sandboxes
    document.querySelectorAll('.inline-lesson-sandbox').forEach((el) => {
      if (el !== targetSandbox) {
        el.classList.add('hidden');
        el.innerHTML = '';
      }
    });

    const sequence = getTrackLessonSequence(tid);
    const currentIdx = sequence.findIndex(
      (item) => String(item.moduleNum) === String(moduleNum) && String(item.sectionId) === String(sectionId)
    );
    const totalLessons = sequence.length;
    const lessonPos = currentIdx >= 0 ? currentIdx + 1 : 1;
    const sampleCode = getTrackCodeSample(tid, moduleNum, sectionId, sec.title);

    targetSandbox.innerHTML = (
      '<div class="rounded-2xl bg-slate-950 p-4 sm:p-6 lg:p-7 border-2 border-slate-800 text-slate-200 font-mono shadow-2xl space-y-4">' +
        '<!-- Terminal Titlebar -->' +
        '<div class="flex items-center justify-between pb-3 border-b border-slate-800 text-xs sm:text-sm font-bold flex-wrap gap-2">' +
          '<div class="flex items-center gap-2 text-slate-200 truncate">' +
            '<i class="fa-solid fa-terminal text-sky-400"></i>' +
            '<span class="font-extrabold text-white">RUNNER // live_interpreter.' + theme.runnerExt + '</span>' +
            '<span class="text-slate-400 text-xs hidden sm:inline">[' + theme.specPrefix + ' // SEC_' + sectionId + ']</span>' +
          '</div>' +
          '<div class="flex items-center gap-2 shrink-0">' +
            '<span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">Lesson ' + lessonPos + ' of ' + totalLessons + '</span>' +
            '<span class="text-emerald-400 font-mono flex items-center gap-1.5 text-xs font-bold">' +
              '<i class="fa-solid fa-bolt text-[10px] animate-pulse"></i> RUNTIME_READY' +
            '</span>' +
          '</div>' +
        '</div>' +

        '<!-- Lesson Objective -->' +
        '<div class="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">' +
          '<span class="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">OBJECTIVE &amp; SYLLABUS:</span>' +
          (sec.summary || 'Interactive sandbox execution and syntax verification.') +
        '</div>' +

        '<!-- Interactive Code Snippet -->' +
        '<div class="relative">' +
          '<pre class="overflow-x-auto text-emerald-300 font-mono text-xs sm:text-sm py-3.5 px-4 bg-slate-900/90 rounded-xl leading-relaxed max-h-[340px] selection:bg-emerald-900 selection:text-white border border-slate-800">' +
            sampleCode +
          '</pre>' +
        '</div>' +

        '<!-- Console Output (Hidden by default, reveals on Execute) -->' +
        '<div id="inline-console-output-' + moduleNum + '-' + sectionId + '" class="hidden p-4 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs sm:text-sm text-slate-100 leading-relaxed shadow-inner"></div>' +

        '<!-- Sandbox Actions Bar -->' +
        '<div class="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">' +
          '<div class="flex items-center gap-2">' +
            '<button type="button" onclick="window.navigateInlineLesson(\'' + moduleNum + '\', \'' + sectionId + '\', -1)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1" title="Previous Lesson">' +
              '<i class="fa-solid fa-arrow-left text-[10px]"></i>' +
              '<span class="hidden sm:inline">Prev</span>' +
            '</button>' +
            '<button type="button" onclick="window.navigateInlineLesson(\'' + moduleNum + '\', \'' + sectionId + '\', 1)" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1" title="Next Lesson">' +
              '<span class="hidden sm:inline">Next</span>' +
              '<i class="fa-solid fa-arrow-right text-[10px]"></i>' +
            '</button>' +
          '</div>' +

          '<div class="flex items-center gap-2">' +
            '<button type="button" onclick="window.runInlineLessonDemo(\'' + moduleNum + '\', \'' + sectionId + '\', \'' + tid + '\')" class="px-4 sm:px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98]">' +
              '<i class="fa-solid fa-play text-xs text-slate-950"></i>' +
              '<span>EXECUTE_SANDBOX</span>' +
            '</button>' +
            '<button type="button" onclick="window.closeInlineSandbox(\'' + moduleNum + '\', \'' + sectionId + '\')" class="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer">' +
              'Close' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    targetSandbox.classList.remove('hidden');

    // Scroll to the active lesson row
    const rowEl = document.getElementById('lesson-row-' + moduleNum + '-' + sectionId);
    if (rowEl) {
      rowEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Traversal across lessons using inline sandboxes
  window.navigateInlineLesson = function (moduleNum, sectionId, direction) {
    const tid = activeLessonContext.trackId || currentActiveTrackId;
    const sequence = getTrackLessonSequence(tid);
    if (!sequence || sequence.length === 0) return;

    let currentIdx = sequence.findIndex(
      (item) => String(item.moduleNum) === String(moduleNum) && String(item.sectionId) === String(sectionId)
    );
    if (currentIdx === -1) currentIdx = 0;

    let nextIdx = currentIdx + direction;
    if (nextIdx < 0) nextIdx = sequence.length - 1;
    if (nextIdx >= sequence.length) nextIdx = 0;

    const nextLesson = sequence[nextIdx];
    window.startCurriculumSection(nextLesson.moduleNum, nextLesson.sectionId, nextLesson.trackId);
  };

  // Execute Code in the Inline Sandbox Console
  window.runInlineLessonDemo = function (moduleNum, sectionId, trackId) {
    playOsClick(980, 0.05);
    const consoleOutput = document.getElementById('inline-console-output-' + moduleNum + '-' + sectionId);
    if (!consoleOutput) return;

    const tid = trackId || activeLessonContext.trackId;
    consoleOutput.classList.remove('hidden');
    consoleOutput.innerHTML = getTrackConsoleOutput(tid, moduleNum, sectionId);
  };

  // Backward compatibility aliases
  window.startJseSection = function (moduleNum, sectionId) {
    window.startCurriculumSection(moduleNum, sectionId, currentActiveTrackId);
  };

  window.runLessonDemo = function () {
    if (activeLessonContext.moduleNum && activeLessonContext.sectionId) {
      window.runInlineLessonDemo(activeLessonContext.moduleNum, activeLessonContext.sectionId, activeLessonContext.trackId);
    }
  };

  window.runJseDemo = function () {
    window.runLessonDemo();
  };

  window.closeLessonModal = function () {
    window.closeAllInlineSandboxes();
    const modal = document.getElementById('jseLessonModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  window.closeJseModal = function () {
    window.closeLessonModal();
  };

  window.navigateModalLesson = function (direction) {
    if (activeLessonContext.moduleNum && activeLessonContext.sectionId) {
      window.navigateInlineLesson(activeLessonContext.moduleNum, activeLessonContext.sectionId, direction);
    }
  };

  // Keyboard navigation: Escape to close inline sandboxes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeAllInlineSandboxes();
    }
  });

  // ═══════════════════════════════════════════════════════════════════
  // 7. RENDERERS: IDE TABS, 3-BLOCK OUTLINE PANELS, AND GRID
  // ═══════════════════════════════════════════════════════════════════

  // Render Horizontal IDE Tab Switcher (Without 01. numbers)
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
        m.modules.some((mod) => mod.title.toLowerCase().includes(q) || mod.sections.some((sec) => sec.title.toLowerCase().includes(q)))
      );
    });

    const tabsHtml = filtered
      .map((mod) => {
        const isActive = currentViewMode === 'tabbed' && mod.id === currentActiveTrackId;
        const theme = TRACK_THEMES[mod.id] || TRACK_THEMES.javascript;
        return (
          '<button type="button" class="os-ide-tab-btn ' + (isActive ? 'active' : '') + '" data-track-id="' + mod.id + '" title="' + mod.title + '" style="--tab-theme-color: ' + theme.primaryHex + '; --tab-theme-dark: ' + theme.darkHex + '; --tab-theme-light: ' + theme.lightBg + '; --tab-theme-border: ' + theme.borderHex + ';">' +
          '<i class="' + mod.icon + ' text-xs"></i>' +
          '<span>' + mod.fileName + '</span>' +
          '</button>'
        );
      })
      .join('');

    const gridBtnHtml = (
      '<button type="button" class="os-ide-tab-btn ' + (currentViewMode === 'grid' ? 'active' : '') + '" id="osMatrixGridTabBtn" title="View All 7 Tracks in Grid" style="--tab-theme-color: #0ea5e9; --tab-theme-dark: #0284c7; --tab-theme-light: #f0f9ff; --tab-theme-border: #7dd3fc;">' +
      '<i class="fa-solid fa-table-cells text-xs text-sky-400"></i>' +
      '<span>matrix_grid.all</span>' +
      '</button>'
    );

    tabsContainer.innerHTML = gridBtnHtml + tabsHtml;

    // Attach Click Events to Tabs
    tabsContainer.querySelectorAll('[data-track-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const trackId = btn.getAttribute('data-track-id');
        currentActiveTrackId = trackId;
        currentViewMode = 'tabbed';
        playOsClick(800, 0.03);
        renderIdeTabs();
        renderMainView();
      });
    });

    const gridBtn = document.getElementById('osMatrixGridTabBtn');
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        currentViewMode = 'grid';
        playOsClick(700, 0.03);
        renderIdeTabs();
        renderMainView();
      });
    }
  }

  // Render the Learning Module as an ENTIRE PAGE in its background theme color
  // with a sticky navigation sidebar and ALL 1–9 modules in crisp white panels
  function renderTrackCurriculumPanel(container, mod) {
    const theme = TRACK_THEMES[mod.id] || TRACK_THEMES.javascript;
    const modules = mod.modules || JSE_MODULES;

    // Mobile quick-jump pill buttons
    const mobilePillsHtml = modules.map((m, idx) => {
      return (
        '<button type="button" onclick="window.scrollToModule(\'' + m.num + '\')" data-mobile-module="' + m.num + '" class="mobile-module-pill px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap bg-white text-slate-800 shadow-xs border border-slate-200 shrink-0 cursor-pointer transition-all hover:bg-slate-900 hover:text-white ' + (idx === 0 ? 'active' : '') + '">' +
          '<span>Mod ' + m.num + '</span>' +
        '</button>'
      );
    }).join('');

    // Sidebar navigation links for all 1-9 modules
    const sidebarLinksHtml = modules.map((m, idx) => {
      return (
        '<button type="button" onclick="window.scrollToModule(\'' + m.num + '\')" data-sidebar-module="' + m.num + '" id="sidebar-nav-btn-' + m.num + '" class="sidebar-module-link w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 group cursor-pointer hover:bg-slate-100 ' + (idx === 0 ? 'active' : '') + '">' +
          '<span class="sidebar-module-num w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-black shrink-0 transition-colors bg-slate-100 text-slate-800 group-hover:bg-slate-200">' +
            m.num +
          '</span>' +
          '<div class="min-w-0 flex-1">' +
            '<div class="font-headline font-bold text-xs sm:text-sm text-slate-900 truncate group-hover:text-slate-950">' +
              (m.shortTitle || m.title) +
            '</div>' +
            '<div class="text-[11px] font-mono text-slate-500">' +
              (m.sections ? m.sections.length : 0) + ' Lessons • ' + (m.code || 'Stage ' + m.num) +
            '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');

    // White Panels for ALL 1–9 Modules
    const modulePanelsHtml = modules.map((m) => {
      const sectionsHtml = (m.sections || []).map((sec, secIdx) => {
        return (
          '<div class="lesson-row-container mb-3" id="lesson-row-' + m.num + '-' + sec.id + '">' +
            '<div class="lesson-card-item p-3 sm:p-4 rounded-xl bg-white border border-white/70 shadow-sm transition-all flex items-center justify-between gap-3 group/item hover:bg-slate-100/80">' +
              '<div class="flex items-center gap-3 min-w-0 flex-1">' +
                '<span class="lesson-badge-num w-7 h-7 rounded-lg bg-slate-200 text-slate-900 font-mono text-xs font-black flex items-center justify-center shrink-0 transition-colors">' +
                  (secIdx + 1) +
                '</span>' +
                '<div class="min-w-0 flex-1">' +
                  '<div class="font-sans text-xs sm:text-sm lg:text-base font-bold text-slate-900 leading-snug break-words" title="' + sec.title + '">' +
                    sec.title +
                  '</div>' +
                  (sec.summary ? '<div class="text-[11px] sm:text-xs text-slate-600 font-sans mt-0.5 line-clamp-2 leading-relaxed">' + sec.summary + '</div>' : '') +
                '</div>' +
              '</div>' +
              '<button type="button" onclick="window.startCurriculumSection(\'' + m.num + '\', \'' + sec.id + '\', \'' + mod.id + '\')" class="start-lesson-btn shrink-0 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-950 text-white font-mono text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98]">' +
                '<span class="btn-text-full">Start Lesson</span>' +
                '<span class="btn-text-short hidden sm:inline">Start</span>' +
                '<i class="fa-solid fa-play text-[8px] text-amber-400"></i>' +
              '</button>' +
            '</div>' +
            '<!-- Inline Interactive Sandbox for this Section (NO POP-UP) -->' +
            '<div id="inline-sandbox-' + m.num + '-' + sec.id + '" class="inline-lesson-sandbox hidden mt-3"></div>' +
          '</div>'
        );
      }).join('');

      return (
        '<div id="module-panel-' + m.num + '" class="module-white-panel module-themed-panel rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border mb-6 sm:mb-8 scroll-mt-20" style="background-color: ' + theme.primaryHex + '; background-image: linear-gradient(145deg, ' + theme.darkHex + ' 0%, ' + theme.primaryHex + ' 55%, ' + theme.darkHex + ' 100%); border-color: ' + theme.darkHex + '; color: ' + theme.textHex + ';">' +
          '<!-- Module Header Strip -->' +
          '<div class="module-themed-divider flex items-center justify-between pb-3 mb-4 border-b flex-wrap gap-2">' +
            '<div class="flex items-center gap-2.5">' +
              '<span class="px-3 py-1 rounded-lg font-mono text-xs font-black" style="background: ' + theme.lightBg + '; color: ' + theme.darkTextHex + '; border: 1.5px solid ' + theme.borderHex + ';">MODULE ' + m.num + '</span>' +
              (m.code ? '<span class="font-mono text-xs font-extrabold opacity-80">' + m.code + '</span>' : '') +
            '</div>' +
            '<span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-white/90 text-slate-800 border border-white/70">' + (m.sections ? m.sections.length : 0) + ' Lessons Outline</span>' +
          '</div>' +

          '<!-- Module Title & Scope -->' +
          '<h3 class="font-headline font-black text-xl sm:text-2xl lg:text-3xl mb-2 leading-snug">' +
            m.title +
          '</h3>' +
          '<p class="text-xs sm:text-sm opacity-90 leading-relaxed font-sans mb-6 font-normal">' +
            m.desc +
          '</p>' +

          '<!-- Curriculum Outline Checklist -->' +
          '<div class="module-themed-divider space-y-2 pt-3 border-t">' +
            '<div class="flex items-center justify-between text-xs font-mono font-extrabold uppercase tracking-wider pb-2">' +
              '<span class="opacity-85">Curriculum Outline (' + (m.sections ? m.sections.length : 0) + ' Lessons)</span>' +
              '<span class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-code text-[11px]"></i> Interactive Sandbox</span>' +
            '</div>' +
            sectionsHtml +
          '</div>' +
        '</div>'
      );
    }).join('');

    container.innerHTML = (
      '<!-- Full Page Themed Learning Module Container in Module Theme Color -->' +
      '<div class="track-page-container w-full p-3 sm:p-6 lg:p-8 shadow-2xl transition-all" style="--track-theme-color: ' + theme.primaryHex + '; --track-theme-text: ' + theme.textHex + '; --track-theme-dark: ' + theme.darkHex + ';">' +
        
        '<!-- Mobile Top Horizontal Pill Switcher -->' +
        '<div class="lg:hidden sticky top-14 z-30 flex items-center gap-2 overflow-x-auto py-2.5 px-3 bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-white/60 mb-5 scrollbar-none">' +
          '<span class="text-xs font-mono font-black text-slate-600 uppercase shrink-0 flex items-center gap-1"><i class="fa-solid fa-compass text-sky-600"></i> Modules:</span>' +
          mobilePillsHtml +
        '</div>' +

        '<!-- 2-Column Responsive Layout: Sidebar on Left & Modules on Right -->' +
        '<div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">' +
          
          '<!-- Sticky Module Navigation Sidebar (Left Column) -->' +
          '<aside class="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-16 z-20 self-start">' +
            '<div class="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 border border-white/80 space-y-4">' +
              '<!-- Sidebar Header -->' +
              '<div class="pb-3 border-b border-slate-200">' +
                '<div class="flex items-center justify-between mb-1.5">' +
                  '<div class="flex items-center gap-2 font-mono text-xs font-bold text-slate-800">' +
                    '<i class="' + mod.icon + ' text-base" style="color: ' + theme.primaryHex + ';"></i>' +
                    '<span class="font-black text-slate-900 truncate">' + mod.fileName + '</span>' +
                  '</div>' +
                  '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-black border shadow-2xs" style="background: ' + theme.primaryHex + '; color: ' + theme.textHex + '; border-color: ' + theme.darkHex + ';">' +
                    mod.trackBadge +
                  '</span>' +
                '</div>' +
                '<div class="text-[11px] font-mono text-slate-500 font-medium flex items-center justify-between">' +
                  '<span>Curriculum Navigator</span>' +
                  '<span class="font-bold text-slate-700">' + modules.length + ' Modules (01–' + modules.length.toString().padStart(2, '0') + ')</span>' +
                '</div>' +
              '</div>' +

              '<!-- Sidebar Navigation Links for All Modules 1-9 -->' +
              '<div class="space-y-1 max-h-[calc(100vh-17rem)] overflow-y-auto pr-1 scrollbar-none">' +
                sidebarLinksHtml +
              '</div>' +

              '<!-- Sidebar Utility Actions -->' +
              '<div class="pt-3 border-t border-slate-200 flex items-center justify-between gap-2 text-xs font-mono">' +
                '<button type="button" onclick="window.scrollTo({ top: 0, behavior: \'smooth\' })" class="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer flex items-center gap-1">' +
                  '<i class="fa-solid fa-arrow-up text-[10px]"></i> Top' +
                '</button>' +
                '<button type="button" onclick="window.openMatrixGrid()" class="px-3 py-1.5 rounded-lg bg-slate-950 text-white font-bold transition-colors cursor-pointer flex items-center gap-1">' +
                  '<i class="fa-solid fa-table-cells text-[10px]"></i> All Tracks' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</aside>' +

          '<!-- Modules Feed in White Panels (Right Column) -->' +
          '<div class="flex-1 min-w-0 w-full space-y-6 sm:space-y-8">' +
            
            '<!-- Track Hero White Panel (Specification & Overview) -->' +
            '<div class="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-white/60 text-slate-900">' +
              '<div class="font-mono text-[11px] sm:text-xs text-slate-600 tracking-wider mb-2.5 flex items-center gap-x-2 gap-y-1 flex-wrap">' +
                '<span class="font-black text-slate-900 whitespace-nowrap">SPEC_ID: ' + mod.specId + '</span>' +
                '<span class="text-slate-300 hidden sm:inline">/</span>' +
                '<span class="font-bold text-slate-800 whitespace-nowrap">TIER: ' + mod.tier.toUpperCase() + '</span>' +
                '<span class="text-slate-300 hidden sm:inline">/</span>' +
                '<span class="font-bold text-slate-800 whitespace-nowrap">DOMAIN: ' + mod.category.toUpperCase() + '</span>' +
                '<span class="text-slate-300 hidden sm:inline">/</span>' +
                '<span class="font-bold text-slate-800 whitespace-nowrap">DURATION: ' + mod.duration + '</span>' +
                '<span class="text-slate-300 hidden sm:inline">/</span>' +
                '<span class="text-slate-950 font-black whitespace-nowrap">' + modules.length + ' MODULES (01–' + modules.length.toString().padStart(2, '0') + ')</span>' +
              '</div>' +
              '<h2 class="font-headline font-black text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight leading-tight mb-3">' +
                mod.title +
              '</h2>' +
              '<p class="font-sans text-xs sm:text-sm sm:text-base text-slate-800 leading-relaxed max-w-5xl font-medium">' +
                mod.summary +
              '</p>' +
            '</div>' +

            '<!-- All Modules 1-9 in Sequential White Panels -->' +
            modulePanelsHtml +

          '</div>' +
        '</div>' +
      '</div>'
    );

    // Setup ScrollSpy to dynamically highlight the current module in the sidebar
    initCurriculumScrollSpy(modules);
  }

  // ScrollSpy observer to highlight active module in sidebar as user scrolls
  let curriculumObserver = null;
  function initCurriculumScrollSpy(modules) {
    if (curriculumObserver) {
      curriculumObserver.disconnect();
    }

    if (!('IntersectionObserver' in window)) return;

    curriculumObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/module-panel-(\d+)/);
            if (match) {
              const moduleNum = match[1];
              updateActiveSidebarModule(moduleNum);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    modules.forEach((m) => {
      const panel = document.getElementById('module-panel-' + m.num);
      if (panel) {
        curriculumObserver.observe(panel);
      }
    });
  }

  // Backward compatibility alias
  function renderJsCurriculumPanel(container, mod) {
    renderTrackCurriculumPanel(container, mod);
  }

  // Render the Active Track in a Crisp White Card (All 7 Tracks follow 3-Block Curriculum Outline)
  function renderActiveTabbedCard() {
    const container = document.getElementById('osMainContentArea');
    if (!container) return;

    const mod = MODULES_DATA.find((m) => m.id === currentActiveTrackId) || MODULES_DATA[0];
    renderTrackCurriculumPanel(container, mod);
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
        m.modules.some((mod) => mod.title.toLowerCase().includes(q) || mod.sections.some((sec) => sec.title.toLowerCase().includes(q)))
      );
    });

    if (filtered.length === 0) {
      container.innerHTML = (
        '<div class="os-white-card p-12 text-center max-w-xl mx-auto border border-slate-200">' +
          '<div class="w-12 h-12 bg-slate-100 text-slate-500 rounded flex items-center justify-center text-xl mx-auto mb-3 border border-slate-300">' +
            '<i class="fa-solid fa-magnifying-glass"></i>' +
          '</div>' +
          '<h3 class="font-mono font-bold text-lg text-slate-900 mb-1">NO_MODULES_FOUND</h3>' +
          '<p class="font-sans text-xs text-slate-600 mb-4">No tracks match your current search query.</p>' +
        '</div>'
      );
      return;
    }

    const cardsHtml = filtered
      .map((mod) => {
        const theme = TRACK_THEMES[mod.id] || TRACK_THEMES.javascript;
        const totalMods = mod.modules ? mod.modules.length : 6;
        const mod1 = mod.modules[0] ? mod.modules[0].shortTitle : 'Stage 1';
        const mod2 = mod.modules[1] ? mod.modules[1].shortTitle : 'Stage 2';

        return (
          '<div class="os-white-card os-grid-track-card flex flex-col justify-between cursor-pointer group hover:shadow-2xl transition-all border-2 overflow-hidden" data-card-track-id="' + mod.id + '" style="--track-theme-color: ' + theme.primaryHex + '; --track-theme-border: ' + theme.borderHex + '; --track-theme-dark: ' + theme.darkHex + '; border-color: ' + theme.borderHex + '; border-top: 6px solid ' + theme.primaryHex + '; box-shadow: 0 4px 20px -2px ' + theme.primaryHex + '25;">' +
            '<!-- Titlebar -->' +
            '<div class="os-window-header py-3 px-4 flex items-center justify-between" style="border-bottom: 2px solid ' + theme.borderHex + '; background: linear-gradient(180deg, #ffffff 0%, ' + theme.lightBg + ' 100%);">' +
              '<div class="font-mono text-xs font-bold flex items-center gap-2">' +
                '<i class="' + mod.icon + ' text-sm" style="color: ' + theme.primaryHex + ';"></i>' +
                '<span class="text-slate-900 font-extrabold">' + mod.fileName + '</span>' +
              '</div>' +
              '<div class="flex items-center gap-2">' +
                '<span class="px-2 py-0.5 rounded text-[10px] font-mono font-black border shadow-2xs" style="background: ' + theme.primaryHex + '; color: ' + theme.textHex + '; border-color: ' + theme.darkHex + ';">' + mod.trackBadge + '</span>' +
                '<span class="font-mono text-[11px] text-slate-700 font-bold">' + mod.duration + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Body -->' +
            '<div class="p-6 flex-1 flex flex-col justify-between space-y-4">' +
              '<div>' +
                '<div class="font-mono text-xs uppercase tracking-wider mb-2 font-black flex items-center gap-1.5" style="color: ' + theme.darkTextHex + ';">' +
                  '<span class="w-2.5 h-2.5 rounded-xs" style="background: ' + theme.primaryHex + ';"></span>' +
                  '<span>' + mod.tier + ' // ' + mod.category.toUpperCase() + '</span>' +
                '</div>' +

                '<h3 class="font-headline font-black text-xl sm:text-2xl text-slate-950 leading-tight group-hover:opacity-90 transition-colors mb-3 tracking-tight">' +
                  mod.title +
                '</h3>' +

                '<p class="font-sans text-sm text-slate-700 leading-relaxed mb-4">' +
                  mod.summary +
                '</p>' +

                '<!-- OUTLINE_BLOCKS: (The Whole Bar Highlights in Track Representative Color) -->' +
                '<div class="py-3 px-3.5 sm:px-4 rounded-xl font-mono text-xs mb-4 space-y-2.5 transition-all shadow-sm" style="background: ' + theme.primaryHex + '; border: 1.5px solid ' + theme.darkHex + '; color: ' + theme.textHex + ';">' +
                  '<div class="flex items-center justify-between font-black">' +
                    '<span class="flex items-center gap-2 text-xs sm:text-sm tracking-wide" style="color: ' + theme.textHex + ';">' +
                      '<i class="fa-solid fa-layer-group text-sm"></i>' +
                      '<span>OUTLINE_BLOCKS:</span>' +
                      '<span class="font-extrabold opacity-95 text-[11px] sm:text-xs">(' + totalMods + ' Mods)</span>' +
                    '</span>' +
                    '<span class="px-2 py-0.5 rounded font-mono font-black text-[11px] shadow-2xs" style="background: ' + (theme.textHex === '#ffffff' ? 'rgba(0,0,0,0.22)' : 'rgba(0,0,0,0.12)') + '; color: ' + theme.textHex + '; border: 1px solid ' + (theme.textHex === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)') + ';">[01–' + totalMods.toString().padStart(2, '0') + ']</span>' +
                  '</div>' +
                  '<div class="flex justify-between text-xs font-bold pt-1.5 border-t" style="border-color: ' + (theme.textHex === '#ffffff' ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.15)') + '; color: ' + theme.textHex + ';">' +
                    '<span>[01–03] ' + mod1 + ', ' + mod2 + ':</span>' +
                    '<span class="font-black">3 Blocks</span>' +
                  '</div>' +
                  '<div class="flex justify-between text-xs font-bold" style="color: ' + theme.textHex + ';">' +
                    '<span>[04–' + totalMods.toString().padStart(2, '0') + '] Advanced &amp; Internals:</span>' +
                    '<span class="font-black">' + (totalMods - 3) + ' Blocks</span>' +
                  '</div>' +
                '</div>' +
              '</div>' +

              '<!-- Action Bar -->' +
              '<div class="pt-4 border-t border-slate-200 flex items-center justify-between">' +
                '<span class="text-xs font-mono font-bold" style="color: ' + theme.darkTextHex + ';">' + totalMods + ' OUTLINE MODULES</span>' +
                '<button type="button" class="font-mono text-xs font-black px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-xs group-hover:scale-105 cursor-pointer" style="background: ' + theme.primaryHex + '; color: ' + theme.textHex + '; border: 1px solid ' + theme.darkHex + ';">' +
                  '<span>INSPECT_OUTLINE &rarr;</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>'
        );
      })
      .join('');

    container.innerHTML = (
      '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">' +
        cardsHtml +
      '</div>'
    );

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

  // Switcher between Single Tab Card and 7-Track Grid
  function renderMainView() {
    if (currentViewMode === 'grid') {
      renderAllCardsGrid();
    } else {
      renderActiveTabbedCard();
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // 8. OS CLOCK & AUDIO SYSTEM INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  function initOsClock() {
    const clockEls = document.querySelectorAll('.os-menu-clock');
    if (!clockEls.length) return;

    function tick() {
      const now = new Date();
      const isCompact = window.innerWidth < 640;
      const options = isCompact
        ? { month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }
        : {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          };
      const formatted = now.toLocaleString('en-US', options);
      clockEls.forEach((el) => {
        el.textContent = formatted;
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  // Global Audio Switcher
  function updateAudioButtons() {
    const btns = document.querySelectorAll('.os-audio-toggle-btn');
    btns.forEach((btn) => {
      btn.innerHTML = isAudioMuted
        ? '<i class="fa-solid fa-volume-xmark text-slate-500"></i>'
        : '<i class="fa-solid fa-volume-high text-sky-400"></i>';
      btn.setAttribute('title', isAudioMuted ? 'OS Audio: Muted' : 'OS Audio: Active');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initOsClock();
    updateAudioButtons();

    document.querySelectorAll('.os-audio-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        isAudioMuted = !isAudioMuted;
        updateAudioButtons();
        if (!isAudioMuted) {
          playOsClick(880, 0.05);
        }
      });
    });

    renderIdeTabs();
    renderMainView();
  });

  // Global Navigation Shortcuts
  window.openMatrixTrack = function (trackId) {
    currentActiveTrackId = trackId;
    currentViewMode = 'tabbed';
    playOsClick(800, 0.03);
    renderIdeTabs();
    renderMainView();
    const anchor = document.getElementById('osIdeTabsContainer');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  window.openMatrixGrid = function () {
    currentViewMode = 'grid';
    playOsClick(700, 0.03);
    renderIdeTabs();
    renderMainView();
    const anchor = document.getElementById('osIdeTabsContainer');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Expose globals for debugging and testing
  window.MODULES_DATA = MODULES_DATA;
  window.TRACK_THEMES = TRACK_THEMES;

})();
