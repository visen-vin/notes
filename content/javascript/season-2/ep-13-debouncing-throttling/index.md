# Ep. 13: Debouncing & Throttling in JavaScript

## Overview

This document covers **Debounce** and **Throttle** patterns in JavaScript: what they are, when to use each, step-by-step implementations, variants (leading/trailing/rAF), real-world examples, best practices, and handy copy-paste utilities for revision.

# 1. Debouncing

## 🔹 What is Debouncing?

**Debouncing** ensures a function runs **only after a specified period of inactivity**. If the event keeps firing, the timer resets and the function is postponed until events stop for the delay.

**Core idea:** wait until the user stops triggering events.

## 🔹 When to use Debounce

- Search input (fire API after user stops typing)
- Form validation (run after user finishes)
- Auto-save that should trigger when typing stops
- Resize end logic (if you want final state only)

## 🔹 Simple Debounce Implementation

```javascript
function debounce(fn, delay = 300) {
  let timerId;
  return function (...args) {
    const context = this;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
```

## 🔹 Debounce with Immediate Option (leading)

```javascript
function debounceImmediate(fn, delay = 300, immediate = false) {
  let timerId;
  return function (...args) {
    const context = this;
    const callNow = immediate && !timerId;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) fn.apply(context, args);
    }, delay);
    if (callNow) fn.apply(context, args);
  };
}
```

- `immediate = true` → run on leading edge, then debounce subsequent calls.

## 🔹 Cancel & Flush (advanced)

```javascript
function debounceWithControl(fn, delay = 300) {
  let timerId;
  const debounced = function (...args) {
    const context = this;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      fn.apply(context, args);
    }, delay);
  };
  debounced.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
  debounced.flush = function () {
    if (timerId) {
      clearTimeout(timerId);
      const lastTimer = timerId;
      timerId = null;
      fn.apply(null, []); // optional: you may want to store last args/context
    }
  };
  return debounced;
}
```

- `cancel()` cancels pending invocation.
- `flush()` forces execution immediately (customize to pass last args/context).

# 2. Throttling

## 🔹 What is Throttling?

**Throttling** ensures a function runs at most **once every X milliseconds** while events may continue to fire. It limits the rate of execution.

**Core idea:** allow periodic execution during continuous events.

## 🔹 When to use Throttle

- Scroll handlers (update position, lazy load)
- Resize listeners (recompute layout at fixed interval)
- Mousemove tracking (limit updates)
- Analytics/event batching (rate-limited pings)

## 🔹 Simple Throttle (Timestamp method — leading)

