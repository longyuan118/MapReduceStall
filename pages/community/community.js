const DB = wx.cloud.database().collection("pyq")
var util = require('../../utils/util.js');
Page({
 data: {
   array: [],
  
 },
 adddetail:function(){
   wx.navigateTo({
     url: '/pages/share/share',
     fail:function(res){ },
     success:function(res){ },
     complete:function(res){ }
   })
 },
 onLoad() {
  wx.stopPullDownRefresh()
  this.getShare()
  
 },
getShare:function(){
  let that = this
  DB.get({
    success(res) {
   
      that.setData({
        array: res.data,
       
      })
      for (let i = 0; i < res.data.length; i++) {
         console.log(res.data[i].descption)
         console.log(res.data[i].imgURL)
      }
    }
  })
},

 onPullDownRefresh(){
  let that = this
  wx.showToast({
    title:'加载中....',
    icon:'loading'
});
  DB.get({
    success(res) {
      that.setData({
        array: res.data
      })
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].descption)
        console.log(res.data[i].imgURL)
      }
    }
  })
 },
 onShow:function(){
  this.getShare()
 },
 onReady: function () {
  // 调用函数时，传入new Date()参数，返回值是日期和时间
  var time = util.formatTime(new Date());
  // 再通过setData更改Page()里面的data，动态更新页面的数据
  this.setData({
    time: time
  });
}
})