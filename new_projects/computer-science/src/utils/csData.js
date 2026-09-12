/**
 * Computer Science Foundations & Infographic Data
 */

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
          memoryBytes: stack.length * 64
        });

        if (curr <= 1) {
          currentFrame.value = 1;
          steps.push({
            action: `Base Case reached: factorial(1) = 1`,
            highlightLine: 2,
            stack: JSON.parse(JSON.stringify(stack)),
            currentFrame: { ...currentFrame },
            phase: 'base',
            returnVal: 1,
            memoryBytes: stack.length * 64
          });
          const popped = stack.pop();
          popped.value = 1;
          steps.push({
            action: `Popping factorial(1) -> returns 1`,
            highlightLine: 4,
            stack: JSON.parse(JSON.stringify(stack)),
            currentFrame: { ...popped },
            phase: 'return',
            returnVal: 1,
            memoryBytes: stack.length * 64
          });
          return 1;
        }

        const subRes = solve(curr - 1);
        const result = curr * subRes;
        const top = stack[stack.length - 1];
        top.value = result;

        steps.push({
          action: `Unwinding: ${curr} * factorial(${curr - 1}) = ${curr} * ${subRes} = ${result}`,
          highlightLine: 4,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...top },
          phase: 'return',
          returnVal: result,
          memoryBytes: stack.length * 64
        });

        stack.pop();
        return result;
      }

      solve(n);
      return steps;
    }
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci F(n)',
    complexity: 'O(2ⁿ) time, O(n) stack',
    defaultN: 4,
    maxN: 5,
    description: 'Tree recursion: each call branches into two sub-calls, demonstrating branching call towers.',
    code: [
      { line: 1, text: 'function fib(n) {' },
      { line: 2, text: '  if (n <= 1) return n;' },
      { line: 3, text: '  const a = fib(n - 1);' },
      { line: 4, text: '  const b = fib(n - 2);' },
      { line: 5, text: '  return a + b;' },
      { line: 6, text: '}' }
    ],
    generateSteps: (n) => {
      const steps = [];
      let stack = [];
      let frameId = 0;

      function solveFib(curr) {
        frameId++;
        const frame = { id: frameId, name: `fib(${curr})`, n: curr, value: '?', status: 'push' };
        stack.push(frame);

        steps.push({
          action: `Invoking fib(${curr})`,
          highlightLine: curr <= 1 ? 2 : 3,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...frame },
          phase: 'call',
          returnVal: null,
          memoryBytes: stack.length * 64
        });

        if (curr <= 1) {
          steps.push({
            action: `Base Case: fib(${curr}) returns ${curr}`,
            highlightLine: 2,
            stack: JSON.parse(JSON.stringify(stack)),
            currentFrame: { ...frame, value: curr },
            phase: 'base',
            returnVal: curr,
            memoryBytes: stack.length * 64
          });
          stack.pop();
          return curr;
        }

        const left = solveFib(curr - 1);
        steps.push({
          action: `Left branch fib(${curr-1}) returned ${left}. Calling right branch fib(${curr-2}).`,
          highlightLine: 4,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...frame, leftRes: left },
          phase: 'call',
          returnVal: null,
          memoryBytes: stack.length * 64
        });

        const right = solveFib(curr - 2);
        const total = left + right;

        steps.push({
          action: `Combining: fib(${curr-1}) [${left}] + fib(${curr-2}) [${right}] = ${total}`,
          highlightLine: 5,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...frame, value: total },
          phase: 'return',
          returnVal: total,
          memoryBytes: stack.length * 64
        });

        stack.pop();
        return total;
      }

      solveFib(n);
      return steps;
    }
  },
  {
    id: 'reverse',
    title: 'Recursive Array Reverse',
    complexity: 'O(n) time, O(n) stack',
    defaultN: 4,
    maxN: 5,
    description: 'Demonstrates stack LIFO (Last-In-First-Out) natural reversal mechanism.',
    code: [
      { line: 1, text: 'function reverseList([head, ...tail]) {' },
      { line: 2, text: '  if (!head) return [];' },
      { line: 3, text: '  const rest = reverseList(tail);' },
      { line: 4, text: '  return [...rest, head];' },
      { line: 5, text: '}' }
    ],
    generateSteps: (n) => {
      const letters = ['α', 'β', 'γ', 'δ', 'ε', 'ζ'].slice(0, n);
      const steps = [];
      let stack = [];
      let frameId = 0;

      function solveRev(arr) {
        frameId++;
        const frame = { id: frameId, name: `rev([${arr.join(',')}])`, head: arr[0] || '∅', status: 'push' };
        stack.push(frame);

        steps.push({
          action: arr.length === 0 ? `Empty array base case []` : `Push frame: head = '${arr[0]}'`,
          highlightLine: arr.length === 0 ? 2 : 3,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...frame },
          phase: arr.length === 0 ? 'base' : 'call',
          returnVal: arr.length === 0 ? [] : null,
          memoryBytes: stack.length * 64
        });

        if (arr.length === 0) {
          stack.pop();
          return [];
        }

        const head = arr[0];
        const tail = arr.slice(1);
        const sub = solveRev(tail);
        const result = [...sub, head];

        steps.push({
          action: `Popping: prepend [${sub.join(',')}] with head '${head}' -> [${result.join(',')}]`,
          highlightLine: 4,
          stack: JSON.parse(JSON.stringify(stack)),
          currentFrame: { ...frame, value: result },
          phase: 'return',
          returnVal: result,
          memoryBytes: stack.length * 64
        });

        stack.pop();
        return result;
      }

      solveRev(letters);
      return steps;
    }
  }
];

