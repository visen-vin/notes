# Closures

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
console.log(add5(2)); // 7
```
