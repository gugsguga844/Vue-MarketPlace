<script setup>
import { Flag } from 'lucide-vue-next'
import { useCartStore } from '@/stores/CartStore'
import CartItemComponent from '@/components/CartItemComponent.vue'
import { useFormatPriceStore } from '@/stores/formatPrice';
import { useAddressStore } from '@/stores/AdressStore'
import ModalComponent from '@/components/ModalComponent.vue';
import { ref } from 'vue';
import { useCouponStore } from '@/stores/couponStore';
import { getCoupon } from '@/services/HttpService';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const auth = useAuthStore()
const cart = useCartStore()
const format = useFormatPriceStore()
const useAddresses = useAddressStore()
const showModal = ref(false)
const selectedAddressId = ref(null)
const couponCode = ref('')
const useCoupons = useCouponStore()
const couponIsValid = ref(false)
const couponPercentage = ref(0)
const toast = useToast()

function openModal() {
  selectedAddressId.value = useAddresses.orderAddress.id || useAddresses.mainAddress.id
  showModal.value = true
}

function selectAddress(address_id) {
  if (address_id) {
    useAddresses.selectedAddress(address_id)
  }
  showModal.value = false
}

async function applyCoupon() {
  const token = auth.token
  const code = couponCode.value
  const foundCoupon = useCoupons.coupons.find(coupon => coupon.code === code)

  if (foundCoupon) {
    couponIsValid.value = true
    couponPercentage.value = foundCoupon.discount_percentage
    const couponId = foundCoupon.id

    const response = await getCoupon(token, couponId)

    if (response && response.id) {
      useCoupons.saveCoupon(response)
      toast.success('Cupom aplicado com sucesso')
    } else {
      toast.error('Cupom inválido')
    }
    console.log('ID do cupom encontrado:', couponId)
  } else {
    couponIsValid.value = false
    toast.error('Cupom não encontrado')
  }
}



</script>

