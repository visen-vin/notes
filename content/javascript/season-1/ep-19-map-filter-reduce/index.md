# Ep. 19: map, filter & reduce

These are the most important Higher-Order Functions for array manipulation in JavaScript.

### 1. map()

**Purpose:** To **transform** an array.
It iterates over each element, applies a function, and returns a **new array** of the same length.

**Example:** Double the values.

```javascript
const arr = [5, 1, 3, 2, 6];

// Transformation Logic
function double(x) {
    return x * 2;
}

const output = arr.map(double);
console.log(output); // [10, 2, 6, 4, 12]

// Arrow Function Syntax
const binary = arr.map((x) => x.toString(2));
console.log(binary); // ["101", "1", "11", "10", "110"]
```

### 2. filter()

**Purpose:** To **filter** elements inside an array.
It iterates over the array and returns a **new array** containing only the elements that satisfy the condition (return `true`).

**Example:** Filter odd numbers.

```javascript
const arr = [5, 1, 3, 2, 6];

function isOdd(x) {
    return x % 2; // Returns 1 (truthy) for odd, 0 (falsy) for even
}

const oddArr = arr.filter(isOdd);
console.log(oddArr); // [5, 1, 3]

// Arrow Function Syntax (Values > 4)
const greaterThan4 = arr.filter((x) => x > 4);
console.log(greaterThan4); // [5, 6]
```

### 3. reduce()

**Purpose:** To take all elements of an array and **reduce** them to a **single value** (e.g., sum, max number, an object).

**Syntax:**

```javascript
arr.reduce(function(accumulator, current) {
    // Logic
}, initialValue);
```

- **`accumulator` (acc):** The result built so far (like `sum` variable).
- **`current` (curr):** The current element of the array being processed.
- **`initialValue`:** The starting value of the accumulator.

**`Example 1: Sum of Array`**

```javascript
const arr = [5, 1, 3, 2, 6];

const sum = arr.reduce(function(acc, curr) {
    acc = acc + curr;
    return acc;
}, 0); // 0 is the initial value of 'acc'

console.log(sum); // 17
```

**`Example 2: Find Max Value`**

```javascript
const max = arr.reduce(function(max, curr) {
    if (curr > max) {
        max = curr;
    }
    return max;
}, 0);

console.log(max); // 6
```

### 4. Tricky Interview Examples (Chaining)

Given an array of user objects:

```javascript
const users = [
    { firstName: "Akshay", lastName: "Saini", age: 26 },
    { firstName: "Donald", lastName: "Trump", age: 75 },
    { firstName: "Elon", lastName: "Musk", age: 50 },
    { firstName: "Deepika", lastName: "Padukone", age: 26 },
];
```

**Task 1: List of Full Names**

```javascript
// Map: Returns one value per item
const fullNames = users.map((x) => x.firstName + " " + x.lastName);
console.log(fullNames);
// Output: ["Akshay Saini", "Donald Trump", ...]
```

**Task 2: Count of people with same age (Output: `{ 26: 2, 75: 1, 50: 1 }`)**
This requires **reduce** because we want *one* object from an array.

```javascript
const report = users.reduce((acc, curr) => {
    if (acc[curr.age]) {
        acc[curr.age] = ++acc[curr.age];
    } else {
        acc[curr.age] = 1;
    }
    return acc;
}, {}); // Initial value is an empty object {}

console.log(report);
```

**Task 3: First Name of all people whose age < 30**
This is typically solved by **`Chaining** (filter then map).`

```javascript
const youngPeople = users.filter((x) => x.age < 30).map((x) => x.firstName);
console.log(youngPeople); // ["Akshay", "Deepika"]
```

**Challenge:** Implement Task 3 using *only* `reduce`.

```javascript
const youngPeopleReduce = users.reduce((acc, curr) => {
    if (curr.age < 30) {
        acc.push(curr.firstName);
    }
    return acc;
}, []); // Initial value is empty array
```