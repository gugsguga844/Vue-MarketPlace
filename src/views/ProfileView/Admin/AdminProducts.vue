<script setup>
import FormInput from '@/components/FormInput.vue';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import { useProductStore } from '@/stores/ProductStore';
import { onMounted, ref } from 'vue';

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
          form-label="Nome da Categoria"
          input-placeholder="Nome da categoria"
        />
      </div>

      <div class="col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição da Categoria"
          input-placeholder="Descrição da categoria"
        />
      </div>
    </div>

    <div class="buttonDiv d-flex justify-content-end">
      <ButtonComponent
        button-type="submit"
        button-style="buttonBlack smallRadius"
        button-text="Cadastrar Produto"
      />
    </div>

    <div class="row">
      <div class="col-md-12">
        <input type="file" />
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