<script setup>
defineProps(['formButtonText', 'buttonStyle', 'buttonType'])
</script>

<template>
  <button type="buttonType" class="py-3 w-100 rounded-5" :class="buttonStyle">
    {{ formButtonText }}
  </button>
</template>

<style scoped>
.redButton {
  background-color: #ff0000;
  color: white;
}

.redButton:hover {
  background-color: #ff1d1d;
}

.blackButton {
  background-color: black;
  color: white;
}

.blackButton:hover {
  background-color: #1a1a1a;
}
</style>
