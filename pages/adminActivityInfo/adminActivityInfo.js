// pages/adminActivityInfo/adminActivityInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  time:'',
  site:'',
  limit:0,
  sponsor:'',
  activity_id:'',
  disabled: '', 
  courseType:'',
  briefIntro:'',
  Title:'',
  start_time:'',
  end_time:''
  },

  onLoad: function (options) {
    var that = this
    wx:wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ActivitySingle',
      data: {
        student_id: -1,
        activity_id: options.activity_id
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(r) {
        var time = ''
        var start_Date = r.data.activity.start_time.toString().substr(0, 10)
        var end_Date = r.data.activity.end_time.toString().substr(0, 10)
        if (start_Date == end_Date) {
          var start_Time = r.data.activity.start_time.toString().substr(5, 11);
          var end_Time = r.data.activity.end_time.toString().substr(11, 5);
          time += start_Time
          time += '-'
          time += end_Time
        }
        else {
          var start_Time = r.data.activity.start_time.toString().substr(5, 11);
          var end_Time = r.data.activity.end_time.toString().substr(5, 11);
          time += start_Time
          time += '-'
          time += end_Time
        }

          var startDate = r.data.activity.start_time.toString().substr(0, 16)
          var endDate = r.data.activity.end_time.toString().substr(0, 16)

          that.setData({
            time: time,
            site: r.data.activity.location,
            sponsor: r.data.activity.org_name,
            activity_id: r.data.activity.activity_id,
            limit: r.data.activity.number_limit,
            briefIntro: r.data.activity.profile,
            Title: r.data.activity.activity_name,
            start_time: startDate,
            end_time: endDate
            
          })
          if (r.data.activity.is_boya == true) {
            that.setData({
              courseType: '博雅课程'
            })
          } else {
            that.setData({
              courseType: '非博雅课程'
            })
          }
      },
      fail: function(res) {},
      complete: function(res) {},
      
    })
  },
  btnAgreeClick:function(e){
    var that = this;
    wx:wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ExamineActivity',
      data:{
        action:1,
        activity_id:this.data.activity_id,
        start_time:this.data.start_time,
        end_time:this.data.end_time
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: '已同意',
        })
        that.setData({
          disabled:true
        })   
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  },
  btnDenyClick: function(e){

    var that = this;
    wx: wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ExamineActivity',
      data: {
        action: 1,
        activity_id: this.data.activity_id,
        start_time: this.data.start_time,
        end_time: this.data.end_time
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.showToast({
          title: '已拒绝',
        })
        that.setData({
          disabled: true
        })
      },
      fail: function (res) { },
      complete: function (res) {
      },
    })
  }
})