// pages/modifyActivityAdmin/modifyActivityAdmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '',
      method:'POST',
      data:{
        student_id:wx.getStorageSync('student_id'),
        org_id: wx.getStorageSync('org_id')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        var tmp = res.data.activities//需要获取该组织所有活动的名称、id和该管理员的权限
        this.setData({
          activities: tmp
        })
      }
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
  btnAgreeClick:function(){
    wx.request({
      url: '',//上传修改
      method: 'POST',
      data: {
        student_id: wx.getStorageSync('student_id'),
        activities: this.data.activities
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        wx.showToast({
          title: '修改成功',
          icon:'success'
        })
        wx.reLaunch({
          url: '../corporationCreateAdmin/corporationCreateAdmin',
        })
      }
    })
  },
  btnDenyClick:function(){
    wx.showModal({
      title: '系统提示',
      content: '是否放弃修改',
      success: function (res) {
        if (res.confirm) wx.reLaunch({
          url: '../corporationCreateAdmin/corporationCreateAdmin',
        })
      },
      fail: {}
    })
  },
  changeSwitch:function(e){
    var tmp = this.data.activities
    tmp[e.target.dataset.index] = e.detail.value
    this.setData({
      activities: tmp
    })
  }
})