webpackJsonp([4],{0:function(t,e,i){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mrremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdata:"/address/update",addressSetDefault:"/address/setDefault"};for(var o in n)n.hasOwnProperty(o)&&(n[o]="http://rap2api.taobao.org/app/mock/7058"+n[o]);e.a=n},111:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(78),o=(i.n(n),i(77)),s=(i.n(o),i(76)),r=(i.n(s),i(79)),c=(i.n(r),i(1)),d=i(6),a=i(3),h=i.n(a),u=i(0),f=i(24),l=i.n(f),g=i(72);new c.default({el:".container",data:{lists:null,total:0,editingShop:null,editingShopIndex:-1,removePopup:!1,removeData:null,removeMsg:""},computed:{allSelected:{get:function(){return!(!this.lists||!this.lists.length)&&this.lists.every(function(t){return t.checked})},set:function(t){this.lists.forEach(function(e){e.checked=t,e.goodsList.forEach(function(e){e.checked=t})})}},allRemoveSelected:{get:function(){return!!this.editingShop&&this.editingShop.removeChecked},set:function(t){this.editingShop&&(this.editingShop.removeChecked=t,this.editingShop.goodsList.forEach(function(e){e.removeChecked=t}))}},selectLists:function(){if(this.lists&&this.lists.length){var t=[],e=0;return this.lists.forEach(function(i){i.goodsList.forEach(function(i){i.checked&&(t.push(i),e+=i.price*i.number)})}),this.total=e,t}return[]},removeLists:function(){if(this.editingShop){var t=[];return this.editingShop.goodsList.forEach(function(e){e.removeChecked&&t.push(e)}),t}return[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;h.a.get(u.a.cartLists).then(function(e){var i=e.data.cartList;i.forEach(function(t){t.checked=!0,t.removeChecked=!1,t.editing=!1,t.editingMsg="编辑",t.goodsList.forEach(function(t){t.checked=!0,t.removeChecked=!1,t.touch=!1})}),t.lists=i})},selectGood:function(t,e){var i=this.editingShop?"removeChecked":"checked";e[i]=!e[i],t[i]=t.goodsList.every(function(t){return t[i]})},selectShop:function(t){var e=this.editingShop?"removeChecked":"checked";t[e]=!t[e],t.goodsList.forEach(function(i){i[e]=t[e]})},selectAll:function(){var t=this.editingShop?"AllRemoveSelected":"allSelected";this[t]=!this[t]},edit:function(t,e){t.editing=!t.editing,t.editingMsg=t.editing?"完成":"编辑",this.lists.forEach(function(i,n){e!==n&&(i.editing=!1,i.editingMsg=t.editing?"":"编辑")}),this.editingShop=t.editing?t:null,this.editingShopIndex=t.editing?e:-1},reduce:function(t){1!==t.number&&g.a.reduce(t.id).then(function(e){t.number--})},add:function(t){g.a.add(t.id).then(function(e){t.number++})},remove:function(t,e,i,n){this.removePopup=!0,this.removeData={shop:t,shopIndex:e,good:i,goodIndex:n},this.removeMsg="确定删除商品吗？"},removeList:function(){this.removePopup=!0,this.removeMsg="确定将所选"+this.removeLists.length+" 个商品删除？"},removeConfirm:function(){var t=this;if("确定删除商品吗？"===this.removeMsg){var e=this.removeData,i=e.shop,n=e.shopIndex,o=e.good,s=e.goodIndex;h.a.post(u.a.cartRemove,{id:o.id}).then(function(e){i.goodsList.splice(s,1),i.goodsList.length||(t.lists.splice(n,1),t.removeShop()),t.removePopup=!1,o.touch=!1})}else{var r=[];this.removeLists.forEach(function(t){r.push(t)}),h.a.post(u.a.cartMremove,{ids:r}).then(function(e){var i=[];t.editingShop.goodsList.forEach(function(e){-1===t.removeLists.findIndex(function(t){return t.id==e.id})&&i.push(e)}),i.length?t.editingShop.goodsList=i:(t.lists.splice(t.editingShopIndex,1),t.removeShop()),t.removePopup=!1})}},removeShop:function(){this.editingShop=null,this.editingShopIndex=-1,this.lists.forEach(function(t){t.editing=!1,t.editingMsg="编辑"})},start:function(t,e){e.startX=t.changedTouches[0].clientX},end:function(t,e,i,n){var o=t.changedTouches[0].clientX,s="0";i.startX-o>100&&(s="-60px",i.touch=!0),o-i.startX>100&&(s="0px",i.touch=!1),l()(this.$refs["goods-"+e+"-"+n],{left:s})}},mixins:[d.a]})},27:function(t,e,i){"use strict";function n(t,e){return new s.a(function(i,n){c.a.post(t,e).then(function(t){var e=t.data.status;200===e&&i(t),300===e&&(href.location="login.html",i(t)),rejects(t)}).catch(function(t){n(t)})})}var o=i(29),s=i.n(o),r=i(3),c=i.n(r);e.a=n},6:function(t,e,i){"use strict";var n={filters:{currency:function(t){var e=""+t;if(e.indexOf(".")>-1){var i=e.split(".");return i[0]+"."+(i[1]+"0").substr(0,2)}return e+".00"}}};e.a=n},72:function(t,e,i){"use strict";var n=i(51),o=i.n(n),s=i(52),r=i.n(s),c=i(27),d=i(0),a=function(){function t(){o()(this,t)}return r()(t,null,[{key:"add",value:function(t){return i.i(c.a)(d.a.addCart,{id:t,number:1})}},{key:"reduce",value:function(t){return i.i(c.a)(d.a.cartReduce,{id:t,number:1})}}]),t}();e.a=a},76:function(t,e){},77:function(t,e){},78:function(t,e){},79:function(t,e){}},[111]);
//# sourceMappingURL=cart.9ded8a107d06f8980276.js.map