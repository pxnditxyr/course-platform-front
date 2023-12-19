import { api } from '../../api'
import { IAuthResponse, IServiceError } from '../../interfaces'
import { formatApiErrors } from '../../utils'

export interface ISigninParams {
  email: string
  password: string
}

export interface ISignupParams {
  email: string
  password: string
  name: string
  paternalSurname: string
  maternalSurname: string
}

export class AuthService {
  static signin = async ( signinParams : ISigninParams ) : Promise<IAuthResponse | IServiceError> => {
    try {
      const { data } = await api.post( '/auth/signin', signinParams )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static signup = async ( signupParams : ISignupParams ) : Promise<IAuthResponse | IServiceError> => {
    try {
      const { data } = await api.post( '/auth/signup', signupParams )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static checkAuthStatus = async () : Promise<IAuthResponse | IServiceError> => {
    try {
      const { data } = await api.get( '/auth/revalidate-token' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
