<script setup>
defineProps(['labelIcon', 'formLabel', 'inputFor', 'inputType', 'inputPlaceholder'])
const model = defineModel()
</script>

<template>
  <div class="form-field d-flex flex-column mb-4">
    <label class="text-start fw-bold mb-2 text-dark" :for="inputFor"
      ><i :class="labelIcon"></i> {{ formLabel }}
    </label>
    <input
      autofocus
      :id="inputFor"
      :name="inputFor"
      class="p-2 border-1 border-bottom rounded-2 border-dark-subtle text-dark"
      :type="inputType"
      :placeholder="inputPlaceholder"
      v-model="model"
    />
  </div>
</template>

<style scoped>
input::placeholder {
  color: #a5a5a5;
}
</style>

