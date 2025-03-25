import { getProducts } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const filteredProducts = ref([])
  const startValue = ref(0)
  const endValue = ref(8)

  async function saveProducts() {
    const apiResult = await getProducts()
    products.value = apiResult
    console.log(apiResult)
    console.log(products)
  }

  function filterProducts() {
    filteredProducts.value = products.value.slice(startValue.value, endValue.value)
  }

  return { saveProducts, products, filterProducts, filteredProducts }
})
