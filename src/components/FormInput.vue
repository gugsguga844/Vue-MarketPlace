<script setup>
defineProps(['labelIcon', 'formLabel', 'inputFor', 'inputType', 'inputPlaceholder'])
const model = defineModel()
</script>

<template>
  <div class="form-field d-flex flex-column">
    <label class="text-start fw-bold mb-2" :for="inputFor"
      ><i :class="labelIcon"></i> {{ formLabel }}
    </label>
    <input
      autofocus
      :id="inputFor"
      class="p-2 border-1 border-bottom border-dark-subtle"
      :type="inputFor"
      :placeholder="inputPlaceholder"
      v-model="model"
    />
  </div>
</template>
