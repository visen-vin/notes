# Ep. 11: setTimeout + Closures Interview Question

### 1. The Famous Interview Question

**Problem:** What does the following code print?

```javascript
function x() {
    for(var i = 1; i <= 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
    console.log("Namaste Javascript");
}
x();
```

**Expected Output (by beginners):** `1` after 1 sec, `2` after 2 secs... `5` after 5 secs.

**Actual Output:**

1. `Namaste Javascript` (printed immediately).
2. `6` (printed after 1 sec).
3. `6` (printed after 2 secs).
4. `6` (printed after 3 secs).
5. `6` (printed after 4 secs).
6. `6` (printed after 5 secs).

### 2. Why does this happen?

It happens because of **`Closures`**.

1. **Memory Reference:** The callback function inside `setTimeout` forms a closure. It remembers the **reference** to the variable `i`, not the *value* of `i` at that specific moment.
2. **Loop Execution:** The loop runs very fast. It schedules 5 timeouts, but by the time the loop finishes (in microseconds), the variable `i` has incremented to `6` (the breaking condition for `i <= 5`).
3. **Callback Execution:** When the timer expires (after 1 second), the callback function runs. It looks up `i`. It sees that `i` is now `6` in the memory location it is pointing to.
4. **Result:** All 5 callbacks point to the *same* memory location of `i`, which holds the value `6`.

### 3. Solution 1: Using `let` (Block Scope)

The easiest fix is to use `let` instead of `var`.

```javascript
function x() {
    for(let i = 1; i <= 5; i++) { // Changed var to let
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
}
x();
```

**Why it works:**

- `let` is **`block scoped`**.
- For **each iteration** of the loop, the `engine creates a **new** copy of the variable i` in that `specific block scope.`
- Each callback function captures a *different* copy of `i` (1, 2, 3, 4, 5).

### 4. Solution 2: Using Closures (The "Old School" Way)

If the interviewer forbids you from using `let` (or asks for the ES5 solution), you must create a new closure scope manually by wrapping the `setTimeout` in another function.

```javascript
function x() {
    for(var i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(function() {
                console.log(x);
            }, x * 1000);
        }
        close(i); // Pass current 'i' as a NEW argument 'x'
    }
}
x();
```

**Why it works:**

- We call the function `close(i)` immediately inside the loop.
- We pass the *current value* of `i` (e.g., 1) as an argument `x`.
- The `close` function creates a **new execution context** (and thus a new scope) for each iteration.
- The `setTimeout` callback now forms a closure with this *new* local variable `x`, which holds the specific value (1, 2, etc.), not the changing global `i`.