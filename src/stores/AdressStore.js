import { getAdresses } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore(
  'address',
  () => {
    const addresses = ref([])

    async function saveAddresses(token) {
      const response = await getAdresses(token)
      addresses.value = response.data
    }

    return { addresses, saveAddresses }
  },
  { persist: true },
)
