---
author: "Olof Sjögren"
date: 2016-12-02
title: Destructuring ES6
---

```javascript
let obj = {
  a: 1,
  b: 2,
  c: { d: 3 },
  e: 4,
  f: 5
};

const {
  a, // assign a to a, e.g. 1
  b: x = 9, // assign b to x, use 9 if b is falsy (b is only used to reach x)
  c: { d } = {}, // d is set to 3 or an empty obj if missing (c only used to reach d)
  ...k
} = obj || {}; // The rest is gathered in k // If obj is falsy set it to obj

console.log("a", a); // 1
console.log("x", x); // 2
console.log("d", d); // 3
console.log("k", k); // { e: 4, f: 5 }
```
