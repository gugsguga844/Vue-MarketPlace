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

  const existingItem = cart.cartItems.items
    ? cart.cartItems.items.find(item => item.product_id === props.product.id)
    : null;

  if (existingItem) {
    const newQuantity = existingItem.quantity + props.quantity;
    const updatePayload = {
      product_id: props.product.id,
      quantity: newQuantity
    };
    const response = await updateQuantity(token, updatePayload);

    if (response.status === 204) {
      cart.saveCartItems();
    } else {
      toast.error('Erro ao atualizar produto');
    }
  } else {
    const response = await addCartItem(token, payload)

    if (response.status === 204) {
      toast.success('Produto adicionado ao carrinho')
      cart.saveCartItems()
    } else {
      toast.error('Erro ao adicionar produto ao carrinho')
    }
  }
}
</script>

<template>
  <button
    @click="addToCart"
    class="rounded-3 bg-danger p-3 d-flex gap-2 text-white w-100 justify-content-center nav-link"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasWithBothOptions"
    aria-controls="offcanvasWithBothOptions">
    <ShoppingCart />
    <span>Adicionar ao Carrinho</span>
  </button>
</template>
