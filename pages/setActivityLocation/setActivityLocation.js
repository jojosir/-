
var util = require('../../utils/util.js')
var formatLocation = util.formatLocation
Page({
  data: {
    hasLocation: false,

    activityLocation:[]
  },
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
        that.data.activityLocation.push(res);
        wx.setStorageSync('location', that.data.activityLocation);
        console.log(wx.getStorageSync('location'));


        
      }
    })
  },
  clear: function () {
    this.setData({
      hasLocation: false
    })
  },
  backToMap: function(){
    wx.navigateTo({
      url: '../schoolMap/schoolMap'
    })
  }
})
