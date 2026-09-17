import{t as e}from"./index-CUqiFNbr.js";import{t}from"./lib-t3kAbS33.js";var n=e(),r={path:`/blog/how-to-use-the-uber-api-to-get-pricing-data`,date:`1409295600000`,published:!0,tags:[`API`,`JavaScript`],title:`How to use the Uber API to get pricing data`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,span:`span`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`Uber opened up their API to developer and as a fun experiment, I decided to play around with the Uber API, collect a few days worth of data and see if any trends were apparent (`,(0,n.jsx)(r.a,{href:`http://jonsadka.github.io/uberAnalytics/`,children:`http://jonsadka.github.io/uberAnalytics/`}),`).`]}),`
`,(0,n.jsx)(r.p,{children:`To make a successful pricing data request, Uber’s API requires a latitude and longitude of the desired start/pickup position and the latitude and longitude of the desired end/dropoff position. In return, Uber returns a JavaScript object containing pricing information for that specific request at that instance in time. The following is one such result from a request:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-json`,children:`{
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
`})}),`
`,(0,n.jsx)(r.p,{children:`As one might expect, Uber returns all available pricing data at that instance in time for all transportation options available. For example, not all cities have uberTAXI, uberXL, uberSUV, uberBLACK; the object that is returned from the request will only contain information about the transportation modes that exists for the route specified.`}),`
`,(0,n.jsxs)(r.h3,{id:`make-a-request`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#make-a-request`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Make a request`]}),`
`,(0,n.jsxs)(r.p,{children:[`As a quick walkthrough, let’s simulate making a pricing data request from San Francisco International Airport to the Powell and Market stop in downtown San Francisco. First, we need to format the desired request. In this example, we are interested in pricing data so our request will be `,(0,n.jsx)(r.code,{children:`/estimates/price`}),`. Other types of data can be requested from Uber, such as product availability, time estimates, and user-specific activity. These options can be found here: `,(0,n.jsx)(r.a,{href:`https://developer.uber.com/v1/endpoints/`,children:`https://developer.uber.com/v1/endpoints/`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`Next, we need to get the latitude and longitude for the desired start and end location. For this example, we will use the following points:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`SFO: 37.625732, -122.377807 (latitude, longitude)`}),`
`,(0,n.jsx)(r.li,{children:`Powell & Market: 37.785114, -122.406677 (latitude, longitude)`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`The last step before we make our request is to get our server token from Uber. Think of this token as a way for Uber to identify and authenticate the developer initiating the request. To do this, one must log into Uber, signup for a developer account, and save the token. My token came in the following 39 character format mixed with lower-case letters, upper-case letters and numbers: `,(0,n.jsx)(r.code,{children:`xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx`}),`.`]}),`
`,(0,n.jsx)(r.p,{children:`Now that we have compiled all the necessary information, we can make our request:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`https://api.uber.com/v1/estimates/price?start_latitude=37.625732&start_longitude=-122.377807&end_latitude=37.785114&end_longitude=-122.406677&server_token=xxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxx
`})}),`
`,(0,n.jsxs)(r.p,{children:[`I have compiled and visualized the data I have gathered over the past few days for viewing and exploration (`,(0,n.jsx)(r.a,{href:`http://jonsadka.github.io/uberAnalytics/`,children:`http://jonsadka.github.io/uberAnalytics/`}),`). One can observe some significant trends, which I will talk about in a later post.`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};