<template>
  <div class="container py-4">
    <div class="row">
      <div class="col-8">
        <div class="cart shadow">
          <div class="d-flex bg-danger p-4 text-white rounded-2 align-items-center gap-2">
            <Flag />
            <h5 class="mb-0">
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
            :totalAmount="item.unit_price * item.quantity"
          />
        </div>
      </div>
      <div class="col-4">
        <div class="cart shadow">
          <div class="d-flex bg-black p-4 text-white rounded-2 align-items-center gap-2">
            <Flag />
            <h5 class="mb-0">
              Resumo do Pedido
            </h5>
          </div>
          <div class="">
            <div class="price-info d-flex flex-column justify-content-between border-bottom p-4 gap-3">
              <div class="d-flex justify-content-between">
                <h5 class="text-secondary mb-0">Subtotal:</h5>
                <span class="fs-5">R$ {{ format.formatPrice(cart.cartItems.total_amount) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <h5 class="text-secondary mb-0">Frete:</h5>
                <span class="fs-5 text-danger fw-bold">Grátis</span>
              </div>
            </div>
            <div class="p-4 d-flex flex-column gap-3">
              <div class="d-flex justify-content-between" v-if="!couponIsValid">
                <h5 class="fw-bold mb-0 align-self-center">Total:</h5>
                <span class="fs-5 text-danger fw-bold">R$ {{ format.formatPrice(cart.cartItems.total_amount) }}</span>
              </div>
              <div class="d-flex justify-content-between" v-else>
                <h5 class="fw-bold mb-0 align-self-start">Total:</h5>
                <div class="d-flex flex-column">
                  <span class="fs-5 text-dark text-decoration-line-through fw-bold">R$ {{ format.formatPrice(cart.cartItems.total_amount) }}</span>
                  <span class="fs-5 text-danger fw-bold">R$ {{ format.formatPrice(cart.cartItems.total_amount * (1 - (useCoupons.coupon.discount_percentage / 100))) }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between gap-4">
                <h6 class="mb-0 align-self-center">Cupom:</h6>
                <form @submit.prevent="applyCoupon" class="d-flex gap-1">
                  <input type="text" class="form-control" v-model="couponCode">
                  <button class="btn btn-dark">Aplicar</button>
                </form>
              </div>
            </div>
            <div class="p-4">
              <h6 class="mb-3 fw-bold">Forma de pagamento:</h6>
              <fieldset class="d-flex flex-column gap-3">
                <div class="d-flex gap-3">
                  <input type="radio" id="card" name="payment" value="card" checked />
                  <label for="card">
                    <div class="d-flex align-items-center payment-img gap-3">
                      <img src="@/assets/images/mastercard.png" alt="Cartão de Crédito">
                      <img src="@/assets/images/visa.png" alt="Cartão de Crédito">
                      <img src="@/assets/images/elo.png" alt="Cartão de Crédito">
                      <img src="@/assets/images/hipercard.png" alt="Cartão de Crédito">
                    </div>
                  </label>
                </div>
                <div class="d-flex gap-3">
                  <input type="radio" id="dewey" name="payment" value="dewey" />
                  <label for="dewey">
                    <div class="payment-img d-flex align-items-center">
                      <img src="@/assets/images/pix.png" alt="Dewey">
                    </div>
                  </label>
                </div>
                <div class="d-flex gap-3">
                  <input type="radio" id="louie" name="payment" value="louie" />
                  <label for="louie">
                    <div class="payment-img d-flex align-items-center">
                      <img src="@/assets/images/boleto.png" alt="Dewey">
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>
            <div class="p-4">
              <h6 class="mb-3 fw-bold">
                Endereço de Entrega:
              </h6>
              <div v-if="!useAddresses.orderAddress.id" class="d-flex flex-column border-1 border-dark-subtle p-3">
                <h6 class="fw-bold">Casa</h6>
                <span class="text-secondary">{{ useAddresses.mainAddress.street }}, {{ useAddresses.mainAddress.number }}</span>
                <span class="text-secondary">{{ useAddresses.mainAddress.city }}, {{ useAddresses.mainAddress.state }}</span>
                <span class="text-secondary">{{ useAddresses.mainAddress.zip }}</span>
              </div>
              <div v-else class="d-flex flex-column border-1 border-dark-subtle p-3">
                <h6 class="fw-bold">Casa</h6>
                <span class="text-secondary">{{ useAddresses.orderAddress.street }}, {{ useAddresses.orderAddress.number }}</span>
                <span class="text-secondary">{{ useAddresses.orderAddress.city }}, {{ useAddresses.orderAddress.state }}</span>
                <span class="text-secondary">{{ useAddresses.orderAddress.zip }}</span>
              </div>

              <button @click="openModal" v-if="useAddresses.mainAddress.id" class="btn btn-dark w-100 mt-2">Alterar</button>
              <button v-else class="btn btn-dark w-100 mt-2" @click="redirect">Adicionar Endereço de Entrega</button>
              <button class="btn btn-danger w-100 mt-2 text-white" @click="clearCart">Finalizar Pedido</button>
              <ModalComponent
                :show="showModal"
                modal-title="Selecione o Endereço de Entrega"
                @close="showModal = false"
                @save="() => selectAddress(selectedAddressId)"
              >
                <template #body>
                  <form>
                    <fieldset v-for="address in useAddresses.addresses" :key="address.id" class="mb-3">
                      <div class="d-flex border-1 border-dark-subtle p-3 gap-3">
                        <input type="radio" :id="address.id" name="address" :value="address.id" v-model="selectedAddressId" />
                        <label :for="address.id" class="d-flex flex-column">
                          <span class="fw-bold">Casa</span>
                          <span class="text-secondary">{{ address.street }}, {{ address.number }}</span>
                          <span class="text-secondary">{{ address.city }}, {{ address.state }}</span>
                          <span class="text-secondary">{{ address.zip }}</span>
                        </label>
                      </div>
                    </fieldset>
                  </form>
                </template>
              </ModalComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-img {
  width: 60px;
  height: 60px;
}
</style>
