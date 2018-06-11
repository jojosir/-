// pages/pendingActivityList/pendingActivityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[]
  },
  onShow:function(options){
    var that = this;
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getExaminingActivity',
      method:'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {

        wx.setStorageSync('pendingActivityList',r.data)
        that.setData({
          items:r.data
        })
        console.log(r.data)
      }
   })
  },

  activityItemClick:function(e){
    console.log(e.target.dataset.index)
    console.log('hh')
    wx:wx.navigateTo({
      url: '../adminActivityInfo/adminActivityInfo?activity_id='+e.target.dataset.index,
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})