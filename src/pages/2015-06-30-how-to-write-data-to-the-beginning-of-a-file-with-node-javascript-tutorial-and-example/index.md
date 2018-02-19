---
path: "/how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example"
date: "1435647600000"
published: true
tags: ["JavaScript"]
title: "How to write data to the beginning of a file with Node.js / JavaScript (tutorial and example)"
---

Recently I have had to do a lot of work building infrastructure converting data from `.json` to `.csv`. One challenge that presented itself was figuring out a way to prepend / write data to the beginning of the `.csv` file. There are plenty of use cases for prepending information to the beginning of a file, however in my specific use case I needed to count the number of times a variable existed in the `.json` data so that I could write out that many columns in the header of the `.csv` file.

The example below creates a `.csv` file using data extracted from a `.json` file via Node.js / JavaScript and then writes the header once the desired counts have been determined. To do so, we must first create a temporary file with the converted data (left), create a new file with the generated header (middle), then copy data from the temporary file into the new file (right).

### Part 1 - Variable setup

We will begin by setting up the variables and functions needed for the task at hand. The header functions have been abstracted and should be written for your specific need(s). Additionally, loading up the entire `.json` file into memory as depicted in this example has been used for simplicity; implementation of a readstream for reading the `.json` file would improve performance and allow you to read a larger file.

```javascript
// your .json data
var dataArrayJson = [{},{},...,{},{}];
// count of the desired variable
var count = 0;

// your desired function that converts the json data into a .csv row
var convertIntoCsvString = function(data){ return youCsvString; };
// your desired function that counts the number of times something occurs in the dataset
var getCount = function(data){ return dataCount; };

// your desired function that creates a row using the variable count
// i.e. returns something like 'Count-1,Count-2,Count-3' if the count is 3
var createCsvHeaderUsingCount = function(count){ return header; };

// create the writestream for the temporary file
var streamOptions = {flags: 'w', encoding: 'utf8'};
var writeStream = fs.createWriteStream("csvFilename-tmp.csv", streamOptions);
```

### Part 2 - `.json` to `.csv` conversion

Once we have the `.json` data loaded up, we will convert each index in the json array into a comma separated row using our `convertIntoCsvString` function, add a newline to the end of the row, and write the row to our temporary file `csvFilename-tmp.csv` using `fs.writestream`. Additionally, use our `getCount` function to track how often our deisred event or instance occurs.

Note, some version of `async.each` should be used to ensure that all the data has been analyzed at and written to the `.csv` file prior to closing the writestream. If the order of data analysis is significant and there is risk of race conditions to occur, `async.eachSeries` should be used.


```javascript
// loop over each object in the .json data
// the specified limit of 5 is arbitrary but eachLimit is recommended
async.eachLimit(dataArrayJson, 5, function(data, dataCb) {
  var row = convertIntoCsvString(data);
  count = Math.max( count, getCount(data) );

  // write the `.csv` row to the temporary file as a new row
  writeStream.write( row + "\n", 'utf8', function() {
    return dataCb();
  });
}, function(err){
  // close the writestream once done looping through the .json
  // note: async library ensures we have analyzed all the data
  writeStream.close();
});
```

### Part 3 - Header creation

With the desired information in hand, we can now create the custom header using createCsvHeaderUsingCount. The data is read from the temporary file `csvFilename-tmp.csv`, our header is prepended to this data, and our desired file csvFilename`.csv` is created. We delete the temporary file using a child process and then are left with our shiny new file ready for consumption.

```javascript
var header = createCsvHeaderUsingCount(count);
fs.readFile("csvFilename-tmp.csv", function(err, data) {
  data = header + '\n' + data;
  var newWriteStream = fs.createWriteStream("csvFilename.csv", streamOptions);
  newWriteStream.write(data, 'utf8', function() {
    // remove the temporary file
    childProcess.exec("rm -rf csvFilename-tmp.csv");
  });
});
```

### Uncommented code

Below is the code above condensed with comments removed.

```javascript
var dataArrayJson = [{},{},...,{},{}];

var convertIntoCsvString = function(data){ return youCsvString; };
var getCount = function(data){ return dataCount; };
var createCsvHeaderUsingCount = function(count){ return header; };

var count = 0;

var streamOptions = {flags: 'w', encoding: 'utf8'};
var writeStream = fs.createWriteStream("csvFilename-tmp.csv", streamOptions);
async.eachLimit(dataArrayJson, 5, function(data, dataCb) {
  var row = convertIntoCsvString(data);
  count = Math.max( count, getCount(data) );
  writeStream.write( row + "\n", 'utf8', function() {
    return dataCb();
  });
}, function(err){
  writeStream.close();
});

var header = createCsvHeaderUsingCount(count);
fs.readFile("csvFilename-tmp.csv", function(err, data) {
  data = header + '\n' + data;
  var newWriteStream = fs.createWriteStream("csvFilename.csv", streamOptions);
  newWriteStream.write(data, 'utf8', function() {
    childProcess.exec("rm -rf csvFilename-tmp.csv");
  });
});
```

