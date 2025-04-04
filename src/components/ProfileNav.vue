<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div
    class="col-12 fixed vh-100 col-sm-2 col-xl-2 border-1 border-top-0 border-secondary-subtle px-sm-2 px-0 d-flex z-0 overflow-hidden"
  >
    <div
      class="d-flex flex-column flex-row align-items-center align-items-sm-start px-2 pt-2 text-white w-100"
    >
      <a
        href="/"
        class="d-flex align-items-center pb-sm-3 mb-md-0 mt-lg-3 me-md-auto text-dark text-decoration-none"
      >
        <i class="bi bi-person-circle mb-0 mr-2 h1 h-100 d-flex align-items-center"></i>
        <div class="d-flex flex-column h-100 justify-content-center">
          <span class="fs-6"
            >{{ auth.user.name }}
            <span class="d-none d-sm-inline"><!-- Se quiser add algo so p desktop --></span>
          </span>
          <span class="fs-half text-secondary">{{ auth.user.email }}</span>
        </div>
      </a>
      <ul
        class="nav nav-pills w-100 flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
        id="menu"
      >
        <li class="nav-item">
          <RouterLink to="personalData" href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi-house"></i><span class="ms-2 d-none d-sm-inline">Dados Pessoais</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#submenu1" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-box"></i>
            <span class="ms-2 d-none d-sm-inline">Meus Pedidos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#submenu1" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-arrow-left-right"></i>
            <span class="ms-2 d-none d-sm-inline">Trocas Efetuadas</span>
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink to="addresses" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-geo-alt"></i
            ><span class="ms-2 d-none d-sm-inline">Endereços</span></RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-credit-card"></i
            ><span class="ms-2 d-none d-sm-inline">Pagamentos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-heart"></i
            ><span class="ms-2 d-none d-sm-inline">Lista de Desejos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-lock"></i><span class="ms-2 d-none d-sm-inline">Segurança</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-question-circle"></i
            ><span class="ms-2 d-none d-sm-inline">Ajuda</span>
          </RouterLink>
        </li>
        <li class="nav-item" v-if="auth.user.role === 'ADMIN'">
          <RouterLink to="addModerator" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-person-add"></i
            ><span class="ms-2 d-none d-sm-inline">Moderador</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink href="#" class="nav-link px-sm-0 px-2 text-danger fw-bold">
            <i class="fs-5 bi bi-box-arrow-right"></i>
            <span class="ms-2 d-sm-inline">Sair</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.icon-50 {
  font-size: 50px;
}

.nav-link {
  color: black;
}

.nav-link:hover {
  background-color: rgb(0, 0, 0, 0.2);
}

.nav-item {
  width: 100%;
}
.fs-half {
  font-size: 0.8rem;
}
</style>
