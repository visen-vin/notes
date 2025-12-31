# Ep 1: 🚀 Inception! (Namaste React)

## 📌 How to Use These Notes

* Follow the Namaste React series from Episode 1
* Each episode builds on the previous one
* Watching Akshay Saini’s video first makes these notes easier to understand

---

## 🧭 Namaste React Journey

In this course, we learn how **React concepts are applied in real-world industry projects**.

Are you ready to fall in love with React? ❤️

---

## ⚛️ What is React?

React is a **JavaScript library** for building user interfaces.

### Why is it called “React”?

Because it allows developers to **react to changes in state and data**, updating the UI efficiently and declaratively.

---

## 📚 What is a Library?

A library is a collection of prewritten code that:

* Can be reused
* Speeds up development
* Reduces errors

**Examples:**

* React
* jQuery

---

## 🏗️ What is a Framework?

A framework provides a **basic structure or foundation** for an application.

**Example:**

* Angular

---

## 🤝 Library vs Framework

### Similarities

* Both are written by third parties
* Solve common problems
* Improve performance

### Key Difference — Inversion of Control

* **Library:** Developer controls when to call it
* **Framework:** Framework controls the flow and calls your code

---

## ✨ Emmet

Emmet is a developer toolkit that expands shortcuts into **HTML and CSS boilerplate code**.

---

## 👋 Hello World — HTML Only

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="root">
      <h1>Hello World using only HTML!</h1>
    </div>
  </body>
</html>
```

---

## 👋 Hello World — JavaScript Only

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <div id="root"></div>

    <script>
      const heading = document.createElement("h1");
      heading.innerHTML = "Hello World using JavaScript!";

      const root = document.getElementById("root");
      root.appendChild(heading);
    </script>
  </body>
</html>
```

---

## 👋 Hello World — React Only

```html
<body>
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

  <script>
    const heading = React.createElement("h1", {}, "Hello World from React!");
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(heading);
  </script>
</body>
```

---

## 🌐 What is `crossorigin`?

The `crossorigin` attribute enables **CORS (Cross-Origin Resource Sharing)**, allowing scripts from another origin to access server resources.

---

## ❓ What does `{}` mean in React?

Anything passed inside `{}` becomes **attributes of the element**.

Example:

```javascript
React.createElement("h1", { id: "title" }, "Hello World");
```

---

## ⚠️ Important Note

> React **overwrites everything inside the `root` element** with whatever is passed into `render()`.

---

## 🔁 HTML to React Conversion

### HTML

```html
<div id="root">
  <h1 id="title">Hello World!</h1>
</div>
```

### React

```javascript
const heading = React.createElement(
  "h1",
  { id: "title" },
  "Hello World!"
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
```

---

## 🧱 Nested HTML Structure

### HTML

```html
<div id="parent">
  <div id="child1">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </div>
  <div id="child2">
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
  </div>
</div>
```

### React (Concept)

This structure is created using **nested `React.createElement` calls**, which quickly becomes hard to read — this is why **JSX exists**.

---

## 🎯 Interview-Focused Notes (EP-1)

### 1️⃣ What is React?

**Answer:** React is a JavaScript library for building user interfaces using a declarative, component-based approach.

**One-liner:** React manages UI efficiently by reacting to state changes.

---

### 2️⃣ Why is React called React?

**Answer:** Because it reacts to changes in state and data and updates the UI accordingly.

---

### 3️⃣ Library vs Framework — Key Difference?

**Answer:** Inversion of Control.

* Library → You call it
* Framework → It calls you

**Interview Tip:** Always mention *Inversion of Control* explicitly.

---

### 4️⃣ Why React over Vanilla JavaScript?

* Cleaner UI abstraction
* Better state management
* Easier to scale
* Avoids manual DOM manipulation

---

### 5️⃣ What does `React.createElement` return?

**Answer:** A plain JavaScript object (React Element), not actual HTML.

---

### 6️⃣ What is the `root` element in React?

**Answer:** It is the container where React renders and manages the entire UI.

**Important:** React replaces everything inside `root`.

---

### 7️⃣ What is `crossorigin` and why is it needed?

**Answer:** It enables CORS so scripts loaded from another domain can access required resources securely.

---

### 8️⃣ What does `{}` mean in `React.createElement`?

**Answer:** It represents the props/config object used to pass attributes like `id`, `className`, etc.

---

### 9️⃣ Why is nested `createElement` bad?

**Answer:** It becomes unreadable and hard to maintain.

**This directly led to JSX.**

---

### 🔥 Rapid-Fire One-Liners

* React is **not a framework**
* React uses a **virtual representation of UI**
* JSX is **syntactic sugar**, not mandatory
* React elements are **immutable**

---

### 🧠 Interviewer Mindset

If you explain:

* *Why React exists*
* *Problems it solves*
* *Trade-offs vs vanilla JS*

You sound senior, not tutorial-trained.
