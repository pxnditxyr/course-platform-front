import { StateCreator, create } from 'zustand'
import { IContactInfo } from '../../../interfaces'
import { ICreateContactInfo, ContactInfoService } from '../../../services'

export interface IContactInfoState {
  contactInfo: IContactInfo[]
  contactInformation?: IContactInfo
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreateContactInfo ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreateContactInfo ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const ContactInfoStore : StateCreator<IContactInfoState> = ( set, get ) => ({
  contactInfo: [],
  contactInformation:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const contactInfo = await ContactInfoService.findAll()
    if ( 'error' in contactInfo ) set({ error: contactInfo.error })
    else set({ contactInfo })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const contactInformation = await ContactInfoService.findOne( id )
    if ( 'error' in contactInformation ) set({ error: contactInformation.error })
    else set({ contactInformation })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const contactInformation = await ContactInfoService.findOneByUserId( userId )
    if ( 'error' in contactInformation ) set({ error: contactInformation.error })
    else set({ contactInformation })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateContactInfo ) => {
    set({ isLoading: true })
    const contactInformation = await ContactInfoService.create( createDto )
    if ( 'error' in contactInformation ) {
      set({ error: contactInformation.error, isLoading: false })
      return false
    }
    set({ contactInfo: [ ...get().contactInfo, contactInformation ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateContactInfo ) => {
    set({ isLoading: true })
    const contactInformation = await ContactInfoService.update( id, updateDto )
    if ( 'error' in contactInformation ) {
      set({ error: contactInformation.error, isLoading: false })
      return false
    }
    set({
      contactInfo: get().contactInfo.map( p => p.id === contactInformation.id ? contactInformation : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const contactInformation = await ContactInfoService.toggleStatus( id )
    if ( 'error' in contactInformation ) set({ error: contactInformation.error })
    else set({ contactInfo: get().contactInfo.map( p => p.id === id ? { ...p, status: contactInformation.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useContactInfoStore = create( ContactInfoStore )
