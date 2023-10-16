<template>
    <el-container class="bgc-green">
        <el-aside class="center bgc-green aside" width="30vw">
            <img src="@/assets/logo/logo1.png">
        </el-aside>

        <el-main class="main-container bgc-green">
            <el-row style="height:30px">
                <el-col :span="20" class="center">联系地址：上海市嘉定区安亭镇4800号</el-col>
            </el-row>
            <el-row style="height:30px">
                <el-col :span="20" class="center">邮箱：1156504938@qq.com</el-col>
            </el-row>
            <el-row class="text">
                <el-col :span="20" class="center">Copyright © @Luluy233</el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script setup>
    import { ElContainer, ElMain, ElAside, ElRow } from 'element-plus';
</script>

<style scoped>

    .center{
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .bgc-green{
        background-color: rgb(180, 219, 198);
    }

    .aside{
        /* border-right: 1px solid #6c8665; */
    }

    .main-container{
        padding:50px;
    }

     .center img{
        width:180px;
    }

    .text{
        font-size: .875em;
        color: #6c757d;
        height:30px;
    }
</style>