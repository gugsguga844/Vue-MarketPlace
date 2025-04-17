<script setup></script>

<template>
  <div class="container">
    <div class="row bg-dark-subtle rounded-1 p-0 text-center mb-4">
      <div class="col-4 p-0">
        <RouterLink to="/profile/admin/adminUsers" class="d-block py-2 text-black fw-bold" active-class="active-tab">Moderadores</RouterLink>
      </div>
      <div class="col-4 p-0">
        <RouterLink to="/profile/admin/adminCategories" class="d-block py-2 text-black fw-bold" active-class="active-tab">Categorias</RouterLink>
      </div>
      <div class="col-4 p-0">
        <RouterLink to="/profile/admin/adminProducts" class="d-block py-2 text-black fw-bold" active-class="active-tab">Produtos</RouterLink>
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