import { api } from '../../../api'
import { IContactInfo, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateContactInfo {
  phone: string
  landline: string
  department: string
  address: string
  city: string
  userId: string
}

export class ContactInfoService {
  static findAll = async () : Promise<IContactInfo[] | IServiceError> => {
    try {
      const { data } = await api.get( '/contact-info' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IContactInfo | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/contact-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IContactInfo | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/contact-info/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateContactInfo ) : Promise<IContactInfo | IServiceError> => {
    try {
      const response = await api.post( '/contact-info', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateContactInfo ) : Promise<IContactInfo | IServiceError> => {
    try {
      const { data } = await api.patch( `/contact-info/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IContactInfo | IServiceError> => {
    try {
      const { data } = await api.delete( `/contact-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
