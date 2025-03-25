<script setup>
defineProps(['formButtonText', 'buttonStyle'])
</script>

<template>
  <button class="py-3 w-100 rounded-5" :class="buttonStyle">{{ formButtonText }}</button>
</template>

<style scoped>
.blackButton {
  background-color: black;
  color: white;
}
</style>
