<template>
    <div class="block text-center">
      <el-carousel height="60vh" type="card">
        <el-carousel-item >
          <img src="@/assets/home/flower1.jpg" alt="Flora Image" class="carousel-image" />
        </el-carousel-item>
        <el-carousel-item >
          <img src="@/assets/home/flower2.jpg" alt="Flora Image" class="carousel-image" />
        </el-carousel-item>
        <el-carousel-item >
          <img src="@/assets/home/flower6.jpg" alt="Flora Image" class="carousel-image" />
        </el-carousel-item>
        <el-carousel-item >
          <img src="@/assets/home/flower4.jpg" alt="Flora Image" class="carousel-image" />
        </el-carousel-item>
        <el-carousel-item >
          <img src="@/assets/home/flower3.jpg" alt="Flora Image" class="carousel-image" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </template>

<script setup>
  import { ElCarousel, ElCarouselItem } from "element-plus"
</script>
  
  
  <style scoped>
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>