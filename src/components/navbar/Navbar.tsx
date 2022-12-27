import React, { useEffect } from 'react'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useStore } from 'effector-react'
import { $isAuth, setIsAuth } from '../../store/auth'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PAGE } from '../../utils/consts'


type TNavbarProps = {
  changeTheme: () => void,
  isDarkTheme: boolean
}

export const Navbar = ({ changeTheme, isDarkTheme }: TNavbarProps) => {

  const username = localStorage.getItem('username')

  const isAuth = useStore($isAuth)
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1, flex: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' sx={{ mr: 5, transition: '200ms' }} onClick={() => changeTheme()}>
            {!isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Costs
          </Typography>

          {isAuth &&
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Welcome {username}!
            </Typography>
          }
          <Button sx={{ fontSize: 18, mr: 4, alignContent: 'flex-end' }} color='inherit'
                  onClick={isAuth ? () => {
                    localStorage.clear()
                    setIsAuth(false)
                    navigate(LOGIN_PAGE)
                  } : () => navigate(LOGIN_PAGE)}
          >
            {isAuth ? ('Quit') : ('Login')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

