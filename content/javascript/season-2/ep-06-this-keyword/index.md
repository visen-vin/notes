# Ep. 24: this keyword in JavaScript

The `this` keyword is one of the most confusing topics in JavaScript because its value depends on **circumstances** (where code is run) and **invocation** (how code is called).

### 1. `this` in Global Space

- **Rule:** In the global space (outside any function), `this` represents the **Global Object**.
- **Global Object varies by Environment:**
    - In **Browser:** `window`
    - In **Node.js:** `global`
    - In general: `this === window` (in browser global space).

```javascript
console.log(this); // Window { ... } (in browser)
```

### 2. `this` inside a Function

The value depends on **Strict Mode** vs **Non-Strict Mode**.

**Code:**

```javascript
function x() {
    console.log(this);
}
```

- **Non-Strict Mode:** `this` is `window` (global object).
- **Strict Mode (`"use strict"`):** `this` is `undefined`.

**Why? (This Substitution):**
In non-strict mode, if the value of `this` is `undefined` or `null`, JavaScript automatically replaces it with the **global object**. In strict mode, it remains `undefined`.

### 3. `this` depends on *How* a function is called

Even inside strict mode, the value changes based on the call site.

```javascript
"use strict";
function x() {
    console.log(this);
}

x();          // undefined
window.x();   // Window Object
```

- **Rule:** If called without a reference (`x()`), it is `undefined` (in strict mode). If called with a reference (`window.x()`), `this` becomes the calling object (`window`).

### 4. `this` inside an Object's Method

- **Method:** A function written inside an object.
- **Rule:** `this` refers to the **Object** calling the method.

```javascript
const obj = {
    a: 10,
    x: function() {
        console.log(this);   // {a: 10, x: f} (The Object itself)
        console.log(this.a); // 10
    }
}
obj.x();
```

```javascript
const student = {
    name: "Akshay",
    printName: function() {
        console.log(this.name);
    }
};

const student2 = {
    name: "Deepika"
};

// Reuse student's method for student2
student.printName.call(student2); // Output: "Deepika"
```

### 5. `call`, `apply`, `bind` (Sharing Methods)

You can force the value of `this` to be a specific object using these methods.

- **`call`:** Invokes function directly, passing `this` reference as first argument.
- **`apply`:** Similar to `call` but takes arguments as an array.
- **`bind`:** Returns a new function with `this` bound to the object.

### 6. `this` inside Arrow Functions

- **Rule:** Arrow functions do **NOT** have their own `this`.
- **Behavior:** They take the value of `this` from their **enclosing lexical context** (the scope where they were defined).

**Example 1: Global Arrow Function**

```javascript
const obj = {
    a: 10,
    x: () => {
        console.log(this); // Window (Lexical parent is Global Scope)
    }
};
obj.x();
```

**Example 2: Nested Arrow Function**

```javascript
const obj2 = {
    a: 10,
    x: function() {
        // Enclosing context here is function 'x', whose 'this' is obj2
        const y = () => {
            console.log(this); // obj2 (Inherited from x)
        };
        y();
    }
};
obj2.x();
```

### 7. `this` inside DOM Elements

- **Rule:** In an event handler (like `onclick`), `this` refers to the **HTML Element** itself.

```javascript
<button onclick="console.log(this)">Click Me</button>
<!-- Output: <button>Click Me</button> -->
```

### Summary Table

| Scenario | Value of `this` |
| --- | --- |
| **Global Space** | Global Object (`window`/`global`) |
| **Function (Non-Strict)** | Global Object (`window`) |
| **Function (Strict)** | `undefined` |
| **Object Method** | The Object itself |
| **Arrow Function** | Enclosing Lexical Context |
| **DOM Event** | The HTML Element |
