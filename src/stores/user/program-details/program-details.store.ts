import { StateCreator, create } from 'zustand'
import { IProgramDetail } from '../../../interfaces'
import { ICreateProgramDetails, ProgramDetailsService } from '../../../services'

export interface ProgramDetailsState {
  programDetails: IProgramDetail[]
  programDetail?: IProgramDetail
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreateProgramDetails ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreateProgramDetails ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const ProgramDetailsStore : StateCreator<ProgramDetailsState> = ( set, get ) => ({
  programDetails: [],
  programDetail:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const programDetails = await ProgramDetailsService.findAll()
    if ( 'error' in programDetails ) set({ error: programDetails.error })
    else set({ programDetails })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const programDetail = await ProgramDetailsService.findOne( id )
    if ( 'error' in programDetail ) set({ error: programDetail.error })
    else set({ programDetail })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const programDetail = await ProgramDetailsService.findOneByUserId( userId )
    if ( 'error' in programDetail ) set({ error: programDetail.error })
    else set({ programDetail })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateProgramDetails ) => {
    set({ isLoading: true })
    const programDetail = await ProgramDetailsService.create( createDto )
    if ( 'error' in programDetail ) {
      set({ error: programDetail.error, isLoading: false })
      return false
    }
    set({ programDetails: [ ...get().programDetails, programDetail ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateProgramDetails ) => {
    set({ isLoading: true })
    const programDetail = await ProgramDetailsService.update( id, updateDto )
    if ( 'error' in programDetail ) {
      set({ error: programDetail.error, isLoading: false })
      return false
    }
    set({
      programDetails: get().programDetails.map( p => p.id === programDetail.id ? programDetail : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const programDetail = await ProgramDetailsService.toggleStatus( id )
    if ( 'error' in programDetail ) set({ error: programDetail.error })
    else set({ programDetails: get().programDetails.map( p => p.id === id ? { ...p, status: programDetail.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useProgramDetailsStore = create( ProgramDetailsStore )
