webpackJsonp([4],{0:function(e,t,i){"use strict";var n={hotLists:"/index/hotLists",banner:"/index/banner",topList:"/category/topList",subList:"/category/subList",rank:"/category/rank",searchList:"/search/list",details:"/goods/details",deal:"/goods/deal",addCart:"/cart/add",cartLists:"/cart/list",cartReduce:"/cart/reduce",cartRemove:"/cart/remove",cartMremove:"/cart/mrremove",addressLists:"/address/list",addressAdd:"/address/add",addressRemove:"/address/remove",addressUpdata:"/address/update",addressSetDefault:"/address/setDefault"};for(var o in n)n.hasOwnProperty(o)&&(n[o]=" https://www.easy-mock.com/mock/5d6e19f1772c3b4fe195e751/example"+n[o]);t.a=n},111:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(78),o=(i.n(n),i(77)),s=(i.n(o),i(76)),r=(i.n(s),i(79)),c=(i.n(r),i(1)),d=i(6),a=i(3),h=i.n(a),u=i(0),f=i(24),l=i.n(f),g=i(72);new c.default({el:".container",data:{lists:null,total:0,editingShop:null,editingShopIndex:-1,removePopup:!1,removeData:null,removeMsg:""},computed:{allSelected:{get:function(){return!(!this.lists||!this.lists.length)&&this.lists.every(function(e){return e.checked})},set:function(e){this.lists.forEach(function(t){t.checked=e,t.goodsList.forEach(function(t){t.checked=e})})}},allRemoveSelected:{get:function(){return!!this.editingShop&&this.editingShop.removeChecked},set:function(e){this.editingShop&&(this.editingShop.removeChecked=e,this.editingShop.goodsList.forEach(function(t){t.removeChecked=e}))}},selectLists:function(){if(this.lists&&this.lists.length){var e=[],t=0;return this.lists.forEach(function(i){i.goodsList.forEach(function(i){i.checked&&(e.push(i),t+=i.price*i.number)})}),this.total=t,e}return[]},removeLists:function(){if(this.editingShop){var e=[];return this.editingShop.goodsList.forEach(function(t){t.removeChecked&&e.push(t)}),e}return[]}},created:function(){this.getList()},methods:{getList:function(){var e=this;h.a.get(u.a.cartLists).then(function(t){var i=t.data.cartList;i.forEach(function(e){e.checked=!0,e.removeChecked=!1,e.editing=!1,e.editingMsg="编辑",e.goodsList.forEach(function(e){e.checked=!0,e.removeChecked=!1,e.touch=!1})}),e.lists=i})},selectGood:function(e,t){var i=this.editingShop?"removeChecked":"checked";t[i]=!t[i],e[i]=e.goodsList.every(function(e){return e[i]})},selectShop:function(e){var t=this.editingShop?"removeChecked":"checked";e[t]=!e[t],e.goodsList.forEach(function(i){i[t]=e[t]})},selectAll:function(){var e=this.editingShop?"AllRemoveSelected":"allSelected";this[e]=!this[e]},edit:function(e,t){e.editing=!e.editing,e.editingMsg=e.editing?"完成":"编辑",this.lists.forEach(function(i,n){t!==n&&(i.editing=!1,i.editingMsg=e.editing?"":"编辑")}),this.editingShop=e.editing?e:null,this.editingShopIndex=e.editing?t:-1},reduce:function(e){1!==e.number&&g.a.reduce(e.id).then(function(t){e.number--})},add:function(e){g.a.add(e.id).then(function(t){e.number++})},remove:function(e,t,i,n){this.removePopup=!0,this.removeData={shop:e,shopIndex:t,good:i,goodIndex:n},this.removeMsg="确定删除商品吗？"},removeList:function(){this.removePopup=!0,this.removeMsg="确定将所选"+this.removeLists.length+" 个商品删除？"},removeConfirm:function(){var e=this;if("确定删除商品吗？"===this.removeMsg){var t=this.removeData,i=t.shop,n=t.shopIndex,o=t.good,s=t.goodIndex;h.a.post(u.a.cartRemove,{id:o.id}).then(function(t){i.goodsList.splice(s,1),i.goodsList.length||(e.lists.splice(n,1),e.removeShop()),e.removePopup=!1,o.touch=!1})}else{var r=[];this.removeLists.forEach(function(e){r.push(e)}),h.a.post(u.a.cartMremove,{ids:r}).then(function(t){var i=[];e.editingShop.goodsList.forEach(function(t){-1===e.removeLists.findIndex(function(e){return e.id==t.id})&&i.push(t)}),i.length?e.editingShop.goodsList=i:(e.lists.splice(e.editingShopIndex,1),e.removeShop()),e.removePopup=!1})}},removeShop:function(){this.editingShop=null,this.editingShopIndex=-1,this.lists.forEach(function(e){e.editing=!1,e.editingMsg="编辑"})},start:function(e,t){t.startX=e.changedTouches[0].clientX},end:function(e,t,i,n){var o=e.changedTouches[0].clientX,s="0";i.startX-o>100&&(s="-60px",i.touch=!0),o-i.startX>100&&(s="0px",i.touch=!1),l()(this.$refs["goods-"+t+"-"+n],{left:s})}},mixins:[d.a]})},27:function(e,t,i){"use strict";function n(e,t){return new s.a(function(i,n){c.a.post(e,t).then(function(e){var t=e.data.status;200===t&&i(e),300===t&&(href.location="login.html",i(e)),rejects(e)}).catch(function(e){n(e)})})}var o=i(29),s=i.n(o),r=i(3),c=i.n(r);t.a=n},6:function(e,t,i){"use strict";var n={filters:{currency:function(e){var t=""+e;if(t.indexOf(".")>-1){var i=t.split(".");return i[0]+"."+(i[1]+"0").substr(0,2)}return t+".00"}}};t.a=n},72:function(e,t,i){"use strict";var n=i(51),o=i.n(n),s=i(52),r=i.n(s),c=i(27),d=i(0),a=function(){function e(){o()(this,e)}return r()(e,null,[{key:"add",value:function(e){return i.i(c.a)(d.a.addCart,{id:e,number:1})}},{key:"reduce",value:function(e){return i.i(c.a)(d.a.cartReduce,{id:e,number:1})}}]),e}();t.a=a},76:function(e,t){},77:function(e,t){},78:function(e,t){},79:function(e,t){}},[111]);
//# sourceMappingURL=cart.2b9d4d9fe021c19db5f6.js.map