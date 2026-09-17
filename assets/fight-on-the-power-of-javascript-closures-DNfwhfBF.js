import{t as e}from"./index-BHGTRh0p.js";import{t}from"./lib-Ci7ycG-p.js";var n=e(),r={path:`/blog/fight-on-the-power-of-javascript-closures`,date:`1408172400000`,published:!0,tags:[`JavaScript`],title:`Fight on! The power of JavaScript closures`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`The term closure is often thrown around a lot in the JavaScript community however there seems to be a misunderstanding of what this term really means.  A closure in JavaScript does not refer to a specific function, but rather the way in which that function accesses other variables outside and within itself once invoked. For a closure to exist, the following must hold true:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`The function of interest is defined within a particular scope`}),`
`,(0,n.jsx)(r.li,{children:`The body of the function references a variable(s) in the outer scope`}),`
`,(0,n.jsx)(r.li,{children:`Access to that function is retained`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`In addition to these three requirements, when you exit the scope of the function of interest, that scope is retained. What does this mean? Let’s take a look at a fun example.`}),`
`,(0,n.jsxs)(r.h3,{id:`hero-example`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#hero-example`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Hero example`]}),`
`,(0,n.jsx)(r.p,{children:`Suppose we wanted to create a videogame in which a hero fights a villain. Additionally, our hero will fight a random villain each time we start a new fight.  However, the random villain should be chosen only once the fight has commenced so that the hero can’t cheat prior to the fight. How would we go about setting up this game? …with a closure!`}),`
`,(0,n.jsxs)(r.p,{children:[`To satisfy our first requirement, lets define our function of interest by creating a function `,(0,n.jsx)(r.code,{children:`Fight`}),` that will start a new fight:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const Fight = function(){
};
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Next, let’s reference our variables that exist outside the scope of the `,(0,n.jsx)(r.code,{children:`Fight`}),` function:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
};
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Now …the moment you’ve all been waiting for… let’s use a closure to power our game!  To do this, we will randomly select a villain for our hero to fight `,(0,n.jsx)(r.strong,{children:`INSIDE`}),` the `,(0,n.jsx)(r.code,{children:`Fight`}),` function.  We can do this by selecting a random index of our villains array.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
 const currentVillain = villains[ Math.floor(Math.random()*villains.length) ];
 console.log( \`\${hero} vs. \${currentVillain} ...Fight!\` );
};
`})}),`
`,(0,n.jsx)(r.p,{children:`Now, a closure has been established within our code so that the current villain will only be defined when our hero is called to fight. Let’s go ahead and start the game by fighting our hero against random villains!`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const hero = 'Batman';
const villains = ['Joker', 'Catwoman', 'Two-Face'];

const Fight = function(){
 const currentVillain = villains[Math.floor(Math.random()*3)];
 console.log( \`\${hero} vs. \${currentVillain} ...Fight!\` );
};

Fight();
Fight();
`})}),`
`,(0,n.jsxs)(r.p,{children:[`As you can see, each time `,(0,n.jsx)(r.code,{children:`Fight`}),` is invoked, our hero gets to fight a random villain.  More importantly, now the next villain is hidden from the user prior to the fight taking place. We can confirm this by trying to log out `,(0,n.jsx)(r.code,{children:`hero`}),` and  `,(0,n.jsx)(r.code,{children:`currentVillain`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`hero; // returns 'Batman'
currentVillain; // returns undefined
`})}),`
`,(0,n.jsx)(r.p,{children:`While this example shows a basic example of a closure, closures can become very complex and are very useful in making data hidden from users.  Fight on!`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};