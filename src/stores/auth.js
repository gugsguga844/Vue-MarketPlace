import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref(null)
    const user = ref({})
    const isAuthenticated = ref(false)
    const rememberUser = ref(false)

    console.log('Carregando auth store:', {
      token: token.value,
      user: user.value,
      isAuthenticated: isAuthenticated.value,
      rememberUser: rememberUser.value,
    })

    function saveUser(result) {
      user.value = result.user
      isAuthenticated.value = true
      token.value = result.token
    }

    function saveUpdatedUser(result) {
      user.value = result
    }

    function logout() {
      token.value = null
      user.value = {}
      isAuthenticated.value = false
      rememberUser.value = false
    }

    function renewToken(newToken) {
      token.value = newToken
    }

    return {
      token,
      user,
      isAuthenticated,
      rememberUser,
      saveUser,
      saveUpdatedUser,
      logout,
      renewToken,
    }
  },
  {
    persist: true,
  },
)
