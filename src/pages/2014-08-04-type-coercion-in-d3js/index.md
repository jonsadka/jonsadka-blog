---
path: "/type-coercion-in-d3js"
date: "1407135600000"
published: true
tags: ["D3.js", "JavaScript"]
title: "Type coercion in D3.js"
---

D3.js is an amazing platform that allows software engineers to bind data to each DOM element that exists, or will be, created.  This data can then be used to compile graphs, charts, or any other visual means. Last week, I had the opportunity to play around with D3.js and created a simple little game [(click to play watchout!)](http://jonsadka.github.io/watchout).  During that time, I discovered that D3.js does this funny thing with type coercion; when you try to add two numbers obtained from element attributes, it returns a string.

Let’s look at the following example.  Suppose we wanted to create a game and add two objects, an enemy object and a player object.  And suppose we wanted the game to end when the enemy collides with the player.  One way to do this is to calculate the distance between the two objects; if the distance between the two is less than 1/2 their width (or the radius in the instance of a circle), then the two objects have collided.

### Collision example

Below, let’s create the player and the red-colored enemy:

```javascript
d3.select('body').selectAll('player')
  .data([[]]).enter().append('circle')
  .attr("class", "player")
  .attr('cx', 200 ).attr('cy', 200 )
  .attr('r', 10)
```

```javascript
d3.select('body').selectAll('enemy')
  .data( [[]] ).enter().append('circle')
  .attr("class", "enemy")
  .attr('cx', 100).attr('cy', 100)
  .attr('r', 15 )
  .attr('fill','red')
```

Now that the players are created, we know that the distance between the two can be achieved using the [Pythagorean Theorem](http://en.wikipedia.org/wiki/Pythagorean_theorem) ( length = sqrt(  Δx^2 +  Δy^2  ) ).  Now this length, must be less than the addition of their two radii’s for there to be a collision.  We can get the radii of the enemy and the player as follows:

```javascript
const playerSize = d3.select('.player').attr('r');
const enemySize = d3.select('.enemy').attr('r');
const collideDistance = playerSize + enemySize;
```

But wait! What happened to our collide distance variable and why is it 1015?  Turns out, D3.js treats `playerSize` and `enemySize` as strings and adds them instead of adding two numbers. We can correct this and get `collideDistance` to be 25 (i.e. 10 + 15) by forcing type coercion by adding a plus sign in front of each variable to declare them as numbers.

```javascript
const collideDistance = +playerSize + +enemySize;
```

As an aside, the above is similar to below, but is more concise.

```javascript
const collideDistance = Number(playerSize) + Number(enemySize);
```

D3.js is a powerful resource in manipulating data and provides developers with a tremendous amount of flexibility.  There are a lot of helpful resources on the web and the creator, Mike Bostock, has done a fantastic job of compiling and documenting a lot of examples.  Creating the game was fairly straightforward and it’s quite easy to pickup. I encourage all of you to try out D3.js.
