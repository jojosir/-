Page({
  data: {
    items: []
  },
  onShow: function () {
    var that = this
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
          tmp.id = res.data.list[i].id
          tmp.detail = res.data.list[i].time
          tmpItems.push(tmp);
        }
          that.setData({
            items: tmpItems
          }) 
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  click_inform: function(e){
    console.log('need' + e.target.dataset.index)
    console.log(this.data.items[e.target.dataset.index].id)
    wx: wx.navigateTo({
      url: '../inform/inform?inform_id=' + this.data.items[e.target.dataset.index].id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
  
})
