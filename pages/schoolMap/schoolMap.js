Page({
  data: {
    longitude: 116.2705,
    latitude: 40.1535,
    scale: 17,
    markers: [],

  }
  ,
  onLoad: function (options) {
    var that = this
    // 获取系统信息
    wx.showTabBar({

    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
        })
      }
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
  location() {
    wx.getLocation({
      type: "gcj02", // 坐标系类型
      // 获取经纬度成功回调
      success: (res) => { // es6 箭头函数，可以解绑当前作用域的this指向，使得下面的this可以绑定到Page对象
        this.setData({  // 为data对象里定义的经纬度默认值设置成获取到的真实经纬度，这样就可以在地图上显示我们的真实位置
          longitude: res.longitude,
          latitude: res.latitude,
          scale: 19
        })
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
  onShow: function () {
    var that = this
    //向服务器请求活动信息
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: {Location:"田径场"},
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
          for (var j = 0; j < r.data.activity.length; j++) {
            calloutContent += r.data.list[i].activity[j].name
            calloutContent += "-"
            calloutContent += r.data.list[i].activity[j].place
            calloutContent += "-"
              var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
              calloutContent += startTime
              calloutContent += '\n'
          }
          //在页面地图上显示活动信息
          that.setData({
            marker: [{
              iconPath: "/img/1.png",
              id: 1,
              latitude: 40.1520,
              longitude: 116.2758,
              width: 30,
              height: 30,
              label: { content: "田径场" },
              callout: {
                content: calloutContent,
                borderRadius: 4,
                padding: 4,
                bgColor: '#ffffff',
                display: 'ALWAYS'
              },
            }]
          })
          markers.push(that.data.marker[0]);
        
        that.setData({
          markers: markers
        });
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { Location: "咏曼剧场" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var j = 0; j < r.data.activity.length; j++) {
          calloutContent += r.data.list[i].activity[j].name
          calloutContent += "-"
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += "-"
          var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
          calloutContent += startTime
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          marker: [{
              //设置活动场地——咏曼剧场
            iconPath: "/img/2.png",
              id: 2,
              latitude: 40.1512,
              longitude: 116.2744,
              width: 30,
              height: 30,
              label: { content: "咏曼剧场" },
              callout: {
                content: calloutContent,
                borderRadius: 4,
                padding: 4,
                bgColor: '#ffffff',
                display: 'ALWAYS'
              }
            
          }]
        })
        markers.push(that.data.marker[0]);

        that.setData({
          markers: markers
        });
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { Location: "图书馆" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var j = 0; j < r.data.activity.length; j++) {
          calloutContent += r.data.list[i].activity[j].name
          calloutContent += "-"
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += "-"
          var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
          calloutContent += startTime
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          marker: [{
            //设置活动场地——图书馆
            iconPath: "/img/3.png",
            id: 3,
            latitude: 40.1518,
            longitude: 116.2717,
            width: 30,
            height: 30,
            callout: {
              content: calloutContent,
              borderRadius: 4,
              padding: 4,
              bgColor: '#ffffff',
              display: 'ALWAYS'
            },
            label: { content: "图书馆" }
          }]
        })
        markers.push(that.data.marker[0]);

        that.setData({
          markers: markers
        });
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { Location: "实验楼" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var j = 0; j < r.data.activity.length; j++) {
          calloutContent += r.data.list[i].activity[j].name
          calloutContent += "-"
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += "-"
          var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
          calloutContent += startTime
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          marker: [{//设置活动场地——实验楼
            iconPath: "/img/4.png",
            id: 4,
            latitude: 40.1508,
            longitude: 116.27,
            width: 30,
            height: 30,
            callout: {
              content: calloutContent,
              borderRadius: 4,
              padding: 4,
              bgColor: '#ffffff',
              display: 'ALWAYS'
            }
            , label: { content: "实验楼" }
          }]
        })
        markers.push(that.data.marker[0]);

        that.setData({
          markers: markers
        });
      }
    })
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { Location: "宿舍" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var j = 0; j < r.data.activity.length; j++) {
          calloutContent += r.data.list[i].activity[j].name
          calloutContent += "-"
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += "-"
          var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
          calloutContent += startTime
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          marker: [{
            //设置活动场地——宿舍
            iconPath: "/img/5.png",
            id: 5,
            latitude: 40.1550,
            longitude: 116.2738,
            width: 30,
            height: 30,
            callout: {
              content: calloutContent,
              borderRadius: 4,
              padding: 4,
              bgColor: '#ffffff',
              display: 'ALWAYS'
            },
            label: { content: "宿舍" }
          }]
        })
        markers.push(that.data.marker[0]);

        that.setData({
          markers: markers
        });
      }
    })
    wx.request({//设置活动场地——国家实验楼
      url: 'http://123.206.94.45/CampusMap/ActivityListFromLocation',
      data: { Location: "国家实验楼" },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var markers = [];
        //读取活动列表内容
        var calloutContent = ''
        for (var j = 0; j < r.data.activity.length; j++) {
          calloutContent += r.data.list[i].activity[j].name
          calloutContent += "-"
          calloutContent += r.data.list[i].activity[j].place
          calloutContent += "-"
          var startTime = r.data.list[i].activity[j].start_time.toString().substr(5, 11);
          calloutContent += startTime
          calloutContent += '\n'
        }
        //在页面地图上显示活动信息
        that.setData({
          marker: [{
            iconPath: "/img/6.png",
            id: 6,
            latitude: 40.1539,
            longitude: 116.2712,
            width: 30,
            height: 30,
            callout: {
              content:calloutContent,
              borderRadius: 4,
              padding: 4,
              bgColor: '#ffffff',
              display: 'ALWAYS'
            }
            , label: { content: "国家实验楼" }
          }]
        })
        markers.push(that.data.marker[0]);

        that.setData({
          markers: markers
        });
      }
    })
  },
  SARClick: function (e) {
    //进入活动记录页面
    wx.reLaunch({
      url: '../studentActivityRecards/studentActivityRecards',
    })
  },
  ALClick: function (e) {
    //进入活动列表页面
    wx.reLaunch({
      url: '../activityList/activityList',
    })
  }


})