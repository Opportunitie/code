import service from '../axios'

export function fetchDataList(data) {
  return service({
    url: '/pc/distributor/pageQuery',
    method: 'post',
    data: data
  })
}

export function deleteDistributor(data) {
  return service({
    url: '/pc/distributor/delete',
    method: 'post',
    data: data
  })
}

export function saveDistributor(data) {
  return service({
    url: '/pc/distributor/save',
    method: 'post',
    data: data
  })
}
