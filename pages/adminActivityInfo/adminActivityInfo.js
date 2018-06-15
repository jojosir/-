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
  end_time:'',
  attendNumber:'',
  state:'',
  },

  onLoad: function (options) {
    var that = this
    console.log(options)
    wx:wx.request({
      url: 'http://123.206.94.45/CampusMap/getAcitivityInfo',
      data: {
        student_id: -1,
        activity_id: options.activity_id
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(r) {
        console.log(r.data)
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
          var attendNumber = ''
          attendNumber += r.data.activity.current_number
          attendNumber += '/'
          attendNumber += r.data.activity.number_limit
          that.setData({
            time: time,
            site: r.data.activity.location + '-' + r.data.activity.place,
            sponsor: r.data.activity.org_name,
            limit: r.data.activity.number_limit,
            briefIntro: r.data.activity.profile,
            Title: r.data.activity.activity_name,
            start_time: startDate,
            end_time: endDate,
            activity_id: options.activity_id,
            attendNumber: attendNumber,
            state: r.data.activity.state,
          })
      },
      fail: function(res) {},
      complete: function(res) {},
      
    })
  },
  btnAgreeClick:function(e){
    var that = this;
    wx:wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityExamine',
      data:{
        action:1,
        id: this.data.activity_id,
        detail :''
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
      url: 'http://123.206.94.45/CampusMap/ActivityExamine',
      data: {
        action: 2,
        activity_id: this.data.activity_id,
        detail: ''
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