import { FormEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import Swal from 'sweetalert2'

import { useUsersStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'

export const UpdateUserPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const update = useUsersStore( state => state.update )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
  const user = users.find( p => p.id === id )

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

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      userName, paternalSurname,
      maternalSurname, email,
      userRole, password
    } = event.target as HTMLFormElement
    const isUpdated = await update( id, {
      name: userName.value,
      paternalSurname: paternalSurname.value,
      maternalSurname: maternalSurname.value,
      email: email.value,
      password: password.value.length > 0 ? password.value : undefined,
      role: userRole.value
    } )
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El usuario se ha actualizado correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !user ) return (
    <UnexpectedErrorPage
      title={ `El usuario no existe` }
      message="El usuario que estas buscando no existe"
    />
  )

  const roles = [ 'ADMIN', 'USER' ]

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Actualizar Usuario </h1>
      <div className="flex flex-col gap-4 w-full items-center mb-20">
        <form
          className="flex flex-col gap-8 w-full max-w-lg"
          onSubmit={ onSubmit }
        >
          <Input
            type="text"
            label="Nombre"
            variant="bordered"
            name="userName"
            defaultValue={ user.name }
          />
          <Input
            type="text"
            label="Apellido Paterno"
            variant="bordered"
            name="paternalSurname"
            defaultValue={ user.paternalSurname }
          />
          <Input
            type="text"
            label="Apellido Materno"
            variant="bordered"
            name="maternalSurname"
            defaultValue={ user.maternalSurname }
          />
          <Input
            type="email"
            label="Correo electronico"
            variant="bordered"
            name="email"
            defaultValue={ user.email }
          />
          <Input
            type="password"
            label="Nueva contraseña"
            variant="bordered"
            name="password"
          />
          <Select
            isRequired
            label="Rol del usuario"
            placeholder="Rol del usuario"
            name="userRole"
            defaultSelectedKeys={[ user.role ]}
          >
            { roles.map( ( role ) => (
              <SelectItem key={ role } value={ role }>
                { role }
              </SelectItem>
            ) ) }
          </Select>
          <Button color="primary" variant="shadow" type="submit">
            Actualizar
          </Button>
        </form>
      </div>
    </div>
  )
}
