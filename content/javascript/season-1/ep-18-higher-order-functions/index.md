# Ep. 18: Higher-Order Functions ft. Functional Programming

### 1. Definition

A function is called a **`Higher-Order Function (HOF)`** if it does at least one of the following:

1. Takes another function as an argument (a callback).
2. Returns a function from it.

**Example:**

```javascript
function x() {
    console.log("Namaste");
}

function y(x) { // y is a Higher-Order Function
    x(); // x is the Callback Function
}
```

### 2. The Problem: Repetitive Code

Let's look at a common scenario. We have an array of radii, and we want to calculate the area, circumference, and diameter for each.

**The "Bad" Way (Repetitive):**

```javascript
const radius = [3, 1, 2, 4];

const calculateArea = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(Math.PI * radius[i] * radius[i]);
    }
    return output;
};

const calculateCircumference = function (radius) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(2 * Math.PI * radius[i]);
    }
    return output;
};

console.log(calculateArea(radius));
console.log(calculateCircumference(radius));
```

**Issue:** The logic for looping and creating the array is repeated. Only the math formula changes. This violates the **DRY (Don't Repeat Yourself)** principle.

### 3. The "Functional" Way (Using HOFs)

We abstract the logic into small, reusable functions.

```javascript
const radius = [3, 1, 2, 4];

// Logic extracted into separate functions
const area = function (radius) {
    return Math.PI * radius * radius;
};

const circumference = function (radius) {
    return 2 * Math.PI * radius;
};

// Generic HOF
const calculate = function (radius, logic) {
    const output = [];
    for (let i = 0; i < radius.length; i++) {
        output.push(logic(radius[i])); // Apply logic dynamically
    }
    return output;
};

console.log(calculate(radius, area));
console.log(calculate(radius, circumference));
```

**Benefit:** `calculate` is now a generic function. You can pass *any* logic to it.

### 4. Polyfills: Map

The `calculate` function we wrote above is actually exactly how the built-in `Array.prototype.map` works.

**Built-in map:**

```javascript
console.log(radius.map(area));
```

**Writing our own Polyfill:**
If we want `calculate` to be available on *all* arrays like `.map()`, we attach it to the Prototype.

```javascript
Array.prototype.calculate = function (logic) {
    const output = [];
    for (let i = 0; i < this.length; i++) { // 'this' points to the array
        output.push(logic(this[i]));
    }
    return output;
};

console.log(radius.calculate(area)); // Works exactly like .map()
```