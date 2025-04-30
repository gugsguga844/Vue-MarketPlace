<script setup>
import { useOrderStore } from '@/stores/orderStore'
import { useImageStore } from '@/stores/ImageStore'
import { onMounted, computed } from 'vue'
import { ShoppingBag, Package, Truck, CheckCircle, XCircle } from 'lucide-vue-next'

const orderStore = useOrderStore()
const imageStore = useImageStore()

onMounted(() => {
  orderStore.saveAllOrders()
})

const statusIcons = {
  PENDING: Package,
  PROCESSING: Truck,
  SHIPPED: CheckCircle,
  CANCELED: XCircle
}

const statusColors = {
  PENDING: 'text-warning',
  PROCESSING: 'text-info',
  SHIPPED: 'text-success',
  CANCELED: 'text-danger'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateTotal = (products) => {
  return products.reduce((total, product) => total + parseFloat(product.price), 0).toFixed(2)
}
</script>

<template>
  <div class="container-fluid py-4">
    <h2 class="mb-4 fw-bold">
      <ShoppingBag class="me-2" /> Meus Pedidos
    </h2>
    
    <div v-if="orderStore.allOrders.length === 0" class="alert alert-info text-center">
      Você ainda não possui pedidos.
    </div>

    <div v-else class="row g-4">
      <div v-for="order in orderStore.allOrders" :key="order.id" class="col-12">
        <div class="card shadow-sm mb-3">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span class="fw-bold me-2">Pedido #{{ order.id }}</span>
              <span class="badge" :class="statusColors[order.status]">
                <component :is="statusIcons[order.status]" class="me-1" />
                {{ order.status }}
              </span>
            </div>
            <small class="text-muted">{{ formatDate(order.order_date) }}</small>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <h5 class="card-title mb-3">Produtos</h5>
                <div class="row g-3">
                  <div 
                    v-for="product in order.products" 
                    :key="product.id" 
                    class="col-md-4 col-sm-6"
                  >
                    <div class="d-flex align-items-center">
                      <img 
                        :src="imageStore.imageURL(product.image_path)" 
                        class="img-fluid rounded me-3" 
                        style="max-width: 80px; max-height: 80px; object-fit: cover;"
                      >
                      <div>
                        <h6 class="mb-1">{{ product.name }}</h6>
                        <p class="text-muted mb-0">R$ {{ product.price }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 border-start">
                <h5 class="card-title mb-3">Resumo</h5>
                <div class="d-flex justify-content-between mb-2">
                  <span>Total de Produtos:</span>
                  <strong>R$ {{ calculateTotal(order.products) }}</strong>
                </div>
                <div v-if="order.coupon_id" class="d-flex justify-content-between mb-2">
                  <span>Cupom Aplicado:</span>
                  <span class="badge bg-success">Ativo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease;
}
.card:hover {
  transform: scale(1.02);
}
</style>
