import request from '@/utils/request';
import {MD5} from '@/utils/md5';

var APP_CODE = "793c0cb766bb4f08b81921642c566c8f";

// 植物识别
export function recognizePlants(data) {
    return request({
        // url: "https://mock.apifox.cn/m1/3426981-0-default/api/Identify/",
        url:"http://plantgw.nongbangzhu.cn/plant/recognize2",
        method: "POST",
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'APPCODE ' + APP_CODE
        },
    })
}

// 获取植物信息
export function getPlantsInfo(data){
    return request({
        // url:"https://mock.apifox.cn/m1/3426981-0-default/api/plant/info/",
        url:"http://plantgw.nongbangzhu.cn/plant/info",
        method:"POST",
        data:data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'APPCODE ' + APP_CODE
        },
    })
}


// 获取植物花语箴言
export function getFlower(data){
    const url = "https://apis.tianapi.com/huayu/index?key=c26c489368e72c25e4d47e9ea30650f8&word="+ data.value
    return request({
        url,
        method:"GET",
    })
}

// 植物搜索
export function searchPlants(data){
    return request({
        url:"/api/v1/plants/search?token=m8ZN6xPH2t8xyrMsxFJfgUPb7fQz5tki-bf6GOzodgc" + "&q=" + data.key + 
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
            'Authorization': "m8ZN6xPH2t8xyrMsxFJfgUPb7fQz5tki-bf6GOzodgc",
        }
    })
}

var appid = '20231014001847372';
var key = 'GJAwIZ5LaMd9YPvFLqKZ';
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