import { getCategories } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categories = ref([])
    const category = ref({})
    const filteredCategories = ref([])
    const startValue = ref(0)
    const endValue = ref(3)

    async function saveCategories() {
      const apiResult = await getCategories()
      categories.value = apiResult
    }

    function saveCategory(categoryData) {
      category.value = categoryData
    }

    function saveNewCategory(data) {
      categories.value = [...categories.value, data]
    }

    function filterCategories() {
      filteredCategories.value = categories.value.slice(startValue.value, endValue.value)
    }

    function nextPage() {
      if (startValue.value < categories.value.length - 3) {
        startValue.value += 3
        endValue.value += 3
        filterCategories()
      }
    }

    function prevPage() {
      if (startValue.value > 0) {
        startValue.value -= 3
        endValue.value -= 3
        filterCategories()
      }
    }

    function updateCategories(category_id, payload) {
      categories.value = categories.value.map(category => category.id === category_id ? payload : category)
    }

    function updateCategoryInStore(updatedCategory) {
      categories.value = categories.value.map(category =>
        category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category
      )
    }

    function removeCategory(category_id) {
      categories.value = categories.value.filter(category => category.id !== category_id)
    }

    return {
      categories,
      category,
      saveCategories,
      saveCategory,
      saveNewCategory,
      filterCategories,
      nextPage,
      prevPage,
      updateCategories,
      updateCategoryInStore,
      removeCategory,
      startValue,
      endValue,
      filteredCategories
    }
  },
  {
    persist: true,
  },
)
