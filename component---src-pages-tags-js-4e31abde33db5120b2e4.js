(self.webpackChunkjonsadka_blog=self.webpackChunkjonsadka_blog||[]).push([[159],{1325:function(t,n,e){"use strict";e.r(n);var u=e(7294),o=e(1074),r=e(2021),f=e.n(r),a=e(5414),i=e(1597),c=e(8071),l=o.default.div.withConfig({displayName:"tags__PageContainer",componentId:"sc-ooeh30-0"})(["margin:30px 0 60px 0;"]),d=o.default.li.withConfig({displayName:"tags__Tag",componentId:"sc-ooeh30-1"})(["list-style-type:none;margin-left:0;margin-bottom:30px;"]),s=o.default.span.withConfig({displayName:"tags__ForwardSlash",componentId:"sc-ooeh30-2"})(["margin:0 10px;"]);n.default=function(t){var n=t.data,e=n.allMarkdownRemark.group,o=n.site.siteMetadata.title;return u.createElement(c.Z,null,u.createElement(l,null,u.createElement(a.Z,{title:o}),u.createElement("div",null,u.createElement("h2",null,"Tags"),u.createElement("ul",null,e.sort((function(t,n){return n.totalCount-t.totalCount})).map((function(t){return u.createElement(d,{key:t.fieldValue},u.createElement(i.Link,{to:"/tags/"+f()(t.fieldValue)+"/"},t.totalCount<10?"0"+t.totalCount:t.totalCount,u.createElement(s,null,"/"),t.fieldValue))}))))))}},2705:function(t,n,e){var u=e(5639).Symbol;t.exports=u},9932:function(t){t.exports=function(t,n){for(var e=-1,u=null==t?0:t.length,o=Array(u);++e<u;)o[e]=n(t[e],e,t);return o}},2663:function(t){t.exports=function(t,n,e,u){var o=-1,r=null==t?0:t.length;for(u&&r&&(e=t[++o]);++o<r;)e=n(e,t[o],o,t);return e}},9029:function(t){var n=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;t.exports=function(t){return t.match(n)||[]}},4239:function(t,n,e){var u=e(2705),o=e(9607),r=e(2333),f=u?u.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":f&&f in Object(t)?o(t):r(t)}},8674:function(t){t.exports=function(t){return function(n){return null==t?void 0:t[n]}}},531:function(t,n,e){var u=e(2705),o=e(9932),r=e(1469),f=e(3448),a=u?u.prototype:void 0,i=a?a.toString:void 0;t.exports=function t(n){if("string"==typeof n)return n;if(r(n))return o(n,t)+"";if(f(n))return i?i.call(n):"";var e=n+"";return"0"==e&&1/n==-Infinity?"-0":e}},5393:function(t,n,e){var u=e(2663),o=e(3816),r=e(8748),f=RegExp("['’]","g");t.exports=function(t){return function(n){return u(r(o(n).replace(f,"")),t,"")}}},9389:function(t,n,e){var u=e(8674)({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"});t.exports=u},1957:function(t,n,e){var u="object"==typeof e.g&&e.g&&e.g.Object===Object&&e.g;t.exports=u},9607:function(t,n,e){var u=e(2705),o=Object.prototype,r=o.hasOwnProperty,f=o.toString,a=u?u.toStringTag:void 0;t.exports=function(t){var n=r.call(t,a),e=t[a];try{t[a]=void 0;var u=!0}catch(i){}var o=f.call(t);return u&&(n?t[a]=e:delete t[a]),o}},3157:function(t){var n=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;t.exports=function(t){return n.test(t)}},2333:function(t){var n=Object.prototype.toString;t.exports=function(t){return n.call(t)}},5639:function(t,n,e){var u=e(1957),o="object"==typeof self&&self&&self.Object===Object&&self,r=u||o||Function("return this")();t.exports=r},2757:function(t){var n="\\u2700-\\u27bf",e="a-z\\xdf-\\xf6\\xf8-\\xff",u="A-Z\\xc0-\\xd6\\xd8-\\xde",o="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",r="["+o+"]",f="\\d+",a="[\\u2700-\\u27bf]",i="["+e+"]",c="[^\\ud800-\\udfff"+o+f+n+e+u+"]",l="(?:\\ud83c[\\udde6-\\uddff]){2}",d="[\\ud800-\\udbff][\\udc00-\\udfff]",s="["+u+"]",x="(?:"+i+"|"+c+")",p="(?:"+s+"|"+c+")",g="(?:['’](?:d|ll|m|re|s|t|ve))?",v="(?:['’](?:D|LL|M|RE|S|T|VE))?",b="(?:[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]|\\ud83c[\\udffb-\\udfff])?",m="[\\ufe0e\\ufe0f]?",y=m+b+("(?:\\u200d(?:"+["[^\\ud800-\\udfff]",l,d].join("|")+")"+m+b+")*"),h="(?:"+[a,l,d].join("|")+")"+y,E=RegExp([s+"?"+i+"+"+g+"(?="+[r,s,"$"].join("|")+")",p+"+"+v+"(?="+[r,s+x,"$"].join("|")+")",s+"?"+x+"+"+g,s+"+"+v,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",f,h].join("|"),"g");t.exports=function(t){return t.match(E)||[]}},3816:function(t,n,e){var u=e(9389),o=e(9833),r=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,f=RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]","g");t.exports=function(t){return(t=o(t))&&t.replace(r,u).replace(f,"")}},1469:function(t){var n=Array.isArray;t.exports=n},7005:function(t){t.exports=function(t){return null!=t&&"object"==typeof t}},3448:function(t,n,e){var u=e(4239),o=e(7005);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==u(t)}},2021:function(t,n,e){var u=e(5393)((function(t,n,e){return t+(e?"-":"")+n.toLowerCase()}));t.exports=u},9833:function(t,n,e){var u=e(531);t.exports=function(t){return null==t?"":u(t)}},8748:function(t,n,e){var u=e(9029),o=e(3157),r=e(9833),f=e(2757);t.exports=function(t,n,e){return t=r(t),void 0===(n=e?void 0:n)?o(t)?f(t):u(t):t.match(n)||[]}}}]);
//# sourceMappingURL=component---src-pages-tags-js-4e31abde33db5120b2e4.js.map