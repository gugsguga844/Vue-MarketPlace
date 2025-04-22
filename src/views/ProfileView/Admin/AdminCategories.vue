<script setup>
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useProductStore } from '@/stores/ProductStore';
import { onMounted, ref } from 'vue';
import { createCategory, deleteCategory } from '@/services/HttpService';
import { useAuthStore } from '@/stores/auth';
import { useToast } from 'vue-toastification';

const auth = useAuthStore()
const token = auth.token

const useCategories = useCategoryStore()
const useProducts = useProductStore()
const name = ref('')
const description = ref('')
const toast = useToast()

const categoriesWithProducts = ref([])
const imageFile = ref('')
const imagePreview = ref(null)

function filterCategories() {
  categoriesWithProducts.value = useCategories.categories.map(category => {
    const products = useProducts.products.filter(product => product.category_id === category.id).length;
    return {
      id: category.id,
      name: category.name,
      productAmount: products
    }
  })
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

async function saveCategory() {
  const formData = new FormData()
  formData.append('name', name.value)
  formData.append('description', description.value)
  formData.append('image', imageFile.value)
  const response = await createCategory(formData, token)

  if (response.status === 201) {
    toast.success('Categoria criada com sucesso')
    useCategories.saveNewCategory(response.data)
    filterCategories()
  } else {
    toast.error('Erro ao criar categoria')
  }
}

async function removeCategory(category_id) {
  const response = await deleteCategory(category_id, token)

  if (response.status === 204) {
    toast.success('Categoria excluída com sucesso')
    useCategories.removeCategory(category_id)
    filterCategories()
  } else {
    toast.error('Erro ao excluir categoria')
  }
}

onMounted(() => {
  filterCategories()
})
</script>

<template>
  <form @submit.prevent="saveCategory" class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
    <ProfileCardTitle
      profileCardTitle="Adicionar Nova Categoria"
      profileCardDescription="Adicione uma nova categoria ao sistema."
    />

    <div class="row align-items-center mb-3">
      <div class="col-md-6">
        <FormInput
          input-for="nome"
          input-type="text"
          form-label="Nome da Categoria"
          input-placeholder="Nome da categoria"
          v-model="name"
        />
      </div>

      <div class="col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição da Categoria"
          input-placeholder="Descrição da categoria"
          v-model="description"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <label for="category-image" class="form-label fw-semibold">Imagem da Categoria</label>
        <input
          id="category-image"
          type="file"
          class="form-control visually-hidden"
          accept="image/*"
          @change="onImageChange"
          ref="categoryImageInput"
        />
        <div class="d-flex gap-4">
          <button type="button" class="btn btn-outline-primary w-100" @click="$refs.categoryImageInput.click()">
            Selecionar Imagem
          </button>
          <ButtonComponent
            class="w-100"
            button-type="submit"
            button-style="buttonBlack smallRadius"
            button-text="Cadastrar Categoria"
          />
        </div>
        <div v-if="imagePreview" class="mt-2 d-flex justify-content-center">
          <img :src="imagePreview" alt="Pré-visualização" class="img-thumbnail" style="max-width: 200px; max-height: 120px;" />
        </div>
      </div>
    </div>
  </form>

  <div class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4">
    <ProfileCardTitle profile-card-title="Gerenciar Categorias" profile-card-description="Gerencie as categorias do sistema." />
    <ListTable
      :headers="['Nome', 'Produtos']"
      :rows="categoriesWithProducts"
      @remove="removeCategory"
    />
  </div>
</template>

<style scoped>
.btn-outline-primary {
  border-radius: 8px;
  font-weight: 500;
}
.img-thumbnail {
  border-radius: 8px;
  border: 2px solid #dee2e6;
}
</style>