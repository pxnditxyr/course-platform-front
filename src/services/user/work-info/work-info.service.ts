import { api } from '../../../api'
import { IWorkInfo, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateWorkInfo {
  profession: string
  institutionTitle: string
  jobAddress: string
  position: string
  professionLevelId: string
  userId: string
}

export class WorkInfoService {
  static findAll = async () : Promise<IWorkInfo[] | IServiceError> => {
    try {
      const { data } = await api.get( '/working-info' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
   }
  }

  static findOne = async ( id : string ) : Promise<IWorkInfo | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/working-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IWorkInfo | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/working-info/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateWorkInfo ) : Promise<IWorkInfo | IServiceError> => {
    try {
      const response = await api.post( '/working-info', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateWorkInfo ) : Promise<IWorkInfo | IServiceError> => {
    try {
      const { data } = await api.patch( `/working-info/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IWorkInfo | IServiceError> => {
    try {
      const { data } = await api.delete( `/working-info/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
