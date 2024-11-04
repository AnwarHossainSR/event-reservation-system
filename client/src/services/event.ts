/* eslint-disable no-useless-catch */
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { api } from '@/lib/apiConfig'
import { Event } from '@/types/event'

// Create a new event
export const createEvent = async (eventData: Omit<Event, any>) => {
  try {
    const response = await api.post(API_ENDPOINTS.EVENT.CREATE, eventData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    return response?.data
  } catch (error) {
    throw error
  }
}

// Update an existing event
export const updateEvent = async (
  eventId: string,
  eventData: Partial<Event>
) => {
  try {
    const response = await api.put(
      `${API_ENDPOINTS.EVENT.UPDATE}/${eventId}`,
      eventData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )
    return response?.data
  } catch (error) {
    throw error
  }
}

// Delete an event
export const deleteEvent = async (eventId: string) => {
  try {
    const response = await api.delete(
      `${API_ENDPOINTS.EVENT.DELETE}/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )
    return response?.data
  } catch (error) {
    throw error
  }
}

// Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.EVENT.GET_ALL)
    return response?.data
  } catch (error) {
    throw error
  }
}

// Fetch a specific event
export const fetchEventById = async (eventId: string) => {
  try {
    const response = await api.get(
      `${API_ENDPOINTS.EVENT.GET_BY_ID}/${eventId}`
    )
    return response?.data
  } catch (error) {
    throw error
  }
}

export const eventService = {
  createEvent,
  updateEvent,
  deleteEvent,
  fetchEvents,
  fetchEventById,
}
