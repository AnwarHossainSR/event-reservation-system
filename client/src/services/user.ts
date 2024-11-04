/* eslint-disable no-useless-catch */
import { api } from '@/lib/apiConfig'

import { API_ENDPOINTS } from '@/config/api-endpoints'

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
      name,
      email,
      password,
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

const getMyInfo = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.AUTH.GET_MY_INFO, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    return response?.data?.data
  } catch (error) {
    throw error
  }
}

export const userService = {
  login,
  register,
  getMyInfo,
}
