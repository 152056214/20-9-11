// pages/login/login.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bghei:app.globalData.winheight/6,
    bg2hei:app.globalData.winheight/1.1,
    loadopt:true,
    tip1:'',
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
        title: '活动商',
      })
  },
  // 区分公司和玩家
  gsload(){
    this.setData({loadopt:true})
  },
  wjload(){
    this.setData({loadopt:false})
  },
  // 提交
  formSubmit: function(e){
    console.log(e)
    if(this.data.loadopt){
      console.log(app.globalData.openid)
      wx.request({
        url: 'https://www.juquduo.com/juquduo/login/company_login',
        data:{
          openid:app.globalData.openid,
          companyName:e.detail.value.gsName,
          companyPhone:e.detail.value.gspho
        },
        method:'GET',
        success(res){
          console.log(res)
        }
      })
    }else{
      wx.request({
        url: 'https://www.juquduo.com/juquduo/login/person_login',
        data:{
          openid:app.globalData.openid,
          personName:e.detail.value.wjName,
          personPhone:e.detail.value.wjpho
        },
        method:'GET',
        success(res){
          console.log(res)
          wx.navigateTo({
            url: '../dactivity/dactivity',
          })
        }
      })
    }
  },
  //点注册、跳转
  zhuce(){
    if(this.data.loadopt){
      wx.navigateTo({
        url: '../ccreatac/creatac',
      })
    }else{
      wx.navigateTo({
        url: '../bperzhuce/perzhuce',
      })
    }
  },
  phone(e){
    var pattern = /0?(13|14|15|18)[0-9]{9}$/;
    var pho = e.detail.value;
    if(pattern.test(pho)){
      this.setData({tip1:'',zcco:'#2DC1EF'})
    }else{
      this.setData({tip1:'格式不对',zcco:'red'})
    }
  }

})