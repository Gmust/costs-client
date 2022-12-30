import { $unAuthHost } from './index'
import { setApiError, setSuccessAlert } from '../store/alerts'
import { $rememberMe, setIsAuth } from '../store/auth'


export class AuthClient {
  static async login(username: string, password: string) {
    try {
      const rememberMe = $rememberMe.getState()
      const result = await $unAuthHost.post('/auth/login', { username, password })
      localStorage.setItem('token', result.data.access_token)
      localStorage.setItem('username', result.data.username)
      console.log(rememberMe)
      rememberMe ? localStorage.setItem('refresh_token', result.data.refresh_token) : null
      console.log(result.data.refresh_token)
      setIsAuth(true)
      return result.data
    } catch (e: any) {
      return setApiError(e?.response.data.message)
    }
  }

  static async registration(username: string, password: string) {
    try {
      const result = await $unAuthHost.post('/auth/registration', { username, password })
      setSuccessAlert(result.data)
      return result.status === 201
    } catch (e: any) {
      return setApiError(e?.response.data.message)
    }
  }

  static async refresh(refresh_token: string | null, username: string | null) {
    try {
      const result = await $unAuthHost.post('/auth/refresh', { refresh_token, username })
      localStorage.setItem('token', result.data.access_token)
      setIsAuth(true)
    } catch (e) {
      console.log(e)
    }
  }
}