<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormInput from '@/components/FormInput.vue'
import { updateUser } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'

const auth = useAuthStore()
const user = useUserStore()
const name = ref('')
const email = ref('')

async function update() {
  const result = await updateUser({ name: name.value, email: name.value })

  if (result.status === 200) {
    alert('Login sucesso')
    user.saveUpdatedUser(result.data)
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <h2 class="fw-bold m-0">Dados Pessoais</h2>
    <ButtonComponent
      button-style="buttonBlack bigRadius"
      button-text="Continuar Comprando"
      to="/"
    />
  </div>
  <form @submit.prevent="update" class="rounded-2 border-1 px-4 pb-4 mt-4">
    <div class="row">
      <div class="col-8 align-content-center text-center">
        <h4>Confira ou edite suas informações pessoais</h4>
      </div>
      <div class="col-4 text-center align-content-center">
        <i class="bi bi-person-circle icon-big"></i>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <FormInput
          :input-placeholder="auth.user.name"
          input-for="editName"
          input-type="text"
          form-label="Nome:"
          v-model="name"
        />
      </div>
      <div class="col-6">
        <FormInput
          :input-placeholder="auth.user.email"
          input-for="editName"
          input-type="email"
          form-label="E-mail:"
          v-model="email"
        />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4">
        <FormInput input-for="editName" input-type="text" form-label="Telefone:" />
      </div>
      <div class="col-4">
        <FormInput input-for="editName" input-type="text" form-label="CPF:" />
      </div>
      <div class="col-4">
        <FormInput input-for="editName" input-type="text" form-label="Data de Nascimento:" />
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 d-flex justify-content-between">
        <ButtonComponent
          class="border-1"
          button-style="buttonDelete bigRadius"
          button-text="Excluir Conta"
        />
        <ButtonComponent
          button-type="submit"
          button-style="buttonBlack bigRadius"
          button-text="Salvar Alterações"
        />
      </div>
    </div>
  </form>
</template>

<style scoped>
.icon-big {
  font-size: 100px;
}
</style>
