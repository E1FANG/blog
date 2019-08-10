import './member.css'

import Vue from 'vue'
import router from './router'
import store from './vuex'

//根组件注入
new Vue({
    el:'#app',
    router,
    store
})