import request from '@/utils/request';

// 植物识别
export function recognizePlants(data) {
    return request({
        url: "https://mock.apifox.cn/m1/3426981-0-default/api/Identify/",
        method: "POST",
        data:data,
    })
}

// 获取植物信息
export function getPlantsInfo(data){
    return request({
        url:"https://mock.apifox.cn/m1/3426981-0-default/api/plant/info/",
        method:"POST",
        data:data,
    })
}


// 获取植物花语箴言
export function getFlower(data){
    return request({
        url:"https://apis.tianapi.com/huayu/index",
        method:"GET",
        data:data,
    })
}

// 植物搜索

