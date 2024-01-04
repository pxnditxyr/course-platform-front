import { api } from '../../../api'
import { IBilling, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateBilling {
  nit: string
  reason: string
  userId: string
}

export class BillingService {
  static findAll = async () : Promise<IBilling[] | IServiceError> => {
    try {
      const { data } = await api.get( '/billings' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
   }
  }

  static findOne = async ( id : string ) : Promise<IBilling | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/billings/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IBilling | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/billings/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateBilling ) : Promise<IBilling | IServiceError> => {
    try {
      const { data } = await api.post( '/billings', createDto )
      return data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateBilling ) : Promise<IBilling | IServiceError> => {
    try {
      const { data } = await api.patch( `/billings/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IBilling | IServiceError> => {
    try {
      const { data } = await api.delete( `/billings/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
