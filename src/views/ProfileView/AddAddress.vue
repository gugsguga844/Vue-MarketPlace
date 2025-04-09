<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormInput from '@/components/FormInput.vue'
import FormSelect from '@/components/FormSelect.vue';
import { getCep } from '@/services/AddressService';
import { createAddress } from '@/services/HttpService';
import { useAddressStore } from '@/stores/AdressStore';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const auth = useAuthStore()
const address = useAddressStore()
const router = useRouter()

const street = ref('')
const number = ref('')
const zip = ref('')
const city = ref('')
const state = ref('')
const country = ref('')
const toast = useToast()

const countryOptions = computed(() => {
  return address.countries.map(country => ({
    value: country,
    label: country
  }))
})

async function saveAddress() {
  const token = auth.token
  const response = await createAddress({street: street.value, number: number.value, zip: zip.value, city: city.value, state: state.value, country: country.value}, token)

  if (response.status === 201){
    toast.success('Endereço criado com sucesso')
    router.back()
  } else {
    toast.error('Ocorreu um erro ao salvar os dados.', {
      timeout: 2500,
    })
  }
}

async function searchCep() {
  const response = await getCep(zip.value)

  if (response.status === 200) {
    street.value = response.data.street
    city.value = response.data.city
    state.value = response.data.state
    country.value = response.data.country
  } else {
    alert('Erro ao buscar CEP')
    console.log(response.status)
  }
}

onMounted(() => {
  address.saveCountries()
  console.log('endereços: ', address.countries)
})
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold m-0">Adicionar Endereço</h4>
    <ButtonComponent button-style="buttonYellow" button-text="Voltar" />
  </div>

  <form @submit.prevent="saveAddress" class="container-fluid border-2 border-dark border-opacity-10 rounded-1">
    <div class="title-info m-3">
      <h4 class="fw-bold">Informações do Endereço</h4>
      <p>Preencha os dados do seu novo endereço de entrega</p>

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

<style scoped>
.form-check-input {
  background-color: #e0e0e0; /* Cor de fundo do switch */
  box-shadow: none !important;
}

/* O "círculo" interno do switch (thumb) */

.form-check-input:checked {
  background-color: #000; /* cor da área ativa */
  border-color: #000;
}

/* Círculo interno (o thumb) */
.form-check-input::after {
  background-color: #ff0000 !important; /* nova cor do círculo */
}
</style>
