<script setup>
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useProductStore } from '@/stores/ProductStore';
import { computed, onMounted, ref } from 'vue';
import FormSelect from '@/components/FormSelect.vue';

const useCategories = useCategoryStore()
const useProducts = useProductStore()

const filteredCategories = ref([])

function filterCategories() {
  filteredCategories.value = useCategories.categories.map(category => {
    const products = useProducts.products.filter(product => product.category_id === category.id).length;
    return {
      name: category.name,
      productAmount: products
    }
  })
}

const categories = computed(() => {
  return useCategories.categories.map(category => ({
    value: category.id,
    label: category.name
  }))
})

onMounted(() => {
  filterCategories()
})
</script>

<template>
  <form class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
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
        />
      </div>

      <div class="col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição do Produto"
          input-placeholder="Descrição do produto"
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
        />
      </div>

      <div class="col-md-4">
        <FormInput
          input-for="estoque"
          input-type="number"
          input-min="0"
          form-label="Estoque do Produto"
          input-placeholder="Estoque do produto"
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
      :rows="filteredCategories"
    />
  </div>
</template>