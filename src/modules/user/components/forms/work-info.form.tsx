import { FormEvent, useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useAuthStore, useParametersStore, useWorkInfoStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { LoadingPage } from '../../../../components'

export const WorkInfoForm = () => {

  const user = useAuthStore( state => state.user )
  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )
  const isLoadingParams = useParametersStore( state => state.isLoading )

  const workInfo = useWorkInfoStore( state => state.workInfo )
  const findAllWorkInfo = useWorkInfoStore( state => state.findAll )
  const createWorkInfo = useWorkInfoStore( state => state.create )
  const updateWorkInfo = useWorkInfoStore( state => state.update )
  const error = useWorkInfoStore( state => state.error )
  const clearError = useWorkInfoStore( state => state.clearError )
  const isLoading = useWorkInfoStore( state => state.isLoading )
  const workInformation = workInfo.find( info => info.userId === user?.id )

  useEffect( () => {
    findAllParameters()
    findAllWorkInfo()
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
      profession,
      institutionTitle,
      jobAddress,
      position,
      professionLevelId,
    } = event.target as HTMLFormElement

    const data = {
      profession: profession.value,
      institutionTitle: institutionTitle.value,
      jobAddress: jobAddress.value,
      position: position.value,
      professionLevelId: professionLevelId.value,
      userId: user?.id || ''
    }

    if ( workInformation ) {
      const isUpdated = await updateWorkInfo( workInformation.id, data )
      if ( isUpdated ) {
        Swal.fire({
          title: 'Exito!',
          text: 'La Información Laboral se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    }
    const isCreated = await createWorkInfo( data )
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'La Información Laboral se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  const professionLevels = parameters.find( parameter => parameter.name === 'profession level' )

  if ( isLoading || isLoadingParams ) return ( <LoadingPage /> )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Input
        isRequired
        type="text"
        label="Profesión"
        variant="bordered"
        name="profession"
        defaultValue={ workInformation?.profession }
      />
      <Input
        isRequired
        type="text"
        label="Título Profesional"
        variant="bordered"
        name="institutionTitle"
        defaultValue={ workInformation?.institutionTitle }
      />
      <Input
        isRequired
        type="text"
        label="Dirección Laboral"
        variant="bordered"
        name="jobAddress"
        defaultValue={ workInformation?.jobAddress }
      />
      <Input
        isRequired
        type="text"
        label="Cargo"
        variant="bordered"
        name="position"
        defaultValue={ workInformation?.position }
      />
      <Select
        isRequired
        label="Nivel Profesional"
        placeholder="Seleccione un nivel"
        name="professionLevelId"
        defaultSelectedKeys={ ( workInformation ) ? [ workInformation.professionLevelId ] : [] }
      >
        { ( professionLevels?.subparameters ) ? professionLevels.subparameters.map( level => (
          <SelectItem key={ level.id } value={ level.id }>
            { level.name }
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
