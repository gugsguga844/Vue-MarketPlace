<script setup>
import { onMounted, ref, computed } from 'vue'
import { useProductStore } from '@/stores/ProductStore'
import { useCategoryStore } from '@/stores/CategoryStore'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import { useImageStore } from '@/stores/ImageStore'
import { Filter } from 'lucide-vue-next'

const productData = useProductStore()
const categoryData = useCategoryStore()
const imageStore = useImageStore()

const selectedCategories = ref([])
const minPrice = ref(null)
const maxPrice = ref(null)
const onlyDiscount = ref(false)

const appliedCategories = ref([])
const appliedMinPrice = ref(null)
const appliedMaxPrice = ref(null)
const appliedOnlyDiscount = ref(false)

const filteredProducts = computed(() => {
  let result = productData.products

  if (appliedCategories.value.length > 0) {
    result = result.filter(product => 
      appliedCategories.value.includes(product.category.id)
    )
  }

  if (appliedMinPrice.value !== null) {
    result = result.filter(product => product.price >= appliedMinPrice.value)
  }
  if (appliedMaxPrice.value !== null) {
    result = result.filter(product => product.price <= appliedMaxPrice.value)
  }

  if (appliedOnlyDiscount.value) {
    result = result.filter(product => product.discounts.length > 0)
  }

  return result
})

function applyFilters() {
  if (onlyDiscount.value) {
    selectedCategories.value = []
    minPrice.value = null
    maxPrice.value = null
  }

  appliedCategories.value = [...selectedCategories.value]
  appliedMinPrice.value = minPrice.value
  appliedMaxPrice.value = maxPrice.value
  appliedOnlyDiscount.value = onlyDiscount.value
}

function toggleCategory(categoryId) {
  onlyDiscount.value = false

  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

onMounted(() => {
  productData.saveProducts()
  categoryData.saveCategories()
})
</script>

<template>
  <section class="products-page-section py-5 bg-light">
    <div class="container-fluid">
      <div class="row">
        <aside class="col-12 col-md-3 col-lg-2 mb-4 mb-md-0">
          <div class="filter-sidebar bg-white rounded-3 shadow-sm p-4">
            <h5 class="fw-bold mb-4 text-danger d-flex gap-2"><Filter /> Filtrar Produtos</h5>
            <div class="mb-4">
              <label class="fw-semibold mb-2">Categorias</label>
              <div class="d-flex flex-column gap-2">
                <div v-for="category in categoryData.categories" :key="category.id">
                  <input type="checkbox" :id="'cat-'+category.id" class="form-check-input me-2" :checked="selectedCategories.includes(category.id)" @change="toggleCategory(category.id)">
                  <label :for="'cat-'+category.id" class="form-check-label">{{ category.name }}</label>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="fw-semibold mb-2">Preço</label>
              <div class="d-flex align-items-center gap-2">
                <input type="number" class="form-control form-control-sm" placeholder="Mín" v-model.number="minPrice" @input="onlyDiscount = false">
                <span class="text-secondary">-</span>
                <input type="number" class="form-control form-control-sm" placeholder="Máx" v-model.number="maxPrice" @input="onlyDiscount = false">
              </div>
            </div>
            <div class="mb-4">
              <label class="fw-semibold mb-2">Desconto</label>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="discountFilter" v-model="onlyDiscount" @change="selectedCategories = []; minPrice = null; maxPrice = null">
                <label class="form-check-label" for="discountFilter">
                  Somente produtos com desconto
                </label>
              </div>
            </div>
            <button class="btn btn-danger w-100 mt-2 text-white" @click="applyFilters()">Aplicar Filtros</button>
          </div>
        </aside>

        <div class="col-12 col-md-9 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">Todos os Produtos</h2>
            <span class="text-secondary">{{ productData.products.length }} itens</span>
          </div>
          <div class="row g-4">
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-3"
              v-for="product in filteredProducts"
              :key="product.id"
            >
              <ProductCardComponent
                :product-name="product.name"
                :product-image="imageStore.imageURL(product.image_path)"
                :product-price="product.price"
                :category-name="product.category.name"
                :discount-percentage="product.discounts && product.discounts.length ? product.discounts[0].discount_percentage : null"
                :discounted-price="product.discounts && product.discounts.length ? (product.price * (1 - product.discounts[0].discount_percentage / 100)) : null"
                @click="$router.push({ name: 'product', params: { id: product.id } })"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-page-section {
  min-height: 90vh;
}
.filter-sidebar {
  min-height: 350px;
}
</style>
