---
path: "/fight-on-the-power-of-javascript-closures"
date: "1408172400000"
published: true
tags: ["JavaScript"]
title: "Fight on! The power of JavaScript closures"
---

The term closure is often thrown around a lot in the JavaScript community however there seems to be a misunderstanding of what this term really means.  A closure in JavaScript does not refer to a specific function, but rather the way in which that function accesses other variables outside and within itself once invoked. For a closure to exist, the following must hold true:

- The function of interest is defined within a particular scope
- The body of the function references a variable(s) in the outer scope
- Access to that function is retained

In addition to these three requirements, when you exit the scope of the function of interest, that scope is retained. What does this mean? Let’s take a look at a fun example.

### Hero example

Suppose we wanted to create a videogame in which a hero fights a villain. Additionally, our hero will fight a random villain each time we start a new fight.  However, the random villain should be chosen only once the fight has commenced so that the hero can’t cheat prior to the fight. How would we go about setting up this game? …with a closure!

To satisfy our first requirement, lets define our function of interest by creating a function `Fight` that will start a new fight:

```javascript
const Fight = function(){
};
```

Next, let’s reference our variables that exist outside the scope of the `Fight` function:

```javascript
const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
};
```

Now …the moment you’ve all been waiting for… let’s use a closure to power our game!  To do this, we will randomly select a villain for our hero to fight **INSIDE** the `Fight` function.  We can do this by selecting a random index of our villains array.

```javascript
const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
 const currentVillain = villains[ Math.floor(Math.random()*villains.length) ];
 console.log( `${hero} vs. ${currentVillain} ...Fight!` );
};
```

Now, a closure has been established within our code so that the current villain will only be defined when our hero is called to fight. Let’s go ahead and start the game by fighting our hero against random villains!

```javascript
const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
 const currentVillain = villains[Math.floor(Math.random()*3)];
 console.log( `${hero} vs. ${currentVillain} ...Fight!` );
};

Fight();
Fight();
```

As you can see, each time `Fight` is invoked, our hero gets to fight a random villain.  More importantly, now the next villain is hidden from the user prior to the fight taking place. We can confirm this by trying to log out `hero` and  `currentVillain`.

```javascript
hero; // returns 'Batman'
currentVillain; // returns undefined
```

While this example shows a basic example of a closure, closures can become very complex and are very useful in making data hidden from users.  Fight on!
