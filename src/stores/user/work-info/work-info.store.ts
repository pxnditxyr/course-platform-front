import { StateCreator, create } from 'zustand'
import { IWorkInfo } from '../../../interfaces'
import { ICreateWorkInfo, WorkInfoService } from '../../../services'

export interface IWorkInfoState {
  workInfo: IWorkInfo[]
  workInformation?: IWorkInfo
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreateWorkInfo ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreateWorkInfo ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const WorkInfoStore : StateCreator<IWorkInfoState> = ( set, get ) => ({
  workInfo: [],
  workInformation:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const workInfo = await WorkInfoService.findAll()
    if ( 'error' in workInfo ) set({ error: workInfo.error })
    else set({ workInfo })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const workInformation = await WorkInfoService.findOne( id )
    if ( 'error' in workInformation ) set({ error: workInformation.error })
    else set({ workInformation })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const workInformation = await WorkInfoService.findOneByUserId( userId )
    if ( 'error' in workInformation ) set({ error: workInformation.error })
    else set({ workInformation })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateWorkInfo ) => {
    set({ isLoading: true })
    const workInformation = await WorkInfoService.create( createDto )
    if ( 'error' in workInformation ) {
      set({ error: workInformation.error, isLoading: false })
      return false
    }
    set({ workInfo: [ ...get().workInfo, workInformation ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateWorkInfo ) => {
    set({ isLoading: true })
    const workInformation = await WorkInfoService.update( id, updateDto )
    if ( 'error' in workInformation ) {
      set({ error: workInformation.error, isLoading: false })
      return false
    }
    set({
      workInfo: get().workInfo.map( p => p.id === workInformation.id ? workInformation : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const workInformation = await WorkInfoService.toggleStatus( id )
    if ( 'error' in workInformation ) set({ error: workInformation.error })
    else set({ workInfo: get().workInfo.map( p => p.id === id ? { ...p, status: workInformation.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useWorkInfoStore = create( WorkInfoStore )
