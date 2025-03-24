import { getProducts } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([])

  async function saveProducts() {
    const apiResult = await getProducts()
    products.value = apiResult
    console.log(apiResult)
    console.log(products)
  }

  return { saveProducts, products }
})
