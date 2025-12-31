# Ep. 12: CRAZY JS INTERVIEW ft. Closures

### 1. Data Hiding / Encapsulation

One of the most powerful uses of closures is to **`hide data`** so that variables cannot be `accessed` or `modified directly from outside the function.`

**Without Closure (Not Safe):**

```javascript
var count = 0;
function increment() {
    count++;
}
// Any part of the code can change 'count' to any value!
count = 1000;
```

**With Closure (Data Hidden):**

```javascript
function counter() {
    var count = 0; // Private variable
    return function increment() {
        count++;
        console.log(count);
    }
}

var counter1 = counter();
counter1(); // 1
counter1(); // 2

// console.log(count); // 🔴 ReferenceError (Cannot access private data)
```

### 2. Constructor Functions `(Scalable Counters)`

If you need multiple counters, you can use a `Constructor Function.`

```javascript
function Counter() {
    var count = 0;
    this.increment = function() {
        count++;
        console.log(count);
    }
    this.decrement = function() {
        count--;
        console.log(count);
    }
}

var counter1 = new Counter();
counter1.increment(); // 1
counter1.decrement(); // 0

var counter2 = new Counter(); // Completely separate counter
counter2.increment(); // 1 (Starts from 0 again)
```

### 3. Disadvantages of Closures

While powerful, closures have downsides:

1. **Memory Consumption:** `Variables` in `closures` are **`not** garbage collected` as long as the `closure is active`. They occupy memory even if not actively used.
2. **Memory Leaks:** If closures are not handled properly `(e.g., in event listeners that are never removed),` they can accumulate and slow down the browser.

### 4. Garbage Collection & Smart Garbage Collection

- **Garbage Collector (GC):** A `background program` in the JS engine that `freezes and removes unutilized memory.`
- **Smart GC (V8 Engine):** `Modern engines like V8` are smart about `optimizing closure memory.`

**Example of Smart GC:**

```javascript
function a() {
    var x = 0;
    var y = 100; // Large object
    return function b() {
        console.log(x); // Only 'x' is used here
    }
}
var z = a();
```

- **Theory:** Since `b` is a closure, it should hold references to *all* variables in `a`'s scope (`x` and `y`).
- **Reality (V8):** The engine sees that `y` is never used inside `b`. It creates the closure with `x` but **garbage collects `y`** to save memory.