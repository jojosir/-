// pages/counsellorCurStudentActivityList/counsellorCurStudentActivityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
    ],
    student_id:''
  },
  onLoad:function(options){
    var that = this;
    var state = [];
    this.setData({
      student_id:options.student_id
    })
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/getRecord',
      data: {
        id: options.student_id
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(options.student_id)
        console.log(res)
        var tmpItems=[];
        for (var i = 0; i < res.data.record.length; i++) {
          var tmp = new Object();
          tmp.activity_id = res.data.record[i].activity_id
          tmp.activity_name = res.data.record[i].activity_name
          if (res.data.record[i].state == 1) {
            tmp.state = '参加未签到'
          } else if (res.data.record[i].state == 2) {
            tmp.state = '签到未签退'
          } else if (res.data.record[i].state == 3) {
            tmp.state = '签退'
          } else if (res.data.record[i].state == 4) {
            tmp.state = '有效'
          } else if (res.data.record[i].state == 5) {
            tmp.state = '无效'
          }
          var time = ''
          var startDate = res.data.record[i].start_time.toString().substr(0, 10)
          var endDate = res.data.record[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = res.data.record[i].start_time.toString().substr(5, 11);
            var endTime = res.data.record[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = res.data.record[i].start_time.toString().substr(5, 11);
            var endTime = res.data.record[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          tmp.time = time
          tmpItems.push(tmp);
          that.setData({
            items: tmpItems
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  changeState:function(e){
    var index = e.target.dataset.index;
    var tmp = this.data.items;
    var array = [];
    array.push(this.data.student_id)
    console.log(array)
    for (var i = 0;i < tmp.length;i++){
      if (tmp[i].activity_id == index){
        if (tmp[i].state == '有效'){
          wx: wx.request({
            url: 'http://123.206.94.45/CampusMap/ModifyStudentInActivity',
            data: {
              activity_id: index,
              action:3,
              list: array
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res)
             },
            fail: function (res) { },
            complete: function (res) { },
          })
          tmp[i].state = '无效'
          this.setData({
            items: tmp
          })
        } else if (tmp[i].state == '无效'){
          wx: wx.request({
            url: 'http://123.206.94.45/CampusMap/ModifyStudentInActivity',
            data: {
              activity_id: index,
              action: 4,
              list: array
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
          tmp[i].state = '有效'
          this.setData({
            items: tmp
          })
        }
      }
    }
  }
})