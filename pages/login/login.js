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
      path
    })
    var that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //检测数据库，登录成功后跳转至地图界面
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          wx.request({
            url: 'https://38697963.qcloud.la/CampusMap/Activate',
            data: {
              student_id: e.detail.value.input,
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

              if (tem == 0) {

                wx.setStorageSync('student_id', e.detail.value.input)
                wx.setStorageSync('curIdentity', r.data.identity[0])
                var tmp = r.data.identity;
                var detailIdentity = [];
                for (var i = 0; i < tmp.length; i++) {
                  if (tmp[i] == 'student') {
                    var tmpIdentity = new Object();
                    tmpIdentity.id = e.detail.value.input;
                    tmpIdentity.identity = 'student';
                    console.log(tmpIdentity);
                    detailIdentity.push(tmpIdentity);
                    app.edit
                  } else if (tmp[i] == 'counsellor') {
                    var tmpIdentity = new Object();
                    tmpIdentity.id = e.detail.value.input;
                    tmpIdentity.identity = 'counsellor';
                    detailIdentity.push(tmpIdentity);
                  } else if (tmp[i] == 'admin') {
                    var tmpIdentity = new Object();
                    tmpIdentity.id = e.detail.value.input;
                    tmpIdentity.identity = 'admin';
                    detailIdentity.push(tmpIdentity);
                  }
                  else {
                    var tmpIdentity = new Object();
                    var substr = tmp[i].split(" ");
                    tmpIdentity.id = e.detail.value.input;
                    tmpIdentity.identity = substr[0];
                    tmpIdentity.org_id = substr[1];
                    tmpIdentity.org_name = substr[2];
                    detailIdentity.push(tmpIdentity);
                  }
                }
                wx.setStorageSync('detailIdentity', detailIdentity)
                wx.setStorageSync('curIdentity', detailIdentity[0])
                wx.redirectTo({
                  url: '../schoolMap/schoolMap'
                })
              }
              else {
                that.setData({
                  errorMessage: r.data.msg
                })
                app.showErrorModal(r.data.msg, '登陆失败');
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
