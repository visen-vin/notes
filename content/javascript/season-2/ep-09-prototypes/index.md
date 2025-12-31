# Ep. 9: Prototype & Prototypal Inheritance

### 1. The Core Concept

- **Inheritance in JS:** Unlike Classical Inheritance (Classes) in languages like Java/C++, JavaScript uses **Prototypal Inheritance**.
- **The Rule:** "One object trying to access methods and properties of another object."

### 2. What is a Prototype?

Whenever you create any object, function, or array in JavaScript, the JS Engine automatically attaches a hidden property to it.

- This hidden property is called `[[Prototype]]` (accessible in browsers as `__proto__`).
- This `__proto__` is simply a reference to another **Object**.

### 3. The Prototype Chain

When you try to access a property on an object, the engine searches in the following order:

1. **Direct Property:** Is it on the object itself?
2. **Prototype:** If not, look at the object's `__proto__`.
3. **Parent's Prototype:** If not there, look at `__proto__.__proto__`.
4. **End of Chain:** This continues until `__proto__` is `null`.

### 4. Visualizing the Chain

```javascript
let arr = ["Akshay", "Aditya"];
```

1. `arr` is an Array.
2. `arr.__proto__` is equal to `Array.prototype`. (Contains methods like `.map`, `.filter`, `.length`).
3. `arr.__proto__.__proto__` is equal to `Object.prototype`. (Since Array is also an Object).
4. `arr.__proto__.__proto__.__proto__` is `null`. (End of chain).

**Equivalent for Functions:** `fun.__proto__` -> `Function.prototype` -> `Object.prototype` -> `null`

**Equivalent for Objects:** `obj.__proto__` -> `Object.prototype` -> `null`

### 5. Implementing Inheritance (The Interview Demo)

You can manually set the prototype of one object to another to share properties.

```javascript
let object1 = {
    name: "Akshay",
    city: "Dehradun",
    getIntro: function() {
        console.log(this.name + " from " + this.city);
    }
};

let object2 = {
    name: "Aditya"
};

// ⚠️ NEVER do this in production (Performance penalty)
// For Interview demonstration only:
object2.__proto__ = object1;
```

**Result:**

- `object2.name` -> "Aditya" (Found directly on object2).
- `object2.city` -> "Dehradun" (Not on object2, found on `object2.__proto__` which is object1).
- `object2.getIntro()` -> Prints "Aditya from Dehradun".
    - **Crucial:** The `this` keyword inside `getIntro` points to `object2` (the object calling the method), even though the method exists on `object1`.

### 6. Everything is an Object

Eventually, the prototype chain of Arrays, Functions, and custom Objects leads back to `Object.prototype`. This is why we say "Everything in JavaScript is an Object" (or behaves like one).
