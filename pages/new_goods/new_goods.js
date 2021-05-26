// pages/new_goods/new_goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list:[],
     //附近js
     postList: [],
    tabs:[
      {
      id:0,
      value:"新品",
      isActive:true
    },
    {
      id:1,
      value:"新摊",
      isActive:false
    },
  ],

  },
  //标题点击事件 从子组件传递过来
  handletabsItemChange(e){
    console.log(e)
    //1 获取被点击标题索引
    const {index}=e.detail;
    //2 修改原数组
    let {tabs}=this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    //3 赋值到data中
    this.setData({
      tabs
    })
  },

  //传参
  new_goods:(res)=>{
    console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: '/pages/show_new_goods/show_new_goods',
    })
    wx.setStorageSync('new_goods', res.currentTarget.dataset.index)
  },

  //附近js
  club: (res) => {
    console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: "/pages/show_stall/show_stall",
    })

    wx.setStorageSync('key1', res.currentTarget.dataset.index)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.getGoodsList();
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

        for (let i = 0; i < res.data.length; i++) {
          
        }
        that.setData({
          postList: res.data,
        });
      }
    });
  },

  getGoodsList(){
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity.php',
      method: 'GET',
      data: {
        class: 'new_goods'
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