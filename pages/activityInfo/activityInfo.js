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
    curID:false
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
        var buttonContent = ''
        var hasButton = true
        var deleteButton = false
        var attendNumber = ''
        attendNumber += r.data.activity.current_number
        attendNumber += '/'
        attendNumber += r.data.activity.number_limit
      that.setData({
          buttonContent: buttonContent,
          deleteButton : deleteButton,
          Title: r.data.activity.activity_name,
          start_time : r.data.activity.start_time.toString().substr(0, 16),
          end_time : r.data.activity.end_time.toString().substr(0, 16),
          site: r.data.activity.location + '-' + r.data.activity.place,
          sponsor: r.data.activity.org_name,
          briefIntro: r.data.activity.profile,
          attendNumber: attendNumber,
          state: r.data.activity.state,
          buttonContent: buttonContent,
          hasButton: hasButton
        })
      }
    })
  },

  
  deleteClick:function(e){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityQuit',
      data: {
        student_id: wx.getStorageSync('student_id'),
        activity_id: wx.getStorageSync('activity_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        wx.showToast({
          title: '退选成功',
        })
        wx.navigateBack({
          url: '../corporationIssueRecords/corporationIssueRecords'
        })
      }
    })

  },
  
  enrollClick:function(){
    var that = this
    if (this.data.state == '未参加')
    {
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
          
          if(r.data.code == 4)
          {
            wx.showToast({
              title: '报名失败：活动已经停止报名',
              image: '/img/false.png'
            })
          }
          else if (r.data.code == 5) {
            wx.showToast({
              title: '报名失败：人数已满',
              image: '/img/false.png'
            })
          }
          else if (r.data.code == 0) {
            that.setData({
              state: "参加未签到",
              buttonContent: "签到",
              deleteButton: true
            })
            wx.showToast({
              title: '报名成功',
            })
          }
        }
      })
    }
    else if (this.data.state == '参加未签到')
    {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          wx.request({
            url: 'http://123.206.94.45/CampusMap/SignIn',
            data: {
              student_id: wx.getStorageSync('student_id'),
              activity_id: wx.getStorageSync('activity_id'),
              latitude: res.latitude,
              longitude: res.longitude
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              if (r.data.code == 7) {
                wx.showToast({
                  title: '签到失败：签到须在活动开始前二十分钟内',
                  image: '/img/false.png'
                })
              }
              else if (r.data.code == 8) {
                wx.showToast({
                  title: '签到失败：距离过远',
                  image: '/img/false.png'
                })
              }
              else if (r.data.code == 0) {
                that.setData({
                  state: "签到未签退",
                  buttonContent: "签退"
                })
                wx.showToast({
                  title: '签到成功',
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
    else if (this.data.state == '签到未签退') 
    {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          // success
          wx.request({
            url: 'http://123.206.94.45/CampusMap/SignInOut',
            data: {
              student_id: wx.getStorageSync('student_id'),
              activity_id: wx.getStorageSync('activity_id'),
              latitude: res.latitude,
              longitude: res.longitude
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (r) {
              if (r.data.code == 7) {
                wx.showToast({
                  title: '签退失败：签退须在活动结束后二十分钟内',
                  image: '/img/false.png'
                })
              }
              else if (r.data.code == 8) {
                wx.showToast({
                  title: '签退失败：距离过远',
                  image: '/img/false.png'
                })
              }
               if (r.data.code == 0)
              {
                that.setData({
                  hasButton: false
                })
                wx.showToast({
                  title: '签退成功',
                })
              }
            }
          })

        }
      })
    }
    
  }
})