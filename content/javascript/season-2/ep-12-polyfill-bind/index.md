# Ep. 12: Polyfill for bind method

### 1. Function Borrowing (`call`, `apply`, `bind`)

These methods allow objects to borrow methods from other objects or invoke functions with a specific `this` context.

**Scenario:** We have a generic function `printName` and two objects.

```javascript
let name = {
    firstname: "Akshay",
    lastname: "Saini"
}

let name2 = {
    firstname: "Sachin",
    lastname: "Tendulkar"
}

let printName = function (hometown, state) {
    console.log(this.firstname + " " + this.lastname + " from " + hometown + ", " + state);
}
```

#### A. `call()`

- **Purpose:** Invokes the function **immediately**.
- **Arguments:** The first argument is the reference to `this` variable. Subsequent arguments are passed individually (comma-separated).

```javascript
// Function Borrowing
printName.call(name, "Dehradun", "Uttarakhand");
printName.call(name2, "Mumbai", "Maharashtra");
```

#### B. `apply()`

- **Purpose:** Invokes the function **immediately** (same as `call`).
- **Arguments:** The only difference is how arguments are passed. The second argument is a **List (Array)** of arguments.

```javascript
printName.apply(name2, ["Mumbai", "Maharashtra"]);
```

#### C. `bind()`

- **Purpose:** Does **not** invoke the function immediately. Instead, it returns a **copy** of the method which can be invoked later.
- **Usage:** Useful for binding a method to an object and keeping it for later use.

```javascript
let printMyName = printName.bind(name2, "Mumbai", "Maharashtra");
console.log(printMyName); // Returns the function
printMyName(); // Invokes it
```

### 2. What is a Polyfill?

A **Polyfill** is a piece of code (usually JavaScript on the web) used to provide modern functionality on older browsers that do not natively support it.

- **Scenario:** If your browser doesn't support the `.bind()` method (e.g., extremely old IE), you write your own version of `.bind()` so your code still works. This custom implementation is called a Polyfill.

### 3. Writing the Polyfill (`myBind`)

To make `myBind` available to *all* functions, we attach it to `Function.prototype`.

#### Step 1: Basic Structure

```javascript
Function.prototype.myBind = function(scope) {
    // 'this' inside myBind refers to the function 'printName'
    let fn = this;

    return function() {
        // execute the original function with the correct scope
        fn.call(scope);
    }
}
```

#### Step 2: Handling Arguments (Currying)

`bind` can take arguments during both binding and execution. We need to handle both sets of arguments.

```javascript
Function.prototype.myBind = function(scope, ...args) {
    let fn = this;
    // args contains arguments passed at binding time (e.g., ["Dehradun"])

    return function(...args2) {
        // args2 contains arguments passed at call time (e.g., ["Uttarakhand"])

        // Combine both sets of arguments
        fn.apply(scope, [...args, ...args2]);
    }
}
```

#### Step 3: The ES5 Implementation (Old School)

If we can't use ES6 spread/rest operators (`...`), we use the `arguments` object.

```javascript
Function.prototype.myBind = function(scope) {
    let fn = this;
    // Extract args from index 1 (skipping 'scope')
    let args = Array.prototype.slice.call(arguments, 1);

    return function() {
        // Get args passed to the returned function
        let args2 = Array.prototype.slice.call(arguments);

        // Concatenate args arrays
        fn.apply(scope, args.concat(args2));
    }
}
```

### 4. Summary

To write a polyfill for `bind`, you need to:

1. Return a function (closure).
2. Keep a reference to the original function (`this`).
3. Handle arguments from the *binding* step and combine them with arguments from the *execution* step.
4. Use `.apply()` inside the returned function to invoke the original function with the correct `this` context and combined arguments.
