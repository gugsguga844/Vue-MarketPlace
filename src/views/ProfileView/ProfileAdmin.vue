<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import TabsNav from '@/components/TabsNav.vue'

</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="fw-bold m-0">Painel de Controle</h3>
    <ButtonComponent
      button-style="buttonBlack smallRadius"
      button-text="+ Continuar Comprando"
      to="/"
    />
  </div>

  <TabsNav />

  <RouterView />
</template>

<style scoped>
.router-link-active {
  background-color: #ffffff;
  color: #fff;
}
</style>
