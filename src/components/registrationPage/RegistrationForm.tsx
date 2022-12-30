import React, { useEffect } from 'react'
import { Alert, Box, Button, Grid, TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import { LOGIN_PAGE } from '../../utils/consts'
import { useForm } from 'effector-forms'
import { registerForm } from '../../store/forms/forms'
import { useStore } from 'effector-react'
import { registerUserFx } from '../../store/auth'
import { $errorApi, $successAlert } from '../../store/alerts'

export const RegistrationForm = () => {

  const { fields, submit, eachValid, errorText, reset } = useForm(registerForm)
  const pending = useStore(registerUserFx.pending)
  const apiError = useStore($errorApi)
  const successAlert = useStore($successAlert)

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    submit()
  }

  useEffect(() => {
    successAlert && reset()
  }, [successAlert])

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        error={fields.username.isTouched && fields.username.value.length == 0}
        fullWidth
        id='username'
        label='Username'
        name='username'
        autoFocus
        value={fields.username.value}
        onChange={(e) => fields.username.onChange(e.target.value)}
      />
      {fields.username.errors.length > 0 &&
        <Alert variant='filled' severity='error'>{errorText('username')}</Alert>}

      <TextField
        margin='normal'
        error={fields.password.isTouched && fields.password.value.length == 0}
        fullWidth
        id='password'
        label='Password'
        type='password'
        name='password'
        autoFocus
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
      />
      {fields.password.errors.length > 0 &&
        <Alert variant='filled' severity='error'>{errorText('password')}</Alert>}

      <TextField
        margin='normal'
        error={fields.confirmation.isTouched && fields.confirmation.value.length == 0}
        fullWidth
        id='confirmation'
        label='Confirm password'
        name='confirmation'
        type='password'
        autoFocus
        value={fields.confirmation.value}
        onChange={(e) => fields.confirmation.onChange(e.currentTarget.value)}
      />
      {fields.confirmation.errors.length > 0 &&
        <Alert variant='filled' severity='error'>{errorText('confirmation')}</Alert>}

      {apiError && <Alert variant='filled' severity='warning'>{apiError}</Alert>}
      {successAlert && <Alert variant='filled' severity='success'>{successAlert}</Alert>}

      <Button
        type='submit'
        fullWidth
        disabled={!eachValid || pending}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Grid container>
        <Grid item>
          <Link to={LOGIN_PAGE}>
            {'Already have an account? Sign In'}
          </Link>
        </Grid>
      </Grid>

    </Box>
  )
}

