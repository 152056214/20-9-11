// pages/newar/newar.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    diffpic:'../resourse/dianwei/怪难度.png',
    mondiff:'',
    pointId:'',acid:'',lat:'',long:'',
    pointtype:'',
    typeaa:true,
    addc:0.5,addd:0.5,
    modalHidden: true,
    picnameA:'../resourse/zhuce/上传.jpg',
    picnameB:'../resourse/zhuce/上传.jpg',
    picnameC:'../resourse/zhuce/上传.jpg',
    picnameD:'../resourse/zhuce/上传.jpg',
    picnameAA:'',picnameBB:'',picnameCC:'',picnameDD:'',
  },
  //关卡、线索的选择
  typecha(e){
    console.log(e)
    if(e.detail.value==1){
      this.setData({typeaa:true,pointtype:1})
    }
    if(e.detail.value==2){
      this.setData({typeaa:false,pointtype:2})
    }
    console.log(this.data.typeaa)
  },
  //问题、怪物的选择
  statuscha(e){
    console.log(e)
    if(e.detail.value==1){
      this.setData({statusaa:true,pointtype:1})
    }
    if(e.detail.value==2){
      this.setData({statusaa:false,pointtype:2})
    }
    console.log(this.data.typeaa)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // console.log(options.acid)
    // console.log(options.lat)
    // console.log(options.long)
    this.setData({pointId:options.id,acid:options.acid,lat:options.lat,long:options.long})
    wx.setNavigationBarColor({
      backgroundColor: '#ffffff',
      frontColor: '#000000',
    })
    wx.setNavigationBarTitle({
      title: '创建AR活动',
    })
  },

  //日期选择
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //表单提交。分3种情况
  formSubmit: function (e) { 
    var choice = new Array
    // choice.push
    console.log('2个id'+this.data.pointId,this.data.acid)
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // var xinxi = e.detail.value
    // wx.setStorageSync('xinxi',xinxi)
    var openid = app.globalData.openid
    // console.log(typeof(openid))================验证openid为空
      wx.checkSession({
        success: (res) => {console.log("登录态正常")},
        fail:(res)=>{console.log("登录态失效")}
      })
    var pointName= e.detail.value.pointname
    var pointType= e.detail.value.type
    var questype = e.detail.value.status
    var desc= e.detail.value.story
    var descA = e.detail.value.descA
    var descB = e.detail.value.descB
    var descC = e.detail.value.descC
    var descD = e.detail.value.descD

    var imageA = this.data.picnameAA
    var imageB = this.data.picnameBB
    var imageC = this.data.picnameCC
    var imageD = this.data.picnameDD
    var radios = {"A":[descA,imageA],"B":[descB,imageB],"C":[descC,imageC],"D":[descD,imageD]}

      // 选的是线索
  if(this.data.typeaa==false){
    if(pointName==""||pointType==""||desc==""){
      wx.showModal({
        cancelColor: 'blue',
          content: '输入不能为空',
          success (res) {
          }
      })
    }//线索不为空
    else{
      console.log('输入为空判断成功, ')
      // =================
      // wx.setStorageSync('pointcont', e.detail.value)
      //   wx.navigateBack({
      //     delta: 1,
      //   })
        //====================
        wx.request({
          url: 'https://www.juquduo.com/juquduo/activity/person/create_point',
          // url:'https://www.xinshengxing.top/uploadsBase',
          data: {
            openid:openid,//唯一标识
            activityId:this.data.acid,//活动id
            pointId:this.data.pointId,//点的id
            pointName: pointName,
            activityType:e.detail.value.type,
            description: desc,
            lat:this.data.lat,
            lng:this.data.long,
          },
          method: 'GET',
          success: function (res) {
            // success
            // var canshu = res.data
            console.log(res)
            wx.setStorageSync('pointcont', res.data)
            wx.navigateBack({
              delta: 1,
            })
            // wx.redirectTo({
            //   url: '../cdianwei/dianwei',
            // })
          }
        })
        console.log('jieshu')
      }
    }
    // 选的是关卡、问题
    else if(this.data.typeaa==true&&this.data.statusaa==true){
      if(pointName==""||pointType==""||desc==""){
        wx.showModal({
          cancelColor: 'blue',
            content: '输入不能为空',
            success (res) {
            }
        })
      }//关卡、问题不为空
      else{
        console.log('输入为空判断成功, ')
          wx.request({
            url: 'https://www.juquduo.com/juquduo/activity/person/create_point',
            // url:'https://www.xinshengxing.top/uploadsBase',
            data: {
              openid:app.globalData.openid,//唯一标识
              activityId:this.data.acid,//活动id
              pointId:this.data.pointId,//点的id
              pointName: pointName,
              lat:this.data.lat,
              lng:this.data.long,

              activityType:pointType,
              // descriptionA: descA,
              // descriptionB: descB,
              // descriptionC: descC,
              // descriptionD: descD,
              radios : radios,
              // imageA:this.data.picnameAA,
              // imageB:this.data.picnameBB,
              // imageC:this.data.picnameCC,
              // imageD:this.data.picnameDD,

              pointType: e.detail.value.status,
              answer:e.detail.value.answer,
              questionDescription:e.detail.value.quesdesc,
              rightClue:e.detail.value.cluedesc, 
              falseClue:e.detail.value.falseClue 
            },
            method: 'GET',
            success: function (res) {
              // success
              // var canshu = res.data
              console.log(res)
              wx.setStorageSync('pointcont', res.data)
              wx.navigateBack({
                delta: 1,
              })
            }
          })
          console.log('jieshu')
        }
    }//选的是关卡、怪物
    else if(this.data.typeaa==true&&this.data.statusaa==false){
      
      if(pointName==""||pointType==""||desc==""){
        wx.showModal({
          cancelColor: 'blue',
            content: '输入不能为空',
            success (res) {
            }
        })
      }//关卡、怪物不为空
      else{
        console.log('输入为空判断成功, ')
          wx.request({
            url: 'https://www.juquduo.com/juquduo/activity/person/create_point',
            // url:'https://www.xinshengxing.top/uploadsBase',
            data: {
              activityId:this.data.acid,//活动id
              pointId:this.data.pointId,//点的id
              pointName: pointName,
              activityType:pointType,//关卡或线索
              pointType: e.detail.value.status,//问题或怪物
              monName:e.detail.value.monsname,
              monDiff:this.data.mondiff,
              description:e.detail.value.monsdesc,
              rightClue:e.detail.value.rightClue,
              lat:this.data.lat,
              lng:this.data.long,
            },
            method: 'GET',
            success: function (res) {
              // success
              // var canshu = res.data
              console.log(res)
              wx.setStorageSync('pointcont', res.data)
              wx.navigateBack({
                delta: 1,
              })
            }
          })
          console.log('jieshu')
        }
    }
  },
  //怪物难度选择
  diffchag(e){
    // console.log(e)
    if(e.detail.value==1){
      this.setData({diffpic:'../resourse/dianwei/mondiff1.png',mondiff:1})
    }
    if(e.detail.value==2){
      this.setData({diffpic:'../resourse/dianwei/mondiff2.png',mondiff:2})
    }
    if(e.detail.value==3){
      this.setData({diffpic:'../resourse/dianwei/mondiff3.png',mondiff:3})
    }
    // console.log(this.data.mondiff)
  },
  //弹窗  
  buttonTap: function() {
    this.setData({
      modalHidden: false
    })
  },
  modalConfirm: function() {
    this.setData({
      modalHidden: true
    })
  },
  modalCandel: function() {
    this.setData({
      modalHidden: true
    })
  },
  tupian(){
    {
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({chuantu:tempFilePaths})
          console.log(res)
  
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
              // url:'http://123.57.150.40:8080/shangchuan',
              // url:'http://www.xinsheng/shangchuan',
              // url:'http://localhost:5500/webgl示例',
              filePath: tempFilePaths[0],
              name: 'uploadsFile',
              formData: {
                // 'imgIndex': i,
              },
              header: {
                "Content-Type": "multipart / form-data"
              },
              success: function (res) {
                console.log(JSON.stringify(res.data))
                console.log(res.data)
                that.setData({D:res.data,text4:'已上传'})
                
              },
              fail:function(res){
                console.log(res)
              }
            });
        }
      });
    }
  },
  // A答案选图片
  tupianA(){
    {
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({picnameA:tempFilePaths})
          console.log(res)
  
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
              // url:'http://123.57.150.40:8080/shangchuan',
              // url:'http://www.xinsheng/shangchuan',
              // url:'http://localhost:5500/webgl示例',
              filePath: tempFilePaths[0],
              name: 'uploadsFile',
              formData: {
                // 'imgIndex': i,
              },
              header: {
                "Content-Type": "multipart / form-data"
              },
              success: function (res) {
                // console.log(JSON.stringify(res.data))
                console.log(res.data)
                that.setData({picnameAA:res.data})
                
              },
              fail:function(res){
                console.log(res)
              }
            });
          
        }
      });
    }
  },
  tupianB(){
    {
      //添加Banner  B
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({picnameB:tempFilePaths})
          console.log(res)
  
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
              // url:'http://123.57.150.40:8080/shangchuan',
              // url:'http://www.xinsheng/shangchuan',
              // url:'http://localhost:5500/webgl示例',
              filePath: tempFilePaths[0],
              name: 'uploadsFile',
              formData: {
                // 'imgIndex': i,
              },
              header: {
                "Content-Type": "multipart / form-data"
              },
              success: function (res) {
                console.log(JSON.stringify(res.data))
                console.log(res.data)
                that.setData({picnameBB:res.data})
                
              },
              fail:function(res){
                console.log(res)
              }
            });
          
        }
      });
    }
  },
  tupianC(){
    {
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({picnameC:tempFilePaths})
          console.log(res)
  
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
              // url:'http://123.57.150.40:8080/shangchuan',
              // url:'http://www.xinsheng/shangchuan',
              // url:'http://localhost:5500/webgl示例',
              filePath: tempFilePaths[0],
              name: 'uploadsFile',
              formData: {
                // 'imgIndex': i,
              },
              header: {
                "Content-Type": "multipart / form-data"
              },
              success: function (res) {
                console.log(JSON.stringify(res.data))
                console.log(res.data)
                that.setData({picnameCC:res.data})
              },
              fail:function(res){
                console.log(res)
              }
            });
        }
      });
    }
  },
  tupianD(){
    {
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({picnameD:tempFilePaths})
          console.log(res)
  
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
              // url:'http://123.57.150.40:8080/shangchuan',
              // url:'http://www.xinsheng/shangchuan',
              // url:'http://localhost:5500/webgl示例',
              filePath: tempFilePaths[0],
              name: 'uploadsFile',
              formData: {
                // 'imgIndex': i,
              },
              header: {
                "Content-Type": "multipart / form-data"
              },
              success: function (res) {
                console.log(JSON.stringify(res.data))
                console.log(res.data)
                that.setData({picnameDD:res.data})
                
              },
              fail:function(res){
                console.log(res)
              }
            });
          
        }
      });
    }
  },
})