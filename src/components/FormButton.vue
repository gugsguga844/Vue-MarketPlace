<script setup>
defineProps(['formButtonText', 'buttonStyle', 'buttonType'])
</script>

<template>
  <button type="buttonType" class="py-3 w-100 rounded-5 bg-black text-white" :class="buttonStyle">
    {{ formButtonText }}
  </button>
</template>

<style scoped></style>
