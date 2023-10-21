<template>
  <div style="font-size:24px;font-weight:bold;margin-top: 20px">
    {{ data.nameStd}}
  </div>
  <div style="margin:10px 0">{{ data.nameLt}}</div>

    <el-descriptions class="baisc" 
      :column="1" >
      <el-descriptions-item>
        {{data.familyCn}} {{data.genusCn}}
      </el-descriptions-item>    

      <el-descriptions-item class="basic-desc">
        <template #label>
          <div class="cell-item">
            植物描述
          </div>
        </template>
        {{data.description}}
      </el-descriptions-item>

    </el-descriptions>
</template>

<script setup>
  import { defineProps } from 'vue'
  

  const props = defineProps({
        data: {
            type: Object, //数据类型
            required:true
        },
    });
  props;

</script>

<style scoped>
    .cell-item{
      font-size:18px;
      font-weight: bold;
      color:rgb(35, 156, 92);
    }
</style>

<style>
  .basic-desc .el-descriptions__body .el-descriptions__table .el-descriptions__cell{
    line-height:25px!important;
    margin-top:20px!important;
  }
</style>