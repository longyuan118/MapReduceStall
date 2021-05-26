import {
  request
} 
from "../../request/request.js"

const util = require("../../utils/util")
//获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
export const custom = wx.getMenuButtonBoundingClientRect();
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    citys: '宁波',
    tabs: [{
        id: 0,
        value: "推荐",
        isActive: true
      },
      {
        id: 1,
        value: "附近",
        isActive: false
      },
      {
        id: 2,
        value: "地图",
        isActive: false
      },
    ],
    catesList: [], //导航数组
    markers: [], //地图参数
    floorList: [], //楼层数据
    latitude: "", //纬度
    longitude: "", //经度
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menulist: [{
        id: 1,
        "url": "https://s3.ax1x.com/2020/11/16/DAjIkq.png",
        "title": "展开",
      },
      {
        id: 2,
        "url": "https://s3.ax1x.com/2020/11/16/DEPuZD.png",
        "title": "定位",
      },
    ],
    mainmodel: {
      "url": "https://s3.ax1x.com/2020/11/16/DEPesK.png",
    },
    //附近js
    postList: [],
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.detail.markerId)
  },
  controltap(e) {
    console.log(e.detail.controlId)
  },

  //获得地图
  getMyMap(e) {
    let that = this;
    const mapLatitude = 29.886988,
      mapLongitude = 121.481766;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        // 当前自己的经纬度 res.latitude，res.longitude
        that.setData({
          latitude: mapLatitude,
          longitude: mapLongitude,
          markers: [{
              id: 0,
              latitude: mapLatitude,
              longitude: mapLongitude,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '宁波财经学院摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 1,
              latitude: 29.885,
              longitude: 121.485,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': 'U-PARK摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 2,
              latitude: 29.89026221535919,
              longitude: 121.48725628852844,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '芦港地铁站摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 3,
              latitude: 29.887834441592748,
              longitude: 121.4756691455841,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '三城路摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 4,
              latitude: 29.87815996662794,
              longitude: 121.4828896522522,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '学院路摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 5,
              latitude: 29.877713429737785,
              longitude: 121.47887706756592,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '联升佳苑摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
            {
              id: 6,
              latitude: 29.881620559733825,
              longitude: 121.47907018661499,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '青年才郡摊点',
                'padding': '8rpx',
                'boxShadow': '0 0 5rpx #333',
                'borderRadius': '4rpx'
              },
            },
          ],
        })
      }
    })
  },


  stall: (res) => {
    let stallinfo = res.detail
    // console.log(stallinfo.markerId)

    if (stallinfo.markerId == 0) {
      wx.openLocation({
        latitude: 29.886988,
        longitude: 121.481766,
        scale: 15,
        name: '宁波财经学院摊点',
        address: '浙江省宁波市海曙区学院路899号',
      })
    } else if (stallinfo.markerId == 1) {
      wx.openLocation({
        latitude: 29.885,
        longitude: 121.485,
        scale: 15,
        name: 'U-PARK摊点',
        address: '浙江省宁波市海曙区学院路788号',
      })
    } else if (stallinfo.markerId == 2) {
      wx.openLocation({
        latitude: 29.89026221535919,
        longitude: 121.48725628852844,
        scale: 15,
        name: '芦港地铁站摊点',
        address: '浙江省宁波市海曙区中山西路地铁一号线',
      })
    } else if (stallinfo.markerId == 3) {
      wx.openLocation({
        latitude: 29.887834441592748,
        longitude: 121.4756691455841,
        scale: 15,
        name: '三城路摊点',
        address: '浙江省宁波市海曙区高桥镇秀丰村三成路',
      })
    } else if (stallinfo.markerId == 4) {
      wx.openLocation({
        latitude: 29.87815996662794,
        longitude: 121.4828896522522,
        scale: 15,
        name: '学院路摊点',
        address: '浙江省宁波市海曙区学院路',
      })
    } else if (stallinfo.markerId == 5) {
      wx.openLocation({
        latitude: 29.877713429737785,
        longitude: 121.47887706756592,
        scale: 15,
        name: '联升佳苑摊点',
        address: '浙江省宁波市海曙区高桥镇望童路',
      })
    } else if (stallinfo.markerId == 6) {
      wx.openLocation({
        latitude: 29.881620559733825,
        longitude: 121.47907018661499,
        scale: 15,
        name: '青年才郡摊点',
        address: '浙江省宁波市海曙区秀联路172号',
      })
    }
  },

  onLoad: function (options) {
    var that = this;
    that.getMyMap();
    that.getCateList();
    that.getFloorList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (that.data.canIUse) {
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
    };
    that.setData({
      custom: custom
    })

    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'fujin_stall'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        // console.log(res.data)

        for (let i = 0; i < res.data.length; i++) {
          // console.log(res.data[i].s_stall)
          // if(res.data[i].s_stall<10){
          //   that.setData({
          //     type: 'warn'
          //   });
          // }
        }
        that.setData({
          postList: res.data,
        });
      }
    });
  },


  onLaunch: function () {
    try {
      const res = wx.getSystemInfoSync()
      this.globalData.windowHeight = res.windowHeight
      this.globalData.windowWidth = res.windowWidth
    } catch (e) {}
  },

  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
  },

  // onReady: function () {
  //   this.mapCtx = wx.createMapContext('map')
  // },
  // currection:function(){
  //   this.mapCtx.moveToLocation()
  // },

  onShow: function () {

  },

  onPullDownRefresh() {
    let that = this
    wx.showToast({
      title: '加载中....',
      icon: 'loading'
    });
    this.setData({
      citys: wx.getStorageSync('key3')
    })
  },

  //标题点击事件 从子组件传递过来
  handletabsItemChange(e) {
    //1 获取被点击标题索引
    const {
      index
    } = e.detail;
    //2 修改原数组
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },



  getUserInfo: function (e) {
    // console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },

  menuItemClick: function (res) {
    // console.log(res);
    //获取点击事件的信息
    let clickInfo = res.detail.iteminfo
    // console.log(clickInfo);
    // 根据不同类型进行判别处理
    //事件的处理 代码

    if (clickInfo.id == 1) {
      wx.navigateTo({
        url: '/pages/map/map',
        fail: function (res) {},
        success: function (res) {},
        complete: function (res) {}
      })
    } else if (clickInfo.id == 2) {
      this.mapCtx.moveToLocation()
    }
  },

  search_citys: (res) => {
    wx.navigateTo({
      url: '/pages/citys/citys',
    })
  },

  getCateList() {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'catelist_title'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          catesList: res.data,
        });
      },
    });
  },

  //二级导航栏跳转
  catesList_navigater: (res) => {
    // console.log(res)
    if (res.currentTarget.dataset.index == 1) {
      wx.navigateTo({
        url: '/pages/category/category',
      })
    } else if (res.currentTarget.dataset.index == 2) {
      wx.navigateTo({
        url: '/pages/new_goods/new_goods',
      })
    }
    else if (res.currentTarget.dataset.index == 3) {
      wx.navigateTo({
        url: '/pages/owner/owner',
      })
    }
    else if (res.currentTarget.dataset.index == 4) {
      wx.switchTab({
        url: '/pages/shopping/shopping',
      })
    }
  },

  //获取楼层数据
  getFloorList() {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'floor'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          floorList: res.data,
        });
      },
    });
  },

  fimg:function(res){
    console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: "/pages/show_goods/show_goods",
    })
    wx.setStorageSync('show_goods', res.currentTarget.dataset.index)
  },


  //附近js
  club: (res) => {
    // console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: "/pages/show_stall/show_stall",
    })
    wx.setStorageSync('key1', res.currentTarget.dataset.index)
  },


})