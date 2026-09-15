import{t as e}from"./index-Be0N7XYi.js";import{t}from"./lib-D0tD3C8d.js";var n=e(),r={path:`/blog/type-coercion-in-d3js`,date:`1407135600000`,published:!0,tags:[`D3.js`,`JavaScript`],title:`Type coercion in D3.js`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`D3.js is an amazing platform that allows software engineers to bind data to each DOM element that exists, or will be, created.  This data can then be used to compile graphs, charts, or any other visual means. Last week, I had the opportunity to play around with D3.js and created a simple little game `,(0,n.jsx)(r.a,{href:`http://jonsadka.github.io/watchout`,children:`(click to play watchout!)`}),`.  During that time, I discovered that D3.js does this funny thing with type coercion; when you try to add two numbers obtained from element attributes, it returns a string.`]}),`
`,(0,n.jsx)(r.p,{children:`Let’s look at the following example.  Suppose we wanted to create a game and add two objects, an enemy object and a player object.  And suppose we wanted the game to end when the enemy collides with the player.  One way to do this is to calculate the distance between the two objects; if the distance between the two is less than 1/2 their width (or the radius in the instance of a circle), then the two objects have collided.`}),`
`,(0,n.jsxs)(r.h3,{id:`collision-example`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#collision-example`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Collision example`]}),`
`,(0,n.jsx)(r.p,{children:`Below, let’s create the player and the red-colored enemy:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`d3.select('body').selectAll('player')
  .data([[]]).enter().append('circle')
  .attr("class", "player")
  .attr('cx', 200 ).attr('cy', 200 )
  .attr('r', 10)
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`d3.select('body').selectAll('enemy')
  .data( [[]] ).enter().append('circle')
  .attr("class", "enemy")
  .attr('cx', 100).attr('cy', 100)
  .attr('r', 15 )
  .attr('fill','red')
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Now that the players are created, we know that the distance between the two can be achieved using the `,(0,n.jsx)(r.a,{href:`http://en.wikipedia.org/wiki/Pythagorean_theorem`,children:`Pythagorean Theorem`}),` ( length = sqrt(  Δx^2 +  Δy^2  ) ).  Now this length, must be less than the addition of their two radii’s for there to be a collision.  We can get the radii of the enemy and the player as follows:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const playerSize = d3.select('.player').attr('r');
const enemySize = d3.select('.enemy').attr('r');
const collideDistance = playerSize + enemySize;
`})}),`
`,(0,n.jsxs)(r.p,{children:[`But wait! What happened to our collide distance variable and why is it 1015?  Turns out, D3.js treats `,(0,n.jsx)(r.code,{children:`playerSize`}),` and `,(0,n.jsx)(r.code,{children:`enemySize`}),` as strings and adds them instead of adding two numbers. We can correct this and get `,(0,n.jsx)(r.code,{children:`collideDistance`}),` to be 25 (i.e. 10 + 15) by forcing type coercion by adding a plus sign in front of each variable to declare them as numbers.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const collideDistance = +playerSize + +enemySize;
`})}),`
`,(0,n.jsx)(r.p,{children:`As an aside, the above is similar to below, but is more concise.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const collideDistance = Number(playerSize) + Number(enemySize);
`})}),`
`,(0,n.jsx)(r.p,{children:`D3.js is a powerful resource in manipulating data and provides developers with a tremendous amount of flexibility.  There are a lot of helpful resources on the web and the creator, Mike Bostock, has done a fantastic job of compiling and documenting a lot of examples.  Creating the game was fairly straightforward and it’s quite easy to pickup. I encourage all of you to try out D3.js.`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};