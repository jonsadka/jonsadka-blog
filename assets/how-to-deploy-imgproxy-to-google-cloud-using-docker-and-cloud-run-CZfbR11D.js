import{t as e}from"./index-CC4pwC9H.js";import{t}from"./lib-DVGn8KeT.js";var n=e(),r={path:`/blog/how-to-deploy-imgproxy-to-google-cloud-using-docker-and-cloud-run`,date:`1590562800000`,published:!0,tags:[`Infrastructure`],title:`How to deploy imgproxy to Google Cloud using Docker and Cloud Run`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,span:`span`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.h3,{id:`goal`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#goal`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Goal`]}),`
`,(0,n.jsx)(r.p,{children:`Be able to host a production instance of imgproxy on Google Cloud within minutes.`}),`
`,(0,n.jsxs)(r.h3,{id:`first-time-installation`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#first-time-installation`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`First time installation`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Open the Cloud Terminal`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Follow the `,(0,n.jsx)(r.code,{children:`Before you begin`}),` section listed here (`,(0,n.jsx)(r.a,{href:`https://cloud.google.com/container-registry/docs/pushing-and-pulling`,children:`https://cloud.google.com/container-registry/docs/pushing-and-pulling`}),`)`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:"$ sudo usermod -a -G docker ${USER}"})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ gcloud auth configure-docker`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Pull the latest docker image (`,(0,n.jsx)(r.a,{href:`https://docs.imgproxy.net/#/installation`,children:`https://docs.imgproxy.net/#/installation`}),`)`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker pull darthsim/imgproxy:latest`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Tag the container`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker tag darthsim/imgproxy gcr.io/xxxxx-public-assets/imgproxy`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Push the container`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker push gcr.io/xxxxx-public-assets/imgproxy`})}),`
`,(0,n.jsxs)(r.li,{children:[`Copy the sha (i.e. `,(0,n.jsx)(r.code,{children:`sha256:12345...54321`}),`)`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Head to `,(0,n.jsx)(r.code,{children:`Cloud Run`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Create Service`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Enter your service name (i.e. `,(0,n.jsx)(r.code,{children:`xxxxx-imgproxy-production`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`Click `,(0,n.jsx)(r.code,{children:`Allow unauthenticated invocations`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Hit Next, click `,(0,n.jsx)(r.code,{children:`Select`}),` on the input and search for the desired image`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Alternatively, manually build the url and paste the sha (or `,(0,n.jsx)(r.code,{children:`gcr.io/xxxxx-public-assets/imgproxy@sha256:12345...54321`}),`)`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Add any environment variables like `,(0,n.jsx)(r.code,{children:`IMGPROXY_KEY`}),` and `,(0,n.jsx)(r.code,{children:`IMGPROXY_SALT`})]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`See `,(0,n.jsx)(r.a,{href:`https://cloud.google.com/run/docs/configuring/environment-variables`,children:`https://cloud.google.com/run/docs/configuring/environment-variables`})]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.h3,{id:`updating-the-image`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#updating-the-image`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Updating the image`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Open the Cloud Terminal`}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Follow the `,(0,n.jsx)(r.code,{children:`Before you begin`}),` section listed here (`,(0,n.jsx)(r.a,{href:`https://cloud.google.com/container-registry/docs/pushing-and-pulling`,children:`https://cloud.google.com/container-registry/docs/pushing-and-pulling`}),`)`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:"$ sudo usermod -a -G docker ${USER}"})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ gcloud auth configure-docker`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Pull the latest docker image (`,(0,n.jsx)(r.a,{href:`https://docs.imgproxy.net/#/installation`,children:`https://docs.imgproxy.net/#/installation`}),`)`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker pull darthsim/imgproxy:latest`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Tag the container`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker tag darthsim/imgproxy gcr.io/xxxxx-public-assets/imgproxy`})}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Push the container`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`$ docker push gcr.io/xxxxx-public-assets/imgproxy`})}),`
`,(0,n.jsxs)(r.li,{children:[`Copy the sha (i.e. `,(0,n.jsx)(r.code,{children:`sha256:12345...54321`}),`)`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Head to `,(0,n.jsx)(r.code,{children:`Cloud Run`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Click on the name of the service you wish to update (i.e. `,(0,n.jsx)(r.code,{children:`xxxxx-imgproxy-production`}),`)`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Click `,(0,n.jsx)(r.code,{children:`Edit & Depoly New Revision`}),` at the top of the page`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Slick `,(0,n.jsx)(r.code,{children:`Select`}),` on the input and search for the desired image`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Alternatively, manually build the url and paste the sha (or `,(0,n.jsx)(r.code,{children:`gcr.io/xxxxx-public-assets/imgproxy@sha256:12345...54321`}),`)`]}),`
`]}),`
`]}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};