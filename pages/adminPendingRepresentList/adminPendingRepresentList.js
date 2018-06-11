// pages/pendingRepresentList/pendingRepresentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],
  },
  onLoad:function(options){
    var that = this;
    var items = [];
    wx.request({
      url: 'http://123.206.94.45/CampusMap/getExaminingActivity',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        for (var i = 0;i < r.data.list.length;i++){
          var tmp = new Object();
          tmp.id = r.data.list[i].id;
          tmp.org_id = r.data.list[i].org_id;
          tmp.student_id = r.data.list[i].student_id;
          tmp.student_name = r.data.list[i].student_name;
          tmp.org_name = r.data.list[i].org_name;
          tmp.hidden = true
          items.push(tmp)
          that.setData({
            items: items
          })
        }
      }
    })
  },
  associationItemClick:function(e){
    var index = e.target.dataset.index;
    console.log(index)
    var tmp = this.data.items;
    for (var i = 0;i < tmp.length;i++){
      if (tmp[i].id == index && !tmp[i].hidden){
        tmp[i].hidden = true;
      }else if(tmp[i].id == index && tmp[i].hidden){
        tmp[i].hidden = false;
      }else{
        tmp[i].hidden = true;
      }
    }
    this.setData({
      items:tmp
    })
  },
  agree:function(e){
    var index = e.target.dataset.index;

    var items = [];
    var that = this;
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ExamineAlter',
      data:{
        id:index,
        action:1
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:function(r){
        wx.request({
          url: 'http://123.206.94.45/CampusMap/getExaminingActivity',
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            for (var i = 0; i < res.data.list.length; i++) {
              var tmp = new Object();
              tmp.id = res.data.list[i].id;
              tmp.org_id = res.data.list[i].org_id;
              tmp.student_id = res.data.list[i].student_id;
              tmp.student_name = res.data.list[i].student_name;
              tmp.org_name = res.data.list[i].org_name;
              tmp.hidden = true
              items.push(tmp)
              that.setData({
                items: items
              })
            }
          }
        })
      }
    })
  },
  deny:function(e){
    var index = e.target.dataset.index;
    var items = [];

    var that = this;
    wx.request({
      url: 'http://123.206.94.45/CampusMap/ExamineAlter',
      data: {
        id: index,
        action: 2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (r) {
        wx.request({
          url: 'http://123.206.94.45/CampusMap/getExaminingActivity',
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            for (var i = 0; i < res.data.list.length; i++) {
              var tmp = new Object();
              tmp.id = res.data.list[i].id;
              tmp.org_id = res.data.list[i].org_id;
              tmp.student_id = res.data.list[i].student_id;
              tmp.student_name = res.data.list[i].student_name;
              tmp.org_name = res.data.list[i].org_name;
              tmp.hidden = true
              items.push(tmp)
              that.setData({
                items: items
              })
            }
          }
        })
      }
   })
  }
})