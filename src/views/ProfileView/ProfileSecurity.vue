<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { deleteUser } from '@/services/HttpService';
import { useToast } from 'vue-toastification';

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

function redirect() {
  router.push({ name: 'addAddress' })
}

async function deleteAccount() {
  const token = auth.token
  const response = await deleteUser(token)
  if (response.status === 204) {
    auth.logout()
    router.push({ name: 'home' })
    toast.success('Conta excluída com sucesso')
  } else {
    toast.error('Erro ao excluir conta')
  }
}

</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold m-0">Meus Endereços</h4>
    <ButtonComponent
      @click.prevent="redirect"
      button-style="buttonBlack smallRadius"
      button-text="+ Adicionar Endereço"
    />
  </div>
  <div class="container-fluid border-1 border-dark-subtle rounded-1">
    <div class="title-info m-3">
      <h4 class="text-danger">Zona de Perigo</h4>
      <p>Ações irreversíveis relacionadas a sua conta</p>
    </div>
    <div class="border-1 border-dark-subtle rounded-1 m-3 p-4">
      <h5 class="text-danger">Excluir minha conta</h5>
      <p>Ao excluir sua conta, todos os seus dados pessoais, pedidos, endereços e preferências serão permanentemente removidos. Esta ação não pode ser desfeita.</p>
      <ButtonComponent
        @click.prevent="deleteAccount"
        button-style="buttonDelete smallRadius"
        button-text="Excluir conta"
      />
    </div>
  </div>
 </template>

<style scoped>

</style>
