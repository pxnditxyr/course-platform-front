import { StateCreator, create } from 'zustand'
import { IUser } from '../../../interfaces'
import { ICreateUsers, UsersService } from '../../../services'

export interface IUsersState {
  users: IUser[]
  user?: IUser
  isLoading:  boolean
  error?:     string

  findAll:      () => Promise<void>
  findOne:      ( id : string ) => Promise<void>
  create:       ( createDto : ICreateUsers ) => Promise<boolean>
  update:       ( id : string, updateDto : ICreateUsers ) => Promise<boolean>
  toggleStatus: ( id : string ) => Promise<void>
  clearError:   () => void
}

const UsersStore : StateCreator<IUsersState> = ( set, get ) => ({
  users: [],
  user:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const users = await UsersService.findAll()
    if ( 'error' in users ) set({ error: users.error })
    else set({ users })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const user = await UsersService.findOne( id )
    if ( 'error' in user ) set({ error: user.error })
    else set({ user })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateUsers ) => {
    set({ isLoading: true })
    const user = await UsersService.create( createDto )
    if ( 'error' in user ) {
      set({ error: user.error, isLoading: false })
      return false
    }
    set({ users: [ ...get().users, user ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateUsers ) => {
    set({ isLoading: true })
    const user = await UsersService.update( id, updateDto )
    if ( 'error' in user ) {
      set({ error: user.error, isLoading: false })
      return false
    }
    set({
      users: get().users.map( p => p.id === user.id ? user : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const user = await UsersService.toggleStatus( id )
    if ( 'error' in user ) set({ error: user.error })
    else set({ users: get().users.map( p => p.id === id ? { ...p, status: user.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useUsersStore = create( UsersStore )
