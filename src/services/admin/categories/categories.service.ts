import { api } from '../../../api'
import { ICategory, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateCategories {
  name: string
  details: string
  imageUrl?: string
}

export class CategoriesService {
  static findAll = async () : Promise<ICategory[] | IServiceError> => {
    try {
      const { data } = await api.get( '/categories' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await api.get( `/categories/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByName = async ( name : string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await api.get( `/categories/name/${ name }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateCategories ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await api.post( '/categories', createDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateCategories ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await api.patch( `/categories/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<ICategory | IServiceError> => {
    try {
      const { data } = await api.delete( `/categories/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
