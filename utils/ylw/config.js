var utilMd5 = require('./md5.js');
var URL = `https://xiaolinmanhua.zztv021.com/api/`

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




//发起请求
function get(url, data, success, fails) {
  let dataA = data || {}
  data ? dataA.sign = objectToQueryString(data) : dataA.sign = getSign(data)
  wx.request({
    url: URL + url,
    data: dataA,
    method: 'get',
    success: (data) => {
      success(data)
    },
    fail(err) {
      fails(err)
    }
  })
}

function post(url, data, datas, success, fails) {
  console.log(data)
  let dataA  =  data  ||  {}
  data  ?  dataA.sign  =  objectToQueryString(data)  :  dataA.sign = getSign(data)
  wx.request({
    url: URL + url + "?" + urlPar(dataA),
    data: datas,
    method: 'post',
    success: (data) => {
      success(data)
    },

    fail(err) {
      fails(err)
    }
  })
}

function objectToQueryString(obj) {
  return getSign(
    Object.keys(obj).map(function(key) {
      return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
    }).join('&')
  )
};

function urlPar(obj) {
  return Object.keys(obj).map(function(key) {
    return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key]));
  }).join('&')
}



//手机号码
function login(data, datas, res) {
  post(`UserBase/Postdecryption`, data, datas, res)
};

//获取id
function openId(data, res) {
  get(`WeiXin/Getopenid`, data, res)
};

// //修改我的资料
// function xiugai(data, datas, res) {
//   post(`Cattlepeople/PostSetuserinfo`, data, datas, res)
// };

// // 全部充电桩列表
// function homeList(data,res){
//   get(`Home/GetPortList`, data, res)
// };

module.exports = {
  login: login,
  openId: openId,
  // xiugai: xiugai
}