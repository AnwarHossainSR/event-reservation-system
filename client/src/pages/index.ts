import React from 'react'

export const Pages: {
  [key: string]: React.LazyExoticComponent<React.FC<object>>
} = {
  Login: React.lazy(() => import('@/pages/auth/Login')),
  Signup: React.lazy(() => import('@/pages/auth/Signup')),
  Home: React.lazy(() => import('@/pages/home')),
  ReservationDetails: React.lazy(
    () => import('@/pages/reservations/reservation-details')
  ),
}
