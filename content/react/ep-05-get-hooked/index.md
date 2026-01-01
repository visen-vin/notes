# Ep 5: 🚀 Let’s Get Hooked (Namaste React)

> **Series:** Namaste React  
> **Focus:** React Hooks, project restructuring, exports/imports, and state-driven UI

---

## 🎯 Episode Objective

This episode introduces **React Hooks** and explains **why state is the backbone of dynamic UIs**. You’ll refactor the project structure, learn clean import/export patterns, and build your first **state-driven feature** using `useState`.

---

## 📌 Recap from Previous Episode

* Built a **food ordering app** using real API-like data (Swiggy-style).
* Rendered restaurant cards using `map()`.
* Understood **config-driven UI**.

### ❓ Why React at all?

Yes, everything *can* be built using HTML, CSS, and JavaScript.

**Reality check:**
* React massively improves **developer experience**.
* Makes UIs **predictable, scalable, and maintainable**.
* Handles UI updates efficiently using a smart diffing algorithm.

---

## 🧹 Part 1: Project Restructuring (Industry-Grade Setup)

### ❌ Problem
All components were inside `App.js` → **not scalable**.

### ✅ Solution: Proper Folder Structure
In a production-ready app, we follow a modular structure:

```text
project-root/
│── index.html
│── src/
│   │── App.js
│   │── components/
│   │   │── Header.js
│   │   │── Body.js
│   │   │── RestaurantCard.js
│   │── utils/
│   │   │── constants.js
│   │   │── mockData.js
```

### Key Rules
* All React code lives inside `src/`.
* One component = one file.
* Component files **must start with a capital letter**.
* Use `.js` or `.jsx` for component naming.

---

## 🔁 Export & Import in React

React supports **two types** of exports.

### 1️⃣ Default Export / Import
**Use case:** When a file exports **only one thing**.

```javascript
// Export
const Header = () => {
  return <div>Header</div>;
};
export default Header;

// Import (name can be anything)
import Header from "./components/Header";
```

### 2️⃣ Named Export / Import
**Use case:** When exporting **multiple values from one file**.

```javascript
// constants.js
export const LOGO_URL = "https://...";
export const CDN_URL = "https://...";

// Import (must match name and use curly braces)
import { LOGO_URL, CDN_URL } from "../utils/constants";
```

🧠 You can mix **default + named exports** in the same file.

---

## ⚙️ Part 2: Making the UI Interactive

### Feature Goal
Add a **“Top Rated Restaurants”** button that filters our list.

### Thinking in React
You might try to filter a normal JavaScript array, but notice: **The UI doesn't change.**

**Reason:** React UI does **not react to normal variables**. UI only updates when **state changes**.

---

## 🪝 React Hooks
### What is a Hook?
A Hook is just a **JavaScript function** provided by React that gives your components "special powers" (state, lifecycle, etc.).

### 🔥 useState – The Game Changer
`useState` is used to create **state variables** in functional components.

```javascript
import { useState } from "react";

const [listOfRestaurant, setListOfRestaurant] = useState(mockData);
```

| Part                  | Meaning                  |
| --------------------- | ------------------------ |
| `listOfRestaurant`    | The current state value  |
| `setListOfRestaurant` | The function to update it |
| `mockData`            | The initial value        |

---

## 🚀 Interactive Example: The Filter Button

Try running the code below. Notice how the UI updates immediately when the state changes.

```javascript
const { useState } = React;

const App = () => {
    // 1. Initialize state
    const [restaurants, setRestaurants] = useState([
        { id: 1, name: "Meghana Foods", rating: 4.5 },
        { id: 2, name: "KFC", rating: 4.1 },
        { id: 3, name: "Domino's", rating: 4.3 },
        { id: 4, name: "Burger King", rating: 3.9 }
    ]);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Restaurant List</h2>
            
            {/* 2. Update state on click */}
            <button 
                onClick={() => {
                    const filtered = restaurants.filter(res => res.rating > 4.2);
                    setRestaurants(filtered);
                }}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#fb923c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                Filter Top Rated (4.2+)
            </button>

            <ul>
                {restaurants.map(res => (
                    <li key={res.id}>
                        {res.name} — <strong>{res.rating} ⭐</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

console.log("React app is ready! Click the button above to test useState.");
```

---

## 🧬 React Reconciliation & Fiber

### The Virtual DOM
React keeps a **Virtual DOM** (a lightweight copy of the real DOM). When state changes:
1. React creates a **new Virtual DOM**.
2. It compares it with the **previous Virtual DOM** (this process is called **Diffing**).
3. It finds out exactly what changed and updates **only those parts** in the real DOM.

### React Fiber
**Fiber** is the modern reconciliation engine in React. It allows React to:
* Pause, resume, or restart work on components.
* Prioritize different types of updates (e.g., animations vs. data loading).
* This is why React feels so fast and smooth!

---

## ✅ Key Takeaways
* **State drives UI** — never mutate variables manually to update the view.
* Hooks are simple JavaScript functions but must be called at the **top level**.
* Modular structure (Header, Body, Footer) makes apps maintainable.
* React is efficient because of **Virtual DOM + Reconciliation**.

---

## 🚀 What’s Next?
In the next episode, we will dive into **`useEffect`**, handling real API calls, and the lifecycle of a React component!
