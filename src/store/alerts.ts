import {createDomain} from 'effector'


const alerts = createDomain()

export const setApiError = alerts.createEvent<string>()
export const setCostsError = alerts.createEvent<string>()

export const $errorApi = alerts.createStore<string>('')
  .on(setApiError, (_, error: string) => error)


export const $errorCosts = alerts.createStore<string>('')
  .on(setCostsError, (_, error: string) => error)