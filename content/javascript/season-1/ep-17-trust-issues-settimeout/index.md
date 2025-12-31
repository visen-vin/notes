# Ep. 17: Trust Issues with setTimeout()

### 1. The "Trust Issue"

- **The Expectation:** If you write `setTimeout(cb, 5000)`, you expect the callback `cb` to execute exactly after 5000 milliseconds (5 seconds).
- **The Reality:** It does **not** guarantee execution at exactly 5000ms. It only guarantees a **`minimum delay`** of 5000ms.
- **Why?** JavaScript waits for the **`Call Stack`** to be empty. If the main `thread is busy executing` other code, the callback has to wait in the queue, even if the timer has expired.

### 2. Proof: Blocking the Main Thread

Consider this code where we deliberately block the main thread for 10 seconds using a `while` loop.

```javascript
console.log("Start");

setTimeout(function cb() {
    console.log("Callback");
}, 5000); // 5 Seconds timer

console.log("End");

// Simulate a heavy task that takes 10 seconds
let startDate = new Date().getTime();
let endDate = startDate;
while (endDate < startDate + 10000) {
    endDate = new Date().getTime();
}

console.log("While Loop Expired");
```

**Execution Flow:**

1. `"Start"` prints.
2. `setTimeout` registers `cb` in Web APIs with a 5s timer.
3. `"End"` prints.
4. **`The Blocking Loop:`** The GEC (Global Execution Context) hits the `while` loop. It stays busy there for 10 seconds.
5. **`At 5 Seconds:**` The timer expires. `cb` is moved to the **Callback Queue**.
6. **The Conflict:** The Event Loop tries to push `cb` to the Stack, but the Stack is **not empty** (it's busy with the GEC executing the `while` loop).
7. **At 10 Seconds:** The loop finishes. `"While Loop Expired"` prints.
8. **Finally:** The GEC pops off. The Stack is empty. The Event Loop pushes `cb` to the Stack. `"Callback"` prints.

**Result:** The callback ran after **10 seconds**, not 5.

### 3. The Concurrency Model

This behavior is a direct result of `JavaScript's Concurrency Model.`

1. **Single Thread:** Can only do one thing at a time.
2. **Call Stack Priority:** The Call Stack must be empty before anything from the Queue is processed.
3. **Queue Wait:** Callbacks wait in the Callback Queue until the Stack is free.

### 4. setTimeout(cb, 0)

What happens if you set the delay to 0?

```javascript
console.log("Start");
setTimeout(function cb() {
    console.log("Callback");
}, 0);
console.log("End");
```

**Output:**

1. `Start`
2. `End`
3. `Callback`

**Reason:** Even with 0ms delay, the callback goes to the **`Web API** -> **Callback Queue**.` It must wait for the `GEC (which prints "End")` to finish and leave the stack. This is often used to "defer" a piece of code until the call stack is clear.