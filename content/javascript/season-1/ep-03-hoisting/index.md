# Ep 3: Hoisting in JavaScript (Variables & Functions)

## 1. What is Hoisting?

**Hoisting** is a phenomenon in JavaScript that allows you to access **variables** and **functions** _before_ you have **initialized** or **declared** them in your code.

In most _other programming languages_, trying to use a variable before defining it would crash the program. In JavaScript, it creates a unique behavior.

## 2. The Behavior (Code Example)

Observe this code. We are calling the function and printing the variable _before_ line 4 and 7 where they are actually written.

```javascript
getName(); // Output: "Namaste Javascript" (It works!)
console.log(x); // Output: undefined (No Error, but not 7)

var x = 7;

function getName() {
    console.log("Namaste Javascript");
}
```

**The Observation:**

1. **Functions:** You can invoke a standard function even before defining it. The output is perfect.
2. **Variables (var):** You can access the variable, but the value is `undefined`. It is **not** an error, and it is **not** `7` yet.

## 3. Why does this happen? (The "Memory" Phase)

This goes back to **Episode 2** (The two phases of Execution Context).

Even before the code starts executing line-by-line, the JS engine scans the file and allocates memory:

- **For `var x = 7`:** The engine sees `var x`. It allocates memory and sets it to the placeholder `undefined`.
- **For `function getName() {...}`:** The engine sees a function declaration. It allocates memory and stores the **entire function body** immediately.

**At Line 1 (Execution Phase):**

- When `getName()` is called, the engine looks in memory, finds the full function, and runs it.
- When `console.log(x)` runs, the engine looks in memory, finds `x` is `undefined`, and prints that.

## 4. The "Gotcha": Arrow Functions & Expressions

Hoisting behaves differently if you treat functions as variables (Arrow functions or Function Expressions).

```javascript
// Function Expression
console.log(getName); // Output: undefined
getName(); // 🔴 Error: Uncaught TypeError: getName is not a function

var getName = function () {
    console.log("Namaste Javascript");
}

// Arrow Function
var getNameArrow = () => {
    console.log("Namaste Javascript");
}
```

**Why the Error?**

1. Since `getName` is declared with `var`, JavaScript treats it just like any other **variable**.
2. **Memory Phase:** It allocates memory to `getName` and assigns it `undefined`.
3. **Execution Phase:** When you write `getName()`, you are effectively trying to do `undefined()`.
4. This is impossible, so JS throws a **TypeError**.

> **Summary**
> - **Hoisting** is not physically moving code to the top. It is the result of the **Memory Creation Phase**.
> - **Function Declarations** are hoisted fully (usable immediately).
> - **Variables (var)** are hoisted as `undefined`.