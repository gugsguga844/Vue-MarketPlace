<script setup></script>

<template>
  <div class="container">
    <div class="row bg-dark-subtle rounded-1 p-0 text-center mb-4">
      <div class="col-2 p-0">
        <RouterLink to="/profile/admin/adminUsers" class="d-block py-2 text-black fw-bold" active-class="active-tab">Moderadores</RouterLink>
      </div>
      <div class="col-2 p-0">
        <RouterLink to="/profile/admin/adminCategories" class="d-block py-2 text-black fw-bold" active-class="active-tab">Categorias</RouterLink>
      </div>
      <div class="col-2 p-0">
        <RouterLink to="/profile/admin/adminProducts" class="d-block py-2 text-black fw-bold" active-class="active-tab">Produtos</RouterLink>
      </div>
      <div class="col-2 p-0">
        <RouterLink to="/profile/admin/adminDiscounts" class="d-block py-2 text-black fw-bold" active-class="active-tab">Descontos</RouterLink>
      </div>
      <div class="col-2 p-0">
        <RouterLink to="/profile/admin/adminCoupons" class="d-block py-2 text-black fw-bold" active-class="active-tab">Cupons</RouterLink>
      </div>
      <div class="col-2 p-0">
        <RouterLink to="/" class="d-block py-2 text-black fw-bold" active-class="active-tab">Olá</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  background-color: #000000;
  border-radius: 8px;
  color: #ffffff !important;
}
</style>