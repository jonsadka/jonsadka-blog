webpackJsonp([0xd2a57dc1d883],{81:function(e,n,t){"use strict";function o(e,n,t){var o=r.map(function(t){if(t.plugin[e]){var o=t.plugin[e](n,t.options);return o}});return o=o.filter(function(e){return"undefined"!=typeof e}),o.length>0?o:t?[t]:[]}function a(e,n,t){return r.reduce(function(t,o){return o.plugin[e]?t.then(function(){return o.plugin[e](n,o.options)}):t},Promise.resolve())}n.__esModule=!0,n.apiRunner=o,n.apiRunnerAsync=a;var r=[{plugin:t(335),options:{plugins:[]}},{plugin:t(206),options:{plugins:[]}}]},199:function(e,n,t){"use strict";var o;n.components={"component---src-templates-blog-post-js":t(314),"component---src-pages-404-js":t(311),"component---src-pages-index-js":t(312),"component---src-pages-page-2-js":t(313)},n.json=(o={"layout-index.json":t(9),"choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends.json":t(318)},o["layout-index.json"]=t(9),o["how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example.json"]=t(323),o["layout-index.json"]=t(9),o["how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example.json"]=t(327),o["layout-index.json"]=t(9),o["how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight.json"]=t(320),o["layout-index.json"]=t(9),o["best-and-worst-times-to-take-an-uber.json"]=t(317),o["layout-index.json"]=t(9),o["how-to-create-adaptive-pie-charts-with-transitions-in-d-3.json"]=t(321),o["layout-index.json"]=t(9),o["how-to-create-live-updating-and-flexible-d-3-line-charts-using-pseudo-data.json"]=t(322),o["layout-index.json"]=t(9),o["how-to-modify-filter-and-save-json-files-locally-using-jquery.json"]=t(324),o["layout-index.json"]=t(9),o["how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d-3.json"]=t(325),o["layout-index.json"]=t(9),o["using-reduce-to-create-arrays-and-objects-in-javascript.json"]=t(333),o["layout-index.json"]=t(9),o["how-to-use-the-uber-api-to-get-pricing-data.json"]=t(326),o["layout-index.json"]=t(9),o["fight-on-the-power-of-javascript-closures.json"]=t(319),o["layout-index.json"]=t(9),o["prototypal-and-pseudoclassical-instantiation-in-javascript.json"]=t(330),o["layout-index.json"]=t(9),o["type-coercion-in-d-3-js.json"]=t(332),o["layout-index.json"]=t(9),o["supercharge-your-falsey-conditional-statements-in-javascript.json"]=t(331),o["layout-index.json"]=t(9),o["404.json"]=t(315),o["layout-index.json"]=t(9),o["index.json"]=t(328),o["layout-index.json"]=t(9),o["page-2.json"]=t(329),o["layout-index.json"]=t(9),o["404-html.json"]=t(316),o),n.layouts={"layout---index":t(310)}},200:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function u(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}n.__esModule=!0;var i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},s=t(2),c=o(s),l=t(8),p=o(l),f=t(134),d=o(f),h=t(62),m=o(h),g=t(81),y=t(461),j=o(y),v=function(e){var n=e.children;return c.default.createElement("div",null,n())},x=function(e){function n(t){a(this,n);var o=r(this,e.call(this)),u=t.location;return d.default.getPage(u.pathname)||(u=i({},u,{pathname:"/404.html"})),o.state={location:u,pageResources:d.default.getResourcesForPathname(u.pathname)},o}return u(n,e),n.prototype.componentWillReceiveProps=function(e){var n=this;if(this.state.location.pathname!==e.location.pathname){var t=d.default.getResourcesForPathname(e.location.pathname);if(t)this.setState({location:e.location,pageResources:t});else{var o=e.location;d.default.getPage(o.pathname)||(o=i({},o,{pathname:"/404.html"})),d.default.getResourcesForPathname(o.pathname,function(e){n.setState({location:o,pageResources:e})})}}},n.prototype.componentDidMount=function(){var e=this;m.default.on("onPostLoadPageResources",function(n){d.default.getPage(e.state.location.pathname)&&n.page.path===d.default.getPage(e.state.location.pathname).path&&e.setState({pageResources:n.pageResources})})},n.prototype.shouldComponentUpdate=function(e,n){return!n.pageResources||(!(this.state.pageResources||!n.pageResources)||(this.state.pageResources.component!==n.pageResources.component||(this.state.pageResources.json!==n.pageResources.json||(!(this.state.location.key===n.location.key||!n.pageResources.page||!n.pageResources.page.matchPath&&!n.pageResources.page.path)||(0,j.default)(this,e,n)))))},n.prototype.render=function(){var e=(0,g.apiRunner)("replaceComponentRenderer",{props:i({},this.props,{pageResources:this.state.pageResources}),loader:f.publicLoader}),n=e[0];return this.props.page?this.state.pageResources?n||(0,s.createElement)(this.state.pageResources.component,i({key:this.props.location.pathname},this.props,this.state.pageResources.json)):null:this.props.layout?n||(0,s.createElement)(this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:v,i({key:this.state.pageResources&&this.state.pageResources.layout?this.state.pageResources.layout:"DefaultLayout"},this.props)):null},n}(c.default.Component);x.propTypes={page:p.default.bool,layout:p.default.bool,location:p.default.object},n.default=x,e.exports=n.default},62:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=t(362),r=o(a),u=(0,r.default)();e.exports=u},201:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=t(80),r=t(135),u=o(r),i={};e.exports=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return function(t){var o=decodeURIComponent(t),r=(0,u.default)(o,n);if(r.split("#").length>1&&(r=r.split("#").slice(0,-1).join("")),r.split("?").length>1&&(r=r.split("?").slice(0,-1).join("")),i[r])return i[r];var s=void 0;return e.some(function(e){if(e.matchPath){if((0,a.matchPath)(r,{path:e.path})||(0,a.matchPath)(r,{path:e.matchPath}))return s=e,i[r]=e,!0}else{if((0,a.matchPath)(r,{path:e.path,exact:!0}))return s=e,i[r]=e,!0;if((0,a.matchPath)(r,{path:e.path+"index.html"}))return s=e,i[r]=e,!0}return!1}),s}}},202:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=t(109),r=o(a),u=t(81),i=(0,u.apiRunner)("replaceHistory"),s=i[0],c=s||(0,r.default)();e.exports=c},316:function(e,n,t){t(6),e.exports=function(e){return t.e(0xa2868bfb69fc,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(341)})})}},315:function(e,n,t){t(6),e.exports=function(e){return t.e(0xe70826b53c04,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(342)})})}},317:function(e,n,t){t(6),e.exports=function(e){return t.e(61368061307467,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(343)})})}},318:function(e,n,t){t(6),e.exports=function(e){return t.e(0x940548584fc,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(344)})})}},319:function(e,n,t){t(6),e.exports=function(e){return t.e(64521555383069,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(345)})})}},320:function(e,n,t){t(6),e.exports=function(e){return t.e(71122540562017,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(346)})})}},321:function(e,n,t){t(6),e.exports=function(e){return t.e(0xc76fb6d54429,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(347)})})}},322:function(e,n,t){t(6),e.exports=function(e){return t.e(27746275504635,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(348)})})}},323:function(e,n,t){t(6),e.exports=function(e){return t.e(50182333802029,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(349)})})}},324:function(e,n,t){t(6),e.exports=function(e){return t.e(0xa07d183b4a3c,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(350)})})}},325:function(e,n,t){t(6),e.exports=function(e){return t.e(28430980993147,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(351)})})}},326:function(e,n,t){t(6),e.exports=function(e){return t.e(0xd95abc3ae789,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(352)})})}},327:function(e,n,t){t(6),e.exports=function(e){return t.e(0xce03a33f422d,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(353)})})}},328:function(e,n,t){t(6),e.exports=function(e){return t.e(0x81b8806e4260,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(354)})})}},9:function(e,n,t){t(6),e.exports=function(e){return t.e(60335399758886,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(113)})})}},329:function(e,n,t){t(6),e.exports=function(e){return t.e(0x7b71d9db271c,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(355)})})}},330:function(e,n,t){t(6),e.exports=function(e){return t.e(0xf9b4aa3cba2c,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(356)})})}},331:function(e,n,t){t(6),e.exports=function(e){return t.e(0xcc6475aa70ce,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(357)})})}},332:function(e,n,t){t(6),e.exports=function(e){return t.e(2567721212742,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(358)})})}},333:function(e,n,t){t(6),e.exports=function(e){return t.e(0x7f6e3b7f7b77,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(359)})})}},310:function(e,n,t){t(6),e.exports=function(e){return t.e(0x67ef26645b2a,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(203)})})}},134:function(e,n,t){(function(e){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0,n.publicLoader=void 0;var a=t(2),r=(o(a),t(201)),u=o(r),i=t(62),s=o(i),c=t(135),l=o(c),p=void 0,f={},d={},h={},m={},g={},y=[],j=[],v={},x="",b=[],w={},R=function(e){return e&&e.default||e},N=void 0,C=!0,k=[],P={},_={},E=5;N=t(204)({getNextQueuedResources:function(){return b.slice(-1)[0]},createResourceDownload:function(e){T(e,function(){b=b.filter(function(n){return n!==e}),N.onResourcedFinished(e)})}}),s.default.on("onPreLoadPageResources",function(e){N.onPreLoadPageResources(e)}),s.default.on("onPostLoadPageResources",function(e){N.onPostLoadPageResources(e)});var O=function(e,n){return w[e]>w[n]?1:w[e]<w[n]?-1:0},L=function(e,n){return v[e]>v[n]?1:v[e]<v[n]?-1:0},T=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};if(m[n])e.nextTick(function(){t(null,m[n])});else{var o=void 0;o="component---"===n.slice(0,12)?d.components[n]:"layout---"===n.slice(0,9)?d.layouts[n]:d.json[n],o(function(e,o){m[n]=o,k.push({resource:n,succeeded:!e}),_[n]||(_[n]=e),k=k.slice(-E),t(e,o)})}},S=function(n,t){g[n]?e.nextTick(function(){t(null,g[n])}):_[n]?e.nextTick(function(){t(_[n])}):T(n,function(e,o){if(e)t(e);else{var a=R(o());g[n]=a,t(e,a)}})},A=function(){var e=navigator.onLine;if("boolean"==typeof e)return e;var n=k.find(function(e){return e.succeeded});return!!n},D=function(e,n){console.log(n),P[e]||(P[e]=n),A()&&window.location.pathname.replace(/\/$/g,"")!==e.replace(/\/$/g,"")&&(window.location.pathname=e)},q=1,M={empty:function(){j=[],v={},w={},b=[],y=[],x=""},addPagesArray:function(e){y=e,x="/jonsadka-blog",p=(0,u.default)(e,x)},addDevRequires:function(e){f=e},addProdRequires:function(e){d=e},dequeue:function(){return j.pop()},enqueue:function(e){var n=(0,l.default)(e,x);if(!y.some(function(e){return e.path===n}))return!1;var t=1/q;q+=1,v[n]?v[n]+=1:v[n]=1,M.has(n)||j.unshift(n),j.sort(L);var o=p(n);return o.jsonName&&(w[o.jsonName]?w[o.jsonName]+=1+t:w[o.jsonName]=1+t,b.indexOf(o.jsonName)!==-1||m[o.jsonName]||b.unshift(o.jsonName)),o.componentChunkName&&(w[o.componentChunkName]?w[o.componentChunkName]+=1+t:w[o.componentChunkName]=1+t,b.indexOf(o.componentChunkName)!==-1||m[o.jsonName]||b.unshift(o.componentChunkName)),b.sort(O),N.onNewResourcesAdded(),!0},getResources:function(){return{resourcesArray:b,resourcesCount:w}},getPages:function(){return{pathArray:j,pathCount:v}},getPage:function(e){return p(e)},has:function(e){return j.some(function(n){return n===e})},getResourcesForPathname:function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};C&&navigator&&navigator.serviceWorker&&navigator.serviceWorker.controller&&"activated"===navigator.serviceWorker.controller.state&&(p(n)||navigator.serviceWorker.getRegistrations().then(function(e){if(e.length){for(var n=e,t=Array.isArray(n),o=0,n=t?n:n[Symbol.iterator]();;){var a;if(t){if(o>=n.length)break;a=n[o++]}else{if(o=n.next(),o.done)break;a=o.value}var r=a;r.unregister()}window.location.reload()}})),C=!1;if(P[n])return D(n,'Previously detected load failure for "'+n+'"'),t();var o=p(n);if(!o)return D(n,"A page wasn't found for \""+n+'"'),t();if(n=o.path,h[n])return e.nextTick(function(){t(h[n]),s.default.emit("onPostLoadPageResources",{page:o,pageResources:h[n]})}),h[n];s.default.emit("onPreLoadPageResources",{path:n});var a=void 0,r=void 0,u=void 0,i=function(){if(a&&r&&(!o.layoutComponentChunkName||u)){h[n]={component:a,json:r,layout:u,page:o};var e={component:a,json:r,layout:u,page:o};t(e),s.default.emit("onPostLoadPageResources",{page:o,pageResources:e})}};return S(o.componentChunkName,function(e,n){e&&D(o.path,"Loading the component for "+o.path+" failed"),a=n,i()}),S(o.jsonName,function(e,n){e&&D(o.path,"Loading the JSON for "+o.path+" failed"),r=n,i()}),void(o.layoutComponentChunkName&&S(o.layout,function(e,n){e&&D(o.path,"Loading the Layout for "+o.path+" failed"),u=n,i()}))},peek:function(e){return j.slice(-1)[0]},length:function(){return j.length},indexOf:function(e){return j.length-j.indexOf(e)-1}};n.publicLoader={getResourcesForPathname:M.getResourcesForPathname};n.default=M}).call(n,t(114))},360:function(e,n){e.exports=[{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends.json",path:"/choosing-the-best-numbers-in-nfl-football-squares-to-beat-your-friends"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example.json",path:"/how-to-generate-time-series-week-over-week-year-over-year-aggregations-in-mongodb-using-unix-epoch-timestamps-tutorial-and-example"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example.json",path:"/how-to-write-data-to-the-beginning-of-a-file-with-node-javascript-tutorial-and-example"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight.json",path:"/how-apple-can-catch-up-to-google-ratings-and-yelp-reviews-overnight"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"best-and-worst-times-to-take-an-uber.json",path:"/best-and-worst-times-to-take-an-uber"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-create-adaptive-pie-charts-with-transitions-in-d-3.json",path:"/how-to-create-adaptive-pie-charts-with-transitions-in-d3"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-create-live-updating-and-flexible-d-3-line-charts-using-pseudo-data.json",path:"/how-to-create-live-updating-and-flexible-d3-line-charts-using-pseudo-data"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-modify-filter-and-save-json-files-locally-using-jquery.json",path:"/how-to-modify-filter-and-save-json-files-locally-using-jquery"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d-3.json",path:"/how-to-quickly-create-randomly-generated-datasets-in-javascript-with-d3"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"using-reduce-to-create-arrays-and-objects-in-javascript.json",path:"/using-reduce-to-create-arrays-and-objects-in-javascript"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"how-to-use-the-uber-api-to-get-pricing-data.json",path:"/how-to-use-the-uber-api-to-get-pricing-data"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"fight-on-the-power-of-javascript-closures.json",path:"/fight-on-the-power-of-javascript-closures"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"prototypal-and-pseudoclassical-instantiation-in-javascript.json",path:"/prototypal-and-pseudoclassical-instantiation-in-javascript"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"type-coercion-in-d-3-js.json",path:"/type-coercion-in-d3js"},{componentChunkName:"component---src-templates-blog-post-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"supercharge-your-falsey-conditional-statements-in-javascript.json",path:"/supercharge-your-falsey-conditional-statements-in-javascript"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404.json",path:"/404/"},{componentChunkName:"component---src-pages-index-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"index.json",path:"/"},{componentChunkName:"component---src-pages-page-2-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"page-2.json",path:"/page-2/"},{componentChunkName:"component---src-pages-404-js",layout:"layout---index",layoutComponentChunkName:"component---src-layouts-index-js",jsonName:"404-html.json",path:"/404.html"}]},204:function(e,n){"use strict";e.exports=function(e){var n=e.getNextQueuedResources,t=e.createResourceDownload,o=[],a=[],r=function(){var e=n();e&&(a.push(e),t(e))},u=function(e){switch(e.type){case"RESOURCE_FINISHED":a=a.filter(function(n){return n!==e.payload});break;case"ON_PRE_LOAD_PAGE_RESOURCES":o.push(e.payload.path);break;case"ON_POST_LOAD_PAGE_RESOURCES":o=o.filter(function(n){return n!==e.payload.page.path});break;case"ON_NEW_RESOURCES_ADDED":}setTimeout(function(){0===a.length&&0===o.length&&r()},0)};return{onResourcedFinished:function(e){u({type:"RESOURCE_FINISHED",payload:e})},onPreLoadPageResources:function(e){u({type:"ON_PRE_LOAD_PAGE_RESOURCES",payload:e})},onPostLoadPageResources:function(e){u({type:"ON_POST_LOAD_PAGE_RESOURCES",payload:e})},onNewResourcesAdded:function(){u({type:"ON_NEW_RESOURCES_ADDED"})},getState:function(){return{pagesLoading:o,resourcesDownloading:a}},empty:function(){o=[],a=[]}}}},0:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},r=t(81),u=t(2),i=o(u),s=t(169),c=o(s),l=t(80),p=t(339),f=t(296),d=o(f),h=t(111),m=t(202),g=o(m),y=t(62),j=o(y),v=t(360),x=o(v),b=t(361),w=o(b),R=t(200),N=o(R),C=t(199),k=o(C),P=t(134),_=o(P);t(222),window.___history=g.default,window.___emitter=j.default,_.default.addPagesArray(x.default),_.default.addProdRequires(k.default),window.asyncRequires=k.default,window.___loader=_.default,window.matchPath=l.matchPath;var E=w.default.reduce(function(e,n){return e[n.fromPath]=n,e},{}),O=function(e){var n=E[e];return null!=n&&(g.default.replace(n.toPath),!0)};O(window.location.pathname),(0,r.apiRunnerAsync)("onClientEntry").then(function(){function e(e){window.___history&&s!==!1||(window.___history=e,s=!0,e.listen(function(e,n){O(e.pathname)||setTimeout(function(){(0,r.apiRunner)("onRouteUpdate",{location:e,action:n})},0)}))}function n(e,n){var t=n.location.pathname,o=(0,r.apiRunner)("shouldUpdateScroll",{prevRouterProps:e,pathname:t});if(o.length>0)return o[0];if(e){var a=e.location.pathname;if(a===t)return!1}return!0}(0,r.apiRunner)("registerServiceWorker").length>0&&t(205);var o=function(e){function n(e){e.page.path===_.default.getPage(o).path&&(j.default.off("onPostLoadPageResources",n),clearTimeout(r),window.___history.push(t))}var t=(0,h.createLocation)(e,null,null,g.default.location),o=t.pathname,a=E[o];if(a&&(o=a.toPath),window.location.pathname!==o){var r=setTimeout(function(){j.default.off("onPostLoadPageResources",n),j.default.emit("onDelayedLoadPageResources",{pathname:o}),window.___history.push(t)},1e3);_.default.getResourcesForPathname(o)?(clearTimeout(r),window.___history.push(t)):j.default.on("onPostLoadPageResources",n)}};window.___navigateTo=o,(0,r.apiRunner)("onRouteUpdate",{location:g.default.location,action:g.default.action});var s=!1,f=(0,r.apiRunner)("replaceRouterComponent",{history:g.default})[0],m=function(e){var n=e.children;return i.default.createElement(l.Router,{history:g.default},n)},y=(0,l.withRouter)(N.default);_.default.getResourcesForPathname(window.location.pathname,function(){var t=function(){return(0,u.createElement)(f?f:m,null,(0,u.createElement)(p.ScrollContext,{shouldUpdateScroll:n},(0,u.createElement)(y,{layout:!0,children:function(n){return(0,u.createElement)(l.Route,{render:function(t){e(t.history);var o=n?n:t;return _.default.getPage(o.location.pathname)?(0,u.createElement)(N.default,a({page:!0},o)):(0,u.createElement)(N.default,{page:!0,location:{pathname:"/404.html"}})}})}})))},o=(0,r.apiRunner)("wrapRootComponent",{Root:t},t)[0];(0,d.default)(function(){return c.default.render(i.default.createElement(o,null),"undefined"!=typeof window?document.getElementById("___gatsby"):void 0,function(){(0,r.apiRunner)("onInitialClientRender")})})})})},361:function(e,n){e.exports=[]},205:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=t(62),r=o(a),u="/";u="/jonsadka-blog/","serviceWorker"in navigator&&navigator.serviceWorker.register(u+"sw.js").then(function(e){e.addEventListener("updatefound",function(){var n=e.installing;console.log("installingWorker",n),n.addEventListener("statechange",function(){switch(n.state){case"installed":navigator.serviceWorker.controller?window.location.reload():(console.log("Content is now available offline!"),r.default.emit("sw:installed"));break;case"redundant":console.error("The installing service worker became redundant.")}})})}).catch(function(e){console.error("Error during service worker registration:",e)})},135:function(e,n){"use strict";n.__esModule=!0,n.default=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return e.substr(0,n.length)===n?e.slice(n.length):e},e.exports=n.default},206:function(e,n){"use strict"},296:function(e,n,t){!function(n,t){e.exports=t()}("domready",function(){var e,n=[],t=document,o=t.documentElement.doScroll,a="DOMContentLoaded",r=(o?/^loaded|^c/:/^loaded|^i|^c/).test(t.readyState);return r||t.addEventListener(a,e=function(){for(t.removeEventListener(a,e),r=1;e=n.shift();)e()}),function(e){r?setTimeout(e,0):n.push(e)}})},6:function(e,n,t){"use strict";function o(){function e(e){var n=o.lastChild;return"SCRIPT"!==n.tagName?void("undefined"!=typeof console&&console.warn&&console.warn("Script is not a script",n)):void(n.onload=n.onerror=function(){n.onload=n.onerror=null,setTimeout(e,0)})}var n,o=document.querySelector("head"),a=t.e,r=t.s;t.e=function(o,u){var i=!1,s=!0,c=function(e){u&&(u(t,e),u=null)};return!r&&n&&n[o]?void c(!0):(a(o,function(){i||(i=!0,s?setTimeout(function(){c()}):c())}),void(i||(s=!1,e(function(){i||(i=!0,r?r[o]=void 0:(n||(n={}),n[o]=!0),c(!0))}))))}}o()},334:function(e,n){"use strict";e.exports=function(e,n){e.addEventListener("click",function(e){if(0!==e.button||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.defaultPrevented)return!0;for(var t=null,o=e.target;o.parentNode;o=o.parentNode)if("A"===o.nodeName){t=o;break}if(!t)return!0;if(t.target&&"_self"!==t.target.toLowerCase())return!0;if(t.pathname===window.location.pathname&&""!==t.hash)return!0;if(""===t.pathname)return!0;if(t.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i)!==-1)return!0;var a=document.createElement("a");a.href=t.href;var r=document.createElement("a");return r.href=window.location.href,a.host!==r.host||(e.preventDefault(),n(t.getAttribute("href")),!1)})}},335:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a=t(73),r=t(334),u=o(r);(0,u.default)(window,function(e){(0,a.navigateTo)(e)})},112:function(e,n,t){!function(n,t){e.exports=t()}(this,function(){"use strict";var e={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},n={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},t=Object.defineProperty,o=Object.getOwnPropertyNames,a=Object.getOwnPropertySymbols,r=Object.getOwnPropertyDescriptor,u=Object.getPrototypeOf,i=u&&u(Object);return function s(c,l,p){if("string"!=typeof l){if(i){var f=u(l);f&&f!==i&&s(c,f,p)}var d=o(l);a&&(d=d.concat(a(l)));for(var h=0;h<d.length;++h){var m=d[h];if(!(e[m]||n[m]||p&&p[m])){var g=r(l,m);try{t(c,m,g)}catch(e){}}}return c}return c}})},362:function(e,n){function t(e){return e=e||Object.create(null),{on:function(n,t){(e[n]||(e[n]=[])).push(t)},off:function(n,t){e[n]&&e[n].splice(e[n].indexOf(t)>>>0,1)},emit:function(n,t){(e[n]||[]).slice().map(function(e){e(t)}),(e["*"]||[]).slice().map(function(e){e(n,t)})}}}e.exports=t},114:function(e,n){function t(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function a(e){if(l===setTimeout)return setTimeout(e,0);if((l===t||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(n){try{return l.call(null,e,0)}catch(n){return l.call(this,e,0)}}}function r(e){if(p===clearTimeout)return clearTimeout(e);if((p===o||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(n){try{return p.call(null,e)}catch(n){return p.call(this,e)}}}function u(){m&&d&&(m=!1,d.length?h=d.concat(h):g=-1,h.length&&i())}function i(){if(!m){var e=a(u);m=!0;for(var n=h.length;n;){for(d=h,h=[];++g<n;)d&&d[g].run();g=-1,n=h.length}d=null,m=!1,r(e)}}function s(e,n){this.fun=e,this.array=n}function c(){}var l,p,f=e.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:t}catch(e){l=t}try{p="function"==typeof clearTimeout?clearTimeout:o}catch(e){p=o}}();var d,h=[],m=!1,g=-1;f.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];h.push(new s(e,n)),1!==h.length||m||a(i)},s.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=c,f.addListener=c,f.once=c,f.off=c,f.removeListener=c,f.removeAllListeners=c,f.emit=c,f.prependListener=c,f.prependOnceListener=c,f.listeners=function(e){return[]},f.binding=function(e){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(e){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},461:function(e,n){"use strict";function t(e,n){for(var t in e)if(!(t in n))return!0;for(var o in n)if(e[o]!==n[o])return!0;return!1}n.__esModule=!0,n.default=function(e,n,o){return t(e.props,n)||t(e.state,o)},e.exports=n.default},311:function(e,n,t){t(6),e.exports=function(e){return t.e(0x9427c64ab85d,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(209)})})}},312:function(e,n,t){t(6),e.exports=function(e){return t.e(35783957827783,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(210)})})}},313:function(e,n,t){t(6),e.exports=function(e){return t.e(0xc6c285f8fd10,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(211)})})}},314:function(e,n,t){t(6),e.exports=function(e){return t.e(0x620f737b6699,function(n,o){o?(console.log("bundle loading error",o),e(!0)):e(null,function(){return t(212)})})}}});
//# sourceMappingURL=app-65ed1dfee9553e022a19.js.map