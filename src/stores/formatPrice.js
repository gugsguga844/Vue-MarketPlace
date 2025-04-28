import { defineStore } from 'pinia'

export const useFormatPriceStore = defineStore('formatPrice', () => {
  function formatPrice(value) {
    if (typeof value !== 'number') {
      value = Number(value)
    }
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return { formatPrice }
})