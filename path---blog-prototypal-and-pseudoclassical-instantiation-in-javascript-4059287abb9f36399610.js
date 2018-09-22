webpackJsonp([0x5bd7df49250c],{399:function(e,o){e.exports={data:{markdownRemark:{html:'<p>In JavaScript, there are four ways to instantiate a new object. This blog post will cover the differences between the prototypal and pseudoclassical instantiation patterns; functional decorator and functional-shared instantiation patterns will not be covered in this post. While prototypal and pseudoclassical instantiations reach the same end goal, prototypical instantiation requires that the object be explicitly created and returned, whereas the pseudoclassical instantiation pattern does this by insertion of the keyword <code>new</code> in front of the class name. Let’s establish an example in which we want to create a red balloon objects containing a location property <code>loc</code> and a method to make the balloon move higher called <code>move</code>.</p>\n<h3>Prototypical class instantiation</h3>\n<pre><code class="language-javascript">var Balloon = function( loc ){\n  var obj = Object.create( Balloon.prototype );\n  obj.loc = loc;\n  return obj;\n};\nBalloon.prototype.move = function(){ this.loc++ };\n\nvar redBalloon = Balloon( 1 );\nredBalloon.move();\n</code></pre>\n<h3>Pseudoclassical class instantiation</h3>\n<pre><code class="language-javascript">var Balloon = function( loc ){\n  this.loc = loc;\n};\nBalloon.prototype.move = function(){ this.loc++ };\n\n\nvar redBalloon = new Balloon( 1 );\nredBalloon.move();\n</code></pre>\n<h3>Comparison</h3>\n<p>As you can see from the above examples, the two look very similar; however, the prototypical pattern explicitly creates and returns an object created within the function while the pseudoclassical pattern makes use of the keywords this and new and does not appear to return anything… so what’s really going on in the pseudoclassical pattern?…pretty much the same thing with some visual cleanup. First, a new object is created which inherits the prototypes from the parent object; in this example, the <code>move</code> prototype. This makes <code>move</code> accessible on the newly created object.</p>\n<pre><code class="language-javascript">var Balloon = function( loc ){\n  this = Object.create( Balloon.prototype );\n};\nBalloon.prototype.move = function(){ this.loc++ };\n</code></pre>\n<p>Second, it binds the keyword <code>this</code> to the new object being created and thus gives the new object all the properties specified in the old object; in this example, <code>redBalloon</code> is given a <code>loc</code> property.</p>\n<pre><code class="language-javascript">var Balloon = function( loc ){\n  this = Object.create( Balloon.prototype );\n  this.loc = loc;\n};\nBalloon.prototype.move = function(){ this.loc++ };\n</code></pre>\n<p>And last, it returns the newly created object with the properties and prototypes described in the steps above.</p>\n<pre><code class="language-javascript">var Balloon = function( loc ){\n  this = Object.create( Balloon.prototype );\n  this.loc = loc;\n  return this;\n};\nBalloon.prototype.move = function(){ this.loc++ };\n</code></pre>\n<p>As you can see, pseudoclassical instantiation and prototypical instantiation and pretty much identical in terms of function but one allows you to clean up code a bit and looks a bit fancier.</p>',frontmatter:{date:"1407654000000",path:"/blog/prototypal-and-pseudoclassical-instantiation-in-javascript",title:"Prototypal and pseudoclassical instantiation in JavaScript"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-prototypal-and-pseudoclassical-instantiation-in-javascript-4059287abb9f36399610.js.map