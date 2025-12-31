# Ep. 2: Promises

### 1. What is a Promise?

- **Formal Definition:** A Promise is an object representing the **eventual completion** (or failure) of an asynchronous operation and its resulting value.
- **Simple Definition:** A container for a future value.
- **States:** A Promise is always in one of three states:
    1. **Pending:** Initial state (operation hasn't completed yet).
    2. **Fulfilled (Resolved):** Operation completed successfully.
    3. **Rejected:** Operation failed.

### 2. Solving Inversion of Control

Recall the "Bad" Callback approach:

```javascript
createOrder(cart, function(orderId) {
    proceedToPayment(orderId);
});
```

We *hope* `createOrder` calls our callback. We gave it control.

**The Promise Approach:**

```javascript
const promise = createOrder(cart);

promise.then(function(orderId) {
    proceedToPayment(orderId);
});
```

- **Control:** We are **not** passing our callback to `createOrder`.
- **Flow:** `createOrder` returns a Promise object immediately (in `pending` state).
- **Execution:** We attach our callback to that Promise object using `.then()`.
- **Guarantee:** The Promise guarantees it will call our function **only once** whenever the data is ready. We have regained control.

### 3. Solving Callback Hell (Promise Chaining)

Instead of nesting callbacks (pyramid of doom), we chain promises vertically.

**The "Hell" Way:**

```javascript
createOrder(cart, function(orderId) {
    proceedToPayment(orderId, function(paymentInfo) {
        showOrderSummary(paymentInfo, function() {
            updateWallet();
        });
    });
});
```

**The Promise Chain Way:**

```javascript
createOrder(cart)
    .then(function(orderId) {
        return proceedToPayment(orderId);
    })
    .then(function(paymentInfo) {
        return showOrderSummary(paymentInfo);
    })
    .then(function(balance) {
        return updateWallet(balance);
    });
```

**Crucial Rule:** Always `return` the promise from a `.then()` block to pass the data down the chain.

### 4. Fetch API Example

The `fetch()` API returns a Promise.

```javascript
const GITHUB_API = "https://api.github.com/users/akshaymarch7";

const user = fetch(GITHUB_API); // user is a Promise object

console.log(user); // Promise { <pending> }

user.then(function(data) {
    console.log(data); // Response object (once resolved)
});
```

### 5. Immutability of Promises

Promise objects are immutable.

- Once a promise is resolved, the data inside it cannot be changed by anyone.
- This makes it safe to pass the promise object around to different parts of the code. Everyone will get the same result.