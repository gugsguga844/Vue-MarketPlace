<script setup>
defineProps(['formButtonText', 'buttonStyle'])
</script>

<template>
  <button class="py-3 w-100 rounded-5 bg-black text-white" :class="buttonStyle">
    {{ formButtonText }}
  </button>
</template>

<style scoped></style>
