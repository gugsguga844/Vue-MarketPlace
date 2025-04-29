<script setup>
import { useImageStore } from '@/stores/ImageStore'
import { useFormatPriceStore } from '@/stores/formatPrice';
import ChangeQuantity from './ChangeQuantity.vue';

defineProps(['imagePath', 'name', 'quantity', 'unitPrice', 'productId', 'totalAmount'])

const imageStore = useImageStore()
const format = useFormatPriceStore()

</script>

<template>
  <div class="cartItem d-flex align-items-center justify-content-between p-3 border-1 border-light-subtle">
    <div class="d-flex">
      <div class="cartImage">
        <img :src="imageStore.imageURL(imagePath)" alt="">
      </div>
      <div class="cartInfo ms-3 d-flex flex-column align-items-start justify-content-center gap-1">
        <h6 class="text-primary fw-bold">{{ name }}</h6>
        <span class="border-1 border-dark-subtle rounded-5 py-1 px-2 text-secondary fs-7">Tamanho: M</span>
      </div>
    </div>
    <div class="d-flex gap-4 align-items-center">
      <ChangeQuantity :quantity="quantity" />
      <div class="d-flex flex-column">
        <span class="product-price text-danger fw-bold">R$ {{ format.formatPrice(totalAmount) }}</span>
        <span class="product-price text-secondary fw-bold">R$ {{ format.formatPrice(unitPrice) }} un</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cartImage {
  width: 120px;
  height: 120px;
  overflow: hidden;
}

.cartImage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.fs-7 {
  font-size: 0.9rem;
}
</style>