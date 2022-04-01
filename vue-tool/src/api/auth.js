import service from '../axios';

// 获取验证码
export const requestCheckcode = () => {
    return service({
        url: '/common/common/getCode',
        method: 'post',
    })
};

// 登录
export const requestLogin = (data) => {
  return service({
      url: '/pc/login/login',
      method: 'post',
      data: data
  })
};

// 登出
export const requestLogout = (data) => {
  return service({
      url: '/pc/login/logout',
      method: 'post',
      data: data
  })
};