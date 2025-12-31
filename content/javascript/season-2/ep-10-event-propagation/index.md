# Ep. 10: Event Bubbling, Capturing (Trickling)

### 1. The Concept of Event Propagation

When an event (like a click) happens on an HTML element, it doesn't just happen on that single element. It propagates through the DOM tree.

**The DOM Structure:**

```html
<div id="grandparent">
  <div id="parent">
    <div id="child">
    </div>
  </div>
</div>
```

### 2. The Two Phases

1. **Capturing Phase (Trickling):** The event travels down from the top of the DOM tree (`window` -> `document` -> `html` -> `body` -> `grandparent` -> `parent`) to the target element (`child`).
2. **Bubbling Phase:** The event travels up from the target element (`child`) back to the top of the DOM tree (`parent` -> `grandparent` -> ... -> `window`).

### 3. `addEventListener` and the Phases

The standard syntax is:

```javascript
element.addEventListener(event, callback, useCapture);
```

- **`useCapture` (Boolean):** This 3rd argument controls the phase.
    - **`false` (Default):** The handler runs during the **Bubbling** phase.
    - **`true`:** The handler runs during the **Capturing** phase.

### 4. Code Walkthrough (The Output Question)

```javascript
document.querySelector("#grandparent").addEventListener("click", () => {
    console.log("Grandparent Clicked!");
}, true); // Capturing

document.querySelector("#parent").addEventListener("click", () => {
    console.log("Parent Clicked!");
}, false); // Bubbling

document.querySelector("#child").addEventListener("click", () => {
    console.log("Child Clicked!");
}, true); // Capturing
```

**Scenario:** User clicks on the **Child** div.

**Execution Flow:**

1. **Capturing Phase Starts (Downwards):**
    - Checks `Grandparent`: Is there a capture listener? **YES**. -> **Log: "Grandparent Clicked!"**
    - Checks `Parent`: Is there a capture listener? **NO** (It's set to false).
    - Checks `Child`: Is there a capture listener? **YES**. -> **Log: "Child Clicked!"**
2. **Bubbling Phase Starts (Upwards):**
    - Checks `Child`: (Already fired).
    - Checks `Parent`: Is there a bubbling listener? **YES**. -> **Log: "Parent Clicked!"**
    - Checks `Grandparent`: Is there a bubbling listener? **NO** (It was set to true).

**Final Output:**

1. Grandparent Clicked!
2. Child Clicked!
3. Parent Clicked!

### 5. How to Stop Propagation

Sometimes you don't want the event to ripple up or down.

- **`e.stopPropagation()`:** Stops the event from moving to the next element in the cycle.

```javascript
document.querySelector("#parent").addEventListener("click", (e) => {
    console.log("Parent Clicked!");
    e.stopPropagation(); // Event dies here. Grandparent won't know.
}, false);
```

### Key Takeaways for Interviews

- **Default Behavior:** Bubbling is the default if the 3rd argument is omitted.
- **Performance:** Event Delegation (covered in the next episode) relies entirely on Event Bubbling.
- **Lifecycle:** Always remember the cycle: **Capture Down -> Target -> Bubble Up**.
