// pages/creatac/creatac.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bghei:app.globalData.winheight/6,
    bg2hei:app.globalData.winheight/1.1,
    tphei:app.globalData.winheight/5.86,
    chuantu:'../resourse/zhuce/上传.jpg',
    baseaa:'',
    picname:'',
    tip1:'',
    text4:'上传'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var url='htts%3A%2F%2Fjuquduo.com%2FgetOne'
    // var uurl = decodeURIComponent(url)
    // console.log(uurl)
    wx.setNavigationBarTitle({
      title: '活动商',
      
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
                that.setData({picname:res.data,text4:'已上传'})
                
                // wx.request({

                  // url: app.globalData.addimageUrl,
                  // data: {
                  //   openid: app.globalData.openid,
                  //   image: res.data
                  // },
                  // method: 'GET',
                  // success: function (res) {
                  //   // success
                  // }
                // })
              },
              fail:function(res){
                console.log(res)
              }
            });
          
        }
      });
    }
  },
  preview(){
    wx.previewImage({
      urls: ['https://img-blog.csdnimg.cn/20200402174722819.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI2MjMwNDIx,size_16,color_FFFFFF,t_70'],
    })
  },
  phone(e){
      console.log(this.data.tip1)
    
    var pattern = /0?(13|14|15|18)[0-9]{9}$/;
    var pho = e.detail.value;
    if(pattern.test(pho)){
      this.setData({tip1:'',zcco:'#2DC1EF'})
    }else{
      this.setData({tip1:'格式不对',zcco:'red'})
    }
  },
  email(e){
    var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;
    var pho = e.detail.value;
    if(pattern.test(pho)){
      this.setData({tip2:'',zcco:'#2DC1EF'})
    }else{
      this.setData({tip2:'格式不对',zcco:'red'})
    }
  },
  formSubmit: function (e) {
    var openid = app.globalData.openid
    if(openid==""){
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
    }
    var gsName= e.detail.value.gsName
    var gsAddr= e.detail.value.gsAddr
    var userName=  e.detail.value.userName
    var userPhone=  e.detail.value.userPhone
    var email= e.detail.value.email
    var certificate= this.data.picname
    var zcco= 'green'
    var tip1 = this.data.tip1
    var tip2 = this.data.tip2
    if(openid==""||gsName==""||gsAddr==""||userName==""||userPhone==""||email==""||certificate==""||zcco!="green"||tip1!=""||tip2!=""){
      wx.showModal({
        cancelColor: 'blue',
          content: '输入不能为空',
          success (res) {
          }
      })
    }
    else{
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    wx.request({
      url: 'https://www.juquduo.com/juquduo/login/company_register',
      // url:'https://www.xinshengxing.top/uploadsBase',
      data: {
        openid:app.globalData.openid,
        gsName: gsName,
        gsAddr:gsAddr,
        userName: userName,
        userPhone: userPhone,
        email:email,
        certificate:certificate,
        // baseCode:basess,
      },
      method: 'GET',
      success: function (res) {
        // success
        console.log(res)
        wx.navigateTo({
          url: '../shenhe/shenhe',
        })
      }
    })
  }
    console.log('jieshu')
  },
})