webpackJsonp([0x774f42003af9],{385:function(e,n){e.exports={data:{markdownRemark:{html:'<p>One of the bigger challenges in visualizing data is making your charts responsive so that they can resize no matter what range of data is thrown at it. Things get even more complicated when the dataset is actually a collection of many individual sets of data. One obvious example of this is a dataset containing (x,y) coordinates for multiple lines. The goal is to create a chart similar to the one below, which adapts to any new data thrown at it.</p>\n<iframe width="960" height="500" src="https://cdn.rawgit.com/jonsadka/482005612916b3f5e408/raw/7c05bc7b136a269d39e87138d745c368f69560f0/index.html" marginwidth="0" marginheight="0" scrolling="no" align="middle"></iframe>\n<h3>Generate data</h3>\n<p>The best way to test the functionality of your graph is to generate new pseudo-data at a set interval and update the graph at the same interval. I had previously blogged about how to generate large datasets using D3.js and JavaScript; if you are not familiar with this process, I strongly recommend that you take a quick read through that (<a href="http://jonsadka.com/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3/">link</a>). For this example, we need to start by creating a function that returns a dataset comprised of (x,y) coordinates for any specified number of lines. The function below takes two arguments, the desired number of lines and the desired number of points, and returns a 2D array where each nested array is a series of (x,y) coordinates pertaining to that line. The y coordinate is multiplied by 100 to better exaggerate this example.</p>\n<pre><code class="language-javascript">function newData(lineNumber, points){\n  return d3.range(lineNumber).map(function(){\n    return d3.range(points).map(function(item,index){\n      return { x:index, y:Math.random()*100 };\n    });\n  });\n}\n</code></pre>\n<h3>Setup page elements</h3>\n<p>Now, we can start to setup up our page elements, such as the svg dimensions, along with the margins.</p>\n<pre><code class="language-javascript">var width = 960;\nvar height = 500;\n\nvar margin = {top: 20, right:20, bottom:20, left:50};\n\nvar svg = d3.select("body").append("svg")\n  .attr("height", height).attr("width", width)\n  .append("g")\n    .attr("transform","translate(" + margin.left + "," + margin.right + ")")\n</code></pre>\n<p>Thinking about the scales for our x and y coordinates, we can assume that our window frame is constant. It’s good practice to make these ranges dynamic based on the page dimensions, but I will gloss over it purpose of this example. The thing to keep in mind is that although our ranges are constant, our domains will change with each generation of new data, so we will leave out our range specifications for now.</p>\n<pre><code class="language-javascript">var xScale = d3.scale.linear()\n  .range([0,width - margin.left - margin.right])\n\nvar yScale = d3.scale.linear()\n  .range([height - margin.top - margin.bottom,0])\n\nvar line = d3.svg.line().interpolate("monotone")\n  .x(function(d){ return xScale(d.x); })\n  .y(function(d){ return yScale(d.y); })\n</code></pre>\n<h3>Create <code>render</code> function</h3>\n<p>Now what we must do is encapsulate the rest of the program in a function, which I have called <code>render()</code>, that will update our graph when a new dataset is created. When <code>render</code> is invoked, it first must generate a new collection of data and gather the absolute minimum and maximum in the dataset. This means that we need to loop through each set of data (i.e. line), compare the minimums and maximums amongst the other sets of data (i.e. other lines) and pull the most extreme ones of the collection. Once we have done that, we can specify the domain for our scales.</p>\n<pre><code class="language-javascript">function render(){\n  // generate new dataset\n  var data = newData(8,3);\n\n  // obtain absolute min and max\n  var yMin = data.reduce(function(pv,cv){\n    var currentMin = cv.reduce(function(pv,cv){\n      return Math.min(pv,cv.y);\n    },100)\n    return Math.min(pv,currentMin);\n  },100);\n  var yMax = data.reduce(function(pv,cv){\n    var currentMax = cv.reduce(function(pv,cv){\n      return Math.max(pv,cv.y);\n    },0)\n    return Math.max(pv,currentMax);\n  },0);\n\n  // set as domain for axis\n  yScale.domain([yMin,yMax]);\n}\n</code></pre>\n<p>In this example, we are not drawing an x-axis and therefore are not specifying a domain for the xScale, however the process would be extremely similar if that was desired. Now that we have our scale set for this specific set of data, we can create our y-axis within our render function.</p>\n<pre><code class="language-javascript">// create axis\nvar yAxis = d3.svg.axis().scale(yScale).orient("left");\n\n// remove any previously drawn axis\nsvg.selectAll(".y.axis").remove();\n\n// draw the new axis\nsvg.append("g").attr("class","y axis").call(yAxis);\n</code></pre>\n<p>Last, we need to follow a similar process for drawing our lines:</p>\n<pre><code class="language-javascript">// remove any previously drawn lines\nsvg.selectAll(".line").remove();\n\n// draw new lines\nvar lines = svg.selectAll(".line").data(data).attr("class","line");\n\n// enter and append these lines\nlines.enter().append("path")\n    .attr("class","line")\n    .attr("d",line).style("stroke","blue");\n</code></pre>\n<p>And now, we have created our <code>render</code> function. All we need to do is call <code>render</code> and apply a <code>setInterval</code> on this function:</p>\n<pre><code class="language-javascript">function render(){\n  var data = newData(8,3);\n\n  var yMin = data.reduce(function(pv,cv){\n    var currentMin = cv.reduce(function(pv,cv){\n      return Math.min(pv,cv.y);\n    },100)\n    return Math.min(pv,currentMin);\n  },100);\n  var yMax = data.reduce(function(pv,cv){\n    var currentMax = cv.reduce(function(pv,cv){\n      return Math.max(pv,cv.y);\n    },0)\n    return Math.max(pv,currentMax);\n  },0);\n\n  yScale.domain([yMin,yMax]);\n\n  var yAxis = d3.svg.axis().scale(yScale).orient("left");\n\n  svg.selectAll(".y.axis").remove();\n\n  svg.append("g").attr("class","y axis").call(yAxis);\n\n  svg.selectAll(".line").remove();\n\n  var lines = svg.selectAll(".line").data(data).attr("class","line");\n\n  lines.enter().append("path")\n    .attr("class","line")\n    .attr("d",line).style("stroke","blue");\n}\n\nrender();\nsetInterval(render, 1500);\n</code></pre>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/6928acb9f561e5a4cbc2/raw/ecb990fcb7796b5d8698dd5d9b2d4f8e6ff7c965/index.html" marginwidth="0" marginheight="0" scrolling="no" align="middle"></iframe>\n<h3>Add transitions</h3>\n<p>But how do we make this graph beautifully animate and transition? First, let’s take a look at our axis. What we need to do is add a conditional statement to check to see if our scale exists. If so, all we need to do is add a transition to the new yAxis.</p>\n<pre><code class="language-javascript">// if no axis exists, create one\nif (svg.selectAll(".y.axis")[0].length &#x3C; 1 ){\n  svg.append("g")\n    .attr("class","y axis")\n   .call(yAxis)\n// otherwise, update the axis\n} else {\n  svg.selectAll(".y.axis").transition().duration(1500).call(yAxis)\n}\n</code></pre>\n<p>Now how do we update our lines? What we need to do is select all the lines currently on the page, transition them to the new line with any new attributes or styles, enter the changes in the data, and exit.</p>\n<pre><code class="language-javascript">// draw the lines\nvar lines = svg.selectAll(".line").data(data).attr("class","line")\n\n// transition from previous paths to new paths\nlines.transition().duration(1500)\n  .attr("d",line)\n  .style("stroke", function(){\n    return \'#\'+Math.floor(Math.random()*16777215).toString(16);\n  });\n\n// enter any new lines\nlines.enter()\n  .append("path")\n  .attr("class","line")\n  .attr("d",line)\n  .style("stroke", function(){\n    return \'#\'+Math.floor(Math.random()*16777215).toString(16);\n  });\n\n// exit\nlines.exit().remove();\n</code></pre>\n<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/a1b1d1d955220941446f/raw/c14d338163033954c461e9a051cff3ad326b0a33/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>\n<h3>Complete code</h3>\n<p>That’s it! If you’re interested in seeing the complete code, go ahead and check out my bl.ocks: <a href="http://bl.ocks.org/jonsadka/482005612916b3f5e408">http://bl.ocks.org/jonsadka/482005612916b3f5e408</a></p>',frontmatter:{date:"1413270000000",path:"/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data",title:"How to create live updating and flexible D3.js line charts using pseudo-data (interactive tutorial and example)"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-how-to-create-live-updating-and-flexible-d-3-line-charts-using-pseudo-data-2dc03b7a76b0b61336cc.js.map