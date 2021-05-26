// pages/show/show.js
// var list=wx.getStorageSync('key1')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList:[],
    msg:'',
    class:'',
    goods:[],
    editText: '预约',
    color: '#ffb202',
    editTrue: false,
    src:'https://s3.ax1x.com/2020/12/01/DfzCFK.png'
  },

  subscribe: function() {
    var that = this;
    if (that.data.editTrue == true) {
      wx.showToast({
        title: '取消预约',
        icon: 'sucess', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      that.setData({
        editTrue: false,
        editText: '预约',
        color: '#ffb202'
      })
 
    } else {
      console.log(this.data.postList[0])
      wx.request({
        url: 'http://127.0.0.1//big_homework/post_appoint.php',
        method: 'GET',
        data: {
          aname: this.data.postList[0].name,
          aimg: this.data.postList[0].img,
          ascore:this.data.postList[0].score,
          astall: this.data.postList[0].s_stall,
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
        title: '已预约',
        icon: 'fail', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000
      })
      that.setData({
        editTrue: true,
        editText: '已预约',
        color: 'red'
      })
    }
    //预约事件操作
  },
  collect: function(res) {
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
      console.log(this.data.postList[0])
      wx.request({
        url: 'http://127.0.0.1//big_homework/post_collect.php',
        method: 'GET',
        data: {
          ckey: 1,
          cname: this.data.postList[0].name,
          cimg: this.data.postList[0].img,
          cprice: this.data.postList[0].sum,
          cstall: this.data.postList[0].s_stall,
          collect_goods_id: this.data.postList[0].lid
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
  show_goods:function(res){
    console.log(res.currentTarget.dataset.index)
    wx.navigateTo({
      url: "/pages/show_new_goods/show_new_goods",
    })
    wx.setStorageSync('new_goods', res.currentTarget.dataset.index)
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
    let list=wx.getStorageSync('key1')
    
    console.log(list)
    var that = this;
    //读取数据库
    wx.request({
      url: 'http://127.0.0.1//big_homework/activity3.php',
      method: 'GET',
      data: {
        class:list,
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)

        // for(let i = 0; i < res.data.length; i++){
        //   console.log(res.data)
        // }
          that.setData({
            postList: res.data,
          });
      }
    });

    wx.request({
      url: 'http://127.0.0.1//big_homework/activity2.php',
      method: 'GET',
      data: {
        class:list,
      },
      header: {
        'content-Type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        // for(let i = 0; i < res.data.length; i++){
        //   console.log(res.data)
        // }
          that.setData({
            goods: res.data,
          });
      }
    })
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