import{t as e}from"./index-BHGTRh0p.js";import{t}from"./lib-Ci7ycG-p.js";var n=e(),r={path:`/blog/how-to-modify-filter-and-save-json-files-locally-using-jquery`,date:`1412665200000`,published:!0,tags:[`jQuery`,`JavaScript`],title:`How to modify, filter, and save JSON files locally using jQuery`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`3/19/2015 Update:`}),` I went ahead and created a little application to help make things easier which can be found here `,(0,n.jsx)(r.a,{href:`https://github.com/jonsadka/jsonReducer`,children:`https://github.com/jonsadka/jsonReducer`})]}),`
`,(0,n.jsx)(r.p,{children:`There are many API’s available for use, many of which are free and provide lots of fun data to play with, however there is one common hurdle to overcome with each; the structure in which data is returned from the database varies greatly with each API. Upon an API request, the company server compiles this data into a JSON data object and sends it for a client’s use. The dataset returned is a one-size fits all approach and sometimes even requires postprocessing. Finding ways to postprocess this local data was lacking on the internet. I decided to create a way of my own by using Chrome and jQuery to filter this data, format the data in a desired format, and shrink the size of the file drastically.`}),`
`,(0,n.jsxs)(r.h3,{id:`jquery-script`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#jquery-script`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`jQuery script`]}),`
`,(0,n.jsxs)(r.p,{children:[`The first thing we must do is create a `,(0,n.jsx)(r.code,{children:`reducer.js`}),` file; `,(0,n.jsx)(r.code,{children:`reducer.js`}),` will contain the filter and formatting rules on a passed in JSON object. To start this script, we declare a global `,(0,n.jsx)(r.code,{children:`reducedData`}),` variable which will contain our final product. Right below this variable declaration we will use jQuery to import our data.json file and within that callback is where our data manipulation will occur. Once we are satisfied with how the data is formatted, we will set `,(0,n.jsx)(r.code,{children:`reducedData`}),` as the result of this operation as follows:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-javascript`,children:`// set the global variable
var reducedData;

// setup the jQuery function to fetch the local json file
var modifyData = function(){
  $.getJSON('data.json', function(json){
    var result;

    // modify data.json file and modify result;

    // set the result to reduced data before leaving the callback
    // write yourself a message indicating that the script is finished
    console.log('All done making your data smaller and prettier!');
    reducedData = result;
  });
};
`})}),`
`,(0,n.jsxs)(r.h3,{id:`html-component`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#html-component`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`html component`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now comes the fun, tricky part. We still have no easy way of running our `,(0,n.jsx)(r.code,{children:`reducer.js`}),` file and invoking modifyData. To accomplish this, we need to fool Chrome into thinking it’s communicating with a live server rather than our local machine because when developing locally, browsers often enforce strict permissions for reading files out of the local file system. First, lets create an `,(0,n.jsx)(r.code,{children:`index.html`}),` file so that Chrome has a page to navigate to. The following `,(0,n.jsx)(r.code,{children:`index.html`}),` file is sufficient and should also be placed in the same directory as `,(0,n.jsx)(r.code,{children:`reducer.js`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ReduceData</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"><\/script>
  </head>
  <body>
    <h3>Reduce The Data Please</h3>
    <script type="text/javascript" src="reducer.js" charset="utf-8"><\/script>
  </body>
</html>
`})}),`
`,(0,n.jsxs)(r.h3,{id:`server-setup`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#server-setup`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Server setup`]}),`
`,(0,n.jsxs)(r.p,{children:[`Next, we need to open up our terminal and navigate to the folder where our `,(0,n.jsx)(r.code,{children:`reducer.js`}),` file is. Once in that folder, we can run the following command to boot up a local server:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`python: `,(0,n.jsx)(r.code,{children:`python -m SimpleHTTPServer 8888`})]}),`
`,(0,n.jsxs)(r.li,{children:[`python 3+: `,(0,n.jsx)(r.code,{children:`python -m http.server 8888`})]}),`
`,(0,n.jsxs)(r.li,{children:[`php: `,(0,n.jsx)(r.code,{children:`php -S localhost:8888`})]}),`
`,(0,n.jsxs)(r.li,{children:[`ruby: `,(0,n.jsx)(r.code,{children:`ruby -run -e httpd . -p 8888`})]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Typically a message in the terminal will notify us to navigate to `,(0,n.jsx)(r.code,{children:`0.0.0.0:8888`}),`. Open up chrome and navigate to either `,(0,n.jsx)(r.code,{children:`0.0.0.0:8888`}),` or `,(0,n.jsx)(r.code,{children:`localhost:8888`}),`; you should see "Reduce The Data Please".
bring it all together`]}),`
`,(0,n.jsxs)(r.p,{children:[`Now, open up the Chrome console (`,(0,n.jsx)(r.code,{children:`command`}),` + `,(0,n.jsx)(r.code,{children:`option`}),` + `,(0,n.jsx)(r.code,{children:`j`}),`) and invoke `,(0,n.jsx)(r.code,{children:`modifyData()`}),`. Once the completion message "All done making your data smaller and prettier!"" is displayed, type `,(0,n.jsx)(r.code,{children:`copy(reducedData)`}),` into the console and volla! your data is copied into the clipboard and you can paste this new data anywhere you please.`]}),`
`,(0,n.jsxs)(r.p,{children:[`This is just a boilerplate reducer file and I often find myself adding additional arguments to `,(0,n.jsx)(r.code,{children:`modifyData`}),`. I also want to mention that it appears that this process caps at around a 20MB `,(0,n.jsx)(r.code,{children:`data.json`}),` file for Chrome, so it is not a foolproof method but can handle somewhat meaningful data sets.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};