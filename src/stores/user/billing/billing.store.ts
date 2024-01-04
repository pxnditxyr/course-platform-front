import { StateCreator, create } from 'zustand'
import { IBilling } from '../../../interfaces'
import { ICreateBilling, BillingService } from '../../../services'

export interface IBillingState {
  billing: IBilling[]
  billingInfo?: IBilling
  isLoading:  boolean
  error?:     string

  findAll:         () => Promise<void>
  findOne:         ( id : string ) => Promise<void>
  findOneByUserId: ( userId : string ) => Promise<void>
  create:          ( createDto : ICreateBilling ) => Promise<boolean>
  update:          ( id : string, updateDto : ICreateBilling ) => Promise<boolean>
  toggleStatus:    ( id : string ) => Promise<void>
  clearError:      () => void
}

const BillingStore : StateCreator<IBillingState> = ( set, get ) => ({
  billing: [],
  billingInfo:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const billing = await BillingService.findAll()
    if ( 'error' in billing ) set({ error: billing.error })
    else set({ billing })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    if ( !id ) return set({ error: 'No id provided', isLoading: false })
    const billingInfo = await BillingService.findOne( id )
    if ( 'error' in billingInfo ) set({ error: billingInfo.error })
    else set({ billingInfo })
    set({ isLoading: false })
  },

  findOneByUserId: async ( userId : string ) => {
    set({ isLoading: true })
    if ( !userId ) return set({ error: 'No userId provided', isLoading: false })
    const billingInfo = await BillingService.findOneByUserId( userId )
    if ( 'error' in billingInfo ) set({ error: billingInfo.error })
    else set({ billingInfo })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateBilling ) => {
    set({ isLoading: true })
    const billingInfo = await BillingService.create( createDto )
    if ( 'error' in billingInfo ) {
      set({ error: billingInfo.error, isLoading: false })
      return false
    }
    set({ billing: [ ...get().billing, billingInfo ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateBilling ) => {
    set({ isLoading: true })
    const billingInfo = await BillingService.update( id, updateDto )
    if ( 'error' in billingInfo ) {
      set({ error: billingInfo.error, isLoading: false })
      return false
    }
    set({
      billing: get().billing.map( p => p.id === billingInfo.id ? billingInfo : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const billingInfo = await BillingService.toggleStatus( id )
    if ( 'error' in billingInfo ) set({ error: billingInfo.error })
    else set({ billing: get().billing.map( p => p.id === id ? { ...p, status: billingInfo.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useBillingStore = create( BillingStore )
