import './search.css'
import 'css/common.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

let {keyword, id} = qs.parse(location.search.substr(1))
new Vue({
    el:'.container',
    data:{
        searchList: null,
        keyword,
        isShow:false,
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axios.get(url.searchList,{keyword, id}).then(res => {
                this.searchList = res.data.lists
            })
        },
        move(){
            if(document.documentElement.scrollTop > 100){
                this.isShow = true
                return this.isShow
            }else{
                this.isShow = false
                return this.isShow
            }
        },
        toTop(){
            Velocity(document.body,'scroll',{duration:1000})
        }
    },
    mixins:[mixin],
    mounted(){
        window.addEventListener('scroll', this.move)
    }
})