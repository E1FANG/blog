//index.js
//获取应用实例
import { translate } from '../../utils/api.js'
const app = getApp()

Page({
  data: {
    query:'',
    hideClearIcon: true,
    result: {},
    curLang: {}
  },
  onInput:function(e){
    this.setData({"query": e.detail.value})
    if(this.data.query.length > 0 ){
      this.setData({"hideClearIcon" : false})
    }else{
      this.setData({ "hideClearIcon": true })
    }
  },
  onLoad:function(options){
    console.log('onLoad')
    console.log(options);
    if(options.query){
      this.setData({query : options.query})
    }
  },
  onShow:function(){
    if(this.data.curLang.lang !== app.globalData.curLang.lang){
      this.setData({ "curLang": app.globalData.curLang })
      this.onConfirm()
    }
  },
  onTapClose:function(e){
    this.setData({"query":'',"hideClearIcon":true})
  },
  onConfirm:function(e){
    if(!this.data.query) return
    translate(this.data.query, { from: 'auto', to: this.data.curLang.lang }).then(res => {
      this.setData({ 'result': res.trans_result })
      console.log('success')
      let history = wx.getStorageSync('history') || []
      history.unshift({ query: this.data.query, result: res.trans_result[0].dst })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  }
})
