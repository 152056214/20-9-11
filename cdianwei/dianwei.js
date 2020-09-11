// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
const lon = 116.479862
const lat = 39.945773
const tubiao = '../resourse/dianwei/红标.png';
const gamebg = '../resourse/yeshou/地图.jpg'
var list = [] ;
// var mks=[];
var tempmks = [] ;
var obj = {"msg":list}
var all  = new Array();
var app = getApp()

var mks = new Array()
// [
  // { // 获取返回结果，放到mks数组中,,,先把地图放到中心，，，主要是先把背景放好，和点位重合，，，
  //   id: '15',
  //   latitude: 39.933400,
  //   longitude: 116.479862,
  //   iconPath: gamebg,
  //   width:  app.globalData.winwidth,
  //   height: app.globalData.winwidth/750*1200,
  // }
// ];
mks.push({ // 获取返回结果，放到mks数组中
    id: 0,
    latitude: 39.937822,
    longitude: 116.483220,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中==================
    id: 1,
    latitude: 39.939099,
    longitude: 116.481225,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 2,
    latitude: 39.939217,
    longitude: 116.483952,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 3,
    latitude: 39.938217,
    longitude: 116.486900,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 4,
    latitude: 39.939479,
    longitude: 116.487602,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 5,
    latitude: 39.941513,
    longitude: 116.483797,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 6,
    latitude: 39.941258,
    longitude: 116.482613,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 7,
    latitude: 39.940379,
    longitude: 116.478686,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 8,
    latitude: 39.945904,
    longitude: 116.481416,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 9,
    latitude: 39.946134,
    longitude: 116.480051,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 10,
    latitude: 39.949922,
    longitude: 116.481908,
    iconPath: tubiao,
    width: 35,
    height: 40,
  },{ // 获取返回结果，放到mks数组中
    id: 11,
    latitude: 39.951180,
    longitude: 116.485336,
    iconPath: tubiao,
    width: 35,
    height: 40,
  });

// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: app.globalData.key // 必填
});  
 
//在Page({})中使用下列代码
Page({
  data:{
    mks:mks,
    jindutiao:'../resourse/dianwei/进度条1.png',
    dyxinxi:[],
    liebiao:[{activityType: "2",pointId: "4",pointName: "qqq"}],
    kedian:true,
    list:list,
    winheight:app.globalData.winheight,
    winwidth:app.globalData.winwidth,
    acid:2,
    poi: {
      latitude: lat,
      longitude: lon,
    }
  },
  onLoad:function(options){
    console.log('活动id:'+ options.id)
    // this.setData({acid:options.id})
    this.setData({acid:14})
    try {
      wx.removeStorageSync('pointcont')
    } catch (e) {
      // Do something when catch error
      console.log('本地存储没有清除')
    }
  },
  onReady(){
    all.pop()
  },
  onShow(){
    var liebiao = wx.getStorageSync('pointcont')
    try {
      wx.removeStorageSync('pointcont')
    } catch (e) {
      // Do something when catch error
      console.log('本地存储没有清除')
    }
    
    // JSON.parse(liebiao)
    all.push(liebiao)
    console.log('现在显示的列表:')
    console.log(all)
    var _this = this;
    _this.setData({liebiao:all})
    qqmapsdk.reverseGeocoder({
      location: '', //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
      //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
      success: function(res) {//成功后的回调
        // console.log(res);
        var res = res.result;
        
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        
        _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
        });
      },
    })
  },
  clickmap(e){
    var that = this
    var pid = e.detail.markerId
    console.log(mks[1])
    // mks = e.currentTarget.dataset.markers
    // 跳转参数
    var detail = mks[pid]
    console.log('被选中点的信息：')
    console.log(detail)
    wx.navigateTo({
      url: '../cdianweidetail/dianweidetail?id='+pid+'&acid='+that.data.acid+'&lat='+detail.latitude+'&long='+detail.longitude,
    })
    // 修改覆盖物的图片，重新加载覆盖物
    mks[pid].iconPath = '../resourse/dianwei/顺序框1.png'
    that.setData({markers:mks,botthei:100+40*list.length})

    // list用来调整页面参数，修改底部框的大小，显示按钮
    list.push(detail)

    that.setData({list:list})
    if(list.length>4){
      that.setData({kedian:false,jindutiao:'../resourse/dianwei/进度条2.png'})
    }else{
      that.setData({kedian:true,jindutiao:'../resourse/dianwei/进度条1.png'})
    }
  },
  tijiao(){
    // 跳转到分享页面
    wx.navigateTo({
      url: '../cshare/share',
    })
  },
  deletpoint(e){
    console.log('点击删除')
    console.log(e)
    // 获取序号，用来删除，然后加载页面，修改底部框的大小
    var xuhao = e.currentTarget.dataset.id
    // all.remove(xuhao)
    all.splice(xuhao , 1)
    this.setData({liebiao:all,botthei:100+40*list.length})
    //参数传到服务器，删除数据
    var actype = e.currentTarget.dataset.key.activityType
    var poid = e.currentTarget.dataset.key.pointId
    var actid = this.data.acid
    wx.request({
      url: 'https://www.juquduo.com/juquduo/activity/person/delete_point',
      data:{
        activityId:actid,
        activityType:actype,
        pointId:poid
      },
      success:function(res){
        console.log('删除成功')
        console.log(res)
      },
      fail(res){
        console.log(res)
      }
    })
  }
})