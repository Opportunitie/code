import service from '../axios'

export function fetchDataList(data) {
  return service({
    url: '/pc/driver/pageQuery',
    method: 'post',
    data: data
  })
}

export function deleteDriver(data) {
  return service({
    url: '/pc/driver/delete',
    method: 'post',
    data: data
  })
}


export function fetchGuishuList(data) {
  return service({
    url: '/pc/client/queryAgent',
    method: 'post',
    data: data
  })
}


export function saveDriver(data) {
  return service({
    url: '/pc/driver/save',
    method: 'post',
    data: data
  })
}
