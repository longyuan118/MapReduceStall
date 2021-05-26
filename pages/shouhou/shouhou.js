var app = getApp()
Page({
  data: {
    navbar: ['售后申请', '处理中', '售后评价','申请记录'],
    currentTab: 0
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})