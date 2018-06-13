Page({
  data: {
    inform_title:'',
    inform_detail:'',
    inform_text:'',
    inform_admin: '',
    notice_id:'',
    hide_button:true
  },
  onLoad: function (options) {
    this.setData({
      notice_id : options.inform_id
    })
   var that = this
    var identity = wx.getExtConfigSync("identity")
    var hide_button
    if(identity = 'admin') hide_button = false
    else hide_button = true
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/getNotice',
      method: "POST",
      data:{
        id: options.inform_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          inform_title : res.data.title,
        inform_detail : res.data.time,
          inform_text : res.data.content,
        inform_admin : res.data.admin
        })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  delete: function () {
    wx.request({
      url: 'http://123.206.94.45/CampusMap/DeleteNotice',
      data: {
        notice_id: this.notice_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        wx.showToast({
          title: '删除成功',
        })
        wx.navigateBack({
          url: '../syInfo/syInfo'
        })
      }
    })
  }

})