import { FormEvent, useEffect } from 'react'
import { useParametersStore, useSubparametersStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { LoadingPage } from '../../../../components'

export const CreateSubparameterPage = () => {

  const create = useSubparametersStore( state => state.create )
  const isLoading = useSubparametersStore( state => state.isLoading )
  const error = useSubparametersStore( state => state.error )
  const clearError = useSubparametersStore( state => state.clearError )

  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )
  useEffect( () => {
    findAllParameters()
  }, [] )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { subparameterName, details, parameterId } = event.target as HTMLFormElement
    const isCreated = await create({
      name: subparameterName.value,
      details: details.value,
      parameterId: parameterId.value
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El subparametro se ha creado correctamente',
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
      <h1 className="text-3xl font-bold"> Crear Subparametro </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <form
          className="flex flex-col gap-8 w-full max-w-lg"
          onSubmit={ onSubmit }
        >
          <Input
            type="text"
            label="Nombre"
            variant="bordered"
            name="subparameterName"

          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
          />
          <Select
            isRequired
            label="Parametro"
            placeholder="Seleccione un parametro"
            name="parameterId"
          >
            { parameters.filter( p => p.status ).map( ( parameter ) => (
              <SelectItem key={ parameter.id } value={ parameter.id }>
                { parameter.name }
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
