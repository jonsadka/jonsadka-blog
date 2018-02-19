---
path: "/how-to-modify-filter-and-save-json-files-locally-using-jquery"
date: "1412665200000"
published: true
tags: ["jQuery", "JavaScript"]
title: "How to modify, filter, and save JSON files locally using jQuery"
---

**3/19/2015 Update:** I went ahead and created a little application to help make things easier which can be found here https://github.com/jonsadka/jsonReducer

There are many API’s available for use, many of which are free and provide lots of fun data to play with, however there is one common hurdle to overcome with each; the structure in which data is returned from the database varies greatly with each API. Upon an API request, the company server compiles this data into a JSON data object and sends it for a client’s use. The dataset returned is a one-size fits all approach and sometimes even requires postprocessing. Finding ways to postprocess this local data was lacking on the internet. I decided to create a way of my own by using Chrome and jQuery to filter this data, format the data in a desired format, and shrink the size of the file drastically.

### jQuery script

The first thing we must do is create a `reducer.js` file; `reducer.js` will contain the filter and formatting rules on a passed in JSON object. To start this script, we declare a global `reducedData` variable which will contain our final product. Right below this variable declaration we will use jQuery to import our data.json file and within that callback is where our data manipulation will occur. Once we are satisfied with how the data is formatted, we will set `reducedData` as the result of this operation as follows:

```javascript
// set the global variable
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
```

### html component

Now comes the fun, tricky part. We still have no easy way of running our `reducer.js` file and invoking modifyData. To accomplish this, we need to fool Chrome into thinking it’s communicating with a live server rather than our local machine because when developing locally, browsers often enforce strict permissions for reading files out of the local file system. First, lets create an `index.html` file so that Chrome has a page to navigate to. The following `index.html` file is sufficient and should also be placed in the same directory as `reducer.js`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ReduceData</title>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  </head>
  <body>
    <h3>Reduce The Data Please</h3>
    <script type="text/javascript" src="reducer.js" charset="utf-8"></script>
  </body>
</html>
```

### Server setup

Next, we need to open up our terminal and navigate to the folder where our `reducer.js` file is. Once in that folder, we can run the following command to boot up a local server:

- python: `python -m SimpleHTTPServer 8888`
- python 3+: `python -m http.server 8888`
- php: `php -S localhost:8888`
- ruby: `ruby -run -e httpd . -p 8888`

Typically a message in the terminal will notify us to navigate to `0.0.0.0:8888`. Open up chrome and navigate to either `0.0.0.0:8888` or `localhost:8888`; you should see "Reduce The Data Please".
bring it all together

Now, open up the Chrome console (`command` + `option` + `j`) and invoke `modifyData()`. Once the completion message "All done making your data smaller and prettier!"" is displayed, type `copy(reducedData)` into the console and volla! your data is copied into the clipboard and you can paste this new data anywhere you please.

This is just a boilerplate reducer file and I often find myself adding additional arguments to `modifyData`. I also want to mention that it appears that this process caps at around a 20MB `data.json` file for Chrome, so it is not a foolproof method but can handle somewhat meaningful data sets.

