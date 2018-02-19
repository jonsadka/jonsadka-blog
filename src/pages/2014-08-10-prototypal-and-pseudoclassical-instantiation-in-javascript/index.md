---
path: "/prototypal-and-pseudoclassical-instantiation-in-javascript"
date: "1407654000000"
published: true
tags: ["JavaScript"]
title: "Prototypal and pseudoclassical instantiation in JavaScript"
---

In JavaScript, there are four ways to instantiate a new object. This blog post will cover the differences between the prototypal and pseudoclassical instantiation patterns; functional decorator and functional-shared instantiation patterns will not be covered in this post. While prototypal and pseudoclassical instantiations reach the same end goal, prototypical instantiation requires that the object be explicitly created and returned, whereas the pseudoclassical instantiation pattern does this by insertion of the keyword `new` in front of the class name. Let’s establish an example in which we want to create a red balloon objects containing a location property `loc` and a method to make the balloon move higher called `move`.

### Prototypical class instantiation

```javascript
var Balloon = function( loc ){
  var obj = Object.create( Balloon.prototype );
  obj.loc = loc;
  return obj;
};
Balloon.prototype.move = function(){ this.loc++ };

var redBalloon = Balloon( 1 );
redBalloon.move();
```

### Pseudoclassical class instantiation

```javascript
var Balloon = function( loc ){
  this.loc = loc;
};
Balloon.prototype.move = function(){ this.loc++ };


var redBalloon = new Balloon( 1 );
redBalloon.move();
```

### Comparison
As you can see from the above examples, the two look very similar; however, the prototypical pattern explicitly creates and returns an object created within the function while the pseudoclassical pattern makes use of the keywords this and new and does not appear to return anything… so what’s really going on in the pseudoclassical pattern?…pretty much the same thing with some visual cleanup. First, a new object is created which inherits the prototypes from the parent object; in this example, the `move` prototype. This makes `move` accessible on the newly created object.

```javascript
var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
};
Balloon.prototype.move = function(){ this.loc++ };
```

Second, it binds the keyword `this` to the new object being created and thus gives the new object all the properties specified in the old object; in this example, `redBalloon` is given a `loc` property.

```javascript
var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
  this.loc = loc;
};
Balloon.prototype.move = function(){ this.loc++ };
```

And last, it returns the newly created object with the properties and prototypes described in the steps above.

```javascript
var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
  this.loc = loc;
  return this;
};
Balloon.prototype.move = function(){ this.loc++ };
```

As you can see, pseudoclassical instantiation and prototypical instantiation and pretty much identical in terms of function but one allows you to clean up code a bit and looks a bit fancier.

