<script setup>
defineProps(['profileCardTitle', 'profileCardDescription'])
</script>

<template>
  <div class="title-info m-3">
    <h4>{{ profileCardTitle }}</h4>
    <p>{{ profileCardDescription }}</p>
  </div>
</template>
