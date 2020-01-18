import {
  Notification
} from 'element-ui';
import $ from 'jquery'
// import {
//   BASEURL
// } from '@/assets/script/http'

export default {
  convertJsonByVueJson(val) {
    return JSON.parse(JSON.stringify(val));
  },
  /**
   * @about 根据url判断是内部跳转还是跳出页面，并进行跳转
   * @param
   *      url:{链接(http://www.baidu.com),内部跳转({name:'test'})},
   *      $router:路由
   * @return 无返回值，进行页面跳转
   * @author bob
   */
  go(url, $router, replace) {
    if (/^javas/.test(url) || !url) {
      return;
    }
    if (url.showError) {
      Notification.error({
        title: '错误',
        message: url.showError
      });
      return;
    }
    const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url));
    if (useRouter) {
      if (replace || url.replace) {
        $router.replace(url);
      } else {
        $router.push(url);
      }

    } else {
      window.open(url, '_blank');
    }
  },
  back($router, step) {
    let stp = step ? -step : -1;
    $router.go(stp);
  },
  /**
   * @about 打开页面(如果在compass集成下，打开新的tab标签)
   * @param
   *      param:{
   *             "url":"/app/demo",//请求url，必填
   *             "text":"详情页面",//compass下tab名称
   *             "mid":"12323123",//compass的tab唯一值，一个tab一个值，如果是相同的mid，打开的是用一个tab
   *             "param":{},//请求参数，选填，默认{}
   *             "router":this.$router,//router对象，如果不是compass下通过go调用使用
   *           }
   * @return 无
   * @author wanglu
   */
  openPage(param,mainName) {
    let that = this;
    let BASENEWURL='https://qawain.qdingnet.com/qdp-echo-web/webui/dist/index.html#';
    var _p = {
      url: '',
      text: '新开页面',
      mid: (new Date()).getTime(),
      param: {},
      router: null
    }
    _p = Object.assign(_p, param);
    if (_p.router == null) {
      return;
    }
    try {
      if (window.parent && window.parent.long) {
        var url_param = '';
        for (var key in _p.param) {
          if (_p.param[key]) {
            url_param += key + '=' + _p.param[key] + '&';
          }
        }

        if (url_param) {
          if(mainName){
            _p.url = mainName + _p.url + "?" + url_param.substr(0, url_param.length - 1);
          }else{
            _p.url = BASENEWURL + _p.url + "?" + url_param.substr(0, url_param.length - 1);
          }

        } else {
          if(mainName){
             _p.url = mainName + _p.url;
          }else{
            _p.url = BASENEWURL + _p.url;
          }

        }
        window.parent.long.open_page(_p.mid, _p.text, _p.url);
      } else {
        that.go({
          path: _p.url,
          query: _p.param
        }, _p.router);
      }
    } catch (e) {
      console.log("openPage异常:" + e);
      that.go({
        path: _p.url,
        query: _p.param
      }, _p.router);
    }
  },
  closePage(param) {
    let that = this;
    var _p = {
      mid: (new Date()).getTime()
    }
    _p = Object.assign(_p, param);
    try {
      if (window.parent && window.parent.long) {
        window.parent.long.close_page(_p.mid);
      }
    } catch (e) {
      console.log("closePage异常:" + e);
      // that.go({
      //   path: _p.url,
      //   query: _p.param
      // }, _p.router);
    }
  },
  // success warning error
  // compass内提示信息展示
  message(message, type) {
    if (longp && longp.layer) {
      var data = {
        time: 5000,
        icon: 1,
        anim: 6,
        offset: '30px',
        closeBtn: false,
        skin: 'demo-class'
      };
      if (type == 'warning') {
        data.icon = 7;
      } else if (type == 'error') {
        data.icon = 2;
      } else {
        data.anim = 5
      }
      // 7 warning, 1 success, 2 error
      longp.layer.msg(message, data);
    } else {
      Notification({
        title: '提示',
        message: message,
        type: type || 'success'
      });
    }
  },
  /**
   * @about 操作sessionStorage
   * @param 无
   * @return 无
   * @author bob
   */
  setSession(name, value) {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(name, value);
  },
  getSession(name) {
    return sessionStorage.getItem(name);
  },
  delSession(name) {
    if (sessionStorage.getItem(name)) {
      sessionStorage.removeItem(name);
    }
  },

  /**
   * @about 操作sessionStorage
   * @param 无
   * @return 无
   * @author bob
   */
  setLocalStorage(name, value) {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(name, value);
  },
  getLocalStorage(name) {
    return localStorage.getItem(name);
  },
  delLocalStorage(name) {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    }
  },

  /**
   * @about 格式化时间
   * @param
   *      date:{number或date}毫秒时间，必填
   *      fmt:{string}需要生成的时间格式，选填 默认  MM-dd hh:mm
   * @return string   格式化时间字符串
   * @author bob
   */
  formatTime(date, format) {
    if (typeof date == "number") {
      date = new Date(date);
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      var fmt = format || "yyyy-MM-dd hh:mm:ss";
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    } else {
      return date;
    }
  },
  formatPrice(s) {
    var n = 2;
    s = s / 100 * 1 + "";
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  },

  /**
   * @about 包含loading的显隐
   * @param
   *      obj:{
   *             "url":"/app/demo",//请求url，必填
   *             "dataType":"json",//数据格式，选填，默认json
   *             "type":"POST",//请求类型，选填，默认POST
   *             "data":{},//请求参数，选填，默认{}
   *             "success":function(){},//成功回调，选填，默认function(){}
   *             "error":function(){},//error回调，选填，默认function(){}
   *             "async": true,//是否异步，选填，默认true
   *             "message": '拼命加载中',//请求时的文字，选填，默认  拼命加载中
   *             "stringify": 提交数据是否需要stringify，默认不stringify
   *           }
   * @return 无
   * @author bob
   */
  open(url, newWindow) {
    if (url.indexOf('?') >= 0)
      url += "&_t=" + (new Date()).getTime();
    else
      url += "?_t=" + (new Date()).getTime();
    if (newWindow) {
      window.open(basepath + url);
    } else {
      window.location.href = basepath + url;
    }
  },
  post(url, params, success, complete) {
    let that = this;
    if (typeof params != 'string') {
      params = JSON.stringify(params);
    }
    $.ajax({
      type: "post",
      url: basepath + url,
      async: true,
      data: params,
      // dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        if ($.isFunction(success)) {
          success(data)
          // if (data.result) {
          //   success(data)
          // } else {
          //   that.message(data.errorMessage, 'error')
          // }
        }
      },
      complete: function (e) {
        if ($.isFunction(complete)) {
          complete(e)
        }
      },
      error: function (e) {
        that.message('请求服务器异常！', 'error')
        if (e.status == 302 || e.status == 0) {
          console.error("当前登陆已失效!请重新登陆!")
        }
      }
    });
  },

   enginePost(url, params, success, complete) {
    let that = this;
    if (typeof params != 'string') {
      params = JSON.stringify(params);
    }
    $.ajax({
      type: "post",
      url:  basepathForEngine + url,
      async: true,
      data: params,
      // dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        if ($.isFunction(success)) {
          success(data)
          // if (data.result) {
          //   success(data)
          // } else {
          //   that.message(data.errorMessage, 'error')
          // }
        }

      },
      complete: function (e) {
        if ($.isFunction(complete)) {
          complete(e)
        }
      },
      error: function (e) {
        that.message('请求服务器异常！', 'error')
        if (e.status == 302 || e.status == 0) {
          console.error("当前登陆已失效!请重新登陆!")
        }
      }
    });
  },
  get(url, params, success, complete) {
    let that = this;
    $.ajax({
      type: "get",
      url: basepath + url,
      async: true,
      data: params,
      success: function (data) {
        if ($.isFunction(success)) {
          success(data)
          // if (data.result) {
          //   success(data)
          // } else {
          //   that.message(data.errorMessage, 'error')
          // }
        }
      },
      error: function (e) {
        that.message('请求服务器异常！', 'error')
        if (e.status == 302 || e.status == 0) {
          console.error("当前登陆已失效!请从新登陆!");
        }
      },
      complete: function (e) {
        if ($.isFunction(complete)) {
          complete(e)
        }
      },
    });
  },
  /**
   * @about 包含loading的显隐
   * @param
   *      obj:{
   *             "url":"/app/demo",//请求url，必填
   *             "dataType":"json",//数据格式，选填，默认json
   *             "type":"POST",//请求类型，选填，默认POST
   *             "data":{},//请求参数，选填，默认{}
   *             "success":function(){},//成功回调，选填，默认function(){}
   *             "error":function(){},//error回调，选填，默认function(){}
   *             "async": true,//是否异步，选填，默认true
   *             "message": '拼命加载中',//请求时的文字，选填，默认  拼命加载中
   *             "stringify": 提交数据是否需要stringify，默认不stringify
   *           }
   * @return 无
   * @author bob
   */
  ajax(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = basepath;
    if (obj.ignoreBase) {
      bpath = "";
    }
    let webHead = {};
    let url = bpath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      //contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
        params = obj.data ? obj.data : {};
    // if (obj.stringify !== false) {
    //     params = JSON.stringify(params);
    // }
    $.ajax({
      url: url,
      dataType: dataType,
      //contentType: contentType,
      type: type,
      async: async,
      data: params,
      success: function (data, textStatus, request) {

        if (data.code == 200 || data.code == 0 || data.errorCode == "000") {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification.error({
              title: '错误',
              message: '您的账号已被禁用，请联系客服'
            });
          } else if (data.code == "401") {
            // exports.setUser("");
            Notification.error({
              title: '错误',
              message: '您尚未登录，请登录'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
            Notification({
              title: '提示',
              message: data.message?data.message:data.errorMessage,
              type: 'warning'
            });

          }
        }
      },
      error: function (o, xhr, property) {
        // exports.loadingHide();
        if (o.status == 403) {
          Notification.error({
            title: '错误',
            message: '登陆超时，请刷新页面重新登陆'
          });
        } else {
          if (obj.error) {
            obj.error(o, xhr, property);
          } else {
            Notification.error({
              title: '错误',
              message: '网络繁忙，请稍后再试'
            });
          }
        }

      }
    });
  },
  //在ajax基础上删掉error2里的提示
  ajaxNew(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = basepath;
    if (obj.ignoreBase) {
      bpath = "";
    }
    let webHead = {};
    let url = bpath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      //contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
        params = obj.data ? obj.data : {};
    // if (obj.stringify !== false) {
    //     params = JSON.stringify(params);
    // }
    $.ajax({
      url: url,
      dataType: dataType,
      //contentType: contentType,
      type: type,
      async: async,
      data: params,
      success: function (data, textStatus, request) {

        if (data.code == 200 || data.code == 0) {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification.error({
              title: '错误',
              message: '您的账号已被���用，请联系客服'
            });
          } else if (data.code == "401") {
            // exports.setUser("");
            Notification.error({
              title: '错误',
              message: '您尚未登录，请登录'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
          }
        }
      },
      error: function (o, xhr, property) {
        // exports.loadingHide();
        if (o.status == 403) {
          Notification.error({
            title: '错误',
            message: '登陆超时，请刷新页面重新登陆'
          });
        } else {
          if (obj.error) {
            obj.error(o, xhr, property);
          } else {
            Notification.error({
              title: '错误',
              message: '网络繁忙，请稍后再试'
            });
          }
        }

      }
    });
  },
  // 调用oasis接口的ajax方法
  oasisAjax(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = oasispath;
    if (obj.ignoreBase) {
      bpath = "";
    }
    // exports.loadingShow(obj.message);
    let url = oasispath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      //contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
        params = obj.data ? obj.data : {};
    // if (obj.stringify !== false) {
    //     params = JSON.stringify(params);
    // }
    $.ajax({
      url: url,
      dataType: dataType,
      //contentType: contentType,
      type: type,
      async: async,
      data: params,
      success: function (data) {
        //exports.loadingHide();
        if (data.code == 200 || data.code == 0) {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification.error({
              title: '错误',
              message: '您的账号已被禁用，请联系客服'
            });
          } else if (data.code == "401") {
            // exports.setUser("");
            Notification.error({
              title: '错误',
              message: '您尚未登录，请登录'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
            Notification({
              title: '提示',
              message: data.message,
              type: 'warning'
            });

          }
        }
      },
      error: function (o, xhr, property) {
        if (obj.error) {
          obj.error(o, xhr, property);
        } else {
          Notification.error({
            title: '错误',
            message: '网络繁忙，请稍后再试'
          });
        }

      }
    });
  },
  rules: {
    mobile: [{
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    }, {
      validator: (rule, value, callback) => {
        if (!/^1\d{10}$/.test(value)) {
          callback(new Error('手机号输入错误'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    vcode: [{
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }],
    epy: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }],
    noEmpty: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }, {
      validator: (rule, value, callback) => {
        if (value.indexOf(" ") > -1) {
          callback(new Error('不能包含空格'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    oldPassword: [{
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }, {
      min: 6,
      max: 20,
      message: '请输入6-20位数字、字母或常用符号',
      trigger: 'blur'
    }, {
      validator: (rule, value, callback) => {
        if (value.indexOf(" ") > -1) {
          callback(new Error('不能包含空格'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    number: [{
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }, {
      validator: (rule, value, callback) => {
        if (!/^\d+$/.test(value)) {
          callback(new Error('必须为数值类型'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    percent: [{
      validator: (rule, value, callback) => {
        if (/^(0|0.0|0.00)$/.test(value)) {
          callback(new Error('百分比不能为0'));
        } else if (Math.ceil(value) > 100) {
          callback(new Error('百分比只能输入0-100的数值'));
        } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)) {
          callback(new Error('百分比最多输入两位小数'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    money: [{
      validator: (rule, value, callback) => {
        if (/^(0|0.0|0.00)$/.test(value)) {
          callback(new Error('金额不能为0'));
        } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)) {
          callback(new Error('金额格式有误且最多输入两位小数'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    money1: [{
      validator: (rule, value, callback) => {
        if (value == '') {
          callback();
        } else if (/^(0|0.0|0.00)$/.test(value)) {
          callback(new Error('金额不能为0'));
        } else if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)) {
          callback(new Error('金额格式有误且最多输入两位小数'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }],
    http: [{
      validator: (rule, value, callback) => {
        if (!/^(http:\/\/|https:\/\/)/.test(value)) {
          callback(new Error('网址必须http://或https://开头'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }],
    selectMore: [{
      validator: (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请选择'));
        } else {
          callback();
        }
      },
      trigger: 'change'
    }]
  },
  scrollTo(x, y) {
    try {
      if (window.parent && window.parent.long) {
        window.parent.scrollTo(x, y)
      } else {
        scrollTo(x, y)
      }
    } catch (e) {
      console.log('top:' + e)
    }
  },

  //前端设置超时需求的json ajax
  ajaxJsonTimeout(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = thBasePath;
    if (obj.ignoreBase) {
      bpath = "";
    }
    // exports.loadingShow(obj.message);
    let url = bpath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
      params = obj.data ? obj.data : '';
    if (obj.stringify !== false) {
      params = JSON.stringify(params);
    }
    $.ajax({
      url: url,
      dataType: dataType,
      contentType: contentType,
      type: type,
      async: async,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      data: params,
      timeout: 60000, //超时时间设置，单位毫秒
      success: function(data) {
        obj.success(data);
        return false
        //exports.loadingHide();
        if (data.code == 200 || data.code == 0) {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification.error({
              title: '错误',
              message: '您的账号已被禁用，请联系客服'
            });
          } else if (data.code == "401") {
            exports.setUser("");
            Notification.error({
              title: '错误',
              message: '您尚未登录，请登录'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            } else {
              Notification({
                title: '提示',
                message: data.message,
                type: 'warning'
              });
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
            Notification({
              title: '提示',
              message: data.message,
              type: 'warning'
            });

          }
        }
      },
      error: function(o, xhr, property) {
        //exports.loadingHide();
        // if (o.status == 403) {
        //     Notification.error({
        //         title: '错误',
        //         message: '登陆超时，请刷新页面重新登陆'
        //     });
        // } else {
        //     if (obj.error) {
        //         obj.error(o, xhr, property);
        //     } else {
        //         Notification.error({
        //             title: '错误',
        //             message: '网络繁忙，请稍后再试'
        //         });
        //     }
        // }
        if (obj.error) {
          obj.error(o, xhr, property);
        } else {
          Notification.error({
            title: '错误',
            message: '网络繁忙，请稍后再试'
          });
        }


      },
      complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数

        if (status == 'timeout') { //超时,status还有success,error等值的情况
          Notification({
            title: '提示',
            message: '请求超时',
            type: 'warning'
          });
        }
      },
    });
  },
  ajaxCommon(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = wainPathCom;
    if(obj.url=='/common/getRoleList'){
      bpath=wainWeb;
    }
    if (obj.ignoreBase) {
      bpath = "";
    }
    // exports.loadingShow(obj.message);
    let url = bpath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
      params = obj.data ? obj.data : '';
    if (obj.stringify !== false) {
      params = JSON.stringify(params);
    }
    $.ajax({
      url: url,
      dataType: dataType,
      contentType: contentType,
      type: type,
      async: async,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      timeout: 60000, //超时时间设置，单位毫秒
      success: function(data) {
        obj.success(data);
        return false
        //exports.loadingHide();
        if (data.code == 200 || data.code == 0) {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification.error({
              title: '错误',
              message: '您的账号已被禁用，请联系客服'
            });
          } else if (data.code == "401") {
            exports.setUser("");
            Notification.error({
              title: '错误',
              message: '您尚未登录，请登录'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            } else {
              Notification({
                title: '提示',
                message: data.message,
                type: 'warning'
              });
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
            Notification({
              title: '提示',
              message: data.message,
              type: 'warning'
            });

          }
        }
      },
      error: function(o, xhr, property) {
        //exports.loadingHide();
        // if (o.status == 403) {
        //     Notification.error({
        //         title: '错误',
        //         message: '登陆超时，请刷新页面重新登陆'
        //     });
        // } else {
        //     if (obj.error) {
        //         obj.error(o, xhr, property);
        //     } else {
        //         Notification.error({
        //             title: '错误',
        //             message: '网络繁忙，请稍后再试'
        //         });
        //     }
        // }
        if (obj.error) {
          obj.error(o, xhr, property);
        } else {
          Notification.error({
            title: '错误',
            message: '网络繁忙，请稍后再试'
          });
        }


      },
      complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数

        if (status == 'timeout') { //超时,status还有success,error等值的情况
          Notification({
            title: '提示',
            message: '请求超时',
            type: 'warning'
          });
        }
      },
    });
  },
  ajaxJson(obj) {
    if (!obj.url) {
      return;
    }
    let bpath = basepath;
    if (obj.ignoreBase) {
      bpath = "";
    }
    // exports.loadingShow(obj.message);
    let url = bpath + obj.url,
      dataType = obj.dataType ? obj.dataType : 'json',
      contentType = obj.contentType ? obj.contentType : 'application/json',
      type = obj.type ? obj.type : 'GET',
      async = obj.async === false ? false : true,
        params = obj.data ? obj.data : {};
    if (obj.stringify !== false) {
      params = JSON.stringify(params);
    }
    $.ajax({
      url: url,
      dataType: dataType,
      contentType: contentType,
      type: type,
      async: async,
      data: params,
      success: function (data) {
        //exports.loadingHide();
        if (data.code == 200 || data.code == 0) {
          if (obj.success) {
            obj.success(data);
          }
        } else {
          if (data.code == "403") {
            Notification({
              message: '您的账号已被禁用，请联系客服',
              type: 'error'
            });
          } else if (data.code == "401") {
            // exports.setUser("");
            Notification({
              message: '您尚未登录，请登录',
              type: 'error'
            });
          } else if (data.code == '500') {
            if (obj.error1) {
              obj.error1(data);
            } else {
              Notification({
                message: data.message,
                type: 'warning'
              });
            }
          } else {
            if (obj.error2) {
              obj.error2(data);
            }
            Notification({
              message: data.message,
              type: 'warning'
            });

          }
        }
      },
      error: function (o, xhr, property) {
        // exports.loadingHide();
        if (obj.error) {
          obj.error(o, xhr, property);
        } else {
          Notification.error({
            title: '错误',
            message: '网络繁忙，请稍后再试'
          });
        }

      }
    });
  },
  formatTime1(date) {
    if (date) {
      return date.substr(0, 7);
    } else {
      return ''
    }
  },
  formatTime2(date) {
    if (date) {
      return date.split(' ')[0]
    } else {
      return ''
    }
  },
  formatPrice1(s) {
    var n = 5;
    s = s / 100 * 1 + "";
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  },
  formatPrice2(s) {
    var n = 2;

    s = s / 100 * 1 + "";
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
      t += l[i];
    }
    return t.split("").reverse().join("") + "." + r;
  },

  //收费工作台左侧树
  setPageFromeLeftTree(pageThis){
      if (window.a && this.getLocalStorage("leftTreeData")) {
        let leftTreeData = JSON.parse(this.getLocalStorage("leftTreeData"));
        pageThis.ruleForm.communityName = leftTreeData.communityName
        pageThis.ruleForm.communityId = leftTreeData.communityId
        pageThis.ruleForm.customerName = leftTreeData.personName
        pageThis.ruleForm.customerId = leftTreeData.personId
        pageThis.items = leftTreeData.roomItems
        pageThis.ruleForm.roomId = [leftTreeData.roomId ? leftTreeData.roomId : ''];

        // for (var i = 0; i < params.length; i++) {
        //   if (params[i].split('.').length == 2) {
        //     pageThis[params[i].split('.')[0]][params[i].split('.')[1]] = leftTreeData.communityName;
        //   }else{
        //     pageThis[params[i]] = leftTreeData.communityName;
        //   }
        // }
        // pageThis[params[0].split('.')[0]][params[0].split('.')[1]] = leftTreeData.communityName
      }
  },

}

