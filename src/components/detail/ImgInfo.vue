<template>
    <slot></slot>
    <div class="block text-center">
      <el-carousel height="300px" :autoplay="false">
        <el-carousel-item v-for="item in data.images" :key="item">
            <img :src="item" alt="获取图片错误" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
        data: {
            type:Array, //数据类型
            required:true
        },
  })
  console.log(props.data)

</script>

<style scoped>
    .image{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>

