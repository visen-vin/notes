# Ep 2: How JavaScript Code is Executed & Call Stack

## 1. The Two Phases of Execution

When you run a JavaScript program, the `Global Execution Context` isn't just created instantly. It is created in **two distinct phases**. This is the **secret** to understanding **hoisting** and **scope**.

### Phase 1: Memory Creation Phase (The "Skim" Phase)

Before executing a single line of code, JavaScript skims through the entire program to allocate memory.

- **Variables:** It allocates **memory** for **variables** (like `var n`) and assigns them a **special placeholder** value: `undefined`.
- **Functions:** It **allocates memory** for **functions** (like `function square`) and stores the **entire code** of the function exactly as it is written.

### Phase 2: Code Execution Phase (The "Run" Phase)

Now, JavaScript runs through the code again, line by line.

- **Variables:** It replaces `undefined` with the actual values (e.g., `n` becomes `2`).
- **Function Calls:** When a function is invoked, a **brand new** Execution Context is created.

## 2. Execution in Action (Step-by-Step Example)

Consider this code:

```javascript
var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
var square2 = square(n);
var square4 = square(4);

console.log("square2:", square2);
console.log("square4:", square4);
```

### Step 1 (Memory Phase):

- `n`: `undefined`
- `square`: `{ ... whole function code ... }`
- `square2`: `undefined`
- `square4`: `undefined`

### Step 2 (Execution Phase):

1. **Line 1:** `n` is assigned the value `2`.
2. **Line 6 (`square(n)`):** A function is called.
    - A **NEW Execution Context** is created inside the Code Component of the global box.
    - **Memory Phase (New Box):** `num` is `undefined`, `ans` is `undefined`.
    - **Execution Phase (New Box):** `num` gets `2`. `ans` gets `4`.
    - **Return:** The value `4` is returned to `square2`. The new box is **deleted**.
3. **Line 7 (`square(4)`):** The same process repeats with a new box.

## 3. The Call Stack

How does JavaScript keep track of where it is? If it jumps from the _global code_ into a _function_, and then into another function, how does it know where to go back?

It uses a **Stack** data structure (Last In, First Out).

1. **Initialization:** The **Global Execution Context (GEC)** is pushed to the bottom of the stack.
2. **Function Call:** When a function is called, its `Execution Context` is **Pushed** onto the stack.
3. **Function Return:** When the function finishes, its context is **Popped** off the stack, and control goes back to the context below it.
4. **Completion:** When the entire script is done, the `GEC` is popped, and the stack is empty.

> **Aliases for Call Stack:**
> You might hear these terms in interviews; they all mean the same thing:
> - Execution Context Stack
> - Program Stack
> - Control Stack
> - Runtime Stack
> - Machine Stack