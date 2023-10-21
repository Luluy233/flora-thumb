<template>
    <div class="info-container">
        <!-- 别名 -->
        <el-row class="title"> 
            <List style="width:32px;height:32px;margin-right:10px"></List>常用名 
        </el-row>
        <el-descriptions :column="2" class="common-name" border> 
            <el-descriptions-item label="阿拉伯" v-if="data.ar">{{ data.ar[0] }}</el-descriptions-item>
            <el-descriptions-item label="阿塞拜疆" v-if="data.az">{{ data.az[0] }}</el-descriptions-item>
            <el-descriptions-item label="白俄罗斯" v-if="data.cv">{{ data.cv[0] }}</el-descriptions-item>
            <el-descriptions-item label="保加利亚" v-if="data.bg">{{ data.bg[0] }}</el-descriptions-item>
            <el-descriptions-item label="捷克" v-if="data.cs">{{ data.cs[0] }}</el-descriptions-item>
            <el-descriptions-item label="马拉雅拉姆" v-if="data.ml">{{ data.ml[0] }}</el-descriptions-item>
            <el-descriptions-item label="爱沙尼亚" v-if="data.et">{{ data.et[0] }}</el-descriptions-item>
            <el-descriptions-item label="克罗地亚" v-if="data.hr">{{ data.hr[0] }}</el-descriptions-item>
            <el-descriptions-item label="乌克兰" v-if="data.uk">{{ data.uk[0] }}</el-descriptions-item>
            <el-descriptions-item label="土耳其" v-if="data.tr">{{ data.tr[0] }}</el-descriptions-item>
            <el-descriptions-item label="葡萄牙" v-if="data.pt">{{ data.pt[0] }}</el-descriptions-item>
            <el-descriptions-item label="匈牙利" v-if="data.pol">{{ data.pol[0] }}</el-descriptions-item>
            <el-descriptions-item label="波斯" v-if="data.fa">{{ data.fa[0] }}</el-descriptions-item>
            <el-descriptions-item label="波兰" v-if="data.pl">{{ data.pl[0] }}</el-descriptions-item>
            <el-descriptions-item label="俄国" v-if="data.ru">{{ data.ru[0] }}</el-descriptions-item>
            <el-descriptions-item label="斯洛伐克" v-if="data.se">{{ data.se[0] }}</el-descriptions-item>
            <el-descriptions-item label="挪威" v-if="data.nn">{{ data.nn[0] }}</el-descriptions-item>
            <el-descriptions-item label="法国" v-if="data.fr">{{ data.fr[0] }}</el-descriptions-item>
            <el-descriptions-item label="德国" v-if="data.de">{{ data.de[0] }}</el-descriptions-item>
            <el-descriptions-item label="中国" v-if="data.zh && data.zh[1]">{{ data.zh[1] }}</el-descriptions-item>
            <el-descriptions-item label="中国" v-else-if="data.zh && data.zh[0]">{{ data.zh[0] }}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue'
    import { List } from '@element-plus/icons-vue'

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })
    props;
</script>

<style scoped>
    .info-container{
        width:70vw;
        margin:20px auto;
        /* background-color: red; */
    }

    .title{
        color:rgb(18, 179, 69);
        font-weight: bold;
        font-size: 24px;
        margin:20px auto;
    }

    .common-name{
        margin: auto 3vw;
    }


</style>

<style>

    .common-name .el-descriptions__body .el-descriptions__table .el-descriptions__cell{
        text-align: center;
    }
</style>