import { getCart, createCart, getCartItems } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductStore } from '@/stores/ProductStore'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref({})
    const token = useAuthStore().token
    const cartItems = ref([])
    const useProducts = useProductStore()

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
      console.log(result)
      cartItems.value = result
      console.log('Carrinho: ', cartItems.value)
    }

    return { cart, saveCart, createNewCart, saveCartItems, cartItems }
  },
  { persist: true },
)
