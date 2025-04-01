import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({})
  const updatedUser = ref({})

  function saveUpdatedUser(result) {
    updatedUser.value = result.data
  }

  return { currentUser, saveUpdatedUser }
})
