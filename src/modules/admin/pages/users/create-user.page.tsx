import { FormEvent, useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useUsersStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { LoadingPage } from '../../../../components'

export const CreateUserPage = () => {

  const create = useUsersStore( state => state.create )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      userName, paternalSurname,
      maternalSurname, email,
      userRole, password
    } = event.target as HTMLFormElement
    const isCreated = await create({
      name: userName.value,
      paternalSurname: paternalSurname.value,
      maternalSurname: maternalSurname.value,
      email: email.value,
      password: password.value,
      role: userRole.value
    })
    
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'El usuario se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }
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

  const roles = [ 'ADMIN', 'USER' ]

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Crear Usuario </h1>
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
          />
          <Input
            type="text"
            label="Apellido Paterno"
            variant="bordered"
            name="paternalSurname"
          />
          <Input
            type="text"
            label="Apellido Materno"
            variant="bordered"
            name="maternalSurname"
          />
          <Input
            type="email"
            label="Correo Electronico"
            variant="bordered"
            name="email"
          />
          <Input
            type="password"
            label="Contraseña"
            variant="bordered"
            name="password"
          />
          <Select
            isRequired
            label="Rol del usuario"
            placeholder="Seleccione una categoria"
            name="userRole"
          >
            { roles.map( ( role ) => (
              <SelectItem key={ role } value={ role }>
                { role }
              </SelectItem>
            ) ) }
          </Select>
          <Button color="primary" variant="shadow" type="submit">
            Crear
          </Button>
        </form>
      </div>
    </div>
  )
}
