import { api } from '../../../api'
import { ISubparameter, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateSubparameters {
  name: string
  details: string
  parameterId: string
}

export class SubparametersService {
  static findAll = async () : Promise<ISubparameter[] | IServiceError> => {
    try {
      const { data } = await api.get( '/subparameters' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ISubparameter | IServiceError> => {
    try {
      const { data } = await api.get( `/subparameters/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByName = async ( name : string ) : Promise<ISubparameter | IServiceError> => {
    try {
      const { data } = await api.get( `/subparameters/name/${ name }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateSubparameters ) : Promise<ISubparameter | IServiceError> => {
    try {
      const { data } = await api.post( '/subparameters', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateSubparameters ) : Promise<ISubparameter | IServiceError> => {
    try {
      const { data } = await api.patch( `/subparameters/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<ISubparameter | IServiceError> => {
    try {
      const { data } = await api.delete( `/subparameters/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
