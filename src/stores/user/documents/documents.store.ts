import { StateCreator, create } from 'zustand'
import { IDocument } from '../../../interfaces'
import { ICreateDocument, DocumentService } from '../../../services'

export interface IDocumentState {
  documents: IDocument[]
  document?: IDocument
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreateDocument ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreateDocument ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const DocumentStore : StateCreator<IDocumentState> = ( set, get ) => ({
  documents: [],
  document:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const documents = await DocumentService.findAll()
    if ( 'error' in documents ) set({ error: documents.error })
    else set({ documents })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const document = await DocumentService.findOne( id )
    if ( 'error' in document ) set({ error: document.error })
    else set({ document })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const document = await DocumentService.findOneByUserId( userId )
    if ( 'error' in document ) set({ error: document.error })
    else set({ document })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateDocument ) => {
    set({ isLoading: true })
    const document = await DocumentService.create( createDto )
    if ( 'error' in document ) {
      set({ error: document.error, isLoading: false })
      return false
    }
    set({ documents: [ ...get().documents, document ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateDocument ) => {
    set({ isLoading: true })
    const document = await DocumentService.update( id, updateDto )
    if ( 'error' in document ) {
      set({ error: document.error, isLoading: false })
      return false
    }
    set({
      documents: get().documents.map( p => p.id === document.id ? document : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const document = await DocumentService.toggleStatus( id )
    if ( 'error' in document ) set({ error: document.error })
    else set({ documents: get().documents.map( p => p.id === id ? { ...p, status: document.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useDocumentStore = create( DocumentStore )
