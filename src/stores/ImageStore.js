import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', () => {
  function imageURL(path) {
    const apiURL = import.meta.env.VITE_API_URL
    return `${apiURL}${path}`
  }

  return { imageURL }
})