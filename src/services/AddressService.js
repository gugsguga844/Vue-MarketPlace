import axios from 'axios'

const baseUrl = 'https://brasilapi.com.br/api/'
const baseUrl2 = 'https://countriesnow.space/api/v0.1/'

const api = axios.create({
  baseURL: baseUrl,
})

const api2 = axios.create({
  baseURL: baseUrl2,
})

export async function getCep(cep) {
  const response = await api.get(`/cep/v1/${cep}`)
  return response
}

export async function getCountry() {
  const response = await api2.get('/countries')
  return response
}
