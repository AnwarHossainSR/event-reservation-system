'use client'

import axios from 'axios'

const apiConfig = {
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}

export const api = axios.create(apiConfig)
