(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{141:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return f});a(152);var n=a(0),l=a.n(n),o=a(144),i=a(153),r=a.n(i),u=a(147),m=a.n(u),c=a(32),p=a(145),s=o.a.div.withConfig({displayName:"tags__PageContainer",componentId:"ooeh30-0"})(["margin:30px 0 60px 0;"]),d=o.a.li.withConfig({displayName:"tags__Tag",componentId:"ooeh30-1"})(["list-style-type:none;margin-left:0;margin-bottom:30px;"]),g=o.a.span.withConfig({displayName:"tags__ForwardSlash",componentId:"ooeh30-2"})(["margin:0 10px;"]);t.default=function(e){var t=e.data,a=t.allMarkdownRemark.group,n=t.site.siteMetadata.title;return l.a.createElement(p.a,null,l.a.createElement(s,null,l.a.createElement(m.a,{title:n}),l.a.createElement("div",null,l.a.createElement("h2",null,"Tags"),l.a.createElement("ul",null,a.sort(function(e,t){return t.totalCount-e.totalCount}).map(function(e){return l.a.createElement(d,{key:e.fieldValue},l.a.createElement(c.Link,{to:"/tags/"+r()(e.fieldValue)+"/"},e.totalCount<10?"0"+e.totalCount:e.totalCount,l.a.createElement(g,null,"/"),e.fieldValue))})))))};var f="1755142172"}}]);
//# sourceMappingURL=component---src-pages-tags-js-d310bf931517ace2fe79.js.map