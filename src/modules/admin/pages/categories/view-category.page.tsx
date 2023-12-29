import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useCategoriesStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewCategoryPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )
  const categories = useCategoriesStore( state => state.categories )
  const category = categories.find( category => category.id === id )

  if ( !category ) return (
    <UnexpectedErrorPage
      title="Categoria no encontrada"
      message="La categoria que estas buscando no existe"
    />
  )

  const isLoading = useCategoriesStore( state => state.isLoading )
  const error = useCategoriesStore( state => state.error )
  const clearError = useCategoriesStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useCategoriesStore( state => state.toggleStatus )

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
  const onEditClick   = ( id : string ) => navigate( `/categories/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Categoria </h1>
      <div className="flex flex-col gap-4 w-full items-center mb-8">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...category,
            createdAt: serializeDate( category.createdAt ),
            updatedAt: serializeDate( category.updatedAt ),
            creator: `${ category.creator?.name } - ${ category.creator?.email }`,
            updater: category.updater ? `${ category.updater?.name } - ${ category.updater?.email }` : 'No se ha actualizado',
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
