// pages/Manage/Manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type: 1,//1:student,2:admin,3:counsellor，4：活动管理员，5：组织代表
    user_id: 0,
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('curIdentity')
    wx.showTabBar({

    })
    if (value < 1 ) {
      wx.reLaunch({
        url: '../login/login'
      })
    } /*测试时隐藏,获取当前身份，若小于1代表未登陆*/
    var mid = false;
    if(value = 2)
      mid = true;
    this.setData({
      user_type: value, //测试时隐藏
      disabled:mid
    })
  },
  student_activityClick: function (e) {
    wx.navigateTo({
      url: '../studentActivityRecords/studentActivityRecords'
    })
  },
  InfoClick: function (e) {
    wx.navigateTo({
      url: '../ArouseAnounnce/ArouseAnounnce'
    })
  },
  identityClick: function (e) {
    wx.showActionSheet({
      itemList: ['学生', '导员', '活动管理员', '组织代表'],
      itemColor: '#007aff',
      success(res) {
        var tmp = this.data.user_type;
        if ((tmp == 1 && res.tapIndex == 0) || (tmp == 3 && res.tapIndex == 1) || (tmp == 4 && res.tapIndex == 2) || (tmp == 5 && res.tapIndex == 3)) wx.showToast({
          title: '无效操作',
          duration:2000
        })
        else{
          
          wx.request({
            url: '',
            method: 'POST',
            data:{
              student_id: wx.getStorageSync("student_id"),
              user_type: this.data.user_type
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(r){
              wx.setStorageSync('org_id', r.data.org_id),
              wx.setStorageSync('curIdentity', r.data.uer_type),
              wx.switchTab({
                url: '../schoolMap/schoolMap',
              })
            }
          })
        }
      }
    })
    this.setData({
      hidden: false
    })
  },
  approveActivityClick: function (e) {
    wx: wx.navigateTo({
      url: '../adminPendingActivityList/adminPendingActivityList',
    })
  },
  stuClick: function (e) {
    wx.navigateTo({
      url: '../counsellorStudentList/counsellorStudentList'
    })
  },
  counsellor_activityClick: function (e) {
    wx.navigateTo({
      url: '../counsellorActivityList/counsellorActivityList'
    })
  },
  ChangeRepresentClick: function (e) {
    wx: wx.navigateTo({
      url: '../adminPendingRepresentList/adminPendingRepresentList',
    })
  },
  ChangePasswordClick: function (e) {
    wx: wx.navigateTo({
      url: '../ChangePassword/ChangePassword',
    })
  },
  issueRecordsClick: function (e) {
    wx: wx.navigateTo({
      url: '../corporationIssueRecords/corporationIssueRecords'
    })
  },
  changeRepresentClick: function (e) {
    wx.navigateTo({
      url: '../studentRepresentChange/studentRepresentChange',
    })
  },
  createAdminClick: function (e) {
    wx: wx.navigateTo({
      url: '../corporationCreateAdmin/corporationCreateAdmin'
    })
  },
  logoutClick: function (e) {
    //注销
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
  },
})