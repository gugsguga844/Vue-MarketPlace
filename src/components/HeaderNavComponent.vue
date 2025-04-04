<script setup>
// import { ref, onMounted } from 'vue'
// import { ChevronDown, Heart, Menu, ShoppingBag, Search, Store, ShoppingCart, User, X } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { Store, Heart, Search, ShoppingCart, Menu } from 'lucide-vue-next'

const auth = useAuthStore()
</script>

<template>
  <header class="sticky-top z-3">
    <nav class="navbar navbar-expand-lg bg-warning py-2 px-4">
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
          class="d-flex text-dark link-underline link-underline-opacity-0 text-light fw-bold"
          to="/"
        >
          <Store style="width: 42px; height: 42px" />
          <span class="pl-2 display-6 fw-bold d-flex justify-content-center align-items-center"
            >3CMark</span
          >
        </RouterLink>

        <!-- Sidebar -->
        <div
          class="sidebar offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <!-- Sidebar Header -->
          <div class="offcanvas-header text-dark border-bottom border-black">
            <RouterLink
              class="d-flex link-underline link-underline-opacity-0 text-dark fw-bold"
              to="/"
            >
              <Store />
              <span class="pl-2">3CMark</span>
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
                  class="form-control"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <ul class="d-lg-flex p-0 fw-bold">
                <li class="nav-item mx-2">
                  <a class="nav-link active text-dark" aria-current="page" href="#">Ofertas</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-dark" href="#">Cupons</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-dark" href="#">Novidades</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-dark" href="#">Lançamentos</a>
                </li>
                <li class="nav-item mx-2 dropdown">
                  <a
                    class="nav-link dropdown-toggle text-dark"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Categorias
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li>
                      <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-dark" href="#">Contato</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-dark" href="#">Vender</a>
                </li>
              </ul>
            </ul>
            <ul class="d-flex flex-column justify-content-center mb-0">
              <ul class="navbar-nav d-flex align-items-center justify-content-end gap-3">
                <li class="nav-item mx-2">
                  <a class="nav-link active" aria-current="page" href="#"> <Search /></a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link active =" aria-current="page" href="#"> <Heart /></a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link" href="#"><ShoppingCart /></a>
                </li>
              </ul>
              <div v-if="!auth.isAuthenticated" class="d-flex mt-3 justify-content-center gap-4">
                <RouterLink class="text-dark fw-bold" to="/login">Entre</RouterLink>
                <RouterLink class="text-dark fw-bold" to="/register">Cadastre-se</RouterLink>
              </div>
              <div class="dropdown d-flex justify-content-center mt-lg-3" v-else>
                <button
                  class="btn border-2 border-black rounded-5 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Olá, Gustavo
                </button>
                <ul class="dropdown-menu dropdown-menu-lg-start p-0 overflow-hidden">
                  <li class="border-bottom border-secondary-subtle">
                    <RouterLink to="profile" class="dropdown-item fw-bold py-2" href="#"
                      ><i class="bi bi-person-circle mr-1"></i> Minha Conta</RouterLink
                    >
                  </li>
                  <li>
                    <a class="dropdown-item py-2" href="#"
                      ><i class="bi bi-bag-check-fill mr-1"></i> Meus Pedidos</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item py-2" href="#"
                      ><i class="bi bi-arrow-left-right mr-1"></i> Trocas</a
                    >
                  </li>
                  <li class="border-top border-secondary-subtle text-center overflow-hidden">
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
@media (max-width: 991px) {
  .sidebar {
    background-color: yellow;
  }
}
</style>
