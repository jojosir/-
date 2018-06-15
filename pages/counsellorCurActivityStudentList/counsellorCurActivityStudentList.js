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
    this.initEleWidth();
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
        console.log(res)
        var items = [];
        for (var i = 0;i < res.data.list.length;i++){
          var tmp = new Object();
          tmp.ID = res.data.list[i].id;
          tmp.name = res.data.list[i].name; 
          tmp.txtStyle = 'left:0px';
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
  createClick:function(e){
    var that = this;
    var tmp = [];
    if(this.data.createOrCancel == '添加'){  
      wx:wx.request({
        url: 'http://123.206.94.45/CampusMap/getStudentList',
        data: {
          counsellor_id: wx.getStorageSync('curIdentity').id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'GET',
        success: function(res) {
          console.log(res.data);
          for (var i = 0;i < res.data.list.length;i++){
            var tmpItem = new Object();
            tmpItem.name = res.data.list[i].name;
            tmpItem.id = res.data.list[i].id;
            tmpItem.checked = false;
            tmp.push(tmpItem);
          }
          that.setData({
            checkItems:tmp
          })
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      that.setData({
        createHidden:false,
        createAllOrNot:'全选'
      })
    }else{
      that.setData({
        hiddenItemCheckbox: 'none',
        stateWidth: '33%',
        createOrCancel: '添加',
        switchShow: '',
        canLeftSlide: true,
        hiddenItemCheckbox: 'none',
        hiddenSelectAll: 'none',
        stateWidth: '33%',
        createOrCancel: '添加',
        callFlag: true,
        selectedItem: []
      })
    }

  },
  /*selectAllStu:function(e){
    var tmp = this.data.checkItems;
    var pending = []; 
    if (this.data.createAllOrNot == '全选'){ //选中所有学生
      this.setData({
        createAllOrNot:'取消全选'
      })
      for (var i = 0; i < tmp.length; i++) {
        tmp[i].checked = true;
        var id = parseInt(tmp[i].id);
        pending.push(id);
      }
      this.setData({
        pendingStudent:pending
      })
    }else{  //取消选中所有学生
      this.setData({
        createAllOrNot: '全选'
      })
      for (var i = 0; i < tmp.length; i++) {
        tmp[i].checked = false;
      }
      this.setData({
        pendingStudent: pending
      })
    }
    this.setData({
      checkItems: tmp
    })
  },*/
  createConfirm:function(e){
    var that = this;
    console.log(this.data.pendingStudent);
    wx:wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
      data: {
        activity_id:this.data.activity_id,
        action:1,
        list:this.data.pendingStudent
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function(res) {
        wx: wx.request({
          url: 'http://123.206.94.45/CampusMap/getStudentInAtivity',
          data: {
            counsellor_id: wx.getStorageSync('curIdentity').id,
            activity_id: that.data.activity_id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'GET',
          success: function (r) {
            var items = [];
            for (var i = 0; i < r.data.list.length; i++) {
              var tmp = new Object();
              tmp.ID = r.data.list[i].id;
              tmp.name = r.data.list[i].name;
              tmp.txtStyle = 'left:0px';
              if (r.data.list[i].is_valid) {
                tmp.imgPath = "/img/yes.png"
              } else {
                tmp.imgPath = "/img/no.png"
              }
              tmp.checked = false;
              items.push(tmp);
            }
            that.setData({
              items: items,
              basicItems: items,
              createHidden:true
            })
          },
          fail: function (r) { },
          complete: function (r) { },
        })
      },
    })
  },
  createCancel: function (e){
    this.setData({
      createHidden:true
    })
  },
  selectStu:function(e){
    console.log(e.detail.value)
    var that = this;
    var pending = [];
    for (var i = 0;i < e.detail.value.length;i++){
      var tmp = parseInt(e.detail.value[i])
      pending.push(tmp);
    }
    this.setData({
      pendingStudent:pending
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

  touchS: function (e) {
    if (this.data.canLeftSlide){
      if (e.touches.length == 1) {
        this.setData({
          //设置触摸起始点水平方向位置
          startX: e.touches[0].clientX
        });
      }
    }
  },
  touchM: function (e) {
    if (this.data.canLeftSlide){
      if (e.touches.length == 1) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        var delBtnWidth = this.data.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一项
        var index = e.target.dataset.index;
        var list = this.data.items;
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          items: list
        });
      }
    }
  },
  touchMSearch: function (e) {
      if (e.touches.length == 1) {
        //手指移动时水平方向位置
        var moveX = e.touches[0].clientX;
        //手指起始点位置与移动期间的差值
        var disX = this.data.startX - moveX;
        var delBtnWidth = this.data.delBtnWidth;
        var txtStyle = "";
        if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
          txtStyle = "left:0px";
        } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
          txtStyle = "left:-" + disX + "px";
          if (disX >= delBtnWidth) {
            //控制手指移动距离最大值为删除按钮的宽度
            txtStyle = "left:-" + delBtnWidth + "px";
          }
        }
        //获取手指触摸的是哪一项
        var index = e.target.dataset.index;
        var list = this.data.resultItems;
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          resultItems: list
        });
      }
  },
  touchE: function (e) {
    if (this.data.canLeftSlide){
      if (this.data.callFlag){
        if (e.changedTouches.length == 1) {
          //手指移动结束后水平位置
          var endX = e.changedTouches[0].clientX;
          //触摸开始与结束，手指移动的距离
          var disX = this.data.startX - endX;
          var delBtnWidth = this.data.delBtnWidth;
          //如果距离小于删除按钮的1/2，不显示删除按钮
          var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
          //获取手指触摸的是哪一项
          var index = e.target.dataset.index;
          var list = this.data.items;
          list[index].txtStyle = txtStyle;
          //更新列表的状态
          this.setData({
            items: list
          });
        }
      }
    }
  },
  touchESearch: function (e) {
    if (this.data.callFlag) {
      if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        var endX = e.changedTouches[0].clientX;
        //触摸开始与结束，手指移动的距离
        var disX = this.data.startX - endX;
        var delBtnWidth = this.data.delBtnWidth;
        //如果距离小于删除按钮的1/2，不显示删除按钮
        var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
        //获取手指触摸的是哪一项
        var index = e.target.dataset.index;
        var list = this.data.resultItems;
        list[index].txtStyle = txtStyle;
        //更新列表的状态
        this.setData({
          resultItems: list
        });
      }
    }
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
  delItemSearch: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.resultItems;
    var items = this.data.items;
    var tmp = [];
    var that = this;
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
            items: items,
            resultItems: list
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
  changeItemSearch: function (e) {
    var index = e.target.dataset.index;
    var list = this.data.resultItems;
    var items = this.data.items;
    var tmp = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].ID == list[index].ID) {
        console.log(items[i])
        if (items[i].imgPath == '/img/yes.png') {
          items[i].imgPath = '/img/no.png'
        } else {
          items[i].imgPath = '/img/yes.png'
        }
        items[i].txtStyle = 'left:0px'
        tmp.push(items[i].ID)
      }
    }
    if (list[index].imgPath == '/img/yes.png') {
      list[index].imgPath = '/img/no.png'
      wx: wx.request({
        url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
        data: {
          activity_id: this.data.activity_id,
          action: 3,
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
    } else {
      list[index].imgPath = '/img/yes.png'
      wx: wx.request({
        url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
        data: {
          activity_id: this.data.activity_id,
          action: 4,
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
      items: items,
      resultItems: list
    });
  },
  callManyDelete:function(e){
    this.setData({
      hiddenItemCheckbox:'center',
      stateWidth:'23%'
    })
  },
  deleteClick:function(e){
    if (this.data.stateWidth=='33%'){
      var tmp = this.data.items;
      for (var i = 0; i < tmp.length; i++) {
        tmp[i].checked = false;
      }
      this.setData({
        hiddenItemCheckbox: 'center',
        stateWidth: '23%',
        createOrCancel:'取消',
        hiddenSelectAll:'center',
        allOrNull:'全选',
        callFlag:false,
        switchShow:'none',
        canLeftSlide:false,
        selectedItem:[],
        items:tmp
      })
    }
    else{
      var that = this;
      wx.showModal({
        title: '删除所选学生？',
        content: '',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        confirmText: '删除',
        confirmColor: '#ff3300',
        success: function(res) {
          if(res.confirm){
            that.deleteConfirm();
          }else{
            that.deleteCancel();
          }
        },
        fail: function(res) {},
        complete: function(res) {
          that.setData({
            switchShow:'',
            canLeftSlide: true
          })
        },
      })
    }
  },
  deleteConfirm:function(e){
    var list = this.data.items;
    var selectedItem = this.data.selectedItem;
    var pendingDelete = [];
    var that = this;
    for (var i = 0;i < selectedItem.length;i++){
      pendingDelete.push(parseInt(selectedItem[i]))
    }
    console.log(pendingDelete)
    wx: wx.request({
      url: 'http://123.206.94.45/CampusMap/ModifySignInfo',
      data: {
        activity_id: this.data.activity_id,
        action: 2,
        list: pendingDelete
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
        for (var i = 0; i < that.data.items.length; i++) {
          for (var j = 0; j < selectedItem.length; j++) {
            if (list[i] != null && list[i].ID == selectedItem[j]) {
              list.splice(i, 1)
              i--;
            }
          }
        }
      },
      fail: function (res) { },
      complete: function (res) { 
        that.setData({
          items: list,
          hiddenItemCheckbox: 'none',
          hiddenSelectAll: 'none',
          stateWidth: '33%',
          createOrCancel: '添加',
          hiddenDeleteAlert: true,
          selectedItem: [],
          callFlag: true
        })
      },
    })
  },
  deleteCancel:function(){
    this.setData({
      switchShow: '',
      canLeftSlide: true,
      hiddenItemCheckbox: 'none',
      hiddenSelectAll: 'none',
      stateWidth: '33%',
      createOrCancel: '添加',
      callFlag: true,
      selectedItem:[]
    })
  },
  checkboxChange:function(e){
    this.setData({
      selectedItem:e.detail.value
    })
    console.log(this.data.selectedItem)
  },
  selectAll:function(e){
    this.setData({
      callFlag:true
    })
    if (this.data.allOrNull == '全选'){
      var that = this.data.items;
      var selectItem = []
      selectItem= this.data.selectedItem;
      for (var i = 0;i < this.data.items.length;i++){
        that[i].checked = true;
        selectItem[i] = that[i].ID;
      }
      this.setData({
        items:that,
        selectedItem:selectItem,
        allOrNull:'全不选'
      })
    }else{
      var that = this.data.items;
      var selectItem = []
      for (var i = 0; i < this.data.items.length; i++) {
        that[i].checked = false;
      }
      this.setData({
        items: that,
        selectedItem: selectItem,
        allOrNull: '全选'
      })
    }
  },
  getUnvalid:function(e){
    if (this.data.switchChecked){ 
      var tmp = this.data.switchChecked;
      tmp = false;
      var items = this.data.basicItems;
      this.setData({
        switchChecked: tmp,
        items: items
      })
    }else{  //显示无效
      var tmp = this.data.switchChecked;
      tmp = true;
      var items = [];
      for (var i = 0; i < this.data.items.length; i++) {
        if (this.data.items[i].imgPath == '/img/no.png') {
          items.push(this.data.items[i])
        }
      }
      this.setData({
        switchChecked: tmp,
        items:items
      })
      console.log(this.data.switchChecked)
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
      if (this.data.basicItems[i].name == this.data.searchKey || this.data.basicItems[i].ID == this.data.searchKey) {
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
})