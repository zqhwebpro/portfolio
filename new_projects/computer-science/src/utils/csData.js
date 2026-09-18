/**
 * Computer Science Foundations & Infographic Data
 */

export const CORE_CS_TERMS = [
  {
    id: 'algorithm',
    term: 'Algorithm',
    shortDesc: 'A set of step-by-step instructions to solve a specific problem.',
    badge: 'CORE FOUNDATION',
    badgeClass: 'brutal-badge-cyan',
    color: '#00F0FF',
    paradigm: 'Foundation',
    elaboration: 'An algorithm is an unambiguous, finite sequence of rigorous instructions implemented in hardware or software to perform a calculation, process data, automate reasoning, or solve a defined problem. Every valid algorithm adheres to 5 fundamental criteria: (1) Well-Defined Inputs, (2) Definite Outputs, (3) Definiteness (each step is precise and clear), (4) Finiteness (it must terminate after a finite number of steps), and (5) Effectiveness (operations are feasible in finite time). Algorithms form the computational engine behind cryptography, routing, ranking, artificial intelligence, and graphics.',
    keyProperties: [
      'Finiteness (Halting guarantee)',
      'Deterministic state transitions',
      'Input/Output boundary contract',
      'Hardware-independent computational logic'
    ],
    examples: ['Binary Search', 'Dijkstra\'s Shortest Path', 'PageRank Algorithm', 'RSA Cryptographic Keygen'],
    codeSnippet: `// Algorithm: Euclidean GCD Algorithm (Step-by-step)
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b; // Step-by-step state reduction
    a = temp;
  }
  return a; // Terminating answer
}`
  },
  {
    id: 'data-structure',
    term: 'Data Structure',
    shortDesc: 'A way of organizing data so it can be used efficiently. Common data structures include arrays, linked lists, and binary trees.',
    badge: 'ORGANIZATION & MEMORY',
    badgeClass: 'brutal-badge-mint',
    color: '#00E599',
    paradigm: 'Memory & Architecture',
    elaboration: 'A data structure is a specialized layout format for organizing, storing, processing, and retrieving data in computer memory. Choosing the correct structure balances fundamental time and space trade-offs: (1) Arrays provide O(1) random indexing via contiguous memory calculation but have fixed capacity and O(n) shifts; (2) Linked Lists enable dynamic non-contiguous pointer allocation with O(1) insertions but require O(n) sequential traversal; (3) Binary Search Trees & Heaps organize keys hierarchically for O(log n) ordered partitioning and priority queue scheduling; (4) Hash Tables compute hash indices to achieve average O(1) lookups.',
    keyProperties: [
      'Spatial memory layout (contiguous vs node pointers)',
      'Access vs Insertion/Deletion trade-offs',
      'Cache locality vs dynamic heap fragmentation',
      'Abstraction encapsulation (Abstract Data Types)'
    ],
    examples: ['Contiguous Arrays', 'Singly/Doubly Linked Lists', 'Binary Search Trees (BST)', 'Hash Maps', 'FIFO Queues & LIFO Stacks'],
    codeSnippet: `// Data Structure: Node-based Binary Search Tree
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;  // Left subtree (< value)
    this.right = null; // Right subtree (> value)
  }
}`
  },
  {
    id: 'time-complexity',
    term: 'Time Complexity',
    shortDesc: 'A measure of the amount of time an algorithm takes to run, depending on the amount of data the algorithm is working on.',
    badge: 'PERFORMANCE METRIC',
    badgeClass: 'brutal-badge-yellow',
    color: '#FFE600',
    paradigm: 'Complexity Analysis',
    elaboration: 'Time complexity quantifies the total number of elementary operations (comparisons, assignments, arithmetic cycles) executed by an algorithm as a mathematical function T(n) of the input data volume n. Because physical clock speed varies across CPUs, time complexity evaluates asymptotic algorithmic growth rather than raw seconds. Computer scientists evaluate three key metrics: (1) Best-Case Ω(n) (optimal input scenario), (2) Average-Case Θ(n) (expected statistical distribution), and (3) Worst-Case O(n) (adversarial upper bound guarantee). At scale, moving from O(n²) to O(n log n) reduces runtime from days to milliseconds.',
    keyProperties: [
      'Operation count as a mathematical function T(n)',
      'Independent of specific CPU clock frequencies',
      'Classifies best (Ω), average (Θ), and worst (O) cases',
      'Predicts scaling feasibility for massive datasets'
    ],
    examples: ['O(1) Instant Array Lookup (1.2 ns)', 'O(log n) Binary Search (7 ops for 128 elements)', 'O(n) Linear Scan (1M ops)', 'O(n²) Bubble Sort (1T ops)'],
    codeSnippet: `// Time Complexity: O(n) Linear Iteration
function findMaximum(array) {
  let max = array[0]; // 1 initialization op
  for (let i = 1; i < array.length; i++) { // n - 1 iterations
    if (array[i] > max) max = array[i]; // 1 comparison
  }
  return max; // Total operations = c * n => O(n)
}`
  },
  {
    id: 'space-complexity',
    term: 'Space Complexity',
    shortDesc: 'A measure of the amount of memory an algorithm uses, depending on the amount of data the algorithm is working on.',
    badge: 'MEMORY ALLOCATION',
    badgeClass: 'brutal-badge-red',
    color: '#FF0055',
    paradigm: 'Complexity Analysis',
    elaboration: 'Space complexity measures the total amount of RAM and storage memory required by an algorithm to execute to completion, expressed as a function S(n) of the input size n. Total space consists of two parts: (1) Input Space (the memory occupied by the initial parameters), and (2) Auxiliary Space (the extra temporary memory allocated by variables, dynamic data structures, buffers, and function execution stack frames). Algorithms that modify data directly in place operate in O(1) auxiliary space, whereas divide-and-conquer or recursive routines often consume O(n) or O(log n) stack space.',
    keyProperties: [
      'Auxiliary memory vs input storage footprint',
      'Call Stack depth during recursive cascades',
      'Heap allocations for temporary buffers',
      'In-place mutability vs pure functional copying'
    ],
    examples: ['O(1) In-Place Insertion Sort', 'O(log n) QuickSort recursion stack depth', 'O(n) Merge Sort auxiliary merge array', 'O(n²) Distance matrix for graph Floyd-Warshall'],
    codeSnippet: `// Space Complexity: O(n) Auxiliary Buffer Allocation
function duplicateArray(arr) {
  const clone = new Array(arr.length); // Allocates n elements on Heap
  for (let i = 0; i < arr.length; i++) clone[i] = arr[i];
  return clone; // Total auxiliary memory = O(n)
}`
  },
  {
    id: 'big-o-notation',
    term: 'Big O Notation',
    shortDesc: 'A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. Used in this tutorial to describe the time complexity of an algorithm.',
    badge: 'ASYMPTOTIC CALCULUS',
    badgeClass: 'brutal-badge-blue',
    color: '#0038FF',
    paradigm: 'Asymptotic Theory',
    elaboration: 'Big O notation (O) is the standard formal mathematical language used in computer science to classify algorithms according to their worst-case asymptotic upper bound. Formally, f(n) = O(g(n)) if there exist positive constants c > 0 and n₀ > 0 such that 0 ≤ f(n) ≤ c · g(n) for all n ≥ n₀. In asymptotic analysis, we discard constant coefficients (e.g. 5n → n) and drop lower-order terms (e.g. 3n² + 100n → O(n²)) because as n → ∞, the dominant term dictates scaling behavior. Big O allows engineers to compare algorithms objectively regardless of hardware, compiler, or programming language.',
    keyProperties: [
      'Formal asymptotic upper bound: f(n) <= c * g(n)',
      'Drops constant multipliers (O(3n) = O(n))',
      'Ignores lower-order terms as n -> infinity',
      'Standardized universal benchmark for software scalability'
    ],
    examples: ['O(1) Constant', 'O(log n) Logarithmic', 'O(n) Linear', 'O(n log n) Linearithmic', 'O(n²) Quadratic', 'O(2ⁿ) Exponential'],
    codeSnippet: `// Big O Analysis: f(n) = 3n² + 50n + 1000
// As n -> ∞, the n² term completely dominates:
// lim (3n² + 50n + 1000) / n² = 3 (Finite Constant)
// Therefore, Time Complexity is formally classified as O(n²)`
  },
  {
    id: 'recursion',
    term: 'Recursion',
    shortDesc: 'A programming technique where a function calls itself.',
    badge: 'CALL STACK TECHNIQUE',
    badgeClass: 'brutal-badge-purple',
    color: '#7928CA',
    paradigm: 'Algorithmic Paradigm',
    elaboration: 'Recursion is an elegant computational strategy where a function solves a problem by calling one or more instances of itself with smaller, simpler inputs. Every valid recursive algorithm must satisfy two strict rules: (1) The Base Case: A direct conditional check that terminates recursion and returns an explicit value without making any further self-calls (preventing infinite loops and stack overflow); (2) The Recursive Step: An invocation of the function on a strictly reduced subset of data that moves progressively closer to the base case. Internally, each recursive call pushes an execution frame onto the CPU Call Stack storing local variables and return addresses until unwinding.',
    keyProperties: [
      'Self-referential function invocation',
      'Mandatory Base Case (prevents Stack Overflow)',
      'LIFO Call Stack memory frame allocation',
      'Natural fit for hierarchical trees, graphs, and fractals'
    ],
    examples: ['Factorial computation (n!)', 'Towers of Hanoi disk transfers', 'Tree Depth-First Traversal', 'Fibonacci sequence generation'],
    codeSnippet: `// Recursion: Base Case + Recursive Self-Call
function factorial(n) {
  if (n <= 1) return 1; // 1. Base Case: stops recursion
  return n * factorial(n - 1); // 2. Recursive Step: calls itself with (n-1)
}`
  },
  {
    id: 'divide-and-conquer',
    term: 'Divide and Conquer',
    shortDesc: 'A method of solving complex problems by breaking them into smaller, more manageable sub-problems, solving the sub-problems, and combining the solutions. Recursion is often used when using this method in an algorithm.',
    badge: 'ALGORITHMIC PARADIGM',
    badgeClass: 'brutal-badge-red',
    color: '#FF2A00',
    paradigm: 'Algorithmic Paradigm',
    elaboration: 'Divide and Conquer is a powerful top-down algorithmic design paradigm that recursively breaks a complex problem into smaller, non-overlapping sub-problems until they become trivial enough to solve directly. The paradigm operates in 3 distinct phases: (1) DIVIDE: Partition the current dataset into two or more smaller sub-problems; (2) CONQUER: Solve the sub-problems recursively (if sub-problem size is small enough, solve as a base case); (3) COMBINE: Merge the resolved sub-solutions into the unified master answer. This paradigm powers the fastest sorting algorithms (Merge Sort, Quick Sort), logarithmic search (Binary Search), and fast matrix multiplication (Strassen).',
    keyProperties: [
      '3-Phase Pattern: Divide -> Conquer -> Combine',
      'Transforms O(n²) quadratic operations into O(n log n)',
      'Heavy reliance on recursive tree sub-division',
      'Master Theorem for recurrence analysis: T(n) = aT(n/b) + f(n)'
    ],
    examples: ['Merge Sort (Divide array in half, sort halves, merge in O(n))', 'Binary Search (Halve search range at each step)', 'Quick Sort (Partition around pivot, sort partitions)', 'Karatsuba Fast Multiplication'],
    codeSnippet: `// Divide & Conquer: Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr; // Base case
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));  // 1. Divide & Conquer Left
  const right = mergeSort(arr.slice(mid));    // 2. Divide & Conquer Right
  return merge(left, right);                  // 3. Combine sub-solutions
}`
  },
  {
    id: 'brute-force',
    term: 'Brute Force',
    shortDesc: 'A simple and straight forward way an algorithm can work by simply trying all possible solutions and then choosing the best one.',
    badge: 'EXHAUSTIVE SEARCH',
    badgeClass: 'brutal-badge-orange',
    color: '#FF6B00',
    paradigm: 'Algorithmic Paradigm',
    elaboration: 'Brute Force is the most straightforward, intuitive problem-solving strategy that systematically enumerates and evaluates every single possible candidate solution in the search space to find the optimal or valid answer. While simple to implement and guaranteed to find a solution if one exists, brute force algorithms rarely utilize domain heuristics or mathematical shortcuts. Consequently, their time complexity often explodes combinatorially: evaluating all pairs (O(n²)), all subsets (O(2ⁿ)), or all permutations (O(n!)). In computer science, brute force provides an essential correctness baseline before developing optimized divide-and-conquer, greedy, or dynamic programming algorithms.',
    keyProperties: [
      'Exhaustive, systematic search over all candidate states',
      'Guaranteed correctness and completeness if search space is finite',
      'No mathematical shortcuts, pruning, or domain heuristics',
      'Serves as baseline benchmark against advanced algorithms'
    ],
    examples: ['Linear Search (Checking every element index 0 to n-1)', 'Naive String Matching (Testing pattern at every character offset)', 'Exhaustive Traveling Salesperson (Testing all (n-1)! routes)', 'Password Cracking (Iterating through all character combinations)'],
    codeSnippet: `// Brute Force: Exhaustive Linear Search
function bruteForceSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // Tries every single index one by one
  }
  return -1; // Scanned entire dataset exhaustively
}`
  }
];

