<template>
    <div class="distribution-container" v-if=" nativeString || introducedString">
        <!-- 别名 -->
        <el-row class="title">
            <LocationFilled style="width:32px;height:32px;margin-right:10px"></LocationFilled>分布   
        </el-row>
        <el-descriptions :column="1" class="distribution" > 
            <el-descriptions-item v-if="nativeString">
                <template #label>
                <div class="cell-item">
                    <Location style="width:25px;height:25px;margin-right:10px;margin-bottom:-5px"></Location>本土
                </div>
                </template>
                {{nativeString}}
            </el-descriptions-item>
            <el-descriptions-item v-if="introducedString">
                <template #label>
                <div class="cell-item">
                    <AddLocation style="width:25px;height:25px;margin-right:10px;margin-bottom:-5px"></AddLocation>引进
                </div>
                </template>
                {{introducedString}}
            </el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
    import { defineProps, onMounted, ref } from 'vue'
    import { LocationFilled, AddLocation, Location } from '@element-plus/icons-vue'
    import { translate } from '@/utils/api.js'
    import { ElMessage } from 'element-plus'
    

    const nativeString = ref(null)
    const introducedString = ref(null)

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    onMounted(()=>{
        if(props.data.native){
            nativeString.value = props.data.native.join('; ')
            translate({
                key: nativeString.value,
                from: 'auto',
                to: 'zh',
            })
            .then(resp =>{
                nativeString.value = resp.trans_result[0].dst;
            })
            .catch(()=>{
                ElMessage.error('中译英失败，请重试！')
            })
        }
        if(props.data.introduced){
            introducedString.value = props.data.introduced.join('; ')
            translate({
                key: introducedString.value,
                from: 'auto',
                to: 'zh',
            })
            .then(resp =>{
                introducedString.value = resp.trans_result[0].dst;
            })
            .catch(()=>{
                ElMessage.error('中译英失败，请重试！')
            })
        }


    })


</script>

<style scoped>
    .distribution-container{
        width:70vw;
        margin:0 auto;
    }

    .title{
        color:rgb(18, 179, 69);
        font-weight: bold;
        font-size: 24px;
        margin:20px auto;
    }

    .distribution{
        margin: auto 3vw;
    }

    .distribution  .cell-item{
        font-size:18px;
        font-weight: bold;
    }


</style>

<style>
    .distribution .el-descriptions__body .el-descriptions__table .el-descriptions__cell{
        line-height: 30px;
  }
</style>
