<script setup>
import { Star } from 'lucide-vue-next'
import AddToCartButton from './AddToCartButton.vue'

defineProps(['productName', 'productImage', 'productPrice', 'categoryName'])
</script>

<template>
  <div class="product-card rounded-1 shadow-lg bg-white">
    <div class="product-card-img">
      <img alt="" class="" :src="productImage" />
    </div>
    <div class="p-3">
      <div class="product-info d-flex justify-content-between">
        <h6>{{ categoryName }}</h6>
        <div class="d-flex gap-1">
          <Star style="width: 18px; height: 18px" />
          <p class="h6">4.8 (127)</p>
        </div>
      </div>
      <h3>{{ productName }}</h3>
      <div class="">
        <span class="h4">R${{ productPrice }}</span>
      </div>
    </div>
    <div class="p-4">
      <AddToCartButton />
    </div>
  </div>
</template>
