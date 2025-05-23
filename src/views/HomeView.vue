<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import ProductCardComponent from '@/components/ProductCardComponent.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import { useCategoryStore } from '@/stores/CategoryStore'
import { useProductStore } from '@/stores/ProductStore'
import { useImageStore } from '@/stores/ImageStore'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/CartStore'

const categoryData = useCategoryStore()
const productData = useProductStore()
const imageStore = useImageStore()
const router = useRouter()
const auth = useAuthStore()
const useCart = useCartStore()

function redirectProduct(id) {
  productData.saveProduct(id)
  router.push(`/product/${id}`)
}

onMounted(() => {
  categoryData.saveCategories()
  categoryData.filterCategories()
  productData.saveProducts()
  productData.filterProducts()
  productData.filterProductsByDiscount()
  console.log('Pordutos: ', productData.productsWithDiscount)

  if (auth.isAuthenticated) {
    useCart.saveCart()
    useCart.saveCartItems()
  }
})

import { Truck, Star, ShoppingBag, ArrowRight } from 'lucide-vue-next'
import { onMounted } from 'vue'
import PaginatorComponent from '../components/PaginatorComponent.vue'
</script>

<template>
  <section class="bg-white py-10 py-lg-20">
    <div class="row container mx-auto">
      <div class="col-12 col-md-6">
        <div class="home-card-title">
          <h1 class="text-dark fw-bold mb-3">
            A loja para verdadeiros apaixonados por <span style="color: #ff0000">Fórmula 1</span>
          </h1>
          <p class="h5 text-secondary">
            Mercadoria exclusiva de alta qualidade para entusiastas de automobilismo. Equipamentos
            oficiais de equipes, acessórios, colecionáveis e muito mais.
          </p>
        </div>
        <div class="home-card-buttons mt-5 d-flex gap-3">
          <ButtonComponent button-text="Explorar Produtos" button-style="buttonRed smallRadius" />
          <ButtonComponent button-text="Ver Ofertas" button-style="buttonWhite smallRadius" />
        </div>
        <div class="attributes flex mt-4 gap-4">
          <div class="mt-4 flex gap-1 text-dark"><Truck /> Entrega Rápida</div>
          <div class="mt-4 flex gap-1 text-dark"><Star /> Produtos de Qualidade</div>
          <div class="mt-4 flex gap-1 text-dark"><ShoppingBag /> Compra Segura</div>
        </div>
      </div>
      <div
        class="col-12 col-md-6 home-card-img d-flex justify-content-start align-items-end rounded-3 shadow m-lg-0 mt-5"
      >
        <h2 class="text-white fw-bold m-5">Acelere com Estilo</h2>
      </div>
    </div>
  </section>

  <section class="py-12 bg-body-secondary">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle
        title-text="Categorias de Produtos"
        title-description="Explore nossas categorias de produtos oficiais da Fórmula 1 e encontre itens exclusivos das suas equipes e pilotos favoritos."
        title-text-color="secondaryText"
        subTitle-text-color="tertiaryText"
      />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-4"
          v-for="category in categoryData.filteredCategories"
          :key="category.id"
        >
          <CategoryCard
            :category-name="category.name"
            :category-image="imageStore.imageURL(category.image_path)"
          />
        </div>
        <PaginatorComponent />
      </div>
    </div>
  </section>

  <section class="py-12 bg-white">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle
        title-text="Ofertas Especiais"
        title-description="Ofertas especialmente selecionadas para você aproveitar!"
        title-text-color="secondaryText"
        subTitle-text-color="tertiaryText"
      />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="product in productData.productsWithDiscount"
          :key="product.id"
        >
          <ProductCardComponent
            :product-name="product.name"
            :product-image="imageStore.imageURL(product.image_path)"
            :product-price="product.price"
            :category-name="product.category.name"
            :discount-percentage="product.discounts[0]?.discount_percentage"
            :discounted-price="
              product.discounts[0]
                ? product.price * (1 - product.discounts[0].discount_percentage / 100)
                : null
            "
            @click="redirectProduct(product.id)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-5 text-center">
          <RouterLink
            to="/products"
            class="text-decoration-none text-dark fw-bold d-flex gap-1 justify-content-center"
          >
            Conferir todas as ofertas <ArrowRight />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section class="border-danger-subtle">
    <img src="@/assets/images/homeimage.jpeg" alt="" class="w-100" />
  </section>

  <section class="py-12 bg-white">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle
        title-text="Produtos em Destaque"
        title-description="Explore nosso grid completo de produtos oficiais da Fórmula 1 e encontre itens exclusivos das suas equipes e pilotos favoritos."
        title-text-color="secondaryText"
        subTitle-text-color="tertiaryText"
      />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="product in productData.filteredProducts.filter(
            (p) => !p.discounts || !p.discounts.length,
          )"
          :key="product.id"
        >
          <ProductCardComponent
            :product-name="product.name"
            :product-image="imageStore.imageURL(product.image_path)"
            :product-price="product.price"
            :category-name="product.category.name"
            @click="redirectProduct(product.id)"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-5 text-center">
        <RouterLink
          to="/products"
          class="text-decoration-none text-dark fw-bold d-flex gap-1 justify-content-center"
        >
          Conferir todos os produtos <ArrowRight />
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="border-danger-subtle d-flex">
    <img src="@/assets/images/verstappen.jpg" alt="" class="w-50" />
    <img src="@/assets/images/perez.jpg" alt="" class="w-50" />
  </section>

  <section class="py-12 bg-white">
    <div class="container-fluid px-4 w-100 m-0">
      <SectionTitle
        title-text="Lançamentos Red Bull Racing"
        title-description="Coleção 2025 da Red Bull Racing"
        title-text-color="secondaryText"
        subTitle-text-color="tertiaryText"
      />
      <div class="row g-4">
        <div
          class="col-12 col-md-4 col-lg-3"
          v-for="product in productData.productsWithDiscount"
          :key="product.id"
        >
          <ProductCardComponent
            :product-name="product.name"
            :product-image="imageStore.imageURL(product.image_path)"
            :product-price="product.price"
            :category-name="product.category.name"
            :discount-percentage="product.discounts[0]?.discount_percentage"
            :discounted-price="
              product.discounts[0]
                ? product.price * (1 - product.discounts[0].discount_percentage / 100)
                : null
            "
            @click="redirectProduct(product.id)"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12 mt-5 text-center">
          <RouterLink
            to="/products"
            class="text-decoration-none text-dark fw-bold d-flex gap-1 justify-content-center"
          >
            Conferir todas as ofertas <ArrowRight />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-card-img {
  background-image: url(../assets/images/background.jpg);
  background-size: 100% 100%;
  transition: 0.3s;
}

.home-card-img:hover {
  transform: scale(1.03);
}

@media (min-width: 992px) {
  .py-lg-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
</style>
