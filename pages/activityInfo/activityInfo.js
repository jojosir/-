Page({

  /**
   * 页面的初始数据
   */
  data: {
    Title:'',
    start_time:'',
    end_time: '',
    site:'',
    sponsor:'',
    briefIntro:'',
    attendNumber:'',
    buttonContent:'报名',
    hasButton:true,
    state: '',
    deleteButton:false,
    curID:false,
    SignInStatus:false,
    SignOutStatus:false,
    is_valid:false,
    code:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getAcitivityInfo',
      data: {
        student_id: wx.getStorageSync('student_id'),
        activity_id: wx.getStorageSync('activity_id')
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(wx.getStorageSync('student_id'))
        console.log(wx.getStorageSync('activity_id'))
        console.log(r.data)
        if (wx.getStorageSync('curIdentity') == 2)
        {
          that.setData({
            curID:true
          })
        }
        else
        {
          that.setData({
            curID: false
          })
        }

        var state = ''
        var hasButton = true
        if (r.data.code == 1 && r.data.status.SignOutStatus == true)
          hasButton = false
        var deleteButton = false
        if (r.data.code == 1 && r.data.activity.state == '尚未开始')
          deleteButton = true
        console.log(deleteButton)
        var attendNumber = ''
        attendNumber += r.data.activity.current_number
        attendNumber += '/'
        attendNumber += r.data.activity.number_limit
      that.setData({
          deleteButton : deleteButton,
          Title: r.data.activity.activity_name,
          start_time : r.data.activity.start_time.toString().substr(0, 16),
          end_time : r.data.activity.end_time.toString().substr(0, 16),
          site: r.data.activity.location + '-' + r.data.activity.place,
          sponsor: r.data.activity.org_name,
          briefIntro: r.data.activity.profile,
          attendNumber: attendNumber,
          state: r.data.activity.state,
          hasButton: hasButton
        })
        if(r.data.code == 1)
        {
          that.setData({
            code:r.data.code,
            SignInStatus: r.data.status.SignInStatus,
            SignOutStatus: r.data.status.SignOutStatus,
            is_valid: r.data.status.is_valid
          })
          var value
          if (r.data.status.SignInStatus == true)
            value = '签退'
          else 
            value = '签到'
          that.setData({
            buttonContent:value
          })
        }
     
      }
    })
  },

  
  deleteClick:function(e){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ExitActivity',
      data: {
        student_id: wx.getStorageSync('student_id'),
        activity_id: wx.getStorageSync('activity_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var msg = r.data.msg
        wx.showToast({
          title: msg
        })
        wx.navigateBack({
          url: '../corporationIssueRecords/corporationIssueRecords'
        })
      }
    })

  },
  
  enrollClick:function(){
    var that = this
    if (this.data.code == 0)
    {
      console.log("报名")
      wx.request({
        url: 'http://123.206.94.45/CampusMap/JoinActivity',
        data: {
          student_id: wx.getStorageSync('student_id'),
          activity_id: wx.getStorageSync('activity_id')
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (r) {
          console.log(r.data)
          if(r.data.code == 1)
          {
            that.setData({
              code:1,
              buttonContent: "签到",
              deleteButton: true
            })
            wx.showToast({
              title: '报名成功',
            })
          }
          else{
            var msg = r.data.msg
            wx.showToast({
              title: msg,
              image: '/img/false.png'
            })
          }

        }
      })
    }
    else if (this.data.SignInStatus == false)
    {
      console.log("签到")
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          wx.request({
            url: 'http://123.206.94.45/CampusMap/SignInOut',
            data: {
              studentID: wx.getStorageSync('student_id'),
              activityID: wx.getStorageSync('activity_id'),
              latitude: res.latitude,
              longitude: res.longitude,
              limit : 10,
              action : 0
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              console.log(r.data)
              if (r.data.code == 1) {
                that.setData({
                  SignInStatus: true,
                  buttonContent: "签退"
                })
                wx.navigateTo({
                  url: '../activitiesList/activitiesList',
                  success: function(){
                    wx.showToast({
                      title: '签到成功'
                    })
                  }
                })
              }
              else {
                var msg = r.data.msg
                wx.showToast({
                  title: msg,
                  image: '/img/false.png'
                })
              }
              /*
              console.log(r.data)
              wx.redirectTo({
                url: '../activityInfo/activityInfo'
              })
              */
            }
          })

        }
      })
    }
    else if (this.data.SignOutStatus == false) 
    {
      console.log('signOut')
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          wx.request({
            url: 'http://123.206.94.45/CampusMap/SignInOut',
            data: {
              studentID: wx.getStorageSync('student_id'),
              activityID: wx.getStorageSync('activity_id'),
              latitude: res.latitude,
              longitude: res.longitude,
              limit: 10,
              action: 1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              console.log(r.data)
              if (r.data.code == 1) {
                that.setData({
                  hasButton: false,
                  SignOutStatus:true
                })
                wx.showToast({
                  title: '签退成功',
                })
              }
              else{
                var msg = r.data.msg
                wx.showToast({
                  title: msg,
                  image: '/img/false.png'
                })
              }
            }
          })

        }
      })
    }
    
  }
})