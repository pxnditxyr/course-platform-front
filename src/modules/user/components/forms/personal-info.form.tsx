import { FormEvent, useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useAuthStore, useParametersStore, usePersonalInfoStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { LoadingPage } from '../../../../components'

export const PersonalInfoForm = () => {

  const user = useAuthStore( state => state.user )

  const findAllParameters = useParametersStore( state => state.findAll )
  const parameters        = useParametersStore( state => state.parameters )
  const isLoadingParams   = useParametersStore( state => state.isLoading )

  const findAllPersonalInfo = usePersonalInfoStore( state => state.findAll )
  const personalInfo        = usePersonalInfoStore( state => state.personalInfo )
  const createPersonalInfo  = usePersonalInfoStore( state => state.create )
  const updatePersonalInfo  = usePersonalInfoStore( state => state.update )
  const error               = usePersonalInfoStore( state => state.error )
  const clearError          = usePersonalInfoStore( state => state.clearError )
  const isLoading           = usePersonalInfoStore( state => state.isLoading )

  const personalInformation = personalInfo.find( info => info.userId === user?.id )

  useEffect( () => {
    findAllParameters()
    findAllPersonalInfo()
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
      nationality,
      genderId,
      ciExtensionId,
      birthDate
    } = event.target as HTMLFormElement
    const data = {
      nationality: nationality.value,
      genderId: genderId.value,
      ciExtensionId: ciExtensionId.value,
      birthDate: birthDate.value,
      userId: ( user ) ? user.id : ''
    }

    if ( personalInformation ) {
      const isUpdated = await updatePersonalInfo( personalInformation.id, data )
      if ( isUpdated ) {
        Swal.fire({
          title: 'Exito!',
          text: 'La información personal se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      return
    }

    const isCreated = await createPersonalInfo( data )
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'La información personal se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }


  const nationalities = [ 'Bolivia', 'Peru', 'Chile', 'Argentina', 'Brasil' ]
  const genders = parameters.find( parameter => parameter.name === 'gender' )
  const ciExtensions = parameters.find( parameter => parameter.name === 'extension' )

  if ( isLoading || isLoadingParams ) return ( <LoadingPage /> )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Input
        isRequired
        type="date"
        label="Fecha de Nacimiento"
        placeholder="Fecha de Nacimiento"
        variant="bordered"
        name="birthDate"
        defaultValue={ ( personalInformation )
          ? new Date( personalInformation.birthDate ).toISOString().split( 'T' )[ 0 ]
          : '2000-01-01'
        }
      />
      <Select
        isRequired
        label="Nacionalidad"
        placeholder="Seleccione una nacionalidad"
        name="nationality"
        defaultSelectedKeys={ ( personalInformation ) ? [ personalInformation.nationality ] : [] }
      >
        { nationalities.map( ( nationality ) => (
          <SelectItem key={ nationality } value={ nationality }>
            { nationality }
          </SelectItem>
        ) ) }
      </Select>

      <Select
        isRequired
        label="Género"
        placeholder="Seleccione un género"
        name="genderId"
        defaultSelectedKeys={ ( personalInformation ) ? [ personalInformation.genderId ] : [] }
      >
        { ( genders?.subparameters ) ? genders.subparameters.map( gender => (
          <SelectItem key={ gender.id } value={ gender.id }>
            { gender.name }
          </SelectItem>
        ) ) : (
          <SelectItem value="loading" key="loading">
            Cargando...
          </SelectItem>
        ) }
      </Select>
      <Select
        isRequired
        label="Extensión"
        placeholder="Seleccione una extensión"
        name="ciExtensionId"
        defaultSelectedKeys={ ( personalInformation ) ? [ personalInformation.ciExtensionId ] : [] }
      >
        { ( ciExtensions?.subparameters ) ? ciExtensions.subparameters.map( extension => (
          <SelectItem key={ extension.id } value={ extension.id }>
            { extension.name }
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
