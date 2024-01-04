import { api } from '../../../api'
import { IProgramDetail, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateProgramDetails {
  paymentMethodId: string
  registrationConditionId: string
  howToFindOutId: string
  userId: string
}

export class ProgramDetailsService {
  static findAll = async () : Promise<IProgramDetail[] | IServiceError> => {
    try {
      const { data } = await api.get( '/program-details' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
   }
  }

  static findOne = async ( id : string ) : Promise<IProgramDetail | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/program-details/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IProgramDetail | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/program-details/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateProgramDetails ) : Promise<IProgramDetail | IServiceError> => {
    try {
      const response = await api.post( '/program-details', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateProgramDetails ) : Promise<IProgramDetail | IServiceError> => {
    try {
      const { data } = await api.patch( `/program-details/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IProgramDetail | IServiceError> => {
    try {
      const { data } = await api.delete( `/program-details/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
