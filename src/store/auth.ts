import { createDomain, guard, restore, sample } from 'effector'
import { AuthClient } from '../services/authApi'
import { TAuthData, Tokens } from '../models/api.model'
import { setApiError } from './alerts'


const auth = createDomain()


export const loginUserFx = auth.createEffect({
  handler: async ({ username, password }: TAuthData) => {
    return await AuthClient.login(username, password)
  },
})

export const registerUserFx = auth.createEffect({
  handler: async ({ username, password }: TAuthData) => {
    return await AuthClient.registration(username, password)
  },
})

export const setIsAuth = auth.createEvent<boolean>()
export const setUsername = auth.createEvent<string>()
export const setRememberMe = auth.createEvent<boolean>()


export const $username = auth.createStore<string>('')
  .on(loginUserFx.doneData, (_, data) => data.username)

export const $rememberMe = auth.createStore(false)
  .on(setRememberMe, (_, value) => value)


export const $isAuth = auth.createStore<boolean>(false)
  .on(loginUserFx.failData, (_, value) => {
    setIsAuth(false)
    setApiError(value as unknown as string)
  })
  .on(setIsAuth, (_, value) => value)


