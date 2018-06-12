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
      url: 'http://123.206.94.45/CampusMap/StudentManager',
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
  modifyAdmin:function(e){
    wx.navigateTo({
      url: '../modifyActivityAdmin/modifyActivityAdmin?id=' + this.data.admins[e.target.dataset.index].adminID
    })
  },
  addAdmin: function (e) {
    console.log(this.data.adminID)
    wx.request({
      url: 'http://123.206.94.45/CampusMap/setActicityAdmin',
      data: {
        org_id: wx.getStorageSync('org_id'),
        student_id: this.data.adminID
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        if (r.data.code == 18) {
          wx.showToast({
            title: '该学生已是该组织管理员',
            image: '/img/false.png'
          })
        }
        else if (r.data.code == 1) {
          wx.showToast({
            title: '学号不存在',
            image: '/img/false.png'
          })
        }  
        else if (r.data.code == 19) {
          wx.showToast({
            title: '超过管理员上限',
            image: '/img/false.png'
          })
        }       
        else if (r.data.code == 0)
        {
          wx.showToast({
            title: '添加成功'
          })
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
      url: 'http://123.206.94.45/CampusMap/CancelActicityAdmin',
      data: {
        org_id: wx.getStorageSync('org_id'),
        student_id: this.data.adminID
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        if (r.data.code == 21) {
          wx.showToast({
            title: '该学生不是组织管理员',
            image: '/img/false.png'
          })
        }
        else if (r.data.code == 0) {
          wx.showToast({
            title: '删除成功'
          })
          wx.redirectTo({
            url: '../corporationCreateAdmin/corporationCreateAdmin',
          })
        }
      }
    })
  },
})