import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParametersStore } from '../../../../stores'
import { LoadingPage, SimpleCrudTable } from '../../../../components'

const columns = [
  { name: 'Nombre del parametro', uid: 'name' },
  { name: 'Estado', uid: 'status' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ListParametersPage = () => {

  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )
  const isLoading = useParametersStore( state => state.isLoading )
  const toggleStatus = useParametersStore( state => state.toggleStatus )
  const error = useParametersStore( state => state.error )
  const clearError = useParametersStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAllParameters()
  }, [] )

  useEffect( () => {
    if ( error ) {
      alert( error )
      clearError()
    }
  }, [ error ] )

  if ( isLoading ) return ( <LoadingPage /> )

  const onViewClick   = ( id: string ) => navigate( `/parameters/view/${ btoa( id ) }` )
  const onCreateClick = () => navigate( '/parameters/create')
  const onEditClick   = ( id: string ) => navigate( `/parameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id: string ) => toggleStatus( id )

  return (
    <div>
      <h1> List Parameters Page </h1>
      <button onClick={ onCreateClick }> Crear </button>
      <SimpleCrudTable
        columns={ columns }
        data={ parameters }
        onEditClick={ onEditClick }
        onDeleteClick={ onDeleteClick }
        onViewClick={ onViewClick }
      />
    </div>
  )
}
