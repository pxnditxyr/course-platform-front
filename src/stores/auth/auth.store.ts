import { StateCreator, create } from 'zustand'
import { IAuthUser } from '../../interfaces'
import { persist } from 'zustand/middleware'
import { AuthService, ISigninParams, ISignupParams } from '../../services'

type TAuthStatus = 'authenticated' | 'unauthenticated' | 'pending'

export interface IAuthState {
  status: TAuthStatus
  token?: string
  user?: IAuthUser
  error?: string

  signin: ( signinParams : ISigninParams ) => Promise<void>
  signup: ( signupParams : ISignupParams ) => Promise<void>
  checkAuthStatus: () => Promise<void>
  signout: () => Promise<void>
  clearError: () => void
}

const authStore : StateCreator<IAuthState> = ( set ) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  error: undefined,

  signin: async ( signinParams ) => {
    const response = await AuthService.signin( signinParams )
    if ( 'error' in response ) {
      set({ error: response.error, status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ status: 'authenticated', token: response.token, user: response.user })
  },
  signup: async ( signupParams ) => {
    const response = await AuthService.signup( signupParams )
    if ( 'error' in response ) {
      set({ error: response.error, status: 'unauthenticated', token: undefined, user: undefined })
      return
    }
    set({ status: 'authenticated', token: response.token, user: response.user })
  },
  checkAuthStatus: async () => {
    const response = await AuthService.checkAuthStatus()
    if ( 'error' in response ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined, error: undefined })
      return
    }
    set({ status: 'authenticated', token: response.token, user: response.user })
  },
  signout: async () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined })
  },
  clearError: () => {
    set({ error: undefined })
  }
})

export const useAuthStore = create<IAuthState>()(
  persist(
    authStore,
    { name: 'authStore' }
  )
)
