// pages/show_goods/show_goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList();
  },
  //传参
  new_goods:(res)=>{
    console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/show_new_goods/show_new_goods',
    })
    wx.setStorageSync('new_goods', res.currentTarget.dataset.index)
  },
  getGoodsList(){
    var that = this;
    let list2 = wx.getStorageSync('show_goods')
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/searchResult.php',
      method: 'GET',
      data: {
        class: list2
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          goods_list: res.data,
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

  }
})