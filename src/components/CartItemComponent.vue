<script setup>
import { Minus, Plus } from 'lucide-vue-next';
import { useImageStore } from '@/stores/ImageStore'
import { useFormatPriceStore } from '@/stores/formatPrice';

defineProps(['imagePath', 'name', 'quantity', 'unitPrice', 'productId'])

const imageStore = useImageStore()
const format = useFormatPriceStore()

</script>

<template>
  <div class="cartItem d-flex align-items-center">
    <div class="cartImage">
      <img :src="imageStore.imageURL(imagePath)" alt="">
    </div>
    <div class="cartInfo d-flex flex-column align-items-start justify-content-between gap-3">
      <h6 class="text-primary">{{ name }}</h6>
      <span class="border-1">Tamanho: M</span>
    </div>
      <div class="d-flex gap-2 align-items-center">
        <button>
          <Minus />
        </button>
        <span class="border-1 fs-6 px-3">{{ quantity }}</span>
        <button>
          <Plus />
        </button>
      </div>
      <span class="product-price text-danger fw-bold">R$ {{ format.formatPrice(unitPrice) }}</span>
    </div>
    <div class="cartActions align-self-end">
      <i class="bi bi-trash3 text-danger fa-lg cursor-pointer p-2" @click="deleteFromCart(productId)"></i>
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
</style>