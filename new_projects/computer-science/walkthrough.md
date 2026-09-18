# Walkthrough — Computer Science 8-Concept Interactive Slide Deck

## Summary of Changes in `/computer-science/`

We created and integrated a premier **Interactive Slide Presentation System** (`ConceptSlideDeck.jsx`) structured explicitly around the 8 foundational computer science concepts requested:

### The 8 Canonical Concept Slides
1. **Slide 1: Algorithm**
   - **Definition**: *"A set of step-by-step instructions to solve a specific problem."*
   - **Interactive Simulator**: Step-by-Step State Transition Machine for the Euclidean GCD Algorithm with register stepping (`Step 1` &rarr; `Step 2` &rarr; `Step 3` &rarr; `Step 4` &rarr; `Terminating GCD = 6`).
   - **Properties & Code**: Finiteness, Deterministic state reduction, and clean JavaScript/C# code implementation.

2. **Slide 2: Data Structure**
   - **Definition**: *"A way of organizing data so it can be used efficiently. Common data structures include arrays, linked lists, and binary trees."*
   - **Interactive Simulator**: Live Memory Layout Switcher contrasting (1) Contiguous Indexed Arrays ($O(1)$ random access), (2) Heap Pointer Linked Lists ($O(1)$ dynamic insertion), and (3) Hierarchical Binary Search Trees ($O(\log n)$ ordered partitioning).

3. **Slide 3: Time Complexity**
   - **Definition**: *"A measure of the amount of time an algorithm takes to run, depending on the amount of data the algorithm is working on."*
   - **Interactive Simulator**: Dynamic Input Size Slider ($n = 10 \dots 100,000$) computing and comparing operations across $O(1)$, $O(\log n)$, $O(n)$, and $O(n^2)$.

4. **Slide 4: Space Complexity**
   - **Definition**: *"A measure of the amount of memory an algorithm uses, depending on the amount of data the algorithm is working on."*
   - **Interactive Simulator**: Memory Allocation Inspector contrasting In-Place $O(1)$ register mutations against Auxiliary Heap buffer $O(n)$ allocations.

5. **Slide 5: Big O Notation**
   - **Definition**: *"A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. Used in this tutorial to describe the time complexity of an algorithm."*
   - **Interactive Simulator**: Interactive Asymptotic Curve Explorer with tier classifications (Constant &rarr; Logarithmic &rarr; Linear &rarr; Linearithmic &rarr; Quadratic &rarr; Exponential).

6. **Slide 6: Recursion**
   - **Definition**: *"A programming technique where a function calls itself."*
   - **Interactive Simulator**: LIFO Call Stack Stepper (`factorial(4)`) pushing stack frames, detecting the Base Case (`n <= 1`), and unwinding execution return values ($4 \times 3 \times 2 \times 1 = 24$).

7. **Slide 7: Divide and Conquer**
   - **Definition**: *"A method of solving complex problems by breaking them into smaller, more manageable sub-problems, solving the sub-problems, and combining the solutions. Recursion is often used when using this method in an algorithm."*
   - **Interactive Simulator**: 3-Phase Interactive Breakdown (1. Divide in half &rarr; 2. Conquer sub-arrays recursively &rarr; 3. Combine/Merge sorted output in $O(n)$).

8. **Slide 8: Brute Force**
   - **Definition**: *"A simple and straight forward way an algorithm can work by simply trying all possible solutions and then choosing the best one."*
   - **Interactive Simulator**: Exhaustive Combination Solver testing every sequential key combination until solving the target state with live operation metrics.

---

## Slide Deck Presentation Features
- **Top Navigation Strip**: 8 numbered pill buttons for instant jump to any concept.
- **Auto-Play Presentation Mode**: Automatically advances slides every 8 seconds.
- **Keyboard Navigation**: Press Left Arrow (`←`) or Right Arrow (`→`) to change slides.
- **Code Accordion**: Syntax-highlighted code snippet for each concept.
- **Canonical Cheat Sheet Matrix**: Integrated below the slide deck for quick multi-term comparison.
- **Production Build**: Built with `npm run build` into `dist/assets/index.js` and `dist/assets/index.css`.
