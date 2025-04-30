import { getCoupons } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useCouponStore = defineStore(
  'coupon',
  () => {
    const coupons = ref([])
    const coupon = ref({})
    const auth = useAuthStore()

    async function saveCoupons() {
      const apiResult = await getCoupons(auth.token)
      coupons.value = apiResult
    }

    function saveNewCoupon(couponData) {
      coupons.value = [...coupons.value, couponData]
    }

    function saveCoupon(couponData) {
      coupon.value = couponData
    }

    function updateCouponInStore(updatedCoupon) {
      coupons.value = coupons.value.map(coupon =>
        coupon.id === updatedCoupon.id ? { ...coupon, ...updatedCoupon } : coupon
      )
    }

    function removeCoupon(coupon_id) {
      coupons.value = coupons.value.filter(coupon => coupon.id !== coupon_id)
    }

    return {
      coupons,
      coupon,
      saveCoupons,
      saveCoupon,
      saveNewCoupon,
      updateCouponInStore,
      removeCoupon,
    }
  },
  {
    persist: true,
  },
)
