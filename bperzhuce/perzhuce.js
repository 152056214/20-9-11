// pages/creatac/creatac.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bghei:app.globalData.winheight/6,
    tphei:app.globalData.winwidth*0.86/4*1.3,
    tpwid:app.globalData.winwidth*0.86/4,
    chuantu:'../resourse/zhuce/上传.jpg',
    suolve1:'../resourse/zhuce/上传.jpg',
    suolve2:'../resourse/zhuce/上传.jpg',
    baseaa:'',
    picname:'',
    sfzpic1:'',
    sfzpic2:'',
    tip1:'',
    text4:'上传',
    text5:'上传',
    text6:'上传',
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
              },
              fail:function(res){
                console.log(res)
              }
            });
        }
      });
    }
  },
  sfz1(){
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({suolve1:tempFilePaths})
          console.log(res)
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
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
                that.setData({sfzpic1:res.data,text5:'已上传'})
              },
              fail:function(res){
                console.log(res)
              }
            });
        }
      });
  },
  sfz2(){
      //添加Banner  
      var that = this;
      wx.chooseImage({
        count: 3,  //最多可以选择的图片总数  
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          var tempFilePaths = res.tempFilePaths;
          that.setData({suolve2:tempFilePaths})
          console.log(res)
            wx.uploadFile({
              url: 'https://www.juquduo.com/uploadsFile',
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
                that.setData({sfzpic2:res.data,text6:'已上传'})
              },
              fail:function(res){
                console.log(res)
              }
            });
        }
      });
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
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var openid = app.globalData.openid
    console.log(openid)
      wx.checkSession({
        success: (res) => {console.log("正常")},
        fail:(res)=>{console.log("登录态失效")}
      })
    var personName= e.detail.value.wjName
    var personSex= e.detail.value.sex
    var personAddr= e.detail.value.wjaddr
    var personPhone= e.detail.value.userPhone
    var personEmail=  e.detail.value.email
    var personEvent=  this.data.picname
    var cardPositive= this.data.sfzpic1
    var cardNegative= this.data.sfzpic2
    var zcco= 'green'
    var tip1 = this.data.tip1
    var tip2 = this.data.tip2
    if(personName==""||personSex==""||personAddr==""||personPhone==""||personEmail==""||personEvent==""||cardPositive==""||cardNegative==""||tip1!=""||tip2!=""||zcco!="green"){
      wx.showModal({
        cancelColor: 'blue',
          content: '输入不能为空',
          success (res) {
          }
      })
    }
    else{
    wx.request({
      url: 'https://www.juquduo.com/juquduo/login/person_register',
      // url:'https://www.xinshengxing.top/uploadsBase',
      data: {
        openid:app.globalData.openid,
        personName: personName,
        personSex:personSex,
        personAddr: personAddr,
        personPhone: personPhone,
        personEmail: personEmail,
        personEvent:personEvent,
        cardPositive:cardPositive,
        cardNegative:cardNegative,
      },
      method: 'GET',
      success: function (res) {
        // success
        console.log(res)
        wx.navigateTo({
          url: '../bshenhe/bshenhe',
        })
      }
    })
  }
    console.log('jieshu')
  },
})