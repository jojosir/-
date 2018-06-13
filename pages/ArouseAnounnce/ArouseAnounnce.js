Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin_id:0,
    disabled1:true,
    disabled2: true,
    title:"",
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
    if (e.detail.value.length >= 10){
      this.setData({
        inform_text: e.detail.value,
        disabled1: false
      })
    }
    else this.setData({
      inform_text: e.detail.value,
      disabled1:true
    })

  },
  settitle: function(e){
    if (e.detail.value.length > 0) {
      this.setData({
        title: e.detail.value,
        disabled2: false
      })
    }
    else this.setData({
      title: e.detail.value,
      disabled2: true
    })
  },
  submit:function(){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ArouseNotice',
      data:{
        admin_id: this.data.admin_id,
        text: this.data.inform_text,
        title: this.data.title
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '发布成功'
        }) 
        wx.switchTab({
          url: '../SyInfo/SyInfo',
        })
      }
    })
  },
  cancel:function(){
    wx.showModal({
      title: '系统提示',
      content: '是否放弃发布',
      success:function(res){
        if(res.confirm)wx.reLaunch({
          url: '../SyInfo/SyInfo',
        })
      },
      fail:{}
    })
  }
})