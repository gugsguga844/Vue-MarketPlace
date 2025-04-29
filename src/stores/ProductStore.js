import { getProducts } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getProduct } from '../services/HttpService'

export const useProductStore = defineStore(
  'product',
  () => {
    const products = ref([])
    const filteredProducts = ref([])
    const adminProductsList = ref([])
    const startValue = ref(0)
    const endValue = ref(8)
    const product = ref({})

    async function saveProducts() {
      const apiResult = await getProducts()
      products.value = apiResult
      console.log(apiResult)
      console.log(products)
    }

    async function saveProduct(product_id) {
      const result = await getProduct(product_id)
      product.value = result
    }

    function saveNewProduct(product) {
      products.value = [...products.value, product]
    }

    function filterProducts() {
      filteredProducts.value = products.value.slice(startValue.value, endValue.value)
    }

    function filterAdminProducts() {
      adminProductsList.value = products.value.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: product.category.name
      }))
    }

    return {
      products,
      saveProducts,
      saveNewProduct,
      filterProducts,
      filteredProducts,
      filterAdminProducts,
      adminProductsList,
      product,
      saveProduct
    }
  },
  {
    persist: true,
  },
)
