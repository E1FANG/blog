import './category.css'
import 'css/common.css'
import url from 'js/api.js'

import Vue from 'vue'
import axios from 'axios'

import Foot from 'components/Foot.vue'
import mixin from 'js/mixin'

new Vue({
    el: '#app',
    data: {
        topLists: null,
        topIndex: 0,
        subData: null,
        rankData:null,
        hotGoods:null,
        hotShops:null,
        hotKeys:null,
        brandList:null,
        categoryList:null,
    },
    created() {
        this.getTopList()
        this.getSubList(0,0)
    },
    methods: {
        getTopList() {
            axios.get(url.topList).then(res => {
                this.topLists = res.data.lists
            })
        },
        getSubList(index,id) {
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            } else {
                axios.get(url.subList, { id }).then(res => {
                    this.subData = res.data.data
                    this.brandList = res.data.data.brandList
                    this.categoryList = res.data.data.categoryList
                })
            } 
        },
        getRank(){
            axios.get(url.rank).then(res =>{
                this.rankData = res.data.data
                this.hotGoods = res.data.data.hotGoods
                this.hotShops = res.data.data.hotShops
                this.hotKeys  = res.data.data.hotKeywords
            })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    components: {
        Foot
    },
    // filters: {
    //     number(price) {
    //         let priceStr = '' + price
    //         if(priceStr.indexOf('.')>-1){
    //             let arr = priceStr.split('.')
    //             return arr[0] + '.' + (arr[1] + '0').substr(0,2)
    //         }else{
    //             return priceStr + '.00'
    //         }
    //     }
    // }
    mixins:[mixin]
})