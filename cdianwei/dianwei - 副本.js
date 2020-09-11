// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
const lon = 116.481793;
const lat = 39.942845;
const tubiao = '../resourse/dianwei/红标.png';
const gamebg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598260045186&di=f4ec39e697014b2107b37dbe1195f74f&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg';  
var list = [] ;
var mks=[];
var tempmks = [] ;
var obj = {"msg":list}
var all  = new Array();

var app = getApp()
// 实例化API核心类
var qqmapsdk = new QQMapWX({
    key: app.globalData.key // 必填
});  
 
//在Page({})中使用下列代码
Page({
  data:{
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
    this.setData({acid:options.id})
    // this.setData({acid:14})
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
        var mks = [];
        
        //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
        mks.push({ // 获取返回结果，放到mks数组中
        //   id: 15,
        //   latitude: lat-0.00990,
        //   longitude: lon,
        //   iconPath: gamebg,
        //   width:  _this.data.winwidth*1.1,
        //   height: _this.data.winheight*1.1,
        // },{ // 获取返回结果，放到mks数组中
          id: 0,
          latitude: 39.937822,
          longitude: 116.483220,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中==================
          id: 1,
          latitude: 39.939099,
          longitude: 116.481225,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 2,
          latitude: 39.939217,
          longitude: 116.483952,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 3,
          latitude: 39.938217,
          longitude: 116.486900,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 4,
          latitude: 39.939479,
          longitude: 116.487602,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 5,
          latitude: 39.941513,
          longitude: 116.483797,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 6,
          latitude: 39.941258,
          longitude: 116.482613,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 7,
          latitude: 39.940379,
          longitude: 116.478686,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 8,
          latitude: 39.945904,
          longitude: 116.481416,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 9,
          latitude: 39.946134,
          longitude: 116.480051,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 10,
          latitude: 39.949922,
          longitude: 116.481908,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        },{ // 获取返回结果，放到mks数组中
          id: 11,
          latitude: 39.951180,
          longitude: 116.485336,
          iconPath: tubiao,
          activityId:_this.data.acid,
          width: 35,
          height: 40,
        });
        _this.setData({ //设置markers属性和地图位置poi，将结果在地图展示
          markers: mks,
          // poi: {
          //   latitude: res.location.lat,
          //   longitude: res.location.lng
          // }
        });
      },
    })
  },
  clickmap(e){
    var that = this
    // 拼一个list，提交点的id的经纬度
    // var id = e.detail.markerId
    e.currentTarget.dataset.markers[e.detail.markerId].iconPath = '../resourse/dianwei/顺序框1.png'
    mks = e.currentTarget.dataset.markers
    var detail = e.currentTarget.dataset.markers[e.detail.markerId]
    // wx.setStorageSync('key', data)
    list.push(detail)
    that.setData({markers:mks})
    console.log('被选中点的信息：')
    console.log(detail)

    that.setData({list:list})

    // var array = [];
    // var dyxinxi = wx.getStorageSync('xinxi')
    // array.push(dyxinxi)
    // 可以考虑把所有点位的信息都放到array
    // console.log(this.data.acid)
    // console.log(array)
    // this.setData({activityname:dyxinxi.activityname})
    // if(dyxinxi.type==2){
    //   that.setData({gametype:'线索'})
    // }
    // if(dyxinxi.type==1){
    //   that.setData({gametype:'关卡'})
    // }


    wx.navigateTo({
      url: '../cdianweidetail/dianweidetail?id='+e.detail.markerId+'&acid='+that.data.acid+'&lat='+detail.latitude+'&long='+detail.longitude,
    })
    if(list.length>4){
      that.setData({kedian:false,botthei:240,jindutiao:'../resourse/dianwei/进度条2.png'})
    }

  },
  tijiao(){
    var that = this
    if(list.length>4){
      wx.request({
        url: 'https://www.juquduo.com/juquduo/activity/create_activity?acitivityId='+that.data.acid,
        data: {
          // activityId:that.data.acid,
          list:obj
        },
        success(res){
          // console.log(res)
          wx.navigateTo({
            url: 'pages/cshare/share',
          })
        }
      })
    }
  }
})