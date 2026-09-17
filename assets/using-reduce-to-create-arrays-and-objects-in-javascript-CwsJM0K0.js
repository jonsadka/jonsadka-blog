import{t as e}from"./index-BiV1rcgb.js";import{t}from"./lib-C2lagyiU.js";var n=e(),r={path:`/blog/using-reduce-to-create-arrays-and-objects-in-javascript`,date:`1411110000000`,published:!0,tags:[`JavaScript`],title:`Using .reduce() to create arrays and objects in JavaScript`,seoTitle:`.reduce() for arrays and objects in JavaScript`};function i(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,span:`span`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`I love functional programming and things just got better because of reduce and reduceRight. In ECMAScript5.1, the Ecma integrated some really common array mutation operations from some popular libraries (underscore, lodash, etc.) and made them available natively in JavaScript. The two that I really love are `,(0,n.jsx)(r.code,{children:`Array.reduce()`}),` and `,(0,n.jsx)(r.code,{children:`Array.reduceRight()`}),` because of their flexibility and adaptability. These reduce functions iterate through each item in the array, while providing the previously calculated value, current value, index, and original array at each step. Additionally, these values allow you to pass in a start value if desired. In some languages, this operation is called folding.`]}),`
`,(0,n.jsxs)(r.p,{children:[`However, something very unintuitive can be done with these reducing functions…something that was probably not intended. What if you could build arrays and objects using these functions instead of collapsing arrays? This would then turn into one impressive superfunction! Luckily, you can do just that using `,(0,n.jsx)(r.code,{children:`Array.reduce()`}),` and `,(0,n.jsx)(r.code,{children:`Array.reduceRight()`}),` so let’s take a look at an example.`]}),`
`,(0,n.jsxs)(r.h2,{id:`range-example`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#range-example`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Range example`]}),`
`,(0,n.jsxs)(r.p,{children:[`Lets try to write a range function that takes three arguments, a start, end and step value, and returns an array containing all the numbers, inclusively, which increases at a specified step value. The function call `,(0,n.jsx)(r.code,{children:`range(1, 10, 2)`}),` should return `,(0,n.jsx)(r.code,{children:`[1, 3, 5, 7,9]`}),`.`]}),`
`,(0,n.jsxs)(r.h3,{id:`implement-using-loops`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#implement-using-loops`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Implement using loops`]}),`
`,(0,n.jsx)(r.p,{children:`A straight-forward approach to this example would be to create the array using a for loop as exemplified below:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithLoop = function(start, stop, step){
  step  = step || 1;
  var result = [];

  for (var i = start; i <= stop; i += step ){
    result.push(i);
  }

  return result;
}
`})}),`
`,(0,n.jsxs)(r.h3,{id:`implement-using-reduce`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#implement-using-reduce`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Implement using .reduce()`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now that we got that out of the way, let’s take a look at the example that implements `,(0,n.jsx)(r.code,{children:`.reduce()`}),`. Before we begin, let me quickly explain the ideology. To create an array (or object) using reduce, we first must pass in an empty array (or object if we see fit) as the initial value. Then within each step of reduce, we perform the desired operation on the passed in array (or object) and return the newly mutated array (or object).`]}),`
`,(0,n.jsxs)(r.p,{children:[`To start, let’s setup our example. When using `,(0,n.jsx)(r.code,{children:`.reduce()`}),`, or any other array method, one must realize that these operations only operate based on the length of the array. For example, if array we are operating on has a length of ten, and we call reduce on this array, reduce will operate ten times on this array. Because of this, we need to initialize an array with the desired length.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );
};
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Now, `,(0,n.jsx)(r.code,{children:`iterationCount`}),` is an empty array with our desired length and we can call our reduce function on this array. However, we know that we somehow need to get a newly created array out of this reduce call. This can be achieved by passing in an empty array into the start argument of reduce.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  iterationCount.reduce(function(previousValue, currentValue, index){},[] );
};
`})}),`
`,(0,n.jsx)(r.p,{children:`Now, we know that we have the exact number of cycles and the desired start value, so the rest is easy!`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithReduce = function(start, stop, step){
   step = step || 1;
   var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue.push( start + index * step );
    return previousValue;
  },[] );
};
`})}),`
`,(0,n.jsx)(r.p,{children:`And finally, we need to return the result of the reduce call.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue.push( start + index * step );
    return previousValue;
  }, [] );
};
`})}),`
`,(0,n.jsxs)(r.h3,{id:`execution-breakdown-at-each-step`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#execution-breakdown-at-each-step`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Execution breakdown at each step`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.th,{children:`previousValue`}),(0,n.jsx)(r.th,{children:`currentValue`}),(0,n.jsx)(r.th,{children:`index`}),(0,n.jsx)(r.th,{children:`return value`})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`first call`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[]`})}),(0,n.jsx)(r.td,{children:`0`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1]`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`second call`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1]`})}),(0,n.jsx)(r.td,{children:`1`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3]`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`third call`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3]`})}),(0,n.jsx)(r.td,{children:`2`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3,5]`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`fourth call`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3,5]`})}),(0,n.jsx)(r.td,{children:`3`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3,5,7]`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:`fifth call`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3,5,7]`})}),(0,n.jsx)(r.td,{children:`4`}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`[1,3,5,7,9]`})})]})]})]}),`
`,(0,n.jsxs)(r.h3,{id:`implement-reduce-using-objects`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#implement-reduce-using-objects`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Implement reduce using objects`]}),`
`,(0,n.jsx)(r.p,{children:`Alternatively, if we wanted to create an object instead of an array, we could use a similar logic and do the following:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var createWithReduce = function(start, stop, step){
  step = step || 1;
  var iterationCount = Array.apply(null, new Array((stop - start + 1) / step) );

  return iterationCount.reduce(function(previousValue, currentValue, index){
    previousValue[start + index * step] = start + index * step ;
    return previousValue;
  }, {} );
};
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};