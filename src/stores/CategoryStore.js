import { getCategories } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])
  const filteredCategories = ref([])
  const startValue = ref(0)
  const endValue = ref(6)

  async function saveCategories() {
    const apiResult = await getCategories()
    categories.value = apiResult
    console.log(apiResult)
    console.log(categories)
  }

  function filterCategories() {
    filteredCategories.value = categories.value.slice(startValue.value, endValue.value)
  }

  return { saveCategories, categories, filterCategories, filteredCategories }
})
