<script setup>
import { Star } from 'lucide-vue-next'

defineProps(['productName', 'productImage', 'productPrice'])
</script>

<template>
  <div class="product-card rounded-1 border-1">
    <div class="product-card-img">
      <!-- <img alt="" class="" :src="productImage" /> -->
      <img alt="" class="" src="../assets/images/noimage.jpg" />
    </div>
    <div class="p-3">
      <div class="product-info d-flex justify-content-between">
        <h6>Eletrônicos</h6>
        <div class="d-flex">
          <Star />
          <p class="h6">4.8 (127)</p>
        </div>
      </div>
      <h3>{{ productName }}</h3>
      <h4 class="fw-bold">{{ categoryName }}</h4>
      <div class="">
        <span class="h6">R${{ productPrice }}</span>
      </div>
    </div>
  </div>
</template>