export const BIG_O_CURVES = [
  {
    id: 'o1',
    name: 'O(1) - Constant',
    formula: 'f(n) = 1',
    color: '#00E599',
    badgeClass: 'pill-mint',
    fn: (n) => 1,
    desc: 'Execution time remains identical regardless of input scale.',
    examples: ['Array index access', 'Hash Map lookup (avg)', 'Push/Pop on Stack', 'Bitwise operations'],
    tier: 'EXCELLENT',
    hardwareTime: (n) => '1.2 ns'
  },
  {
    id: 'ologn',
    name: 'O(log n) - Logarithmic',
    formula: 'f(n) = \\log_2(n)',
    color: '#00F0FF',
    badgeClass: 'pill-blue',
    fn: (n) => Math.max(1, Math.log2(n)),
    desc: 'Each step cuts the remaining search universe by half.',
    examples: ['Binary Search in sorted array', 'BST Search', 'Divide & Conquer balance', 'Fast Exponentiation'],
    tier: 'GOOD',
    hardwareTime: (n) => `${(Math.log2(n) * 1.5).toFixed(1)} ns`
  },
  {
    id: 'on',
    name: 'O(n) - Linear',
    formula: 'f(n) = n',
    color: '#FFE600',
    badgeClass: 'pill-yellow',
    fn: (n) => n,
    desc: 'Operations grow in direct, 1-to-1 linear proportion to data volume.',
    examples: ['Linear Search', 'Array Traversals', 'Finding Max/Min', 'Counting Elements'],
    tier: 'FAIR',
    hardwareTime: (n) => `${(n * 2).toFixed(1)} ns`
  },
  {
    id: 'onlogn',
    name: 'O(n log n) - Linearithmic',
    formula: 'f(n) = n \\log_2(n)',
    color: '#0038FF',
    badgeClass: 'pill-blue',
    fn: (n) => Math.max(1, n * Math.log2(n)),
    desc: 'Optimal comparison sorting bound. Subdivides in log(n) depth, processing n elements each.',
    examples: ['Merge Sort', 'Quick Sort (avg)', 'Heap Sort', 'Fast Fourier Transform (FFT)'],
    tier: 'ACCEPTABLE',
    hardwareTime: (n) => `${((n * Math.log2(n) * 2) / 1000).toFixed(2)} µs`
  },
  {
    id: 'on2',
    name: 'O(n²) - Quadratic',
    formula: 'f(n) = n^2',
    color: '#FF2A00',
    badgeClass: 'pill-red',
    fn: (n) => Math.pow(n, 2),
    desc: 'Nested iteration over the input. Cost squares as dataset doubles.',
    examples: ['Bubble Sort', 'Selection Sort', 'Comparing all pairs', 'Naive Matrix Multiply'],
    tier: 'HORRIBLE',
    hardwareTime: (n) => {
      const ms = (Math.pow(n, 2) * 2) / 1e6;
      return ms < 1000 ? `${ms.toFixed(2)} ms` : `${(ms / 1000).toFixed(2)} s`;
    }
  },
  {
    id: 'o2n',
    name: 'O(2ⁿ) - Exponential',
    formula: 'f(n) = 2^n',
    color: '#7928CA',
    badgeClass: 'pill-red',
    fn: (n) => Math.pow(2, Math.min(n, 25)),
    desc: 'Growth doubles with every single added element. Catastrophic for large inputs.',
    examples: ['Recursive Fibonacci (naive)', 'Power set generation', 'Towers of Hanoi', 'Traveling Salesperson (brute force)'],
    tier: 'CATASTROPHIC',
    hardwareTime: (n) => {
      if (n <= 10) return `${(Math.pow(2, n) * 0.002).toFixed(2)} µs`;
      if (n <= 20) return `${(Math.pow(2, n) * 0.002 / 1000).toFixed(2)} ms`;
      if (n <= 30) return `${((Math.pow(2, n) * 0.002) / 1e6).toFixed(1)} s`;
      if (n <= 40) return `~ 35.7 minutes`;
      if (n <= 50) return `~ 71.3 years`;
      return `> Universe Lifetime`;
    }
  }
];

