<template>
    <div class="growth-container">
        <el-row class="title"> 
            <PictureFilled style="width:32px;height:32px;margin-right:10px"></PictureFilled>图片    
        </el-row>
        <div class="type-container" v-if="imageList.flower">
            <el-row class="sub-title">花</el-row>
            <el-row>
                <el-col :span="4"
                    v-for="(item,index) in imageList.flower.slice(0,4)" :key="index" >
                    <span class="img-container" >
                        <img class="img" :src="item.image_url" alt="图片未加载">
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="type-container" v-if="imageList.fruit">
            <el-row class="sub-title">果</el-row>
            <el-row>
                <el-col :span="4"
                    v-for="(item,index) in imageList.fruit.slice(0,4)" :key="index" >
                    <span class="img-container" >
                        <img class="img" :src="item.image_url" alt="图片未加载">
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="type-container" v-if="imageList.leaf">
            <el-row class="sub-title">叶</el-row>
            <el-row>
                <el-col :span="4"
                    v-for="(item,index) in imageList.leaf.slice(0,4)" :key="index" >
                    <span class="img-container" >
                        <img class="img" :src="item.image_url" alt="图片未加载">
                    </span>
                </el-col>
            </el-row>
        </div>
        <div class="type-container" v-if="imageList.bark">
            <el-row class="sub-title">树皮</el-row>
            <el-row>
                <el-col :span="4"
                    v-for="(item,index) in imageList.bark.slice(0,4)" :key="index" >
                    <span class="img-container" >
                        <img class="img" :src="item.image_url" alt="图片未加载">
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'
    import { PictureFilled } from '@element-plus/icons-vue'

    const props = defineProps({
        imageList: {
            type:Object,
            required: true,
        }
    })
    props;
</script>

<style scoped>
    .growth-container{
        width:70vw;
        margin:0 auto;
    }

    .type-container{
       padding: 0 30px;
    }

    .title{
        color:rgb(18, 179, 69);
        font-weight: bold;
        font-size: 24px;
        margin:20px auto;
    }

    .sub-title{
        font-size: 20px;
        font-weight: bold;
        margin:20px auto;

    }

    .img-container{
        width:120px;
        height:120px;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom:20px;
    }

    .img-container .img{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }


</style>

<style>
    .distribution .el-descriptions__body .el-descriptions__table .el-descriptions__cell{
        line-height: 30px;
  }
</style>
