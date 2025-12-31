# Ep 1: Why React?

### 1. Evolution of Frontend
Before React, we mostly used **imperative programming** (e.g., jQuery) to manipulate the DOM.
- We had to tell the browser *exactly* how to change the UI step-by-step.
- This became extremely difficult to manage as apps grew larger.

### 2. Enter React
React introduced **declarative programming**.
- You describe *what* you want the UI to look like based on current state.
- React takes care of *how* to update the DOM efficiently.

### 3. Key Benefits
1. **Component-Based:** Break UI into small, isolated pieces of code.
2. **Virtual DOM:** High performance by minimizing actual DOM manipulation.
3. **Unidirectional Data Flow:** Predictable data management.
4. **Rich Ecosystem:** Huge library support and community.

### 4. Basic Example

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```
