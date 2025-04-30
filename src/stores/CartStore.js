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

      if (result.status === 200) {
        cart.value = result.data
      } else {
        createNewCart()
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
