# Ep. 4: How Functions Work in JS & Variable Environment

### 1. The Concept: Variable Environment

- **Definition:** A `"Variable Environment"` is essentially the `local memory space` within an `Execution Context.` It stores `variables` and `functions` relevant to *that specific* `execution context.`
- **Key Takeaway:** `Variables` created inside a function are **`local`** to that `function`. If you have a variable named `x` in the `global scope` and another `x` inside a `function`, they are two `completely separate variables` living in `different "boxes" (Execution Contexts).`

### 2. The Code Example (Visualizing Execution)

Consider the following code snippet discussed in the video:

```javascript
var x = 1;
a();
b();
console.log(x);

function a() {
    var x = 10;
    console.log(x);
}

function b() {
    var x = 100;
    console.log(x);
}
```

### 3. Execution Breakdown (Step-by-Step)

#### Step 1: Global Execution Context (GEC) Created

- **Memory Phase:**
    - `x`: `undefined`
    - `a`: `{...function body...}`
    - `b`: `{...function body...}`
- **Execution Phase:**
    - `x` is assigned `1`.
    - `a()` is invoked -> **Creates New Execution Context (EC-A)**.

#### Step 2: Inside Function `a()` (EC-A pushed to Stack)

- **Memory Phase (for a):** `x` (local) is `undefined`.
- **Execution Phase (for a):**
    - Local `x` becomes `10`.
    - `console.log(x)` prints **10** (it looks in local memory first).
- **Completion:** Function `a` finishes. EC-A is deleted (popped from stack). Control returns to GEC.

#### Step 3: Inside Function `b()` (EC-B pushed to Stack)

- **Memory Phase (for b):** `x` (local) is `undefined`.
- **Execution Phase (for b):**
    - Local `x` becomes `100`.
    - `console.log(x)` prints **100**.
- **Completion:** Function `b` finishes. EC-B is deleted (popped from stack). Control returns to GEC.

#### Step 4: Back in Global Scope

- The code resumes at `console.log(x)`.
- It looks for `x` in the **Global** Memory.
- It prints **1** (the global `x` was never touched by functions `a` or `b`).

### 4. The Call Stack Visualization

The video emphasizes visualizing the stack to understand scope:

- At start: `[ GEC ]`
- Call `a()`: `[ GEC, EC-a ]` -> `x` is 10 here.
- `a()` returns: `[ GEC ]`
- Call `b()`: `[ GEC, EC-b ]` -> `x` is 100 here.
- `b()` returns: `[ GEC ]` -> `x` is 1 here.