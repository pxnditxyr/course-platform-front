import { api } from '../../../api'
import { IDocument, IServiceError } from '../../../interfaces'
import { formatApiErrors } from '../../../utils'

export interface ICreateDocument {
  url: string
  documentTypeId: string
  userId: string
}

export class DocumentService {
  static findAll = async () : Promise<IDocument[] | IServiceError> => {
    try {
      const { data } = await api.get( '/documents' )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
   }
  }

  static findOne = async ( id : string ) : Promise<IDocument | IServiceError> => {
    if ( !id ) return { error: 'No id provided' }
    try {
      const { data } = await api.get( `/documents/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static findOneByUserId = async ( userId : string ) : Promise<IDocument | IServiceError> => {
    if ( !userId ) return { error: 'No userId provided' }
    try {
      const { data } = await api.get( `/documents/user/${ userId }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static create = async ( createDto : ICreateDocument ) : Promise<IDocument | IServiceError> => {
    try {
      const response = await api.post( '/documents', createDto )
      console.log( response )
      return response.data
    } catch ( error ) {
      console.log({ error })
      return { error: formatApiErrors( error ) }
    }
  }
  
  static update = async ( id : string, updateDto : ICreateDocument ) : Promise<IDocument | IServiceError> => {
    try {
      const { data } = await api.patch( `/documents/${ id }`, updateDto )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }

  static toggleStatus = async ( id : string ) : Promise<IDocument | IServiceError> => {
    try {
      const { data } = await api.delete( `/documents/${ id }` )
      return data
    } catch ( error ) {
      return { error: formatApiErrors( error ) }
    }
  }
}
