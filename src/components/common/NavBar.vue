<template>
  <el-menu 
    :default-active="activeIndex" 
    mode="horizontal" 
    :ellipsis="false" 
    @select="handleSelect"
    background-color="rgb(187, 255, 218) transparent"
    text-color="black"
    active-text-color="rgb(31, 170, 96)">

    <!-- 首页/logo -->
    <el-menu-item index="home" class="logo">
      <img src="@/assets/logo/logo2.png" alt="FloraThumb Logo">
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="search" style="width:150px">专业搜索</el-menu-item>
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
  else if( key === 'search'){
    router.push('/search');
  }
  else if ( key === 'identify'){
    router.push('/identify')
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
