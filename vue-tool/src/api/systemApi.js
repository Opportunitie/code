
import service from '../axios';

// 部门管理 ----------------------------------------------------------
// 部门管理
export const deptPageQuery = (data) => {
  return service({
      url: '/sip-sys/dept/v1/dept/pageQuery',
      method: 'post',
      data: data
  })
};

// 查询部门列表-三级选择框
export const deptQueryDeptName = (data) => {
  return service({
      url: '/sip-sys/dept/v1/queryDeptName',
      method: 'post',
      data: data
  })
};

// 用户管理 ----------------------------------------------------------
// 用户管理(页面列表数据)
export const userPageQuery = (data) => {
  return service({
      url: '/pc/user/pageQuery',
      method: 'post',
      data: data
  })
};


// 更新用户密码
export const userUpdatePassword = (data) => {
  return service({
      url: '/common/common/modifyPwd',
      method: 'post',
      data: data
  })
};

// 查询能管辖的所有用户
// 
// export const fetchAllEmployee = (data) => {
//   return service({
//       url: '/pc/user/queryManager',
//       method: 'post',
//       data: data
//   })
// };
export const fetchAllEmployee = (data) => {
  return service({
      url: '/pc/client/queryByUcode',
      method: 'post',
      data: data
  })
};

// 查询能管辖的用户
export const fetchOwnEmployee = (data) => {
  return service({
      url: '/pc/govern/client/query',
      method: 'post',
      data: data
  })
};

// 设置管辖用户
// export const addEmployee = (data) => {
//   return service({
//       url: '/pc/user/addGovern',
//       method: 'post',
//       data: data
//   })
// };
export const addEmployee = (data) => {
  return service({
      url: '/pc/govern/client/add',
      method: 'post',
      data: data
  })
};


// 启用 / 禁用
export const userStatus = (data) => {
  return service({
      url: '/sip-sys/user/v1/status',
      method: 'post',
      data: data
  })
};

// 新增
export const userInsert = (data) => {
  return service({
      url: '/pc/user/save',
      method: 'post',
      data: data
  })
};

// 检查用户名是否已存在
export function checkUserExist(data) {
  return service({
      url: '/common/common/checkUsercode',
      method: 'post',
      data: data
  })
}

// 更新
export const userUpdate = (data) => {
  return service({
      url: '/pc/user/save',
      method: 'post',
      data: data
  })
};

// 删除用户
export const deleteBatchUser = (data) => {
  return service({
      url: '/pc/user/batchDelete',
      method: 'post',
      data: data
  })
};

// 单个删除
export const deleteUser = (data) => {
  return service({
      url: '/pc/user/delete',
      method: 'post',
      data: data
  })
};

// 角色管理 ----------------------------------------------------------
// 角色管理（页面list）
export const rolePageQuery = (data) => {
  return service({
      url: '/pc/role/pageQuery',
      method: 'post',
      data: data
  })
};

// 获取角色列表 - 下拉列表
export const userChooseRole = (data) => {
  return service({
      url: '/pc/role/query',
      method: 'post',
      data: data
  })
};

// // 新增角色
// export const roleInsert = (data) => {
//   return service({
//       url: '/sip-sys/role/v1/insert',
//       method: 'post',
//       data: data
//   })
// };

// // 修改角色
// export const roleUpdate = (data) => {
//   return service({
//       url: '/sip-sys/role/v1/update',
//       method: 'post',
//       data: data
//   })
// };

// 查询所有权限
export const roleAllMenu = () => {
  return service({
      url: '/pc/authority/query',
      method: 'post'
  })
};

// 查询当前用户所拥有的权限
export const roleQueryHavePerms = (data) => {
  return service({
      url: '/pc/role/auth',
      method: 'post',
      data: data
  })
};

// 更改当前用户的权限
export const roleUpdatePerms = (data) => {
  return service({
      url: '/am-yh/role/updatePerms',
      method: 'post',
      data: data
  })
};


// 操作日志  -----------------------------------------------------------
// 操作日志
export const fetchLogList = (data) => {
  return service({
      url: '/sip-notice/opslog/queryOpsRecord',
      method: 'post',
      data: data
  })
};