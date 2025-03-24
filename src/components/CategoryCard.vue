<script setup>
defineProps(['categoryName', 'categoryImage'])
</script>

<template>
  <div class="category-card rounded-1 border-1">
    <div class="category-card-img">
      <!-- <img alt="" class="" :src="categoryImage" /> -->
      <img alt="" class="" src="../assets/images/eletronics.jpg" />
    </div>
    <div class="p-3 text-center">
      <h4 class="fw-bold">{{ categoryName }}</h4>
      <p class="h6">1245 produtos</p>
    </div>
  </div>
</template>
