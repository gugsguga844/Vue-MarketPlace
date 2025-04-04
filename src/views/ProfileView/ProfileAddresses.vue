<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useAddressStore } from '@/stores/AdressStore'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const useAddresses = useAddressStore()
const auth = useAuthStore()

function redirect() {
  router.push({ name: 'addAddress' })
}

onMounted(() => {
  useAddresses.saveAddresses(auth.token)
  console.log(useAddresses.addresses)
})
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold m-0">Meus Endereços</h4>
    <ButtonComponent
      @click.prevent="redirect"
      button-style="buttonBlack smallRadius"
      button-text="+ Adicionar Endereço"
    />
  </div>
  <div class="container-fluid border-1 border-dark-subtle rounded-1">
    <div class="title-info m-3">
      <h4>Endereços Cadastrados</h4>
      <p>Gerencie seus endereços de entrega</p>
    </div>

    <template v-if="useAddresses.addresses.length >= 1">
      <template v-for="address in useAddresses.addresses" :key="address.id">
        <div class="row gap-2 m-3">
          <div class="col-12 col-lg-6 rounded-2 border-1 border-dark-subtle">
            <div class="row px-2 py-4">
              <div class="col-2">
                <div class="rounded-circle bg-warning-subtle text-center py-3">
                  <i class="bi bi-geo-alt h3"></i>
                </div>
              </div>
              <div class="col-10">
                <h6>Casa</h6>
                <p class="text-secondary h6">
                  {{ address.street }}, {{ address.number }}, {{ address.city }} -
                  {{ address.state }}, {{ address.zip }}
                </p>
                <div class="buttons d-flex gap-2">
                  <button class="border-1 border-dark-subtle rounded-3 px-3 fs-7">
                    <i class="bi bi-pencil-square"></i>
                    <span class="">Editar</span>
                  </button>
                  <button class="border-1 border-dark-subtle p-2 rounded-3 px-3 fs-7">
                    <i class="bi bi-pencil-square"></i>
                    <span class="">Definir como padrão</span>
                  </button>
                  <button class="border-1 border-danger px-3 text-danger p-2 rounded-3 fs-7">
                    <i class="bi bi-trash"></i>
                    <span class="">Remover</span>
                  </button>
                </div>
              </div>
              <!-- <div class="col-4 text-end">
            <span class="bg-dark p-1 text-white text-center">Padrão</span>
          </div> -->
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <h6 class="mx-3 my-4">Você não possui endereços cadastrados</h6>
    </template>
  </div>
</template>

<style scoped>
.fs-7 {
  font-size: 0.8rem;
}
</style>
