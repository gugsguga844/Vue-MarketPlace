<script setup>
  const props = defineProps({
    modalTitle: String,
    show: Boolean
  })
</script>

<template>
  <div v-if="props.show" class="modal-backdrop-custom">
    <div class="modal-custom bg-white rounded-4 shadow-lg p-0 position-relative animate-modal">
      <div class="modal-header d-flex justify-content-between align-items-center px-4 pt-4 pb-2 border-0">
        <h1 class="modal-title fs-3 fw-bold text-primary-emphasis mb-0" id="exampleModalLabel">{{ props.modalTitle }}</h1>
        <button type="button" class="btn-close fs-5" @click="$emit('close')" aria-label="Fechar"></button>
      </div>
      <div class="modal-body px-4 pb-0 pt-2">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer d-flex justify-content-between px-4 pb-4 pt-2 border-0 bg-transparent">
        <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-3" @click="$emit('close')">Fechar</button>
        <button type="button" class="btn btn-primary px-4 py-2 rounded-3 fw-semibold" @click="$emit('save')">Salvar Alterações</button>
      </div>
    </div>
    <div class="modal-overlay" @click="$emit('close')"></div>
  </div>
</template>

<style scoped>
.modal-backdrop-custom {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(33,37,41,0.10);
}
.modal-custom {
  z-index: 1060;
  width: 100%;
  max-width: 650px;
  min-width: 340px;
  background: linear-gradient(135deg, #fafdff 80%, #f1f3f7 100%);
  box-shadow: 0 8px 32px rgba(30,30,60,0.18), 0 1.5px 4px rgba(0,0,0,0.04);
  border: 1.5px solid #e4e7ec;
  animation: modalPopIn 0.22s cubic-bezier(.23,1.19,.72,1.01);
}
@keyframes modalPopIn {
  0% { opacity: 0; transform: translateY(40px) scale(0.98); }
  100% { opacity: 1; transform: none; }
}
.modal-header {
  border-bottom: none;
  background: transparent;
}
.modal-footer {
  border-top: none;
  background: transparent;
}
.btn-close {
  filter: grayscale(0.6);
  opacity: 0.7;
  transition: opacity 0.13s;
}
.btn-close:hover {
  opacity: 1;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.22);
  z-index: 1055;
}
</style>