<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useProductStore } from '@/stores/ProductStore'

const categoryData = useCategoryStore()
const productData = useProductStore()

onMounted(() => {
  categoryData.saveCategories()
  categoryData.filterCategories()
  productData.saveProducts()
  productData.filterProducts()
  console.log('Pordutos: ', productData.filteredProducts)
})

import { Truck, Star, ShoppingBag } from 'lucide-vue-next'
import { onMounted } from 'vue'

function imageURL(path) {
  const apiURL = import.meta.env.VITE_API_URL
  return `${apiURL}${path}`
}
</script>

<template>
  <section class="bg-warning-subtle py-20">
    <div class="row container mx-auto">
      <div class="col-12 col-md-6">
        <div class="home-card-title">
          <h1 class="fw-bold mb-4">Encontre os melhores produtos com os melhores preços</h1>
          <p class="h3">
            Descubra uma seleção incrível de produtos para todas as suas necessidades, com entrega
            rápida e segura
          </p>
        </div>
        <div class="home-card-buttons mt-4">
          <ButtonComponent button-text="Explorar Produtos" button-style="buttonBlack bigRadius" />
          <ButtonComponent button-text="Ver Ofertas" button-style="buttonWhite bigRadius" />
        </div>
        <div class="attributes flex mt-4 gap-4">
          <div class="mt-4 flex gap-1"><Truck /> Entrega Rápida</div>
          <div class="mt-4 flex gap-1"><Star /> Produtos de Qualidade</div>
          <div class="mt-4 flex gap-1"><ShoppingBag /> Compra Segura</div>
        </div>
      </div>
      <div
        class="col-12 col-md-6 home-card-img flex justify-content-center align-items-center rounded-3 shadow"
      >
        <div
          class="home-card-special-offer bg-black bg-opacity-75 hover-zoom d-flex flex-column justify-content-center align-items-center p-8 rounded-3 gap-1"
        >
          <h2 class="text-white fw-bold">Oferta do Dia</h2>
          <p class="text-white">
            Até 40% de desconto em <span class="underline">eletrônicos</span>
          </p>
          <ButtonComponent button-text="Ver Ofertas" button-style="buttonWhite smallRadius" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-12">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle title-text="Categorias" />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-2"
          v-for="category in categoryData.filteredCategories"
          :key="category.id"
        >
          <CategoryCard :category-name="category.name" />
        </div>
      </div>
    </div>
  </section>

  <section class="py-12 bg-secondary-subtle">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle title-text="Produtos em Destaque" />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="product in productData.filteredProducts"
          :key="product.id"
        >
          <ProductCardComponent
            :product-name="product.name"
            :product-image="imageURL(product.image_path)"
            :product-price="product.price"
            :category-name="product.category.name"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-card-img {
  background-image: url(../assets/images/eletronics.avif);
  background-size: 100% 100%;
}
</style>
