import FullPageLoader from '@/components/Common/FullPageLoader'
import * as RouteConsts from '@/constants/routeConsts'
import { useAuth } from '@/context/AuthContext'
import AdminLayout from '@/layout/AdminLayout'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <FullPageLoader />
  }

  if (!user) {
    return <Navigate to={RouteConsts.LoginPath} />
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
