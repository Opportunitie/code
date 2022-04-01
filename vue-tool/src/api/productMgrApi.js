import service from '../axios'

// 实时数据页面 数据图表
export function fetchProductList(data) {
    return service({
        url: '/pc/commodity/pageQuery',
        method: 'post',
        data: data
    })
}