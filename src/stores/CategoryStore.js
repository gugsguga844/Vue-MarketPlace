import { getCategories } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([])

  async function saveCategories() {
    const apiResult = await getCategories()
    categories.value = apiResult
    console.log(apiResult)
    console.log(categories)
  }

  return { saveCategories, categories }
})
