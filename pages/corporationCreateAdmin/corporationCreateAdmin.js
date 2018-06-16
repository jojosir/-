Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    opacity:0.4,
    admin:[],
    admins: [],
    adminID:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    var that = this
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getRepresentative',
      data: {
        org_id: wx.getStorageSync('org_id'),
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)

        var admins = [];
        
        for (var i = 0; i < r.data.list.length; i++) {
          that.setData({
            admin: [{
              id: r.data.list[i].id,
              name: r.data.list[i].name
            }]
          })

          admins.push(that.data.admin[0]);
        }
        that.setData({
          admins: admins
        });
      }
    })
  },
  inputID:function(e){
    this.setData({
      adminID: e.detail.value,
      disabled: false,
      opacity: 1
    })
    if (e.detail.value == '') {
      this.setData({
        disabled: true,
        opacity: 0.4
      })
    }
  },
  addAdmin: function (e) {
    console.log(this.data.adminID)
    wx.request({
      url: 'http://123.206.94.45/CampusMap/AlterStudentRole',
      data: {
        org_id: wx.getStorageSync('org_id'),
        student_id: this.data.adminID,
        operation: 1,
        role: 0,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var msg = r.data.msg
        wx.showToast({
          title: msg,
          image: '/img/false.png'
        })
        if (r.data.code == 1) {
          wx.redirectTo({
            url: '../corporationCreateAdmin/corporationCreateAdmin',
          })
        }
      }
    })
  },
  deleteAdmin: function (e) {
    console.log(this.data.adminID)
    wx.request({
      url: 'http://123.206.94.45/CampusMap/AlterStudentRole',
      data: {
        org_id: wx.getStorageSync('org_id'),
        student_id: this.data.adminID,
        operation: 0,
        role: 0,
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var msg = r.data.msg
        wx.showToast({
           title: msg,
          image: '/img/false.png'
        })
        if (r.data.code == 1) {
          wx.redirectTo({
            url: '../corporationCreateAdmin/corporationCreateAdmin',
          })
        }
      }
    })
  },
})