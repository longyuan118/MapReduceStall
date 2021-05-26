// pages/stallholder/stallholder.js
var app = getApp();
Page({
  data: {
    tabs: [{
        id: 0,
        value: "宁波财经学院摊位",
        isActive: true
      },
      {
        id: 1,
        value: "U-PARK摊位",
        isActive: false
      },
      {
        id: 1,
        value: "芦港地铁站摊位",
        isActive: false
      },
      {
        id: 1,
        value: "三城路摊位",
        isActive: false
      },

    ],
    currentSelectTripType: 'pinche',
    //左列data
    left_srcoll_index: 0,
    middle_srcoll_index: 0,
    right_srcoll_index: 0,
    left_sroll_arr: ['百货', '服饰', '食品'], //左列data
    middle_sroll_arr: [
      '餐具', '保温杯', '衣架','垃圾桶', '垃圾袋', 
      '鞋架', '洗衣液', '牙刷', '牙膏',
    ],
    right_sroll_arr: [
      '披萨', '汉堡', '鸡肉卷', '牛排', '三明治',
    ],


  },
  // 更新data 切换选中状态
  selectedPinche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  selectedBaoche: function (e) {
    this.setData({
      currentSelectTripType: e.currentTarget.dataset.id
    })
  },
  handletabsItemChange(e) {
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
  changeLeft_sroll(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      left_srcoll_index: index,
    })
  },
  changeright_sroll(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      right_srcoll_index: index,
    })
  },
  changemiddle_sroll(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      middle_srcoll_index: index,
    })
  },
  scroll(e) {
    var that = this;
    var classfiySelect = "";
    var scrollTop = e.detail.scrollTop;
    console.log('scrollTop', scrollTop)
    var h = 0;
    var _h = that.length('01');
    that.data.right_scroll_content.forEach(function (clssfiy, i) {
      var _h = that.length(clssfiy['id']) * (94 + 12);
      if (scrollTop >= h) {
        classfiySelect = clssfiy['id'];
      }
      h += _h;
      console.log('h', h);
    })
    classfiySelect = parseInt(classfiySelect) - 1;
    that.setData({
      top_srcoll_index: classfiySelect,
    })
  },
  //求每一栏长度 
  length: function (e) {
    var that = this;
    var rightData = that.data.right_scroll_content;
    for (var i = 0; i < rightData.length; i++) {
      if (rightData[i]['id'] == e) {
        return rightData[i]['data'].length;
      }
    }
  }

})