// studentRepresentChange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  
  },
  formSubmit: function (e) {
    console.log(e.detail.value.input)
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/SubmitAlter',
      data: {
        org_id: wx.getStorageSync('org_id'),	
	      student_id:e.detail.value.input
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        if (r.data.code == 17) {
          wx.showToast({
            title: '已是社团代表',
            image: '/img/false.png'
          })
        }
        else if (r.data.code == 27) {
          wx.showToast({
            title: '有未处理的申请',
            image: '/img/false.png'
          })
        }
        else if (r.data.code == 1) {
          wx.showToast({
            title: '该学号不存在',
            image: '/img/false.png'
          })
        }
        else if (r.data.code == 0) {
          wx.navigateBack({
            url: '../studentRepresentManage/studentRepresentManage',
          })
        }
      },
      fail:function(r){
        console.log('fail')
      }
    })
  }
})