<script setup>
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/CartStore'
import { addCartItem, updateQuantity } from '@/services/HttpService'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const toast = useToast()
const cart = useCartStore()
const auth = useAuthStore()
const token = auth.token
const props = defineProps({ product: Object, quantity: Number })

async function addToCart() {
  const payload = {
    product_id: props.product.id,
    unit_price: props.product.price,
    quantity: props.quantity
  }

  const updatePayload = {
    product_id: props.product.id,
    quantity: props.quantity
  }
  if (cart.cartItems && cart.cartItems.items && cart.cartItems.items.some(item => item.product_id === props.product.id)) {
    const response = await updateQuantity(token, updatePayload)

    if (response.status === 204) {
      toast.success('Produto atualizado no carrinho')
      cart.saveCartItems()
    } else {
      toast.error('Erro ao atualizar produto no carrinho')
    }
  } else {
    const response = await addCartItem(token, payload)

    if (response.status === 204) {
      toast.success('Produto adicionado ao carrinho')
      console.log(cart.cartItems)
      cart.saveCartItems()
  } else {
    console.log('Erro ao adicionar produto ao carrinho', response, props.product)
    toast.error('Erro ao adicionar produto ao carrinho')
  }
}
}
</script>

<template>
  <button @click="addToCart" class="rounded-3 bg-danger p-3 d-flex gap-2 text-white w-100 justify-content-center">
    <ShoppingCart />
    <span>Adicionar ao Carrinho</span>
  </button>
</template>
