<template>
  <el-descriptions :column="1" class="extern-desc">
      
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            相关诗词
          </div>
        </template>
        {{data.xgsc}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            植物功用
          </div>
        </template>
        {{data.jzgy}}
      </el-descriptions-item>

      <el-descriptions-item v-if="data.hyyy !== ''">
        <template #label>
          <div class="cell-item">
            花语语义
          </div>
        </template>
        {{data.hyyy}}
      </el-descriptions-item>    

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            分布地区
          </div>
        </template>
        {{data.fbdq}}
      </el-descriptions-item >

      <el-descriptions-item v-if="data.mcll !== ''">
        <template #label>
          <div class="cell-item">
            名称来历
          </div>
        </template>
        {{data.mcll}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            养护技术
          </div>
        </template>
        {{data.yhjs}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            表型特征
          </div>
        </template>
        {{data.bxtz}}
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            花开时节
          </div>
        </template>
        {{data.hksj}}
      </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { onMounted } from 'vue'

  const props = defineProps({
        data: {
            type:Object, //数据类型
            required:true
        },
    })
  
    onMounted(()=>{
      console.log("this is extern info",props.data)
    })

</script>

<style scoped>
  .cell-item{
    font-size:18px;
    font-weight: bold;
    color:rgb(35, 156, 92);
  }
</style>

<style>
  .extern-desc .el-descriptions__body .el-descriptions__table .el-descriptions__cell{
    line-height: 25px !important;
  }
</style>