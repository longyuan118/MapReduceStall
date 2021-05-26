const app = getApp()
Page({
  data: {
    goods_list: [],
    count:''
  },
  onLoad: function (options) {

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    var that = this;
    // that.setData({
    //   total_all_price: 0,
    //   checked: false
    // })
    var user_data = wx.getStorageSync('user_data');
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'shopping',
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          total_all_price: 0,
          checked: false,
          goods_list: res.data,
        });
      }
    });


  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  addButtonClick:function(res){
    let data=this.data.goods_list
    this.setData({
      count:data[res.currentTarget.id].count
    });
    console.log(data[res.currentTarget.id].count)
    // console.log(res.currentTarget.id) 
  }
})