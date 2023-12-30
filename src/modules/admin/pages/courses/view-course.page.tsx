import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useCoursesStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewCoursePage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const courses = useCoursesStore( state => state.courses )
  const findAllCourses = useCoursesStore( state => state.findAll )
  const isLoading = useCoursesStore( state => state.isLoading )
  const error = useCoursesStore( state => state.error )
  const clearError = useCoursesStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useCoursesStore( state => state.toggleStatus )
  const course = courses.find( course => course.id === id )

  const onEditClick   = ( id : string ) => navigate( `/courses/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

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
  if ( !course ) return (
    <UnexpectedErrorPage
      title="Curso no encontrado"
      message="El curso que intentas ver no existe"
    />
  )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Curso </h1>
      <div className="flex flex-col gap-4 w-full items-center mb-8">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...course,
            createdAt: serializeDate( course.createdAt ),
            updatedAt: serializeDate( course.updatedAt ),
            creator: `${ course.creator?.name } - ${ course.creator?.email }`,
            updater: course.updater ? `${ course.updater?.name } - ${ course.updater?.email }` : 'No se ha actualizado',
          } }
          hasImage
          imageKey="imageUrl"
          onEditClick={ onEditClick }
          onDeleteClick={ onDeleteClick }
        />
      </div>
    </div>
  )
}
