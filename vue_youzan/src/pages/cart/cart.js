import './cart_trade.css'
import './cart_base.css'
import './cart.css'
import './dilong.css'

import Vue from 'vue'
import mixin from 'js/mixin.js'
import axios from 'axios'
import url from 'js/api.js'
import Volecity from 'velocity-animate'

import Cart from 'js/cartService.js' 

new Vue ({
    el:'.container',
    data:{
        lists:null,
        total:0,
        editingShop:null,
        editingShopIndex:-1,
        removePopup:false,
        removeData:null,
        removeMsg:'',
    },
    computed:{
        allSelected:{
            get(){
                if(this.lists && this.lists.length){
                    return this.lists.every(shop=>{
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                this.lists.forEach(shop =>{
                    shop.checked = newVal
                    shop.goodsList.forEach(good =>{
                        good.checked = newVal
                    })
                })
            },
        },
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }
            }
        },
        selectLists(){
            if(this.lists&&this.lists.length){
                let arr = [] 
                let total =0
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removeLists(){
            if(this.editingShop){
                let arr = []
                this.editingShop.goodsList.forEach(good =>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList() {
            axios.get(url.cartLists).then(res =>{
                let lists = res.data.cartList
                lists.forEach(shop=>{
                    shop.checked = true
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked = true
                        good.removeChecked = false
                        good.touch = false
                    })
                })
                this.lists = lists
            })
        },
        selectGood(shop,good){
            //选择状态
            // good.checked = !good.checked
            // shop.checked = shop.goodsList.every(good =>{
            //     return good.checked
            // })

            //根据当前是处于编辑状态还是选择状态来设置
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good =>{
                return good[attr]
            })
        },
        selectShop(shop){
            //选择状态
            // shop.checked = !shop.checked
            // shop.goodsList.forEach(good =>{
            //     good.checked = shop.checked
            // })

             //根据当前是处于编辑状态还是选择状态来设置
            let attr = this.editingShop ? 'removeChecked' : 'checked'
            shop[attr] = !shop[attr]
            shop.goodsList.forEach(good =>{
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            //选择状态
            // this.allSelected = !this.allSelected

             //根据当前是处于编辑状态还是选择状态来设置
            let attr = this.editingShop ? 'AllRemoveSelected' : 'allSelected'
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex){
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing ? '完成' : '编辑'
            this.lists.forEach((item,i) => {
                if(shopIndex !== i){
                    item.editing = false
                    item.editingMsg =  shop.editing ? '' : '编辑'
                }
            })
            this.editingShop = shop.editing ? shop : null
            this.editingShopIndex = shop.editing ? shopIndex : -1
        },
        reduce(good){
            if(good.number ===1) return 
            // axios.post(url.cartReduce, {
            //     id:good.id,
            //     number:1
            // }).then(res => {
            //     good.number --
            // })
            Cart.reduce(good.id).then(res => {
                good.number --
            })
        },
        add(good){
            //先给服务器发送请求，告诉服务器哪个商品增加了1，请求成功后，才执行页面商品+1；
            // axios.post(url.addCart, {
            //     id:good.id,
            //     number:1
            // }).then(res => {
            //     good.number ++
            // })

            Cart.add(good.id).then(res => {
                good.number ++
            })
        },
        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true;
            this.removeData ={shop,shopIndex,good,goodIndex}
            this.removeMsg ='确定删除商品吗？'
        },
        removeList(){
            this.removePopup = true;
            this.removeMsg = '确定将所选' + this.removeLists.length + ' 个商品删除？'
        },
        removeConfirm(){
            if(this.removeMsg === '确定删除商品吗？'){
                let {shop,shopIndex,good,goodIndex} = this.removeData
                axios.post(url.cartRemove,{
                    id:good.id,
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    if(!shop.goodsList.length){
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                    this.removePopup = false;
                    // Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
                    //     left : '0px'
                    // })
                    good.touch = false
                })
             }else{
                 let ids =[]
                 this.removeLists.forEach(good => {
                     ids.push(good)
                 })
                 axios.post(url.cartMremove, {
                     ids
                 }).then(res => {
                     let arr =[]
                    //  因为如果一个一个找到要删除的商品下标，再一个一个删除，
                    //  那么数组里面的商品下标就会产生变化，所以要从后往前的删除商品才可行，
                    //  因为太复杂，所以使用第二种方法：
                    //  把不在删除列表的商品找出来，放在一个新数组里面。
                    //  然后再判断，如果这个数组存在，就将它赋值给商铺的商品列表，渲染到页面上
                    //  这样页面一样是没有了被删除了的商品
                    //  如果数组不存在 就说明商店的商品已经被删除没了，所以可以将商店删掉了
                     this.editingShop.goodsList.forEach(good => {
                         let index = this.removeLists.findIndex(item => {
                             return item.id ==good.id
                         })
                         if(index === -1){
                             arr.push(good)
                         }
                     })
                     if(arr.length) {
                         this.editingShop.goodsList = arr
                     }else{
                         this.lists.splice(this.editingShopIndex, 1)
                         this.removeShop()
                     }
                     this.removePopup =false
                 })
             }
        },
        removeShop(){
            this.editingShop = null
            this.editingShopIndex = -1
            this.lists.forEach(shop =>{
                shop.editing = false
                shop.editingMsg = '编辑'
            })
        },

        //touch事件 
        start(e,good){
            good.startX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex){
            let endX = e.changedTouches[0].clientX
            let left = '0'
            if(good.startX - endX > 100){
                left = '-60px'
                good.touch = true
            }
            if(endX - good.startX > 100){
                left = '0px'
                good.touch = false
            }
            Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
                left
            })
            
        },
    },
    mixins:[mixin]
})
























//-------------------------------mockjs的使用

// import Mock from 'mockjs'
// let Random = Mock.Random


// let data = Mock.mock({
//     'cartList|3' :[{
//         'goodsList|1-2':[{
//             id:Random.int(10000,100000),
//             image:Mock.mock('@img(90x90, @color)')
//         }]
//     }]
// })

// console.log(data)