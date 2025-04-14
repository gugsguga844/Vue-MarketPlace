<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import { deleteAddress, getAddress } from '@/services/HttpService'
import { useAddressStore } from '@/stores/AdressStore'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()

const useAddresses = useAddressStore()
const auth = useAuthStore()
const toast = useToast()

function redirect() {
  router.push({ name: 'addAddress' })
}

async function removeAddress(address_id) {
  const token = auth.token
  const response = await deleteAddress(address_id, token)

  if (response.status === 204) {
    useAddresses.removeArrayAddress(address_id)
    toast.success('Endereço deletado com sucesso', {
      timeout: 2500,
    })
  } else {
    alert('Erro ao deletar endereço')
  }
}

async function editAddress(address_id) {
  const token = auth.token
  const response = await getAddress(address_id, token)

  if (response.status === 200) {
    useAddresses.saveAddress(response.data)
    router.push({ name: 'editAddress', params: { id: address_id } })
  }
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
      <div class="row m-3">
        <template v-for="address in useAddresses.addresses" :key="address.id">
          <div class="col-12 col-md-6 mb-3 p-2">
            <div class="rounded-2 border-1 border-dark-subtle h-100">
              <div class="d-flex px-2 py-4">
                <div class="rounded-circle bg-warning-subtle d-flex justify-content-center align-items-center" style="width: 50px; height: 50px; min-width: 50px;">
                  <i class="bi bi-geo-alt fs-4"></i>
                </div>
                <div class="ms-2">
                  <h6>Casa</h6>
                  <p class="text-secondary h6">
                    {{ address.street }}, {{ address.number }}<br> {{ address.city }} -
                    {{ address.state }}, {{ address.zip }}
                  </p>
                  <div class="buttons d-flex gap-2">
                    <button @click.prevent="editAddress(address.id)" class="border-1 border-dark-subtle rounded-3 px-3 fs-7">
                      <i class="bi bi-pencil-square"></i>
                      <span class=""> Editar</span>
                    </button>
                    <button class="border-1 border-dark-subtle p-2 rounded-3 px-3 fs-7">
                      <i class="bi bi-pencil-square"></i>
                      <span class=""> Definir como padrão</span>
                    </button>
                    <button @click.prevent="removeAddress(address.id)" class="border-1 border-danger px-3 text-danger p-2 rounded-3 fs-7">
                      <i class="bi bi-trash"></i>
                      <span class=""> Remover</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
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
