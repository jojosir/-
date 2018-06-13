// pages/counsellorActivityList/counsellorActivityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [],
    activities: [],
    showOrNot:true
  },
  /*data: {
    item: [],
    items: [],
    showOrNot:''  //如果是组织管理员就不显示，如果为组织代表就显示
  },
  /*本系学生参加过的所有活动
    /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
  },
  onShow: function (options) {

    if (wx.getStorageSync('curIdentity').identity == 'org_owner') {
      this.setData({
        showOrNot : true
      })
      
    }
    else if (wx.getStorageSync('curIdentity').identity == 'org_manager') {
      this.setData({
        showOrNot: false
      })
    }

    var that = this
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ActivityListFromORG',
      data: {
        org_id: wx.getStorageSync('org_id')
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        console.log(r.data)
        var activities = [];
        for (var i = 0; i < r.data.length; i++) {
          var state = ''
          if (!r.data[i].is_submitted)
          {
            state += '未发布'
          }
          else if (!r.data[i].is_approved)
          {
            state += '待审批'
          }
          else if (!r.data[i].is_started) 
          {
            state += '已发布'
          }
          else if (!r.data[i].is_ended) {
            state += '进行中'
          }
          else if (r.data[i].is_started) {
            state += '已结束'
          }
          that.setData({
            activity: [{
              name: r.data[i].name,
              id: r.data[i].id,
              state: state
            }]
          })
          activities.push(that.data.activity[0])
        }
        that.setData({
          activities: activities
        })
      }
    })
  },
  createActivity:function(e){
    wx.navigateTo({
      url: '../corporationCreateActivity/corporationCreateActivity',
    })
  },
  activityItemClick:function(e){
    console.log(e)
    wx.setStorageSync('activity_id', this.data.activities[e.target.dataset.index].id)
    if (this.data.activities[e.target.dataset.index].state == '未发布')
    {
      wx.navigateTo({
        url: '../corporationReviseActivity/corporationReviseActivity'
      })
    }
    else
    {
      wx.navigateTo({
        url: '../activityInfo/activityInfo'
      })
    }
  }


})