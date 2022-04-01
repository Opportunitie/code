import service from "../axios";

export function fetchDataList(data) {
  return service({
    url: '/pc/delivery/line/pageQuery',
    method: 'post',
    data: data
  })
}

export function deleteLine(data) {
  return service({
    url: '/pc/delivery/line/delete',
    method: 'post',
    data: data
  })
}

export function fetchAllDriver(data) {
  return service({
    url: '/pc/driver/query',
    method: 'post',
    data: data
  })
}

export function saveLine(data) {
  return service({
    url: '/pc/delivery/line/save',
    method: 'post',
    data: data
  })
}