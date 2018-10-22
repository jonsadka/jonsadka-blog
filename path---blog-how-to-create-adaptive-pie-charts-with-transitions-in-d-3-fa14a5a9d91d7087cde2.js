webpackJsonp([4529161709811],{391:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Following up with my last blog post about adaptive line chart graphs (<a href="/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data/">link</a>), I decided to apply this same concept of adaptive charts to a pie / donut chart. The goal is to create a chart similar to the one below, which updates to any new data thrown at it.</p>\n<p>NOTE: for mobile devices, view the visual here: <a href="http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e">link</a>.</p>\n<iframe width="960" height="500" src="https://cdn.rawgit.com/jonsadka/fa05f8d53d4e8b5f262e/raw/53a37004024c5fe5696156db2f56c755d5761d54/index.html" marginwidth="0" marginheight="0" scrolling="no" align="middle"></iframe>\n<h3>Generate data</h3>\n<p>The best way to test the functionality of your graph is to generate new pseudo-data at a set interval and update the graph at that interval. For those unfamiliar with quick data generation in D3, I recommend you take a look at my previous blog (<a href="/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3/">link</a>). For this example, we need to create a single dimensional dataset. Typically pie / donut chart data would be multi-dimensional, at the very least, because it would contain a description of each data point however I will ignore it for this example. The data generation function below takes in one argument, the desired number of data points, and returns an array with that number of data elements. Data is multiplied by 100 to better exaggerate the visuals.</p>\n<pre><code class="language-javascript">function newData(lineNumber, points){\nfunction makeData(size){\n  return d3.range(size).map(function(item){\n   return Math.random()*100;\n  });\n};\n</code></pre>\n<h3>Setup page elements</h3>\n<p>Now, we can start to setup up our page elements, such as the svg dimensions. We need to translate our pie / donut chart container because by default, the center is set to the top left corner of our svg container. It’s good practice to make the translation amounts dynamic based on the page dimensions, but I will gloss over it purpose of this example.</p>\n<pre><code class="language-javascript">var width = 960;\nvar height = 500;\n\nvar svg = d3.select("body").append("svg")\n  .attr("height", height).attr("width", width);\n\nvar g = svg.append(\'g\')\n  .attr(\'transform\', \'translate(\' + width / 2 + \',\' + height / 2 + \')\');\n</code></pre>\n<h3>Create initial chart</h3>\n<p>Next we can specify our color scale and set up our pie / donut and arc functions. The thickness of the donut chart is dependent on the difference between the outer and inner radii. Incorporating padding into the chart can be achieved by setting the outer radius as some percentage of the total container dimension (in this case, 90%).</p>\n<p>Hint: If you desire a pie chart rather than a donut chart, you can set the inner radius value to 0.</p>\n<p>The pie layout function calculates the location of each pie segment and the arc generator determines the path of the arc that is drawn and filled. Finally, we enter the data and save each angle to the <code>_current</code> property of the current element. The reason for this will become evident when we introduce the <code>render</code> function.</p>\n<pre><code class="language-javascript">var color = d3.scale.category20();\n\nvar min = Math.min(width, height);\nvar oRadius = min / 2 * 0.9;\nvar iRadius = min / 2 * 0.85;\n\n// construct default pie layout\nvar pie = d3.layout.pie().value(function(d){ return d; }).sort(null);\n\n// construct arc generator\nvar arc = d3.svg.arc()\n  .outerRadius(oRadius)\n  .innerRadius(iRadius);\n\n// generate random data\nvar data = makeData(20);\n\n// enter data and draw pie chart\nvar path = g.datum(data).selectAll("path")\n  .data(pie)\n  .enter().append("path")\n    .attr("class","piechart")\n    .attr("fill", function(d,i){ return color(i); })\n    .attr("d", arc)\n  .each(function(d){ this._current = d; })\n</code></pre>\n<p>Your graph should change each time the page is refreshed and should look something like this:</p>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/aaf46307876ebc0a8d08/raw/2632c29011f83fd55074eb2652f5d68de0a4a262/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n<h3>Create render function</h3>\n<p>Now what we must do is encapsulate the remaining portion of the program in a function, which I have called <code>render</code>. <code>render</code> will be invoked when we want to generate a new dataset and update our graph.</p>\n<pre><code class="language-javascript">function render(){\n  // generate new random data\n  data = makeData(Math.random()*20);\n\n  // add any new pie segments\n  g.datum(data).selectAll("path")\n  .data(pie)\n  .enter().append("path")\n    .attr("class","piechart")\n    .attr("fill", function(d,i){ return color(i); })\n    .attr("d", arc)\n  .each(function(d){ this._current = d; })\n\n  // remove data not used\n  g.datum(data).selectAll("path")\n    .data(pie).exit().remove();\n}\n\nsetInterval(render,2000);\n</code></pre>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/d8c94c75e66dcde5c5ac/raw/69846b4b78ea8f9db5ad15de1dde0c6a9538a38c/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n<p>Oh no! Why are the arc segments not expanding to fill in the voids? Turns out we need to transition any old paths to the new paths before entering or removing any new paths.</p>\n<pre><code class="language-javascript">function render(){\n  // generate new random data\n  data = makeData(Math.random()*20);\n\n  // add transition to new path\n  g.datum(data).selectAll("path").data(pie).transition().attr("d", arc);\n\n  // add any new pie segments\n  g.datum(data).selectAll("path")...\n}\n</code></pre>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/7603ce14944c288e03fb/raw/37439aec6419296910eee356ee9791d33d51e021/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n<h3>Smooth transition</h3>\n<p>The graph still does not transition properly, but we\'re getting closer. The grand finale is curtosey of Mike Bostock (<a href="https://twitter.com/mbostock">@mbostock</a>), who came up with an elegant solution to this transition problem. Storing the angles in <code>_current</code> allows us to retrieve the existing angles and use them when transitioning to new angles. Instead of applying the arc function to the <code>.attr</code> of <code>d</code> when we re-render, we will apply the <code>arcTween</code> function to the <code>.attrTween</code> property of <code>d</code>.</p>\n<pre><code class="language-javascript">// add transition to new path\ng.datum(data).selectAll("path").data(pie).transition().attrTween("d", arcTween);\n\n// Store the displayed angles in _current.\n// Then, interpolate from _current to the new angles.\n// During the transition, _current is updated in-place by d3.interpolate.\nfunction arcTween(a) {\n  var i = d3.interpolate(this._current, a);\n  this._current = i(0);\n  return function(t) {\n  return arc(i(t));\n  };\n}\n</code></pre>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/c51f3564ab70cb3cef12/raw/19f252d37a989755791d5ebf310fe9ff0562880c/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n<h3>Complete code</h3>\n<p>And that’s it! Now your pie chart updates and animates in a visually pleasing way. If you’re interested in seeing the complete code, go ahead and check out my bl.ock: <a href="http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e">http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e</a></p>',frontmatter:{date:"1414134000000",path:"/blog/how-to-create-adaptive-pie-charts-with-transitions-in-d3",title:"How to create adaptive pie donut charts with transitions in D3.js (interactive tutorial and example)"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-how-to-create-adaptive-pie-charts-with-transitions-in-d-3-fa14a5a9d91d7087cde2.js.map