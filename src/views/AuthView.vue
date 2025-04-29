<template>
  <div class="login-bg d-flex align-items-center justify-content-center min-vh-100">
    <div class="container py-4">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-5">
          <div class="card shadow-lg border-0 rounded-4 p-4 p-lg-5 bg-light">
            <div class="text-center mb-4">
              <img src="@/assets/images/f1-logo.png" alt="F1 Market" class="login-logo mb-3" />
              <h1 class="fw-bold text-danger mb-1">F1 Market</h1>
              <div class="text-secondary mb-2">Acesse sua conta ou cadastre-se</div>
            </div>
            <div class="d-flex justify-content-center mb-4">
              <button :class="['btn', activeTab==='login' ? 'btn-danger' : 'btn-outline-danger', 'me-2', 'fw-bold']" @click="activeTab='login'">Entrar</button>
              <button :class="['btn', activeTab==='register' ? 'btn-danger' : 'btn-outline-danger', 'fw-bold']" @click="activeTab='register'">Cadastrar</button>
            </div>
            <form v-if="activeTab==='login'" @submit.prevent="sendForm">
              <div class="mb-3">
                <label for="email" class="form-label text-secondary">E-mail</label>
                <input v-model="email" type="email" class="form-control form-control-lg rounded-3" id="email" placeholder="seu@email.com" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label text-secondary">Senha</label>
                <input v-model="password" type="password" class="form-control form-control-lg rounded-3" id="password" placeholder="********" required />
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember" v-model="remember" />
                  <label class="form-check-label text-secondary" for="remember">Permanecer conectado</label>
                </div>
                <RouterLink to="/" class="text-danger small fw-semibold">Esqueci minha senha</RouterLink>
              </div>
              <button type="submit" class="btn btn-danger w-100 py-2 fw-bold shadow-sm mb-3">Entrar</button>
              <div class="text-center text-secondary mb-2">ou entre com</div>
              <div class="d-flex justify-content-center gap-3 mb-3">
                <button type="button" class="btn btn-outline-primary rounded-circle p-2 border-0"><i class="bi bi-facebook fs-4"></i></button>
                <button type="button" class="btn btn-outline-danger rounded-circle p-2 border-0"><img src="@/assets/images/google.svg" width="28" alt="Google" /></button>
                <button type="button" class="btn btn-outline-dark rounded-circle p-2 border-0"><i class="bi bi-twitter-x fs-4"></i></button>
              </div>
            </form>
            <form v-else @submit.prevent="sendRegister">
              <div class="mb-3">
                <label for="name" class="form-label text-secondary">Nome</label>
                <input v-model="name" type="text" class="form-control form-control-lg rounded-3" id="name" placeholder="Seu nome" required />
              </div>
              <div class="mb-3">
                <label for="emailRegister" class="form-label text-secondary">E-mail</label>
                <input v-model="emailRegister" type="email" class="form-control form-control-lg rounded-3" id="emailRegister" placeholder="seu@email.com" required />
              </div>
              <div class="mb-3">
                <label for="passwordRegister" class="form-label text-secondary">Senha</label>
                <input v-model="passwordRegister" type="password" class="form-control form-control-lg rounded-3" id="passwordRegister" placeholder="********" required />
              </div>
              <div class="mb-3">
                <label for="passwordConfirm" class="form-label text-secondary">Confirme a Senha</label>
                <input v-model="passwordConfirm" type="password" class="form-control form-control-lg rounded-3" id="passwordConfirm" placeholder="********" required />
              </div>
              <button type="submit" class="btn btn-danger w-100 py-2 fw-bold shadow-sm mb-3">Cadastrar</button>
              <div class="text-center text-secondary mb-2">ou cadastre-se com</div>
              <div class="d-flex justify-content-center gap-3 mb-3">
                <button type="button" class="btn btn-outline-primary rounded-circle p-2 border-0"><i class="bi bi-facebook fs-4"></i></button>
                <button type="button" class="btn btn-outline-danger rounded-circle p-2 border-0"><img src="@/assets/images/google.svg" width="28" alt="Google" /></button>
                <button type="button" class="btn btn-outline-dark rounded-circle p-2 border-0"><i class="bi bi-twitter-x fs-4"></i></button>
              </div>
            </form>
          </div>
        </div>
        <div class="d-none d-lg-flex col-lg-7 align-items-center justify-content-center">
          <div class="login-side-image rounded-4 shadow-lg overflow-hidden">
            <img src="@/assets/images/drivers.jpg" alt="Pilotos F1" class="img-fluid w-100 h-100 object-fit-cover" style="min-height: 500px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { login, register } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'

const activeTab = ref('login')

// Login state
const email = ref('')
const password = ref('')
const remember = ref(false)

// Register state
const name = ref('')
const emailRegister = ref('')
const passwordRegister = ref('')
const passwordConfirm = ref('')

const router = useRouter()
const toast = useToast()
const auth = useAuthStore()

async function sendForm() {
  const result = await login({ email: email.value, password: password.value })
  if (result.status === 200) {
    auth.saveUser(result.data)
    toast.success(`Ótimas compras ${auth.user.name}`)
    router.push({ name: 'home' })
    if (remember.value) {
      auth.rememberUser = true
    }
  } else {
    toast.error('Login falhou')
  }
}

async function sendRegister() {
  if (passwordRegister.value !== passwordConfirm.value) {
    toast.error('As senhas não coincidem')
    return
  }
  const registerResult = await register({
    name: name.value,
    email: emailRegister.value,
    password: passwordRegister.value
  })
  if (registerResult.status === 201) {
    toast.success('Usuário cadastrado com sucesso!')
    // Login automático após cadastro
    const loginResult = await login({ email: emailRegister.value, password: passwordRegister.value })
    if (loginResult.status === 200) {
      auth.saveUser(loginResult.data)
      router.push({ name: 'home' })
    }
  } else {
    toast.error('Erro ao cadastrar usuário')
  }
}
</script>

<style scoped>
.login-bg {
  background: linear-gradient(120deg, #1a1a1a 60%, #ff0000 100%);
  min-height: 100vh;
}
.login-logo {
  width: 70px;
  height: auto;
}
.login-side-image {
  min-width: 400px;
  min-height: 500px;
  max-width: 600px;
  max-height: 700px;
}
@media (max-width: 991px) {
  .login-side-image {
    display: none;
  }
}
</style>
