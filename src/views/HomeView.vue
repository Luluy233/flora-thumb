<template>
    <div class="banner">
        <HomeBanner />
    </div>
    <div class="identify-wrapper center" >
        <IdentifyCard :data="resultInfo" @identify="identifyPlants"/>
    </div>
    <div class="center" v-if="showResult">
        <ResultCard :data="resultInfo"/>
    </div>
    <div class="center">
        <ProverbCard></ProverbCard>
    </div>
</template>

<script setup>
    import HomeBanner from '@/components/home/HomeBanner'
    import IdentifyCard from '@/components/home/IdentifyCard'
    import ResultCard from '@/components/home/ResultCard'
    import ProverbCard from '@/components/home/ProverbCard'
    import { ref } from 'vue'

    const resultInfo = ref();  //识别结果
    const showResult = ref(false);

    const identifyPlants = (val) =>{
        resultInfo.value = val.content;
        showResult.value = true;
    }
    
</script>

<style scoped>
    .banner,
    .identify-wrapper{
        margin:50px 30px;
    }

    .center{
        display:flex;
        justify-content: center;
        align-items: center;
    }

</style>