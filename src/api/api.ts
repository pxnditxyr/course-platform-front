import axios from 'axios'
import { useAuthStore } from '../stores'

const api = axios.create({
  baseURL: 'http://localhost:3005/api' //TODO: change this to .env
})

api.interceptors.request.use(
  ( config ) => {
    const token = useAuthStore.getState().token
    if ( token ) config.headers[ 'Authorization' ] = `Bearer ${ token }`
    return config
  }
)

export { api }

