import React, {useEffect, useState} from 'react'
import AppRouter from './components/AppRouter'
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material'
import {Navbar} from './components/navbar/Navbar'
import {dark, light} from './utils/themePalettes'
import {useStore} from 'effector-react'
import {$isAuth, setIsAuth} from './store/auth'
import {useNavigate} from 'react-router-dom'
import {COSTS_PAGE, LOGIN_PAGE} from './utils/consts'
import {$errorApi, setApiError} from './store/alerts'


const App = () => {

    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
    const isAuth = useStore($isAuth)
    const errorApi = useStore($errorApi)
    const navigate = useNavigate()


    useEffect(() => {
        isAuth && navigate(COSTS_PAGE)
        !isAuth && navigate(LOGIN_PAGE)
        errorApi ? setTimeout(() => {
            setApiError('')
        }, 5000) : null
    }, [isAuth, errorApi])

    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme)
    }

    return (
        <ThemeProvider theme={
            //@ts-ignore
            isDarkTheme ? createTheme(dark) : createTheme(light)}>
            <CssBaseline/>
            <Navbar changeTheme={changeTheme} isDarkTheme={isDarkTheme}/>
            <AppRouter/>
        </ThemeProvider>
    )
}

export default App