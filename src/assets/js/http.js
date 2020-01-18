import axios from 'axios'
var querystring = require('querystring');
import {
  Message
} from 'element-ui'
// 测试域接口
// export const BASEURL = 'http://qawain.qdingnet.com';
let tempURL = "";
if (process.env.NODE_ENV === 'development') {
  tempURL = 'http://qaoasis.qdingnet.com';
}
else{
  //非开发环境使用相对路径
  tempURL = '';
}
export const BASEURL = tempURL;

function handleError(error) {
  //toast.toastDanger(error.message || 'request error');
  // console.error(error)
  Promise.reject(error)
}
export function formatDate(date, fmt) {
  //格式化日期插件中的返回值
  if (date == undefined || date == '') return;
  date = typeof date == 'number' ? new Date(date) : date;
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  var obj = {
    'y': date.getFullYear(),
    'M': date.getMonth() + 1,
    'd': date.getDate(),
    'H': date.getHours(),
    'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
    'm': date.getMinutes(),
    's': date.getSeconds(),
    'S': date.getMilliseconds()
  };
  for (var i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
      var val = obj[i] + '';
      for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}

//setCookie("token","",1);
export function setCookie(name, value, days) {
  var date, expires;
  if (name) {
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = '';
    }
    window.document.cookie = name + "=" + value + expires + "; path=/";
  }
}
export function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null)
    return decodeURIComponent(arr[2]);
  return null;
}


// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  // console.log('req fail');
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  // Do something with response data
  if (process.env.NODE_ENV === 'development' && response.data.code != 200) {
    Message({
      message: "(" + response.data.code + ")" + response.data.msg,
      type: 'warning'
    });
  }
  return response.data;
}, function (error) {
  // Do something with response error
  // console.log('res fail: from response Interceptor');

  Message({
    message: "HTTP ERROR Status:(" + error.response + ")",
    type: 'warning'
  });
  return Promise.reject(error);
});

// export function get(uri, data, host) {
//   if (host) uri = host + uri;
//   var dataStr = querystring.stringify(data);
//   return axios.get(uri + '?' + dataStr);
// }
export function get(uri, data, host) {
  if (host) uri = host + uri;
  // console.log('this', this);
  return axios.get(uri, {
    params: data
  });
}

export function getjson(uri) {
  return axios.get(uri);
}

export function post(uri, data, host) {
  var dataStr = querystring.stringify(data);
  if (host) uri = host + uri;

  return axios({
    method: 'post',
    url: uri,
    data: dataStr,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  });
}

export function postJson(uri, data, host) {
  if (host) uri = host + uri;
  return axios({
    method: 'post',
    url: uri,
    data: data,
    headers: {
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json'
    }
  });
}

