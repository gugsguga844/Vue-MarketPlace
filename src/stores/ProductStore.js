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
    const endValue = ref(16)
    const product = ref({})
    const requestedProduct = ref({})
    const productsWithDiscount = ref([])

    async function saveProducts() {
      const apiResult = await getProducts()
      products.value = apiResult
      console.log(apiResult)
      console.log('Produtos: ', products)
    }

    async function saveProduct(product_id) {
      const result = await getProduct(product_id)
      product.value = result
    }

    async function saveRequestedProduct(productData) {
      requestedProduct.value = productData
    }

    function saveNewProduct(product) {
      products.value = [...products.value, product]
    }

    function saveUpdatedProduct(product_id) {
      products.value = products.value.map(product => product.id === product_id ? {...product, ...requestedProduct} : product)
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
        category: product.category.name,
        discount: product.discounts.length > 0 ? product.discounts[0].discount_percentage : 0
      }))
    }

    function filterProductsByDiscount() {
      productsWithDiscount.value = products.value.filter(product => product.discounts.length > 0)
    }

    return {
      products,
      productsWithDiscount,
      saveProducts,
      saveNewProduct,
      saveUpdatedProduct,
      filterProducts,
      filteredProducts,
      filterAdminProducts,
      adminProductsList,
      product,
      saveProduct,
      saveRequestedProduct,
      requestedProduct,
      filterProductsByDiscount
    }
  },
  {
    persist: true,
  },
)
