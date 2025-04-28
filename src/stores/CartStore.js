import { getCart, createCart, getCartItems } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref({})
    const token = useAuthStore().token
    const cartItems = ref([])

    async function saveCart() {
      const result = await getCart(token)

      if (result.status === 200) {
        cart.value = result.data
      } else {
        createNewCart()
      }
    }

    async function createNewCart() {
      const result = await createCart(token)
      cart.value = result.data
    }

    async function saveCartItems() {
      const result = await getCartItems(token)
      cartItems.value = result
    }

    function insertIntoCart(payload) {
      cartItems.value = [...cartItems.value, payload]
    }

    return { cart, saveCart, createNewCart, saveCartItems, cartItems, insertIntoCart }
  },
  { persist: true },
)
