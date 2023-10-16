<template>
    <div class="banner">
        <HomeBanner />
    </div>
    <div class="identify-wrapper center">
        <IdentifyCard />
    </div>
</template>

<script setup>
    import HomeBanner from '@/components/home/HomeBanner'
    import IdentifyCard from '@/components/home/IdentifyCard'
    // import { ElRow } from 'element-plus'
    
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