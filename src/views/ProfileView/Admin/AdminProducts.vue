<script setup>
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useProductStore } from '@/stores/ProductStore';
import { computed, onMounted, ref } from 'vue';
import FormSelect from '@/components/FormSelect.vue';
import { createProduct } from '../../../services/HttpService';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const auth = useAuthStore()
const useCategories = useCategoryStore()
const useProducts = useProductStore()
const imageFile = ref(null)
const imagePreview = ref(null)
const name = ref('')
const description = ref('')
const price = ref('')
const stock = ref('')
const category = ref(null)
const token = auth.token
const toast = useToast()
const categoryFilter = ref('')

function cleanProduct() {
  name.value = ''
  description.value = ''
  price.value = ''
  stock.value = ''
  category.value = null
  imageFile.value = null
  imagePreview.value = null
}

function onImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imageFile.value = null
    imagePreview.value = null
  }
}

const categories = computed(() => {
  return useCategories.categories.map(category => ({
    value: category.id,
    label: category.name
  }))
})

async function saveProduct() {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('price', price.value)
  formData.append('stock', stock.value)
  formData.append('category_id', category.value)
  formData.append('image', imageFile.value)

  const response = await createProduct(formData, token)

  if (response.status === 201) {
    toast.success('Produto criado com sucesso')
    useProducts.saveNewProduct(response.data)
    cleanProduct()
  } else {
    toast.error('Erro ao criar produto')
  }
}

function filterProductsByCategory(category) {
  useProducts.filterAdminProducts()
  if (category) {
    useProducts.adminProductsList.value = useProducts.adminProductsList.value.filter(product => product.category === category)
  } else {
    useProducts.filterAdminProducts()
  }
}

onMounted(() => {
  useProducts.filterAdminProducts()
  console.log('Produtos daqui: ', useProducts.adminProductsList)
})
</script>

<template>
  <form @submit.prevent="saveProduct" class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
    <ProfileCardTitle
      profile-card-title="Adicionar Novo Produto"
      profile-card-description="Adicione um novo produto ao sistema."
    />

    <div class="row">
      <div class="col-md-6">
        <FormInput
          input-for="nome"
          input-type="text"
          form-label="Nome do Produto"
          input-placeholder="Nome do produto"
          v-model="name"
        />
      </div>

      <div class="col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição do Produto"
          input-placeholder="Descrição do produto"
          v-model="description"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <FormInput
          input-for="preco"
          input-type="number"
          input-min="0"
          form-label="Preço do Produto"
          input-placeholder="R$0,00"
          v-model="price"
        />
      </div>

      <div class="col-md-4">
        <FormInput
          input-for="estoque"
          input-type="number"
          input-min="0"
          form-label="Estoque do Produto"
          input-placeholder="Estoque do produto"
          v-model="stock"
        />
      </div>

      <div class="col-md-4">
        <FormSelect
          input-for="categoria"
          input-type="select"
          form-label="Categoria do Produto"
          input-placeholder="Categoria do produto"
          :options="categories"
          v-model="category"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <label for="product-image" class="form-label fw-semibold">Imagem do Produto</label>
        <input
          id="product-image"
          type="file"
          class="form-control visually-hidden"
          accept="image/*"
          @change="onImageChange"
          ref="productImageInput"
        />
        <div class="d-flex gap-4">
          <button type="button" class="btn btn-outline-primary w-100" @click="$refs.productImageInput.click()">
            Selecionar Imagem
          </button>
          <ButtonComponent
            class="w-100"
            button-type="submit"
            button-style="buttonBlack smallRadius"
            button-text="Cadastrar Produto"
          />
        </div>
        <div v-if="imagePreview" class="mt-2 d-flex justify-content-center">
          <img :src="imagePreview" alt="Pré-visualização" class="img-thumbnail" style="max-width: 200px; max-height: 120px;" />
        </div>
      </div>
    </div>
  </form>

  <div class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4">
    <ProfileCardTitle profile-card-title="Gerenciar Produtos" profile-card-description="Gerencie os produtos do sistema.">
        <FormSelect
          input-for="categoria"
          input-type="select"
          :form-label="''"
          input-placeholder="Todas as Categorias"
          :options="[{ value: '', label: 'Todas as Categorias' }, ...categories]"
          v-model="categoryFilter"
          @change="filterProductsByCategory(categoryFilter)"
        />
    </ProfileCardTitle>
    <ListTable
      :headers="['ID', 'Nome', 'Preço', 'Estoque', 'Categoria']"
      :rows="useProducts.adminProductsList"
    />
  </div>
</template>