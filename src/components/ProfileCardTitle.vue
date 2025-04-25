<script setup>
defineProps(['profileCardTitle', 'profileCardDescription'])
</script>

<template>
  <div class="d-flex justify-content-between title-info mb-3">
    <div class="d-flex flex-column mb-3">
      <h4 class="fw-bold">{{ profileCardTitle }}</h4>
      <p class="text-muted fw-bold mb-0">{{ profileCardDescription }}</p>
    </div>
    <div class="min-w-50">
      <slot></slot>
    </div>
  </div>
</template>
