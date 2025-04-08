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
  modelValue: {
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
  <div class="form-group">
    <label :for="inputFor">{{ formLabel }}</label>
    <select :id="inputFor" class="form-select" v-model=model>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<style scoped></style>