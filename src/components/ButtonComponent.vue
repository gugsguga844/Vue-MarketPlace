<script setup>
defineProps(['buttonText', 'buttonStyle', 'buttonType'])
</script>

<template>
  <button type="buttonType" class="py-2 px-8" :class="buttonStyle">{{ buttonText }}</button>
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

.buttonDelete {
  background-color: white;
  color: red;
}

.bigRadius {
  border-radius: 50px;
}

.smallRadius {
  border-radius: 5px;
}
</style>
