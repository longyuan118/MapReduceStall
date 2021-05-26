// pages/show_new_goods/show_new_goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [],
    item:'111',
    src:'https://s3.ax1x.com/2020/12/01/DfzCFK.png'
  },

  collect: function(res) {
    console.log(this.data.goods_list[0])
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
      //写入数据库
      wx.request({
        url: 'http://127.0.0.1//big_homework/post_collect.php',
        method: 'GET',
        data: {
          ckey: 0,
          cname: this.data.goods_list[0].gname,
          cimg: this.data.goods_list[0].gimg,
          cprice: this.data.goods_list[0].oprice,
          collect_goods_id: this.data.goods_list[0].gid,
        },
        header: {
          'content-Type': 'application/x-www-form-urlencoded'
        },
        success(res) {
          console.log(res.data);
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 1500
            })
          } else {
            wx.showToast({
              title: '提交成功！！！', //这里打印出登录成功
              icon: 'success',
              duration: 1000
            })
          }
        }
      });
      wx.showToast({
        title: '已收藏',
        icon: 'sucess', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      that.setData({
        editTrue: true,
        src:'https://s3.ax1x.com/2020/12/02/D58ykR.png'
      })
    }
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
  tuijian:(res)=>{
    wx.showToast({
      title: '已推荐',
      icon: 'none', //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    })
  },
  get: (res) => {
    var that=this;
    wx.showActionSheet({
      itemList: ['满50减10', '满100减50', '满300减100'],//显示的列表项
      success: function (res) {//res.tapIndex点击的列表项
        // console.log("点击了列表项：" + this[res.tapIndex]);
        wx.showToast({
          title: '领取成功',
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },

  shop: function(res) {
    // console.log(this.data.goods_list[0].gname)
    wx.showToast({
      title: '添加成功',
      icon: 'none', //如果要纯文本，不要icon，将值设为'none'
      duration: 2000
    })

  //写入数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/post.php',
      method: 'GET',
      data: {
        gname: this.data.goods_list[0].gname,
        gimg: this.data.goods_list[0].gimg,
        oprice: this.data.goods_list[0].oprice,
      },
      header: {
        'content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res.data);
        if (res.data.status == 0) {
          wx.showToast({
            title: '提交失败！！！',
            icon: 'loading',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '提交成功！！！', //这里打印出登录成功
            icon: 'success',
            duration: 1000
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let list1 = wx.getStorageSync('new_goods')
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity5_newgoods.php',
      method: 'GET',
      data: {
        class: list1,
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        // for (let i = 0; i < res.data.length; i++) {
        //   console.log(res.data)
        // }
        // console.log(res.data[0].gname)
        that.setData({
          goods_list: res.data,
        });
      }
    });

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