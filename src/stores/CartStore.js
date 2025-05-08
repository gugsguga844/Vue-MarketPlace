import { getCart, createCart, getCartItems } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref({})
    const auth = useAuthStore()
    const cartItems = ref([])

    async function saveCart() {
      const result = await getCart(auth.token)

      console.log(result.status)
      if (result.status === 200) {
        cart.value = result.data
      }

      if (result.status === 404) {
        console.log('ó o token', auth.token)
        const result = await createCart(auth.token)
        console.log(result.status)
        cart.value = result.data
      }
    }

    async function createNewCart() {
      const result = await createCart(auth.token)
      cart.value = result.data
    }

    async function saveCartItems() {
      const result = await getCartItems(auth.token)
      cartItems.value = result
    }

    function clearCartItems() {
      cartItems.value = []
    }

    return { cart, saveCart, createNewCart, clearCartItems, saveCartItems, cartItems }
  },
  { persist: true },
)
