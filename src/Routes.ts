import { COSTS_PAGE, LOGIN_PAGE, REGISTRATION_PAGE } from './utils/consts'
import { CostsPage, LoginPage, RegistrationPage } from './pages'
import { IRoutes } from './models/routes.model'

export const authRoutes: IRoutes[] = [
  {
    path: COSTS_PAGE,
    Component: CostsPage,
  },
]


export const publicRoutes: IRoutes[] = [
  {
    path: LOGIN_PAGE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_PAGE,
    Component: RegistrationPage,
  },
]