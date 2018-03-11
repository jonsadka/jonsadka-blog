webpackJsonp([0xf851b41658c1],{392:function(e,t){e.exports={data:{markdownRemark:{html:'<p>I love functional programming and things just got better because of reduce and reduceRight. In ECMAScript5.1, the Ecma integrated some really common array mutation operations from some popular libraries (underscore, lodash, etc.) and made them available natively in JavaScript. The two that I really love are <code>Array.reduce()</code> and <code>Array.reduceRight()</code> because of their flexibility and adaptability. These reduce functions iterate through each item in the array, while providing the previously calculated value, current value, index, and original array at each step. Additionally, these values allow you to pass in a start value if desired. In some languages, this operation is called folding.</p>\n<p>However, something very unintuitive can be done with these reducing functions…something that was probably not intended. What if you could build arrays and objects using these functions instead of collapsing arrays? This would then turn into one impressive superfunction! Luckily, you can do just that using <code>Array.reduce()</code> and <code>Array.reduceRight()</code> so let’s take a look at an example.</p>\n<h2>Range example</h2>\n<p>Lets try to write a range function that takes three arguments, a start, end and step value, and returns an array containing all the numbers, inclusively, which increases at a specified step value. The function call <code>range(1, 10, 2)</code> should return <code>[1, 3, 5, 7,9]</code>.</p>\n<h3>Implement using loops</h3>\n<p>A straight-forward approach to this example would be to create the array using a for loop as exemplified below:</p>\n<pre><code class="language-javascript">var createWithLoop = function(start, stop, step){\n  step  = step || 1;\n  var result = [];\n\n  for (var i = start; i &#x3C;= stop; i += step ){\n    result.push(i);\n  }\n\n  return result;\n}\n</code></pre>\n<h3>Implement using .reduce()</h3>\n<p>Now that we got that out of the way, let’s take a look at the example that implements <code>.reduce()</code>. Before we begin, let me quickly explain the ideology. To create an array (or object) using reduce, we first must pass in an empty array (or object if we see fit) as the initial value. Then within each step of reduce, we perform the desired operation on the passed in array (or object) and return the newly mutated array (or object).</p>\n<p>To start, let’s setup our example. When using <code>.reduce()</code>, or any other array method, one must realize that these operations only operate based on the length of the array. For example, if array we are operating on has a length of ten, and we call reduce on this array, reduce will operate ten times on this array. Because of this, we need to initialize an array with the desired length.</p>\n<pre><code class="language-javascript">var createWithReduce = function(start, stop, step){\n  step = step || 1;\n  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );\n};\n</code></pre>\n<p>Now, <code>iterationCount</code> is an empty array with our desired length and we can call our reduce function on this array. However, we know that we somehow need to get a newly created array out of this reduce call. This can be achieved by passing in an empty array into the start argument of reduce.</p>\n<pre><code class="language-javascript">var createWithReduce = function(start, stop, step){\n  step = step || 1;\n  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );\n\n  iterationCount.reduce(function(previousValue, currentValue, index){},[] );\n};\n</code></pre>\n<p>Now, we know that we have the exact number of cycles and the desired start value, so the rest is easy!</p>\n<pre><code class="language-javascript">var createWithReduce = function(start, stop, step){\n   step = step || 1;\n   var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );\n\n  iterationCount.reduce(function(previousValue, currentValue, index){\n    previousValue.push( start + index * step );\n    return previousValue;\n  },[] );\n};\n</code></pre>\n<p>And finally, we need to return the result of the reduce call.</p>\n<pre><code class="language-javascript">var createWithReduce = function(start, stop, step){\n  step = step || 1;\n  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );\n\n  return iterationCount.reduce(function(previousValue, currentValue, index){\n    previousValue.push( start + index * step );\n    return previousValue;\n  }, [] );\n};\n</code></pre>\n<h3>Execution breakdown at each step</h3>\n<table>\n<thead>\n<tr>\n<th>previousValue</th>\n<th>currentValue</th>\n<th>index</th>\n<th>return value</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>first call</td>\n<td><code>[]</code></td>\n<td>0</td>\n<td><code>[1]</code></td>\n</tr>\n<tr>\n<td>second call</td>\n<td><code>[1]</code></td>\n<td>1</td>\n<td><code>[1,3]</code></td>\n</tr>\n<tr>\n<td>third call</td>\n<td><code>[1,3]</code></td>\n<td>2</td>\n<td><code>[1,3,5]</code></td>\n</tr>\n<tr>\n<td>fourth call</td>\n<td><code>[1,3,5]</code></td>\n<td>3</td>\n<td><code>[1,3,5,7]</code></td>\n</tr>\n<tr>\n<td>fifth call</td>\n<td><code>[1,3,5,7]</code></td>\n<td>4</td>\n<td><code>[1,3,5,7,9]</code></td>\n</tr>\n</tbody>\n</table>\n<h3>Implement reduce using objects</h3>\n<p>Alternatively, if we wanted to create an object instead of an array, we could use a similar logic and do the following:</p>\n<pre><code class="language-javascript">var createWithReduce = function(start, stop, step){\n  step = step || 1;\n  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );\n\n  return iterationCount.reduce(function(previousValue, currentValue, index){\n    previousValue[start + index * step] = start + index * step ;\n    return previousValue;\n  }, {} );\n};\n</code></pre>',frontmatter:{date:"1411110000000",path:"/blog/using-reduce-to-create-arrays-and-objects-in-javascript",title:"Using .reduce() to create arrays and objects in JavaScript"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-using-reduce-to-create-arrays-and-objects-in-javascript-45d0856eb9f74d3b96c0.js.map