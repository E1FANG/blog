webpackJsonp([2],{0:function(t,e,s){"use strict";var a={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mrremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdata:"/address/update",addressSetDefault:"/address/setDefault"};for(var n in a)a.hasOwnProperty(n)&&(a[n]=" https://www.easy-mock.com/mock/5d6e19f1772c3b4fe195e751/example"+a[n]);e.a=a},113:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(83),n=(s.n(a),s(84)),i=(s.n(n),s(81)),o=(s.n(i),s(87)),r=(s.n(o),s(85)),d=(s.n(r),s(86)),c=(s.n(d),s(82)),u=(s.n(c),s(88)),l=(s.n(u),s(1)),f=s(0),h=s(3),p=s.n(h),m=s(6),g=s(13),w=s.n(g),v=s(18),b=s.n(v),k=w.a.parse(location.search.substr(1)),y=["商品详情","本店成交"];new l.default({el:"#app",data:{id:k,details:{},detailTab:y,tabIndex:0,dealLists:null,bannerLists:null,skuType:1,showSku:!1,skuNum:1,isAddCart:!1,showAddMessage:!1},created:function(){this.getDetails()},methods:{getDetails:function(){var t=this;p.a.get(f.a.details,{id:k}).then(function(e){t.details=e.data.data,t.bannerLists=[],t.details.imgs.forEach(function(e){t.bannerLists.push({clickUrl:"",img:e})})})},changeTab:function(t){console.log(t),this.tabIndex=t,t&&this.getDeal()},getDeal:function(){var t=this;p.a.get(f.a.deal).then(function(e){t.dealLists=e.data.data.lists})},chooseSku:function(t){this.skuType=t,this.showSku=!0},changeSkuNum:function(t){t<0&&1===this.skuNum||(this.skuNum+=t)},addCart:function(){var t=this;p.a.post(f.a.addCart,{id:k,number:this.skuNum}).then(function(e){200===e.data.status&&(t.showSku=!1,t.isAddCart=!0,t.showAddMessage=!0,setTimeout(function(){t.showAddMessage=!1},1e3))})}},components:{Swipe:b.a},watch:{showSku:function(t,e){document.body.style.overflow=t?"hidden":"auto",document.querySelector("html").style.overflow=t?"hidden":"auto",document.body.style.height=t?"100%":"auto",document.querySelector("html").style.height=t?"100%":"auto"}},mixins:[m.a]})},18:function(t,e,s){function a(t){s(39)}var n=s(8)(s(26),s(41),a,null,null);t.exports=n.exports},26:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s(70),n=s(37);s.n(n);e.default={name:"swiper",props:{lists:{required:!0},name:{}},mounted:function(){new a.a(".swiper-container",{loop:!0,pagination:{el:".swiper-pagination"}})}}},37:function(t,e){},39:function(t,e){},41:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"swiper-container"},[s("div",{staticClass:"swiper-wrapper"},t._l(t.lists,function(e){return s("div",{key:t.lists[e],staticClass:"swp-page swiper-slide"},[s("a",{staticClass:"js-no-follow",attrs:{href:e.clickUrl}},[s("img",{staticClass:"goods-main-photo fadeIn",attrs:{src:e.img}})])])})),t._v(" "),s("div",{staticClass:"swiper-pagination"})])},staticRenderFns:[]}},6:function(t,e,s){"use strict";var a={filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var s=e.split(".");return s[0]+"."+(s[1]+"0").substr(0,2)}return e+".00"}}};e.a=a},81:function(t,e){},82:function(t,e){},83:function(t,e){},84:function(t,e){},85:function(t,e){},86:function(t,e){},87:function(t,e){},88:function(t,e){}},[113]);
//# sourceMappingURL=goods.cbe6b9ed1e0d2d1fa49c.js.map