import { AxiosError } from 'axios'

export const formatApiErrors = ( error : any ) : string => {
  if ( error  instanceof AxiosError ) {
    if ( typeof error.response?.data === 'string' ) return error.response?.data
    if ( typeof error.response?.data.message === 'string' ) return error.response?.data.message
    if ( typeof error.response?.data.error === 'string' ) return error.response?.data.error
    const message = error.response?.data.message
    const joinedMessage = message.join( ', ' )
    return joinedMessage
  }
  console.error( error )
  return 'Ups, Algo salio mal'
}
