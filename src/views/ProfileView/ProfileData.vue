<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormInput from '@/components/FormInput.vue'
import ImageCropperModal from '@/components/ImageCropperModal.vue'
import { updateUser, uploadImage } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const auth = useAuthStore()
const name = ref('')
const email = ref('')
const imageFile = ref('')
const imageUrl = ref('')
const showCropper = ref(false)
const payload = ref({})

async function updateProfileImage() {
  const formData = new FormData()
  formData.append('image', imageFile.value)
  const token = auth.token
  const result = await uploadImage(formData, token)

  if (result.status === 200) {
    auth.user.image_path = result.data.image_path
    console.log(auth.user.image_path)
    toast.success('Imagem atualizada com sucesso')
  }
}

function checkChanges() {
  if (name.value && name.value !== auth.user.name) {
    payload.value.name = name.value
  }

  if (email.value && email.value !== auth.user.email) {
    payload.value.email = email.value
  }

  return payload.value
}

async function update() {
  const changes = checkChanges()
  console.log('Mudanças: ', payload)
  const token = auth.token

  if (Object.keys(changes).length > 0) {
    const result = await updateUser(changes, token)

    if (result.status === 200) {
      alert('Login sucesso')
      console.log(result.data)
      auth.saveUpdatedUser(result.data)
    }
  }
}

function handleSubmit() {
  update()
  updateProfileImage()
}

function getUserImage(path) {
  const apiURL = import.meta.env.VITE_API_URL
  return `${apiURL}${path}`
}

function handleImageChange(event) {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }

  imageFile.value = event.target.files[0]
  imageUrl.value = URL.createObjectURL(imageFile.value)
  showCropper.value = true
}

function handleCroppedImage(blob) {
  imageFile.value = blob
  imageUrl.value = URL.createObjectURL(blob)
  console.log(imageFile.value)
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
  <form @submit.prevent="handleSubmit">
    <div class="rounded-2 border-1 border-dark-subtle mb-4">
      <div class="title-info p-6 pb-0">
        <h4 class="m-0">Foto de Perfil</h4>
        <p class="m-0 text-secondary">Atualize sua foto de perfil</p>
      </div>
      <div class="d-flex justify-content-center p-6">
        <div class="profile-image-container bg-dark position-relative">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            alt="Foto de Perfil"
            class="profile-image w-100 h-100 object-fit-cover object-position-center"
          />
          <img
            v-else
            :src="getUserImage(auth.user.image_path)"
            alt="Foto de Perfil"
            class="profile-image w-100 h-100 object-fit-cover object-position-center"
          />
          <div class="profile-image-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center gap-3">
            <input
              type="file"
              class="d-none"
              id="imageInput"
              accept=".jpeg, .png"
              @change="handleImageChange"
            >
            <label for="imageInput" class="btn btn-light rounded-circle">
              <i class="bi bi-camera fs-4"></i>
            </label>
            <button class="btn btn-light rounded-circle">
              <i class="bi bi-trash fs-4"></i>
            </button>
          </div>
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
        <div class="col-12 d-flex justify-content-end">
          <ButtonComponent
            button-type="submit"
            button-style="buttonBlack bigRadius"
            button-text="Salvar Alterações"
          />
        </div>
      </div>
    </div>
  </form>

  <ImageCropperModal
    :show="showCropper"
    :image="imageUrl"
    @close="showCropper = false"
    @cropped="handleCroppedImage"
  />
</template>

<style scoped>
.profile-image-container {
  width: 200px;
  height: 200px;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.profile-image {
  transition: opacity 0.3s ease;
}

.profile-image-container:hover .profile-image {
  opacity: 0.5;
}

.profile-image-overlay {
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: rgba(0, 0, 0, 0.5);
}

.profile-image-container:hover .profile-image-overlay {
  opacity: 1;
}

@media (max-width: 768px) {
  .profile-image-container {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 576px) {
  .profile-image-container {
    width: 120px;
    height: 120px;
  }
}
</style>
