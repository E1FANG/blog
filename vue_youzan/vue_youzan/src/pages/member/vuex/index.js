//使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Addres from 'js/addressService.js'

//创建Store实例

//应用层级的状态都应该集中到单个store对象中
const store = new Vuex.Store({
    //状态管理 类似vue实例的data
    state:{
        lists:null
    },

    //不是事件，类似事件，因为状态管理里面的数据是不允许直接修改的
    //我们允许定义一系列事件来触发，触发事件来进行数据管理
    //提交mutation是更改状态的唯一方法，并且这个过程是同步的
    mutations:{
        init(state,lists){
            state.lists = lists
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state, id){
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id == id
            })
            lists.splice(index,1)
        },
        update(state, instance){
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id == instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state, id){
            let lists = state.lists
            lists.forEach(item => {
                item.isDefault= item.id==id? true : false
            })
        }
    },

    //异步  异步逻辑都封装在这里
    //通过一些异步的操作，操作完之后，再触发mutations，对数据state进行一个同步的操作
    actions:{
        getLists(){
            Addres.list().then(res =>{
                // this.lists = res.data.lists
                //通过store.commit来触发mutations里面的事件
                store.commit('init', res.data.lists)
            })
        },
        //es2015对象解析，{commit}
        addAction({commit},instance){
            Addres.add(instance).then(res => {
                //模拟添加id， 其实instance最好后台返回
                instance.id = parseInt(Math.random()*10000)
                commit('add', instance)
            })
        },
        removeAction({commit}, id){
            Addres.remove(id).then(res => {
                commit('remove', id)
            })
        },
        updateAction({commit},instance){
            Addres.update(instance).then(res =>{
                commit('update', instance)
            })
        },
        setDefaultAction({commit}, id){
            Addres.setDefault(id).then(res => {
                commit('setDefault', id)
            })
        }
    }
})

export default store