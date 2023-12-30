import { FormEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import Swal from 'sweetalert2'

import { useParametersStore, useSubparametersStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'

export const UpdateSubparameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const update = useSubparametersStore( state => state.update )
  const subparameters = useSubparametersStore( state => state.subparameters )
  const findAllSubparameters = useSubparametersStore( state => state.findAll )
  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )
  const isLoading = useSubparametersStore( state => state.isLoading )
  const error = useSubparametersStore( state => state.error )
  const clearError = useSubparametersStore( state => state.clearError )
  const subparameter = subparameters.find( subparameter => subparameter.id === id )

  useEffect( () => {
    findAllParameters()
    findAllSubparameters()
  }, [] )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { subparameterName, details, parameterId } = event.target as HTMLFormElement
    const isUpdated = await update( id, {
      name: subparameterName.value,
      details: details.value,
      parameterId: parameterId.value
    })
    if ( !isUpdated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'El subparametro se ha actualizado correctamente',
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
  if ( !subparameter ) return (
    <UnexpectedErrorPage
      title="Subparametro no encontrado"
      message="El subparametro que estas buscando no existe"
    />
  )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Actualizar Subparametro </h1>
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
            defaultValue={ subparameter.name }
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
            defaultValue={ subparameter.details }
          />
          <Select
            isRequired
            label="Parametro"
            placeholder="Seleccione un parametro"
            name="parameterId"
            defaultSelectedKeys={[ subparameter.parameterId ]}
          >
            { parameters.filter( p => p.status ).map( ( parameter ) => (
              <SelectItem key={ parameter.id } value={ parameter.id }>
                { parameter.name }
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
