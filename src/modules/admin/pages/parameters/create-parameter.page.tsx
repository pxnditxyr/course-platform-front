import { FormEvent, useEffect } from 'react'
import { useParametersStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { Button, Input } from '@nextui-org/react'
import { LoadingPage } from '../../../../components'

export const CreateParameterPage = () => {

  const create = useParametersStore( state => state.create )
  const isLoading = useParametersStore( state => state.isLoading )
  const error = useParametersStore( state => state.error )
  const clearError = useParametersStore( state => state.clearError )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { parameterName, details } = event.target as HTMLFormElement
    await create({ name: parameterName.value, details: details.value })
    Swal.fire({
      title: 'Exito!',
      text: 'El parametro se ha creado correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
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


  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Create Parameter Page </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <form
          className="flex flex-col gap-8 w-full max-w-lg"
          onSubmit={ onSubmit }
        >
          <Input
            type="text"
            label="Nombre"
            variant="bordered"
            name="parameterName"

          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
          />
          <Button color="primary" variant="shadow" type="submit">
            Crear
          </Button>
        </form>
      </div>
    </div>
  )
}
