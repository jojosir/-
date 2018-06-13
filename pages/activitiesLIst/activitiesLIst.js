Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities: []
  },

  onShow: function () {
    console.log('work')
    var that = this
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getAllActivity',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        that.setData({
          activities: r.data.list
        })
      }
    })
  },


  activitiyClick: function (e) {
    wx.setStorageSync('activity_id', this.data.activities[e.target.dataset.index].id)
    wx.navigateTo({
      url: '../activityInfo/activityInfo'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 
   * 生命周期函数--监听页面显示
   */

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