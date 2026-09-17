import{t as e}from"./index-CUqiFNbr.js";import{t}from"./lib-t3kAbS33.js";var n=e(),r={path:`/blog/prototypal-and-pseudoclassical-instantiation-in-javascript`,date:`1407654000000`,published:!0,tags:[`JavaScript`],title:`Prototypal and pseudoclassical instantiation in JavaScript`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`In JavaScript, there are four ways to instantiate a new object. This blog post will cover the differences between the prototypal and pseudoclassical instantiation patterns; functional decorator and functional-shared instantiation patterns will not be covered in this post. While prototypal and pseudoclassical instantiations reach the same end goal, prototypical instantiation requires that the object be explicitly created and returned, whereas the pseudoclassical instantiation pattern does this by insertion of the keyword `,(0,n.jsx)(r.code,{children:`new`}),` in front of the class name. Let’s establish an example in which we want to create a red balloon objects containing a location property `,(0,n.jsx)(r.code,{children:`loc`}),` and a method to make the balloon move higher called `,(0,n.jsx)(r.code,{children:`move`}),`.`]}),`
`,(0,n.jsxs)(r.h3,{id:`prototypical-class-instantiation`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#prototypical-class-instantiation`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Prototypical class instantiation`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var Balloon = function( loc ){
  var obj = Object.create( Balloon.prototype );
  obj.loc = loc;
  return obj;
};
Balloon.prototype.move = function(){ this.loc++ };

var redBalloon = Balloon( 1 );
redBalloon.move();
`})}),`
`,(0,n.jsxs)(r.h3,{id:`pseudoclassical-class-instantiation`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#pseudoclassical-class-instantiation`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Pseudoclassical class instantiation`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var Balloon = function( loc ){
  this.loc = loc;
};
Balloon.prototype.move = function(){ this.loc++ };


var redBalloon = new Balloon( 1 );
redBalloon.move();
`})}),`
`,(0,n.jsxs)(r.h3,{id:`comparison`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#comparison`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Comparison`]}),`
`,(0,n.jsxs)(r.p,{children:[`As you can see from the above examples, the two look very similar; however, the prototypical pattern explicitly creates and returns an object created within the function while the pseudoclassical pattern makes use of the keywords this and new and does not appear to return anything… so what’s really going on in the pseudoclassical pattern?…pretty much the same thing with some visual cleanup. First, a new object is created which inherits the prototypes from the parent object; in this example, the `,(0,n.jsx)(r.code,{children:`move`}),` prototype. This makes `,(0,n.jsx)(r.code,{children:`move`}),` accessible on the newly created object.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
};
Balloon.prototype.move = function(){ this.loc++ };
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Second, it binds the keyword `,(0,n.jsx)(r.code,{children:`this`}),` to the new object being created and thus gives the new object all the properties specified in the old object; in this example, `,(0,n.jsx)(r.code,{children:`redBalloon`}),` is given a `,(0,n.jsx)(r.code,{children:`loc`}),` property.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
  this.loc = loc;
};
Balloon.prototype.move = function(){ this.loc++ };
`})}),`
`,(0,n.jsx)(r.p,{children:`And last, it returns the newly created object with the properties and prototypes described in the steps above.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var Balloon = function( loc ){
  this = Object.create( Balloon.prototype );
  this.loc = loc;
  return this;
};
Balloon.prototype.move = function(){ this.loc++ };
`})}),`
`,(0,n.jsx)(r.p,{children:`As you can see, pseudoclassical instantiation and prototypical instantiation and pretty much identical in terms of function but one allows you to clean up code a bit and looks a bit fancier.`})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};