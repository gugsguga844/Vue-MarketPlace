<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="col-12 col-sm-3 col-xl-3 bg-warning-subtle px-sm-2 px-0 d-flex sticky-top z-0">
    <div
      class="d-flex flex-column flex-row align-items-center align-items-sm-start px-3 pt-2 text-white w-100"
    >
      <a
        href="/"
        class="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <i class="bi bi-person-circle mb-0 mr-2 h1 h-100 d-flex align-items-center"></i>
        <div class="d-flex flex-column h-100 justify-content-center">
          <span class="fs-6"
            >{{ auth.user.name }}
            <span class="d-none d-sm-inline"><!-- Se quiser add algo so p desktop --></span>
          </span>
          <span class="fs-half">{{ auth.user.email }}</span>
        </div>
      </a>
      <ul
        class="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
        id="menu"
      >
        <li class="nav-item">
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi-house"></i
            ><span class="ms-2 d-none d-sm-inline">Informações Pessoais</span>
          </a>
        </li>
        <li>
          <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-box"></i>
            <span class="ms-2 d-none d-sm-inline">Meus Pedidos</span>
          </a>
        </li>
        <li>
          <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-arrow-left-right"></i>
            <span class="ms-2 d-none d-sm-inline">Trocas Efetuadas</span>
          </a>
        </li>

        <li>
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-geo-alt"></i
            ><span class="ms-2 d-none d-sm-inline">Endereços</span></a
          >
        </li>
        <li>
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-credit-card"></i
            ><span class="ms-2 d-none d-sm-inline">Pagamentos</span></a
          >
        </li>
        <li>
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-heart"></i
            ><span class="ms-2 d-none d-sm-inline">Lista de Desejos</span>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-lock"></i><span class="ms-2 d-none d-sm-inline">Segurança</span>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link px-sm-0 px-2">
            <i class="fs-5 bi bi-question-circle"></i
            ><span class="ms-2 d-none d-sm-inline">Ajuda</span>
          </a>
        </li>
      </ul>
      <div class="py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
        <a href="#" class="nav-link px-sm-0 px-2 text-danger fw-bold">
          <i class="fs-5 bi bi-box-arrow-right"></i><span class="ms-2 d-sm-inline">Sair</span>
        </a>
      </div>
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

.fs-half {
  font-size: 0.8rem;
}
</style>
