<template>
    <div class="search-container">
        <el-input :prefix-icon="Search" v-model="searchKeyword" placeholder="请输入植物名称" clearable class="search-input">
        </el-input>
        <el-button type="success" @click="search" class="search-button">搜索</el-button>
    </div>
</template>

<script setup>
    import { Search } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import router from '@/router'


    const searchKeyword = ref('')

    const search = () =>{
        router.push({path:'/search',
            query: {
                key: searchKeyword.value, //根据所给码查找植物具体信息
            }
        })
    }


</script>

<style scoped>
    .search-container{
      border: 2px solid rgb(18, 179, 69);
      margin: auto;
      border-radius: 6px;
      width:50%;
    }

    .search-input {
      flex: 1;
      float: left;
      width: 80%;
      height: 40px;
      outline: none;
      border: none;
    }

    .search-button {
      min-width: 60px;
      float: left;
      width: 20%;
      height: 40px;
      color: white;
      border-radius: 0 4px 4px 0;
      outline: none;
    }
</style>

<style>
    .search-input .el-input__wrapper{
        box-shadow: none !important;
        border-radius: none !important;
    }
</style>