<script setup>
import { ref } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

defineProps({
  show: Boolean,
  image: String
})

const emit = defineEmits(['close', 'cropped'])

const cropper = ref(null)

function getResult() {
  const { canvas } = cropper.value.getResult()
  if (canvas) {
    canvas.toBlob((blob) => {
      emit('cropped', blob)
      emit('close')
    }, 'image/jpeg', 0.9)
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content shadow-lg">
      <div class="modal-header bg-white border-bottom">
        <h5 class="m-0 fw-semibold text-dark">✂️ Recortar Imagem</h5>
        <button @click="$emit('close')" class="close-button" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="modal-body p-0">
        <Cropper
          ref="cropper"
          class="cropper"
          :src="image"
          :stencil-props="{ aspectRatio: 1 }"
        />
      </div>
      <div class="modal-footer border-top">
        <button @click="$emit('close')" class="btn btn-outline-secondary rounded-pill px-4">
          Cancelar
        </button>
        <button @click="getResult" class="btn btn-warning rounded-pill px-4 fw-semibold">
          Recortar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 95%;
  max-width: 620px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.modal-body {
  padding: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-footer {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  background-color: #fafafa;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #555;
  cursor: pointer;
  transition: color 0.2s ease;
}
.close-button:hover {
  color: #000;
}

.cropper {
  height: 420px;
  width: 100%;
  background-color: #f0f0f0;
}
</style>
