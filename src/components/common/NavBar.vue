<template>
  <el-menu 
    :default-active="activeIndex" 
    mode="horizontal" 
    :ellipsis="false" 
    @select="handleSelect"
    style="background-color: transparent;">

    <!-- 首页/logo -->
    <el-menu-item index="home" class="logo">
      <img src="@/assets/logo/logo2.png" alt="FloraThumb Logo">
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="search" style="width:150px">搜索</el-menu-item>
    <el-menu-item index="identify" style="width:150px">识别</el-menu-item>

  </el-menu>

</template>


<script setup>
  import { ElMenu, ElMenuItem } from 'element-plus'
  import router from '@/router'
  const handleSelect = (key, keyPath) => {
  keyPath; // 用不到但是要写
  if (key === 'home') {
    router.push('/');
  } 
}
</script>

<style scoped>
    .logo img{
      max-width:100%;
      max-height:70%;
      width:auto;
      height:auto;
    }

    /* 菜单右对齐 */
    .flex-grow{
      flex-grow:1;
    }

</style>
