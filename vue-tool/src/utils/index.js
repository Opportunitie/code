import { isArray } from 'lodash';
export const formatTime = (date, fmt) => {
  if (!date) {
    return
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd HH:mm:ss'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

/**
* 深拷贝
* @param {*} obj 拷贝对象(object or array)
* @param {*} cache 缓存数组
*/
export const deepCopy = (obj, cache = []) => {
  // typeof [] => 'object'
  // typeof {} => 'object'
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  // 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
  /**
   * 类似下面这种
   * var a = {b:1}
   * a.c = a
   * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
   */
  const hit = cache.filter(c => c.original === obj)[0]
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy
  })
  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

export const mapToForm = (map) => {
  let formData = new FormData();
  Object.keys(map).forEach(item => {
    formData.append(item, map[item])
  })
  return formData
}

export const _public = {
  _debounce(fn, delay) {
    var delay = delay || 200;
    var timer;
    return function () {
      var th = this;
      var args = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        timer = null;
        fn.apply(th, args);
      }, delay);
    };
  },
  // 节流
  _throttle(fn, interval) {
    var last;
    var timer;
    var interval = interval || 200;
    return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < interval) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(th, args);
        }, interval);
      } else {
        last = now;
        fn.apply(th, args);
      }
    }
  }
}

/**
 * 过滤掉对象值为 undefined 和 空字符串 和 空数组 的属性
 * @author wt
 * @param {Object} obj
 * @returns {Object} 过滤后的查询参数
 */
export function filterNullValueObject(obj) {
  const result = {};
  if (Array.isArray(obj)) {
    return obj
  }
  if (obj && Object.keys(obj).length >= 1) {
    Object.keys(obj).forEach(key => {
      if (key && obj[key] !== undefined && obj[key] !== '' && obj[key] !== null) {
        // 如果查询的条件不为空
        // if (isArray(obj[key]) && obj[key].length === 0) {
        //   return;
        // }
        result[key] = obj[key];
      }
    });
  }
  return result; // 返回查询条件
}

export const gotologin = (flag = false,_this={}) => {
  // const origin = (/localhost/g.test(window.location.origin) ? 'http://dev.smartindustry.vbooster.cn' : window.location.origin)
  const origin = window.location.origin
  let url = process.env.VUE_APP_ENVIRONMENT==='development' ? '/#/login':'/rxe/admin/#/login'
  if (!flag) {
    window.location.href = origin + url
  } else {
    // window.location.href =  origin + url + '?from=' + encodeURIComponent(window.location.href)
    _this({
      path: '/login',
      query:{
        form: encodeURIComponent(window.location.href)
      }
    })
  }
}


export const genID = (length = 3) => {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

// 把数字金额转换成中文大写数字的函数(可处理负值)
export const changeNumMoneyToChinese = (money) => {
  var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
  var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
  var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
  var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
  var cnInteger = "整"; //整数金额时后面跟的字符
  var cnIntLast = "元"; //整型完以后的单位
  var maxNum = 999999999999999.9999; //最大处理的数字
  var IntegerNum; //金额整数部分
  var DecimalNum; //金额小数部分
  var ChineseStr = ""; //输出的中文金额字符串
  var parts; //分离金额后用的数组，预定义    
  var Symbol="";//正负值标记
  if (money == "") {
      return "";
  }

  money = parseFloat(money);
  if (money >= maxNum) {
      alert('超出最大处理数字');
      return "";
  }
  if (money == 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger;
      return ChineseStr;
  }
  if(money<0)
  {
      money=-money;
      Symbol="负 ";        
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf(".") == -1) {
      IntegerNum = money;
      DecimalNum = '';
  } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
      var zeroCount = 0;
      var IntLen = IntegerNum.length;
      for (var i = 0; i < IntLen; i++) {
          var n = IntegerNum.substr(i, 1);
          var p = IntLen - i - 1;
          var q = p / 4;
          var m = p % 4;
          if (n == "0") {
              zeroCount++;
          }
          else {
              if (zeroCount > 0) {
                  ChineseStr += cnNums[0];
              }
              zeroCount = 0; //归零
              ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
              ChineseStr += cnIntUnits[q];
          }
      }
      ChineseStr += cnIntLast;
      //整型部分处理完毕
  }
  if (DecimalNum != '') { //小数部分
      var decLen = DecimalNum.length;
      for (var i = 0; i < decLen; i++) {
          var n = DecimalNum.substr(i, 1);
          if (n != '0') {
              ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
      }
  }
  if (ChineseStr == '') {
      ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == '') {
      ChineseStr += cnInteger;
  }
  ChineseStr = Symbol +ChineseStr;
  
  return ChineseStr;
}