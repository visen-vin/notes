# Ep. 14: Callback Functions in JS ft. Event Listeners

### 1. What is a Callback Function?

- **Definition:** A function passed as an argument into another function is called a **`Callback Function**.`
- **Purpose:** It allows you to execute a function *after* another function has finished `(synchronous callbacks)` or after `an asynchronous operation completes.`
- **Superpower:** Callbacks give `JavaScript (a synchronous single-threaded language)` the power to handle **`asynchronous** operations.`

**Code Example:**

```javascript
setTimeout(function() {
    console.log("Timer"); // This callback runs after 5000ms
}, 5000);

function x(y) {
    console.log("x");
    y();
}
x(function y() {
    console.log("y"); // y is a callback function passed to x
});
```

### 2. Blocking the Main Thread

JavaScript has only **one `Call Stack** (the Main Thread)`. It executes code very fast.

- **The Problem:** If you run a very heavy operation `(like a loop running for 30 seconds)` on the main thread, everything else stops. The page becomes `unresponsive.` This is called **`Blocking the Main Thread**.`
- **The Solution:** Use asynchronous callbacks `(like setTimeout or fetch)` to `offload heavy tasks` so the `main thread remains free` to handle user interactions `(clicks, scrolling).`

### 3. Event Listeners

Event listeners rely heavily on `callbacks.`

```javascript
document.getElementById("clickMe").addEventListener("click", function xyz() {
    console.log("Button Clicked");
});
```

- Here, `xyz` is the callback function. It sits in the browser `(Web API environment)` waiting for the "click" event. When the click happens, `it is pushed to the Call Stack.`

### 4. Closures with Event Listeners (Data Hiding)

We can use closures to maintain state `(like a counter)` safely inside an event listener.

```javascript
function attachEventListeners() {
    let count = 0; // Protected variable
    document.getElementById("clickMe").addEventListener("click", function xyz() {
        console.log("Button Clicked", ++count);
    });
}
attachEventListeners();
```

- **Why specific function?** Wrapping it in `attachEventListeners` creates a new scope. The callback `xyz` forms a closure with the variable `count`. Even after `attachEventListeners` finishes, `xyz` remembers `count`.

### 5. Garbage Collection & removeEventListener

- **Why remove listeners?** Event listeners are "heavy". Because `xyz` forms a closure, it keeps the `count` variable (and potentially the entire scope of `attachEventListeners`) alive in memory.
- **Memory Leak:** If you have thousands of event listeners that are never removed, they hold onto memory that the `Garbage Collector cannot free.` This slows down the page.
- **Best Practice:** If an element is removed from the DOM or the listener is no longer needed, explicitly remove the event listener so the memory can be garbage collected.