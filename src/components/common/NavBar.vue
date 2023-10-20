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

    <el-menu-item style="width:100%" class="search-bar">
      <SearchBar></SearchBar>
    </el-menu-item>

    <div class="flex-grow" />
    <!-- <el-menu-item index="search" style="width:150px">专业搜索</el-menu-item> -->

    <el-menu-item index="identify" style="width:150px">识别</el-menu-item>
    <el-menu-item index="proverb" style="width:150px">花语箴言</el-menu-item>
  </el-menu>

</template>


<script setup>
  import { ElMenu, ElMenuItem } from 'element-plus'
  import router from '@/router'
  import SearchBar from '@/components/common/SearchBar.vue'


  const handleSelect = (key, keyPath) => {
    keyPath; // 用不到但是要写
    if (key === 'home') {
      router.push('/');
    } 
    else if ( key === 'identify'){
      router.push('/identify')
    }
    else if ( key === 'proverb'){
      router.push('/proverb')
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

    .search-bar:hover{
      color: inherit !important; /* 保持文本颜色不变 */
      background-color: inherit !important; /* 保持背景颜色不变 */
    }

</style>
