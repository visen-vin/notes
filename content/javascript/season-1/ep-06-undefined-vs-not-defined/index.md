# Ep. 6: undefined vs not defined in JS

### 1. What is `undefined`?

- **Definition:** `undefined` is a special keyword in JavaScript. It is a specific memory value/placeholder.
- **Origin:** During the **Memory Creation Phase** (Phase 1), JavaScript allocates memory to variables and automatically assigns them the special value `undefined`.
- **Meaning:** It means the variable **exists** in the memory, but it has not been assigned a specific value (like 10, "hello", etc.) yet.

### 2. What is `not defined`?

- **Definition:** This indicates that the variable `has **not been allocated memory**` in the `current Execution Context.`
- **Result:** If you try to access a variable that was never declared, you get a **`ReferenceError: x is not defined**.`

### 3. Comparison Code Example

```javascript
console.log(a); // Output: undefined (Memory allocated, value not set)
var a = 7;
console.log(a); // Output: 7

console.log(x); // Output: Uncaught ReferenceError: x is not defined
```

**Key Difference:**

- **Case `a`:** The variable `a` sits in memory as `a: undefined`.
- **Case `x`:** The variable `x` is nowhere to be found in the memory object.

### 4. JavaScript is Loosely Typed (Weakly Typed)

- JavaScript does not require you to define the *type* of data a variable holds.
- You can change the type of data later in the code.

```javascript
var a;
console.log(a); // undefined
a = 10;
console.log(a); // 10 (Number)
a = "Hello";
console.log(a); // "Hello" (String)
```

### 5. Best Practice

- **NEVER** assign `undefined` to a variable manually (e.g., `a = undefined`).
- While it is technically possible, it is considered bad practice because `undefined` implies the system hasn't touched it yet. If you want to clear a variable, use `null` instead.