Page({
  data: {
    items: []
  },
  onLoad: function () {
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/getNoticeList',
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
  click_inform: function(e){
    wx.setStorageSync("inform", data)
    wx: wx.navigateTo({
      url: '../inform/inform?inform_id=' + this.data.items[e.target.dataset.index].inform_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  
})
