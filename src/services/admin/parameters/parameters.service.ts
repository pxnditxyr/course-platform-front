import { api } from '../../../api'
import { IParameter, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateParameters {
  name: string
  details: string
}

export class ParametersService {
  static findAll = async () : Promise<IParameter[] | IServiceError> => {
    try {
      const { data } = await api.get( '/parameters' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<IParameter | IServiceError> => {
    try {
      const { data } = await api.get( `/parameters/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByName = async ( name : string ) : Promise<IParameter | IServiceError> => {
    try {
      const { data } = await api.get( `/parameters/name/${ name }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateParameters ) : Promise<IParameter | IServiceError> => {
    try {
      const { data } = await api.post( '/parameters', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateParameters ) : Promise<IParameter | IServiceError> => {
    try {
      const { data } = await api.patch( `/parameters/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IParameter | IServiceError> => {
    try {
      const { data } = await api.delete( `/parameters/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
