---
path: "/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data"
date: "1413270000000"
published: true
tags: ["D3.js", "JavaScript"]
title: "How to create live updating and flexible D3.js line charts using pseudo-data (interactive tutorial and example)"
---

One of the bigger challenges in visualizing data is making your charts responsive so that they can resize no matter what range of data is thrown at it. Things get even more complicated when the dataset is actually a collection of many individual sets of data. One obvious example of this is a dataset containing (x,y) coordinates for multiple lines. The goal is to create a chart similar to the one below, which adapts to any new data thrown at it.

<iframe width="960" height="500" src="https://cdn.rawgit.com/jonsadka/482005612916b3f5e408/raw/7c05bc7b136a269d39e87138d745c368f69560f0/index.html" marginwidth="0" marginheight="0" scrolling="no" align="middle"></iframe>

### Generate data

The best way to test the functionality of your graph is to generate new pseudo-data at a set interval and update the graph at the same interval. I had previously blogged about how to generate large datasets using D3.js and JavaScript; if you are not familiar with this process, I strongly recommend that you take a quick read through that ([link](http://jonsadka.com/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3/)). For this example, we need to start by creating a function that returns a dataset comprised of (x,y) coordinates for any specified number of lines. The function below takes two arguments, the desired number of lines and the desired number of points, and returns a 2D array where each nested array is a series of (x,y) coordinates pertaining to that line. The y coordinate is multiplied by 100 to better exaggerate this example.

```javascript
function newData(lineNumber, points){
  return d3.range(lineNumber).map(function(){
    return d3.range(points).map(function(item,index){
      return { x:index, y:Math.random()*100 };
    });
  });
}
```

### Setup page elements

Now, we can start to setup up our page elements, such as the svg dimensions, along with the margins.

```javascript
var width = 960;
var height = 500;

var margin = {top: 20, right:20, bottom:20, left:50};

var svg = d3.select("body").append("svg")
  .attr("height", height).attr("width", width)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.right + ")")
```

Thinking about the scales for our x and y coordinates, we can assume that our window frame is constant. It’s good practice to make these ranges dynamic based on the page dimensions, but I will gloss over it purpose of this example. The thing to keep in mind is that although our ranges are constant, our domains will change with each generation of new data, so we will leave out our range specifications for now.

```javascript
var xScale = d3.scale.linear()
  .range([0,width - margin.left - margin.right])

var yScale = d3.scale.linear()
  .range([height - margin.top - margin.bottom,0])

var line = d3.svg.line().interpolate("monotone")
  .x(function(d){ return xScale(d.x); })
  .y(function(d){ return yScale(d.y); })
```

### Create `render` function

Now what we must do is encapsulate the rest of the program in a function, which I have called `render()`, that will update our graph when a new dataset is created. When `render` is invoked, it first must generate a new collection of data and gather the absolute minimum and maximum in the dataset. This means that we need to loop through each set of data (i.e. line), compare the minimums and maximums amongst the other sets of data (i.e. other lines) and pull the most extreme ones of the collection. Once we have done that, we can specify the domain for our scales.

```javascript
function render(){
  // generate new dataset
  var data = newData(8,3);

  // obtain absolute min and max
  var yMin = data.reduce(function(pv,cv){
    var currentMin = cv.reduce(function(pv,cv){
      return Math.min(pv,cv.y);
    },100)
    return Math.min(pv,currentMin);
  },100);
  var yMax = data.reduce(function(pv,cv){
    var currentMax = cv.reduce(function(pv,cv){
      return Math.max(pv,cv.y);
    },0)
    return Math.max(pv,currentMax);
  },0);

  // set as domain for axis
  yScale.domain([yMin,yMax]);
}
```

In this example, we are not drawing an x-axis and therefore are not specifying a domain for the xScale, however the process would be extremely similar if that was desired. Now that we have our scale set for this specific set of data, we can create our y-axis within our render function.

```javascript
// create axis
var yAxis = d3.svg.axis().scale(yScale).orient("left");

// remove any previously drawn axis
svg.selectAll(".y.axis").remove();

// draw the new axis
svg.append("g").attr("class","y axis").call(yAxis);
```

Last, we need to follow a similar process for drawing our lines:

```javascript
// remove any previously drawn lines
svg.selectAll(".line").remove();

// draw new lines
var lines = svg.selectAll(".line").data(data).attr("class","line");

// enter and append these lines
lines.enter().append("path")
    .attr("class","line")
    .attr("d",line).style("stroke","blue");
```

And now, we have created our `render` function. All we need to do is call `render` and apply a `setInterval` on this function:

```javascript
function render(){
  var data = newData(8,3);

  var yMin = data.reduce(function(pv,cv){
    var currentMin = cv.reduce(function(pv,cv){
      return Math.min(pv,cv.y);
    },100)
    return Math.min(pv,currentMin);
  },100);
  var yMax = data.reduce(function(pv,cv){
    var currentMax = cv.reduce(function(pv,cv){
      return Math.max(pv,cv.y);
    },0)
    return Math.max(pv,currentMax);
  },0);

  yScale.domain([yMin,yMax]);

  var yAxis = d3.svg.axis().scale(yScale).orient("left");

  svg.selectAll(".y.axis").remove();

  svg.append("g").attr("class","y axis").call(yAxis);

  svg.selectAll(".line").remove();

  var lines = svg.selectAll(".line").data(data).attr("class","line");

  lines.enter().append("path")
    .attr("class","line")
    .attr("d",line).style("stroke","blue");
}

render();
setInterval(render, 1500);
```

<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/6928acb9f561e5a4cbc2/raw/ecb990fcb7796b5d8698dd5d9b2d4f8e6ff7c965/index.html" marginwidth="0" marginheight="0" scrolling="no" align="middle"></iframe>

### Add transitions

But how do we make this graph beautifully animate and transition? First, let’s take a look at our axis. What we need to do is add a conditional statement to check to see if our scale exists. If so, all we need to do is add a transition to the new yAxis.

```javascript
// if no axis exists, create one
if (svg.selectAll(".y.axis")[0].length < 1 ){
  svg.append("g")
    .attr("class","y axis")
   .call(yAxis)
// otherwise, update the axis
} else {
  svg.selectAll(".y.axis").transition().duration(1500).call(yAxis)
}
```

Now how do we update our lines? What we need to do is select all the lines currently on the page, transition them to the new line with any new attributes or styles, enter the changes in the data, and exit.

```javascript
// draw the lines
var lines = svg.selectAll(".line").data(data).attr("class","line")

// transition from previous paths to new paths
lines.transition().duration(1500)
  .attr("d",line)
  .style("stroke", function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  });

// enter any new lines
lines.enter()
  .append("path")
  .attr("class","line")
  .attr("d",line)
  .style("stroke", function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  });

// exit
lines.exit().remove();
```

<iframe width="480" height="250" src="https://cdn.rawgit.com/jonsadka/a1b1d1d955220941446f/raw/c14d338163033954c461e9a051cff3ad326b0a33/index.html" marginwidth="0" marginheight="0" scrolling="no"></iframe>

### Complete code

That’s it! If you’re interested in seeing the complete code, go ahead and check out my bl.ocks: [http://bl.ocks.org/jonsadka/482005612916b3f5e408](http://bl.ocks.org/jonsadka/482005612916b3f5e408)
