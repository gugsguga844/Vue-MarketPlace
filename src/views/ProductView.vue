<script setup>
import { computed, onMounted } from 'vue'
import { useProductStore } from '../stores/ProductStore'
import { useRoute } from 'vue-router'
import { useImageStore } from '../stores/ImageStore'
import { Star, Plus, Minus, Heart, Share2 } from 'lucide-vue-next'
import { useCounterStore } from '@/stores/counter'
import AddToCartButton from '@/components/AddToCartButton.vue'
import { useFormatPriceStore } from '@/stores/formatPrice'

defineProps(['productCategory'])

const productData = useProductStore()
const route = useRoute()
const imageStore = useImageStore()
const count = useCounterStore()
const formatPrice = useFormatPriceStore()

const divide = computed(() => {
  return productData.product.data.price / 10
})

onMounted(() => {
  const id = route.params.id
  productData.saveProduct(id)
})
</script>

<template>
  <div class="container">
    <div class="breadcrumb p-4 d-flex gap-3 m-0">
      <RouterLink class="text-secondary text-decoration-none" to="/">Home </RouterLink>
      <span class="text-secondary"> > </span>
      <RouterLink class="text-secondary text-decoration-none" to="/">{{
        productData.product.data.category.name
      }}</RouterLink>
      <span class="text-secondary"> > </span>
      <RouterLink class="fw-bold text-decoration-none" to="/">
        {{ productData.product.data.name }}</RouterLink
      >
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="product-img-container shadow">
          <img
            class="product-img"
            :src="imageStore.imageURL(productData.product.data.image_path)"
            alt=""
          />
        </div>
        <div class="d-flex row mt-3">
          <div class="col-3">
            <div class="alt-image shadow">
              <img
                class="alt-img"
                :src="imageStore.imageURL(productData.product.data.image_path)"
                alt=""
              />
            </div>
          </div>
          <div class="col-3">
            <div class="alt-image shadow">
              <img
                class="alt-img"
                :src="imageStore.imageURL(productData.product.data.image_path)"
                alt=""
              />
            </div>
          </div>
          <div class="col-3">
            <div class="alt-image shadow">
              <img
                class="alt-img"
                :src="imageStore.imageURL(productData.product.data.image_path)"
                alt=""
              />
            </div>
          </div>
          <div class="col-3">
            <div class="alt-image shadow">
              <img
                class="alt-img"
                :src="imageStore.imageURL(productData.product.data.image_path)"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div
          class="product-info d-flex justify-content-between align-items-center mb-3 border-bottom pb-3"
        >
          <h6 class="text-danger mb-0">{{ productData.product.data.category.name }}</h6>
          <div class="d-flex gap-1 align-items-center">
            <Star style="width: 18px; height: 18px; color: #ff0000" />
            <p class="h6 text-secondary mb-0">4.8 (127 avaliações)</p>
          </div>
        </div>
        <div class="d-flex mb-2 justify-content-between">
          <h4 class="fw-bold fs-5 mb-2">{{ productData.product.data.name }}</h4>
          <span class="fs-6 text-primary"
            >{{ productData.product.data.stock }} unidades disponíveis
          </span>
        </div>
        <div class="product-price d-flex flex-column mb-2">
          <span class="fs-4 text-danger fw-semibold">R$ {{ formatPrice.formatPrice(productData.product.data.price) }}</span>
          <span class="fs-6 text-primary">ou 10x de R$ {{ formatPrice.formatPrice(divide) }} no cartão</span>
        </div>
        <p class="fs-6 text-secondary mb-2">{{ productData.product.data.description }}</p>
        <div class="d-flex mb-2 gap-5">
          <div class="d-flex flex-column mb-2">
            <span class="fs-6 text-primary mb-1">Tamanho: </span>
            <div class="d-flex gap-1">
              <button class="btn btn-outline-primary btn-sm px-2 border-dark-subtle">M</button>
              <button class="btn btn-outline-primary btn-sm px-2 border-dark-subtle">G</button>
              <button class="btn btn-outline-primary btn-sm px-2 border-dark-subtle">P</button>
              <button class="btn btn-outline-primary btn-sm px-2 border-dark-subtle">PP</button>
            </div>
          </div>

          <div class="d-flex flex-column mb-2">
            <span class="fs-6 text-primary mb-1">Quantidade: </span>
            <div class="d-flex mb-1 align-items-center" style="height: 32px">
              <button
                @click="count.decrement"
                class="btn btn-outline-secondary px-2 d-flex align-items-center justify-content-center fs-2 border-dark-subtle"
              >
                <Minus style="width: 18px; height: 18px" />
              </button>
              <span
                class="border-1 px-3 d-flex align-items-center justify-content-center bg-light mx-1 border-dark-subtle"
                style="height: 32px; min-width: 32px; font-size: 1rem; border-radius: 6px"
              >
                {{ count.count }}
              </span>
              <button
                @click="count.increment"
                class="btn btn-outline-secondary px-2 d-flex align-items-center justify-content-center fs-2 border-dark-subtle"
              >
                <Plus style="width: 18px; height: 18px" />
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column mb-4">
          <span class="fs-6 text-primary mb-1">Consulte o prazo de entrega: </span>
          <div class="d-flex mb-1 align-items-center">
            <input
              type="text"
              placeholder="Insira seu CEP"
              class="form-control form-control-sm me-2"
              style="max-width: 140px"
            />
            <button class="btn btn-primary btn-sm">Consultar</button>
          </div>
        </div>

        <div class="d-flex gap-2 mb-4 align-items-center">
          <AddToCartButton :product="productData.product.data" class="btn-sm" :quantity="count.count" />
          <button class="btn btn-outline-light border-1 border-dark-subtle p-3 rounded-2">
            <Heart color="red" />
          </button>
          <button class="btn btn-outline-light border-1 border-dark-subtle p-3 rounded-2">
            <Share2 color="red" />
          </button>
        </div>
      </div>
    </div>

    <div class="container details py-12">
      <div class="description">
        <h2>Descrição</h2>
        <p>{{ productData.product.data.description }}</p>
      </div>

      <div class="characteristics">
        <h2>Características</h2>
        <ul class="" style="list-style-type: disc">
          <li>Material de secagem rápida</li>
          <li>Tecnologia de ventilação avançada</li>
          <li>Proteção UV</li>
          <li>Logotipos oficiais bordados</li>
          <li>Design da temporada 2023</li>
          <li>100% poliéster de alta qualidade</li>
        </ul>
      </div>

      <div class="reviews">
        <h2>Avaliações</h2>
        <div class="d-flex">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <h5 class="fs-1 mb-0">4.8</h5>
            <div class="d-flex">
              <i class="bi bi-star-fill text-danger fs-4"></i>
              <i class="bi bi-star-fill text-danger fs-4"></i>
              <i class="bi bi-star-fill text-danger fs-4"></i>
              <i class="bi bi-star-fill text-danger fs-4"></i>
              <i class="bi bi-star text-danger fs-4"></i>
            </div>
            <p class="fs-6 text-secondary mb-0">127 avaliações</p>
          </div>
          <div class="d-flex flex-column gap-1 w-100">
            <div class="d-flex align-items-center mb-1">
              <span class="fs-6 text-primary d-flex align-items-center me-2 ms-4">
                5
                <i class="bi bi-star-fill text-danger fs-6 ml-1"></i>
              </span>
              <div class="progress flex-grow-1 ms-3 me-2" style="height: 0.8rem; min-width: 80px">
                <div class="progress-bar bg-danger" style="width: 70%"></div>
              </div>
              <span class="fs-6 text-primary ms-2">70%</span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <span class="fs-6 text-primary d-flex align-items-center me-2 ms-4">
                4
                <i class="bi bi-star-fill text-danger fs-6 ml-1"></i>
              </span>
              <div class="progress flex-grow-1 ms-3 me-2" style="height: 0.8rem; min-width: 80px">
                <div class="progress-bar bg-danger" style="width: 20%"></div>
              </div>
              <span class="fs-6 text-primary ms-2">20%</span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <span class="fs-6 text-primary d-flex align-items-center me-2 ms-4">
                3
                <i class="bi bi-star-fill text-danger fs-6 ml-1"></i>
              </span>
              <div class="progress flex-grow-1 ms-3 me-2" style="height: 0.8rem; min-width: 80px">
                <div class="progress-bar bg-danger" style="width: 7%"></div>
              </div>
              <span class="fs-6 text-primary ms-2">7%</span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <span class="fs-6 text-primary d-flex align-items-center me-2 ms-4">
                2
                <i class="bi bi-star-fill text-danger fs-6 ml-1"></i>
              </span>
              <div class="progress flex-grow-1 ms-3 me-2" style="height: 0.8rem; min-width: 80px">
                <div class="progress-bar bg-danger" style="width: 2%"></div>
              </div>
              <span class="fs-6 text-primary ms-2">2%</span>
            </div>
            <div class="d-flex align-items-center mb-1">
              <span class="fs-6 text-primary d-flex align-items-center me-2 ms-4">
                1
                <i class="bi bi-star-fill text-danger fs-6 ml-1"></i>
              </span>
              <div class="progress flex-grow-1 ms-3 me-2" style="height: 0.8rem; min-width: 80px">
                <div class="progress-bar bg-danger" style="width: 1%"></div>
              </div>
              <span class="fs-6 text-primary ms-2">1%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-img-container {
  width: 100%;
  aspect-ratio: 4/3;
  min-height: 160px;
  overflow: hidden;
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: #ffffff;
}
</style>
