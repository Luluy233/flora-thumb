<!-- 植物详情显示 -->
<template>
  <el-container class="detail-container">
    <!-- 页头 -->
    <el-header color="gray">
        <el-page-header @back="goBack" :icon="ArrowLeft" style="margin:20px">
            <template #content>
            <span style="color:gray;font-size: 16px;"> 植物详情 </span>
            </template>
        </el-page-header>
    </el-header>
    <!-- 主体 -->
    <el-main v-if="showDetails" class="detail-main">
        <!-- 基本信息 -->
        <el-card>
            <el-row class="detail-row">
                <!-- 图片 -->
                <el-col  :span="8">
                    <ImgInfo :data="detailData" />
                </el-col>
                <!-- 信息 -->
                <el-col :span="14" :offset="2" >
                    <BasicInfo :data="detailData" />
                </el-col>
            </el-row>
        </el-card>
        <!-- 其它信息 -->
        <el-row >
            <el-card class="extern-info detail-row"><ExternInfo :data="detailData.info"></ExternInfo></el-card>
        </el-row>

    </el-main>
  </el-container>

</template>

<script setup>
    import { ElContainer, ElMain, ElHeader, ElMessage } from 'element-plus';
    import { ArrowLeft } from '@element-plus/icons-vue'
    import { getPlantsInfo } from '@/utils/api.js'
    import { useRoute } from "vue-router";
    import router from '@/router'
    import { onMounted } from 'vue'
    import { ref } from 'vue'
    import BasicInfo from '@/components/detail/BasicInfo'
    import ImgInfo from '@/components/detail/ImgInfo'
    import ExternInfo from '@/components/detail/ExternInfo'

    const route = useRoute()

    const detailData = ref();//详细信息
    const showDetails = ref(false);

    onMounted(()=>{
        getPlantsInfo({
            code: route.query.code,
        })
        .then(resp =>{
            detailData.value = resp.result;
            showDetails.value = true;
        })
        .catch(() =>{
            ElMessage.error('获取植物信息失败，请重试！')
        })
    })

    const goBack = () =>{
        router.push({path:'/'})
    }

</script>


<style scoped>
    .center{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .detail-main{
        margin: 0 10vw 50px 10vw;
    }

    .detail-container{
        background-color: #e7f7ea;
    }

    .extern-info{
        margin-top:50px;
    }
    .detail-row{
        padding:50px;
    }
</style>