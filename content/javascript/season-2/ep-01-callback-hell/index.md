# Ep. 1: Callback Hell

### 1. Two Parts of Callbacks

Callbacks are powerful, but they have a dark side.

1. **Good Part:** They allow asynchronous programming in JavaScript.
2. **Bad Part:** Using them incorrectly leads to **Callback Hell** and **Inversion of Control**.

### 2. Callback Hell (The Pyramid of Doom)

Imagine an E-commerce website workflow:

1. Create Order (`api.createOrder`)
2. Proceed to Payment (`api.proceedToPayment`)
3. Show Order Summary (`api.showOrderSummary`)
4. Update Wallet (`api.updateWallet`)

Each step depends on the previous one, so we nest the callbacks.

```javascript
const cart = ["shoes", "pants", "kurta"];

api.createOrder(cart, function () {
    api.proceedToPayment(function () {
        api.showOrderSummary(function () {
            api.updateWallet();
        });
    });
});
```

**Why is this bad?**

- **Unreadable:** The code grows horizontally instead of vertically.
- **Unmaintainable:** It forms a "Pyramid of Doom" structure that is hard to debug and manage.

### 3. Inversion of Control

This is a more serious issue than just ugly code.
**Definition:** You lose control of your code when you pass a callback function to another function.

**Example:**

```javascript
api.createOrder(cart, function () {
    api.proceedToPayment();
});
```

- We are giving the control of the `proceedToPayment` function to `createOrder`.
- We act blindly, **trusting** that `createOrder` will call our callback:
    - At the right time.
    - Only once (not twice or zero times).
    - With the correct data.
- If `createOrder` (which might be a 3rd party library) has a bug and never calls our callback, our payment logic *never runs*. We have "inverted" (given away) the control.

### Summary

- **Callback Hell:** Nested callbacks make code unreadable.
- **Inversion of Control:** Passing callbacks gives away control of execution, leading to trust issues.
- **Solution:** Promises (covered in the next episode).