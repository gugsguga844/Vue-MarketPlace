import { getDiscounts } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useDiscountStore = defineStore(
  'discount',
  () => {
    const discounts = ref([])
    const discount = ref({})
    const auth = useAuthStore()

    async function saveDiscounts() {
      const apiResult = await getDiscounts(auth.token)
      discounts.value = apiResult
    }

    function saveNewDiscount(discountData) {
      discounts.value = [...discounts.value, discountData]
    }

    function saveDiscount(discountData) {
      discount.value = discountData
    }

    function updateDiscountInStore(updatedDiscount) {
      discounts.value = discounts.value.map(discount =>
        discount.id === updatedDiscount.id ? { ...discount, ...updatedDiscount } : discount
      )
    }

    function removeDiscount(discount_id) {
      discounts.value = discounts.value.filter(discount => discount.id !== discount_id)
    }

    return {
      discounts,
      discount,
      saveDiscounts,
      saveDiscount,
      saveNewDiscount,
      updateDiscountInStore,
      removeDiscount,
    }
  },
  {
    persist: true,
  },
)
