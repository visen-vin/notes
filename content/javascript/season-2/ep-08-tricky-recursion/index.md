# Ep. 8: Tricky Recursion - sum(1)(2)(3)..(n)(). Currying

### 1. The Problem Statement

Create a function `sum` that works like this:

- `sum(1)(2)(3)(4)()` should return `10`.
- `sum(5)(10)()` should return `15`.
- The chain can be infinite.
- The chain ends when an empty argument `()` is passed.

### 2. The Mental Model

This problem combines two advanced JavaScript concepts:

1. **Functions returning Functions (Currying/HOF):** To allow the chaining `(1)(2)...`, each call must return another function.
2. **Recursion:** Since we don't know how many times it will be called, the returned function must call the *original* logic again.

### 3. Step-by-Step Implementation

#### Step 1: Handling the First Argument

We need a function that takes `a` and returns a function that takes `b`.

```javascript
let sum = function(a) {
    return function(b) {
        // Logic here
    }
}
```

#### Step 2: The Recursive Logic

Inside the inner function, we check if `b` exists.

- **If `b` exists:** It means the chain is continuing. We need to add `a + b` and keep the chain alive. We do this by calling `sum` recursively with the new total `a+b`.
- **If `b` is empty (undefined):** It means the chain has ended `()`. We simply return the accumulated result `a`.

#### Step 3: The ES5 Solution

```javascript
let sum = function(a) {
    return function(b) {
        if (b) {
            return sum(a + b); // Recursive Step: Pass accumulated sum forward
        }
        return a; // Base Case: Chain broken, return total
    }
}
```

### 4. The ES6 One-Liner (Interview Flex)

You can rewrite this using Arrow Functions and the Ternary Operator for a cleaner look.

```javascript
const sum = a => b => b ? sum(a + b) : a;
```

**Breakdown:**

1. `const sum = a => ...` : Function taking `a`.
2. `... => b => ...` : Returns a function taking `b`.
3. `... b ? sum(a + b) : a` : If `b` is truthy, recurse with `a+b`. If falsy (empty call), return `a`.

### 5. Memory Visualization

When you run `sum(1)(2)(3)()`, the Call Stack behaves like this:

1. `sum(1)` executes. Returns *Function B*. Closure holds `a=1`.
2. *Function B* called with `(2)`. It sees `b` exists. Calls `sum(1+2)` -> `sum(3)`.
3. `sum(3)` returns *Function B (new copy)*. Closure holds `a=3`.
4. *Function B* called with `(3)`. It sees `b` exists. Calls `sum(3+3)` -> `sum(6)`.
5. `sum(6)` returns *Function B (new copy)*. Closure holds `a=6`.
6. *Function B* called with `()`. `b` is undefined. It returns `a` (which is `6`).
