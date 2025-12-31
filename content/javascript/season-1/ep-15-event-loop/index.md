# Ep. 15: Asynchronous JavaScript & EVENT LOOP from scratch

### 1. The Core Limitation

- **Recall:** JavaScript is a **Synchronous Single-Threaded** language. It has **one Call Stack** and can do only one thing at a time.
- **The Problem:** If JS is single-threaded, how does it perform asynchronous tasks like waiting for a timer (`setTimeout`) or fetching data from a server (`fetch`) without blocking the main thread?

### 2. Browser Superpowers (Web APIs)

The JavaScript Engine (which contains the Call Stack) exists inside the **Browser**. The Browser is powerful and has many features that the JS Engine itself doesn't have.

**Web APIs (Provided by Browser, NOT JS):**

1. `setTimeout()`
2. `DOM APIs` (document.getElementById, etc.)
3. `fetch()`
4. `localStorage`
5. `console` (Yes, even console.log is part of the browser, not pure JS!)
6. `location`

**Access:** The Browser gives the JS Engine access to these powers via the Global Object (`window`). So `setTimeout` is actually `window.setTimeout`.

### 3. The Architecture (How it Works)

#### A. The Setup

```javascript
console.log("Start");

setTimeout(function cb() {
    console.log("Callback");
}, 5000);

console.log("End");
```

#### B. Execution Steps

1. **GEC Created:** `console.log("Start")` executes. Prints "Start".
2. **`setTimeout` Encountered:**
    - The JS Engine calls the Web API `setTimeout`.
    - It registers the callback function `cb` inside the **`Web API Environment**.`
    - It starts a **Timer** of 5000ms in the browser.
    - **`Crucial:**` The `JS Engine *does not wait*.` It moves to the next line immediately.
3. **`console.log("End")`:** Executes. Prints "End".
4. **GEC Pops:** The Global Execution Context is popped off the stack. The Call Stack is now **empty**.

#### C. The Wait & The Queue

1. **Timer Expires:** After 5 seconds, the timer in the `Web API environment finishes.`
2. **Callback Queue:** The callback function `cb` is **not** pushed directly to the `Call Stack.` Instead, it is pushed into the **`Callback Queue** (also known as the **Task Queue**).`

### 4. The Event Loop

The **`Event Loop`** has one simple job. It acts like a `gatekeeper.`

- **Job:** It continuously monitors the **`Call Stack`** and the **`Callback Queue**.`
- **Logic:**
    
    > "Is the Call Stack empty?"
    YES: "Is there anything in the Callback Queue?"
    YES: "Push the first item from the Queue into the Call Stack."

In our example:

1. Call Stack becomes empty (after "End").
2. Timer expires -> `cb` goes to Queue.
3. Event Loop sees Stack is empty & Queue has `cb`.
4. Event Loop pushes `cb` -> Call Stack.
5. `cb` executes -> Prints "Callback".

### 5. Microtask Queue vs. Callback Queue

There is another queue called the **`Microtask Queue**.`

- **High Priority:** The Event Loop gives **higher priority** to the Microtask Queue. It will finish *all* tasks in the Microtask Queue before touching the Callback Queue.
- **What goes here?**
    1. All callbacks coming from **Promises** `(e.g., fetch().then(...)).`
    2. **Mutation Observers**.
- **What goes in Callback Queue?** `setTimeout, setInterval, DOM Events (click, scroll).`

### 6. Starvation

If the `Microtask Queue` keeps generating new `microtasks (e.g., a Promise that resolves and creates another Promise)`, the Event Loop will keep processing the `Microtask Queue.` The tasks in the `Callback Queue` will never get a chance to run. This is called **`Starvation`**.