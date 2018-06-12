Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_password:"",
    new_password:"",
    user_id:0,
    disabled1:true,
    disabled2:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id:wx.getStorageSync('user_id')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  oldInput: function(e){
    this.setData({
      old_password: e.detail.value
    })
    if (e.detail.value.length > 0) {
      this.setData({
        disabled1: false
      })
    }
    else {
      this.setData({
        disabled1: true
      })
    }
  },
  newInput: function (e) {
    this.setData({
      new_password: e.detail.value
    })
    if(e.detail.value.length > 0){
      this.setData({
        disabled2:false
      })
    }
    else{
      this.setData({
        disabled2: true
      })
    }
    
  },
  submit:function(){
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifyPassword',
      data:{
        old_password: this.data.old_password,
        new_password: this.data.new_password,
        id: wx.getStorageSync('student_id'),
        role: wx.getStorageSync('curIdentity')
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(r){
        var temp = r.data.code
        if (temp == 1)
          wx.showModal({
            title: '修改成功'

          }) 
        else wx.showModal({
          title: '修改失败',
          content: '密码错误',
        })
      }
    })
  },
  cancel: function () {
    wx.showModal({
      title: '系统提示',
      content: '是否放弃修改',
      success: function (res) {
        if (res.confirm) wx.switchTab({
          url: '../Manage/Manage',
        })
      },
      fail: {}
    })
  }
})