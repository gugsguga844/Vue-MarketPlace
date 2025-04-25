<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/ProductStore';

defineProps(['productCategory'])

const productData = useProductStore()

onMounted(() => {
  console.log('Produto: ', productData.product)
})
</script>

<template>
  <div class="container-fluid">
    <div class="breadcrumb">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">{{ productData.product.name }}</RouterLink>
      <RouterLink to="/">{{ productData.product.name }}</RouterLink>
    </div>
  </div>
</template>