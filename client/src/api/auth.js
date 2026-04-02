import api from './index'

export const registerUser = async (name, username, email, password) => {
  const response = await api.post('/auth/register', { name, username, email, password })
  return response.data
}

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}