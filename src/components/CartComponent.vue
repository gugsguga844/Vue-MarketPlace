<script setup>
import { useCartStore } from '@/stores/CartStore'
import { Minus, Plus, ShoppingCart } from 'lucide-vue-next';
import { useImageStore } from '@/stores/ImageStore'
import { useFormatPriceStore } from '@/stores/formatPrice';
import { useAuthStore } from '@/stores/auth';
import { clearCart, deleteCartItem, updateQuantity } from '@/services/HttpService';
import { useToast } from 'vue-toastification';
import { RouterLink } from 'vue-router';

const cart = useCartStore()
const imageStore = useImageStore()
const format = useFormatPriceStore()
const auth = useAuthStore()
const toast = useToast()

async function deleteFromCart(product_id) {
  const token = auth.token
  const response = await deleteCartItem(token, product_id)

  if (response.status === 204) {
    toast.success('Produto removido do carrinho')
    cart.saveCartItems()
  } else {
    toast.error('Erro ao remover produto do carrinho')
  }
}

async function decrementQuantity(product_id) {
  const token = auth.token;
  const item = cart.cartItems.items.find(i => i.product_id === product_id);
  if (!item || item.quantity <= 1) return;

  const response = await updateQuantity(token, {
    product_id,
    quantity: item.quantity - 1
  });

  if (response.status === 204) {
    cart.saveCartItems();
  } else {
    toast.error('Erro ao decrementar quantidade');
  }
}

async function incrementQuantity(product_id) {
  const token = auth.token;
  const item = cart.cartItems.items.find(i => i.product_id === product_id);
  if (!item) return;

  const response = await updateQuantity(token, {
    product_id,
    quantity: item.quantity + 1
  });

  if (response.status === 204) {
    cart.saveCartItems();
  } else {
    toast.error('Erro ao incrementar quantidade');
  }
}

async function removeCartItems() {
  const token = auth.token
  const response = await clearCart(token)

  if (response.status === 204) {
    toast.success('Carrinho limpo')
    cart.clearCartItems()
  } else {
    toast.error('Erro ao limpar carrinho')
  }
}

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
      <template v-else>
        <template v-for="item in (cart.cartItems && cart.cartItems.items ? cart.cartItems.items : [])" :key="item.product_id">
          <div class="d-flex border-2 border-dark-subtle py-3 px-2 mb-3 rounded-3">
            <div class="cartImage">
              <img :src="imageStore.imageURL(item.image_path)" alt="">
            </div>
            <div class="cartInfo d-flex flex-column align-items-start justify-content-between gap-3">
                <h6 class="text-primary">{{ item.name }}</h6>
                <div class="d-flex gap-2 align-items-center">
                  <button @click="decrementQuantity(item.product_id)">
                    <Minus />
                  </button>
                  <span class="border-1 fs-6 px-3">{{ item.quantity }}</span>
                  <button @click="incrementQuantity(item.product_id)">
                    <Plus />
                  </button>
                </div>
                <span class="product-price text-danger fw-bold">R$ {{ format.formatPrice(item.unit_price) }}</span>
            </div>
            <div class="cartActions align-self-end">
              <i class="bi bi-trash3 text-danger fa-lg cursor-pointer p-2" @click="deleteFromCart(item.product_id)"></i>
            </div>
          </div>
        </template>
        <div class="d-flex flex-column border-1 border-dark-subtle">
          <h6 class="border-bottom border-dark-subtle py-2 text-center fw-bold mb-0">Resumo do Pedido</h6>
          <div class="d-flex justify-content-between p-2">
            <span class="text-danger fw-bold">Subtotal:</span>
            <span class="text-danger fw-bold">R$ {{ format.formatPrice(cart.cartItems.total_amount) }}</span>
          </div>
        </div>

        <RouterLink to="/cart" class="btn btn-dark w-100 mt-2">Finalizar Pedido</RouterLink>
        <button class="btn btn-danger w-100 mt-2 text-white" @click="removeCartItems">Limpar Carrinho</button>
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
