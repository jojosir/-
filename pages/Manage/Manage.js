Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_type: 1,//1:admin,2:student,3:counsellor，4：活动管理员，5：组织代表
    user_id: 0,
    disabled:false,
    role: '当前身份'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('curIdentity')
    if(value != 1)
    {
      console.log(wx.getStorageSync("student_id"))
      wx.request({
        url: 'http://123.206.94.45/CampusMap/getRole',
        method: 'POST',
        data: {
          id: wx.getStorageSync("student_id")
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (r) {
          console.log(r.data)
          wx.setStorageSync('role', r.data.code)
        }
      })
    }
  },
  updatePage:function(e){
    var value = wx.getStorageSync('curIdentity')
    wx.showTabBar({

    })
    if (value < 1) {
      wx.reLaunch({
        url: '../login/login'
      })
    } /*测试时隐藏,获取当前身份，若小于1代表未登陆*/
    var mid = false;
    if (value == 1)
      mid = true;
    this.setData({
      user_type: value, //测试时隐藏
      disabled: mid
    })
    this.updateRole();
  }
  ,
  onShow:function(e){
    this.updatePage();
  },
  updateRole:function(e){
    var value = wx.getStorageSync('curIdentity')
    if (value == 1)
      this.setData({
        role: '当前身份：系统管理员'
      })
    if (value == 2)
      this.setData({
        role: '当前身份:学生'
      })
    if (value == 3)
      this.setData({
        role: '当前身份:导员'
      })
    if (value == 4)
      this.setData({
        role: '当前身份:活动管理员'
      })
    if (value == 5)
      this.setData({
        role: '身份设置:组织代表'
      })
  }
  ,
  student_activityClick: function (e) {
    wx.navigateTo({
      url: '../studentActivityRecords/studentActivityRecords'
    })
  },
  InfoClick: function (e) {
    wx.navigateTo({
      url: '../arouseAnounnce/arouseAnounnce'
    })
  },
  identityClick: function (e) {
   // var tmp = [],
   var that = this
   var value = wx.getStorageSync('role')
   var tmp = []
   if(value == 0)
      tmp = ['学生']
   else if (value == 10)
     tmp = ['学生', '导员']
   else if (value == 100)
     tmp = ['学生', '活动管理员']
   else if (value == 110)
     tmp = ['学生', '导员', '活动管理员']
   else if (value == 1000)
     tmp = ['学生', '组织代表']
   else if (value == 1100)
     tmp = ['学生', '活动管理员', '组织代表']
   else if (value == 1010)
     tmp = ['学生', '导员', '组织代表']
   else if (value == 1110)
     tmp = ['学生', '导员', '活动管理员', '组织代表']
    wx.showActionSheet({
      itemList: tmp,
      itemColor: '#007aff',
      success(res) {
        console.log(res.tapIndex)
        //var tmp = this.data.user_type;
       /* if ((tmp == 1 && res.tapIndex == 0) || (tmp == 3 && res.tapIndex == 1) || (tmp == 4 && res.tapIndex == 2) || (tmp == 5 && res.tapIndex == 3)) wx.showToast({
          title: '无效操作',
          duration:2000
        })*/
        //else{
        if (tmp[res.tapIndex] ==  '学生')
          {
           wx.setStorageSync('curIdentity', 2)
          }
         else if (tmp[res.tapIndex] == '导员') {
           wx.setStorageSync('curIdentity', 3)
         }
        else if (tmp[res.tapIndex] == '活动管理员') {
           wx.setStorageSync('curIdentity', 4)
         }
        else if (tmp[res.tapIndex] == '组织代表') {
           wx.setStorageSync('curIdentity', 5)
         }
         var value = wx.getStorageSync('curIdentity')
         that.onShow();
         wx.showToast({
           title: '切换成功',
         })
         }
         
        //}
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
      url: '../changePassword/changePassword',
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