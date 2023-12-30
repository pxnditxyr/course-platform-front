import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useSubparametersStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewSubparameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const subparameters = useSubparametersStore( state => state.subparameters )
  const findAllSubparameters = useSubparametersStore( state => state.findAll )
  const isLoading = useSubparametersStore( state => state.isLoading )
  const error = useSubparametersStore( state => state.error )
  const clearError = useSubparametersStore( state => state.clearError )

  const navigate = useNavigate()
  const toggleStatus = useSubparametersStore( state => state.toggleStatus )
  const onEditClick   = ( id : string ) => navigate( `/subparameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )
  const subparameter = subparameters.find( subparameter => subparameter.id === id )

  useEffect( () => {
    findAllSubparameters()
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
  if ( !subparameter ) return (
    <UnexpectedErrorPage
      title="Subparametro no encontrado"
      message="El subparametro que estas buscando no existe"
    />
  )
  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Subparametro </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'parameter', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Parametro padre', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...subparameter,
            parameter: subparameter.parameter?.name,
            createdAt: serializeDate( subparameter.createdAt ),
            updatedAt: serializeDate( subparameter.updatedAt ),
            creator: `${ subparameter.creator?.name } - ${ subparameter.creator?.email }`,
            updater: subparameter.updater ? `${ subparameter.updater?.name } - ${ subparameter.updater?.email }` : 'No se ha actualizado',
          } }
          onEditClick={ onEditClick }
          onDeleteClick={ onDeleteClick }
        />
      </div>
    </div>
  )
}
