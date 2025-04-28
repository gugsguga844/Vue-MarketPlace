<script setup>
// import { ref, onMounted } from 'vue'
// import { ChevronDown, Heart, Menu, ShoppingBag, Search, Store, ShoppingCart, User, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Heart, Search, ShoppingCart, Menu } from 'lucide-vue-next'
import CartComponent from './CartComponent.vue'

const auth = useAuthStore()
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
          <img src="../assets/images/f1-logo.png" alt="F1 Logo" style="height: 40px; margin-right: 10px" />
          <span class="pl-2 display-6 fw-bold d-flex justify-content-center align-items-center"
            >STORE</span
          >
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
              <img src="../assets/images/f1-logo.png" alt="F1 Logo" style="height: 30px; margin-right: 10px" />
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
                  class="form-control bg-dark text-white border-white"
                  type="search"
                  placeholder="Pesquisar produtos..."
                  aria-label="Search"
                  autofocus
                />
              </form>
              <ul class="d-lg-flex p-0 fw-bold">
                <li class="nav-item mx-2">
                  <a class="nav-link active text-white" aria-current="page" href="#">Equipes</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Pilotos</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Circuitos</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-white" href="#">Colecionáveis</a>
                </li>
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
                    <li><a class="dropdown-item text-white" href="#">Camisetas</a></li>
                    <li><a class="dropdown-item text-white" href="#">Bonés</a></li>
                    <li><a class="dropdown-item text-white" href="#">Miniaturas</a></li>
                    <li><a class="dropdown-item text-white" href="#">Acessórios</a></li>
                  </ul>
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
                    aria-controls="offcanvasWithBothOptions">
                    <ShoppingCart /></button>
                </li>
              </ul>
              <div v-if="!auth.isAuthenticated" class="d-flex mt-3 justify-content-center gap-4">
                <RouterLink class="text-white fw-bold" to="/login">Entre</RouterLink>
                <RouterLink class="text-white fw-bold" to="/register">Cadastre-se</RouterLink>
              </div>
              <div class="dropdown d-flex justify-content-center mt-lg-3" v-else>
                <button
                  class="btn border-2 border-white rounded-5 dropdown-toggle text-white px-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Olá, {{ auth.user.name }}
                </button>
                <ul class="dropdown-menu dropdown-menu-lg-start p-0 overflow-hidden bg-dark">
                  <li class="border-bottom border-danger">
                    <RouterLink to="profile" class="dropdown-item fw-bold py-2 text-white" href="#"
                      ><i class="bi bi-person-circle mr-1"></i> Minha Conta</RouterLink
                    >
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#"
                      ><i class="bi bi-bag-check-fill mr-1"></i> Meus Pedidos</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item py-2 text-white" href="#"
                      ><i class="bi bi-arrow-left-right mr-1"></i> Trocas</a
                    >
                  </li>
                  <li class="border-top border-danger text-center overflow-hidden">
                    <a
                      class="dropdown-item py-2 fw-bold text-danger cursor-pointer"
                      @click="auth.logout"
                    >
                      Sair
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
</style>
