import FullPageLoader from '@/components/Common/FullPageLoader'
import { LoginPath } from '@/constants/routeConsts'
import DefaultLayout from '@/layout/DefaultLayout'
import { Pages } from '@/pages'
import { ProtectedRoute } from '@/router/protectedRoutes'
import { AppRoutes } from '@/router/routes'
import { RouteConfig } from '@/types/routeConfig'
import React from 'react'
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

const RouterConfig = () => {
  return (
    <Router>
      <React.Suspense fallback={<FullPageLoader />}>
        <Routes>
          {AppRoutes.map((route: RouteConfig) => {
            const Component = Pages[route.page]
            if (route.protected) {
              return (
                <Route key={`${route.page}`} element={<ProtectedRoute />}>
                  <Route path={route.path} element={<Component />} />
                </Route>
              )
            }
            return (
              <Route
                key={`${route.page}`}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Component />
                  </DefaultLayout>
                }
              />
            )
          })}
          {/* Default route that redirects to /login */}
          <Route path="/" element={<Navigate to={LoginPath} />} />
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to={LoginPath} />} />
        </Routes>
      </React.Suspense>
    </Router>
  )
}

export default RouterConfig
