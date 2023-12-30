import { api } from '../../../api'
import { ICourse, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateCourses {
  name: string
  details: string
  imageUrl?: string
  categoryId: string
  city: string
  version: string
  startDate: string
  endDate: string
}

export class CoursesService {
  static findAll = async () : Promise<ICourse[] | IServiceError> => {
    try {
      const { data } = await api.get( '/courses' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOne = async ( id : string ) : Promise<ICourse | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/courses/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateCourses ) : Promise<ICourse | IServiceError> => {
    try {
      const response = await api.post( '/courses', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateCourses ) : Promise<ICourse | IServiceError> => {
    try {
      const { data } = await api.patch( `/courses/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<ICourse | IServiceError> => {
    try {
      const { data } = await api.delete( `/courses/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
