<script setup>
defineProps(['formLabel', 'inputFor', 'inputType', 'inputIcon'])
</script>

<template>
  <div class="form-field d-flex flex-column">
    <label class="text-start fw-bold" :for="inputFor"> {{ formLabel }} </label>
    <input
      :id="inputFor"
      class="p-2 border-1 border-dark-subtle"
      :type="inputFor"
      :placeholder="inputIcon"
    />
  </div>
</template>
