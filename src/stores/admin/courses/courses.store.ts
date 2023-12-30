import { StateCreator, create } from 'zustand'
import { ICourse } from '../../../interfaces'
import { ICreateCourses, CoursesService } from '../../../services'

export interface ICoursesState {
  courses: ICourse[]
  course?: ICourse
  isLoading:  boolean
  error?:     string

  findAll:      () => Promise<void>
  findOne:      ( id : string ) => Promise<void>
  create:       ( createDto : ICreateCourses ) => Promise<boolean>
  update:       ( id : string, updateDto : ICreateCourses ) => Promise<boolean>
  toggleStatus: ( id : string ) => Promise<void>
  clearError:   () => void
}

const CoursesStore : StateCreator<ICoursesState> = ( set, get ) => ({
  courses: [],
  course:  undefined,
  isLoading:  false,
  error:      undefined,

  findAll: async () => {
    set({ isLoading: true })
    const courses = await CoursesService.findAll()
    if ( 'error' in courses ) set({ error: courses.error })
    else set({ courses })
    set({ isLoading: false })
  },

  findOne: async ( id : string ) => {
    set({ isLoading: true })
    const course = await CoursesService.findOne( id )
    if ( 'error' in course ) set({ error: course.error })
    else set({ course })
    set({ isLoading: false })
  },

  create: async ( createDto : ICreateCourses ) => {
    set({ isLoading: true })
    const course = await CoursesService.create( createDto )
    if ( 'error' in course ) {
      set({ error: course.error, isLoading: false })
      return false
    }
    set({ courses: [ ...get().courses, course ], isLoading: false })
    return true
  },

  update: async ( id : string, updateDto : ICreateCourses ) => {
    set({ isLoading: true })
    const course = await CoursesService.update( id, updateDto )
    if ( 'error' in course ) {
      set({ error: course.error, isLoading: false })
      return false
    }
    set({
      courses: get().courses.map( p => p.id === course.id ? course : p ),
      isLoading: false
    })
    return true
  },

  toggleStatus: async ( id : string ) => {
    set({ isLoading: true })
    const course = await CoursesService.toggleStatus( id )
    if ( 'error' in course ) set({ error: course.error })
    else set({ courses: get().courses.map( p => p.id === id ? { ...p, status: course.status } : p ) })
    set({ isLoading: false })
  },
  clearError: () => set({ error: undefined })
})

export const useCoursesStore = create( CoursesStore )
