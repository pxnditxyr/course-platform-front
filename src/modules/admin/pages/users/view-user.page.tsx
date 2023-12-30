import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useUsersStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewUserPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useUsersStore( state => state.toggleStatus )
  const user = users.find( user => user.id === id )

  const onEditClick   = ( id : string ) => navigate( `/users/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

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
  if ( !user ) return (
    <UnexpectedErrorPage
      title="Usuario no encontrado"
      message="El usuario que estas buscando no existe"
    />
  )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Usuario </h1>
      <div className="flex flex-col gap-4 w-full items-center mb-8">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...user,
            createdAt: serializeDate( user.createdAt ),
            updatedAt: serializeDate( user.updatedAt ),
            creator: `${ user.creator?.name } - ${ user.creator?.email }`,
            updater: user.updater ? `${ user.updater?.name } - ${ user.updater?.email }` : 'No se ha actualizado',
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
