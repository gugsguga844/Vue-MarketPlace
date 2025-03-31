<script setup>
import FormButton from '@/components/FormButton.vue'
import FormInput from '@/components/FormInput.vue'
import { register } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

async function sendRegister() {
  const result = await register({ name: name.value, email: email.value, password: password.value })

  if (result.status === 201) {
    console.log(result)
    alert('Login sucesso')
    auth.registerUser(result.data)
    router.push({ name: 'home' })
  } else {
    alert('Erro')
    console.log(result.status)
  }
}

function redirect() {
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 bg-warning">
      <div
        class="whiteCol col-12 col-lg-8 d-flex flex-column justify-content-center align-items-center mt-lg-3 mb-lg-3 bg-light text-center overflow-hidden"
      >
        <form @submit.prevent="sendRegister" class="w-100">
          <h2 class="h1">Cadastre-se</h2>
          <div class="form-inputs my-5">
            <div class="row mb-4">
              <div class="col-12 col-lg-6">
                <FormInput
                  v-model="name"
                  form-label="Primeiro nome:"
                  input-for="firstName"
                  input-type="text"
                />
              </div>
              <div class="col-12 col-lg-6">
                <FormInput form-label="Último nome:" input-for="lastName" input-type="text" />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12">
                <FormInput
                  v-model="email"
                  form-label="E-mail:"
                  input-for="name"
                  input-type="text"
                />
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-12 col-lg-6">
                <FormInput
                  v-model="password"
                  form-label="Senha:"
                  input-for="password"
                  input-type="password"
                />
              </div>
              <div class="col-12 col-lg-6">
                <FormInput
                  form-label="Confirme sua Senha:"
                  input-for="confirmPassword"
                  input-type="password"
                />
              </div>
            </div>
          </div>
          <FormButton button-type="submit" form-button-text="Cadastrar" />
          <div class="my-4">
            <span class="">Ou registre-se com</span>
          </div>
          <div class="register-options d-flex justify-content-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              color="blue"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
              />
            </svg>
            <img class="w-12 h-12" src="../assets/images/google.svg" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"
              />
            </svg>
          </div>
        </form>
      </div>
      <div
        class="col-12 col-lg-4 px-5 bg-warning d-flex flex-column justify-content-center align-items-center fw-bold"
      >
        <img class="mb-4 w-50" src="../assets/images/3clogo.png" />
        <div class="text-center mb-0 mb-lg-5">
          <h1 class="text-black">Bem-vindo</h1>
          <p>Já possui uma conta em nossa loja?</p>
        </div>
        <FormButton @click="redirect" button-style="blackButton" form-button-text="Entrar" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .whiteCol {
    border-radius: 0 200px 200px 0;
    padding: 0 10% 0 10%;
  }
}
@media (max-width: 1023px) {
  .whiteCol {
    border-radius: 0 0 100px 100px;
    padding: 10%;
  }
}
</style>
