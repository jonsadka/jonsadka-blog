---
path: "/blog/how-to-use-the-uber-api-to-get-pricing-data"
date: "1409295600000"
published: true
tags: ["API", "JavaScript"]
title: "How to use the Uber API to get pricing data"
---

Uber opened up their API to developer and as a fun experiment, I decided to play around with the Uber API, collect a few days worth of data and see if any trends were apparent ([http://jonsadka.github.io/uberAnalytics/](http://jonsadka.github.io/uberAnalytics/)).

To make a successful pricing data request, Uber’s API requires a latitude and longitude of the desired start/pickup position and the latitude and longitude of the desired end/dropoff position. In return, Uber returns a JavaScript object containing pricing information for that specific request at that instance in time. The following is one such result from a request:

```json
{
  "prices": [
    {
      "product_id": "08f17084-23fd-4103-aa3e-9b660223934b",
      "currency_code": "USD",
      "display_name": "UberBLACK",
      "estimate": "$23-29",
      "low_estimate": 23,
      "high_estimate": 29,
      "surge_multiplier": 1
    },
    {
      "product_id": "9af0174c-8939-4ef6-8e91-1a43a0e7c6f6",
      "currency_code": "USD",
      "display_name": "UberSUV",
      "estimate": "$36-44",
      "low_estimate": 36,
      "high_estimate": 44,
      "surge_multiplier": 1.25
    },
    {
      "product_id": "aca52cea-9701-4903-9f34-9a2395253acb",
      "currency_code": null,
      "display_name": "uberTAXI",
      "estimate": "Metered",
      "low_estimate": null,
      "high_estimate": null,
      "surge_multiplier": 1
    },
    {
      "product_id": "a27a867a-35f4-4253-8d04-61ae80a40df5",
      "currency_code": "USD",
      "display_name": "uberX",
      "estimate": "$15",
      "low_estimate": 15,
      "high_estimate": 15,
      "surge_multiplier": 1
    }
  ]
}
```

As one might expect, Uber returns all available pricing data at that instance in time for all transportation options available. For example, not all cities have uberTAXI, uberXL, uberSUV, uberBLACK; the object that is returned from the request will only contain information about the transportation modes that exists for the route specified.

### Make a request

As a quick walkthrough, let’s simulate making a pricing data request from San Francisco International Airport to the Powell and Market stop in downtown San Francisco. First, we need to format the desired request. In this example, we are interested in pricing data so our request will be `/estimates/price`. Other types of data can be requested from Uber, such as product availability, time estimates, and user-specific activity. These options can be found here: [https://developer.uber.com/v1/endpoints/](https://developer.uber.com/v1/endpoints/).

Next, we need to get the latitude and longitude for the desired start and end location. For this example, we will use the following points:

- SFO: 37.625732, -122.377807 (latitude, longitude)
- Powell & Market: 37.785114, -122.406677 (latitude, longitude)

The last step before we make our request is to get our server token from Uber. Think of this token as a way for Uber to identify and authenticate the developer initiating the request. To do this, one must log into Uber, signup for a developer account, and save the token. My token came in the following 39 character format mixed with lower-case letters, upper-case letters and numbers: `xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx`.

Now that we have compiled all the necessary information, we can make our request:

```bash
https://api.uber.com/v1/estimates/price?start_latitude=37.625732&start_longitude=-122.377807&end_latitude=37.785114&end_longitude=-122.406677&server_token=xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx
```

I have compiled and visualized the data I have gathered over the past few days for viewing and exploration ([http://jonsadka.github.io/uberAnalytics/](http://jonsadka.github.io/uberAnalytics/)). One can observe some significant trends, which I will talk about in a later post.

