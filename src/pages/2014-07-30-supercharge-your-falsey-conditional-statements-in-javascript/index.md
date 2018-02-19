---
path: "/supercharge-your-falsey-conditional-statements-in-javascript"
date: "1406703600000"
published: true
tags: ["JavaScript"]
title: "Supercharge your falsey && conditional statements in JavaScript"
---

Over the past few days, I have discovered the large potential of falsey values (`false`, `0`, `""`, `null`, `undefined`, `NaN`) to provide direction and simplify code in javascript.  If used correctly, one can replace multi-line logical expressions with logical operator expressions.

### Counting example

To exhibit this point, let’s take a look at the example of decrementing a number variable named `count`.  In this example, when `count` reaches zero, we want the program to stop decrementing `count`, as exhibited below.

```javascript
if ( count > 0 ){
  count--;
}
```

However, a subtle simplification can be made in line 1 using our understanding of fasey values; when the value of `count` changes to zero, the evaluation of `count` returns false because because zero is a falsey value.  Therefore, we could rewrite the example as follows:

```javascript
if ( count ){
  count--;
}
```

### Reasoning

The reason these two examples reach the same outcome is because if `count` is a number greater than zero, it is inherently non-falsey and will therefore evaluate to true.  Alternatively, if `count` is set to zero, the statement will evaluate to false and `count` will stop decrementing.  Although our line count does not change between the two examples, this fundamental understanding that falsey values evaluate to false is essential to continue.  Next, we need to understand how logical operators function within javascript.  For this example, let’s analyze the and (`&&`) evaulation.  The following four conditions are possible using the `&&` evaluation:

1. `true && true;`      returns the second truthy case
2. `true && false;`     returns the falsey case
3. `false && true;`     returns the falsey case
4. `false && false;`    returns the first falsey case

Now, when we combine falsey values and logical operators, we see how the above example can be rewritten and simplified to the following single-line logical expression:

```javascript
count && count--;
```

If the value of `count` is greater than zero, `count` evaluates to true; however, the expression of decrementing the `count` variable is also true, therefore javascript returns the second truthy condition, i.e. decrementing the `count` variable.  When the `count` variable reaches zero, we now trigger a false condition and this line will essentially be skipped by javascript.  The table below depicts an example of this scenario where `count` is initially set to 5.

`count` value pre-invocation | evaluation of `count && count–` | returned value | `count` value post-invocation
------------ | ------------- | ------------- | -------------
`5` | `true && true` | `true` (count–) | `4`
`4` | `true && true` | `true` (count–) | `3`
`3` | `true && true` | `true` (count–) | `2`
`2` | `true && true` | `true` (count–) | `1`
`1` | `true && true` | `true` (count–) | `0`
`0` | `false && true` | `false` (count) | `0`
`0` | `false && true` | `false` (count) | `0`

### Summary
Additionally, below are two fully functioning recursive examples, one using the traditional approach (`example1`) and one using the simplified method described (`example2`).

```javascript
var example1 = function(count){
  if ( count === 0 ){
    return (“Finished decrementing!”);
  } else {
    count--;
  }
  console.log(count);
  example1(count);
};

example1(5);
```

```javascript
var example2 = function(count){
  if ( count && count-- ) {
    console.log(count);
    example2(count);
  }
  return (“Finished decrementing!”);
};

example2(5);
```
