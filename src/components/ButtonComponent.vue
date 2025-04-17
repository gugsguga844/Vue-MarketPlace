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

.buttonBlack:hover {
  background-color: #1a1a1a;
}

.buttonWhite {
  background-color: white;
  color: black;
  border: 1px solid #9b9b9b;
}

.buttonWhite:hover {
  background-color: #dee2e6;
}

.buttonYellow {
  background-color: #5c90b3;
  color: #ffffff;
  border-radius: 10px;
  font-weight: bold;
}

.buttonDelete {
  background-color: red;
  color: white;
}

.buttonDelete:hover {
  background-color: #ff2a2a;
}

.buttonRed {
  background-color: #ff0000;
  color: white;
}

.buttonRed:hover {
  background-color: #ff1d1d;
}

.bigRadius {
  border-radius: 50px;
}

.smallRadius {
  border-radius: 5px;
}
</style>
