// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk');

 
var app = getApp()
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: app.globalData.key // 必填
});  
 
//在Page({})中使用下列代码
Page({
  data:{
    winheight:app.globalData.winheight,
    winwidth:app.globalData.winwidth,
    widd:app.globalData.winwidth/2-40,
    userInfo: app.globalData.userInfo,
    heii:app.globalData.winwidth/10,
    poiname:'',
    shuru:'',
    imagepath:'../resourse/yeshou/头像-1.png',
    poi: {
      latitude: 39.942845,
      longitude: 116.481793,
    }
  },
  onShow(){
    // if(shuru=='1'){
    // var that = this
    //   wx.showModal({
    //   cancelColor: 'blue',
    //   title: '授权',
    //   content: '授权登录',
    //   success (res) {
    //     if (res.confirm) {
    //       that.setData({imagepath:app.globalData.userInfo.avatarUrl})
    //       wx.request({
    //         url: 'https://www.juquduo.com/login',
    //         data:{
    //           openId:app.globalData.openid,
    //           imagePath:app.globalData.userInfo.avatarUrl,
    //           nickName:app.globalData.userInfo.nickName
    //         },
    //         method: 'GET',
    //         success: function (res){
    //           console.log(res)
    //         },
            
    //       })
          
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
    // }
    
//触发表单提交事件，调用接口
    var _this = this;
    qqmapsdk.reverseGeocoder({ //显示覆盖物和地图
      location: '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var mks = [];
        
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中

          id: 0,
          latitude: 39.942845,
          longitude: 116.481793,
          iconPath: '../resourse/yeshou/火苗-3.png',
          width: 40,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 1,
          latitude: 39.881287,
          longitude: 116.410654,
          iconPath: '../resourse/yeshou/火苗-2.png',
          width: 40,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 2,
          latitude: 39.812208,
          longitude: 116.489191,
          iconPath: '../resourse/yeshou/火苗-1.png',
          width: 40,
          height: 40,
        });
        _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          poi: {
            latitude: res.location.lat,
            longitude: res.location.lng,
            // latitude: 39.942845,
            // longitude: 116.481793,
          }
        });
        console.log(_this.data.poi)
      },
    })
  },
  send :function (res){ //输入框按下回车
    //获得文本框输入的值
    var name = res.detail.value;
    this.setData({poiname:name})
    console.log(this.data.poiname)
  },
  find:function(res) { //输入框的搜索图标
    var name = this.data.poiname
    console.log(name)
  },
  formName(r){ //输入框输入检测
    var aaa = r.detail.value
    this.setData({shuru:aaa})

  },
  touxiang:function(){ //获取用户头像
    var that = this
      wx.showModal({
      cancelColor: 'blue',
      title: '授权',
      content: '授权登录',
      success (res) {
        if (res.confirm) {
          that.setData({imagepath:app.globalData.userInfo.avatarUrl})
          wx.request({
            url: 'https://www.juquduo.com/login',
            data:{
              openId:app.globalData.openid,
              avatar:app.globalData.userInfo.avatarUrl,
              nickName:app.globalData.userInfo.nickName
            },
            method: 'GET',
            success: function (res){
              console.log(res)
            },
            
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  saoyisao(){ //扫一扫按钮
    wx.scanCode({
      onlyFromCamera: false,
    })
  },
  tiaozhuan(res){ //点击地图覆盖物，获取id跳转
    console.log(res.currentTarget.dataset)
    console.log(res.detail.markerId)
  },
  dingwei(){ //调转到指定位置
    this.setData({
      poi: {
      latitude: 39.942845,
      longitude: 116.481793,
    }
    })
  },
  touser(){
    wx.navigateTo({
      url: '../blogin/login',
      // url:'https://www.juquduo.com'
    })
  },
  
})