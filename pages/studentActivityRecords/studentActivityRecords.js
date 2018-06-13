// pages/studentActivityRecords/studentActivityRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [],
    activities: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
 /* onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ActivityStudent',
      data: {
        student_id: wx.getStorageSync('student_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(wx.getStorageSync('student_id')) 
        console.log(r.data)
        var activities = [];
        for (var i = 0; i < r.data.length; i++) {
          var state = ''
          switch (r.data[i].state) {
            case 0:
              state = "未参加";
              break;
            case 1:
              state = "参加未签到";
              break;
            case 2:
              state = "签到未签退";
              break;
            case 3:
              state = "签到";
              break;
            case 4:
              state = "有效";
              break;
            case 5:
              state = "无效";
              break;
            default:
              console.log('state错误')
          }
          that.setData({
            activity: [{
              name: r.data[i].activity_name,
              id: r.data[i].activity_id,
              state: state
            }]
          })
          activities.push(that.data.activity[0])
        }
        that.setData({
          activities: activities
        })
      }
    })
  },*/
  onShow: function (options) {
    console.log('work')
    var that = this
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getRecord',
      data: {
        id: wx.getStorageSync('student_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(wx.getStorageSync('student_id'))
        console.log(r.data)
        var activities = [];
        for (var i = 0; i < r.data.record.length; i++) {
          var state = ''
          switch (r.data.record[i].state) {
            case 0:
              state = "未参加";
              break;
            case 1:
              state = "参加未签到";
              break;
            case 2:
              state = "签到未签退";
              break;
            case 3:
              state = "签到";
              break;
            case 4:
              state = "有效";
              break;
            case 5:
              state = "无效";
              break;
            default:
              console.log('state错误')
          }
          that.setData({
            activity: [{
              name: r.data.record[i].name,
              id: r.data.record[i].activity_id,
              state: state,
             start_time: r.data.record[i],
               end_time: r.data.record[i],
               SignInStatus: r.data.record[i],
                 SignOutStatus: r.data.record[i],
                 is_valid: r.data.record[i]
            }]
          })
          activities.push(that.data.activity[0])
        }
        that.setData({
          activities: activities
        })
      }
    })
  },
  activitiyClick: function (e) {
    console.log(e)
    wx.setStorageSync('activity_id', this.data.activities[e.target.dataset.index].id)
    wx.navigateTo({
      url: '../activityInfo/activityInfo'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */


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
  
  }
})