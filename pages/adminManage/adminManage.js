Page({
  approveActivityClick:function(e){
    wx:wx.navigateTo({
      url: '../adminPendingActivityList/adminPendingActivityList',
    })
  },
  ChangeRepresentClick:function(e){
    wx: wx.navigateTo({
      url: '../adminPendingRepresentList/adminPendingRepresentList',
    })
  },
  logoutClick:function(e){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/Logout',
      data: {
        id: wx.getStorageSync('student_id')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        wx.clearStorageSync()
        wx.reLaunch({
          url: '../login/login',
          success: function (res) {
            wx.showToast({
              title: '注销成功',
            })
          }
        })
      }
    })
  }
})