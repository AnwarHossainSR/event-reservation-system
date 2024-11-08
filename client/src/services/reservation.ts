/* eslint-disable no-useless-catch */
import { api } from '@/lib/apiConfig'

import { API_ENDPOINTS } from '@/config/api-endpoints'

const getReservations = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.RESERVATION.GET_ALL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    return response?.data?.data
  } catch (error) {
    throw error
  }
}

const createReservation = async (data: any) => {
  try {
    const response = await api.post(API_ENDPOINTS.RESERVATION.CREATE, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

export const reservationService = {
  getReservations,
  createReservation,
}
