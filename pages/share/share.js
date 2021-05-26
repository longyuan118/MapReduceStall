const DB = wx.cloud.database().collection("pyq")
Page({
  data: {
    details: '',
    imgURL: '',
    //导航数组
    catesList: [],
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value);
    var that = this;
    that.setData({
      details: e.detail.value
    });
  },
  uploader() {
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log('choose successfully', res)


        that.share(res.tempFilePaths[0]);


      },
      fail(res) {
        console.log('choose failed', res)
      }
    })
  },

  share(fileUrl) {
    console.log('调用share的方法')
    let that = this;

    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        console.log('upload successfully', res)

        this.setData({
          imgURL: res.fileID
        })
      },
      fail(res) {
        console.log('upload failed', res)
      }
    })



  },
  send() {
    DB.add({
      data: {
        descption: this.data.details,
        imgURL: this.data.imgURL
      },
      success(res) {
        console.log("share成功", res)

        wx.switchTab({

          url: "/pages/community/community"
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail(res) {
        console.log("share失败", res)
      }
    })
  }

})