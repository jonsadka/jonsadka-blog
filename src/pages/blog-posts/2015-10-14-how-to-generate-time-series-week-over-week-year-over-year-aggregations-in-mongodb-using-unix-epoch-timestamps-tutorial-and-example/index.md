---
path: "/blog/how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example"
date: "1444806000000"
published: true
tags: ["JavaScript", "MongoDB"]
title: "How to generate time series aggregations in MongoDB using Unix / Epoch timestamps (week over week, year over year, etc. tutorial and example)"
---

ECMAScript5 introduced `Date.now()`, a method that returns the milliseconds elapsed since `1 January 1970 00:00:00 UTC` up until now as a `Number`. `Date.now()` is the fastest way to record a timestamp in JavaScript<sup>[[1]](https://jsperf.com/date-now-vs-new-date-gettime/11), [[2]](http://jsperf.com/date-now-vs-new-date-gettime/8)</sup> and as such, usage will continue to increase as developers become educated in speed improvements.

While speed improvements are important, storing Unix / Epoch timestamps in MongoDB come with a quirk; MongoDB only support BSON native date objects. What this means as a developer is that the [Date Aggregation Operators](http://docs.mongodb.org/manual/reference/operator/aggregation-date) such as `$dayOfWeek` and `$dayOfYear` are unusable natively. This poses a challenge when trying to obtain time series reports such as week over week reports, month over month reports, year over year reports, etc. There are two tricks one can use to solving this problem.

### Sample data

For the proceeding examples, we will assume our database has a collection called `shipments` and documents that look like this:

```json
// documents in the shipment collection
{
  _id : "ef0581de-7cae-4e18-8c25-e6ea36489793",
  contents : "Microsoft Glass 19",
},
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  contents : "Apple iPhone 7",
  sentAt : 1444438552674
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  contents : "Samsung Galaxy 6 Edge+",
  sentAt : 1436684400000
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  contents : "Nokia 8850",
  sentAt : 920880000000
}
```

### Approach 1

The first approach can be achieved by using an addition aggregation to convert the timestamp into a BSON object in memory then utilize MongoDB’s Date Aggregation Operators to obtain the desired result. Below is an example of this approach.

MongoDB query | MongoDB result
```json
// Finds all sent shipments
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } }
  ]
)
```
 |
```json
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  contents : "Apple iPhone 7",
  sentAt : 1444438552674
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  contents : "Samsung Galaxy 6 Edge+",
  sentAt : 1436684400000
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  contents : "Nokia 8850",
  sentAt : 920880000000
}
```
```json
// Finds all sent shipments, returning the BSON timestamp
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } },
    { $project : { "mongoTimestamp" : {$add : [new Date(0), "$sentAt"] } } }
  ]
)
```
 |
```json
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  mongoTimestamp : ISODate("2015-07-02T22:09:48.911Z")
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  mongoTimestamp : ISODate("2015-07-02T22:09:48.911Z")
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  mongoTimestamp : ISODate("2015-07-02T22:09:48.911Z")
}
```
```json
// Finds all sent shipments, returning the year shipped
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } },
    { $project : { "mongoTimestamp" : { $add : [new Date(0), "$sentAt"] } } },
    { $project : { "year_shipped" : { $year : "$mongoTimestamp" } } }
  ]
)
```
 |
```json
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  year_shipped : 2015
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  year_shipped : 2015
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  year_shipped : 1999
}
```
```json
// Finds counts of all sent shipments, grouped by year
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } },
    { $project : { "mongoTimestamp" : { $add : [new Date(0), "$sentAt"] } } },
    { $project : { "year_shipped" : { $year : "$mongoTimestamp" } } },
    { $group : { _id : {year_shipped : "$year_shipped" } , number : { $sum : 1 } } }
  ]
)
```
 |
```json
{
  _id : { year_shipped : 2015 },
  number: 2
},
{
  _id : { year_shipped : 1999 },
  number: 1
}
```

### Approach 2

Approach 1 above works fine and is probably the preferred method, however in many production type situations the query is stringified by a framework or application prior to submitting / sending the query. If this were true in the above example, `{ $add : [new Date(0), "$sentAt"] }` would have been converted to `{ $add : ["Wed Dec 31 1969 16:00:00 GMT-0800 (PST)", "$sentAt"] }` prior to submission, causing MongoDB to return the error message `"errmsg" : "exception: $add only supports numeric or date types, not String"`.

A workaround to the above problem can be had using the `n - (n % )` modulo trick. This equation allows us to round any number to the nearest interval. For example, if we had a list of numbers such as `105.2`, `251` and `170.1` and we wanted to round to the nearest hundreth, performing the above operations on each number using the interval of 100 would result in `100`, `200`, and `100`. We can extrapolate this logic and apply it to days, weeks, months, quarters, years, etc. Note, one limitation of this method is that it does not honor daylight savings time.

Now, let’s apply Approach 2 to the same shipments example. For reference, one year is equivalent to 31,556,908,800 milliseconds.

MongoDB query | MongoDB result
```json
// Finds all sent shipments
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } }
  ]
)
```
 |
```json
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  contents : "Apple iPhone 7",
  sentAt : 1444438552674
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  contents : "Samsung Galaxy 6 Edge+",
  sentAt : 1436684400000
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  contents : "Nokia 8850",
  sentAt : 920880000000
}
```
```json
// Finds all sent shipments, returning the year shipped in milliseconds
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } },
    { $project : { "year_shipped" :
      { $subtract : ["$sentAt", {$mod : ["$sentAt", 31556908800] } ] },
    } }
  ]
)
```
 |
```json
{
  _id : "8b0b5ec1-f6c2-4637-a560-75d96ec6f19b",
  year_shipped : 1420060896000
},
{
  _id : "2643046-92c3-4fa9-aa51-c6f3e668bde5",
  year_shipped : 1420060896000
},
{
  _id : "a3b673ee-17f9-4e9c-aa68-a70fac19ea10",
  year_shipped : 915150355200
}
```
```json
// Finds all shipments that have been sent and groups by year
db.shipments.aggregate(
  [
    { $match : { "sentAt" : { "$exists" : 1 } } },
    { $project : { "year_shipped" :
      { $subtract : ["$sentAt", {$mod : ["$sentAt", 31556908800] } ] },
      { $group : { _id : {year_shipped : "$year_shipped" } , number : { $sum : 1 } } }
    } }
  ]
)
```
 |
```json
{
  _id : { year_shipped : 1420060896000 },
  number: 2
},
{
  _id : { year_shipped : 915150355200 },
  number: 1
}
```
