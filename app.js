//app.js

// const APP_ID ='wxc28aa3218c79e8f6'
// const APP_SECRET ='8dba7a037c458a8e80f776f67339369b'
const appConfig = require('config.js');

var openid = ' '
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: appConfig.APP_ID,
            secret: appConfig.APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: res => {
            this.globalData.openid = res.data.openid
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: appConfig.APP_ID,
              secret: appConfig.APP_SECRET,
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            success: res => {
              // this.globalData.openid = res.data.openid
              wx.setStorageSync(openid,res.data.openid)
            }
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    key: 'I4VBZ-4T2WQ-MCO52-G3IH5-VFGWF-KEBJW',
    winheight:wx.getSystemInfoSync().windowHeight,
    winwidth:wx.getSystemInfoSync().windowWidth,
    openid: openid,
  }
})