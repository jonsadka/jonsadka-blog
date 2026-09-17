import{t as e}from"./index-CUqiFNbr.js";import{t}from"./lib-t3kAbS33.js";var n=e(),r={path:`/blog/supercharge-your-falsey-conditional-statements-in-javascript`,date:`1406703600000`,published:!0,tags:[`JavaScript`],title:`Supercharge your falsey && conditional statements in JavaScript`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`Over the past few days, I have discovered the large potential of falsey values (`,(0,n.jsx)(r.code,{children:`false`}),`, `,(0,n.jsx)(r.code,{children:`0`}),`, `,(0,n.jsx)(r.code,{children:`""`}),`, `,(0,n.jsx)(r.code,{children:`null`}),`, `,(0,n.jsx)(r.code,{children:`undefined`}),`, `,(0,n.jsx)(r.code,{children:`NaN`}),`) to provide direction and simplify code in javascript.  If used correctly, one can replace multi-line logical expressions with logical operator expressions.`]}),`
`,(0,n.jsxs)(r.h3,{id:`counting-example`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#counting-example`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Counting example`]}),`
`,(0,n.jsxs)(r.p,{children:[`To exhibit this point, let’s take a look at the example of decrementing a number variable named `,(0,n.jsx)(r.code,{children:`count`}),`.  In this example, when `,(0,n.jsx)(r.code,{children:`count`}),` reaches zero, we want the program to stop decrementing `,(0,n.jsx)(r.code,{children:`count`}),`, as exhibited below.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`if ( count > 0 ){
  count--;
}
`})}),`
`,(0,n.jsxs)(r.p,{children:[`However, a subtle simplification can be made in line 1 using our understanding of fasey values; when the value of `,(0,n.jsx)(r.code,{children:`count`}),` changes to zero, the evaluation of `,(0,n.jsx)(r.code,{children:`count`}),` returns false because because zero is a falsey value.  Therefore, we could rewrite the example as follows:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`if ( count ){
  count--;
}
`})}),`
`,(0,n.jsxs)(r.h3,{id:`reasoning`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#reasoning`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Reasoning`]}),`
`,(0,n.jsxs)(r.p,{children:[`The reason these two examples reach the same outcome is because if `,(0,n.jsx)(r.code,{children:`count`}),` is a number greater than zero, it is inherently non-falsey and will therefore evaluate to true.  Alternatively, if `,(0,n.jsx)(r.code,{children:`count`}),` is set to zero, the statement will evaluate to false and `,(0,n.jsx)(r.code,{children:`count`}),` will stop decrementing.  Although our line count does not change between the two examples, this fundamental understanding that falsey values evaluate to false is essential to continue.  Next, we need to understand how logical operators function within javascript.  For this example, let’s analyze the and (`,(0,n.jsx)(r.code,{children:`&&`}),`) evaulation.  The following four conditions are possible using the `,(0,n.jsx)(r.code,{children:`&&`}),` evaluation:`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`true && true;`}),`      returns the second truthy case`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`true && false;`}),`     returns the falsey case`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`false && true;`}),`     returns the falsey case`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`false && false;`}),`    returns the first falsey case`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Now, when we combine falsey values and logical operators, we see how the above example can be rewritten and simplified to the following single-line logical expression:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`count && count--;
`})}),`
`,(0,n.jsxs)(r.p,{children:[`If the value of `,(0,n.jsx)(r.code,{children:`count`}),` is greater than zero, `,(0,n.jsx)(r.code,{children:`count`}),` evaluates to true; however, the expression of decrementing the `,(0,n.jsx)(r.code,{children:`count`}),` variable is also true, therefore javascript returns the second truthy condition, i.e. decrementing the `,(0,n.jsx)(r.code,{children:`count`}),` variable.  When the `,(0,n.jsx)(r.code,{children:`count`}),` variable reaches zero, we now trigger a false condition and this line will essentially be skipped by javascript.  The table below depicts an example of this scenario where `,(0,n.jsx)(r.code,{children:`count`}),` is initially set to 5.`]}),`
`,(0,n.jsxs)(r.table,{children:[(0,n.jsx)(r.thead,{children:(0,n.jsxs)(r.tr,{children:[(0,n.jsxs)(r.th,{children:[(0,n.jsx)(r.code,{children:`count`}),` value pre-invocation`]}),(0,n.jsxs)(r.th,{children:[`evaluation of `,(0,n.jsx)(r.code,{children:`count && count–`})]}),(0,n.jsx)(r.th,{children:`returned value`}),(0,n.jsxs)(r.th,{children:[(0,n.jsx)(r.code,{children:`count`}),` value post-invocation`]})]})}),(0,n.jsxs)(r.tbody,{children:[(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`5`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`true && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`true`}),` (count–)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`4`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`4`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`true && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`true`}),` (count–)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`3`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`3`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`true && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`true`}),` (count–)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`2`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`2`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`true && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`true`}),` (count–)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`1`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`1`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`true && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`true`}),` (count–)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`0`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`0`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`false && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`false`}),` (count)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`0`})})]}),(0,n.jsxs)(r.tr,{children:[(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`0`})}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`false && true`})}),(0,n.jsxs)(r.td,{children:[(0,n.jsx)(r.code,{children:`false`}),` (count)`]}),(0,n.jsx)(r.td,{children:(0,n.jsx)(r.code,{children:`0`})})]})]})]}),`
`,(0,n.jsxs)(r.h3,{id:`summary`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#summary`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Summary`]}),`
`,(0,n.jsxs)(r.p,{children:[`Additionally, below are two fully functioning recursive examples, one using the traditional approach (`,(0,n.jsx)(r.code,{children:`example1`}),`) and one using the simplified method described (`,(0,n.jsx)(r.code,{children:`example2`}),`).`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var example1 = function(count){
  if ( count === 0 ){
    return (“Finished decrementing!”);
  } else {
    count--;
  }
  console.log(count);
  example1(count);
};

example1(5);
`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`var example2 = function(count){
  if ( count && count-- ) {
    console.log(count);
    example2(count);
  }
  return (“Finished decrementing!”);
};

example2(5);
`})})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};