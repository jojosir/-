// pages/counsellorActivityList/counsellorActivityList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: [],
    items: [],
    resultItems:[],
    switchOpacity:0.5,
    switchShow:'',
    searchKey:''
  },
/*本系学生参加过的所有活动
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/getAllActivity',
      method: "GET",
      data: {
        flag: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data);
        var tmpItems = [];
        for (var i = 0;i < res.data.list.length;i++){
          var tmp = new Object();
          tmp.activity_id = res.data.list[i].activity_id
          tmp.activity_name = res.data.list[i].activity_name
          var time = ''
          var startDate = res.data.list[i].start_time.toString().substr(0, 10)
          var endDate = res.data.list[i].end_time.toString().substr(0, 10)
          if (startDate == endDate) {
            var startTime = res.data.list[i].start_time.toString().substr(5, 11);
            var endTime = res.data.list[i].end_time.toString().substr(11, 5);
            time += startTime
            time += '-'
            time += endTime
          }
          else {
            var startTime = res.data.list[i].start_time.toString().substr(5, 11);
            var endTime = res.data.list[i].end_time.toString().substr(5, 11);
            time += startTime
            time += '-'
            time += endTime
          }
          tmp.time = time
          tmpItems.push(tmp);
          that.setData({
            items:tmpItems
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  activityItemClick:function(e){
    wx.navigateTo({
      url: '../counsellorCurActivityStudentList/counsellorCurActivityStudentList?activity_id='+e.target.dataset.index,
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      switchShow:'none'
    });
    console.log("showInput");
  },
  hideInput: function () {
    this.setData({
      inputValue: "",
      inputVal: "",
      showLoadMore: false,
      inputShowed: false,
      switchShow: ''
    });
  },
  clearInput: function () {
    this.setData({
      inputValue: "",
      inputVal: "",
      showLoadMore: false,
      hospitalList: []
    });
    console.log("clearInput");
  },
  inputTyping: function (e) {
    this.setData({
      searchKey: e.detail.value,
      page: 1,
    });
    if (e.detail.value.length == 0) {
      this.setData({
        hospitalList: [],
        showLoadMore: false,
      });
    }
    console.log("inputTyping");
  },
  changeOpacity:function(e){
    this.setData({
      switchOpacity:1
    })
  },
  searchAction:function(e){
    var tmp = [];
    var name = this.data.searchKey;
    for (var i = 0;i < this.data.items.length;i++){
      if (this.data.items[i].activity_name == name){
        tmp.push(this.data.items[i]);
      }
    }
    if (tmp.length == 0){
      wx.showToast({
        title: '查询无果',
        icon: '',
        image: '/img/false.png',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    this.setData({
      resultItems: tmp
    })
  },
  studentList:function(e){
    wx:wx.navigateTo({
      url: '../counsellorCurActivityStudentList/counsellorCurActivityStudentList?activity_id='+e.target.dataset.index,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})