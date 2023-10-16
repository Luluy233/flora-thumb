<template>
  <el-container id="app">
    
      <el-header class="navBar">
        <NavBar/>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="footer">
        <MyFooter />
      </el-footer>
  </el-container>
</template>

<script setup>
import NavBar from "@/components/common/NavBar.vue";
import MyFooter from "@/components/common/MyFooter.vue";
import { ElContainer,ElHeader,ElFooter,ElMain } from "element-plus";


</script>

<style>
*{
  margin:0;
  padding:0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navBar {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 100;
  padding:0;
}

.main{
  padding:0;
}

.footer{
  padding:0;
}




</style>
