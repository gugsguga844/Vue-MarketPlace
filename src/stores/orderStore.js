import { getAllOrders, getOrders } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useOrderStore = defineStore(
  'order',
  () => {
    const allOrders = ref([])
    const orders = ref([])
    const order = ref({})
    const auth = useAuthStore()

    async function saveAllOrders() {
      const apiResult = await getAllOrders(auth.token)
      allOrders.value = apiResult
    }

    async function saveOrders() {
      const apiResult = await getOrders(auth.token)
      orders.value = apiResult
    }

    function saveIntoOrders(order) {
      orders.value = [...orders.value, order]
    }

    return {
      allOrders,
      orders,
      order,
      saveAllOrders,
      saveOrders,
      saveIntoOrders,
    }
  },
  {
    persist: true,
  },
)
