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

export async function getAddress(id, token) {
  try {
    const response = await api.get(`/addresses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function updateAddress(id, payload, token) {
  try {
    const response = await api.put(`/addresses/${id}`, payload, {
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
    const response = await api.get('/categories/user/4')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar itens: ', error)
    throw error
  }
}

export async function createCategory(payload, token) {
  try {
    const response = await api.post('/categories', payload, {
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

export async function getCategory(category_id, token) {
  try {
    const response = await api.get(`/categories/${category_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function updateCategory(category_id, payload, token) {
  try {
    const response = await api.put(`/categories/${category_id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteCategory(id, token) {
  try {
    const response = await api.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

/* Product endpoints */
export async function getProducts() {
  try {
    const response = await api.get('/products/user/4')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar itens: ', error)
    throw error
  }
}

export async function createProduct(payload, token) {
  try {
    const response = await api.post('/products', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    return response
  } catch (error) {
    return error
  }
}

export async function getProduct(product_id) {
  try {
    const response = await api.get(`/products/${product_id}`)
    return response.data
  } catch (error) {
    return error
  }
}

/* Cart endpoints */
export async function getCart(token) {
  try {
    const response = await api.get('/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function createCart(token) {
  try {
    const response = await api.post('/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function getCartItems(token) {
  try {
    const response = await api.get('/cart/items', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    return error
  }
}

export async function addCartItem(token, payload) {
  try {
    const response = await api.post('/cart/items', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function updateQuantity(token, payload) {
  try {
    const response = await api.put('/cart/items', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

export async function deleteCartItem(token, product_id) {
  try {
    const response = await api.delete('/cart/items', {
      data: {
        product_id
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    return error
  }
}

