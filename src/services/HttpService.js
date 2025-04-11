import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: baseUrl,
})

/* Auth endpoints */
export async function login(payload) {
  try {
    const response = await api.post('/login', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function register(payload) {
  try {
    const response = await api.post('/register', payload)
    return response
  } catch (error) {
    console.log(error)
  }
}

export async function verifyToken(token) {
  try {
    const response = await api.get('/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error.response
  }
}

export async function renewToken(payload) {
  try {
    const response = await api.post('/renew-token', payload)
    return response
  } catch (error) {
    return error
  }
}

/* User endpoints */
export async function updateUser(payload, token) {
  try {
    const response = await api.put('/users/me', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteUser(token) {
  try {
    const response = await api.delete('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function uploadImage(payload, token) {
  try {
    const response = await api.put('/users/image', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    return error
  }
}

/* Address endpoints */
export async function getAdresses(token) {
  try {
    const response = await api.get('/addresses/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function createAddress(payload, token) {
  try {
    const response = await api.post('/addresses/', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteAddress(id, token) {
  try {
    const response = await api.delete(`/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

/* Category endpoints */
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
