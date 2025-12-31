# Ep. 13: First Class Functions ft. Anonymous Functions

### 1. Function Statement vs. Function Expression

The major difference between these two lies in **`Hoisting`**.

**Function Statement (Declaration):**

```javascript
a(); // Works! Output: "a called"
function a() {
    console.log("a called");
}
```

- **Hoisting:** The function `a` is hoisted with its body. You can call it before the declaration.

**Function Expression:**

```javascript
b(); // 🔴 TypeError: b is not a function
var b = function() {
    console.log("b called");
}
```

- **Hoisting:** `b` is treated as a variable. It is hoisted as `undefined`. Calling `undefined()` throws an error.

### 2. Anonymous Functions

- **Definition:** A function without a name.
- **Usage:** They cannot exist on their own as a statement (SyntaxError). They are used as **values** in Function Expressions.

```javascript
// function () { ... } 
// 🔴 SyntaxError: Function statements require a function name

var x = function() { // Valid (used as a value assigned to x)
    console.log("I am anonymous");
}
```

### 3. Named Function Expression

This is a `Function Expression` where the function has a name.

```javascript
var b = function xyz() {
    console.log("b called");
    console.log(xyz); // Works (Local Scope)
}
b(); // Works
// xyz(); // 🔴 ReferenceError: xyz is not defined
```

- **Gotcha:** The name `xyz` is **local** to the function itself. It is not created in the outer scope. You can use it for recursion inside the function, but not outside.

### 4. Parameters vs. Arguments

- **Parameters:** The identifiers/labels defined in the function declaration. (`param1`, `param2`)
- **Arguments:** The actual values passed when calling the function. (`10`, `20`)

```javascript
function test(param1, param2) { // Parameters
    console.log(param1);
}
test(10, 20); // Arguments
```

### 5. First Class Functions (First Class Citizens)

The ability of functions to be used as values is what makes them **`First Class Citizens` in JavaScript.**

**Capabilities:**

1. **Assigned to a variable:** `var b = function() {}`
2. **Passed as an argument:**
    
    ```javascript
    function a(param) { console.log(param); }
    a(function() { console.log("I am a function passed as a value"); });
    ```
    
3. **Returned from another function:**
    
    ```javascript
    function a() {
        return function() { console.log("Returned function"); }
    }
    ```