<script setup>
defineProps({
  categoryName: String,
  categoryImage: String,
})
</script>

<template>
  <div
    class="category-card-bg"
    :style="{ backgroundImage: `url('${categoryImage}')` }"
  >
    <div class="category-card-overlay">
      <h4 class="category-title">{{ categoryName }}</h4>
    </div>
  </div>
</template>

<style scoped>
.category-card-bg {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: flex-end;
}
.category-card-bg:hover {
  transform: scale(1.04) translateY(-4px);
  box-shadow: 0 8px 32px rgba(220,53,69,0.18);
}
.category-card-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg,rgba(20,20,20,0.15) 40%,rgba(0,0,0,0.65) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 24px;
}
.category-title {
  color: #fff;
  font-weight: bold;
  font-size: 1.4rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.7);
  letter-spacing: 1px;
  margin: 0;
}
</style>
