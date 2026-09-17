import{t as e}from"./index-CC4pwC9H.js";import{t}from"./lib-DVGn8KeT.js";var n=e(),r={path:`/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3`,date:`1411974000000`,published:!0,tags:[`D3.js`,`JavaScript`],title:`How to quickly create randomly generated datasets in JavaScript with D3.js`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,table:`table`,th:`th`,thead:`thead`,tr:`tr`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`Often times in JavaScript and D3.js, we want to quickly create randomly-generated, "fake" data on the fly for testing and iterative development.  To help speed things up, we can combine the `,(0,n.jsx)(r.code,{children:`d3.range()`}),` operator and the native `,(0,n.jsx)(r.code,{children:`Array.map()`}),` prototype to make up large data sets instantly.`]}),`
`,(0,n.jsxs)(r.h3,{id:`javascript-arraymap-explained`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#javascript-arraymap-explained`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`JavaScript Array.map() explained`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`.map()`}),` Array prototype is a function that takes in a callback as the argument and invokes the function on each item in the array.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Suppose we had an array of first names in a family `,(0,n.jsx)(r.code,{children:`['Jon','James','Robert','Mary']`}),` and we wanted to give them all the same last name, with `,(0,n.jsx)(r.code,{children:`Array.map()`}),` we can do this quickly.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var familyMembers = ['Jon','James','Robert','Mary'];
familyMembers = familyMembers.map(function(member){
 return member + ' Sadka';
});

console.log(familyMembers); // logs ["Jon Sadka", "James Sadka", "Robert Sadka", "Mary Sadka"]
`})}),`
`,(0,n.jsxs)(r.h3,{id:`d3js-d3range-explained`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#d3js-d3range-explained`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`D3.js d3.range() explained`]}),`
`,(0,n.jsxs)(r.p,{children:[`D3 has availed a d3.range() function, which creates a numerical array given a specified range (start value and end value) and step size (similar to the blog post I wrote about `,(0,n.jsx)(r.a,{href:`/blog/using-reduce-to-create-arrays-and-objects-in-javascript/`,children:`here`}),`)`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`d3.range(10); // returns [0,1,2,3,4,5,6,7,8,9,10]
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Note the above is equivalent to `,(0,n.jsx)(r.code,{children:`d3.range(0,10,1)`}),`. If only one argument is provided, D3.js defaults to a start value of 0 and a step size of 1.`]}),`
`,(0,n.jsxs)(r.h3,{id:`create-data`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#create-data`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Create data`]}),`
`,(0,n.jsx)(r.p,{children:`Now we can method chain the two functions to generate a data collection with desired arrays and values.  For example, if we wanted to generate a collection of 3 arrays, each with 2 random values, we could write the following script:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`newData = d3.range(3).map(function(){
  return d3.range(2).map(Math.random);
});
`})}),`
`,(0,n.jsx)(r.p,{children:`The following are three concurrent invocations of the function. As you can see, new random data is generated each invocation.`}),`
`,(0,n.jsx)(r.table,{children:(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`First Call`}),(0,n.jsx)(r.th,{children:`Second Call`}),(0,n.jsx)(r.th,{children:`Third Call`})]})})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-json`,children:`[
  [
    0.8413378541975207,
    0.3325404232023103
  ],
  [
    0.3138091034763348,
    0.3076188833709993
  ],
  [
    0.30112087396986803,
    0.559295264307266
  ]
]
`})}),`
`,(0,n.jsx)(r.p,{children:`|`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-json`,children:`[
  [
    0.5572082407882554,
    0.043238313709354124
  ],
  [
    0.6398647521766884,
    0.7514103816898313
  ],
  [
    0.33347515710668374,
    0.4137206026025377
  ]
]
`})}),`
`,(0,n.jsx)(r.p,{children:`|`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-json`,children:`[
  [
    0.15984172239725725,
    0.26185501779977943
  ],
  [
    0.27603102582062555,
    0.8777553496374497
  ],
  [
    0.2583027294068179,
    0.2535044159038138
  ]
]
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};