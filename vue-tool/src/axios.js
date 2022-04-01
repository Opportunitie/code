import qs from "qs";
import axios from "axios";
import { Message } from "element-ui";

import Store from "@/store";
import { gotologin } from "@/utils";
import { filterNullValueObject } from "@/utils";
// 创建一个 axios 实例
let instance = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const { data } = config;
    const { token } = Store.state.common;
    config.data = filterNullValueObject(data);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "get") {
      config.url = config.url + "?" + qs.stringify(config.data);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    let { status, data } = response;
    if (status === undefined) {
      Message.error("未知异常，请联系管理员");
    } else {
      if (data.status == 1401 || data.status == 1013) {
        Store.dispatch("clearInfos");
        gotologin(false);
        return;
      }

      const { flag, message, messageFlag } = statusCallBack(data.status);
      if (flag) {
        return data.data;
      } else {
        if (messageFlag && message != "pageTips") {
          Message({
            type: "error",
            message: message,
            customClass: "zZindex",
          });
        }
        return Promise.reject({
          status: data.status,
          message: message,
        });
      }
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误";
          break;
        case 401:
          Store.dispatch("clearInfos");
          gotologin(false);
          error.message = "未授权，请登录";
          break;
        case 403:
          error.message = "拒绝访问";
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = "请求超时";
          break;
        case 500:
          error.message = "服务器内部错误";
          break;
        case 501:
          error.message = "服务未实现";
          break;
        case 502:
          error.message = "网关错误";
          break;
        case 503:
          error.message = "服务不可用";
          break;
        case 504:
          error.message = "网关超时";
          break;
        case 505:
          error.message = "HTTP版本不受支持";
          break;
        default:
          error.message = "服务器异常，请联系管理员";
          break;
      }
      Message({
        type: "error",
        message: error.message,
        customClass: "zZindex",
      });
    }
    return Promise.reject(error);
  }
);

export default instance;

const statusCallBack = (status) => {
  let message,
    flag,
    messageFlag = true;
  switch (status) {
    case 1000:
      flag = true;
      message = "请求成功";
      break;
    case 1001:
      flag = false;
      message = "参数有误";
      break;
    case 1002:
      flag = false;
      // messageFlag = false
      message = "验证码错误";
      break;
    case 1003:
      flag = false;
      message = "用户名或密码有误";
      break;
    case 1004:
      flag = false;
      messageFlag = false;
      message = "pageTips";
      break;
    case 1005:
      flag = false;
      message = "单据未满足条件（数据不匹配等)";
      break;
    case 1006:
      flag = false;
      messageFlag = false;
      message = "数据存在但已被废弃";
      break;
    case 1007:
      flag = false;
      messageFlag = false;
      message = "数据不可删除（具有关联数据等）";
      break;
    case 1009:
      flag = false;
      message = "当前部门存在子部门，不可删除";
      break;
    case 1010:
      flag = false;
      message = "验证码过期";
      break;
    case 1011:
      flag = false;
      message = "验证码错误";
      break;
    case 1012:
      flag = false;
      message = "没有用户或者用户名和密码不匹配";
      break;
    case 1013:
      flag = false;
      message = "用户过期";
      break;

    case 1014:
      flag = false;
      message = "当前司机已经绑定线路不允许删除";
      break;
    case 1015:
      flag = false;
      message = "该PID不存在";
      break;
    case 1016:
      flag = false;
      message = "该物料并不属于该工单";
      break;
    case 1017:
      flag = false;
      message = "该物料并不在出库清单中";
      break;
    case 1018:
      flag = false;
      // messageFlag = false;
      message = "不需要重复扫码入库";
      break;
    case 1019:
      flag = false;
      message = "输入的物料拆分数目大于标签单的总数";
      break;
    case 1021:
      flag = false;
      message = "已经在扫码列表中的PID不可分料";
      break;
    case 1022:
      flag = false;
      message = "已经被扫码的分料拆分数据不可被删";
      break;
    case 1023:
      flag = false;
      message = "超级管理员角色不可操作";
      break;

    case 1024:
      flag = false;
      message = "bom层级树不能超过十层";
      break;
    case 1025:
      flag = false;
      message = "当前用户不为客户";
      break;
    case 1026:
      flag = false;
      message = "今日该用户已下单，不能重复下单";
      break;
    case 1027:
      flag = false;
      // messageFlag = false;
      message = "该订单已作废";
      break;
    case 1028:
      flag = false;
      messageFlag = false;
      message = "PID不正确";
      break;
    case 1029:
      flag = false;
      // messageFlag = false;
      message = "该司机姓名已存在，请重新输入";
      break;
    case 1030:
      flag = false;
      // messageFlag = false;
      message = "该配货员姓名已存在，请重新输入";
      break;
    case 1031:
      flag = false;
      // messageFlag = false;
      message = "该线路名称已存在，请重新输入";
      break;
    case 1033:
      flag = false;
      // messageFlag = false;
      message = "该用户不存在";
      gotologin(false);
      break;
    case 1034:
      flag = false;
      // messageFlag = false;
      message = "该用户已禁用，请联系管理员";
      break;
    case 1037:
      flag = false;
      // messageFlag = false;
      message = "用户已存在";
      break;
    case 2105:
      flag = false;
      message = "旧密码输入有误";
      break;
    default:
      flag = false;
      message = "服务器异常，请联系管理员";
  }
  return { flag, message, messageFlag };
};

export const downloadExcel = ({ url, name = "下载文件名", data = null }) => {
  const { token } = Store.state.common;
  if (data) {
    url = url + "?" + qs.stringify(data);
  }
  axios
    .get(url, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Authorization": `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    })
    .then((res) => {
      let b = new Blob([res.data], { type: "application/vnd.ms-excel" });
      let url = URL.createObjectURL(b);
      let link = document.createElement("a");
      link.download = `${name}.xlsx`;
      link.href = url;
      link.click();
    });
};
export const getBinaryData = ({ url, data = null, name = "下载文件" }) => {
  const { token } = Store.state.common;
  axios(url, {
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${token}`,
    },
    responseType: "arraybuffer",
  }).then((res) => {
    let b = new Blob([res.data], { type: "application/vnd.ms-excel" });
    let url = URL.createObjectURL(b);
    let link = document.createElement("a");
    link.download = `${name}.xlsx`;
    link.href = url;
    link.click();
  });
};
