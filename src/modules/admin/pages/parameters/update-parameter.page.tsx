import { FormEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'

import Swal from 'sweetalert2'

import { useParametersStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'

export const UpdateParameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const update = useParametersStore( state => state.update )
  const parameters = useParametersStore( state => state.parameters )
  const findAll = useParametersStore( state => state.findAll )
  const isLoading = useParametersStore( state => state.isLoading )
  const error = useParametersStore( state => state.error )
  const clearError = useParametersStore( state => state.clearError )
  const parameter = parameters.find( parameter => parameter.id === id )

  useEffect( () => {
    findAll()
  }, [] )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { parameterName, details } = event.target as HTMLFormElement
    const isUpdated = await update( id, { name: parameterName.value, details: details.value })
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El parametro se ha actualizado correctamente',
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
  if ( !parameter ) return (
    <UnexpectedErrorPage
      title="Parametro no encontrado"
      message="El parametro que estas buscando no existe"
    />
  )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Actualizar Parametro </h1>
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
            defaultValue={ parameter.name }
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
            defaultValue={ parameter.details }
          />
          <Button color="primary" variant="shadow" type="submit">
            Actualizar
          </Button>
        </form>
      </div>
    </div>
  )
}
