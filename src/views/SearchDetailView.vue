<template>
  <el-main class="detail-container"  v-if="detailData!==null">
    <!-- 基本信息 -->
    <el-row v-loading="isload" class="detail-row" style="border-bottom:1px solid rgba(193, 227, 198, 0.729) ">
        <!-- 图片 -->
        <el-col :span="8" class="center">
            <div class="img-container">
                <img :src="detailData.image_url" alt="图片未加载" class="img">
            </div>
        </el-col>
        <!-- 信息 -->
        <el-col :span="16" class="basic">
            <div class="name">{{  basic_data[0] }}</div>
            <div class="description" v-if="detailData.common_name!==null">{{  basic_data[1] }}</div>
            <div class="description" >{{  basic_data[2] }}科    {{  basic_data[3] }}属</div>
            <div class="author" >
                <Avatar style="width:25px;height:25px;margin-bottom:-2px"></Avatar>
                <span style="margin-left:5px"> {{ detailData.author }}</span>
            </div>
        </el-col>
    </el-row>
    <el-row v-loading="isload">
        <NamesCard class="other-info" :data="detailData.common_names"></NamesCard>
        <DistributionCard class="other-info" :data="detailData.distribution"></DistributionCard>
        <ImgCard class="other-info" :imageList="detailData.images"></ImgCard>
    </el-row>
  </el-main>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { getSpecialDetail } from '@/utils/api'
    import { Avatar } from '@element-plus/icons-vue'
    import { ElMain, ElRow, ElCol, ElMessage } from 'element-plus'
    import NamesCard from '@/components/search/NamesCard.vue'
    import DistributionCard from '@/components/search/DistributionCard.vue';
    import ImgCard from '@/components/search/ImgCard.vue';
    import { translate } from '@/utils/api.js'


    const route = useRoute();
    const detailData = ref(null);
    const isload = ref(false)
    const basic_data = ref([]);

    const en2zh = (data) =>{
        translate({
                key: data,
                from: 'auto',
                to: 'zh',
            })
            .then(resp =>{
                for (const i in resp.trans_result){
                    basic_data.value[i] = resp.trans_result[i].dst;
                }
            })
            .catch(()=>{
                ElMessage.error('中译英失败，请重试！')
            })
    }

    const getDetail = () =>{
        isload.value = true;
        getSpecialDetail({
            id: route.query.key,
        })
        .then(resp=>{
            detailData.value = resp.data;
            en2zh(detailData.value.scientific_name + "\n" 
                    + detailData.value.common_name + "\n" 
                    + detailData.value.family + "\n"
                    + detailData.value.genus);
        })
        .catch(()=>{
            ElMessage.error('获取详情失败，请重试！')
        })
        .finally(()=>{
            isload.value = false;
        })
    }

    onMounted(()=>{
        getDetail();
    })
</script>


<style scoped>

    .center{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .detail-container{
        margin:auto;
    }

    .detail-row{
        padding: 20px;
    }

    .img-container{
        width:300px;
        height:150px;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .basic{
        padding:30px 0;
    }

    .img-container .img{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    .name{
        font-size: 36px;
        font-weight: bold;
    }

    .author{
        margin: 15px 5px 0px 5px;
        font-size: 20px;
        color: rgb(14, 142, 54);
        font-weight: bold;
        
    }

    .description {
        color:rgb(97, 96, 96);
        margin: 5px;
        font-size: 16px;
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
    }
</style>