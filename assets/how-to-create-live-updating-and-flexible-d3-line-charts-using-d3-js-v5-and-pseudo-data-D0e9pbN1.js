import{t as e}from"./index-Be0N7XYi.js";import{t}from"./lib-D0tD3C8d.js";var n=e(),r={path:`/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-d3-js-v5-and-pseudo-data`,date:`1534402800000`,published:!0,tags:[`D3.js`,`JavaScript`],title:`How to create live updating and flexible D3.js line charts using D3.js v5 and pseudo-data (interactive tutorial and example)`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.p,{children:`One of the bigger challenges in visualizing data is making your charts responsive so that they can resize no matter what range of data is thrown at it. Things get even more complicated when the dataset is actually a collection of many individual sets of data. One obvious example of this is a dataset containing (x,y) coordinates for multiple lines. The goal is to create a chart similar to the one below, which adapts to any new data thrown at it.`}),`
`,(0,n.jsx)(`iframe`,{width:`1280`,height:`500`,src:`https://cdn.rawgit.com/jonsadka/482005612916b3f5e408/raw/7c05bc7b136a269d39e87138d745c368f69560f0/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`,align:`middle`}),`
`,(0,n.jsxs)(r.h3,{id:`generate-data`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#generate-data`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Generate data`]}),`
`,(0,n.jsxs)(r.p,{children:[`The best way to test the functionality of your graph is to generate new pseudo-data at a set interval and update the graph at the same interval. I had previously blogged about how to generate large datasets using D3.js and JavaScript; if you are not familiar with this process, I strongly recommend that you take a quick read through that (`,(0,n.jsx)(r.a,{href:`/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3/`,children:`link`}),`). For this example, we need to start by creating a function that returns a dataset comprised of (x,y) coordinates for any specified number of lines. The function below takes two arguments, the desired number of lines and the desired number of points, and returns a 2D array where each nested array is a series of (x,y) coordinates pertaining to that line. The y coordinate is multiplied by 100 to better exaggerate this example.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function newData(lineNumber, numPoints) {
  return d3
    .range(lineNumber)
    .map(() =>
      d3
        .range(numPoints)
        .map((item, index) => ({
          x: index / (numPoints - 1),
          y: Math.random() * 100,
        }))
    )
}
`})}),`
`,(0,n.jsxs)(r.h3,{id:`setup-page-elements`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#setup-page-elements`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Setup page elements`]}),`
`,(0,n.jsx)(r.p,{children:`Now, we can start to setup up our page elements, such as the svg dimensions, along with the margins.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const width = 1280
const height = 500

const margin = {top: 20, right: 20, bottom: 20, left: 50}

const svg = d3
  .select('body')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', \`translate(\${margin.left}, \${margin.right})\`)
`})}),`
`,(0,n.jsx)(r.p,{children:`Thinking about the scales for our x and y coordinates, we can assume that our window frame is constant. It’s good practice to make these ranges dynamic based on the page dimensions, but I will gloss over it purpose of this example. The thing to keep in mind is that although our ranges are constant, our domains will change with each generation of new data, so we will leave out our range specifications for now.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`const xScale = d3.scaleLinear().range([0, width - margin.left - margin.right])

const yScale = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])

const line = d3
  .line()
  .x((d) => xScale(d.x))
  .y((d) => yScale(d.y))
  .curve(d3.curveMonotoneX)
`})}),`
`,(0,n.jsxs)(r.h3,{id:`create-render-function`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#create-render-function`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Create `,(0,n.jsx)(r.code,{children:`render`}),` function`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now what we must do is encapsulate the rest of the program in a function, which I have called `,(0,n.jsx)(r.code,{children:`render()`}),`, that will update our graph when a new dataset is created. When `,(0,n.jsx)(r.code,{children:`render`}),` is invoked, it first must generate a new collection of data and gather the absolute minimum and maximum in the dataset. This means that we need to loop through each set of data (i.e. line), compare the minimums and maximums amongst the other sets of data (i.e. other lines) and pull the most extreme ones of the collection. Once we have done that, we can specify the domain for our scales.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function render() {
  // generate new dataset
  const data = newData(9, 3)

  // obtain absolute min and max
  const yMin = data.reduce((pv, cv) => {
    const currentMin = cv.reduce((pv, cv) => Math.min(pv, cv.y), 100)
    return Math.min(pv, currentMin)
  }, 100)
  const yMax = data.reduce((pv, cv) => {
    const currentMax = cv.reduce((pv, cv) => Math.max(pv, cv.y), 0)
    return Math.max(pv, currentMax)
  }, 0)

  // set as domain for axis
  yScale.domain([yMin, yMax])
}
`})}),`
`,(0,n.jsx)(r.p,{children:`In this example, we are not drawing an x-axis and therefore are not specifying a domain for the xScale, however the process would be extremely similar if that was desired. Now that we have our scale set for this specific set of data, we can create our y-axis within our render function.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// create axis
const yAxis = d3.axisLeft().scale(yScale)

// remove any previously drawn axis
svg.selectAll('.y.axis').remove()

// draw the new axis
svg.append('g').attr('class', 'y axis').call(yAxis)
`})}),`
`,(0,n.jsx)(r.p,{children:`Last, we need to follow a similar process for drawing our lines:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// remove any previously drawn lines
svg.selectAll('.line').remove()

// draw new lines
const lines = svg.selectAll('.line').data(data).attr('class', 'line')

// enter and append these lines
lines
  .enter()
  .append('path')
  .attr('class', 'line')
  .attr('d', line)
  .attr('stroke', 'blue')
`})}),`
`,(0,n.jsxs)(r.p,{children:[`And now, we have created our `,(0,n.jsx)(r.code,{children:`render`}),` function. All we need to do is call `,(0,n.jsx)(r.code,{children:`render`}),` and apply a `,(0,n.jsx)(r.code,{children:`setInterval`}),` on this function:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`function render() {
  const data = newData(9, 3)

  const yMin = data.reduce((pv, cv) => {
    const currentMin = cv.reduce((pv, cv) => Math.min(pv, cv.y), 100)
    return Math.min(pv, currentMin)
  }, 100)
  const yMax = data.reduce((pv, cv) => {
    const currentMax = cv.reduce((pv, cv) => Math.max(pv, cv.y), 0)
    return Math.max(pv, currentMax)
  }, 0)

  yScale.domain([yMin, yMax])

  const yAxis = d3.axisLeft().scale(yScale)

  svg.selectAll('.y.axis').remove()

  svg.append('g').attr('class', 'y axis').call(yAxis)

  svg.selectAll('.line').remove()

  const lines = svg.selectAll('.line').data(data).attr('class', 'line')

  lines
    .enter()
    .append('path')
    .attr('class', 'line')
    .attr('d', line)
    .attr('stroke', 'blue')
}

render()
setInterval(render, 1500)
`})}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/6928acb9f561e5a4cbc2/raw/ecb990fcb7796b5d8698dd5d9b2d4f8e6ff7c965/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`,align:`middle`}),`
`,(0,n.jsxs)(r.h3,{id:`add-transitions`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#add-transitions`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Add transitions`]}),`
`,(0,n.jsx)(r.p,{children:`But how do we make this graph beautifully animate and transition? First, let’s take a look at our axis. What we need to do is add a conditional statement to check to see if our scale exists. If so, all we need to do is add a transition to the new yAxis.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// if no axis exists, create one
if (svg.selectAll('.y.axis').empty()) {
  svg.append('g').attr('class', 'y axis').call(yAxis)
  // otherwise, update the axis
} else {
  svg.selectAll('.y.axis').transition().duration(1500).call(yAxis)
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Now how do we update our lines? What we need to do is select all the lines currently on the page, transition them to the new line with any new attributes or styles, enter the changes in the data, and exit.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// generate line paths
const lines = svg.selectAll('.line').data(data).attr('class', 'line')

// exit
lines.exit().remove()

// enter any new data
lines
  .enter()
  .append('path')
  .attr('class', 'line')
  .attr('d', line)
  .attr('stroke', () => '#' + Math.floor(Math.random() * 16777215).toString(16))

// transition from previous paths to new paths
lines
  .transition()
  .duration(1500)
  .attr('d', line)
  .attr('stroke', () => '#' + Math.floor(Math.random() * 16777215).toString(16))
`})}),`
`,(0,n.jsx)(`iframe`,{width:`480`,height:`250`,src:`https://cdn.rawgit.com/jonsadka/a1b1d1d955220941446f/raw/c14d338163033954c461e9a051cff3ad326b0a33/index.html`,marginwidth:`0`,marginheight:`0`,scrolling:`no`}),`
`,(0,n.jsxs)(r.h3,{id:`complete-code`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#complete-code`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Complete code`]}),`
`,(0,n.jsxs)(r.p,{children:[`That’s it! If you’re interested in seeing the complete code, go ahead and check out my bl.ocks: `,(0,n.jsx)(r.a,{href:`https://bl.ocks.org/jonsadka/19f1366db3ff25195e650ec90d404092`,children:`https://bl.ocks.org/jonsadka/19f1366db3ff25195e650ec90d404092`})]}),`
`,(0,n.jsxs)(r.p,{children:[`NOTE: Looking for the D3.js v3 tutorial? See it `,(0,n.jsx)(r.a,{href:`/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data/`,children:`here`})]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};