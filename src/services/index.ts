import axios from 'axios'


const $unAuthHost = axios.create({
  baseURL: 'http://localhost:8080',
})


const $authHost = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

const authInterceptors = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptors)

$authHost.interceptors.response.use((config) => {
  return config
}, async (error) => {

  const originalRequest = error.config
  const refresh_token = localStorage.getItem('refresh_token')
  const username = localStorage.getItem('username')

  if (error.response.status === 401) {
    try {
      const response = await $unAuthHost.post('/auth/refresh', {refresh_token, username})
      localStorage.setItem('token', response.data.access_token)
      return $authHost.request(originalRequest)
    }catch (e:any){
      console.log('Unauthorized')
    }
  }
})


export {
  $authHost,
  $unAuthHost,
}