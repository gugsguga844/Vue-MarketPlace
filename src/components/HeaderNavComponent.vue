<script setup>
// import { ref, onMounted } from 'vue'
// import { ChevronDown, Heart, Menu, ShoppingBag, Search, Store, ShoppingCart, User, X } from 'lucide-vue-next'
import { Store, Heart, Search, ShoppingCart, User, Menu } from 'lucide-vue-next'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-black py-2 px-4">
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
          class="d-flex link-underline link-underline-opacity-0 text-light fw-bold"
          to="/"
        >
          <Store style="width: 42px; height: 42px" />
          <span class="pl-2 display-6">3CMark</span>
        </RouterLink>

        <!-- Sidebar -->
        <div
          class="sidebar offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <!-- Sidebar Header -->
          <div class="offcanvas-header text-white border-bottom">
            <RouterLink
              class="d-flex link-underline link-underline-opacity-0 text-light fw-bold"
              to="/"
            >
              <Store />
              <span class="pl-2">3CMarketP</span>
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
              <ul class="d-flex p-0">
                <li class="nav-item mx-2">
                  <a class="nav-link active text-light" aria-current="page" href="#">Ofertas</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-light" href="#">Cupons</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-light" href="#">Novidades</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-light" href="#">Lançamentos</a>
                </li>
                <li class="nav-item mx-2 dropdown">
                  <a
                    class="nav-link dropdown-toggle text-light"
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
                  <a class="nav-link text-light" href="#">Contato</a>
                </li>
                <li class="nav-item mx-2">
                  <a class="nav-link text-light" href="#">Vender</a>
                </li>
              </ul>
            </ul>

            <ul class="navbar-nav d-flex align-items-center justify-content-end gap-3">
              <li class="nav-item mx-2">
                <a class="nav-link active text-light" aria-current="page" href="#"> <Search /></a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link active text-light" aria-current="page" href="#"> <Heart /></a>
              </li>
              <li class="nav-item mx-2 dropdown">
                <a
                  class="nav-link dropdown d-flex align-items-center text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User />
                </a>
                <ul class="dropdown-menu dropdown-menu-lg-start">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link text-light" href="#"><ShoppingCart /></a>
              </li>
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
    background-color: black;
  }
}
</style>
