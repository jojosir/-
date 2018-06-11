// pages/studentRepresentMagage/studentRepresentMagage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    identity: [], //最后显示在picker选项中
    disabled: false,
    pickerChoice: [] // 用来控制跳转
  }, 
  onLoad: function (options) {
    var tmp = wx.getStorageSync('detailIdentity');
    var identity = [];
    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].identity != wx.getStorageSync('curIdentity').identity) { //当此时不为org_manager时
        if (tmp[i].identity == 'org_manager' || tmp[i].identity == 'org_owner') {
          if (tmp[i].identity == 'org_manager')
            var str = tmp[i].org_name + '管理员'
          else
            var str = tmp[i].org_name + '代表'
          identity.push(str);
        } else {
          if (tmp[i].identity == 'student') {
            identity.push('学生');
          } else if (tmp[i].identity == 'counsellor') {
            identity.push('辅导员');
          } else {
            identity.push('管理员');
          }

        }
        this.data.pickerChoice.push(tmp[i]);
      } else if (tmp[i].identity == wx.getStorageSync('curIdentity').identity) {
        if (tmp[i].identity == 'org_manager' || tmp[i].identity == 'org_owner') {
          if (tmp[i].org_id != wx.getStorageSync('curIdentity').org_id) {
            if (tmp[i].identity == 'org_manager')
              var str = tmp[i].org_name + '管理员'
            else
              var str = tmp[i].org_name + '代表'
            identity.push(str);
            this.data.pickerChoice.push(tmp[i]);
          }
        }
      }
    }
    if (identity.length < 1) {
      this.setData({
        disabled: true
      })
    }
    this.setData({
      identity: identity
    })
    console.log(this.data.pickerChoice);
    console.log(this.data.identity);
  },
  createActivityClick:function(e){
    wx:wx.navigateTo({
      url: '../corporationCreateActivity/corporationCreateActivity'
    })
  },
  activityListClick:function(e){
    wx: wx.navigateTo({
      url: '../corporationActivityList/corporationActivityList'
    })
  },
  changeRepresentClick:function(e){
    //弹出输入框
    wx.navigateTo({
      url: '../studentRepresentChange/studentRepresentChange',
    })



  },
  createAdminClick:function(e){
    wx:wx.navigateTo({
      url: '../corporationCreateAdmin/corporationCreateAdmin'
    })
  },
  issueRecordsClick:function(e){
    wx: wx.navigateTo({
      url: '../corporationIssueRecords/corporationIssueRecords?identity=represent'
    })
  },
  
  logoutClick: function (e) {
    //注销
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/Logout',
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
  
  identityClick: function (e) {
    if (this.data.disabled)
      wx.showToast({
        title: '没有其他身份',
        icon: '',
        image: '/img/false.png',
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    index = parseInt(index);
    var identity = this.data.pickerChoice;
    if (identity[index].identity == 'org_manager' || identity[index].identity == 'org_owner') {
      wx.reLaunch({
        url: '../schoolMap/schoolMap?org_id=' + identity[index].org_id + 'id=' + identity[index].id,
        success: function (res) {
          wx.showToast({
            title: '切换身份成功',
          })
          wx.setStorageSync('curIdentity', identity[index])
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      //跳转到相关组织管理员页面
    } else {  // 学生、辅导员、管理员
      wx.reLaunch({
        url: '../schoolMap/schoolMap?id=' + identity[index].id,
        success: function (res) {
          wx.showToast({
            title: '切换身份成功',
          })
          wx.setStorageSync('curIdentity', identity[index])
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})