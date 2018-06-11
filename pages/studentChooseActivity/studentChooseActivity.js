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
  /*onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ActivityList',
      data: {
        student_id: wx.getStorageSync('student_id'),
        location: wx.getStorageSync('location')
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        
        var activities = [];
        for (var i = 0; i < r.data.list.length; i++)
        {
          var state = ''
          switch (r.data.list[i].state) {
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
              name: r.data.list[i].name,
              id: r.data.list[i].id,
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
  onShow: function() {
    console.log('work')
    var that = this
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ActivityList',
      data: {
        student_id: wx.getStorageSync('student_id'),
        location: wx.getStorageSync('location')
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)

        var activities = [];
        for (var i = 0; i < r.data.list.length; i++) {
          var state = ''
          switch (r.data.list[i].state) {
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
              name: r.data.list[i].name,
              id: r.data.list[i].id,
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
  },


  activitiyClick:function(e)
  {
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
   * 
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