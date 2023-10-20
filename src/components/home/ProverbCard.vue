<!-- 获取花语箴言 -->
<template>
    <div class="proverb-container">
        <el-row class="proverb-row">
            <el-col :span="10">
                <img class="image" src="@/assets/home/proverb1.jpg">
            </el-col>
            <el-col :span="12" class="search-col" >
                <div class="title">查看花语箴言</div>
                <div class="description">凌霄花在盛夏的烈焰里高歌,</div>
                <div class="description">风信子在午夜的墙角下低吟,</div>
                <div class="description">或长或短的生命里,</div>
                <div class="description">每一朵花都有自己的故事,</div>
                <div class="description">留下花名,查看花儿致你的箴言:</div>
                <div class="center">
                    <el-input class="name-input"
                    style="width: 80%"
                    v-model="name"
                    placeholder="输入花名"
                    size="large"
                    >
                        <template #append>
                            <el-button :icon="Search" @click="getProverb" color="rgb(29, 187, 103)"/>
                        </template>
                </el-input>
                </div>
                <div class="center">
                    <div class="result" width="80%" v-if="showResult">
                        {{ proverb }}
                    </div>
                </div>


            </el-col>
        </el-row>
    </div>
</template>

<script setup>
    import { ElRow, ElCol, ElInput, ElButton } from 'element-plus'
    import { Search } from '@element-plus/icons-vue'
    import { ref, watch } from 'vue'
    import { getFlower } from '@/utils/api'

    const name = ref('');
    const proverb = ref('');
    const showResult = ref(false);

    watch(name,(newVal)=>{
        if ( newVal ==='')
            showResult.value = false;
    })

    const getProverb = () =>{
        console.log(name.value);
        getFlower(name)
        .then(resp =>{
            console.log(resp);
            proverb.value = "“ " + resp.result.flowerprov + " ”";
            console.log(proverb.value);
        })
        .catch(error =>{
            proverb.value = "“ " + name.value + '还没留下箴言哦，换个花名试试吧~' + " ”";
            console.log(proverb.value);
            console.log(error);
        })
        .finally(()=>{
            showResult.value = true;
        });
    }


</script>

<style scoped>
    .proverb-container{
        /* background-color: gainsboro; */
        /* height:70vh; */
        width:70vw;
        margin: 50px auto;

    }
    .center{
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .proverb-row{
        display: flex;
        /* margin-right: 10%; */
        justify-content: space-between;
        /* align-items: center; */
        padding:30px;
    }

    .description{
        line-height:30px;
        font-family: serif;
        font-weight: bold;
        font-style: italic;
        text-align: center;
    }

    .result{
        font-family: serif;
        /* font-style: italic; */
        font-style: 20px;
        font-weight: bold;
    }

    .title{
        font-size: 30px;
        /* font-weight: bolder; */
        color: rgb(29, 187, 103);
        margin-bottom:20px;
        text-align:center;
    }

    .search-col{
        margin-top:20px;
    }

    .name-input{
        margin:30px 0;
    }



    .image{
        height:400px;
    }

</style>