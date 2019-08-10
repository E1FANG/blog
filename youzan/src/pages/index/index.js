import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue'
import Swipe from 'components/Swipe.vue'


let app = new Vue({
    el: '#app',
    data: {
        lists: null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
        bannerLists:null,
        obj:{
            age:20
        }
    },
    components:{
        Foot,
        Swipe
    },
    created() {
        this.getLists(),
        this.getBannerLists()
    },
    methods: {
        getLists() {
            //    如果没有数据可以加载了，就rerun
            if(this.allLoaded) return
            //    是否在加载中
            this.loading = true
            axios.get(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: 6
            }).then(res => {
                let curLists = res.data.lists
                //判断所有数据是否加载完毕
                if(curLists.length < this.pageSize){
                    this.allLoaded = true
                }
                if(this.lists){
                    this.lists = this.lists.concat(curLists)
                    console.log(Array.isArray(this.lists))
                }else{
                    this.lists = curLists
                }
                this.loading = false
                this.pageNum++
            })
        },
        getBannerLists(){
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists
            })
        }
    }
})