<!-- 搜索界面 -->
<template>
    <!-- 搜索结果显示栏 -->
    <el-container class="search-container">

        <!-- 有结果 -->
        <el-main v-if="searchResult" style="padding: 0" v-loading="isload">
            <!-- 行 -->
            <el-row v-for="(row, index) in plantRows" :key="index" style="padding-top:20px;">
            <!-- 列 -->
            <el-col v-for="(plant, i) in row" :key="i" :span="6" style="max-width:none;margin-bottom:5px;"
                class="center-container">
                <ResultCard :resultData="plant" @click="goDetail(plant)" >
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
        <!-- 没结果 -->
        <el-main v-else>
            <el-empty description="暂无结果~" />
        </el-main>
    </el-container>
  </template>

<script setup>
    import { searchPlants } from '@/utils/api.js'
    import { translate } from '@/utils/api.js'
    import { onMounted } from 'vue'
    import { ref, computed } from 'vue'
    import { useRoute } from "vue-router";
    import { onBeforeRouteUpdate } from "vue-router";
    import { ElContainer, ElMain, ElRow, ElPagination, ElMessage } from 'element-plus'
    import ResultCard from '@/components/search/ResultCard.vue'
    import router from '@/router'


    const route = useRoute();

    const isload = ref(false)

    const searchResult = ref(null); //返回结果
    const total = ref(0); //搜索总结果
    const currentPage = ref(1);  //当前页数
    const pageSize = 20;  //页大小
    const rowSize = 4;  //每行数量
    const key = ref(route.query.key);

    const trans_string = ref('')
    const basic_info = ref([]);

    const translate_name = () =>{
        translate({
            key: trans_string.value,
            from: 'auto',
            to: 'zh',
        })
        .then(resp=>{
            // 分割结果
            for (const i in searchResult.value.data){
                    basic_info.value[i]= {
                        scientific_name: resp.trans_result[i].dst,
                        image_url: searchResult.value.data[i].image_url,
                        common_name: searchResult.value.data[i].common_name,
                        slug: searchResult.value.data[i].slug,
                    }
                }
        })
        .catch(()=>{
            ElMessage.error('翻译失败！')
        })
    }
    

    // 分页获取搜索结果
    const getPage = () =>{
        isload.value = true;
        searchPlants({
            key: key.value,
            page: currentPage.value,
        })
            .then(resp=>{
                searchResult.value = resp;
                total.value = resp.meta.total;
                trans_string.value = '';
                for(const i in resp.data){
                    trans_string.value += (resp.data[i].scientific_name + '\n');
                }
                // 翻译
                translate_name();
            })
            .catch(()=>{
                ElMessage.error('获取搜索结果识别，请重试！')
            })
            .finally(()=>{
                isload.value = false;
            })

    }

    onMounted(()=>{
        isload.value = true;
        translate({
            key: key.value,
            from: 'auto',
            to: 'en',
        })
        .then(resp =>{
            key.value = resp.trans_result[0].dst;
            getPage(); //获取分页
        })
        .catch(()=>{
            ElMessage.error('翻译失败！');
        })
        .finally(()=>{
            isload.value = false;   
        })
    })

    // 计算属性，计算couponList中图片对应的行；每行4列
    const plantRows = computed(() => {
        const rows = [];  
        const rowCount = pageSize / rowSize; 
        for (let i = 0; i < rowCount; i++) {
            rows.push(basic_info.value.slice(i * rowSize, (i + 1) * rowSize));
        }
        return rows;
    })

    // 按页查看
    const handleCurrentChange = () =>{
        getPage();
    }

    // 监听路由参数变化（搜索）
    onBeforeRouteUpdate((to, from) =>{
        if(to.query.key !== from.query.key){
            isload.value = true;
            key.value = to.query.key;
            currentPage.value = 1;
            translate({
                key: key.value,
                from: 'auto',
                to: 'en',
            })
            .then(resp =>{
                key.value = resp.trans_result[0].dst;
                getPage(); //获取分页
            })
            .catch(()=>{
                ElMessage.error('翻译失败！');
            })
            .finally(()=>{
                isload.value = false;   
            })
        }
    });

    const goDetail = (info) =>{
        router.push({
            path: '/search/detail',
            query:{
                key: info.slug,
            }
        })
    }

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