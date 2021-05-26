
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
      id:0,
      value:"待付款",
      isActive:true
    },
    {
      id:1,
      value:"待发货",
      isActive:false
    },
    {
      id:2,
      value:"待收货",
      isActive:false
    },
    {
      id:3,
      value:"待评价",
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
  }
})
