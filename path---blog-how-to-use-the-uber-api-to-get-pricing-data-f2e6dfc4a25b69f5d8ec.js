webpackJsonp([0xa8fa18c0db15],{388:function(e,t){e.exports={data:{markdownRemark:{html:'<p>Uber opened up their API to developer and as a fun experiment, I decided to play around with the Uber API, collect a few days worth of data and see if any trends were apparent (<a href="http://jonsadka.github.io/uberAnalytics/">http://jonsadka.github.io/uberAnalytics/</a>).</p>\n<p>To make a successful pricing data request, Uber’s API requires a latitude and longitude of the desired start/pickup position and the latitude and longitude of the desired end/dropoff position. In return, Uber returns a JavaScript object containing pricing information for that specific request at that instance in time. The following is one such result from a request:</p>\n<pre><code class="language-json">{\n  "prices": [\n    {\n      "product_id": "08f17084-23fd-4103-aa3e-9b660223934b",\n      "currency_code": "USD",\n      "display_name": "UberBLACK",\n      "estimate": "$23-29",\n      "low_estimate": 23,\n      "high_estimate": 29,\n      "surge_multiplier": 1\n    },\n    {\n      "product_id": "9af0174c-8939-4ef6-8e91-1a43a0e7c6f6",\n      "currency_code": "USD",\n      "display_name": "UberSUV",\n      "estimate": "$36-44",\n      "low_estimate": 36,\n      "high_estimate": 44,\n      "surge_multiplier": 1.25\n    },\n    {\n      "product_id": "aca52cea-9701-4903-9f34-9a2395253acb",\n      "currency_code": null,\n      "display_name": "uberTAXI",\n      "estimate": "Metered",\n      "low_estimate": null,\n      "high_estimate": null,\n      "surge_multiplier": 1\n    },\n    {\n      "product_id": "a27a867a-35f4-4253-8d04-61ae80a40df5",\n      "currency_code": "USD",\n      "display_name": "uberX",\n      "estimate": "$15",\n      "low_estimate": 15,\n      "high_estimate": 15,\n      "surge_multiplier": 1\n    }\n  ]\n}\n</code></pre>\n<p>As one might expect, Uber returns all available pricing data at that instance in time for all transportation options available. For example, not all cities have uberTAXI, uberXL, uberSUV, uberBLACK; the object that is returned from the request will only contain information about the transportation modes that exists for the route specified.</p>\n<h3>Make a request</h3>\n<p>As a quick walkthrough, let’s simulate making a pricing data request from San Francisco International Airport to the Powell and Market stop in downtown San Francisco. First, we need to format the desired request. In this example, we are interested in pricing data so our request will be <code>/estimates/price</code>. Other types of data can be requested from Uber, such as product availability, time estimates, and user-specific activity. These options can be found here: <a href="https://developer.uber.com/v1/endpoints/">https://developer.uber.com/v1/endpoints/</a>.</p>\n<p>Next, we need to get the latitude and longitude for the desired start and end location. For this example, we will use the following points:</p>\n<ul>\n<li>SFO: 37.625732, -122.377807 (latitude, longitude)</li>\n<li>Powell &#x26; Market: 37.785114, -122.406677 (latitude, longitude)</li>\n</ul>\n<p>The last step before we make our request is to get our server token from Uber. Think of this token as a way for Uber to identify and authenticate the developer initiating the request. To do this, one must log into Uber, signup for a developer account, and save the token. My token came in the following 39 character format mixed with lower-case letters, upper-case letters and numbers: <code>xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx</code>.</p>\n<p>Now that we have compiled all the necessary information, we can make our request:</p>\n<pre><code class="language-bash">https://api.uber.com/v1/estimates/price?start_latitude=37.625732&#x26;start_longitude=-122.377807&#x26;end_latitude=37.785114&#x26;end_longitude=-122.406677&#x26;server_token=xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx\n</code></pre>\n<p>I have compiled and visualized the data I have gathered over the past few days for viewing and exploration (<a href="http://jonsadka.github.io/uberAnalytics/">http://jonsadka.github.io/uberAnalytics/</a>). One can observe some significant trends, which I will talk about in a later post.</p>',frontmatter:{date:"1409295600000",path:"/blog/how-to-use-the-uber-api-to-get-pricing-data",title:"How to use the Uber API to get pricing data"}}},pathContext:{}}}});
//# sourceMappingURL=path---blog-how-to-use-the-uber-api-to-get-pricing-data-f2e6dfc4a25b69f5d8ec.js.map