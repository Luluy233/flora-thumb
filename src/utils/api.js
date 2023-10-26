import request from '@/utils/request';
import {MD5} from '@/utils/md5';

// 植物识别
export function recognizePlants(data) {
    return request({
        url:"http://plantgw.nongbangzhu.cn/plant/recognize2",
        method: "POST",
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'APPCODE ' + process.env.VUE_APP_PLANTGW_APPCODE
        },
    })
}

// 获取植物信息
export function getPlantsInfo(data){
    return request({
        url:"http://plantgw.nongbangzhu.cn/plant/info",
        method:"POST",
        data:data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'APPCODE ' + process.env.VUE_APP_PLANTGW_APPCODE
        },
    })
}


// 获取植物花语箴言
export function getFlower(data){
    const url = "https://apis.tianapi.com/huayu/index?key=" + process.env.VUE_APP_TIAN_KEY +"&word="+ data.value
    return request({
        url,
        method:"GET",
    })
}


// 植物搜索
export function searchPlants(data){
    return request({
        url:"/api/v1/plants/search?token=" + process.env.VUE_APP_TREFLE_KEY + "&q=" + data.key + 
            "&page=" + data.page ,
        method:"GET",
    })
}


// 获取物种信息
export function getSpecialDetail(data){
    return request({
        url:"/api/v1/species/" + data.id ,
        method:"GET",
        headers:{
            'Authorization': process.env.VUE_APP_TREFLE_KEY,
        }
    })
}

var appid = process.env.VUE_APP_BAIDU_APPID;
var key = process.env.VUE_APP_BAIDU_APPKEY;
var salt = (new Date).getTime();
var domain = 'senimed';


// 中译英
export function translate(query){
    const str1 = appid + query.key + salt + domain + key;
    const sign = MD5(str1);

    return request({
        url:'/baidu',
        headers:{
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        method:"POST",
        data:{
            from: query.from,
            to: query.to,
            appid: appid,
            salt: salt,
            domain: domain,
            sign: sign,
            q: query.key
        }
    });
}