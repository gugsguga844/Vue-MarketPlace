import { getAdresses } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore(
  'address',
  () => {
    const addresses = ref([])

    async function saveAddresses() {
      addresses.value = await getAdresses()
    }

    return { addresses, saveAddresses }
  },
  { persist: true },
)
