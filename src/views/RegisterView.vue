<script setup>
import FormButton from '@/components/FormButton.vue'
</script>

<template>
  <div class="container-fluid vh-100">
    <div class="row h-100 bg-warning">
      <div
        class="col-12 col-lg-4 px-5 bg-warning d-flex flex-column justify-content-center align-items-center fw-bold"
      >
        <img class="mb-2" src="../assets/images/3clogo.webp" />
        <div class="text-center mb-32">
          <h1 class="text-black">Bem-vindo</h1>
          <p>Já possui uma conta em nossa loja?</p>
        </div>
        <FormButton button-style="blackButton" form-button-text="Entrar" />
      </div>
      <div
        class="col-12 d-flex flex-column justify-content-center align-items-center mt-3 mb-3 col-lg-8 bg-light text-center overflow-hidden shadow-lg"
        style="border-radius: 200px 0 0 200px"
      >
        <form class="w-100">
          <h2 class="h1">Cadastre-se</h2>
          <div class="row">
            <div class="col-6">
              <input class="bg-black w-100" type="text" name="name" />
            </div>
            <div class="col-6">
              <input class="bg-black w-100" type="text" name="name" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
