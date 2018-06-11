Page({

  /**
   * 页面的初始数据
   */
  data: {
    openFlag: false,
    items:[],
    inputShowed: false,
    inputVal: "",
    hospitalList: [],
    page: 1,
    total: 0,
    scrollHeight: 0,
    showLoadMore: false,
    showNoMore: false,
    inputValue: '',
    searchFlag:false,
    searchKey:'',
    resultItems:[],
  },
  onLoad:function(e){
    var that = this
    wx.request({
      url: 'https://38697963.qcloud.la/CampusMap/StudentList',
      data: {
        counsellor_id:wx.getStorageSync('curIdentity').id
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        wx.setStorageSync("studentList",res.data.list);
        that.setData({
          items: res.data.list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  showFilter: function (e) {
    for (var i = 1; i <= 100; i++) {
      console.log('caonima');
    }
    if (this.data.openFlag == false)
      this.setData({
        openFlag: true
      })
    else
      this.setData({
        openFlag: false
      })

  },
  hiddenFilter: function (e) {
    this.setData({
      openFlag: false
    })
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
    });
    console.log("showInput");
  },
  hideInput: function () {
    this.setData({
      inputValue: "",
      inputVal: "",
      showLoadMore: false,
      inputShowed: false
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
      page: 1,
      searchKey: e.detail.value
    });
    if (e.detail.value.length == 0) {
      this.setData({
        hospitalList: [],
        showLoadMore: false,
      });
    }
    console.log("inputTyping");
    
  },
  searchAction:function(e){
    var tmp = [];
    console.log(this.data.searchKey)
    console.log(this.data.items);
    for (var i = 0; i < this.data.items.length; i++) {
      if (this.data.items[i].name == this.data.searchKey || this.data.items[i].id == this.data.searchKey ) {
          tmp.push(this.data.items[i])
        }
    }
    this.setData({
      resultItems:tmp
    })
    if(this.data.resultItems.length == 0){
      wx:wx.showToast({
        title: '查询无果',
        icon: '',
        image: '/img/no.png',
        duration: 0,
        mask: true,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    console.log(this.data.resultItems)
  },
  studentActivityList:function(e){
    wx:wx.navigateTo({
        url: '../counsellorCurStudentActivityList/counsellorCurStudentActivityList?student_id='+e.target.dataset.index,
        success: function(r) {
        },
        fail: function(r) {},
        complete: function(r) {},
    })
  },  
})