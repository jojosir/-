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
    if (e.detail.value.input == wx.getStorageSync('student_id'))
    {
      wx.showToast({
        image: '/img/false.png',
        title: '不能设置自己的学号'
      })
    }
    else{
    wx.request({
      url: 'http://123.206.94.45/CampusMap/AlterStudentRole',
      data: {
        org_id:wx.getStorageSync('org_id'),	
	      student_id:e.detail.value.input,
        operation : 1,
        role : 1,
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data.code)

        var msg = r.data.msg
        wx.showToast({
          title: msg
        })
        if (r.data.code == 1) {
          wx.switchTab({
            url: '../manage/manage',
            success(e){
              var page = getCurrentPages().pop();
              var value = wx.getStorageSync('role');
              if(value >= 1000) value -= 1000;
              wx.setStorageSync('role', value);
              wx.setStorageSync('curIdentity', 2);
              console.log(page);
              if (page == undefined || page == null) return;
              page.updatePage();
            }
          })
        }
      },
      fail:function(r){
        console.log('fail')
      }
    })
    }
  }
})