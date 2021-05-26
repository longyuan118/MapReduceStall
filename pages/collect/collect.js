// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'https://s3.ax1x.com/2020/12/01/DfzCFK.png',
    goods: [],
    stalls: [],
    alls: [],
    tabs: [{
        id: 0,
        value: "宝贝",
        isActive: true
      },
      {
        id: 1,
        value: "摊位",
        isActive: false
      },
    ],
    Mission: []
  },
  collect1: function (res) {
    console.log(res)
    var that = this;
    if (that.data.editTrue == true) {
      wx.showToast({
        title: '取消收藏',
        icon: 'sucess', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      that.setData({
        editTrue: false,
        src: 'https://s3.ax1x.com/2020/12/01/DfzCFK.png'
      })
    } else {
      wx.showToast({
        title: '已收藏',
        icon: 'sucess', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      that.setData({
        editTrue: true,
        src: 'https://s3.ax1x.com/2020/12/02/D58ykR.png'
      })
    }
  },
  collect2:function(res){
    console.log(res)
    wx.navigateTo({
      url: '/pages/show_new_goods/show_new_goods',
    })
    wx.setStorageSync('new_goods', res.currentTarget.dataset.index1)
  },
  collect3:function(res){
    console.log(res)
    wx.navigateTo({
      url: '/pages/show_stall/show_stall',
    })
    wx.setStorageSync('key1', res.currentTarget.dataset.index1)
  },
  collect: function (res) {
    this.onLoad();
    console.log(res.currentTarget.dataset.index)
    //写入数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/delete.php',
      method: 'GET',
      data: {
        class1: 'collect',
        class2: res.currentTarget.dataset.index,
        class:'cid'
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '删除失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '删除成功！！！', //这里打印出登录成功
            icon: 'success',
            duration: 1000
          })
        }
      }
    });
  },
  
  share: function () {
    wx.showModal({
      title: '分享',
      content: '请选择分享到哪里？',
      cancelText: "微信好友", //默认是“取消”
      confirmText: "朋友圈", //默认是“确定”
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          console.log('好友')
        } else {
          //点击确定
          console.log('朋友圈')
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectList()

  },

  getCollectList() {
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'collect'
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          alls: res.data,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCollectList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //标题点击事件 从子组件传递过来
  handletabsItemChange(e) {
    console.log(e)
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
})