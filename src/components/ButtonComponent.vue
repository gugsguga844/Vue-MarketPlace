<script setup>
defineProps(['buttonText', 'buttonStyle'])
</script>

<template>
  <button class="py-2 px-8" :class="buttonStyle">{{ buttonText }}</button>
</template>

<style scoped>
.buttonBlack {
  background-color: black;
  color: white;
}

.buttonWhite {
  background-color: white;
  color: black;
}

.bigRadius {
  border-radius: 50px;
}

.smallRadius {
  border-radius: 5px;
}
</style>
