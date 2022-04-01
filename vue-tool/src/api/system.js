import service from '../axios';
// 部门管理
export const deptPageQuery = (data) => {
    return service({
        url: '/am-yh/dept/pageQuery',
        method: 'post',
        data: data
    })
};

export const deptStatus = (data) => {
    return service({
        url: '/am-yh/dept/status',
        method: 'post',
        data: data
    })
};

export const deleteBatchDept = (data) => {
    return service({
        url: '/am-yh/dept/delete',
        method: 'post',
        data: data
    })
};

export const deptQueryDeptName = () => {
    return service({
        url: '/am-yh/dept/queryDeptName',
        method: 'post',
    })
};

export const deptChooseLeader = () => {
    return service({
        url: '/am-yh/dept/chooseLeader',
        method: 'post'
    })
};

export const deptInsert = (data) => {
    return service({
        url: '/am-yh/dept/insert',
        method: 'post',
        data: data
    })
};

export const deptUpdate = (data) => {
    return service({
        url: '/am-yh/dept/update',
        method: 'post',
        data: data
    })
};

export const deptQueryDeptRecord = (data) => {
    return service({
        url: '/am-yh/dept/queryDeptRecord',
        method: 'post',
        data: data
    })
};


// 角色管理（页面list）
export const rolePageQuery = (data) => {
    return service({
        url: '/sip-sys/role/v1/pageQuery',
        method: 'post',
        data: data
    })
};


export const roleStatus = (data) => {
    return service({
        url: '/am-yh/role/status',
        method: 'post',
        data: data
    })
};

export const deleteBatchRole = (data) => {
    return service({
        url: '/am-yh/role/delete',
        method: 'post',
        data: data
    })
};

export const roleInsert = (data) => {
    return service({
        url: '/am-yh/role/insert',
        method: 'post',
        data: data
    })
};

export const roleUpdate = (data) => {
    return service({
        url: '/am-yh/role/update',
        method: 'post',
        data: data
    })
};

// export const roleAllButton = () => {
//     return service({
//         url: '/am-yh/role/queryAllButton',
//         method: 'post'
//     })
// };

// export const roleAllMenu = () => {
//     return service({
//         url: '/am-yh/role/queryAllMenu',
//         method: 'post'
//     })
// };
export const roleAllMenu = () => {
    return service({
        url: '/am-yh/role/queryAuthority',
        method: 'post'
    })
};

export const roleQueryHavePerms = (data) => {
    return service({
        url: '/am-yh/role/queryRolePerms',
        method: 'post',
        data: data
    })
};

export const roleUpdatePerms = (data) => {
    return service({
        url: '/am-yh/role/updatePerms',
        method: 'post',
        data: data
    })
};

export const roleQueryRoleRecord = (data) => {
    return service({
        url: '/am-yh/role/queryRoleRecord',
        method: 'post',
        data: data
    })
};

// 用户管理(页面列表数据)
export const userPageQuery = (data) => {
    return service({
        url: '/sip-sys/user/v1/pageQuery',
        method: 'post',
        data: data
    })
};


export const userStatus = (data) => {
    return service({
        url: '/am-yh/user/status',
        method: 'post',
        data: data
    })
};

export const deleteBatchUser = (data) => {
    return service({
        url: '/am-yh/user/delete',
        method: 'post',
        data: data
    })
};

export const userInsert = (data) => {
    return service({
        url: '/am-yh/user/insert',
        method: 'post',
        data: data
    })
};

export const userUpdate = (data) => {
    return service({
        url: '/am-yh/user/update',
        method: 'post',
        data: data
    })
};


export const userChooseRole = () => {
    return service({
        url: '/am-yh/user/chooseRole',
        method: 'post'
    })
};

export const userUpdatePassword = (data) => {
    return service({
        url: '/am-yh/user/updatePassword',
        method: 'post',
        data: data
    })
};

export const userQueryUserRecord = (data) => {
    return service({
        url: '/am-yh/user/queryUserRecord',
        method: 'post',
        data: data
    })
};

export const userQueryUserMsg = (data) => {
    return service({
        url: '/am-yh/user/queryUserMsg',
        method: 'post',
        data: data
    })
};

export const userUpdateUser = (data) => {
    return service({
        url: '/am-yh/user/updateUser',
        method: 'post',
        data: data
    })
};

export const userEditPassword = (data) => {
    return service({
        url: '/am-yh/user/editPassword',
        method: 'post',
        data: data
    })
};

// 系统配置
export const getTags = ({ type }) => {
    if (!type) {
        return
    }
    let url = `/bm-yh/data/${type}Query`
    return service({
        url,
        method: 'post'
    })
}

export const setTags = ({ type, data }) => {
    if (!type) {
        return
    }
    let url = `/bm-yh/data/${type}Edit`
    return service({
        url,
        method: 'post',
        data: data
    })
}
 
export const deleteTags = ({ type, data }) => {
    if (!type) {
        return
    }
    let url = `/bm-yh/data/${type}Delete`
    return service({
        url,
        method: 'post',
        data: data
    })
}

export const getTechnological = (data) => {
    return service({
        url: '/bm-yh/data/configQuery', // 流程配置获取接口
        method: 'post',
        data: data
    })
}

export const setTechnological = (data) => {
    return service({
        url: '/bm-yh/data/configEdit', // 编辑流程配置接口
        method: 'post',
        data: data
    })
}