// pages/counsellorCurActivityStudentList/counsellorCurActivityStudentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentID:null,
    allOrNull:'',
    canLeftSlide:true,
    checkItems:[],
    items:[],
    basicItems:[],
    resultItems: [],
    selectedItem:[],
    hiddenItemCheckbox:'none',
    hiddenSelectAll: 'none',
    hidden:true,
    delHidden:true,
    hiddenDeleteAlert: true,
    callFlag:true,
    switchChecked:false,
    unvalidOrAll:'只看无效',
    switchShow:'',
    delBtnWidth:360 //删除按钮宽度单位（rpx）
    ,stateWidth:'33%',
    createOrCancel:'添加',
    searchKey:'',
    activity_id:0,
    createAllOrNot:'全选',
    pendingStudent:[],
    createHidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var items = this.data.originItems;
    this.setData({
      items:items,
      activity_id: options.activity_id
    })
    var that = this;
    console.log(options.activity_id)
    wx:wx.request({
      url: 'http://123.206.94.45/CampusMap/getStudentInActivity',
      data: {
        counsellor_id: wx.getStorageSync('student_id'),
        activity_id:options.activity_id,
        student_id:0,
        arg:0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success: function(res) {
        console.log(wx.getStorageSync('student_id')) 
        console.log(options.activity_id)
        console.log(res)
        var items = [];
        for (var i = 0;i < res.data.list.length;i++){
          var tmp = new Object();
          tmp.ID = res.data.list[i].id;
          tmp.name = res.data.list[i].name; 
          tmp.txtStyle = 'left:0px';
          tmp.signin = res.data.list[i].signin;
          tmp.signout = res.data.list[i].signout;
         // if (res.data.list[i].is_valid){
            //tmp.imgPath= "/img/yes.png"
          //}else{
            //tmp.imgPath="/img/no.png"
          //}
          tmp.checked = false;
          items.push(tmp);
        }
        that.setData({
          items:items,
          basicItems:items
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  idInput:function(e){
    this.setData({
      studentID:e.detail.value
    })
  },
  confirm: function (e) {
    this.setData({
      hidden: true
    })
    var aItem = [{
       name:'小红',
       ID:this.data.studentID,
       txtStyle:'left:0px',
       imgPath:"/img/no.png"}
    ]
    var items = this.data.items;
    items.push(aItem[0]);
    this.setData({
      items:items
    })
    //添加一个学生到当前活动列表中 
  },
  cancel: function (e) {
    this.setData({
      hidden: true
    })
  },



 

  //获取元素自适应后的实际宽度
  getEleWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);//以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function () {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  delItem: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.items;
    var items = this.data.items;
    var that = this;
    var tmp = [];
    tmp.push(list[index].ID);
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
      data: {
        activity_id: this.data.activity_id,
        action: 2,
        list: tmp
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].ID == list[index].ID) {
            items.splice(i, 1)
          }
        }
        list.splice(index, 1)
        //更新列表的状态
        that.setData({
          items: list
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  changeItem:function(e){
    var list = [];
    var switchChecked=this.data.switchChecked
    if(!switchChecked){
      var list = this.data.basicItems;
    }else{
      for (var i = 0; i < this.data.basicItems.length;i++){
        if (this.data.basicItems[i].imgPath == '/img/no.png')
          list.push(this.data.basicItems[i])
      }
    }
      var index = e.target.dataset.index;   
      var tmp = [];
      tmp.push(list[index].ID);
      console.log(list[index].ID)
      if (list[index].imgPath == '/img/yes.png'){
        list[index].imgPath = '/img/no.png'
        wx: wx.request({
          url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
          data: {                                                  
            activity_id: this.data.activity_id,
            action:3,
            list:tmp
        },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else{
        list[index].imgPath = '/img/yes.png'
        wx: wx.request({
          url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
          data: {
            activity_id: this.data.activity_id,
            action:4,
            list: tmp
        },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res) {
            console.log(res);
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
      var txtStyle = 'left:0px'
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        items: list,
      });
      if(!switchChecked){
        this.setData({
          basicItems: list
        })
      }
  },
  showInput: function () {
    this.setData({
      inputShowed: true,
      resultItems:[]
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
      searchKey: e.detail.value,
      page: 1,
    });
    if (e.detail.value.length == 0) {
      this.setData({
        hospitalList: [],
        showLoadMore: false,
      });
    }
  },
  searchAction: function (e) {
    var tmp = [];
    console.log(this.data.searchKey)
    console.log(this.data.basicItems);
    for (var i = 0; i < this.data.basicItems.length; i++) {
      if (this.data.basicItems[i].name == this.data.searchKey || this.data.basicItems[i].ID == this.data.searchKey || this.data.basicItems[i].name.indexOf(this.data.searchKey) > - 1 || this.data.basicItems[i].ID.toString().indexOf(this.data.searchKey) > - 1 ) {
        tmp.push(this.data.basicItems[i])
      }
    }
    this.setData({
      resultItems: tmp
    })
    if (this.data.resultItems.length == 0) {
      wx: wx.showToast({
        title: '查询无果',
        icon: '',
        image: '/img/no.png',
        duration: 0,
        mask: true,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    console.log(this.data.resultItems)
  },
  studentActivityList: function (e) {
    wx: wx.navigateTo({
      url: '../counsellorCurStudentActivityList/counsellorCurStudentActivityList?student_id=' + e.target.dataset.index,
      success: function (r) {
      },
      fail: function (r) { },
      complete: function (r) { },
    })
  }, 
})