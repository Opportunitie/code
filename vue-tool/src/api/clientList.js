import service from '../axios'
import { downloadExcel } from "../axios";
// 客户列表
export function fetchClientList(data) {
    return service({
        url: '/pc/client/query',
        method: 'post',
        data: data
    })
}

export function fetchClientPageQuery(data) {
    return service({
        url: '/pc/client/pageQuery',
        method: 'post',
        data: data
    })
}

export function fetchClienDetails(data) {
    return service({
        url: '/pc/client/detail',
        method: 'post',
        data: data
    })
}

export function fetchAllClientTypes(data) {
    return service({
        url: '/pc/client/type/query',
        method: 'post',
        data: data
    })
}

// 客户列表新增，修改 审核
export function saveNewClient(data) {
    return service({
        url: '/pc/client/save',
        method: 'post',
        data: data
    })
}

export function deleteClient(data) {
    return service({
        url: '/pc/client/delete',
        method: 'post',
        data: data
    })
}

export function exportClientToExcel(data, name) {
    return downloadExcel({
        url: '/pc/client/export',
        name: name,
        data: data
    })
}

// 查询客户经理
export function fetchClientManager(data) {
    return service({
        url: '/pc/user/queryAgent',
        method: 'post',
        data: data
    })
}

export function updatePwd(data) {
    return service({
        url: '/common/common/modifyPwd',
        method: 'post',
        data: data
    })
}

export function checkClientExist(data) {
    return service({
        url: '/common/common/checkName',
        method: 'post',
        data: data
    })
}

export function checkMobileExist(data) {
    return service({
        url: '/pc/client/checkMobile',
        method: 'post',
        data: data
    })
}

export function checkUserExist(data) {
    return service({
        url: '/common/common/checkUsercode',
        method: 'post',
        data: data
    })
}

// 驳回接口
export function clientReject(data) {
    return service({
        url: '/pc/client/reject',
        method: 'post',
        data: data
    })
}

// 驳回接口
export function fetchAllClientList(data) {
    return service({
        url: '/pc/client/query',
        method: 'post',
        data: data
    })
}

// 核算单位列表
export function fetchAllAunits(data) {
    return service({
        url: '/pc/unit/query',
        method: 'post',
        data: data
    })
}

// 获取最新核算单位
export function fetchNewUnits(data) {
    return service({
        url: '/pc/unit/async',
        method: 'post',
        data: data
    })
}

