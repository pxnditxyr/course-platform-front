import { FormEvent, useEffect } from 'react'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useAuthStore, useParametersStore, useProgramDetailsStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { LoadingPage } from '../../../../components'

export const ProgramDetailsForm = () => {

  const user = useAuthStore( state => state.user )

  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )
  const isLoadingParams = useParametersStore( state => state.isLoading )

  const programDetails = useProgramDetailsStore( state => state.programDetails )
  const findAllProgramDetails = useProgramDetailsStore( state => state.findAll )
  const createProgramDetails = useProgramDetailsStore( state => state.create )
  const updateProgramDetails = useProgramDetailsStore( state => state.update )
  const error = useProgramDetailsStore( state => state.error )
  const clearError = useProgramDetailsStore( state => state.clearError )
  const isLoading = useProgramDetailsStore( state => state.isLoading )
  const programDetail = programDetails.find( info => info.userId === user?.id )

  useEffect( () => {
    findAllParameters()
    findAllProgramDetails()
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
      paymentMethodId,
      registrationConditionId,
      howToFindOutId,
    } = event.target as HTMLFormElement
    const data = {
      paymentMethodId: paymentMethodId.value,
      registrationConditionId: registrationConditionId.value,
      howToFindOutId: howToFindOutId.value,
      userId: user?.id || ''
    }

    if ( programDetail ) {
      const isUpdated = await updateProgramDetails( programDetail.id, data )
      if ( isUpdated ) {
        Swal.fire({
          title: 'Exito!',
          text: 'La Información del programa se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      return
    }
    const isCreated = await createProgramDetails( data )
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'La Información del programa se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  const paymentMethods = parameters.find( parameter => parameter.name === 'payment method' )
  const registrationConditions = parameters.find( parameter => parameter.name === 'registration condition' )
  const howToFindOuts = parameters.find( parameter => parameter.name === 'find out' )

  if ( isLoading || isLoadingParams ) return ( <LoadingPage /> )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Select
        isRequired
        label="Forma de Pago"
        placeholder="Seleccione una forma de pago"
        name="paymentMethodId"
        defaultSelectedKeys={ ( programDetail ) ? [ programDetail.paymentMethodId ] : [] }
      >
        { ( paymentMethods?.subparameters ) ? paymentMethods.subparameters.map( paymentMethod => (
          <SelectItem key={ paymentMethod.id } value={ paymentMethod.id }>
            { paymentMethod.name }
          </SelectItem>
        ) ) : (
          <SelectItem value="loading" key="loading">
            Cargando...
          </SelectItem>
        ) }
      </Select>
      <Select
        isRequired
        label="Condición de Inscripción"
        placeholder="Seleccione una condición de inscripción"
        name="registrationConditionId"
        defaultSelectedKeys={ ( programDetail ) ? [ programDetail.registrationConditionId ] : [] }
      >
        { ( registrationConditions?.subparameters ) ? registrationConditions.subparameters.map( registrationCondition => (
          <SelectItem key={ registrationCondition.id } value={ registrationCondition.id }>
            { registrationCondition.name }
          </SelectItem>
        ) ) : (
          <SelectItem value="loading" key="loading">
            Cargando...
          </SelectItem>
        ) }
      </Select>
      <Select
        isRequired
        label="¿Cómo se enteró?"
        placeholder="Seleccione una opción"
        name="howToFindOutId"
        defaultSelectedKeys={ ( programDetail ) ? [ programDetail.howToFindOutId ] : [] }
      >
        { ( howToFindOuts?.subparameters ) ? howToFindOuts.subparameters.map( howToFindOut => (
          <SelectItem key={ howToFindOut.id } value={ howToFindOut.id }>
            { howToFindOut.name }
          </SelectItem>
        ) ) : (
          <SelectItem value="loading" key="loading">
            Cargando...
          </SelectItem>
        ) }
      </Select>
      <Button color="primary" variant="shadow" type="submit">
        Actualizar
      </Button>
    </form>
  )
}
