# Ep. 7: The Scope Chain, Scope & Lexical Environment

### 1. The Mystery of Scope

- **Scope Definition:** Scope is directly related to the **Lexical Environment**. It determines where you can access a specific variable or function in your code.
- **The Question:** "Is variable `b` inside the scope of function `c`?" essentially means "Can function `c` access variable `b`?"

### 2. Lexical Environment

- **Definition:** Whenever an Execution Context (EC) is created, a **Lexical Environment** is also created.
- **Formula:**
> `Lexical Environment = Local Memory + Reference to Lexical Environment of Parent`

- **"Lexical" Meaning:** "Lexical" means "in hierarchy" or "in sequence". It refers to the physical placement of your code.
    - If function `c()` is written inside function `a()`, then `c()` is *lexically* inside `a()`.

### 3. The Scope Chain `(Visualizing the Search)`

When the JS engine tries to access a variable:

1. **Local Check:** It first looks in the **Local Memory** of the current function.
2. **Parent Check:** If not found, it goes to the reference of the **Parent's Lexical Environment**.
3. **Grandparent Check:** It continues up the chain (Parent -> Parent's Parent...).
4. **Global Check:** It eventually reaches the **Global Scope**. If it's not found there either, it returns `ReferenceError` (because Global's parent is `null`).

### 4. Code Walkthrough

```javascript
function a() {
    var b = 10;
    c();
    function c() {
        console.log(b); // Output: 10
    }
}
a();
console.log(b); // Output: ReferenceError: b is not defined
```

- **Inside `c()`:** It tries to find `b`. Not in local memory of `c`. It goes to the parent (`a`'s Lexical Environment). Found `b=10`. Prints it.
- **Global Scope:** Tries to find `b`. Not in Global Memory. Global has no parent. Error!

### 5. Summary

- **Scope Chain:** This mechanism of searching for variables in subsequent parent Lexical Environments is called the Scope Chain.
- **Access Rule:** An inner function can access variables of its outer function, but an outer function (or global scope) cannot access variables of an inner function.