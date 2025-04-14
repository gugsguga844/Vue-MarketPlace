<script setup>
defineProps(['categoryName', 'categoryImage'])
</script>

<template>
  <div class="category-card rounded-1 shadow-lg">
    <div class="category-card-img">
      <img alt="" class="" :src="categoryImage" />
    </div>
    <div class="p-3 text-center">
      <h4 class="fw-bold">{{ categoryName }}</h4>
      <p class="h6">1245 produtos</p>
    </div>
  </div>
</template>

<style scoped>
.category-card {
  transition: 0.3s;
}

.category-card:hover {
  transform: scale(1.05);
}
</style>
