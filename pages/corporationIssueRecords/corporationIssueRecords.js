// pages/counsellorActivityList/counsellorActivityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity: [],
    activities: [],
    org_name: wx.getStorageSync('org_name'),
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

    if (wx.getStorageSync('curIdentity') == 5) {
      this.setData({
        showOrNot : true
      })
      
    }
    else if (wx.getStorageSync('curIdentity') == 4) {
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
        console.log(wx.getStorageSync('org_id'))
        wx.setStorageSync('org_name', r.data.org)
        var activities = [];
        for (var i = 0; i < r.data.list.length; i++) {
           that.setData({
            activity: [{
              id: r.data.list[i].id,
              name: r.data.list[i].name,
              state: r.data.list[i].state,
              profile: r.data.list[i].profile,
              start_time: r.data.list[i].start_time,
              end_time: r.data.list[i].end_time,
              location: r.data.list[i].location,
              place: r.data.list[i].place
            }]
          })
          activities.push(that.data.activity[0])
        }
        that.setData({
          activities: activities,
          org_name: wx.getStorageSync('org_name')
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
    if (this.data.activities[e.target.dataset.index].state == '暂未提交' || this.data.activities[e.target.dataset.index].state == '暂未发布')
    {
      wx.setStorageSync('reviseActivity', this.data.activities[e.target.dataset.index])
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