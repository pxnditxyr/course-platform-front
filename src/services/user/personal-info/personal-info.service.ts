import { api } from '../../../api'
import { IPersonalInfo, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreatePersonalInfo {
  nationality: string
  genderId: string
  ciExtensionId: string
  birthDate: string
  userId: string
}

export class PersonalInfoService {
  static findAll = async () : Promise<IPersonalInfo[] | IServiceError> => {
    try {
      const { data } = await api.get( '/personal-info' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IPersonalInfo | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/personal-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IPersonalInfo | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/personal-info/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreatePersonalInfo ) : Promise<IPersonalInfo | IServiceError> => {
    try {
      const response = await api.post( '/personal-info', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreatePersonalInfo ) : Promise<IPersonalInfo | IServiceError> => {
    try {
      const { data } = await api.patch( `/personal-info/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IPersonalInfo | IServiceError> => {
    try {
      const { data } = await api.delete( `/personal-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
