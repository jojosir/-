// pages/changeRepresentInfo/changeRepresentInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name:'没有社团名',
      time:'2015/12/12',
      changeID:15210000,
      changeName:'小明',
      originID:15210001,
      originName:'小红'

  },
  approve:function(e){
    wx.showToast({
      title: '你同意了申请',
    })
  },
  deny:function(e){
    wx.showToast({
      title: '你拒绝了申请',
    })
  }
})