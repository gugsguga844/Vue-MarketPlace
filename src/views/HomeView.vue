<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'

import { Truck, Star, ShoppingBag } from 'lucide-vue-next'
</script>

<template>
  <section class="bg-secondary-subtle py-30">
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
</template>

<style scoped>
.home-card-img {
  background-image: url(../assets/images/eletronics.avif);
  background-size: 100% 100%;
}
</style>
