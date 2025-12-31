# Ep. 7: Currying in JavaScript

### 1. What is Currying?

**Currying** is a technique in functional programming where a function with multiple arguments is transformed into a sequence of nested functions, each taking a **single argument**.

- **Normal Function:** `f(a, b)`
- **Curried Function:** `f(a)(b)`

**Formal Definition:** It transforms a function `f(a, b, c)` into `f(a)(b)(c)`.

### 2. Why use Currying?

1. **Modularity:** You can create small, reusable helper functions.
2. **Partial Application:** You can "pre-set" some arguments and reuse the function later with remaining arguments.

### 3. Implementation Method 1: Using `bind()`

The `bind()` method creates a new function that, when called, has its `this` keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

**Scenario:** We have a multiply function `multiply(x, y)`. We want to create a `multiplyByTwo` function from it.

```javascript
let multiply = function(x, y) {
    console.log(x * y);
}

// Creating a copy of multiply with 'x' pre-set to 2
let multiplyByTwo = multiply.bind(this, 2);

multiplyByTwo(5); // Output: 10
// Effectively calls multiply(2, 5)

let multiplyByThree = multiply.bind(this, 3);
multiplyByThree(5); // Output: 15
```

- Here, `bind` presets the first argument `x`. When `multiplyByTwo(5)` is called, `5` is passed as the second argument `y`.

### 4. Implementation Method 2: Using Closures

We can achieve the same result by manually returning nested functions. This is the "pure" implementation of currying.

```javascript
let multiply = function(x) {
    return function(y) {
        console.log(x * y);
    }
}

let multiplyByTwo = multiply(2);
// multiplyByTwo now holds the inner function, with 'x' closed over as 2.

multiplyByTwo(5); // Output: 10

// Or calling it directly in curried form:
multiply(2)(3); // Output: 6
```

**How it works:**

1. `multiply(2)` executes and returns the inner function.
2. Due to **Closure**, the inner function remembers that `x` was `2`.
3. When we call `multiplyByTwo(5)`, it uses the remembered `x` (2) and the new `y` (5) to calculate the result.

### 5. Real Life Example: Logging

One of the most practical uses of currying is creating a logging utility where you want to fix the "log level" (INFO, ERROR, WARN) once and reuse it.

```javascript
// Generic Logger Function (Curried)
const logger = (level) => (message) => {
    console.log(`[${level}] ${message}`);
}

// Create specialized loggers
const infoLogger = logger("INFO");
const errorLogger = logger("ERROR");

// Usage
infoLogger("Application started");
// Output: [INFO] Application started

infoLogger("User logged in");
// Output: [INFO] User logged in

errorLogger("Database connection failed");
// Output: [ERROR] Database connection failed
```

- **Benefit:** We don't have to pass `"INFO"` every single time we want to log a normal message. We created a specialized function `infoLogger` that remembers the level.

### 6. Summary

- **Currying** converts `f(a, b)` into `f(a)(b)`.
- It relies heavily on **Closures** to retain access to previous arguments.
- It is useful for creating specific utility functions from general ones (like `multiplyByTwo` from `multiply` or `errorLogger` from `logger`).
