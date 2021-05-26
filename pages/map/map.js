Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    markers: [], //地图参数
    latitude: "", //纬度
    longitude: "", //经度
    

   
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
          markers: [
            {
              id: 0,
              latitude: mapLatitude,
              longitude: mapLongitude,
              iconPath: "../../icons/stall-o.png",
              width: 40,
              height: 40,
              callout: {
                'display': 'ALWAYS',
                'fontSize': '30rpx',
                'content': '宁波财经学院摊位',
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
                'content': 'U-PARK摊位',
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
                'content': '芦港地铁站摊位',
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
                'content': '三城路摊位',
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
                'content': '学院路摊位',
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
                'content': '联升佳苑摊位',
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
                'content': '青年才郡摊位',
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
    console.log(res)
    let stallinfo=res.detail
    console.log(stallinfo.markerId)

    if(stallinfo.markerId==0){
      wx.openLocation({
        latitude: 29.886988,
        longitude: 121.481766,
        scale: 15,
        name: '宁波财经学院摊位',
        address: '浙江省宁波市海曙区学院路899号',
      })
    }
    if(stallinfo.markerId==1){
      wx.openLocation({
        latitude: 29.885,
        longitude: 121.485,
        scale: 15,
        name: 'U-PARK摊位',
        address: '浙江省宁波市海曙区学院路788号',
      })
    }
    if(stallinfo.markerId==2){
      wx.openLocation({
        latitude: 29.89026221535919,
        longitude: 121.48725628852844,
        scale: 15,
        name: '芦港地铁站摊位',
        address: '浙江省宁波市海曙区中山西路地铁一号线',
      })
    }
    if(stallinfo.markerId==3){
      wx.openLocation({
        latitude: 29.887834441592748,
        longitude: 121.4756691455841,
        scale: 15,
        name: '三城路摊位',
        address: '浙江省宁波市海曙区高桥镇秀丰村三成路',
      })
    }
    if(stallinfo.markerId==4){
      wx.openLocation({
        latitude: 29.87815996662794,
        longitude: 121.4828896522522,
        scale: 15,
        name: '学院路摊位',
        address: '浙江省宁波市海曙区学院路',
      })
    }
    if(stallinfo.markerId==5){
      wx.openLocation({
        latitude: 29.877713429737785,
        longitude: 121.47887706756592,
        scale: 15,
        name: '联升佳苑摊位',
        address: '浙江省宁波市海曙区高桥镇望童路',
      })
    }
    if(stallinfo.markerId==6){
      wx.openLocation({
        latitude: 29.881620559733825,
        longitude: 121.47907018661499,
        scale: 15,
        name: '青年才郡摊位',
        address: '浙江省宁波市海曙区秀联路172号',
      })
    }



    // wx.navigateTo({
    // url: '/pages/share/share',

  },

  onLoad: function (options) {
    this.getMyMap();
  },
  
// 选择位置
selectedClick: function() {
  // 设置权限
  wx.openSetting({
    success: function (res) {
      console.log(res);

      // 选择位置
      wx.chooseLocation({
        success: function (res) {
          console.log(res);

          // 打开位置
          wx.openLocation({
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name,
            address: res.address,
          })
        },
      })
    }      
  })    
},
  

  



  


 
  
    
 
  


})