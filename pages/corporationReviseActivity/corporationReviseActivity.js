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
      locationAddress: '未选择位置',
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
    if (wx.getStorageSync('curIdentity').identity == 'org_owner') {
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
        if (r.data.activity.start_time != undefined)
        {
          var startDate = r.data.activity.start_time.toString().substr(0, 10)
          var startTime = r.data.activity.start_time.toString().substr(11, 16)
          var endDate = r.data.activity.end_time.toString().substr(0, 10)
          var endTime = r.data.activity.end_time.toString().substr(11, 16)
        }
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
        })
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

    console.log(wx.getStorageSync('org_id'))
    console.log(e.detail.value.inputName)
    console.log(start_time)
    console.log(end_time)
    console.log(e.detail.value.profile)
    console.log(this.data.locationAddress)
    console.log(e.detail.value.inputPlace)
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    console.log(e.detail.value.inputNumber)
    console.log(e.detail.value.boya)

    wx.request({

      url: 'http://123.206.94.45/CampusMap/ModifyActivity',
      data: {
        activity_id: wx.getStorageSync('activity_id'),          
        name: e.detail.value.inputName,
        start_time: start_time_clone,
        end_time: end_time_clone,
        profile: e.detail.value.profile,     
        location: this.data.locationAddress,
        place: e.detail.value.inputPlace,       
        latitude: this.data.latitude,    
        longitude: this.data.longitude,   
        number_limit: e.detail.value.inputNumber,
        is_boya: e.detail.value.boya
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


  },

/*
  formGo: function (e) {
    console.log('formGo')
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

    console.log(wx.getStorageSync('org_id'))
    console.log(e.detail.value.inputName)
    console.log(start_time)
    console.log(end_time)
    console.log(e.detail.value.profile)
    console.log(this.data.locationAddress)
    console.log(e.detail.value.inputPlace)
    console.log(this.data.latitude)
    console.log(this.data.longitude)
    console.log(e.detail.value.inputNumber)
    console.log(e.detail.value.boya)

    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/ModifyActivity',
      data: {
        activity_id: wx.getStorageSync('activity_id'),
        name: e.detail.value.inputName,
        start_time: start_time_clone,
        end_time: end_time_clone,
        profile: e.detail.value.profile,
        location: this.data.locationAddress,
        place: e.detail.value.inputPlace,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        number_limit: e.detail.value.inputNumber,
        is_boya: e.detail.value.boya
      },

      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'https://38697963.qcloud.la/CampusMap/SubmitActivity',
          data: {
            activity_id: wx.getStorageSync('activity_id')
          },

          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (r) {
            console.log(r.data)
            wx.navigateBack({
              url: '../corporationIssueRecords/corporationIssueRecords',
            })
          }
        })


      }
    })



  },
*/

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
    if (this.data.boya == undefined) {
      this.setData({
        boya: false
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

    console.log(this.data.name)
    console.log(this.data.place)
    console.log(this.data.startDate)
    console.log(this.data.startTime)
    console.log(this.data.endDate)
    console.log(this.data.endTime)
    console.log(this.data.num)
    console.log(this.data.boya)
    console.log(this.data.profile)


    wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifyActivity',
      data: {
        activity_id: wx.getStorageSync('activity_id'),
        name: this.data.name,
        start_time: start_time,
        end_time: end_time,
        profile: this.data.profile,
        location: this.data.locationAddress,
        place: this.data.place,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        number_limit: this.data.num,
        is_boya: this.data.boya
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
            activity_id: wx.getStorageSync('activity_id')
          },

          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          success: function (r) {
            console.log(r.data)
            if(r.data.code == 0)
            {
              wx.navigateBack({
                url: '../corporationIssueRecords/corporationIssueRecords',
              })
            }
            else if (r.data.code == 29) {
              wx.showToast({
                title: '信息填写不完整',
                image: '/img/false.png'
              })
            }
            else if (r.data.code == 25)
            {
              wx.showToast({
                title: '活动开始时间至少比当前时间晚一小时',
                image: '/img/false.png'
              })     
            }
            else if (r.data.code == 26) {
              wx.showToast({
                title: '活动结束时间过早',
                image: '/img/false.png'
              })
            }
          }
        })
      }
    })


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
  }
})
