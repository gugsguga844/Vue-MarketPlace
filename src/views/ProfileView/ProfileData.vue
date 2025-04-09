<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormInput from '@/components/FormInput.vue'
import { deleteUser, updateUser, uploadImage } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()
const name = ref('')
const email = ref('')

async function update() {
  const token = auth.token
  const result = await updateUser(
    { name: name.value || auth.user.name, email: email.value || auth.user.email },
    token,
  )

  if (result.status === 200) {
    alert('Login sucesso')
    console.log(result.data)
    auth.saveUpdatedUser(result.data)
  }
}

async function deleteAccount() {
  const result = await deleteUser(auth.token)

  if (result.status === 204) {
    console.log(result.status)
    alert('Usuario Deletado')
    auth.logout()
  }
}

async function chooseImage() {
  const token = auth.token
  const result = await uploadImage(auth.user.image_path, token)
  if (result.status === 200) {
    console.log(result.data)
    auth.saveUpdatedUser(result.data)
  }
}

function getUserImage(path) {
  const apiURL = import.meta.env.VITE_API_URL
  return `${apiURL}${path}`
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h3 class="fw-bold m-0">Dados Pessoais</h3>
    <ButtonComponent
      button-style="buttonBlack bigRadius"
      button-text="Continuar Comprando"
      to="/"
    />
  </div>
  <form @submit.prevent="update">
    <div class="rounded-2 border-1 border-dark-subtle mb-4">
      <div class="title-info p-6 pb-0">
        <h4 class="m-0">Foto de Perfil</h4>
        <p class="m-0 text-secondary">Atualize sua foto de perfil</p>
      </div>
      <div class="d-flex justify-content-center p-6">
        <div class="border-1 border-dark-subtle rounded-circle w-30">
          <img :src="getUserImage(auth.user.image_path)" alt="Foto de Perfil" class="object-fit-cover" />
          <!-- <img v-else src="@/assets/images/logo.png" alt="Foto de Perfil" class="object-fit-cover" /> -->
          <input type="file" @change="chooseImage" />
        </div>
      </div>
    </div>
    <div class="rounded-2 border-1 border-dark-subtle p-6">
      <div class="title-info pb-6">
        <h4 class="m-0">Dados Pessoais</h4>
        <p class="m-0 text-secondary">Atualize suas informações pessoais</p>
      </div>
      <div class="row">
        <div class="col-6">
          <FormInput
            :input-placeholder="auth.user.name"
            input-for="editName"
            input-type="text"
            form-label="Nome Completo"
            v-model="name"
          />
        </div>
        <div class="col-6">
          <FormInput
            :input-placeholder="auth.user.email"
            input-for="editName"
            input-type="email"
            form-label="E-mail"
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
            @click.prevent="deleteAccount"
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
    </div>
  </form>
</template>

<style scoped>
.icon-big {
  font-size: 150px;
}
</style>
