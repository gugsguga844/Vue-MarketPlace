<script setup>
defineProps({
  inputFor: {
    type: String,
    required: true,
  },
  formLabel: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>

<template>
  <div class="form-group d-flex flex-column">
    <label class="text-start fw-bold mb-2" :for="inputFor">{{ formLabel }}</label>
    <select :id="inputFor" class="form-select p-2 border-1 rounded-2 border-dark-subtle" v-model="model">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style scoped></style>