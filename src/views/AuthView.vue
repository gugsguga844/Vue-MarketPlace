
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { login, register } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import { useCartStore } from '@/stores/CartStore'

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

const useCart = useCartStore()

async function sendForm() {
  const result = await login({ email: email.value, password: password.value })
  if (result.status === 200) {
    auth.saveUser(result.data)
    toast.success(`Ótimas compras, ${auth.user.name}!`)
    router.push({ name: 'home' })
    if (remember.value) {
      auth.rememberUser = true
    }
  } else {
    toast.error('Login falhou')
  }

  useCart.saveCart()
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

<template>
  <div class="auth-bg d-flex align-items-center justify-content-center py-5">
    <div class="container">
      <div class="row justify-content-center align-items-start g-4 flex-wrap">
        <div class="col-12 col-md-6">
          <div :class="['auth-card', activeTab==='login' ? 'active-card' : '']">
            <div class="text-center mb-4">
              <h2 class="fw-bold mb-2" style="color:#ff0000">Entrar</h2>
              <div class="mb-3 text-secondary">Acesse sua conta</div>
            </div>
            <form @submit.prevent="sendForm">
              <FormInput
                  label-icon="bi bi-envelope"
                  form-label="E-mail:"
                  input-for="email"
                  input-type="email"
                  input-placeholder="exemplo@gmail.com"
                  v-model="email"
                />
              <FormInput
                  label-icon="bi bi-lock"
                  form-label="Senha:"
                  input-for="password"
                  input-type="password"
                  input-placeholder="••••••••"
                  v-model="password"
                />
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rememberLogin" />
                  <label class="form-check-label text-secondary" for="rememberLogin">Permanecer conectado</label>
                </div>
                <RouterLink to="/" class="btn-link small fw-semibold" style="color:#ff0000">Esqueci minha senha</RouterLink>
              </div>
              <FormButton button-type="submit" form-button-text="Entrar" button-style="redButton" />
              <div class="text-center text-secondary mb-2">ou entre com</div>
              <div class="d-flex justify-content-center gap-3 mb-3">
                <button type="button" class="btn btn-outline-primary rounded-circle p-2 border-0"><i class="bi bi-facebook fs-4"></i></button>
                <button type="button" class="btn btn-outline-danger rounded-circle p-2 border-0"><img src="@/assets/images/google.svg" width="28" alt="Google" /></button>
                <button type="button" class="btn btn-outline-dark rounded-circle p-2 border-0"><i class="bi bi-twitter-x fs-4"></i></button>
              </div>
            </form>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div :class="['auth-card', activeTab==='register' ? 'active-card' : '']">
            <div class="text-center mb-4">
              <h2 class="fw-bold mb-2" style="color:#ff0000">Cadastrar</h2>
              <div class="mb-3 text-secondary">Crie sua conta</div>
            </div>
            <form @submit.prevent="sendRegister">
              <FormInput
                label-icon="bi bi-person"
                form-label="Nome:"
                input-for="name"
                input-type="text"
                input-placeholder="Seu nome"
                v-model="name"
              />
              <FormInput
                label-icon="bi bi-envelope"
                form-label="E-mail:"
                input-for="emailRegister"
                input-type="email"
                input-placeholder="seu@email.com"
                v-model="emailRegister"
              />
              <FormInput
                  label-icon="bi bi-lock"
                  form-label="Senha:"
                  input-for="passwordRegister"
                  input-type="password"
                  input-placeholder="••••••••"
                  v-model="passwordRegister"
                />
              <FormInput
                label-icon="bi bi-lock"
                form-label="Confirme a Senha:"
                input-for="passwordConfirm"
                input-type="password"
                input-placeholder="••••••••"
                v-model="passwordConfirm"
              />
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="rememberRegister" />
                <label class="form-check-label text-secondary" for="rememberRegister">Concordo com os termos de serviço</label>
              </div>
              <FormButton button-type="submit" form-button-text="Cadastrar" button-style="redButton" />
              <div class="text-center text-secondary mb-2">ou cadastre-se com</div>
              <div class="d-flex justify-content-center gap-3 mb-3">
                <button type="button" class="btn btn-outline-primary rounded-circle p-2 border-0"><i class="bi bi-facebook fs-4"></i></button>
                <button type="button" class="btn btn-outline-danger rounded-circle p-2 border-0"><img src="@/assets/images/google.svg" width="28" alt="Google" /></button>
                <button type="button" class="btn btn-outline-dark rounded-circle p-2 border-0"><i class="bi bi-twitter-x fs-4"></i></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-bg {
  background: #ffffff;
  min-height: 100vh;
}
.auth-card {
  background: transparent;
  color: #fff;
  border-radius: 1.5rem;
  box-shadow: 0 2px 24px 0 rgba(0,0,0,0.2);
  padding: 2.5rem 2rem 2rem 2rem;
  margin-bottom: 2rem;
  border: 2px solid transparent;
  transition: border 0.2s, box-shadow 0.2s;
}
.auth-card .form-label {
  color: #ccc;
  font-weight: 500;
}
.input-dark {
  background: #222;
  color: #fff;
  border: 1.5px solid #222;
  transition: border 0.2s, box-shadow 0.2s;
}
.input-dark:focus {
  border-color: #ff0000;
  box-shadow: 0 0 0 0.15rem rgba(255,0,0,0.15);
  background: #252525;
  color: #fff;
}

.btn-link {
  text-decoration: none;
}
.btn-link:hover {
  text-decoration: underline;
}
@media (max-width: 991px) {
  .auth-bg {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .auth-card {
    margin-bottom: 1.5rem;
  }
}
</style>
