import React from 'react'

export const Pages: {
  [key: string]: React.LazyExoticComponent<React.FC<object>>
} = {
  Login: React.lazy(() => import('@/pages/auth/Login')),
  Signup: React.lazy(() => import('@/pages/auth/Signup')),
  Home: React.lazy(() => import('@/pages/home')),
  EventDetails: React.lazy(() => import('@/pages/home/event-details')),
  // Authenticated
  Dashboard: React.lazy(() => import('@/pages/authenticated/Dashboard')),
  AdminEvents: React.lazy(() => import('@/pages/authenticated/AdminEvents')),
  AdminCreateEvent: React.lazy(
    () => import('@/pages/authenticated/AdminEvents/AdminCreateEvent')
  ),
  AdminEditEvent: React.lazy(
    () => import('@/pages/authenticated/AdminEvents/AdminEditEvent')
  ),
  AdminReservations: React.lazy(
    () => import('@/pages/authenticated/AdminReservations')
  ),
}
