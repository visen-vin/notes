# Ep. 10: Closures in JS

### 1. What is a Closure?

- **Definition:** A **`Closure`** is the combination of a function bundled together (enclosed) with references to its surrounding state `(the **lexical environment**).`
- **In simpler terms:** A closure gives you access to an outer function’s scope from an inner function.
- **The Magic:** Even if the outer function has finished executing and is removed from the `Call Stack,` the inner function still `"remembers"` the `variables from that outer scope.`

> `Formula: Closure = Function + Lexical Scope`

### 2. Basic Example

```javascript
function x() {
    var a = 7;
    function y() {
        console.log(a); // y finds 'a' in its lexical parent (x)
    }
    y();
}
x(); // Output: 7
```

### 3. Returning Functions (The Real Power)

In JavaScript, functions can return other functions. When they do, they return the **Closure**, not just the function code.

```javascript
function x() {
    var a = 7;
    function y() {
        console.log(a);
    }
    return y; // We are returning the FUNCTION y
}

var z = x(); // x is executed and gone. z now holds function y.
console.log(z); // [Function: y]

// ... thousands of lines of code later ...

z(); // Output: 7
```

**Why does this work?**
When `x` returned `y`, it didn't just return the code inside `y`. It returned `y` **plus** the reference to `a` `(the lexical environment).` So `z` (which is `y`) still holds a reference to `a`, even though `x` is long gone.

### 4. Corner Case: Gotcha!

Closures store a **reference** to the variable, not the value at the time of creation.

```javascript
function x() {
    var a = 7;
    function y() {
        console.log(a);
    }
    a = 100; // Value changed before y is returned/called
    return y;
}

var z = x();
z(); // Output: 100 (Not 7!)
```

- **Reason:** The closure points to the memory location of `a`. By the time `z()` is called, the value at that location has been updated to `100`.

### 5. Uses of Closures

Closures are used everywhere in JavaScript:

- **Module Design Pattern:** To create private methods and variables.
- **Currying:** `f(a)(b)(c)`.
- **Functions like `once`:** Running a function only once.
- **Memoization:** Caching results of expensive function calls.
- **`setTimeout`:** Maintaining state in asynchronous callbacks.
- **Iterators:** Maintaining the current index.