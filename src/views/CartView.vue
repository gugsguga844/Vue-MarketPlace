<script setup>
import { Flag } from 'lucide-vue-next'
import { useCartStore } from '@/stores/CartStore'
import CartItemComponent from '@/components/CartItemComponent.vue'

const cart = useCartStore()
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <div class="cart">
          <div class="d-flex bg-danger p-2 text-white rounded-2">
            <Flag />
            <h5>
              Itens do Carrinho ({{
                cart.cartItems && cart.cartItems.items ? cart.cartItems.items.length : 0
              }})
            </h5>
          </div>
          <CartItemComponent
            v-for="item in cart.cartItems.items"
            :key="item.product_id"
            :imagePath="item.image_path"
            :name="item.name"
            :quantity="item.quantity"
            :unitPrice="item.unit_price"
            :productId="item.product_id"
          />
        </div>
      </div>
      <div class="col-4"></div>
    </div>
  </div>
</template>

<style scoped></style>
