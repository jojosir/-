Page({
  data: {
    hasLocation: false,
    activityLocation: [],  
    disabled:false,
    showOrNot:'',
    state:'未发布',
    issueShowOrNot:'',

    name: '',
    location: '',
    longitude: 0,
    latitude: 0,
    place: '',
    startDate: new Date(),
    startTime: '12:00',
    endDate: '',
    endTime: '12:00',
    num:0,
    profile:'',
    tem:''

  },
  onLoad: function (options) {
    this.setData({
      location: '未选择位置',
      longitude: 0,
      latitude: 0,
    })
    
    var that = this
    var date = this.data.startDate.toString();
    var tem = date.substr(0, 10);
    this.setData({
      tem:tem,
      startDate: tem,
      endDate: tem,
      state: options.state
    })
    if (wx.getStorageSync('curIdentity') == 5) {
      this.setData({
        disabled: false,
        showOrNot: '',
        issueShowOrNot: ''
      })
    } else {
      this.setData({
        disabled: true,
        showOrNot: 'none',
        issueShowOrNot: 'none'
      })
    }

    wx.request({
      url: 'http://123.206.94.45/CampusMap/getAcitivityInfo',
      data: {
        student_id: wx.getStorageSync('student_id'),
        activity_id: wx.getStorageSync('activity_id')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var startDate= ''
        var startTime= '12:00'
        var endDate= ''
        var endTime= '12:00'
        if (r.data.activity.start_time != undefined)
        {
           startDate = r.data.activity.start_time.toString().substr(0, 10)
           startTime = r.data.activity.start_time.toString().substr(11, 5)
           endDate = r.data.activity.end_time.toString().substr(0, 10)
           endTime = r.data.activity.end_time.toString().substr(11, 5)
        }
        console.log(startTime)
        console.log(endTime)
        var location
        if (r.data.activity.location != undefined)
        {
          location = r.data.activity.location
        }
        else
        {
          location = '未选择位置'
        }
        that.setData({
          
          longitude: r.data.activity.longitude,
          latitude: r.data.activity.latitude,
          hasLocation:true,
          name: r.data.activity.activity_name,
          location: location,
          place: r.data.activity.place,
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          num: r.data.activity.number_limit,
          profile: r.data.activity.profile,
          state:r.data.activity.state
        })
        console.log(that.data)
      }
    })
  },
  chooseLocation: function () {
    var tmp = ['宿舍', '国家实验楼', '图书馆', '田径场','咏曼剧场','实验楼'];
    var that = this;
    wx.showActionSheet({
      itemList: tmp,
      itemColor: '#007aff',
      success(res) {
          that.setData({
            location: tmp[res.tapIndex]
          })
        that.onShow();
        if (that.data.location == '田径场') {
          that.setData({
            latitude: wx.getStorageSync('TJClatitude'),
            longitude: wx.getStorageSync('TJClongitude')
          })
        } else if (that.data.location == '咏曼剧场') {
          that.setData({
            latitude: wx.getStorageSync('YMlatitude'),
            longitude: wx.getStorageSync('YMlongitude')
          })
        } else if (that.data.location == '实验楼') {
          that.setData({
            latitude: wx.getStorageSync('SYLlatitude'),
            longitude: wx.getStorageSync('SYLlongitude')
          })
        } else if (that.data.location == '图书馆') {
          that.setData({
            latitude: wx.getStorageSync('TSGlatitude'),
            longitude: wx.getStorageSync('TSGlongitude')
          })
        } else if (that.data.location == '宿舍') {
          that.setData({
            latitude: wx.getStorageSync('SSlatitude'),
            longitude: wx.getStorageSync('SSlongitude')
          })
        } else if (that.data.location == '国家实验楼') {
          that.setData({
            latitude: wx.getStorageSync('GSlatitude'),
            longitude: wx.getStorageSync('GSlongitude')
          })
        }
      }
    })
 
  },
  formSave: function (e) {
    console.log('formSubmit')
    console.log('form发生了submit事件，携带数据为：', e)
    var start_time = ''
    start_time += e.detail.value.pickerStartDate
    start_time += ' '
    start_time += e.detail.value.pickerStartTime
    var start_time_clone = JSON.parse(JSON.stringify(start_time))

    var end_time = ''
    end_time += e.detail.value.pickerEndDate
    end_time += ' '
    end_time += e.detail.value.pickerEndTime
    var end_time_clone = JSON.parse(JSON.stringify(end_time))
    var t = new Date()
    var year = t.getFullYear()
    var month
    var day
    if (t.getMonth()<9)
      month = '0'+(t.getMonth() + 1)
    else
      month = t.getMonth() + 1
    if (t.getDate()<10)
      day = '0' + t.getDate()
    else
      day = t.getDate()
      var date = year + '-' + month + '-' + day
    console.log(e.detail.value.pickerStartDate)
    console.log(date)
    if (e.detail.value.pickerStartDate <= date)
    {
      wx.showModal({
        title: '保存失败',
        content: '开始时间不能早于第二天',
      })
    }
    else if (start_time >= end_time)
    {
        wx.showModal({
          title: '保存失败',
          content: '开始时间不能晚于结束时间',
        })
    }else{
    console.log(wx.getStorageSync('org_id'))
    console.log(e.detail.value.inputName)
    console.log(start_time)
    console.log(end_time)
    console.log(e.detail.value.profile)
    console.log(this.data.location)
    console.log(e.detail.value.inputPlace)
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    console.log(e.detail.value.inputNumber)

    wx.request({

      url: 'http://123.206.94.45/CampusMap/ModifyActivity',
      data: {
        id: wx.getStorageSync('activity_id'),          
        name: e.detail.value.inputName,
        start_time: start_time_clone,
        end_time: end_time_clone,
        profile: e.detail.value.profile,     
        location: this.data.location,
        place: e.detail.value.inputPlace,       
        latitude: this.data.latitude,    
        longitude: this.data.longitude,  
        number_limit: e.detail.value.inputNumber,
        limit : 0.1
      },

      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success: function (r) {
        console.log(r.data)
        wx.navigateBack({
          url: '../corporationIssueRecords/corporationIssueRecords',
        })
      }
    })

    }
  },

  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  placeInput: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  startDatePicker: function (e) {
    this.setData({
      startDate: e.detail.value
    })
  },
  startTimePicker: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  endDatePicker: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  endTimePicker: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  numberInput: function (e) {
    this.setData({
      num: e.detail.value
    })
  },
  boyaSwitch: function (e) {
    this.setData({
      boya: e.detail.value
    })
  },
  profileInput: function (e) {
    this.setData({
      profile: e.detail.value
    })
  },
  messageSubmit: function (e) {
    if (this.data.name == undefined)
    {
      this.setData({
        name: ''
      })
    }
    if (this.data.place == undefined) {
      this.setData({
        place: ''
      })
    }
    if (this.data.startDate == undefined) {
      this.setData({
        startDate: this.data.tem,
      })
    }
    if (this.data.startTime == undefined) {
      this.setData({
        startTime: '12:00'
      })
    }
    if (this.data.endDate == undefined) {
      this.setData({
        endDate: this.data.tem,
      })
    }
    if (this.data.endTime == undefined) {
      this.setData({
        endTime: '12:00'
      })
    }
    if (this.data.num == undefined) {
      this.setData({
        num: 0
      })
    }
    if (this.data.profile == undefined) {
      this.setData({
        profile: ''
      })
    }
    var start_time = ''
    start_time += this.data.startDate
    start_time += ' '
    start_time += this.data.startTime

    var end_time = ''
    end_time += this.data.endDate
    end_time += ' '
    end_time += this.data.endTime
    var t = new Date()
    var year = t.getFullYear()
    var month
    var day
    if (t.getMonth() < 9)
      month = '0' + (t.getMonth() + 1)
    else
      month = t.getMonth() + 1
    if (t.getDate() < 10)
      day = '0' + t.getDate()
    else
      day = t.getDate()
    var date = year + '-' + month + '-' + day
    console.log(this.data.startDate)
    console.log(date)
    if (this.data.startDate <= date) {
      wx.showModal({
        title: '保存失败',
        content: '开始时间不能早于第二天',
      })
    }
    else if (start_time >= end_time) {
      wx.showModal({
        title: '保存失败',
        content: '开始时间不能晚于结束时间',
      })
    } else {
    console.log(this.data.name)
    console.log(this.data.place)
    console.log(this.data.startDate)
    console.log(this.data.startTime)
    console.log(this.data.endDate)
    console.log(this.data.endTime)
    console.log(this.data.num)
    console.log(this.data.profile)


    wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifyActivity',
      data: {
        id: wx.getStorageSync('activity_id'),
        name: this.data.name,
        start_time: start_time,
        end_time: end_time,
        profile: this.data.profile,
        location: this.data.location,
        place: this.data.place,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        number_limit: this.data.num,
        limit: 0.1
      },

      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'http://123.206.94.45/CampusMap/SubmitActivity',
          data: {
            id: wx.getStorageSync('activity_id')
          },

          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (r) {
            console.log(wx.getStorageSync('activity_id'))
            console.log(r.data)
            if(r.data.code == 1)
            {
              wx.navigateBack({
                url: '../corporationIssueRecords/corporationIssueRecords',
              })
            }
            else  {
              wx.showToast({
                title: r.data.msg,
                image: '/img/false.png'
              })
            }
            
          }
        })
      }
    })

    }
  },
  activityDelete:function(e){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/DeleteActivity',
      data: {
        activity_id: wx.getStorageSync('activity_id')
      },

      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (r) {

          console.log(r.data)
          wx.showToast({
            title: '删除活动成功',
          })
        wx.navigateBack({
          url: '../corporationIssueRecords/corporationIssueRecords',
        })
      }
    }) 
  },



  clear: function () {
    this.setData({
      locationAddress: '未选择位置'
    })
  },
  bindStartDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  check:function(e){
    var date = new Date;
    var time = date
  }
})
