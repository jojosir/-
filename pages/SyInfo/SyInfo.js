Page({
  data: {
    items: []
  },
  onLoad: function () {
    wx: wx.request({
      url: '',
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var tmpItems = [];
        for (var i = 0; i < res.data.list.length; i++) {
          var tmp = new Object();
          tmp.title = res.data.list[i].title
          tmp.detail = res.data.list[i].detail
          tmp.id = res.data.list[i].id
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
  click_inform: function(){
    wx.setStorageSync(inform, data)
    wx: wx.navigateTo({
      url: '' + e.target.dataset.id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  
})
