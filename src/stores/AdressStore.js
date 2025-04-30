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
    const mainAddress = ref({})
    const orderAddress = ref({})

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

    function saveMainAddress(address_id) {
      mainAddress.value = addresses.value.find(address => address.id === address_id)
      console.log('Endereço padrão: ', mainAddress.value)
    }

    function checkMainAddress(address_id) {
      return mainAddress.value.id === address_id
    }

    function selectedAddress(address_id) {
      orderAddress.value = addresses.value.find(address => address.id === address_id)
    }

    function clearAddresses() {
      addresses.value = []
      mainAddress.value = {}
      orderAddress.value = {}
    }

    return {
      addresses,
      address,
      saveMainAddress,
      mainAddress,
      checkMainAddress,
      saveAddress,
      saveAddresses,
      removeArrayAddress,
      countries,
      saveCountries,
      selectedAddress,
      orderAddress
    }
  },
  { persist: true },
)
