---
path: "/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3"
date: "1411974000000"
published: true
tags: ["D3.js", "JavaScript"]
title: "How to quickly create randomly generated datasets in JavaScript with D3.js"
---

Often times in JavaScript and D3.js, we want to quickly create randomly-generated, "fake" data on the fly for testing and iterative development.  To help speed things up, we can combine the `d3.range()` operator and the native `Array.map()` prototype to make up large data sets instantly.

### JavaScript Array.map() explained

The `.map()` Array prototype is a function that takes in a callback as the argument and invokes the function on each item in the array.

Suppose we had an array of first names in a family `['Jon','James','Robert','Mary']` and we wanted to give them all the same last name, with `Array.map()` we can do this quickly.


```javascript
var familyMembers = ['Jon','James','Robert','Mary'];
familyMembers = familyMembers.map(function(member){
 return member + ' Sadka';
});

console.log(familyMembers); // logs ["Jon Sadka", "James Sadka", "Robert Sadka", "Mary Sadka"]
```

### D3.js d3.range() explained

D3 has availed a d3.range() function, which creates a numerical array given a specified range (start value and end value) and step size (similar to the blog post I wrote about here http://jonsadka.com/blog/using-reduce-to-create-arrays-and-objects-in-javascript/)

```javascript
d3.range(10); // returns [0,1,2,3,4,5,6,7,8,9,10]
```

Note the above is equivalent to `d3.range(0,10,1)`. If only one argument is provided, D3.js defaults to a start value of 0 and a step size of 1.

### Create data

Now we can method chain the two functions to generate a data collection with desired arrays and values.  For example, if we wanted to generate a collection of 3 arrays, each with 2 random values, we could write the following script:

```javascript
newData = d3.range(3).map(function(){
  return d3.range(2).map(Math.random);
});
```

The following are three concurrent invocations of the function. As you can see, new random data is generated each invocation.

First Call | Second Call | Third Call
----- | ----- | -----
```json
[
  [
    0.8413378541975207,
    0.3325404232023103
  ],
  [
    0.3138091034763348,
    0.3076188833709993
  ],
  [
    0.30112087396986803,
    0.559295264307266
  ]
]
```
|
```json
[
  [
    0.5572082407882554,
    0.043238313709354124
  ],
  [
    0.6398647521766884,
    0.7514103816898313
  ],
  [
    0.33347515710668374,
    0.4137206026025377
  ]
]
```
|
```json
[
  [
    0.15984172239725725,
    0.26185501779977943
  ],
  [
    0.27603102582062555,
    0.8777553496374497
  ],
  [
    0.2583027294068179,
    0.2535044159038138
  ]
]
```

