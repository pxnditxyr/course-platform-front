import { StateCreator, create } from 'zustand'
import { IPersonalInfo } from '../../../interfaces'
import { ICreatePersonalInfo, PersonalInfoService } from '../../../services'

export interface IPersonalInfoState {
  personalInfo: IPersonalInfo[]
  personalInformation?: IPersonalInfo
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreatePersonalInfo ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreatePersonalInfo ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const PersonalInfoStore : StateCreator<IPersonalInfoState> = ( set, get ) => ({
  personalInfo: [],
  personalInformation:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const personalInfo = await PersonalInfoService.findAll()
    if ( 'error' in personalInfo ) set({ error: personalInfo.error })
    else set({ personalInfo })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const personalInformation = await PersonalInfoService.findOne( id )
    if ( 'error' in personalInformation ) set({ error: personalInformation.error })
    else set({ personalInformation })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const personalInformation = await PersonalInfoService.findOneByUserId( userId )
    if ( 'error' in personalInformation ) set({ error: personalInformation.error })
    else set({ personalInformation })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreatePersonalInfo ) => {
    set({ isLoading: true })
    const personalInformation = await PersonalInfoService.create( createDto )
    if ( 'error' in personalInformation ) {
      set({ error: personalInformation.error, isLoading: false })
      return false
    }
    set({ personalInfo: [ ...get().personalInfo, personalInformation ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreatePersonalInfo ) => {
    set({ isLoading: true })
    const personalInformation = await PersonalInfoService.update( id, updateDto )
    if ( 'error' in personalInformation ) {
      set({ error: personalInformation.error, isLoading: false })
      return false
    }
    set({
      personalInfo: get().personalInfo.map( p => p.id === personalInformation.id ? personalInformation : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const personalInformation = await PersonalInfoService.toggleStatus( id )
    if ( 'error' in personalInformation ) set({ error: personalInformation.error })
    else set({ personalInfo: get().personalInfo.map( p => p.id === id ? { ...p, status: personalInformation.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const usePersonalInfoStore = create( PersonalInfoStore )
