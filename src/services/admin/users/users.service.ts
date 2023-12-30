import { api } from '../../../api'
import { IUser, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateUsers {
  email: string
  name: string
  paternalSurname: string
  maternalSurname: string
  role: string
  password: string
}

export class UsersService {
  static findAll = async () : Promise<IUser[] | IServiceError> => {
    try {
      const { data } = await api.get( '/users' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IUser | IServiceError> => {
    try {
      const { data } = await api.get( `/users/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateUsers ) : Promise<IUser | IServiceError> => {
    try {
      const { data } = await api.post( '/users', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateUsers ) : Promise<IUser | IServiceError> => {
    try {
      const { data } = await api.patch( `/users/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IUser | IServiceError> => {
    try {
      const { data } = await api.delete( `/users/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
