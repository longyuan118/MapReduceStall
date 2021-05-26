// componments/SearchInput/SearchInput.js
var city=wx.getStorageSync('key3')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    citys:'宁波'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    search:(res)=>{
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },
    
    
    
   
  },
  
  
})
