Page({
  data: {
    longitude: 116.2705,
    latitude: 40.1535,
    scale: 17,
    hidden:false,
    markers: [
      {
        iconPath: "/img/1.png",
        id: 1,
        latitude: wx.getStorageSync('TJClatitude'),
        longitude: wx.getStorageSync('TJClongitude'),
        width: 30,
        height: 30,
        label: { content: "田径场" },
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        },
      },
      {
        //设置活动场地——咏曼剧场
        iconPath: "/img/2.png",
        id: 2,
        latitude: wx.getStorageSync('YMlatitude'),
        longitude: wx.getStorageSync('YMlongitude'),
        width: 30,
        height: 30,
        label: { content: "咏曼剧场" },
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        }
      },
      {
        //设置活动场地——图书馆
        iconPath: "/img/3.png",
        id: 3,
        latitude: wx.getStorageSync('TSGlatitude'),
        longitude: wx.getStorageSync('TSGlongitude'),
        width: 30,
        height: 30,
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        },
        label: { content: "图书馆" }
      },
      {//设置活动场地——实验楼
        iconPath: "/img/4.png",
        id: 4,
        latitude: wx.getStorageSync('SYLlatitude'),
        longitude: wx.getStorageSync('SYLlongitude'),
        width: 30,
        height: 30,
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        }
        , label: { content: "实验楼" }
      },
      {
        //设置活动场地——宿舍
        iconPath: "/img/5.png",
        id: 5,
        latitude: wx.getStorageSync('SSlatitude'),
        longitude: wx.getStorageSync('SSlongitude'),
        width: 30,
        height: 30,
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        },
        label: { content: "宿舍" }
      },
      {
        iconPath: "/img/6.png",
        id: 6,
        latitude: wx.getStorageSync('GSlatitude'),
        longitude: wx.getStorageSync('GSlongitude'),
        width: 30,
        height: 30,
        callout: {
          content: '',
          borderRadius: 4,
          padding: 4,
          bgColor: '#ffffff',
          display: 'ALWAYS'
        },
        label: { content: "国家实验楼" }
      }
    ]
  },
  bindmarkertap:function(e){
  console.log(e)
  var value
  switch (e.markerId){
    case 1: value = "田径场"
      break
    case 2: value = "咏曼剧场" 
      break
    case 3: value = "图书馆"
      break
    case 4: value = "实验楼"
      break
    case 5: value = "宿舍"
      break
    case 6: value = "国家实验楼"
      break
  }
  wx.setStorageSync('location', value)
  wx.reLaunch({
    url: '../studentChooseActivity/studentChooseActivity',
  })
  },
  location() {
    console.log('123')
    var that = this
    wx.getLocation({
      type: "gcj02", // 坐标系类型
      // 获取经纬度成功回调
      success: function(res){ // es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象
        console.log(res)
        that.setData({  // 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
          longitude: res.longitude,
          latitude: res.latitude,
          scale: 19
        })
      },
      fail:function(e){
        console.log(e)
      }
      
    });
  },
  school() {
    this.setData({
      longitude: 116.2705,
      latitude: 40.1535,
      scale: 17
    })
  },
  movetoPosition: function () {
    this.mapCtx.moveToLocation();
  },
  onHide:function(){
    this.setData({
      hidden: true
    })
  },
  onLoad: function (options) {
    this.setData({
      hidden:false
    })
    var that = this
    // 获取系统信息
    wx.showTabBar({

    })
    /*wx.showModal({
      title: '活动进行中，已无法报名！',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })*/
  },
  onShow: function () {
    this.setData({
      hidden: false
    })
    var that = this
    //向服务器请求活动信息
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "田径场" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[0].callout.content': calloutContent
        });
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "咏曼剧场" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[1].callout.content': calloutContent
        })
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "图书馆" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[2].callout.content': calloutContent
        })
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "实验楼" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[3].callout.content': calloutContent
        })

      }
    })

    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "宿舍" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[4].callout.content': calloutContent
        })
      }
    })
    wx.request({//设置活动场地——国家实验楼
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { location: "国家实验楼" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        //读取活动列表内容
        var calloutContent = ''
        for (var i = 0; i < r.data.list.length; i++) {
          calloutContent += r.data.list[i].name
          calloutContent += "-"
          calloutContent += r.data.list[i].place
          calloutContent += "-"
          var time = ''
          var startDate = r.data.list[i].start_time.toString().substr(0, 10)
          var endDate = r.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = r.data.list[i].start_time.toString().substr(5, 11);
            var endTime = r.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          calloutContent += time
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          'markers[5].callout.content': calloutContent
        })
      }
    })


  },
  /*  SARClick: function (e) {
      //进入活动记录页面
      wx.reLaunch({
        url: '../studentActivityRecards/studentActivityRecards',
      })
    },*/
  ALClick: function (e) {
    //进入活动列表页面
    wx.reLaunch({
      url: '../activitiesList/activitiesList',
    })
  }


})


