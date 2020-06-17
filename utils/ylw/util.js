var utilMd5 = require('./md5.js');
var config = require('./config.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

let AppKey = '5876a4999aefdc0790ffdd7d9a26ec3b';
function getSign(params) {
  if (typeof params == "string") {
    return paramsStrSort(params);
  } else if (typeof params == "object") {
    var arr = [];
    for (var i in params) {
      arr.push((i + "=" + params[i]));
    }
    return paramsStrSort(arr.join(("&")));
  }
}

function paramsStrSort(paramsStr) {
  var urlStr = paramsStr.split("&").sort().join("&");
  var reg = new RegExp("&", "g");
  var reg2 = new RegExp("=", "g");
  var reg3 = new RegExp(",", "g");
  return utilMd5.hexMD5(AppKey + urlStr.replace(reg, "").replace(reg2, "") + AppKey);
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

function Rnd() {
  return Math.floor(Math.random() * 100)
} 

function formatTimeTwo(number, format) {
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

//弹出提示框方法res为提示内容
function show(res) {
  wx.showToast({
    title: res,
    icon: 'none',
    duration: 2000
  });
}
//判断是否是手机号码
function mobileFun(mobile, res) {
  var reg = /(^1[3|4|5|6|7|8]\d{9}$)|(^09\d{8}$)/;
  if (!reg.test(mobile)) {
    wx.showToast({
      title: '请输入正确的手机号码',
      icon: 'none',
      duration: 2000
    });
    return false
  }
  res(mobile)
}
// let config = {
//   configId: 78
// }
// 手机号码隐藏
function mobileHideFun(phone) {
  return phone.substr(0, 3) + '****' + phone.substr(7);
}

var URL = `https://xiaolinmanhua.zztv021.com/api/`

//发起请求
function request(url, method, data, success, fails) {
  wx.request({
    url: URL + url,
    data: data,
    method: method,
    success: (data) => {
      success(data)
    },
    fail(err) {
      fails(err)
    }
  })
}

/获取当前页带参数的url/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages() //获取加载的页面 
  var currentPage = pages[pages.length - 1] //获取当前页面的对象 
  var url = currentPage.route //当前页面url 
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //拼接url的参数 
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

  return urlWithArgs
}

// //判断是否登录
// function userinfoFun(res) {
//   let userinfo = wx.getStorageSync('userinfo')
//   if (!userinfo.id) {
//     wx.navigateTo({
//       url: '../login/login',
//       success: (res) => {
//         console.log(res)
//       }
//     })
//   } else {
//     res(userinfo)
//   }
// }

module.exports = {
  formatTime: formatTime,
  formatTimeTwo: formatTimeTwo,
  request: request,
  mobileFun: mobileFun,
  mobileHideFun: mobileHideFun,
  show: show,
  config: config,
  URL: URL,
  getSign: getSign,
  config: config,
  Rnd,Rnd
}