import { getCategories } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useCategoryStore = defineStore(
  'category',
  () => {
    const categories = ref([])
    const filteredCategories = ref([])
    const startValue = ref(0)
    const endValue = ref(6)
    const auth = useAuthStore()

    async function saveCategories() {
      const token = auth.token
      const apiResult = await getCategories(token, auth.user.id)
      categories.value = apiResult
      console.log(apiResult)
      console.log(categories)
    }

    function saveNewCategory(data) {
      categories.value = [...categories.value, data]
    }

    function filterCategories() {
      filteredCategories.value = categories.value.slice(startValue.value, endValue.value)
    }

    return { categories, saveCategories, saveNewCategory, filterCategories, filteredCategories }
  },
  {
    persist: true,
  },
)
