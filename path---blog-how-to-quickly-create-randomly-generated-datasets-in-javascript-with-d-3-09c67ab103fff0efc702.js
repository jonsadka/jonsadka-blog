webpackJsonp([42882386469154],{387:function(e,a){e.exports={data:{markdownRemark:{html:'<p>Often times in JavaScript and D3.js, we want to quickly create randomly-generated, "fake" data on the fly for testing and iterative development.  To help speed things up, we can combine the <code>d3.range()</code> operator and the native <code>Array.map()</code> prototype to make up large data sets instantly.</p>\n<h3>JavaScript Array.map() explained</h3>\n<p>The <code>.map()</code> Array prototype is a function that takes in a callback as the argument and invokes the function on each item in the array.</p>\n<p>Suppose we had an array of first names in a family <code>[\'Jon\',\'James\',\'Robert\',\'Mary\']</code> and we wanted to give them all the same last name, with <code>Array.map()</code> we can do this quickly.</p>\n<pre><code class="language-javascript">var familyMembers = [\'Jon\',\'James\',\'Robert\',\'Mary\'];\nfamilyMembers = familyMembers.map(function(member){\n return member + \' Sadka\';\n});\n\nconsole.log(familyMembers); // logs ["Jon Sadka", "James Sadka", "Robert Sadka", "Mary Sadka"]\n</code></pre>\n<h3>D3.js d3.range() explained</h3>\n<p>D3 has availed a d3.range() function, which creates a numerical array given a specified range (start value and end value) and step size (similar to the blog post I wrote about here <a href="http://jonsadka.com/blog/using-reduce-to-create-arrays-and-objects-in-javascript/">http://jonsadka.com/blog/using-reduce-to-create-arrays-and-objects-in-javascript/</a>)</p>\n<pre><code class="language-javascript">d3.range(10); // returns [0,1,2,3,4,5,6,7,8,9,10]\n</code></pre>\n<p>Note the above is equivalent to <code>d3.range(0,10,1)</code>. If only one argument is provided, D3.js defaults to a start value of 0 and a step size of 1.</p>\n<h3>Create data</h3>\n<p>Now we can method chain the two functions to generate a data collection with desired arrays and values.  For example, if we wanted to generate a collection of 3 arrays, each with 2 random values, we could write the following script:</p>\n<pre><code class="language-javascript">newData = d3.range(3).map(function(){\n  return d3.range(2).map(Math.random);\n});\n</code></pre>\n<p>The following are three concurrent invocations of the function. As you can see, new random data is generated each invocation.</p>\n<table>\n<thead>\n<tr>\n<th>First Call</th>\n<th>Second Call</th>\n<th>Third Call</th>\n</tr>\n</thead>\n<tbody>\n</tbody>\n</table>\n<pre><code class="language-json">[\n  [\n    0.8413378541975207,\n    0.3325404232023103\n  ],\n  [\n    0.3138091034763348,\n    0.3076188833709993\n  ],\n  [\n    0.30112087396986803,\n    0.559295264307266\n  ]\n]\n</code></pre>\n<p>|</p>\n<pre><code class="language-json">[\n  [\n    0.5572082407882554,\n    0.043238313709354124\n  ],\n  [\n    0.6398647521766884,\n    0.7514103816898313\n  ],\n  [\n    0.33347515710668374,\n    0.4137206026025377\n  ]\n]\n</code></pre>\n<p>|</p>\n<pre><code class="language-json">[\n  [\n    0.15984172239725725,\n    0.26185501779977943\n  ],\n  [\n    0.27603102582062555,\n    0.8777553496374497\n  ],\n  [\n    0.2583027294068179,\n    0.2535044159038138\n  ]\n]\n</code></pre>',frontmatter:{date:"1411974000000",path:"/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3",title:"How to quickly create randomly generated datasets in JavaScript with D3.js"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d-3-09c67ab103fff0efc702.js.map