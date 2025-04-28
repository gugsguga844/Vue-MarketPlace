<script setup>
import { Star } from 'lucide-vue-next'
import { useFormatPriceStore } from '@/stores/formatPrice'

const formatPrice = useFormatPriceStore()

defineProps(['productName', 'productImage', 'productPrice', 'categoryName'])
</script>

<template>
  <div class="product-card rounded-3 bg-white border shadow-md text-dark h-100 d-flex flex-column">
    <div class="product-card-img bg-light d-flex align-items-center justify-content-center">
      <img alt="" class="product-img" :src="productImage" />
    </div>
    <div class="p-3 flex-grow-1 d-flex flex-column justify-content-between">
      <div class="wrapper">
        <div class="product-info d-flex justify-content-between align-items-center mb-3">
          <h6 class="text-danger mb-0">{{ categoryName }}</h6>
          <div class="d-flex gap-1 align-items-center">
            <Star style="width: 18px; height: 18px; color: #ff0000;" />
            <p class="h6 text-secondary mb-0">4.8 (127)</p>
          </div>
        </div>
        <h6 class="product-name text-dark mb-2">{{ productName }}</h6>
      </div>
      <div class="mb-2">
        <span class="h5 text-danger">R${{ formatPrice.formatPrice(productPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  min-height: 390px;
  max-width: 100%;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.product-card:hover .product-name {
  color: #ff0000;
}

.product-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.product-card-img {
  width: 100%;
  aspect-ratio: 4/3;
  min-height: 160px;
  max-height: 210px;
  overflow: hidden;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
}

.product-img {
  width: 100%;
  height: 100%;
  max-height: 210px;
  object-fit: contain;
  aspect-ratio: 4/3;
  display: block;
  background: #ffffff;
  transition: 0.2s;
}

.product-img:hover {
  transform: scale(1.07);
}
</style>
