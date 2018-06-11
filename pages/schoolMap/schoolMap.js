
Page({
  data:{
    clickMarker:false,
    activityLocation:[],
    markers:[],
    marker:[],
    controls:[]

},
onShow: function () {
  var that = this

  wx.getSystemInfo({
    success: function (r) {
      that.setData({
        controls: [{
          id: 1,
          iconPath: '/img/curlocation.png',
          position: {
            left: 20,
            top: r.windowHeight - 80,
            width: 50,
            height: 50
          },
          clickable: true
        },
        {
          id: 2,
          iconPath: '/img/activity.png',
          position: {
            left: r.windowWidth - 70,
            top: r.windowHeight - 80,
            width: 50,
            height: 50
          },
          clickable: true
        }]
      })
    }
  });



  wx.request({
    url: 'https://38697963.qcloud.la/CampusMap/ActivityMap',
    data: {},
    method: "GET",
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (r) {
      console.log(r.data)

      var markers = [];
      for (var i = 0; i < r.data.list.length; i++) {
        var single = true
        if (r.data.list[i].activity.length > 1)
          single = false
        var labelContent = ''
        var calloutContent = ''
        for (var j = 0; j < r.data.list[i].activity.length; j++) {
          labelContent += r.data.list[i].activity[j].name
          labelContent += '\n'

          calloutContent += r.data.list[i].activity[j].name
          calloutContent += " "
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += " "

          var startDate = r.data.list[i].activity[j].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].activity[j].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].activity[j].end_time.toString().substr(11, 5);
            calloutContent += startTime
            calloutContent += '-'
            calloutContent += endTime
          }
          else {
            var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].activity[j].end_time.toString().substr(5, 11);
            calloutContent += startTime
            calloutContent += '-'
            calloutContent += endTime
          }
          calloutContent += ' 报名人数：'
          calloutContent += r.data.list[i].activity[j].current_number
          calloutContent += '/'
          calloutContent += r.data.list[i].activity[j].number_limit
          calloutContent += '\n'
        }
        //var date = this.data.startDate.toString();
        //var tem = date.substr(0, 10);
        that.setData({
          marker: [{
            id: i,
            activity_id: r.data.list[i].activity[0].id,
            longitude: r.data.list[i].longitude,
            latitude: r.data.list[i].latitude,
            location: r.data.list[i].location,
            iconPath: '/img/location.png',
            single: single,
            label: {
              content: labelContent,

            },
            callout: {
              content: calloutContent,
              borderRadius:15,
              color:'#ffffff',
              padding:15,
              bgColor:'#4fc3f7',
              display:'BYCLICK'

            }
          }]
        })

        markers.push(that.data.marker[0]);
      }
      that.setData({
        markers: markers
      });
    }
  })


  console.log('student_id:'+wx.getStorageSync('student_id'))
  console.log(wx.getStorageSync('identity'))
  console.log(wx.getStorageSync('curIdentity'))


},
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap');
    //this.mapCtx.moveToLocation();
    this.setData({
      clickMarker:false
    })
  },
  bindtap: function(event){
    this.setData({
      clickMarker:false
    })
  }, 
  bindcontroltap:function(e){
    console.log(e)
    if (e.controlId == 1)
      this.mapCtx.moveToLocation()
    else if (e.controlId == 2)
    {
      this.goToManage()
    }
  },

  bindcallouttap:function(e){
    if (this.data.markers[e.markerId].single)
    {
      wx.setStorageSync('activity_id', this.data.markers[e.markerId].activity_id)
      wx.navigateTo({
        url: '../activityInfo/activityInfo'
      })
    }
    else
    {
      wx.setStorageSync('location', this.data.markers[e.markerId].location)

      wx.navigateTo({
        url: '../studentChooseActivity/studentChooseActivity'
      })
    }
  },

  bindmarkertap: function(e){

    this.setData({
      clickMarker:true
    });
    //console.log("work");
    /*var lon1,lon2,lat1,lat2;
    for (var i = 0;i < this.data.activityLocation.length;i++)
    {
      if (this.data.markers[i].id === e.markerId)
      {
        console.log("标记lon:"+this.data.markers[i].longitude );
        console.log("标记lat:"+this.data.markers[i].latitude );
        lon1=parseFloat(this.data.markers[i].longitude);
        lat1=parseFloat(this.data.markers[i].latitude);
      }
    }
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        // success
        lon2=res.longitude;
        lat2=parseFloat(res.latitude);
        console.log("测试lon:"+lon2);
        console.log("测试lat:"+lat2);

        var hsinX = Math.sin((lon1 - lon2) * 0.5 * Math.PI / 180);      
        var hsinY = Math.sin((lat1 - lat2) * 0.5 * Math.PI / 180);         
        var h = hsinY * hsinY + (Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * hsinX * hsinX);         
        var dis = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)) * 6367000;

        console.log("距离："+dis);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })*/
  },
  goToManage:function(){
    var curIdentity = wx.getStorageSync('curIdentity')
    if (curIdentity.identity == 'student')
    {
      wx.navigateTo({
        url: '../studentManage/studentManage'
      })
    }
    else if (curIdentity.identity == 'org_owner')
    {
      wx.setStorageSync('org_id', curIdentity.org_id)
      wx.navigateTo({
        url: '../studentRepresentManage/studentRepresentManage'
      })
    }
    else if (curIdentity.identity == 'org_manager') {
      wx.setStorageSync('org_id', curIdentity.org_id)
      wx.navigateTo({
        url: '../studentAdminManage/studentAdminManage'
      })
    }
    else if (curIdentity.identity == 'counsellor') {
      wx.navigateTo({
        url: '../counsellorManage/counsellorManage'
      })
    }
    else if (curIdentity.identity == 'admin') {
      wx.navigateTo({
        url: '../adminManage/adminManage'
      })
    }
  },
    goToStudent: function(){
    wx.navigateTo({
      url: '../studentManage/studentManage'
      
    })
  },
  goToCounsellor: function(){
    wx.navigateTo({
      url: '../counsellorManage/counsellorManage'
    })
  },
  goToOrganizer: function(){
    wx.navigateTo({
      url: '../studentRepresentManage/studentRepresentManage'
    })
  },
  goToStudentAdmin: function(){
    wx.navigateTo({
      url: '../studentAdminManage/studentAdminManage'
    })
  },
  goToAdmin: function(){
    wx.navigateTo({
      url: '../adminManage/adminManage'
    })
  }

})