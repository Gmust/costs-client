import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../Routes'
import { IRoutes } from '../models/routes.model'
import { LOGIN_PAGE } from '../utils/consts'

const AppRouter = () => {

  const isAuth = true

  return (
    <Routes>
      <>
        {isAuth && authRoutes.map(({ path, Component }: IRoutes) =>
          <Route key={path} path={path} element={<Component />} />)}
      </>

      <>
        {publicRoutes.map(({ path, Component }: IRoutes) => <Route key={path} path={path} element={<Component />} />)}
      </>

      <>
        <Route path='*' element={<Navigate to={LOGIN_PAGE} />} />
      </>
    </Routes>
  )
}

export default AppRouter