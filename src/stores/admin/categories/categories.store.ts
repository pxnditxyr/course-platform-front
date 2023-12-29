import { StateCreator, create } from 'zustand'
import { ICategory } from '../../../interfaces'
import { ICreateCategories, CategoriesService } from '../../../services'

export interface ICategoriesState {
  categories: ICategory[]
  category?: ICategory
  isLoading:  boolean
  error?:     string

  findAll:      () => Promise<void>
  findOne:      ( id : string ) => Promise<void>
  create:       ( createDto : ICreateCategories ) => Promise<void>
  update:       ( id : string, updateDto : ICreateCategories ) => Promise<void>
  toggleStatus: ( id : string ) => Promise<void>
  clearError:   () => void
}


const CategoriesStore : StateCreator<ICategoriesState> = ( set, get ) => ({
  categories: [],
  category:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const categories = await CategoriesService.findAll()
    if ( 'error' in categories ) set({ error: categories.error })
    else set({ categories })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const category = await CategoriesService.findOne( id )
    if ( 'error' in category ) set({ error: category.error })
    else set({ category })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateCategories ) => {
    set({ isLoading: true })
    const category = await CategoriesService.create( createDto )
    if ( 'error' in category ) set({ error: category.error })
    else set({ categories: [ ...get().categories, category ] })
    set({ isLoading: false })
  },

  update: async ( id : string, updateDto : ICreateCategories ) => {
    set({ isLoading: true })
    const category = await CategoriesService.update( id, updateDto )
    if ( 'error' in category ) set({ error: category.error })
    else set({ categories: get().categories.map( p => p.id === category.id ? category : p ) })
    set({ isLoading: false })
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const category = await CategoriesService.toggleStatus( id )
    if ( 'error' in category ) set({ error: category.error })
    else set({ categories: get().categories.map( p => p.id === id ? { ...p, status: category.status } : p ) })
    set({ isLoading: false })
  },

  clearError: () => set({ error: undefined })
})

export const useCategoriesStore = create( CategoriesStore )
