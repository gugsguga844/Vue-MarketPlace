<script setup>
import FormInput from '@/components/FormInput.vue';
import { createDiscount } from '@/services/HttpService';
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import { useProductStore } from '@/stores/ProductStore';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { useDiscountStore } from '@/stores/discountStore';
import FormSelect from '@/components/FormSelect.vue';

const auth = useAuthStore()
const toast = useToast()
const useProducts = useProductStore()
const discountDescription = ref('')
const discountPercentage = ref('')
const discountStartDate = ref('')
const discountEndDate = ref('')
const discountProduct = ref('')
const useDiscounts = useDiscountStore()

// async function checkDiscountChanges() {
//   const discountChanges = {}

//   if (discountDescription.value !== useDiscounts.discount.description) {
//     discountChanges.description = discountDescription.value
//   }

//   if (discountPercentage.value !== useDiscounts.discount.percentage) {
//     discountChanges.percentage = discountPercentage.value
//   }

//   if (discountStartDate.value !== useDiscounts.discount.start_date) {
//     discountChanges.start_date = discountStartDate.value
//   }

//   if (discountEndDate.value !== useDiscounts.discount.end_date) {
//     discountChanges.end_date = discountEndDate.value
//   }

//   return discountChanges
// }

async function saveDiscount() {
  const token = auth.token
  const response = await createDiscount(token, {
    description: discountDescription.value,
    discount_percentage: discountPercentage.value,
    start_date: discountStartDate.value,
    end_date: discountEndDate.value,
    product_id: discountProduct.value,
  })

  if (response.status === 201) {
    toast.success('Desconto criado com sucesso')
    useDiscounts.saveNewDiscount(response.data)
    cleanDiscount()
  } else {
    toast.error('Erro ao criar desconto')
  }
}

function cleanDiscount() {
  discountDescription.value = ''
  discountPercentage.value = ''
  discountStartDate.value = ''
  discountEndDate.value = ''
  discountProduct.value = ''
}

async function removeDiscount(discount_id) {
  const token = auth.token
  const response = await removeDiscount(discount_id, token)

  if (response.status === 204) {
    toast.success('Desconto removido com sucesso')
  } else {
    toast.error('Erro ao remover desconto')
  }
}

onMounted(() => {
  useDiscounts.saveDiscounts()
})

const products = computed(() => {
  return useProducts.products.map(product => ({
    value: product.id,
    label: product.name
  }))
})
</script>

<template>
  <form @submit.prevent="saveDiscount" class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
    <ProfileCardTitle
      profile-card-title="Adicionar Novo Desconto"
      profile-card-description="Adicione um novo desconto ao sistema."
    />
    <div class="row">
      <div class="col-12 col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição do Desconto"
          input-placeholder="Descrição do desconto"
          v-model="discountDescription"
        />
      </div>
      <div class="col-12 col-md-6">
        <FormSelect
          input-for="produto"
          input-type="select"
          form-label="Produto"
          :options="products"
          v-model="discountProduct"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <FormInput
          input-for="preco"
          input-type="text"
          input-min="0"
          form-label="Porcentagem do Desconto"
          input-placeholder="Porcentagem do desconto"
          v-model="discountPercentage"
        />
      </div>

      <div class="col-md-4">
        <FormInput
          input-for="estoque"
          input-type="date"
          form-label="Data de Início do Desconto"
          input-placeholder="Data de início do desconto"
          v-model="discountStartDate"
        />
      </div>

      <div class="col-md-4">
        <FormInput
          input-for="estoque"
          input-type="date"
          form-label="Data de Fim do Desconto"
          input-placeholder="Data de fim do desconto"
          v-model="discountEndDate"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="d-flex gap-4">
          <ButtonComponent
            class="w-100"
            button-type="submit"
            button-style="buttonBlack smallRadius"
            button-text="Cadastrar Desconto"
          />
        </div>
      </div>
    </div>
  </form>

  <div class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4">
    <ProfileCardTitle profile-card-title="Gerenciar Descontos" profile-card-description="Gerencie os descontos do sistema." />
    <ListTable
      :headers="['Descrição', 'Porcentagem', 'Data de Início', 'Data de Fim', 'ID do Produto', 'ID do Desconto']"
      :rows="useDiscounts.discounts"
      @edit="editDiscount"
      @remove="removeDiscount"
    />
    <ModalComponent
      :show="showModal"
      modal-title="Editar Desconto"
      @close="showModal = false"
      @save="saveEditedDiscount"
    >
      <template #body>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="nome"
              input-type="text"
              form-label="Nome do Produto"
              input-placeholder="Nome do produto"
              v-model="editName"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="descricao"
              input-type="text"
              form-label="Descrição do Produto"
              input-placeholder="Descrição do produto"
              v-model="editDescription"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="preco"
              input-type="number"
              input-min="0"
              form-label="Preço do Produto"
              input-placeholder="R$0,00"
              v-model="editPrice"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12">
            <FormSelect
              input-for="categoria"
              input-type="select"
              form-label="Categoria do Produto"
              input-placeholder="Categoria do produto"
              :options="categories"
              v-model="editCategory"
            />
          </div>
        </div>
      </template>
    </ModalComponent>
  </div>
</template>
