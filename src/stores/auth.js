import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const token = ref(null)
    const user = ref({})
    const isAuthenticated = ref(false)

    function saveUser(result) {
      user.value = result.user
      isAuthenticated.value = true
      token.value = result.token
    }

    function logout() {
      token.value = null
      user.value = {}
      isAuthenticated.value = false
    }

    function registerUser(result) {
      user.value = result.user
      isAuthenticated.value = true
    }

    return { token, user, isAuthenticated, saveUser, logout, registerUser }
  },
  { persist: true },
)
