<script setup></script>

<template>
  <div class="row bg-dark-subtle rounded-1 p-2 text-center">
    <div class="col-4">
      <RouterLink to="/profile/admin/adminUsers" class="d-block py-2 text-black fw-bold" active-class="active-tab">Moderadores</RouterLink>
    </div>
    <div class="col-4">
      <RouterLink to="/profile/admin/adminCategories" class="d-block py-2 text-black fw-bold" active-class="active-tab">Categorias</RouterLink>
    </div>
    <div class="col-4">
      <RouterLink to="/profile/admin/adminProducts" class="d-block py-2 text-black fw-bold" active-class="active-tab">Produtos</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  background-color: #fff;
  border-radius: 8px;
  color: #000 !important;
}
</style>