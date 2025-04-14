import { getCountry } from '@/services/AddressService'
import { getAdresses } from '@/services/HttpService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore(
  'address',
  () => {
    const address = ref({})
    const addresses = ref([])
    const countries = ref([])

    async function saveAddress(addressData) {
      address.value = addressData
    }

    async function saveAddresses(token) {
      const response = await getAdresses(token)
      addresses.value = response.data
    }

    async function removeArrayAddress(address_id) {
      addresses.value = addresses.value.filter((address) => address.id !== address_id)
    }

    async function saveCountries() {
      const response = await getCountry()
      countries.value = response.data.data.map(item => item.country)
    }

    return { addresses, address, saveAddress,saveAddresses, removeArrayAddress, countries, saveCountries }
  },
  { persist: true },
)
