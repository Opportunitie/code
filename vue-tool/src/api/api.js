import service from '../axios';
export const requestCheckcode = () => {
    return service({
        url: '/pm-xh/login/code',
        method: 'post',
    })
};

export const requestLogin = (data) => {
    return service({
        url: '/pm-xh/login/login',
        method: 'post',
        data: data
    })
};

export const requestLogout = (data) => {
    return service({
        url: '/am-yh/login/logout',
        method: 'post',
        data: data
    })
};

export const getReceiptList = (params) => {
    return service({
        url: '/sm-yh/receipt/pageQuery',
        method: 'post',
        data: params
    })
};

export const deleteBatchReceipt = (params) => {
    return service({
        url: '/sm-yh/receipt/delete',
        method: 'post',
        data: params

    })
};

export const editReceiptLog = (params) => {
    return service({
        url: '/sm-yh/receipt/editLog',
        method: 'post',
        data: params
    })
};

export const getReceiptRecord = (params) => {
    return service({
        url: `/sm-yh/storage/queryStorageRecord`,
        method: 'post',
        data: params
    })
};
export const getReceiptRecordP = (params) => {
    return service({
        url: `/sm-yh/storageP/queryStorageRecord`,
        method: 'post',
        data: params
    })
};

export const deleteRecordLabel = (params) => {
    return service({
        url: '/sm-yh/label/delete',
        method: 'post',
        data: params
    })
};

export const insertRecordLabel = (params) => {
    return service({
        url: '/sm-yh/label/insert',
        method: 'post',
        data: params
    })
};

export const getLabelListApi = (params) => {
    return service({
        url: '/sm-yh/label/query',
        method: 'post',
        data: params
    })
};

export const finishLabelListApi = (params) => {
    return service({
        url: '/sm-yh/label/finish',
        method: 'post',
        data: params
    })
};

export const fetchPidData = (params) => {
    return service({
        url: '/sm-yh/label/queryPid',
        method: 'post',
        data: params
    })
};

// 工单粉料-查询输入PID对应信息
export const fetchPidDataInfo = (params) => {
    return service({
        url: '/om-yh/pick/showMsgByPid',
        method: 'get',
        data: params
    })
};
// 工单粉料-查询打印单列表数据
export const fetchSplitData = (params) => {
    return service({
        url: '/om-yh/pick/printLabelSplit',
        method: 'get',
        data: params
    })
};
// 工单粉料-删除分料
export const deleteSplitRecordLabel = (params) => {
    return service({
        url: '/om-yh/pick/deleteSplit',
        method: 'get',
        data: params
    })
};


export const splitLabel = (params) => {
    return service({
        url: '/sm-yh/label/split',
        method: 'post',
        data: params
    })
};
// 工单进货单
// 查询记录
export const getOutBoundPickListRecord = (params) => {
    return service({
        url: '/om-yh/quality/recordMsgByPhid',
        method: 'post',
        data: params
    })
};
// 物料出库
// 记录查询
export const getOutBoundReceiptRecord = (params) => {
    return service({
        url: '/om-yh/outbound/queryOutboundRecord',
        method: 'post',
        data: params
    })
};

// 编辑保存
export const saveLogisticsRecord = (params) => {
    return service({
        url: '/om-yh/outbound/logEdit',
        method: 'post',
        data: params
    })
};

// 供应商基础信息管理
// 物料主数据-查询操作记录
export function fetchMeterialOperateRecord(data) {
    return service({
        url: '/bm-yh/material/record',
        method: 'post',
        data: data
    })
}
// 供应商基础信息管理-查询操作记录
export function fetchSupplierOperateRecord(data) {
    return service({
        url: '/bm-yh/supplier/record',
        method: 'post',
        data: data
    })
}

// 仓库管理-仓库档案-操作记录查询
export function fetchWarehouseOperateRecord(data) {
    return service({
        url: '/bm-yh/warehouse/record',
        method: 'post',
        data: data
    })
}

// 仓库管理-储位档案-操作记录查询
export function fetchLocationOperateRecord(data) {
    return service({
        url: '/bm-yh/location/record',
        method: 'post',
        data: data
    })
}

// 物料清单-物料清单管理
export function fetchLibraryMaterialsBillRecord(data) {
    return service({
        url: '/bm-yh/items/queryBomRecord',
        method: 'post',
        data: data
    })
}

// 客户管理--操作记录获取
export function getClientBasicInfoRecord(data) {
    return service({
        url: '/bm-yh/client/queryRecord',
        method: 'post',
        data: data
    })
}

// 出库管理-销售出库
export function getOutBoundPReceiptRecord(data) {
    return service({
        url: '/om-yh/outboundP/queryOutboundRecord',
        method: 'post',
        data: data
    })
}
