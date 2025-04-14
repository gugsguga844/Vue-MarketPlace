<script setup>
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useAddressStore } from '@/stores/AdressStore'
import { updateAddress } from '@/services/HttpService'
import { getCep } from '@/services/AddressService'
import { useRouter } from 'vue-router'

const toast = useToast()
const auth = useAuthStore()
const addressesData = useAddressStore()
const country = ref(addressesData.address.country || '')
const zip = ref(addressesData.address.zip || '')
const street = ref(addressesData.address.street || '')
const number = ref(addressesData.address.number || '')
const state = ref(addressesData.address.state || '')
const city = ref(addressesData.address.city || '')
const router = useRouter()

const countryOptions = computed(() => {
  return addressesData.countries.map(country => ({
    value: country,
    label: country
  }))
})

async function searchCep() {
  const response = await getCep(zip.value)

  if (response.status === 200) {
    street.value = response.data.street
    city.value = response.data.city
    state.value = response.data.state
    country.value = response.data.country
  } else {
    toast.error('Erro ao buscar CEP')
    console.log(response.status)
  }
}

function checkChanges() {
  const changes = {}

  if (country.value !== addressesData.address.country) {
    changes.country = country.value
  }

  if (zip.value !== addressesData.address.zip) {
    changes.zip = zip.value
  }

  if (street.value !== addressesData.address.street) {
    changes.street = street.value
  }

  if (number.value !== addressesData.address.number) {
    changes.number = number.value
  }

  if (state.value !== addressesData.address.state) {
    changes.state = state.value
  }

  if (city.value !== addressesData.address.city) {
    changes.city = city.value
  }

  return changes
}

async function saveNewAddress() {
  const changes = checkChanges()
  console.log('Mudanças: ', changes)
  const token = auth.token
  const addressId = addressesData.address.id

  if (Object.keys(changes).length > 0) {
    const response = await updateAddress(addressId, changes, token)

    if (response.status === 200) {
      toast.success('Endereço atualizado com sucesso')
      router.push({ name: 'addresses' })
    } else {
      toast.error('Erro ao atualizar endereço')
      console.log(response.status)
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold m-0">Alterar Endereço</h4>
    <ButtonComponent button-style="buttonYellow" button-text="Voltar" />
  </div>

  <form @submit.prevent="saveNewAddress" class="container-fluid border-2 border-dark border-opacity-10 rounded-1">
    <div class="title-info m-3">
      <h4 class="fw-bold">Informações do seu Endereço</h4>
      <p>Confira ou altere os dados do seu novo endereço</p>

      <div class="row mb-4">
        <div class="col-12">
          <FormInput
            input-for="street"
            input-type="text"
            form-label="Nome do Endereço:"
            input-placeholder="Minha Casa"
          />
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12 col-lg-12 d-flex">
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType1" value="residential" />
            <label class="ml-1 form-check-label" for="addressType1"><i class="bi bi-house-door"></i> Residencial</label>
          </div>
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType2" value="commercial" />
            <label class="ml-1 form-check-label" for="addressType2"><i class="bi bi-building"></i> Comercial</label>
          </div>
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType3" value="other" />
            <label class="ml-1 form-check-label" for="addressType3">Outro</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <FormSelect
            input-for="country"
            form-label="País:"
            v-model="country"
            :options="countryOptions"
          />
        </div>
        <div class="col-6">
          <div class="form-group d-flex flex-column">
            <label class="text-start fw-bold mb-2" for="zip">CEP:</label>
            <div class="d-flex gap-2">
              <input
                id="zip"
                type="text"
                class="form-control p-2 border-1 rounded-2 border-dark-subtle"
                placeholder="CEP exemplo"
                v-model="zip"
              />
              <button class="btn btn-secondary" @click.prevent="searchCep">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12 col-lg-6">
          <FormInput
            input-for="street"
            input-type="text"
            form-label="Rua/Avenida:"
            input-placeholder="Rua exemplo"
            v-model="street"
          />
        </div>
        <div class="col-12 col-lg-6">
          <FormInput
            input-for="number"
            input-type="text"
            form-label="Número:"
            input-placeholder="Número exemplo"
            v-model="number"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 col-lg-6">
          <FormInput
            input-for="state"
            input-type="text"
            form-label="Estado:"
            input-placeholder="Estado"
            v-model="state"
          />
        </div>
        <div class="col-6">
          <FormInput
            input-for="city"
            input-type="text"
            form-label="Cidade:"
            input-placeholder="Cidade exemplo"
            v-model="city"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="col-12 form-check form-switch d-flex align-items-center p-0">
            <input
              class="form-check-input border-0 shadow-none h3 ms-2"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
            />
            <div class="d-flex flex-column ms-2">
              <label class="form-check-label fw-bold" for="switchCheckDefault"
                ><i class="bi bi-star"></i> Definir como endereço padrão</label
              >
              <label class="form-check-label" for="switchCheckDefault"
                >Este endereço será usado automaticamente nas suas compras</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 d-flex justify-content-between">
          <ButtonComponent
            class="border-1"
            button-style="buttonDelete bigRadius"
            button-text="Excluir Conta"
          />
          <ButtonComponent
            class="border-1"
            button-type="submit"
            button-style="buttonWhite bigRadius"
            button-text="Salvar Alterações"
          />
        </div>
      </div>
    </div>
  </form>
</template>