```javascript
function throttle(fn, wait = 200) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

- Executes immediately on first call, then at most once per `wait`.

## 🔹 Timer-based Throttle (trailing)

```javascript
function throttleTrailing(fn, wait = 200) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(context, args);
    }, wait);
  };
}
```

- Schedules executions spaced by `wait`, typically trailing behavior.

## 🔹 Configurable Throttle (leading + trailing)

```javascript
function throttleConfig(fn, wait = 200, options = { leading: true, trailing: true }) {
  let timer = null;
  let lastCallTime = 0;
  let lastArgs;
  let lastThis;

  return function (...args) {
    const now = Date.now();
    lastArgs = args;
    lastThis = this;
    const remaining = wait - (now - lastCallTime);

    if (remaining <= 0 || lastCallTime === 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastCallTime = now;
      if (options.leading) fn.apply(lastThis, lastArgs);
    } else if (!timer && options.trailing) {
      timer = setTimeout(() => {
        timer = null;
        lastCallTime = options.leading ? Date.now() : 0;
        fn.apply(lastThis, lastArgs);
      }, remaining);
    }
  };
}
```

- Mirrors utilities like Lodash's `_.throttle`.

## 🔹 requestAnimationFrame Throttle (rAF)

Useful for visual updates tied to rendering:

```javascript
function rafThrottle(fn) {
  let ticking = false;
  return function (...args) {
    const context = this;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        fn.apply(context, args);
        ticking = false;
      });
    }
  };
}
```

- Runs once per animation frame (good for DOM updates, scroll-linked animations).

## 🔹 Cancel & Flush for Throttle

```javascript
function throttleWithControl(fn, wait = 200) {
  let timer = null;
  let lastArgs, lastThis;

  const throttled = function (...args) {
    lastArgs = args;
    lastThis = this;
    if (!timer) {
      fn.apply(lastThis, lastArgs);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };

  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  throttled.flush = function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      fn.apply(lastThis, lastArgs);
    }
  };

  return throttled;
}
```

# 3. Debounce vs Throttle — Quick Comparison

| Aspect | Debounce | Throttle |
| --- | --- | --- |
| Executes when | After inactivity | At most once per interval |
| Use case | Final action after typing | Periodic updates during scroll |
| Behavior | Delays until events stop | Spreads executions over time |
| Good for | Search, validation, final save | Scroll, resize, animation updates |

# 4. Step-by-Step Approach to Implement (Both)

1. **Clarify requirement**: do you need final-only (debounce) or periodic updates (throttle)?
2. **Choose mechanism**: `setTimeout` or `Date.now()` / `requestAnimationFrame`.
3. **Preserve context**: use `.apply(this, args)` to keep `this`.
4. **Implement options**: leading, trailing, cancel, flush.
5. **Cleanup timers**: in components (e.g., React), clear timeouts on unmount.
6. **Test**: verify leading/trailing behavior, ensure no memory leaks.

# 5. Real-World Examples

- **Debounce**
    - Search autocomplete (trigger API after user stops typing).
    - Form validation messages after user stops typing.
    - Auto-save drafts after user stops editing.
- **Throttle**
    - Updating visible element position on scroll (once per 100ms).
    - Resize handler to recalc layout periodically.
    - Mouse movement for drawing apps (limit updates).
    - Batching analytics calls every N ms.

# 6. Best Practices & Pitfalls

- **Choose correct delays**: typing: 200–400ms; UI animation: 16–50ms (rAF); scroll: 50–200ms.
- **Prefer rAF** for animation/paint-related tasks.
- **Avoid overly long waits** that make UI feel laggy.
- **Clear timers** on unmount in frameworks (React `useEffect` cleanup).
- **Provide cancel/flush** for better control in complex apps.
- **Keep utilities pure**: return functions that manage internal state without global side effects.

# 7. Cheat Sheet (copy-paste)

```text
- Debounce: run after user stops; use setTimeout & clearTimeout.
- Throttle: run at most once per interval; use timestamp or timer.
- rAF throttle: sync to browser frames for visuals.
- Use debounce for input/search; throttle for scroll/resize.
- Implement leading/trailing depending on UX requirement.
```

# 8. Copy-Paste Implementations (All-in-one)

```javascript
// Debounce (simple)
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    const ctx = this;
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(ctx, args), delay);
  };
}

// Throttle (timestamp)
function throttle(fn, wait = 200) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, args);
    }
  };
}

// rAF Throttle
function rafThrottle(fn) {
  let ticking = false;
  return function (...args) {
    const ctx = this;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        fn.apply(ctx, args);
        ticking = false;
      });
    }
  };
}
```

# 9. React Reminder (cleanup)

If you use these inside React components, clear timers on unmount:

```javascript
useEffect(() => {
  const handler = debounce(() => { /*...*/ }, 300);
  window.addEventListener('resize', handler);
  return () => {
    handler.cancel?.(); // if you implemented cancel
    window.removeEventListener('resize', handler);
  };
}, []);
```

# 10. Further Reading

- Lodash docs (`_.debounce`, `_.throttle`) — reference for robust, battle-tested implementations.
- MDN: `setTimeout`, `clearTimeout`, `requestAnimationFrame`.
- Performance guides on handling scroll and resize efficiently.

**End of notes — quick, consolidated, and ready for revision.**
