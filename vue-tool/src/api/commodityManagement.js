import service from '../axios'
import { downloadExcel, getBinaryData } from "../axios";

// 商品列表
export function fetchCommodityList(data) {
    return service({
        url: '/pc/commodity/pageQuery',
        method: 'post',
        data: data
    })
}

// 商品详情
export function fetchCommodityDetails(data) {
    return service({
        url: '/pc/commodity/detail',
        method: 'post',
        data: data
    })
}

// 商品总数等信息
export function fetchCommodityToPNum(data) {
    return service({
        url: '/pc/commodity/queryNum',
        method: 'post',
        data: data
    })
}

// 导出商品基本信息
export function fetchCommodityExport(data, name) {
    return downloadExcel({
        url: '/pc/commodity/commodityExport',
        data: data,
        name: name
    })
}

// 导出商品报价信息
export function fetchCommodityBjexport(data, name) {
    return downloadExcel({
        url: '/pc/commodity/bjexport',
        data: data,
        name: name
    })
}

// 商品上下架
export function fetchCommodityUpAndDown(data) {
    return service({
        url: '/pc/commodity/upAndDown',
        method: 'post',
        data: data
    })
}

// 商品删除
export function fetchCommodityDelete(data) {
    return service({
        url: '/pc/commodity/delete',
        method: 'post',
        data: data
    })
}

// 新增商品信息
export function fetchCommodityInsert(data) {
    return service({
        url: '/pc/commodity/insert',
        method: 'post',
        data: data
    })
}

// 新增商品-图片上传
export function fetchCommodityUploadImg(data) {
    return service({
        url: '/pc/commodity/upload',
        method: 'post',
        data: data
    })
}

// 新增商品-主图片删除
export function fetchCommoditydDeleteMain(data) {
    return service({
        url: '/pc/commodity/deleteMain',
        method: 'post',
        data: data
    })
}

// 新增商品-轮播图删除
export function fetchCommoditydDeleteCarousel(data) {
    return service({
        url: '/pc/commodity/deleteCarousel',
        method: 'post',
        data: data
    })
}

// 修改商品信息
export function fetchCommodityUpdate(data) {
    return service({
        url: '/pc/commodity/update',
        method: 'post',
        data: data
    })
}

// 修改商品信息前查询
export function fetchCommodityUpdateQuery(data) {
    return service({
        url: '/pc/commodity/updateQuery',
        method: 'post',
        data: data
    })
}