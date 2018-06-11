Page({
  data: {
    inform_title:'',
    inform_detail:'',
    inform_text:'',
    inform_id: 0,
    hide_button:true
  },
  onLoad: function () {

    var identity = wx.getExtConfigSync(identity)
    var hide_button
    if(identity = 'admin') hide_button = false
    else hide_button = true
    wx: wx.request({
      url: '',
      method: "POST",
      data:{
        id: wx.getStorageSync('inform')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        inform_title = res.data.title
        inform_detail = res.data.detail
        inform_text = res.data.text
        inform_id = res.data.text.id
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  delete: function () {
    wx.request({
      url: '',
      data: {
        inform_id: wx.getStorageSync('student_id')
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
          url: '../SyInfo/SyInfo'
        })
      }
    })
  }

})