//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: 'https://s3.ax1x.com/2020/11/18/DmQrdg.png',
      },
      {
        typeId: 1,
        name: '待发货',
        url: 'bill',
        imageurl: 'https://s3.ax1x.com/2020/11/18/DmQ2zq.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: 'https://s3.ax1x.com/2020/11/18/DmQfyV.png'
      },
      {
        typeId: 3,
        name: '待评价',
        url: 'bill',
        imageurl: 'https://s3.ax1x.com/2020/11/18/DmQ5eU.png'
      }
    ],
  },
  collect:function(res){
    wx.navigateTo({
      url: '/pages/collect/collect',
    })
  },
  stall:function(res){
    wx.navigateTo({
      url: '/pages/appoint/appoint',
    })
  },
  //事件处理函数
  toOrder: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../oder/oder'
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
  shouhou:(res)=>{
    wx.navigateTo({
      url: '/pages/shouhou/shouhou',
    })
  },
  invite:(res)=>{
    wx.navigateTo({
      url: '/pages/invite/invite',
    })
  }
})
