import service from '../axios'
import { downloadExcel, getBinaryData } from "../axios";

// 订单列表
export function fetchOrderList(data) {
    return service({
        url: '/pc/order/pageQuery',
        method: 'post',
        data: data
    })
}

export function setOrderDiscard(data) {
    return service({
        url: '/pc/order/discard',
        method: 'post',
        data: data
    })
}

// 订单详情
export function fetchOrderDetails(data) {
    return service({
        url: '/pc/order/detail',
        method: 'post',
        data: data
    })
}

// 订单导出
export const exportOrderToExcel = (data, name) => {
    return downloadExcel({
        url: '/pc/order/export',
        name: name,
        data,
    });
};


// 查询所有客户
export function fetchAllClient(data) {
    return service({
        url: '/pc/client/pageQuery',
        method: 'post',
        data: data
    })
}

// 查询所有配货员
export function fetchAllDistributor(data) {
    return service({
        url: '/pc/distributor/query',
        method: 'post',
        data: data
    })
}

// 查询所有线路
export function fetchAllLines(data) {
    return service({
        url: '/pc/delivery/line/pageQuery',
        method: 'post',
        data: data
    })
}

export function fetchAllLinesList(data) {
    return service({
        url: '/pc/delivery/line/query',
        method: 'post',
        data: data
    })
}

// 修改订单获取商品列表
export function fetchEditCommodityList(data) {
    return service({
        url: '/pc/commodity/query',
        method: 'post',
        data: data
    })
}

export function updateEditOrder(data) {
    return service({
        url: '/pc/order/edit',
        method: 'post',
        data: data
    })
}

// 代下单
export function commitOrder(data) {
    return service({
        url: '/pc/order/commit',
        method: 'post',
        data: data
    })
}

export function fetchOrderToPInfo(data) {
    return service({
        url: '/pc/order/queryNum',
        method: 'post',
        data: data
    })
}

// 提交订单是商品库存校验
export function checkInventory(data) {
    return service({
        url: '/pc/order/checkInventory',
        method: 'post',
        data: data
    })
}


export function asyncToJD(data) {
    return service({
        url: '/pc/order/async',
        method: 'post',
        data: data
    })
}


// 汇总信息-总销售贷款统计
export function saleTotal(data) {
    return service({
        url: '/pc/order/saleTotal',
        method: 'post',
        data: data
    })
}

// 汇总信息价格明细-列表查询
export function gatherInfo(data) {
    return service({
        url: '/pc/order/gatherInfo',
        method: 'post',
        data: data
    })
}

// 汇总信息价格明细-合并导出
export function coexport(data, name) {
    return downloadExcel({
        url: '/pc/order/coexport',
        data: data,
        name: name
    })
}

// 汇总信息价格明细-不合并导出
export function gexport(data, name) {
    return downloadExcel({
        url: '/pc/order/gexport',
        data: data,
        name: name
    })
}

// 打印销售发票
export function printInvoice(data) {
    return service({
        url: '/pc/order/printInvoice',
        method: 'get',
        data: data
    })
}

// 销售订单导出（无价格）
export function exportInvoiceNoPrice(data, name) {
    return downloadExcel({
        url: '/pc/order/exportInvoiceNoPrice',
        data: data,
        name: name
    })
}

// 销售订单导出（有价格）
export function exportInvoice(data, name) {
    return downloadExcel({
        url: '/pc/order/exportInvoice',
        data: data,
        name: name
    })
}

// 校验客户名称
export function checkClientExist(data) {
    return service({
        url: '/pc/client/checkName',
        method: 'post',
        data: data
    })
}


// 校验手机号
export function checkMobileExist(data) {
    return service({
        url: '/pc/client/checkName',
        method: 'post',
        data: data
    })
}