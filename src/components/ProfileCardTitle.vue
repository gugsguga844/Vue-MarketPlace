<script setup>
defineProps(['profileCardTitle', 'profileCardDescription'])
</script>

<template>
  <div class="title-info mb-3">
    <h4 class="fw-bold">{{ profileCardTitle }}</h4>
    <p class="text-muted fw-bold">{{ profileCardDescription }}</p>
  </div>
</template>
