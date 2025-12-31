# Ep. 9: Block Scope & Shadowing in JS

### 1. What is a Block?

- **Definition:** A Block, also known as a **`Compound Statement**,` is defined by curly braces `{ ... }`.
- **Purpose:** It is used to combine multiple JavaScript statements into a group.
- **Why?** JavaScript expects a single statement in places like `if`, `for`, or `while`. A block allows you to write multiple statements where JS expects only one.

```javascript
if (true) {
    // This is a block
    var a = 10;
    console.log(a);
}
```

### 2. Block Scope

- **Definition:** Variables and functions that are accessible **only inside** a specific block.
- **`let` and `const`:** These are **Block Scoped**. They are stored in a separate memory space reserved for that block (often called `Block` scope in the debugger). You cannot access them outside the block.
- **`var`:** This is **Global Scoped** (or Function Scoped). It "leaks" out of the block into the global scope.

```javascript
{
    var a = 10;
    let b = 20;
    const c = 30;
}
console.log(a); // 10 (Works!)
console.log(b); // 🔴 ReferenceError: b is not defined
```

### 3. Shadowing

**Definition:** If you declare a variable inside a block with the **same name** as a variable outside the block, the inner variable **shadows** the outer one.

#### Case A: Shadowing with `var`

Since `var` is `not block-scoped,` the inner `var` actually **modifies** the outer variable. They point to the same memory location (Global).

```javascript
var a = 100;
{
    var a = 10; // This overwrites the global 'a'
    console.log(a); // 10
}
console.log(a); // 10 (Original value is lost!)
```

#### Case B: Shadowing with `let` / `const`

Since `let` is block-scoped, the inner `let` is a completely **`separate variable`** in a different memory space (`Block` scope vs `Script` scope). The outer variable is untouched.

```javascript
let b = 100;
{
    let b = 20; // New variable in Block Scope
    console.log(b); // 20
}
console.log(b); // 100 (Original value remains)
```

### 4. Illegal Shadowing

You cannot shadow a `let` variable using `var` inside a block. This is because `var` tries to attach itself to the global/function scope, but `let` has already claimed that name in that specific scope boundary.

```javascript
let a = 20;
{
    var a = 20; // 🔴 SyntaxError: Identifier 'a' has already been declared
}
```

- **Valid:** Shadowing `let` with `let` is fine.
- **Valid:** Shadowing `var` with `let` is fine.

### Summary Table

| Feature | `var` | `let` / `const` |
| --- | --- | --- |
| **Scope** | Function / Global | Block Scoped |
| **Leaking** | Leaks out of `{}` | Stays inside `{}` |
| **Shadowing** | Modifies outer var | Creates new independent var |