export const TREE_DATA = {
  nodes: [
    { id: '1', label: '1', level: 0, x: 300, y: 50, color: '#0038FF', type: 'circle' },
    { id: '2', label: '2', level: 1, x: 160, y: 140, color: '#FFE600', type: 'square' },
    { id: '3', label: '3', level: 1, x: 440, y: 140, color: '#FF2A00', type: 'triangle' },
    { id: '4', label: '4', level: 2, x: 90,  y: 240, color: '#00E599', type: 'diamond' },
    { id: '5', label: '5', level: 2, x: 230, y: 240, color: '#00F0FF', type: 'circle' },
    { id: '6', label: '6', level: 2, x: 370, y: 240, color: '#7928CA', type: 'square' },
    { id: '7', label: '7', level: 2, x: 510, y: 240, color: '#FFE600', type: 'triangle' },
    { id: '8', label: '8', level: 3, x: 50,  y: 330, color: '#FF2A00', type: 'circle' },
    { id: '9', label: '9', level: 3, x: 130, y: 330, color: '#0038FF', type: 'square' }
  ],
  edges: [
    { from: '1', to: '2', id: 'e1-2' },
    { from: '1', to: '3', id: 'e1-3' },
    { from: '2', to: '4', id: 'e2-4' },
    { from: '2', to: '5', id: 'e2-5' },
    { from: '3', to: '6', id: 'e3-6' },
    { from: '3', to: '7', id: 'e3-7' },
    { from: '4', to: '8', id: 'e4-8' },
    { from: '4', to: '9', id: 'e4-9' }
  ],
  adjList: {
    '1': ['2', '3'],
    '2': ['4', '5'],
    '3': ['6', '7'],
    '4': ['8', '9'],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': []
  }
};

export const CS_KNOWLEDGE_MATRIX = [
  {
    structure: 'Array / Vector',
    access: 'O(1)',
    search: 'O(n)',
    insert: 'O(n)',
    delete: 'O(n)',
    space: 'O(n)',
    color: '#0038FF',
    note: 'Contiguous memory cache locality; instant indexed lookup.'
  },
  {
    structure: 'Hash Table / Map',
    access: 'N/A',
    search: 'O(1) avg',
    insert: 'O(1) avg',
    delete: 'O(1) avg',
    space: 'O(n)',
    color: '#FFE600',
    note: 'Key-value mapping via hash function; worst case O(n) on hash collision.'
  },
  {
    structure: 'Singly Linked List',
    access: 'O(n)',
    search: 'O(n)',
    insert: 'O(1) [head]',
    delete: 'O(1) [head]',
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

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the worst-case time complexity of standard Binary Search on an array of length N?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correct: 1,
    explanation: 'Binary Search divides the remaining search interval in half at each step, yielding logarithmic time O(log N).'
  },
  {
    id: 2,
    question: 'Which data structure does Breadth-First Search (BFS) natively use to order node visits?',
    options: ['LIFO Stack', 'FIFO Queue', 'Min-Heap', 'Hash Table'],
    correct: 1,
    explanation: 'BFS explores neighbors level-by-level using a First-In-First-Out (FIFO) Queue.'
  },
  {
    id: 3,
    question: 'If a recursive function makes two calls per step without memoization (like naive Fibonacci), what is its time complexity?',
    options: ['O(N²)', 'O(2ⁿ)', 'O(N log N)', 'O(N!)'],
    correct: 1,
    explanation: 'Each call spawns 2 children, forming a binary recursion tree of depth N, containing 2⁰ + 2¹ + ... + 2ⁿ ≈ 2ⁿ⁺¹ operations = O(2ⁿ).'
  },
  {
    id: 4,
    question: 'Why is QuickSort average-case O(N log N) but worst-case O(N²)?',
    options: [
      'Because recursion depth is limited by RAM',
      'When pivots partition arrays into 1 and N-1 elements',
      'Due to hardware branch mispredictions',
      'Because comparing integers takes non-constant time'
    ],
    correct: 1,
    explanation: 'If unbalanced pivots (e.g. smallest or largest element) are chosen on an already sorted list, the tree depth degrades to N, costing N × N = O(N²).'
  }
];
