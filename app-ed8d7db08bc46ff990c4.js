webpackJsonp([0xd2a57dc1d883],{84:function(n,e,o){"use strict";function t(n,e,o){var t=r.map(function(o){if(o.plugin[n]){var t=o.plugin[n](e,o.options);return t}});return t=t.filter(function(n){return"undefined"!=typeof n}),t.length>0?t:o?[o]:[]}function a(n,e,o){return r.reduce(function(o,t){return t.plugin[n]?o.then(function(){return t.plugin[n](e,t.options)}):o},Promise.resolve())}e.__esModule=!0,e.apiRunner=t,e.apiRunnerAsync=a;var r=[{plugin:o(369),options:{plugins:[]}},{plugin:o(370),options:{plugins:[],trackingId:"UA-53344458-1",head:!0,anonymize:!0}}]},222:function(n,e,o){"use strict";e.components={"component---src-templates-blog-post-js":o(338),"component---src-templates-tags-js":o(339),"component---src-pages-404-js":o(335),"component---src-pages-tags-js":o(337),"component---src-pages-index-js":o(336)},e.json={"layout-index.json":o(340),"blog-how-to-create-live-updating-and-flexible-d-3-line-charts-using-d-3-js-v-5-and-pseudo-data.json":o(348),"blog-how-to-debug-a-chrome-specific-bug-on-ios-using-remote-debugging.json":o(350),"blog-choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends.json":o(344),"blog-how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example.json":o(351),"blog-how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example.json":o(355),"blog-how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight.json":o(346),"blog-best-and-worst-times-to-take-an-uber.json":o(343),"blog-how-to-create-adaptive-pie-charts-with-transitions-in-d-3.json":o(347),"blog-how-to-create-live-updating-and-flexible-d-3-line-charts-using-pseudo-data.json":o(349),"blog-how-to-modify-filter-and-save-json-files-locally-using-jquery.json":o(352),"blog-how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d-3.json":o(353),"blog-using-reduce-to-create-arrays-and-objects-in-javascript.json":o(359),"blog-how-to-use-the-uber-api-to-get-pricing-data.json":o(354),"blog-fight-on-the-power-of-javascript-closures.json":o(345),"blog-prototypal-and-pseudoclassical-instantiation-in-javascript.json":o(356),"blog-type-coercion-in-d-3-js.json":o(358),"blog-supercharge-your-falsey-conditional-statements-in-javascript.json":o(357),"tags-d-3-js.json":o(363),"tags-java-script.json":o(365),"tags-mongo-db.json":o(366),"tags-ux-ui.json":o(367),"tags-api.json":o(362),"tags-j-query.json":o(364),"404.json":o(341),"tags.json":o(361),"404-html.json":o(342),"index.json":o(360)},e.layouts={"layout---index":o(334)}},223:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}function a(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function r(n,e){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?n:e}function u(n,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);n.prototype=Object.create(e&&e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(n,e):n.__proto__=e)}e.__esModule=!0;var s=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},i=o(2),c=t(i),l=o(7),p=t(l),d=o(156),f=t(d),g=o(64),m=t(g),h=o(84),y=o(508),j=t(y),b=function(n){var e=n.children;return c.default.createElement("div",null,e())},v=function(n){function e(o){a(this,e);var t=r(this,n.call(this)),u=o.location;return f.default.getPage(u.pathname)||(u=s({},u,{pathname:"/404.html"})),t.state={location:u,pageResources:f.default.getResourcesForPathname(u.pathname)},t}return u(e,n),e.prototype.componentWillReceiveProps=function(n){var e=this;if(this.state.location.pathname!==n.location.pathname){var o=f.default.getResourcesForPathname(n.location.pathname);if(o)this.setState({location:n.location,pageResources:o});else{var t=n.location;f.default.getPage(t.pathname)||(t=s({},t,{pathname:"/404.html"})),f.default.getResourcesForPathname(t.pathname,function(n){e.setState({location:t,pageResources:n})})}}},e.prototype.componentDidMount=function(){var n=this;m.default.on("onPostLoadPageResources",function(e){f.default.getPage(n.state.location.pathname)&&e.page.path===f.default.getPage(n.state.location.pathname).path&&n.setState({pageResources:e.pageResources})})},e.prototype.shouldComponentUpdate=function(n,e){return!e.pageResources||(!(this.state.pageResources||!e.pageResources)||(this.state.pageResources.component!==e.pageResources.component||(this.state.pageResources.json!==e.pageResources.json||(!(this.state.location.key===e.location.key||!e.pageResources.page||!e.pageResources.page.matchPath&&!e.pageResources.page.path)||(0,j.default)(this,n,e)))))},e.prototype.render=function(){var n=(0,h.apiRunner)("replaceComponentRenderer",{props:s({},this.props,{pageResources:this.state.pageResources}),loader:d.publicLoader}),e=n[0];return this.props.page?this.state.pageResources?e||(0,i.createElement)(this.state.pageResources.component,s({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?e||(0,i.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:b,s({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},e}(c.default.Component);v.propTypes={page:p.default.bool,layout:p.default.bool,location:p.default.object},e.default=v,n.exports=e.default},64:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=o(407),r=t(a),u=(0,r.default)();n.exports=u},224:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=o(83),r=o(157),u=t(r),s={};n.exports=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(o){var t=decodeURIComponent(o),r=(0,u.default)(t,e);if(r.split("#").length>1&&(r=r.split("#").slice(0,-1).join("")),r.split("?").length>1&&(r=r.split("?").slice(0,-1).join("")),s[r])return s[r];var i=void 0;return n.some(function(n){if(n.matchPath){if((0,a.matchPath)(r,{path:n.path})||(0,a.matchPath)(r,{path:n.matchPath}))return i=n,s[r]=n,!0}else{if((0,a.matchPath)(r,{path:n.path,exact:!0}))return i=n,s[r]=n,!0;if((0,a.matchPath)(r,{path:n.path+"index.html"}))return i=n,s[r]=n,!0}return!1}),i}}},225:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=o(112),r=t(a),u=o(84),s=(0,u.apiRunner)("replaceHistory"),i=s[0],c=i||(0,r.default)();n.exports=c},342:function(n,e,o){o(3),n.exports=function(n){return o.e(0xa2868bfb69fc,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(378)})})}},341:function(n,e,o){o(3),n.exports=function(n){return o.e(0xe70826b53c04,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(379)})})}},343:function(n,e,o){o(3),n.exports=function(n){return o.e(0xb1817343f1fe,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(380)})})}},344:function(n,e,o){o(3),n.exports=function(n){return o.e(0x8a70290518b6,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(381)})})}},345:function(n,e,o){o(3),n.exports=function(n){return o.e(19075071473338,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(382)})})}},346:function(n,e,o){o(3),n.exports=function(n){return o.e(0xbb8245fc87c8,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(383)})})}},347:function(n,e,o){o(3),n.exports=function(n){return o.e(4529161709811,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(384)})})}},348:function(n,e,o){o(3),n.exports=function(n){return o.e(0xf9affffc4a4a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(385)})})}},349:function(n,e,o){o(3),n.exports=function(n){return o.e(0x774f42003af9,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(386)})})}},350:function(n,e,o){o(3),n.exports=function(n){return o.e(79800021609243,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(387)})})}},351:function(n,e,o){o(3),n.exports=function(n){return o.e(0x79972e708824,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(388)})})}},352:function(n,e,o){o(3),n.exports=function(n){return o.e(59333814150904,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(389)})})}},353:function(n,e,o){o(3),n.exports=function(n){return o.e(42882386469154,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(390)})})}},354:function(n,e,o){o(3),n.exports=function(n){return o.e(0xa8fa18c0db15,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(391)})})}},355:function(n,e,o){o(3),n.exports=function(n){return o.e(95233356588121,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(392)})})}},356:function(n,e,o){o(3),n.exports=function(n){return o.e(0x5bd7df49250c,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(393)})})}},357:function(n,e,o){o(3),n.exports=function(n){return o.e(0x79c00a746f55,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(394)})})}},358:function(n,e,o){o(3),n.exports=function(n){return o.e(0xf454d2a2011a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(395)})})}},359:function(n,e,o){o(3),n.exports=function(n){return o.e(0xf851b41658c1,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(396)})})}},360:function(n,e,o){o(3),n.exports=function(n){return o.e(0x81b8806e4260,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(397)})})}},340:function(n,e,o){o(3),n.exports=function(n){return o.e(60335399758886,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(115)})})}},362:function(n,e,o){o(3),n.exports=function(n){return o.e(0x8d8700bcc262,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(398)})})}},363:function(n,e,o){o(3),n.exports=function(n){return o.e(0x73f62a23064a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(399)})})}},364:function(n,e,o){o(3),n.exports=function(n){return o.e(0xd64efe134116,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(400)})})}},365:function(n,e,o){o(3),n.exports=function(n){return o.e(0xc1658d68ad40,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(401)})})}},366:function(n,e,o){o(3),n.exports=function(n){return o.e(32135422922473,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(402)})})}},367:function(n,e,o){o(3),n.exports=function(n){return o.e(4836336648314,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(403)})})}},361:function(n,e,o){o(3),n.exports=function(n){return o.e(55702396619907,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(404)})})}},334:function(n,e,o){o(3),n.exports=function(n){return o.e(0x67ef26645b2a,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(226)})})}},156:function(n,e,o){(function(n){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}e.__esModule=!0,e.publicLoader=void 0;var a=o(2),r=(t(a),o(224)),u=t(r),s=o(64),i=t(s),c=o(157),l=t(c),p=void 0,d={},f={},g={},m={},h={},y=[],j=[],b={},v="",x=[],w={},C=function(n){return n&&n.default||n},N=void 0,R=!0,k=[],_={},P={},E=5;N=o(227)({getNextQueuedResources:function(){return x.slice(-1)[0]},createResourceDownload:function(n){S(n,function(){x=x.filter(function(e){return e!==n}),N.onResourcedFinished(n)})}}),i.default.on("onPreLoadPageResources",function(n){N.onPreLoadPageResources(n)}),i.default.on("onPostLoadPageResources",function(n){N.onPostLoadPageResources(n)});var O=function(n,e){return w[n]>w[e]?1:w[n]<w[e]?-1:0},L=function(n,e){return b[n]>b[e]?1:b[n]<b[e]?-1:0},S=function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(m[e])n.nextTick(function(){o(null,m[e])});else{var t=void 0;t="component---"===e.slice(0,12)?f.components[e]:"layout---"===e.slice(0,9)?f.layouts[e]:f.json[e],t(function(n,t){m[e]=t,k.push({resource:e,succeeded:!n}),P[e]||(P[e]=n),k=k.slice(-E),o(n,t)})}},A=function(e,o){h[e]?n.nextTick(function(){o(null,h[e])}):P[e]?n.nextTick(function(){o(P[e])}):S(e,function(n,t){if(n)o(n);else{var a=C(t());h[e]=a,o(n,a)}})},D=function(){var n=navigator.onLine;if("boolean"==typeof n)return n;var e=k.find(function(n){return n.succeeded});return!!e},T=function(n,e){console.log(e),_[n]||(_[n]=e),D()&&window.location.pathname.replace(/\/$/g,"")!==n.replace(/\/$/g,"")&&(window.location.pathname=n)},q=1,U={empty:function(){j=[],b={},w={},x=[],y=[],v=""},addPagesArray:function(n){y=n,p=(0,u.default)(n,v)},addDevRequires:function(n){d=n},addProdRequires:function(n){f=n},dequeue:function(){return j.pop()},enqueue:function(n){var e=(0,l.default)(n,v);if(!y.some(function(n){return n.path===e}))return!1;var o=1/q;q+=1,b[e]?b[e]+=1:b[e]=1,U.has(e)||j.unshift(e),j.sort(L);var t=p(e);return t.jsonName&&(w[t.jsonName]?w[t.jsonName]+=1+o:w[t.jsonName]=1+o,x.indexOf(t.jsonName)!==-1||m[t.jsonName]||x.unshift(t.jsonName)),t.componentChunkName&&(w[t.componentChunkName]?w[t.componentChunkName]+=1+o:w[t.componentChunkName]=1+o,x.indexOf(t.componentChunkName)!==-1||m[t.jsonName]||x.unshift(t.componentChunkName)),x.sort(O),N.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:x,resourcesCount:w}},getPages:function(){return{pathArray:j,pathCount:b}},getPage:function(n){return p(n)},has:function(n){return j.some(function(e){return e===n})},getResourcesForPathname:function(e){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};R&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(p(e)||navigator.serviceWorker.getRegistrations().then(function(n){if(n.length){for(var e=n,o=Array.isArray(e),t=0,e=o?e:e[Symbol.iterator]();;){var a;if(o){if(t>=e.length)break;a=e[t++]}else{if(t=e.next(),t.done)break;a=t.value}var r=a;r.unregister()}window.location.reload()}})),R=!1;if(_[e])return T(e,'Previously detected load failure for "'+e+'"'),o();var t=p(e);if(!t)return T(e,"A page wasn't found for \""+e+'"'),o();if(e=t.path,g[e])return n.nextTick(function(){o(g[e]),i.default.emit("onPostLoadPageResources",{page:t,pageResources:g[e]})}),g[e];i.default.emit("onPreLoadPageResources",{path:e});var a=void 0,r=void 0,u=void 0,s=function(){if(a&&r&&(!t.layoutComponentChunkName||u)){g[e]={component:a,json:r,layout:u,page:t};var n={component:a,json:r,layout:u,page:t};o(n),i.default.emit("onPostLoadPageResources",{page:t,pageResources:n})}};return A(t.componentChunkName,function(n,e){n&&T(t.path,"Loading the component for "+t.path+" failed"),a=e,s()}),A(t.jsonName,function(n,e){n&&T(t.path,"Loading the JSON for "+t.path+" failed"),r=e,s()}),void(t.layoutComponentChunkName&&A(t.layout,function(n,e){n&&T(t.path,"Loading the Layout for "+t.path+" failed"),u=e,s()}))},peek:function(n){return j.slice(-1)[0]},length:function(){return j.length},indexOf:function(n){return j.length-j.indexOf(n)-1}};e.publicLoader={getResourcesForPathname:U.getResourcesForPathname};e.default=U}).call(e,o(77))},405:function(n,e){n.exports=[{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-create-live-updating-and-flexible-d-3-line-charts-using-d-3-js-v-5-and-pseudo-data.json",path:"/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-d3-js-v5-and-pseudo-data"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-debug-a-chrome-specific-bug-on-ios-using-remote-debugging.json",path:"/blog/how-to-debug-a-chrome-specific-bug-on-ios-using-remote-debugging"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends.json",path:"/blog/choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example.json",path:"/blog/how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example.json",path:"/blog/how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight.json",path:"/blog/how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-best-and-worst-times-to-take-an-uber.json",path:"/blog/best-and-worst-times-to-take-an-uber"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-create-adaptive-pie-charts-with-transitions-in-d-3.json",path:"/blog/how-to-create-adaptive-pie-charts-with-transitions-in-d3"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-create-live-updating-and-flexible-d-3-line-charts-using-pseudo-data.json",path:"/blog/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-modify-filter-and-save-json-files-locally-using-jquery.json",path:"/blog/how-to-modify-filter-and-save-json-files-locally-using-jquery"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d-3.json",path:"/blog/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-using-reduce-to-create-arrays-and-objects-in-javascript.json",path:"/blog/using-reduce-to-create-arrays-and-objects-in-javascript"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-how-to-use-the-uber-api-to-get-pricing-data.json",path:"/blog/how-to-use-the-uber-api-to-get-pricing-data"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-fight-on-the-power-of-javascript-closures.json",path:"/blog/fight-on-the-power-of-javascript-closures"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-prototypal-and-pseudoclassical-instantiation-in-javascript.json",path:"/blog/prototypal-and-pseudoclassical-instantiation-in-javascript"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-type-coercion-in-d-3-js.json",path:"/blog/type-coercion-in-d3js"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"blog-supercharge-your-falsey-conditional-statements-in-javascript.json",path:"/blog/supercharge-your-falsey-conditional-statements-in-javascript"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-d-3-js.json",path:"/tags/d-3-js/"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-java-script.json",path:"/tags/java-script/"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-mongo-db.json",path:"/tags/mongo-db/"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-ux-ui.json",path:"/tags/ux-ui/"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-api.json",path:"/tags/api/"},{componentChunkName:"component---src-templates-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags-j-query.json",path:"/tags/j-query/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-tags-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"tags.json",path:"/tags/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404-html.json",path:"/404.html"},{componentChunkName:"component---src-pages-index-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"index.json",path:"/"}]},227:function(n,e){"use strict";n.exports=function(n){var e=n.getNextQueuedResources,o=n.createResourceDownload,t=[],a=[],r=function(){var n=e();n&&(a.push(n),o(n))},u=function(n){switch(n.type){case"RESOURCE_FINISHED":a=a.filter(function(e){return e!==n.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":t.push(n.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":t=t.filter(function(e){return e!==n.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===a.length&&0===t.length&&r()},0)};return{onResourcedFinished:function(n){u({type:"RESOURCE_FINISHED",payload:n})},onPreLoadPageResources:function(n){u({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:n})},onPostLoadPageResources:function(n){u({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:n})},onNewResourcesAdded:function(){u({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:t,resourcesDownloading:a}},empty:function(){t=[],a=[]}}}},0:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(n[t]=o[t])}return n},r=o(84),u=o(2),s=t(u),i=o(192),c=t(i),l=o(83),p=o(374),d=o(320),f=t(d),g=o(114),m=o(225),h=t(m),y=o(64),j=t(y),b=o(405),v=t(b),x=o(406),w=t(x),C=o(223),N=t(C),R=o(222),k=t(R),_=o(156),P=t(_);o(246),window.___history=h.default,window.___emitter=j.default,P.default.addPagesArray(v.default),P.default.addProdRequires(k.default),window.asyncRequires=k.default,window.___loader=P.default,window.matchPath=l.matchPath;var E=w.default.reduce(function(n,e){return n[e.fromPath]=e,n},{}),O=function(n){var e=E[n];return null!=e&&(h.default.replace(e.toPath),!0)};O(window.location.pathname),(0,r.apiRunnerAsync)("onClientEntry").then(function(){function n(n){window.___history&&i!==!1||(window.___history=n,i=!0,n.listen(function(n,e){O(n.pathname)||setTimeout(function(){(0,r.apiRunner)("onRouteUpdate",{location:n,action:e})},0)}))}function e(n,e){var o=e.location.pathname,t=(0,r.apiRunner)("shouldUpdateScroll",{prevRouterProps:n,pathname:o});if(t.length>0)return t[0];if(n){var a=n.location.pathname;if(a===o)return!1}return!0}(0,r.apiRunner)("registerServiceWorker").length>0&&o(228);var t=function(n){function e(n){n.page.path===P.default.getPage(t).path&&(j.default.off("onPostLoadPageResources",e),clearTimeout(u),window.___history.push(o))}var o=(0,g.createLocation)(n,null,null,h.default.location),t=o.pathname,a=E[t];a&&(t=a.toPath);var r=window.location;if(r.pathname!==o.pathname||r.search!==o.search||r.hash!==o.hash){var u=setTimeout(function(){j.default.off("onPostLoadPageResources",e),j.default.emit("onDelayedLoadPageResources",{pathname:t}),window.___history.push(o)},1e3);P.default.getResourcesForPathname(t)?(clearTimeout(u),window.___history.push(o)):j.default.on("onPostLoadPageResources",e)}};window.___navigateTo=t,(0,r.apiRunner)("onRouteUpdate",{location:h.default.location,action:h.default.action});var i=!1,d=(0,r.apiRunner)("replaceRouterComponent",{history:h.default})[0],m=function(n){var e=n.children;return s.default.createElement(l.Router,{history:h.default},e)},y=(0,l.withRouter)(N.default);P.default.getResourcesForPathname(window.location.pathname,function(){var o=function(){return(0,u.createElement)(d?d:m,null,(0,u.createElement)(p.ScrollContext,{shouldUpdateScroll:e},(0,u.createElement)(y,{layout:!0,children:function(e){return(0,u.createElement)(l.Route,{render:function(o){n(o.history);var t=e?e:o;return P.default.getPage(t.location.pathname)?(0,u.createElement)(N.default,a({page:!0},t)):(0,u.createElement)(N.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},t=(0,r.apiRunner)("wrapRootComponent",{Root:o},o)[0],i=(0,r.apiRunner)("replaceHydrateFunction",void 0,c.default.render)[0];(0,f.default)(function(){return i(s.default.createElement(t,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,r.apiRunner)("onInitialClientRender")})})})})},406:function(n,e){n.exports=[]},228:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=o(64),r=t(a),u="/";"serviceWorker"in navigator&&navigator.serviceWorker.register(u+"sw.js").then(function(n){n.addEventListener("updatefound",function(){var e=n.installing;console.log("installingWorker",e),e.addEventListener("statechange",function(){switch(e.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),r.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(n){console.error("Error during service worker registration:",n)})},157:function(n,e){"use strict";e.__esModule=!0,e.default=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return n.substr(0,e.length)===e?n.slice(e.length):n},n.exports=e.default},320:function(n,e,o){!function(e,o){n.exports=o()}("domready",function(){var n,e=[],o=document,t=o.documentElement.doScroll,a="DOMContentLoaded",r=(t?/^loaded|^c/:/^loaded|^i|^c/).test(o.readyState);return r||o.addEventListener(a,n=function(){for(o.removeEventListener(a,n),r=1;n=e.shift();)n()}),function(n){r?setTimeout(n,0):e.push(n)}})},3:function(n,e,o){"use strict";function t(){function n(n){var e=t.lastChild;return"SCRIPT"!==e.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",e)):void(e.onload=e.onerror=function(){e.onload=e.onerror=null,setTimeout(n,0)})}var e,t=document.querySelector("head"),a=o.e,r=o.s;o.e=function(t,u){var s=!1,i=!0,c=function(n){u&&(u(o,n),u=null)};return!r&&e&&e[t]?void c(!0):(a(t,function(){s||(s=!0,i?setTimeout(function(){c()}):c())}),void(s||(i=!1,n(function(){s||(s=!0,r?r[t]=void 0:(e||(e={}),e[t]=!0),c(!0))}))))}}t()},368:function(n,e,o){"use strict";var t=o(44);n.exports=function(n,e){n.addEventListener("click",function(n){if(0!==n.button||n.altKey||n.ctrlKey||n.metaKey||n.shiftKey||n.defaultPrevented)return!0;for(var o=null,a=n.target;a.parentNode;a=a.parentNode)if("A"===a.nodeName){o=a;break}if(!o)return!0;if(o.target&&"_self"!==o.target.toLowerCase())return!0;if(o.pathname===window.location.pathname&&""!==o.hash)return!0;if(""===o.pathname)return!0;if(o.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i)!==-1)return!0;var r=document.createElement("a");r.href=o.href;var u=document.createElement("a");if(u.href=window.location.href,r.host!==u.host)return!0;var s=new RegExp("^"+u.host+(0,t.withPrefix)("/"));return!s.test(""+r.host+r.pathname)||(n.preventDefault(),e(o.getAttribute("href")),!1)})}},369:function(n,e,o){"use strict";function t(n){return n&&n.__esModule?n:{default:n}}var a=o(44),r=o(368),u=t(r);e.onClientEntry=function(){(0,u.default)(window,function(n){(0,a.navigateTo)(n)})}},370:function(n,e,o){"use strict";e.onRouteUpdate=function(n){var e=n.location;if("function"==typeof ga){if(e&&"undefined"!=typeof window.excludeGAPaths&&window.excludeGAPaths.some(function(n){return n.test(e.pathname)}))return;window.ga("set","page",e?e.pathname+e.search+e.hash:void 0),window.ga("send","pageview")}}},407:function(n,e){function o(n){return n=n||Object.create(null),{on:function(e,o){(n[e]||(n[e]=[])).push(o)},off:function(e,o){n[e]&&n[e].splice(n[e].indexOf(o)>>>0,1)},emit:function(e,o){(n[e]||[]).slice().map(function(n){n(o)}),(n["*"]||[]).slice().map(function(n){n(e,o)})}}}n.exports=o},508:function(n,e){"use strict";function o(n,e){for(var o in n)if(!(o in e))return!0;for(var t in e)if(n[t]!==e[t])return!0;return!1}e.__esModule=!0,e.default=function(n,e,t){return o(n.props,e)||o(n.state,t)},n.exports=e.default},335:function(n,e,o){o(3),n.exports=function(n){return o.e(0x9427c64ab85d,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(231)})})}},336:function(n,e,o){o(3),n.exports=function(n){return o.e(35783957827783,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(232)})})}},337:function(n,e,o){o(3),n.exports=function(n){return o.e(0xb2200a1b9a48,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(233)})})}},338:function(n,e,o){o(3),n.exports=function(n){return o.e(0x620f737b6699,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(234)})})}},339:function(n,e,o){o(3),n.exports=function(n){return o.e(50739212244294,function(e,t){t?(console.log("bundle loading error",t),n(!0)):n(null,function(){return o(235)})})}}});
//# sourceMappingURL=app-ed8d7db08bc46ff990c4.js.map