import service from '../axios'
// 商品列表
export function fetchInventoryList(data) {
    return service({
        url: '/pc/commodity/inventory',
        method: 'post',
        data: data
    })
}

// 修改商品库存
export function updateInventory(data) {
    return service({
        url: '/pc/commodity/updateInventory',
        method: 'post',
        data: data
    })
}