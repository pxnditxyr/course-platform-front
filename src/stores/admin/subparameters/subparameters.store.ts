import { StateCreator, create } from 'zustand'
import { ISubparameter } from '../../../interfaces'
import { ICreateSubparameters, SubparametersService } from '../../../services'

export interface ISubparametersState {
  subparameters: ISubparameter[]
  subparameter?: ISubparameter
  isLoading:  boolean
  error?:     string

  findAll:      () => Promise<void>
  findOne:      ( id : string ) => Promise<void>
  create:       ( createDto : ICreateSubparameters ) => Promise<boolean>
  update:       ( id : string, updateDto : ICreateSubparameters ) => Promise<boolean>
  toggleStatus: ( id : string ) => Promise<void>
  clearError:   () => void
}


const SubparametersStore : StateCreator<ISubparametersState> = ( set, get ) => ({
  subparameters: [],
  subparameter:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const subparameters = await SubparametersService.findAll()
    if ( 'error' in subparameters ) set({ error: subparameters.error })
    else set({ subparameters })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const subparameter = await SubparametersService.findOne( id )
    if ( 'error' in subparameter ) set({ error: subparameter.error })
    else set({ subparameter })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateSubparameters ) => {
    set({ isLoading: true })
    const subparameter = await SubparametersService.create( createDto )
    if ( 'error' in subparameter ) {
      set({ error: subparameter.error, isLoading: false })
      return false
    }
    set({ subparameters: [ ...get().subparameters, subparameter ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateSubparameters ) => {
    set({ isLoading: true })
    const subparameter = await SubparametersService.update( id, updateDto )
    if ( 'error' in subparameter ) {
      set({ error: subparameter.error, isLoading: false })
      return false
    }
    set({ subparameters: get().subparameters.map( p => p.id === subparameter.id ? subparameter : p ), isLoading: false })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const subparameter = await SubparametersService.toggleStatus( id )
    if ( 'error' in subparameter ) set({ error: subparameter.error })
    else set({ subparameters: get().subparameters.map( p => p.id === id ? { ...p, status: subparameter.status } : p ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useSubparametersStore = create( SubparametersStore )
