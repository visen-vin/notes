# Ep 3: 🎯 Laying the Foundation (Namaste React)

## 1️⃣ npm vs npx

**npm** → installs & manages dependencies
**npx** → executes packages without global install

**Senior one‑liner:** npm is for dependency management, npx is for execution.

---

## 2️⃣ package.json vs package-lock.json

* **package.json** → desired dependency ranges
* **package-lock.json** → exact resolved versions

**Why it matters:** guarantees same installs across machines.

---

## 3️⃣ Why scripts in package.json?

* Standard project commands
* Team-wide consistency
* Cleaner DX

**Common scripts:**

* `npm start`
* `npm run build`

---

## 4️⃣ What is JSX?

JSX is **HTML-like syntax** used to describe UI declaratively.

**Facts interviewers expect:**

* JSX is **not HTML**
* JSX is **not part of React**
* JSX is **syntactic sugar** for `React.createElement`

---

## 5️⃣ Is JSX valid JavaScript?

**Short:** No for browsers, yes after transpilation.

**Correct explanation:**
Browsers understand ES6+, JSX must be converted before execution.

---

## 6️⃣ JSX compilation flow (Must-know)

JSX → **Babel** → `React.createElement()` → React Element → JS Object → DOM

**Trap:** Babel is **not built by Facebook**.

---

## 7️⃣ Role of Parcel

* Build orchestrator
* Uses Babel internally
* Transpiles before code reaches JS engine

**Interview phrasing:** Parcel delegates transpilation to Babel.

---

## 8️⃣ JSX vs HTML differences

* `class` ❌ → `className` ✅
* kebab-case ❌ → camelCase ✅

---

## 9️⃣ Why `()` in multi-line JSX?

To help **Babel** clearly detect JSX boundaries.

---

## 🔟 React Components

Everything in React is a **component**.

### Types

* Class Components → legacy
* Functional Components → standard

**Definition:** A function that returns JSX.

---

## 1️⃣1️⃣ Rules of Functional Components

* Must start with **Capital letter**
* Must return JSX / React element

---

## 1️⃣2️⃣ Rendering components

```jsx
<Heading />
```

**Why:** Babel understands this syntax.

---

## 1️⃣3️⃣ Component Composition

Using components inside components.

**Why it matters:**

* Reusability
* Clean architecture
* Separation of concerns

---

## 1️⃣4️⃣ JavaScript inside JSX

Use `{}` to evaluate **expressions only**.

* Expressions ✅
* Statements ❌ (`if`, `for`, `while`)

---

## 1️⃣5️⃣ Injecting React Elements in JSX

Use `{}` to inject elements.

---

## 1️⃣6️⃣ Cyclic component calls

Results in **infinite loop → stack overflow → browser crash**.

🚩 Interview red flag.

---

## 1️⃣7️⃣ Advantages of JSX

1. Prevents XSS attacks
2. Better readability
3. Cleaner abstraction
4. Better error messages
5. Safer rendering

---

## 🔥 Rapid-Fire Senior Answers

* JSX improves DX, not runtime speed
* Babel runs before JS engine
* JSX escapes malicious data by default
* JSX is optional, but unavoidable in practice

---

## 🧠 Interviewer Mindset

If you explain:

* Why JSX exists
* How Babel works
* Why Parcel matters

You sound like someone who understands the **React toolchain**, not just React.
