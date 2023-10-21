<template>
    <el-card :body-style="{ margin: '0' }" class="card-container" style="margin:20px" shadow="hover">
        <!-- 图片 -->
        <div class="item">
            <img :src="resultData.image_url" v-if="resultData.image_url !== null" class="image" />
            <div class="image-slot" v-else>
                <el-icon class="icon"><Picture /></el-icon>
                <div style="font-size: 14px; ">暂无图片</div>
            </div>
        </div>
        <div class="name">{{ resultData.scientific_name }}</div>
        <div class="description" v-if="resultData.common_name!==null">{{ resultData.common_name }}</div>
        <div class="description" v-else>none</div>
    </el-card>
</template>

<script setup>
    import { defineProps } from 'vue'
    import { ElCard } from 'element-plus'
    import { Picture } from '@element-plus/icons-vue'

    const props = defineProps({
        resultData: {
            type: Object, //数据类型
            required:true
        },
    });
    props;

</script>

<style scoped>


    .card-container{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .item{
        width:200px;
        height:200px;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom:10px;
    }

    .item .image{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position: center;
        margin-bottom: 0;
    }

    .description {
        font-size: 14px;
        text-align:center;
        height: 20px; 
        color: gray;
        overflow: hidden; /* 防止内容溢出 */
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
        width: 200px;

    }

    .name{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        overflow: hidden ;/*超出部分隐藏*/
        text-overflow: ellipsis; /* 将溢出的文本替换为省略号 */
		white-space: nowrap; /* 防止内容换行 */
        width: 200px;
    }

    .image-slot{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 30px;
    }

    .icon{
        display: block;
    }

</style>