<script setup>
defineProps({
  categoryName: String,
  categoryImage: String,
})
</script>

<template>
  <div class="category-card-custom card border-1 shadow-sm w-100 text-center h-100 p-3 d-flex flex-column align-items-center justify-content-center">
    <div class="category-card-img-custom d-flex align-items-center justify-content-center mb-2">
      <img :alt="categoryName" class="rounded-circle category-img-custom" :src="categoryImage" />
    </div>
    <h4 class="fw-bold mb-1 mt-2">{{ categoryName }}</h4>
  </div>
</template>

<style scoped>
.category-card-custom {
  transition: transform 0.2s, box-shadow 0.2s;
  min-height: 170px;
  background: #fff;
  cursor: pointer;
}
.category-card-custom:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 8px 24px rgba(220,53,69,0.13);
  border: 1.5px solid #ff0000;
}
.category-img-custom {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: #f8f9fa;
  border: 1px solid #ececec;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
</style>
