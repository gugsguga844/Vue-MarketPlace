import { getAllOrders } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useOrderStore = defineStore(
  'order',
  () => {
    const allOrders = ref([])
    const order = ref({})
    const auth = useAuthStore()

    async function saveAllOrders() {
      const apiResult = await getAllOrders(auth.token)
      allOrders.value = apiResult
    }

    return {
      allOrders,
      order,
      saveAllOrders,
    }
  },
  {
    persist: true,
  },
)
