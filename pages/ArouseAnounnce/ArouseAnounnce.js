Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin_id:0,
    disabled:true,
    inform_text:'233',
  },
 
  onLoad: function () {
    if (this.data.inform_text == undefined) {
      this.setData({
        inform_text: ''
      })
    }

  },

  num_check:function(e){
    if (e.detail.value.length < 400){
      this.setData({
        inform_text: e.detail.value,
        disabled: true
      })
    }
    else this.setData({
      inform_text: e.detail.value,
      disabled:false
    })

  },
  submit:function(){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ArouseNotice',
      data:{
        admin_id: this.data.admin_id,
        text: this.data.inform_text
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data)

      }
    })
  },
  cancel:function(){
    wx.showModal({
      title: '系统提示',
      content: '是否放弃发布',
      success:function(res){
        wx.reLaunch({
          url: '../page/SyInfo/SyInfo',
        })
      },
      fail:{}
    })
  }
})