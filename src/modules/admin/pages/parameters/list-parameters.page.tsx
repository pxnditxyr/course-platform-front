import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParametersStore } from '../../../../stores'
import { LoadingPage, SimpleCrudTable } from '../../../../components'
import Swal from 'sweetalert2'

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

  const onViewClick   = ( id: string ) => navigate( `/parameters/view/${ btoa( id ) }` )
  const onCreateClick = () => navigate( '/parameters/create')
  const onEditClick   = ( id: string ) => navigate( `/parameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id: string ) => toggleStatus( id )

  return (
    <div className="flex flex-col items-center gap-8 py-2 px-8 mb-8">
      <h1 className="text-3xl font-bold"> Parametros </h1>
      <div className="flex justify-end gap-4 w-full max-w-4xl">
        <button
          onClick={ onCreateClick }
          className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-500"
        > Crear Parametro </button>
      </div>
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
