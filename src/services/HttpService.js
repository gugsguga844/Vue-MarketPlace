import axios from 'axios'

const baseUrl = 'http://34.138.111.33:8000/'

const api = axios.create({
  baseURL: baseUrl,
})

export async function getCategories() {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar itens: ', error)
    throw error
  }
}

export async function getProducts() {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar itens: ', error)
    throw error
  }
}
