import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useParametersStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewParameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const parameters = useParametersStore( state => state.parameters )
  const findAll = useParametersStore( state => state.findAll )
  const isLoading = useParametersStore( state => state.isLoading )
  const error = useParametersStore( state => state.error )
  const clearError = useParametersStore( state => state.clearError )

  const navigate = useNavigate()
  const toggleStatus = useParametersStore( state => state.toggleStatus )
  const onEditClick   = ( id : string ) => navigate( `/parameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )
  const parameter = parameters.find( parameter => parameter.id === id )

  useEffect( () => {
    findAll()
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
  if ( !parameter ) return (
    <UnexpectedErrorPage
      title="Parametro no encontrado"
      message="El parametro que estas buscando no existe"
    />
  )
  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Parametro </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...parameter,
            createdAt: serializeDate( parameter.createdAt ),
            updatedAt: serializeDate( parameter.updatedAt ),
            creator: `${ parameter.creator?.name } - ${ parameter.creator?.email }`,
            updater: parameter.updater ? `${ parameter.updater?.name } - ${ parameter.updater?.email }` : 'No se ha actualizado',
          } }
          onEditClick={ onEditClick }
          onDeleteClick={ onDeleteClick }
        />
      </div>
    </div>
  )
}
