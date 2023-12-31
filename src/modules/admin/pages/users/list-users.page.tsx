import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, useUsersStore } from '../../../../stores'
import { AvatarCrudTable, LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

const columns = [
  { name: 'Nombre del Usuario', uid: 'name' },
  { name: 'Estado', uid: 'status' },
  { name: 'Fecha de creacion', uid: 'createdAt' },
  { name: 'Fecha de actualizacion', uid: 'updatedAt' },
  { name: 'Acciones', uid: 'actions' }
]

export const ListUsersPage = () => {

  const currentUser = useAuthStore( state => state.user )
  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoading = useUsersStore( state => state.isLoading )
  const toggleStatus = useUsersStore( state => state.toggleStatus )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
  const navigate = useNavigate()

  useEffect( () => {
    findAllUsers()
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

  const onViewClick   = ( id: string ) => navigate( `/users/view/${ btoa( id ) }` )
  const onCreateClick = () => navigate( '/users/create')
  const onEditClick   = ( id: string ) => navigate( `/users/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id: string ) => {
    if ( currentUser?.id === id ) {
      return Swal.fire({
        title: 'Error!',
        text: 'No puedes eliminar tu propio usuario',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    toggleStatus( id )
  }

  return (
    <div className="flex flex-col items-center gap-8 py-2 px-8 mb-8">
      <h1 className="text-3xl font-bold"> Usuarios </h1>
      <div className="flex justify-end gap-4 w-full max-w-4xl">
        <button
          onClick={ onCreateClick }
          className="py-2 px-4 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-500"
        > Crear Usuario </button>
      </div>
      <AvatarCrudTable
        columns={ columns }
        data={ users }
        onEditClick={ onEditClick }
        onDeleteClick={ onDeleteClick }
        onViewClick={ onViewClick }
      />
    </div>
  )
}
