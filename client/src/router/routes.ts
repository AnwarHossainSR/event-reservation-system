import * as RouteConsts from '@/constants/routeConsts'
import { RouteConfig } from '@/types/routeConfig'

export const AppRoutes: RouteConfig[] = [
  {
    path: RouteConsts.HomePath,
    page: RouteConsts.HomePage,
    protected: false,
  },
  {
    path: RouteConsts.ReservationDetailsPath,
    page: RouteConsts.ReservationDetailsPage,
    protected: false,
  },
  {
    path: RouteConsts.LoginPath,
    page: RouteConsts.LoginPage,
    protected: false,
  },
  {
    path: RouteConsts.SignupPath,
    page: RouteConsts.SignupPage,
    protected: false,
  },
  {
    path: RouteConsts.DashboardPath,
    page: RouteConsts.DashboardPage,
    protected: true,
  },
  {
    path: RouteConsts.AdminEventsPath,
    page: RouteConsts.AdminEventsPage,
    protected: true,
  },
  {
    path: RouteConsts.AdminCreateEventPath,
    page: RouteConsts.AdminCreateEventPage,
    protected: true,
  },
  {
    path: RouteConsts.AdminEditEventPath,
    page: RouteConsts.AdminEditEventPage,
    protected: true,
  },
  {
    path: RouteConsts.AdminReservationsPath,
    page: RouteConsts.AdminReservationsPage,
    protected: true,
  },
]
