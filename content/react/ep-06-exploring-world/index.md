# Ep 6: 🌍 Exploring the World (Namaste React)

> **Series:** Namaste React  
> **Focus:** Microservices, data fetching, `useEffect`, CORS, Shimmer UI, search & filtering

---

## 🎯 Episode Objective

This episode explains **how modern frontend apps talk to the outside world**. You’ll understand architectural patterns (Monolith vs Microservices) and then implement **real API-driven UI** using `useEffect`, loaders, search, and filters.

---

## 🧠 Part 1: Architecture Basics

### Monolithic Architecture
A **single massive codebase** where everything lives together: UI, APIs, Database, Auth, and Notifications.

#### Problems
* ❌ Hard to understand & maintain
* ❌ Full redeploy for small changes
* ❌ Slow startup & poor scalability
* ❌ One bug can crash everything

---

### Microservices Architecture
Split the application into **small, independent services** like User Service, Payment Service, and UI Service.

#### Benefits
* ✅ Independent development & deployment
* ✅ Tech flexibility per service
* ✅ Clear separation of concerns

Each service runs on its **own port** and communicates via **REST / messaging**.

---

## 🌐 Part 2: Connecting React to the External World

Earlier we used **mock data**. Now we fetch **real-time data** from the Swiggy API.

### Two Data Fetching Strategies
1. **Load → Fetch → Render**: The user sees a blank screen until everything arrives.
2. **Render → Fetch → Re-render** ✅: React renders a fast "skeleton" UI, then updates when data arrives. This is the **React Way**.

---

## 🪝 Part 3: `useEffect()` Hook

The `useEffect` hook runs **after the component renders**. This makes it perfect for API calls.

```javascript
import { useEffect } from "react";

useEffect(() => {
  // side effect logic
}, []);
```

* Callback runs **after render**.
* Empty dependency array `[]` → runs **only once** (on initial mount).

---

## 📡 Fetching Data from API

```javascript
const fetchData = async () => {
    try {
        const data = await fetch("YOUR_API_URL");
        const json = await data.json();
        
        // Update state with API data
        setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

useEffect(() => {
    fetchData();
}, []);
```

### ❌ What is a CORS Error?
Browsers block requests made to **different origins** (e.g., from `localhost` to `swiggy.com`) for security reasons. For learning, you can use a **CORS proxy** or browser extension.

---

## ⏳ Part 4: Loading States & Shimmer UI

API calls take time. Instead of showing a blank screen or a "Loading..." text, we use **Shimmer UI**.

```javascript
if (listOfRestaurant.length === 0) {
  return <Shimmer />; // Fake skeleton UI
}

return <div className="body">...</div>;
```
This is called **conditional rendering**.

---

## 🔍 Part 5: Search Functionality

To build search, we use **controlled inputs** where React state controls the value.

```javascript
const [searchText, setSearchText] = useState("");

<input
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
/>
```

### 🧠 Important: Original vs Filtered Data
If you filter the `listOfRestaurant` array directly, you lose the original list.

**The Solution:** Maintain **two states**.
```javascript
const [listOfRestaurant, setListOfRestaurant] = useState([]); // original master list
const [filteredRestaurant, setFilteredRestaurant] = useState([]); // list used for UI
```
1. Fetch data → set both states.
2. Search → filter the master list, but update the UI state.

---

## ✅ Key Takeaways
* `useEffect` is for side effects like API calls and runs after render.
* **Shimmer UI** provides a better user experience than "Loading" text.
* Always separate **original data** from **derived UI state** when implementing filters/search.
* React's **reconciliation** keeps the UI in sync with the state efficiently.

---

## 🚀 What's Next?
In Episode 7, we'll explore **React Router** to add multiple pages and navigation to our app!
