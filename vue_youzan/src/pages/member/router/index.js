import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



let routes =[{
    path:'/',
    component: require('../components/member.vue')
},{
    //要用router-link 就要一个组件，一个路由配置
    path:'/address',
    component:  require('../components/address.vue'),
    children:[{
        path:'',
        // component: require('./components/all.vue')
        redirect: 'all'
    },{
        path:'all',
        name:'all',
        component: require('../components/all.vue')
    },{
        path:'form',
        name:'form',
        component: require('../components/form.vue')
    }]
}]

//创建router实例
let router = new Router({
    routes
})

export default router
