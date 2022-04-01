import service from "../axios";
import { downloadExcel, getBinaryData } from "../axios";

export function fetchDistribution(data) {
  return service({
    url: '/pc/distribution/pageQuery',
    method: 'post',
    data: data
  })
}

export function fetchDeliveryRouteList(data) {
  return service({
    url: '/pc/delivery/pageQuery',
    method: 'post',
    data: data
  })
}

export function fetchDeliveryDtail(data) {
  return service({
    url: '/pc/delivery/detail',
    method: 'post',
    data: data
  })
}

// 查询所有的线路
export function fetchAllLineList(data) {
  return service({
    url: '/pc/delivery/line/query',
    method: 'post',
    data: data
  })
}

export function fetchHeaderInfo(data) {
  return service({
    url: '/pc/commodity/head',
    method: 'post',
    data: data
  })
}

// 更换配送线路
export function updateDeliveryLine(data) {
  return service({
    url: '/pc/delivery/line/change',
    method: 'post',
    data: data
  })
}

export function fetchDistributionDetail(data) {
  return service({
    url: '/pc/distribution/detail',
    method: 'post',
    data: data
  })
}

// 更改配货员
export function updateDistributor(data) {
  return service({
    url: '/pc/distributor/change',
    method: 'post',
    data: data
  })
}


// 配货表批量导出
export const distributionBatchExport = (data, name) => {
  return downloadExcel({
    url: '/pc/distribution/batchExport',
    name: name,
    data,
  });
};
// 配货表详情： 导出
export const distributionDetailsExport = (data, name) => {
  return downloadExcel({
    url: '/pc/distribution/export',
    name: name,
    data,
  });
};

// 线路送货表详情导出
export const xianluDetailsExport = (data, name) => {
  return downloadExcel({
    url: '/pc/delivery/export',
    name: name,
    data,
  });
};

export function peihuobiaoBatchExport(data, name) {
  return downloadExcel({
    url: '/pc/distribution/batchExport',
    method: 'get',
    data: data,
    name: name
  })
}

export function xianluBatchExport(data, name) {
  return downloadExcel({
    url: '/pc/delivery/batchExport',
    method: 'get',
    data: data,
    name: name
  })
}
