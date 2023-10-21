<template>    
    <div class="result-container">
        <div class="title">识别结果</div>
        <div v-if="data.Status === 0">
            <div class="item-gallery">
                <!-- 行 -->
                <el-row v-for="(row, index) in itemRows" :key="index" :gutter="0">
                    <!-- 列 -->
                    <el-col v-for="(item, i) in row" :key="i" :span="8">
                        <el-card :body-style="{ margin: '0' }" class="card-container" style="margin:20px" shadow="hover"
                            @click="showDetails(item.InfoCode)">
                            <!-- 图片 -->
                            <div class="item">
                                <img :src="item.ImageUrl" class="image" />
                            </div>
                            <div class="name">{{ item.Name }}</div>
                            <div class="description">{{ item.LatinName }}</div>
                            <div class="bottom">
                                <!-- 植物科 -->
                                <div >{{ item.Family }}</div>
                                <!-- 植物属 -->
                                <div >{{ item.Genus }}</div>
                                <!-- 相似度 -->
                                <div>相似度：<span class="score">{{ item.Score }}%</span></div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item-gallery" v-else>
            <el-empty description="暂无识别结果，请换张图片重试~"/>
        </div>
    </div>


  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { defineProps } from 'vue'
  import {  ElRow, ElCol, ElCard } from 'element-plus';

  import router from '@/router'

    const props = defineProps({
        data: {
            type: Object, //数据类型
            required:true
        },
    })
    
    const rowSize = 3; 

    // 计算属性，计算imageList中图片对应的行；每行3列
    const itemRows = computed(() => {
        const rows = [] //二维数组，rows[i]存储第i行的商品卡片（3个）
        const rowCount = props.data.Result.length / rowSize; //行数
        for (let i = 0; i < rowCount; i++) {
            rows.push(props.data.Result.slice(i * rowSize, (i + 1) * rowSize))
        }
        return rows;
    })

    // 跳转到检索详情页
    const showDetails = (infoCode) =>{
        router.push({path: '/detail',
        query: {
          code: infoCode, //根据所给码查找植物具体信息
        }
      });
    }

  </script>

  <style scoped>

    .result-container{
        width:70vw;
        border-radius:15px;
        margin-bottom:100px;
        padding:30px;
        background-color: rgb(216, 244, 229);
    }

    .title{
        font-family: fangsong;
        font-size: 40px;
        text-align: center;
        font-weight: bold;
        margin: 10px;
    }

    .card-container{
        display:flex;
        justify-content: center;
        align-items: center;
        border-radius:15px;
    }

    .item{
        width:250px;
        height:250px;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom:20px;
    }

    .item-gallery .item .image{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    .description {
        margin-bottom: 20px;
         /* padding-top:10px; */
        font-size: 14px;
        height: 20px; /* 设置固定高度 */
        /* white-space: nowrap;  */
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    }

    .name{
        font-size: 18px;
        font-weight: bold;
        /* text-align: center; */
    }

    .score{
        color:rgb(29, 187, 103);
        font-size: 20px;
        font-weight: bold;
    }

    .bottom {
        /* margin-top: 13px; */
        line-height: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }


  </style>