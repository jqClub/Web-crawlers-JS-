//var e = require("../../vendor/qcloud-weapp-client-sdk/index"),
//  t = require("../../config"),
//  a = require("../../vendor/qcloud-weapp-client-sdk/lib/session"),
//  c = null;

var swan = wx

Page({
  data: {
    items: [{
      id: 0,
      value: "欺诈",
      checked: 0
    }, {
      id: 1,
      value: "色情",
      checked: 0
    }, {
      id: 2,
      value: "政治谣言",
      checked: 0
    }, {
      id: 3,
      value: "诱导分享",
      checked: 0
    }, {
      id: 4,
      value: "恶意营销",
      checked: 0
    }, {
      id: 5,
      value: "隐私信息收集",
      checked: 0
    }],
    desc: ["欺诈", "色情", "政治谣言", "诱导分享", "恶意营销", "隐私信息收集"],
    descStr: "请选择",
    descContent: "",
    index: -1,
    inputPhone: "",
    inputWXID: "",
    redpackNo: "",
    page: "",
    redirectFlag: !1
  },
  onLoad: function (e) {
//  c = this, e.redpackNo && "" != e.redpackNo && (c.data.redpackNo = e.redpackNo), e.page && "" != e.page && (c.data.page = e.page);
  },
  onShow: function () {
//  c.data.redirectFlag = !1;
  },
  onReachBottom: function () {},
  nullTap: function (e) {},
  checkedTap: function (e) {
    console.log("value", e.target.id), 0 == this.data.items[e.target.id].checked ? this.data.items[e.target.id].checked = 1 : this.data.items[e.target.id].checked = 0, this.setData({
      items: this.data.items
    });
  },
  radioChange: function (e) {
    c.data.index = e.detail.value;
  },
  phoneInput: function (e) {
    c.data.inputPhone = e.detail.value;
  },
  wxidInput: function (e) {
    c.data.inputWXID = e.detail.value;
  },
  descInput: function (e) {
    console.log("输入描述", e.detail.value), c.data.descContent = e.detail.value;
  },
//bindSelectDescTap: function (e) {
//  var t = this;
//  swan.showActionSheet({
//    itemList: t.data.desc,
//    success: function (e) {
//      console.log("Action Sheet", e), e.cancel || t.setData({
//        index: e.tapIndex,
//        descStr: t.data.desc[e.tapIndex]
//      });
//    }
//  });
//},
  submitReport: function (i) {
  	var c = this
  	for (var o = "", l = 0; l < c.data.items.length; l++) 1 == c.data.items[l].checked && (o += c.data.items[l].value, o += "|");
    console.log("checked:", o), "" != o ? (d("正在提交"), console.log("redpackNo page", c.data.redpackNo, c.data.page),setTimeout(function () {
      swan.hideToast()
      swan.showModal({
        title: "提交成功",
        content: "我们已经收到你的反馈，感谢你的理解与支持",
        showCancel: !1,
        complete: function (e) {
          console.log("用户点击确定"), swan.navigateBack({
            delta: 1
          });
        }
      })
    }, 1500)) : n("提示", "请选择投诉原因");
    return
  }
});

var d = function (e) {
  return swan.showToast({
    title: e,
    icon: "loading",
    duration: 1e4,
    mask: !0
  });
},
   n = function (e, t) {
  swan.hideToast(), swan.showModal({
    title: e,
    content: t,
    showCancel: !1
  });
};