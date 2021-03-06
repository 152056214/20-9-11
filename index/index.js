//index.js
//获取应用实例
const app = getApp()
const appConfig = require('../../config.js');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
 

  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getid: function(){
    // wx.request({
    //   url: 'https://www.juquduo.com/login',
    //   data:{
    //     openId:app.globalData.openid,
    //     imagePath:app.globalData.userInfo.avatarUrl,
    //     nickName:app.globalData.userInfo.nickName,
    //     sex:app.globalData.userInfo.gender,
    //     city:app.globalData.userInfo.city,
    //     province:app.globalData.userInfo.province,
    //   },
    //   method: 'GET',
    //   success: function (res){
    //     console.log(res)
    //   },
    // }),
    console.log(app.globalData.userInfo)
    
  // wx.getStorageSync(openid)
    console.log(app.globalData.openid)
    // console.log(app.globalData.openid)
    wx.navigateTo({
      url: '../newar/newar',
    })
  }
  
})
