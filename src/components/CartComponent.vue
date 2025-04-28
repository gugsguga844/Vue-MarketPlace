<script setup>
import { useCartStore } from '@/stores/CartStore'
import { Minus, Plus, ShoppingCart } from 'lucide-vue-next';
import { useImageStore } from '@/stores/ImageStore'
import { useFormatPriceStore } from '@/stores/formatPrice';

const cart = useCartStore()
const imageStore = useImageStore()
const format = useFormatPriceStore()

</script>

<template>
  <div
    class="offcanvas offcanvas-end"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title text-danger" id="offcanvasWithBothOptionsLabel">
        ITENS NO CARRINHO ({{ cart.cartItems && cart.cartItems.items ? cart.cartItems.items.length : 0 }})
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div v-if="cart.cartItems && cart.cartItems.items ? cart.cartItems.items.length <= 0 : true" class="d-flex flex-column align-items-center py-4 px-3 gap-2 border-1 border-dark-subtle">
        <ShoppingCart />
        <h5 class="text-secondary">Seu carrinho está vazio</h5>
        <p class="text-secondary text-center">Navegue agora pelas categorias de nossa loja e escolha os produtos desejados para adicionar em seu carrinho de compras</p>
      </div>
      <template v-else v-for="item in (cart.cartItems && cart.cartItems.items ? cart.cartItems.items : [])">
        <div class="d-flex border-1 border-dark-subtle py-3 px-2 mb-3">
          <div class="cartImage">
            <img :src="imageStore.imageURL(item.image_path)" alt="">
          </div>
          <div class="cartInfo d-flex flex-column align-items-start justify-content-between gap-3">
              <h6 class="text-primary">{{ item.name }}</h6>
              <div class="d-flex gap-2 align-items-center">
                <Minus />
                <span class="border-1 fs-6 px-3">{{ item.quantity }}</span>
                <Plus />
              </div>
              <span class="product-price text-danger fw-bold">R$ {{ format.formatPrice(item.unit_price) }}</span>
          </div>
          <div class="cartActions">
            <i class="bi bi-trash3 text-danger fa-lg cursor-pointer"></i>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.offcanvas {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.cartImage {
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.cartImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cartInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
