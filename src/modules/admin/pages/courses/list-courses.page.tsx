import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoursesStore } from '../../../../stores'
import { AvatarCrudTable, LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre del Curso', uid: 'name' },
  { name: 'Estado', uid: 'status' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ListCoursesPage = () => {

  const courses = useCoursesStore( state => state.courses )
  const findAllCourses = useCoursesStore( state => state.findAll )
  const isLoading = useCoursesStore( state => state.isLoading )
  const toggleStatus = useCoursesStore( state => state.toggleStatus )
  const error = useCoursesStore( state => state.error )
  const clearError = useCoursesStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAllCourses()
  }, [] )

  useEffect( () => {
    if ( error ) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ error ] )

  if ( isLoading ) return ( <LoadingPage /> )

  const onViewClick   = ( id: string ) => navigate( `/courses/view/${ btoa( id ) }` )
  const onCreateClick = () => navigate( '/courses/create')
  const onEditClick   = ( id: string ) => navigate( `/courses/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id: string ) => toggleStatus( id )

  return (
    <div className="flex flex-col items-center gap-8 py-2 px-8 mb-8">
      <h1 className="text-3xl font-bold"> Cursos </h1>
      <div className="flex justify-end gap-4 w-full max-w-4xl">
        <button
          onClick={ onCreateClick }
          className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-500"
        > Crear Curso </button>
      </div>
      <AvatarCrudTable
        columns={ columns }
        data={ courses }
        onEditClick={ onEditClick }
        onDeleteClick={ onDeleteClick }
        onViewClick={ onViewClick }
      />
    </div>
  )
}
