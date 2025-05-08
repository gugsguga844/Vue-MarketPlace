<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Heart, Search, ShoppingCart, Menu, Lock } from 'lucide-vue-next'
import CartComponent from './CartComponent.vue'
import { useCategoryStore } from '@/stores/CategoryStore'

const useCategories = useCategoryStore()
const auth = useAuthStore()

onMounted(() => {
  useCategories.saveCategories()
})
</script>

<template>
  <header class="sticky-top z-3">
    <nav class="navbar navbar-expand-lg py-2 px-4 bg-black">
      <div class="container-fluid">
        <!-- Toggle Button -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <Menu color="white" style="width: 32px; height: 32px" />
        </button>
        <!-- navbar logo -->
        <RouterLink
          class="d-flex text-white link-underline link-underline-opacity-0 fw-bold"
          to="/"
        >
          <span class="text-danger fs-1">F1</span>
          <span class="display-6 fw-bold d-flex justify-content-center align-items-center">
            Fanatics
          </span>
        </RouterLink>

        <!-- Sidebar -->
        <div
          class="sidebar offcanvas offcanvas-start bg-dark text-white"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <!-- Sidebar Header -->
          <div class="offcanvas-header text-white border-bottom border-danger">
            <RouterLink
              class="d-flex link-underline link-underline-opacity-0 text-white fw-bold"
              to="/"
            >
              <span class="text-danger">F</span>
              <span class="pl-2">STORE</span>
            </RouterLink>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <!-- Sidebar Body -->
          <div class="offcanvas-body">
            <ul class="ul-justify navbar-nav flex-column flex-grow-1 px-3">
              <form class="d-flex p-3 w-75" role="search">
                <input
                  class="bg-white form-control text-dark border-dark"
                  type="search"
                  placeholder="Pesquisar produtos"
                  aria-label="Search"
                  autofocus
                />
              </form>
              <ul class="d-lg-flex p-0">
                <li class="nav-item mx-2 dropdown">
                  <a
                    class="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categorias
                  </a>
                  <ul class="dropdown-menu bg-dark">
                    <li v-for="category in useCategories.categories" :key="category.id">
                      <RouterLink class="dropdown-item text-white" href="#">{{
                        category.name
                      }}</RouterLink>
                    </li>
                  </ul>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link active text-white" aria-current="page" href="#">Ofertas</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Cupons</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Mais vendidos</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Novidades</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Atendimento</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Regulamentos</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Acessibilidade</a>
                </li>
                <li class="nav-item mx-2" v-if="auth.user.role === 'ADMIN'">
                  <RouterLink to="/profile/admin" class="nav-link text-danger d-flex gap-1" href="#"
                    ><Lock /> Admin</RouterLink
                  >
                </li>
              </ul>
            </ul>
            <ul class="d-flex flex-column justify-content-center mb-0">
              <ul class="navbar-nav d-flex align-items-center justify-content-end gap-3">
                <li class="nav-item mx-2">
                  <a class="nav-link active text-white" aria-current="page" href="#"> <Search /></a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link active text-white" aria-current="page" href="#"> <Heart /></a>
                </li>
                <li class="nav-item mx-2">
                  <button
                    class="nav-link text-white"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <ShoppingCart />
                  </button>
                </li>
              </ul>
              <div v-if="!auth.isAuthenticated" class="d-flex mt-3 justify-content-center gap-4">
                <RouterLink class="text-white fw-bold" to="/login">Entre</RouterLink>
                <RouterLink class="text-white fw-bold" to="/register">Cadastre-se</RouterLink>
              </div>
              <div class="dropdown d-flex justify-content-center mt-lg-3" v-else>
                <button
                  class="btn border-2 border-white rounded-5 dropdown-toggle text-white px-3 d-flex align-items-center gap-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div class="profile-image-container bg-dark position-relative">
                    <img :src="auth.getUserImage()" alt="Foto de Perfil" class="profile-image" />
                  </div>
                  Olá, {{ auth.user.name }}
                </button>

                <ul class="dropdown-menu dropdown-menu-lg-start p-0 overflow-hidden bg-dark">
                  <li class="border-bottom border-danger">
                    <RouterLink
                      to="/profile/profileData"
                      class="dropdown-item fw-bold py-2 text-white"
                      href="#"
                      ><i class="bi bi-person-circle mr-1"></i> Minha Conta</RouterLink
                    >
                  </li>
                  <li>
                    <RouterLink to="/profile/orders" class="dropdown-item py-2 text-white" href="#"
                      ><i class="fs-5 bi bi-box"></i>
                      <span class="ms-2 d-none d-sm-inline">Meus Pedidos</span></RouterLink
                    >
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#">
                      <i class="fs-5 bi bi-arrow-left-right"></i>
                      <span class="ms-2 d-none d-sm-inline">Trocas Efetuadas</span>
                    </a>
                  </li>
                  <li>
                    <RouterLink
                      to="/profile/addresses"
                      class="dropdown-item py-2 text-white"
                      href="#"
                    >
                      <i class="fs-5 bi bi-geo-alt"></i>
                      <span class="ms-2 d-none d-sm-inline">Endereços</span>
                    </RouterLink>
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#">
                      <i class="fs-5 bi bi-credit-card"></i
                      ><span class="ms-2 d-none d-sm-inline">Pagamentos</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#">
                      <i class="fs-5 bi bi-heart"></i
                      ><span class="ms-2 d-none d-sm-inline">Lista de Desejos</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#">
                      <i class="fs-5 bi bi-lock"></i>
                      <span class="ms-2 d-none d-sm-inline">Segurança</span>
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#">
                      <i class="fs-5 bi bi-question-circle"></i
                      ><span class="ms-2 d-none d-sm-inline">Ajuda</span>
                    </a>
                  </li>
                  <li class="border-top border-danger text-center overflow-hidden">
                    <a
                      class="dropdown-item py-2 fw-bold text-danger cursor-pointer d-flex align-items-center justify-content-center"
                      @click="auth.logout"
                    >
                      <i class="fs-5 bi bi-box-arrow-right"></i>
                      <span class="ms-2 d-sm-inline">Sair</span>
                    </a>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <CartComponent />
  </header>
</template>

<style scoped>
@media (min-width: 992px) {
  .ul-justify {
    align-items: center;
    width: 100%;
    justify-content: center;
  }
}

.nav-link:hover {
  color: #ff0000 !important;
}

input::placeholder {
  color: #ffffff;
}

.dropdown-menu {
  background-color: #000000 !important;
}

.dropdown-item:hover {
  background-color: #1a1a1a !important;
  color: #ff0000 !important;
}

.form-control:focus {
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
}

.btn-close:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
}

@media (max-width: 991px) {
  .sidebar {
    background-color: #000000;
  }
}
.profile-image-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

@media (max-width: 576px) {
  .profile-image-container {
    width: 40px;
    height: 40px;
  }
}
</style>
