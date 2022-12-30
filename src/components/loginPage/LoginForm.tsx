import React, { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material'
import { loginUserFx, setRememberMe } from '../../store/auth'
import { REGISTRATION_PAGE } from '../../utils/consts'
import { Link } from 'react-router-dom'
import { useStore } from 'effector-react'
import { useForm } from 'effector-forms'
import { loginForm } from '../../store/forms/forms'
import { $errorApi } from '../../store/alerts'
import { Visibility } from '@mui/icons-material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export const LoginForm = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [remember, setRemember] = useState<boolean>(true)

  const { fields, submit, eachValid, errorText } = useForm(loginForm)
  const pending = useStore(loginUserFx.pending)
  const apiError = useStore($errorApi)


  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    setRememberMe(remember)
    e.preventDefault()
    submit()
  }

  return (
    <Box component='form' onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
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
        InputProps={{
          endAdornment: (
            <InputAdornment position='start'>
              {showPassword ?
                <VisibilityOffIcon sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} /> :
                <Visibility sx={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)} />}
            </InputAdornment>
          ),
        }}
        margin='normal'
        type={showPassword ? 'text' : 'password'}
        id='password'
        label='Password'
        name='password'
        autoComplete='password'
        autoFocus
        fullWidth
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.currentTarget.value)}
      />
      {fields.password.errors.length > 0 &&
        <Alert variant='filled' severity='error'>{errorText('password')}</Alert>}

      <FormControlLabel
        control={<Checkbox value={remember} color='primary' />}
        onClick={() => {
          setRemember(!remember)
        }}
        label='Remember me'
      />
      {apiError && <Alert variant='filled' severity='warning'>{apiError}</Alert>}

      <Button
        type='submit'
        fullWidth
        disabled={!eachValid || pending}
        variant='contained'
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item>
          <Link to={REGISTRATION_PAGE}>
            {'Don\'t have an account? Sign Up'}
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

