import{t as e}from"./index-CC4pwC9H.js";import{t}from"./lib-DVGn8KeT.js";var n=e(),r={path:`/blog/how-to-create-adaptive-pie-charts-with-transitions-in-d3`,date:`1414134000000`,published:!0,tags:[`D3.js`,`JavaScript`],title:`How to create adaptive pie donut charts with transitions in D3.js (interactive tutorial and example)`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`Following up with my last blog post about adaptive line chart graphs (`,(0,n.jsx)(r.a,{href:`/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data/`,children:`link`}),`), I decided to apply this same concept of adaptive charts to a pie / donut chart. The goal is to create a chart similar to the one below, which updates to any new data thrown at it.`]}),`
`,(0,n.jsxs)(r.p,{children:[`NOTE: for mobile devices, view the visual here: `,(0,n.jsx)(r.a,{href:`http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e`,children:`link`}),`.`]}),`
`,(0,n.jsx)(`iframe`,{width:`1280`,height:`500`,src:`https://cdn.rawgit.com/jonsadka/fa05f8d53d4e8b5f262e/raw/53a37004024c5fe5696156db2f56c755d5761d54/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`,align:`middle`}),`
`,(0,n.jsxs)(r.h3,{id:`generate-data`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#generate-data`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Generate data`]}),`
`,(0,n.jsxs)(r.p,{children:[`The best way to test the functionality of your graph is to generate new pseudo-data at a set interval and update the graph at that interval. For those unfamiliar with quick data generation in D3, I recommend you take a look at my previous blog (`,(0,n.jsx)(r.a,{href:`/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3/`,children:`link`}),`). For this example, we need to create a single dimensional dataset. Typically pie / donut chart data would be multi-dimensional, at the very least, because it would contain a description of each data point however I will ignore it for this example. The data generation function below takes in one argument, the desired number of data points, and returns an array with that number of data elements. Data is multiplied by 100 to better exaggerate the visuals.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function newData(lineNumber, points){
function makeData(size){
  return d3.range(size).map(function(item){
   return Math.random()*100;
  });
};
`})}),`
`,(0,n.jsxs)(r.h3,{id:`setup-page-elements`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#setup-page-elements`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Setup page elements`]}),`
`,(0,n.jsx)(r.p,{children:`Now, we can start to setup up our page elements, such as the svg dimensions. We need to translate our pie / donut chart container because by default, the center is set to the top left corner of our svg container. It’s good practice to make the translation amounts dynamic based on the page dimensions, but I will gloss over it purpose of this example.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var width = 1280
var height = 500

var svg = d3
  .select('body')
  .append('svg')
  .attr('height', height)
  .attr('width', width)

var g = svg
  .append('g')
  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
`})}),`
`,(0,n.jsxs)(r.h3,{id:`create-initial-chart`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#create-initial-chart`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Create initial chart`]}),`
`,(0,n.jsx)(r.p,{children:`Next we can specify our color scale and set up our pie / donut and arc functions. The thickness of the donut chart is dependent on the difference between the outer and inner radii. Incorporating padding into the chart can be achieved by setting the outer radius as some percentage of the total container dimension (in this case, 90%).`}),`
`,(0,n.jsx)(r.p,{children:`Hint: If you desire a pie chart rather than a donut chart, you can set the inner radius value to 0.`}),`
`,(0,n.jsxs)(r.p,{children:[`The pie layout function calculates the location of each pie segment and the arc generator determines the path of the arc that is drawn and filled. Finally, we enter the data and save each angle to the `,(0,n.jsx)(r.code,{children:`_current`}),` property of the current element. The reason for this will become evident when we introduce the `,(0,n.jsx)(r.code,{children:`render`}),` function.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var color = d3.scale.category20()

var min = Math.min(width, height)
var oRadius = (min / 2) * 0.9
var iRadius = (min / 2) * 0.85

// construct default pie layout
var pie = d3.layout
  .pie()
  .value(function (d) {
    return d
  })
  .sort(null)

// construct arc generator
var arc = d3.svg.arc().outerRadius(oRadius).innerRadius(iRadius)

// generate random data
var data = makeData(20)

// enter data and draw pie chart
var path = g
  .datum(data)
  .selectAll('path')
  .data(pie)
  .enter()
  .append('path')
  .attr('class', 'piechart')
  .attr('fill', function (d, i) {
    return color(i)
  })
  .attr('d', arc)
  .each(function (d) {
    this._current = d
  })
`})}),`
`,(0,n.jsx)(r.p,{children:`Your graph should change each time the page is refreshed and should look something like this:`}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/aaf46307876ebc0a8d08/raw/2632c29011f83fd55074eb2652f5d68de0a4a262/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`}),`
`,(0,n.jsxs)(r.h3,{id:`create-render-function`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#create-render-function`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Create render function`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now what we must do is encapsulate the remaining portion of the program in a function, which I have called `,(0,n.jsx)(r.code,{children:`render`}),`. `,(0,n.jsx)(r.code,{children:`render`}),` will be invoked when we want to generate a new dataset and update our graph.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function render() {
  // generate new random data
  data = makeData(Math.random() * 20)

  // add any new pie segments
  g.datum(data)
    .selectAll('path')
    .data(pie)
    .enter()
    .append('path')
    .attr('class', 'piechart')
    .attr('fill', function (d, i) {
      return color(i)
    })
    .attr('d', arc)
    .each(function (d) {
      this._current = d
    })

  // remove data not used
  g.datum(data).selectAll('path').data(pie).exit().remove()
}

setInterval(render, 2000)
`})}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/d8c94c75e66dcde5c5ac/raw/69846b4b78ea8f9db5ad15de1dde0c6a9538a38c/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`}),`
`,(0,n.jsx)(r.p,{children:`Oh no! Why are the arc segments not expanding to fill in the voids? Turns out we need to transition any old paths to the new paths before entering or removing any new paths.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function render(){
  // generate new random data
  data = makeData(Math.random()*20);

  // add transition to new path
  g.datum(data).selectAll("path").data(pie).transition().attr("d", arc);

  // add any new pie segments
  g.datum(data).selectAll("path")...
}
`})}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/7603ce14944c288e03fb/raw/37439aec6419296910eee356ee9791d33d51e021/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`}),`
`,(0,n.jsxs)(r.h3,{id:`smooth-transition`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#smooth-transition`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Smooth transition`]}),`
`,(0,n.jsxs)(r.p,{children:[`The graph still does not transition properly, but we're getting closer. The grand finale is curtosey of Mike Bostock (`,(0,n.jsx)(r.a,{href:`https://twitter.com/mbostock`,children:`@mbostock`}),`), who came up with an elegant solution to this transition problem. Storing the angles in `,(0,n.jsx)(r.code,{children:`_current`}),` allows us to retrieve the existing angles and use them when transitioning to new angles. Instead of applying the arc function to the `,(0,n.jsx)(r.code,{children:`.attr`}),` of `,(0,n.jsx)(r.code,{children:`d`}),` when we re-render, we will apply the `,(0,n.jsx)(r.code,{children:`arcTween`}),` function to the `,(0,n.jsx)(r.code,{children:`.attrTween`}),` property of `,(0,n.jsx)(r.code,{children:`d`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// add transition to new path
g.datum(data).selectAll('path').data(pie).transition().attrTween('d', arcTween)

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a)
  this._current = i(0)
  return function (t) {
    return arc(i(t))
  }
}
`})}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/c51f3564ab70cb3cef12/raw/19f252d37a989755791d5ebf310fe9ff0562880c/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`}),`
`,(0,n.jsxs)(r.h3,{id:`complete-code`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#complete-code`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Complete code`]}),`
`,(0,n.jsxs)(r.p,{children:[`And that’s it! Now your pie chart updates and animates in a visually pleasing way. If you’re interested in seeing the complete code, go ahead and check out my bl.ock: `,(0,n.jsx)(r.a,{href:`http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e`,children:`http://bl.ocks.org/jonsadka/fa05f8d53d4e8b5f262e`})]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};