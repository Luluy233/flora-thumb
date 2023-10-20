<!-- 搜索界面 -->
<template>
    <!-- 优惠券显示栏 -->
    <el-container class="search-container" v-loading="isload">
      <!-- 没有优惠券 -->
      <el-main v-if="total === 0">
        <el-empty description="暂无结果~" />
      </el-main>
  
      <!-- 有优惠券 -->
      <el-main v-if="total !== 0" style="padding: 0" >
        <!-- 行 -->
        <el-row v-for="(row, index) in plantRows" :key="index" style="padding-top:20px;">
          <!-- 列 -->
          <el-col v-for="(plant, i) in row" :key="i" :span="6" style="max-width:none;margin-bottom:5px;"
            class="center-container">
            <ResultCard :resultData="plant" >
            </ResultCard>
          </el-col>
        </el-row>
        <!-- 分页栏 -->
        <el-row class="pagination">
          <el-pagination background v-model:currentPage="currentPage" v-model:pageSize="pageSize" :small="small"
            layout="prev, pager, next, jumper" :total="total"
            @current-change="handleCurrentChange" />
        </el-row>
      </el-main>
    </el-container>
  </template>

<script setup>
    import { searchPlants } from '@/utils/api.js'
    import { onMounted } from 'vue'
    import { ref, computed } from 'vue'
    import { useRoute } from "vue-router";
    import { onBeforeRouteUpdate } from "vue-router";
    import { ElContainer, ElMain, ElRow, ElPagination } from 'element-plus'
    import ResultCard from '@/components/search/ResultCard.vue'

    const route = useRoute();

    const isload = ref(false)

    const searchResult = ref(null); //返回结果
    const total = ref(0); //搜索总结果
    const currentPage = ref(1);  //当前页数
    const pageSize = 20;  //页大小
    const rowSize = 4;  //每行数量
    const key = ref(route.query.key);

    const getPage = () =>{
        isload.value = true;
        searchPlants({
            key: key.value,
            page: currentPage.value,
        })
        .then(resp=>{
            console.log(resp);
            searchResult.value = resp;
            total.value = resp.meta.total;
        })
        .catch(error=>{
            console.log(error);
        })
        .finally(()=>{
            isload.value = false;
        })
    }

    onMounted(()=>{
        getPage();
    })

    // 计算属性，计算couponList中图片对应的行；每行4列
    const plantRows = computed(() => {
        const rows = [];  //二维数组，rows[i]存储第i行的店铺卡牌（4个）
        const rowCount = pageSize / rowSize; //行数
        for (let i = 0; i < rowCount; i++) {
            rows.push(searchResult.value.data.slice(i * rowSize, (i + 1) * rowSize));
        }
        return rows;
    })

    const handleCurrentChange = () =>{
        getPage();
    }

    onBeforeRouteUpdate((to, from) =>{
        console.log(to);
        if(to.query.key !== from.query.key){
            key.value = to.query.key;
            console.log(key.value);
            currentPage.value = 1;
            getPage();

        }
    });

</script>

<style scoped>

    .search-container{
        width:80vw;
        margin: 50px auto;
    }
    .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: center;
    text-align: center;
    }

</style>