<script setup>
defineProps(['quantity'])
</script>

<template>
  <div class="d-flex gap-2 align-items-center border-1 border-dark-subtle">
    <button type="button" class="border-0 fs-6 px-2 py-1">-</button>
    <span>{{ quantity }}</span>
    <button type="button" class="border-0 fs-6 px-2">+</button>
  </div>
</template>

<style scoped></style>
