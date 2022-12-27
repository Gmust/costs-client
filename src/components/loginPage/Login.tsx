import React from 'react'
import {Avatar, Box, Container, LinearProgress, Typography} from '@mui/material'
import {LockClockOutlined} from '@mui/icons-material'
import {LoginForm} from './LoginForm'
import {useStore} from 'effector-react'
import {loginUserFx} from '../../store/auth'


export const Login = () => {

  const pending = useStore(loginUserFx.pending)

  return (
    <Container component='main' maxWidth='xs'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 10,
      }}>
        <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
          <LockClockOutlined />
        </Avatar>
        <Typography variant='h6'>
          Sign In
        </Typography>
        <LoginForm />
        <Box sx={{width: '100%', mt: 2}}>
          {pending && <LinearProgress />}
        </Box>
      </Box>
    </Container>
  )
}

