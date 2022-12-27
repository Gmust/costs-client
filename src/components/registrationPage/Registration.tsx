import React from 'react'
import {Avatar, Box, Container, LinearProgress, Typography} from '@mui/material'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import {RegistrationForm} from './RegistrationForm'
import {useStore} from 'effector-react'
import {registerUserFx} from '../../store/auth'


export const Registration = () => {

  const pending = useStore(registerUserFx.pending)


  return (
    <Container component='main' maxWidth='xs'>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 10,
      }}>
        <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography variant='h6'>
          Sign Up
        </Typography>
        <RegistrationForm />
        <Box sx={{width: '100%', mt: 2}}>
          {pending && <LinearProgress />}
        </Box>
      </Box>
    </Container>
  )


}

