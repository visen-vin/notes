# Ep. 5: Shortest JS Program, window & this keyword

### 1. The Shortest JavaScript Program

What is the shortest JavaScript program you can write?

- **Answer:** An **empty file**.

Even if you write *zero* lines of code, the JavaScript engine still does a lot of work behind the scenes. It automatically creates a **Global Execution Context (GEC)**.

### 2. The `window` Object & `this` Keyword

When the GEC is created, the JS engine creates two special things for you immediately:

1. **`window` object:** This is the global object. It contains a lot of functions and variables provided by the browser (like `setTimeout`, `localStorage`, `console`, etc.).
2. **`this` keyword:** At the global level, `this` points to the `window` object.

**The Golden Rule:**

```javascript
this === window; // Returns true
```

- **In Browsers:** The global object is called `window`.
- **In Node.js:** The global object is called `global`.
- **Universal Truth:** Wherever JS runs, there is *always* a global object created.

### 3. What is "Global Space"?

Any code that is **not inside a function** is considered to be in the `"Global Space."`

**Behavior:**
Any variable or function you declare in the global space gets attached to the `window` object.

**Code Example:**

```javascript
var a = 10;

function b() {
    var x = 10;
}

console.log(window.a); // 10
console.log(a);        // 10 (Implicitly refers to window.a)
console.log(this.a);   // 10
console.log(x);        // Uncaught ReferenceError: x is not defined
```

**Explanation:**

- `a` is in the global space, so `window.a` works.
- `x` is inside a function (local scope), so it is **not** attached to `window`. You cannot access it globally.

### Summary

- An empty JS file creates a **Global Execution Context**.
- It sets up memory space.
- It creates a **Global Object** (`window`) and a **`this`** variable.