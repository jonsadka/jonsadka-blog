import{t as e}from"./index-Be0N7XYi.js";import{t}from"./lib-D0tD3C8d.js";var n=e(),r={path:`/blog/how-to-debug-a-chrome-specific-bug-on-ios-using-remote-debugging`,date:`1526454000000`,published:!0,tags:[`JavaScript`],title:`How to debug an issue in Chrome for iOS using remote debugging`};function i(e){let r={a:`a`,code:`code`,h3:`h3`,img:`img`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,span:`span`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(r.p,{children:[`I recently had the opportunity to implement some new visualizations for Uber City Guides. Before launch, we discovered a strange bug that only occurred on Chrome for iOS. Even though there are some helpful guides online on how to debug Chrome specific bugs on iOS (like `,(0,n.jsx)(r.a,{href:`https://stackoverflow.com/questions/38179396/is-there-any-way-to-debug-chrome-in-any-ios-device`,children:`this`}),`) I couldn't find a comprehensive guide from start to finish, so I decided to create one.`]}),`
`,(0,n.jsxs)(r.h3,{id:`installation-and-setup`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#installation-and-setup`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Installation and Setup`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Install RemoteDebug iOS WebKit Adapter on your OSX computer (Mac)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`This requires you to first install two dependencies using `,(0,n.jsx)(r.code,{children:`brew`}),` (`,(0,n.jsx)(r.a,{href:`https://github.com/libimobiledevice/libimobiledevice`,children:`libimobiledevice`}),` and `,(0,n.jsx)(r.a,{href:`https://github.com/google/ios-webkit-debug-proxy`,children:`iOS WebKit Debug Proxy`}),`)`,`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`$ brew update
$ brew unlink libimobiledevice ios-webkit-debug-proxy usbmuxd
$ brew uninstall --force libimobiledevice ios-webkit-debug-proxy usbmuxd
$ brew install --HEAD usbmuxd
$ brew install --HEAD libimobiledevice
$ brew install --HEAD ios-webkit-debug-proxy
`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`Then install `,(0,n.jsx)(r.a,{href:`https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter`,children:`RemoteDebug iOS WebKit Adapter`}),` globally:`,`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`$ npm install remotedebug-ios-webkit-adapter -g
`})}),`
`,`or if you are experiencing `,(0,n.jsx)(r.a,{href:`https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/issues/180`,children:`issues`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`$ npm install remotedebug-ios-webkit-adapter@next -g
`})}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Enable the Web Inspector on your iOS device (iPhone or iPad)`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Choose Settings > Safari > Advanced`}),`
`,(0,n.jsx)(r.li,{children:`Toggle "Web Inspector" on`}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Enable the Develop Menu in Safari on your OSX computer (`,(0,n.jsx)(r.a,{href:`https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/Web_Inspector_Tutorial/EnableWebInspector/EnableWebInspector.html`,children:`official link`}),`)`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Choose Safari > Preferences, and click Advanced`}),`
`,(0,n.jsx)(r.li,{children:`At the bottom of the pane, select the "Show Develop menu in menu bar" checkbox.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/1.png`,alt:`Safari Preferences Menu`,title:`Safari Preferences Menu`}),`
`,(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/2.png`,alt:`Safari Advanced Settings`,title:`Safari Advanced Settings`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Allow your OSX computer to access your iOS device`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Connect your iOS device to your OSX computer using your USB cable`}),`
`,(0,n.jsx)(r.li,{children:`Open Safari on OSX`}),`
`,(0,n.jsx)(r.li,{children:`Develop > Hover over your iOS device`}),`
`,(0,n.jsx)(r.li,{children:`Click "Use for Development..."`}),`
`,(0,n.jsx)(r.li,{children:`On your iOS device, click "Trust" when you see the "Trust this Computer?" prompt`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/3.png`,alt:`Safari Trust Computer`,title:`Safari Trust Computer`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Setup device discovery in Chrome on OSX`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open Chrome on your OSX computer and navigate to `,(0,n.jsx)(r.code,{children:`chrome://inspect/#devices`})]}),`
`,(0,n.jsx)(r.li,{children:`Select the "Discover network targets" checkbox and click the "Configure" button`}),`
`,(0,n.jsx)(r.li,{children:`Add "localhost:9000" to the list of hosts`}),`
`,(0,n.jsx)(r.li,{children:`Click "Done"`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/4.png`,alt:`Chrome Inspect Devices`,title:`Chrome Inspect Devices`}),`
`,(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/5.png`,alt:`Chrome Inspect Devices`,title:`Chrome Inspect Devices`})]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.h3,{id:`debugging`,children:[(0,n.jsx)(r.a,{"aria-hidden":`true`,tabIndex:`-1`,href:`#debugging`,children:(0,n.jsx)(r.span,{className:`icon icon-link`})}),`Debugging`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`[Optional if developing locally] Identify local server address`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Run your server locally on your OSX computer`}),`
`,(0,n.jsxs)(r.li,{children:[`Identify the port your webpage is being served from (typically `,(0,n.jsx)(r.code,{children:`http://localhost:<port>`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:`Open System Preferences on OSX`}),`
`,(0,n.jsxs)(r.li,{children:[`Click "Sharing" and identify the computer name (typically `,(0,n.jsx)(r.code,{children:`<computername>.local`}),`)`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/6.png`,alt:`OSX System Preferences`,title:`OSX System Preferences`}),`
`,(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/7.png`,alt:`OSX Sharing Settings`,title:`OSX Sharing Settings`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Load the webpage on your iOS device`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Make sure your iOS device is connected to your OSX computer using your USB cable`}),`
`,(0,n.jsxs)(r.li,{children:[`On your iOS device, open Safari and navigate to the page you are trying to debug (i.e. `,(0,n.jsx)(r.code,{children:`<websitename>.com`}),` or, for local development, `,(0,n.jsx)(r.code,{children:`http://<computername>.local:<port>`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`NOTE:`}),` Even though we are loading up in Safari on our iOS device, remote debugging using Chrome on our OSX computer will use Chrome's context and user agent instead of Safari's)`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Run the remote debugger on your OSX computer`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`$ remotedebug_ios_webkit_adapter --port=9000
`})}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsx)(r.p,{children:`Debug using Chrome`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Open Chrome on your OSX computer and navigate to `,(0,n.jsx)(r.code,{children:`chrome://inspect/#devices`})]}),`
`,(0,n.jsx)(r.li,{children:`Identify the webpage you wish to debug on the iOS device and click "Inspect"`}),`
`,(0,n.jsx)(r.li,{children:`A Chrome debugger will appear which uses Chrome's context and user agent string instead of Safari's`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/8.png`,alt:`Chrome Remote Target List`,title:`Chrome Remote Target List`}),`
`,(0,n.jsx)(r.img,{src:`/img/blog-posts/2018-16-05-how-to-debug/9.png`,alt:`Remote Chrome debugger`,title:`Remote Chrome debugger`})]}),`
`]}),`
`]})]})}function a(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(i,{...e})}):i(e)}export{a as default,r as frontmatter};