export const RECURSION_MODES = [
  {
    id: 'factorial',
    title: 'Factorial (n!)',
    complexity: 'O(n) time, O(n) stack',
    defaultN: 5,
    maxN: 7,
    description: 'Calculates the product of all positive integers less than or equal to n. Demonstrates classic linear recursion.',
    code: [
      { line: 1, text: 'function factorial(n) {' },
      { line: 2, text: '  if (n <= 1) return 1; // Base case' },
      { line: 3, text: '  const next = factorial(n - 1);' },
      { line: 4, text: '  return n * next; // Unwind' },
      { line: 5, text: '}' }
    ],
    generateSteps: (n) => {
      const steps = [];
      let stack = [];
      let frameId = 0;

      function solve(curr) {
        frameId++;
        const currentFrame = { id: frameId, name: `factorial(${curr})`, n: curr, value: '?', status: 'push' };
        stack.push(currentFrame);
        steps.push({
          action: `Call factorial(${curr})`,
          highlightLine: curr <= 1 ? 2 : 3,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...currentFrame },
          phase: 'call',
          returnVal: null,
          narration: curr <= 1 
            ? `Hit Base Case: n = ${curr} <= 1. Returning 1 immediately.`
            : `Recursive Case: n = ${curr} > 1. Needs result of factorial(${curr - 1}).`
        });

        if (curr <= 1) {
          const ret = 1;
          currentFrame.value = ret;
          currentFrame.status = 'pop';
          steps.push({
            action: `Return 1 from factorial(1)`,
            highlightLine: 2,
            stack: JSON.parse(JSON.stringify(stack)),
            currentFrame: { ...currentFrame },
            phase: 'return',
            returnVal: 1,
            narration: `Base case returns 1. Beginning Call Stack unwinding.`
          });
          stack.pop();
          return ret;
        }

        const sub = solve(curr - 1);
        const result = curr * sub;
        currentFrame.value = result;
        currentFrame.status = 'pop';
        steps.push({
          action: `Unwind: ${curr} * factorial(${curr - 1}) = ${result}`,
          highlightLine: 4,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...currentFrame },
          phase: 'return',
          returnVal: result,
          narration: `Multiplied ${curr} × ${sub} = ${result}. Popping frame from stack.`
        });
        stack.pop();
        return result;
      }

      solve(n);
      return steps;
    }
  }
];

