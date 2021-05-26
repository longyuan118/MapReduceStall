const db = wx.cloud.database()
// pages/demo11cloud/demo11cloud.js
let name = ""
// 搜索框值
let searchKey = ""
//获取历史记录用到的id
let _openid = "oWOTz5CA-yXURcobxslV8YRArNWs"
let search_history_db = "search_history"
let search_list_db = "search_list"
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: "",
    search: "",
    // 搜索框状态
    inputShowed: false,
    search_list: [],
    history_list: []
  },

  /*
    点击搜索
      1 添加历史记录
  */
  search(e) {
    // console.log(searchKey);
    // console.log(this.data.history_list[0])

    if (searchKey != "") {
      this.addHistory();
      // this.add({
      //   history_lis:1
      // });
      // this.getHistory();
      let history_list = this.data.history_list;
      history_list.push({
        history: searchKey
      });
      this.setData({
        // history_list: {name:(res.data[index].history)}
        history_list: history_list

      })

   
    wx.setStorageSync('search', searchKey)

    wx.navigateTo({
      url: '../goods/goods',
      success: function(res){},
      fail: function() {},
      complete: function() {}
    })


    }
  },
  /*
    点击搜索推荐/历史列表
  */
  searchList(e) {
    // console.log(e.currentTarget.dataset.text);
    this.setData({
      inputValue: e.currentTarget.dataset.text
    });
    searchKey = this.data.inputValue
    // console.log(searchKey)
  },

  addHistory() {

    db.collection(search_history_db).add({
      data: {
        history: searchKey
      },
      success(res) {
        console.log("添加成功", res)
      },
      fail(res) {
        console.log("添加失败", res)

      }
    })
    console.log("添加成功", history)

  },

  getHistory() {
    // this.setData({
    //   history_list: ""
    // })

    db.collection(search_history_db).where({
      _openid: _openid
    }).get({

      success: res => {

        // console.log("getHistory:");
        // console.log(res.data[0].history);
        for (let index = 0; index < res.data.length; index++) {
          let history_list = this.data.history_list;
          history_list.push({
            history: (res.data[index].history)
          });
          this.setData({
            // history_list: {name:(res.data[index].history)}
            history_list: history_list

          })

        }


        // console.log("history_list:")
        // console.log(this.data.history_list)
      },
      fail: err => {
        console.log(err)
      }
    })

  },

  delHistory() {
    if (this.data.history_list != "") {
      const _ = db.command
      db.collection(search_history_db).where({
        _openid: _openid
      }).remove({

        success: res => {
          if (res)
            console.log("删除成功" + res);
          wx.showToast({
            title: '删除成功',
          })
        },
        fail: err => {

          console.log(err);
          wx.showToast({
            title: '删除失败',
          })

        }
      })


    } else {
      wx.showToast({
        title: '无记录可删',
      })
    }
    /*
      删除history_list中第一个数字
    */
    let history_list = this.data.history_list;
    history_list.splice(history, 1)
    this.setData({
      history_list: history_list
    })

  },


  inputBind(e) {

    searchKey = e.detail.value;
    this.setData({
      search_list: []
    })
    if (searchKey != "") {
      this.getData();

    }

  },
  /*
      按searchKey模糊查询获得search_list
  */
  getData() {
    const _ = db.command
    db.collection(search_list_db).where(_.or([{
      name: db.RegExp({
        regexp: '.*' + searchKey,
        options: 'i',
      })
    }])).get({
      success: res => {
        console.log(res);

        this.setData({
          search_list: (res.data)
        })


      },
      fail: err => {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory();

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