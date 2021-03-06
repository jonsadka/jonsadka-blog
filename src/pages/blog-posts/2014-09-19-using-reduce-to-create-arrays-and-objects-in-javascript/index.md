---
path: "/blog/using-reduce-to-create-arrays-and-objects-in-javascript"
date: "1411110000000"
published: true
tags: ["JavaScript"]
title: "Using .reduce() to create arrays and objects in JavaScript"
---

I love functional programming and things just got better because of reduce and reduceRight. In ECMAScript5.1, the Ecma integrated some really common array mutation operations from some popular libraries (underscore, lodash, etc.) and made them available natively in JavaScript. The two that I really love are `Array.reduce()` and `Array.reduceRight()` because of their flexibility and adaptability. These reduce functions iterate through each item in the array, while providing the previously calculated value, current value, index, and original array at each step. Additionally, these values allow you to pass in a start value if desired. In some languages, this operation is called folding.

However, something very unintuitive can be done with these reducing functions…something that was probably not intended. What if you could build arrays and objects using these functions instead of collapsing arrays? This would then turn into one impressive superfunction! Luckily, you can do just that using `Array.reduce()` and `Array.reduceRight()` so let’s take a look at an example.

## Range example

Lets try to write a range function that takes three arguments, a start, end and step value, and returns an array containing all the numbers, inclusively, which increases at a specified step value. The function call `range(1, 10, 2)` should return `[1, 3, 5, 7,9]`.

### Implement using loops

A straight-forward approach to this example would be to create the array using a for loop as exemplified below:

```javascript
var createWithLoop = function(start, stop, step){
  step  = step || 1;
  var result = [];

  for (var i = start; i <= stop; i += step ){
    result.push(i);
  }

  return result;
}
```

### Implement using .reduce()

Now that we got that out of the way, let’s take a look at the example that implements `.reduce()`. Before we begin, let me quickly explain the ideology. To create an array (or object) using reduce, we first must pass in an empty array (or object if we see fit) as the initial value. Then within each step of reduce, we perform the desired operation on the passed in array (or object) and return the newly mutated array (or object).

To start, let’s setup our example. When using `.reduce()`, or any other array method, one must realize that these operations only operate based on the length of the array. For example, if array we are operating on has a length of ten, and we call reduce on this array, reduce will operate ten times on this array. Because of this, we need to initialize an array with the desired length.

```javascript
var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );
};
```

Now, `iterationCount` is an empty array with our desired length and we can call our reduce function on this array. However, we know that we somehow need to get a newly created array out of this reduce call. This can be achieved by passing in an empty array into the start argument of reduce.

```javascript
var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  iterationCount.reduce(function(previousValue, currentValue, index){},[] );
};
```

Now, we know that we have the exact number of cycles and the desired start value, so the rest is easy!

```javascript
var createWithReduce = function(start, stop, step){
   step = step || 1;
   var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue.push( start + index * step );
    return previousValue;
  },[] );
};
```

And finally, we need to return the result of the reduce call.

```javascript
var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue.push( start + index * step );
    return previousValue;
  }, [] );
};
```

### Execution breakdown at each step

previousValue | currentValue | index | return value
------------ | ------------- | ------------- | -------------
first call  | `[]` | 0 | `[1]`
second call | `[1]` | 1 | `[1,3]`
third call  | `[1,3]` | 2 | `[1,3,5]`
fourth call | `[1,3,5]` | 3 | `[1,3,5,7]`
fifth call  | `[1,3,5,7]` | 4 | `[1,3,5,7,9]`

### Implement reduce using objects

Alternatively, if we wanted to create an object instead of an array, we could use a similar logic and do the following:


```javascript
var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue[start + index * step] = start + index * step ;
    return previousValue;
  }, {} );
};
```
