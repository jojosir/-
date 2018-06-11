//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /*wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            if (res.code) {
              console.log(res)
              //发起网络请求
              wx.request({
                url: 'https://38697963.qcloud.la/CampusMap/Activate',
                data: {
                  code: res.code,
                },
                success: function (r) {
                  console.log(r.data)
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
*/


    /*wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          wx.request({
            url: 'https://38697963.qcloud.la/CampusMap/Activate',
            data: {
              id: 15210006,
              password: '15210006',
              code: res.code,
            },
            method:"GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              console.log(r.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })*/

    /*wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res)
          //发起网络请求
          wx.request({
            url: 'https://38697963.qcloud.la/CampusMap/ActivityMap',
            data: {
              id: 15210006,
              password: '15210006',
              code: res.code,
            },
            method: "GET",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              console.log(r.data)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })

*/

  },

  /*wx.login({
    success: function (res) {
      if (res.code) {
        console.log(res)
        //发起网络请求
        wx.request({
          url: 'https://38697963.qcloud.la/CampusMap/Login',
          data: {
            code: res.code,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (r) {

            console.log(r.data)
            //this.globalData.msg = r.data.msg
            //console.log(this.globalData.msg)
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
  },*/
  /*wx.login({
    success: function (res) {
      if (res.code) {
        console.log(res)
        //发起网络请求
        wx.request({
          url: 'https://38697963.qcloud.la/CampusMap/Logout',
          data: {
            code: res.code,
            id: 15210001,
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (r) {

            console.log(r.data)
            //this.globalData.msg = r.data.msg
            //console.log(this.globalData.msg)
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
},*/

  /*getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },*/
  showErrorModal: function (content, title) {
    wx.showModal({
      title: title || '加载失败',
      content: content || '未知错误',
      showCancel: false
    });
  },
  globalData: {
    userInfo: null,
    msg: '123'
  }
})