import { StateCreator, create } from 'zustand'
import { IParameter } from '../../../interfaces'
import { ICreateParameters, ParametersService } from '../../../services'

export interface IParametersState {
  parameters: IParameter[]
  parameter?: IParameter
  isLoading:  boolean
  error?:     string

  findAll:      () => Promise<void>
  findOne:      ( id : string ) => Promise<void>
  create:       ( createDto : ICreateParameters ) => Promise<void>
  update:       ( id : string, updateDto : ICreateParameters ) => Promise<void>
  toggleStatus: ( id : string ) => Promise<void>
  clearError:   () => void
}


const ParametersStore : StateCreator<IParametersState> = ( set, get ) => ({
  parameters: [],
  parameter:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const parameters = await ParametersService.findAll()
    if ( 'error' in parameters ) set({ error: parameters.error })
    else set({ parameters })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const parameter = await ParametersService.findOne( id )
    if ( 'error' in parameter ) set({ error: parameter.error })
    else set({ parameter })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateParameters ) => {
    set({ isLoading: true })
    const parameter = await ParametersService.create( createDto )
    if ( 'error' in parameter ) set({ error: parameter.error })
    else set({ parameters: [ ...get().parameters, parameter ] })
    set({ isLoading: false })
  },

  update: async ( id : string, updateDto : ICreateParameters ) => {
    set({ isLoading: true })
    const parameter = await ParametersService.update( id, updateDto )
    if ( 'error' in parameter ) set({ error: parameter.error })
    else set({ parameters: get().parameters.map( p => p.id === parameter.id ? parameter : p ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const parameter = await ParametersService.toggleStatus( id )
    if ( 'error' in parameter ) set({ error: parameter.error })
    else set({ parameters: get().parameters.map( p => p.id === id ? { ...p, status: parameter.status } : p ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useParametersStore = create( ParametersStore )