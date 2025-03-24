<script setup>
defineProps(['titleText', 'linkText'])
</script>

<template>
  <div class="flex justify-content-lg-between mb-8">
    <h2 class="fw-bold">
      {{ titleText }}
    </h2>

    <RouterLink to="/"> {{ linkText }} </RouterLink>
  </div>
</template>
