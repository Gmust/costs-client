import React, { useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import { createTheme, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import { Navbar } from './components/navbar/Navbar'
import { dark, light } from './utils/themePalettes'
import { useStore } from 'effector-react'
import { $isAuth, setIsAuth } from './store/auth'
import { useNavigate } from 'react-router-dom'
import { COSTS_PAGE, LOGIN_PAGE } from './utils/consts'
import { $errorApi, $snackbar, $successAlert, setApiError, setSnackbar, setSuccessAlert } from './store/alerts'


const App = () => {

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  const isAuth = useStore($isAuth)
  const errorApi = useStore($errorApi)
  const snackbar = useStore($snackbar)
  const successAlert = useStore($successAlert)
  const navigate = useNavigate()


  useEffect(() => {
    isAuth ? navigate(COSTS_PAGE) : navigate(LOGIN_PAGE)
    errorApi ? setTimeout(() => {
      setApiError('')
    }, 5000) : null
    successAlert ? setTimeout(() => {
      setSuccessAlert('')
    }, 5000) : null
    snackbar ? setTimeout(() => {
      setSnackbar('')
    }, 5000) : null
  }, [isAuth, errorApi, successAlert, snackbar])

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return (
    <ThemeProvider theme={
      //@ts-ignore
      isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar changeTheme={changeTheme} isDarkTheme={isDarkTheme} />
      <AppRouter />
      <Snackbar
        open={snackbar.length > 0}
        autoHideDuration={5000}
        message={snackbar}
      />
    </ThemeProvider>
  )
}

export default App