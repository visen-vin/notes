# Ep. 8: let & const in JS, Temporal Dead Zone

### 1. Are `let` and `const` Hoisted?

**Yes!** Just like `var`, `let` and `const` declarations **are hoisted**.

**The Difference:**

- **`var` declarations:** Hoisted and initialized with `undefined`. You can access them before the line of declaration (you get `undefined`). They are attached to the `window` object in the global scope.
- **`let` / `const` declarations:** Hoisted but **NOT initialized**. They are kept in a separate memory space (often called "Script" scope), distinct from the Global scope (`window`). Accessing them before declaration causes an error.

### 2. The Temporal Dead Zone (TDZ)

- **Definition:** The time period between the **hoisting** of a `let`/`const` variable (when the scope starts) and its **initialization** (where the value is assigned in the code).
- **State:** During this zone, the variable exists in memory but cannot be accessed.
- **Result:** Accessing a variable in the TDZ throws a **ReferenceError**.

### 3. Code Example of TDZ

```javascript
// TDZ STARTS HERE (Scope begins)
console.log(a); // 🔴 ReferenceError: Cannot access 'a' before initialization

let a = 10; // Initialization happens here. TDZ ENDS.
console.log(a); // 10
```

### 4. Types of Errors in JS

The video distinguishes between three common errors:

1. **ReferenceError:**
    - Occurs when you try to access a variable that is **`not defined`** anywhere in the scope.
    - *Also* occurs when accessing a variable inside its **`Temporal Dead Zone**.`
    - *Example:* `console.log(x)` (where x doesn't exist) or accessing `let a` too early.
2. **SyntaxError:**
    - Occurs when the code `violates the syntax rules of JS`. The code **won't run at all**.
    - *Example:* `const b;` (Missing initializer in const declaration) or `let a = 10; let a = 100;` (Duplicate declaration in same scope).
3. **TypeError:**
    - Occurs when you try to do something illegal with a specific data type or variable characteristic.
    - *Example:* `const b = 100; b = 200;` (Assignment to constant variable).

### 5. `let` vs `const` vs `var` Summary

| Feature | `var` | `let` | `const` |
| --- | --- | --- | --- |
| **Scope** | Function / Global | Block Scoped | Block Scoped |
| **Re-declaration** | Allowed | **Not Allowed** (SyntaxError) | **Not Allowed** (SyntaxError) |
| **Re-assignment** | Allowed | Allowed | **Not Allowed** (TypeError) |
| **Hoisting** | `undefined` | TDZ (ReferenceError) | TDZ (ReferenceError) |
| **Attached to Window?** | Yes | No | No |

### 6. Best Practices

- Use `const` whenever possible to prevent accidental re-assignment.
- Use `let` only when you know the variable's value will change.
- Avoid `var` to prevent scope-related bugs.
- Always put declarations at the top of the scope to shrink the Temporal Dead Zone to zero.