export const CS_KNOWLEDGE_MATRIX = [
  {
    structure: 'Array (Contiguous)',
    access: 'O(1)',
    search: 'O(n) [O(log n) sorted]',
    insert: 'O(n) [O(1) at end]',
    delete: 'O(n) [O(1) at end]',
    space: 'O(n)',
    color: '#0038FF',
    note: 'Contiguous memory layout; supreme cache line locality and instant O(1) index calculation.'
  },
  {
    structure: 'Linked List (Singly/Doubly)',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(1) [at head/pointer]',
    delete: 'O(1) [at head/pointer]',
    space: 'O(n)',
    color: '#FF2A00',
    note: 'Non-contiguous node pointers; constant time insertion/deletion at known nodes.'
  },
  {
    structure: 'Binary Search Tree',
    access: 'O(log n) avg',
    search: 'O(log n) avg',
    insert: 'O(log n) avg',
    delete: 'O(log n) avg',
    space: 'O(n)',
    color: '#00E599',
    note: 'Degenerates into O(n) linked list if unbalanced. Red-Black or AVL fixes this.'
  },
  {
    structure: 'Binary Heap / PQ',
    access: 'O(1) [peek min]',
    search: 'O(n)',
    insert: 'O(log n)',
    delete: 'O(log n) [extract]',
    space: 'O(n)',
    color: '#7928CA',
    note: 'Complete binary tree array representation; perfect for Dijkstra & scheduler queues.'
  },
  {
    structure: 'Graph (Adj. List)',
    access: 'N/A',
    search: 'O(V + E)',
    insert: 'O(1)',
    delete: 'O(E)',
    space: 'O(V + E)',
    color: '#00F0FF',
    note: 'Vertex-edge relationships; optimal representation for sparse network topologies.'
  }
];
