import service from '../axios'

export function fetchClientPriceList(data) {
    return service({
        url: '/pc/type/prize/query',
        method: 'post',
        data: data
    })
}

export function updateClientPrice(data) {
    return service({
        url: '/pc/client/prize/save',
        method: 'post',
        data: data
    })
}