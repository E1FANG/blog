const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    curLang:{},
    langList:app.globalData.langList
  },
  onShow:function(){
    this.setData({"curLang": app.globalData.curLang})
  },
  onTapItem:function(e){
    let langObj  = e.currentTarget.dataset
    console.log(langObj)
    wx.setStorageSync('language', langObj)
    this.setData({'curLang': langObj})
    app.globalData.curLang = langObj
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})