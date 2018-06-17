//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    errorMessage: '',
    id: '',
    password: '',
    disabled: true,
    opacity: 0.4
  },
  //事件处理函数

  onLoad: function () {
    var value = wx.getStorageSync('curIdentity')
    wx.hideTabBar({

    })
    if (value) {
      wx.reLaunch({
        url: '../schoolMap/schoolMap'
      })
    }
   
  },


  idInput: function (e) {
    if (this.data.password != '') {
      this.setData({
        disabled: false,
        opacity: 1
      })
    }
    this.setData({
      id: e.detail.value
    })
    if (this.data.id == '') {
      this.setData({
        disabled: true,
        opacity: 0.4
      })
    }
  },
  passwordInput: function (e) {
    if (this.data.id != '') {
      this.setData({
        disabled: false,
        opacity: 1
      })
    }
    this.setData({
      password: e.detail.value
    })
    if (this.data.password == '') {
      this.setData({
        disabled: true,
        opacity: 0.4
      })
    }
  },
  formSubmit: function (e) {
    wx.setTabBarItem({
      index: 2,
    })
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //检测数据库，登录成功后跳转至地图界面
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          var role
          //发起网络请求
          wx.request({
            url: 'http://123.206.94.45/CampusMap/Activate',
            data: {
              account: e.detail.value.input,
              password: e.detail.value.password,
              code: res.code,
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              console.log(r.data)
              var tem = r.data.code
              console.log(tem)
              if (tem == 1) {
                console.log(tem == 1)
                wx.setStorageSync('user_name', r.data.name)
                wx.setStorageSync('student_id', r.data.id)

                wx.setStorageSync('TJClatitude', 40.1520)
                wx.setStorageSync('TJClongitude', 116.2758)

                wx.setStorageSync('YMlatitude', 40.1512)
                wx.setStorageSync('YMlongitude', 116.2744)

                wx.setStorageSync('TSGlatitude', 40.1518)
                wx.setStorageSync('TSGlongitude', 116.2717)

                wx.setStorageSync('SYLlatitude', 40.1508)
                wx.setStorageSync('SYLlongitude', 116.27)

                wx.setStorageSync('SSlatitude', 40.1550)
                wx.setStorageSync('SSlongitude', 116.2738)

                wx.setStorageSync('GSlatitude', 40.1539)
                wx.setStorageSync('GSlongitude', 116.2712)


                wx.setStorageSync('curIdentity', r.data.identity)
                wx.switchTab({
                  url: '../schoolMap/schoolMap',
                  success: function (res) { },
                  fail: function (res) { },
                  complete: function (res) { },
                })
              }
              else {
                app.showErrorModal('登陆失败,请检查账户和密码');
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

  }
})
