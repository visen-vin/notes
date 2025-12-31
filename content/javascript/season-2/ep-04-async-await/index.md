# Ep. 23: async await

### 1. What is `async`?

- `async` is a keyword used before a function declaration.
- **Key Feature:** An async function **always** returns a Promise.
    - If you return a value (e.g., `return "Namaste"`), JS automatically wraps it in a Promise (e.g., `Promise.resolve("Namaste")`).
    - If you return a Promise, it returns it as is.

```javascript
async function getData() {
    return "Namaste";
}
const dataPromise = getData();
console.log(dataPromise); // Promise {<fulfilled>: 'Namaste'}

dataPromise.then(res => console.log(res)); // "Namaste"
```

### 2. What is `await`?

- `await` is a keyword that can **only** be used inside an `async` function.
- **Purpose:** It makes JavaScript wait until the Promise settles (resolves or rejects) and returns its result.

**Comparison: Handling Promises**

**Old Way (.then):**

```javascript
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise Resolved Value!!"), 10000);
});

function getDataOld() {
    // JS Engine DOES NOT wait here. It moves to next line.
    p.then(res => console.log(res));
    console.log("Namaste JavaScript");
}
getDataOld();
// Output: "Namaste JavaScript" (immediately), then "Promise Resolved Value!!" (after 10s)
```

**New Way (async/await):**

```javascript
async function handlePromise() {
    console.log("Hello World");

    // JS Engine WAITS here specifically for this promise to resolve
    const val = await p;
    console.log("Namaste JavaScript");
    console.log(val);
}
handlePromise();
// Output: "Hello World" (immediately)
// ... (waits 10s) ...
// "Namaste JavaScript"
// "Promise Resolved Value!!"
```

### 3. How `async/await` works behind the scenes

Does `await` literally block the main thread? **No.**

- When JS sees `await p`, the execution of the *async function* (`handlePromise`) is **suspended**.
- The function effectively pops out of the Call Stack. The main thread is free to do other things.
- Once the Promise `p` resolves, the function is pushed back onto the Call Stack and execution resumes from where it left off.

### 4. Real World Example (Fetch)

`fetch()` returns a Promise that resolves to a `Response` object. This `Response` object has a `.json()` method which *also* returns a Promise.

```javascript
const API_URL = "https://api.github.com/users/akshaymarch7";

async function handleFetch() {
    try {
        const data = await fetch(API_URL);
        const jsonValue = await data.json();
        console.log(jsonValue);
    } catch (err) {
        console.log("Error handled gracefully:", err);
    }
}
handleFetch();
```

### 5. Error Handling

- **Promises:** `.catch()`
- **Async/Await:** `try...catch` block.
    - Wrap your `await` calls in `try`. If any promise rejects, control jumps to `catch`.
    - Alternatively, you can append `.catch()` to the function call itself: `handleFetch().catch(err => console.log(err))`.

### Summary

- `async/await` is syntactic sugar over Promises.
- It makes asynchronous code look and behave like synchronous code.
- Use `try...catch` for error handling.