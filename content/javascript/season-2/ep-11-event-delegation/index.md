# Ep. 11: Event Delegation

### 1. What is Event Delegation?

**Event Delegation** is a technique of handling events where we attach a **single event listener** to a parent element instead of attaching multiple event listeners to each individual child element.

**Mechanism:** It relies entirely on **Event Bubbling**. Since events bubble up from child to parent, the parent can "catch" and handle events triggered by its children.

### 2. The Problem (Without Delegation)

Imagine an E-commerce category page with a list of products.

```html
<ul id="category">
  <li id="laptop">Laptop</li>
  <li id="camera">Camera</li>
  <li id="shoes">Shoes</li>
  <!-- ... 1000 more items -->
</ul>
```

**Bad Approach:** Attaching an event listener to *every* `<li>`.

```javascript
document.querySelector("#laptop").addEventListener("click", () => ...);
document.querySelector("#camera").addEventListener("click", () => ...);
// Repeating this 1000 times...
```

- **Issue:** High memory usage (1000 function objects) and performance lag.

### 3. The Solution (With Delegation)

Attach **one** listener to the parent `<ul>`.

```javascript
document.querySelector("#category").addEventListener("click", (e) => {
    // e.target gives us the actual element that was clicked
    console.log(e.target.id);

    // Redirect user to product page
    if (e.target.tagName === 'LI') {
        window.location.href = "/" + e.target.id;
    }
});
```

### 4. Benefits of Event Delegation

1. **Memory Efficiency:** We create only 1 event listener instead of 1000. Saves significant memory.
2. **Less Code:** Cleaner and easier to maintain.
3. **DOM Manipulation Support:** If you add a **new** item (e.g., "iPhone") to the list dynamically via API, you don't need to attach a new listener. The parent listener automatically handles it because of bubbling.

### 5. Limitations (Cons)

1. **Non-Bubbling Events:** Some events like `blur`, `focus`, `resize`, `scroll` (depending on browser) do not bubble up. Delegation cannot be used directly for these (though `focusin`/`focusout` bubble).
2. **`stopPropagation`:** If a child element actually has a listener that calls `e.stopPropagation()`, the event will never reach the parent, breaking the delegation.

### 6. Behavior vs. Target (Implementation Detail)

When using delegation, always verify the `e.target`.

- If the user clicks the *border* or *padding* of the parent `<ul>` (not on an `<li>`), the `e.target` will be the `<ul>` itself.
- **Fix:** Always wrap logic in a condition: `if (e.target.tagName === 'LI') { ... }`.
