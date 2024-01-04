import { FormEvent, useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useAuthStore, useParametersStore } from '../../../../stores'

export const DocumentsForm = () => {

  const user = useAuthStore( state => state.user )
  const parameters = useParametersStore( state => state.parameters )
  const findAllParameters = useParametersStore( state => state.findAll )

  useEffect( () => {
    findAllParameters()
  }, [] )

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      url,
      documentTypeId,
    } = event.target as HTMLFormElement
    //TODO: use user.id
  }

  const documentTypes = parameters.find( parameter => parameter.name === 'document type' )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Input
        type="text"
        label="Url de la Imagen"
        variant="bordered"
        name="url"
      />
      <Select
        isRequired
        label="Tipo de Documento"
        placeholder="Seleccione un tipo de documento"
        name="documentTypeId"
      >
        { ( documentTypes?.subparameters ) ? documentTypes.subparameters.map( documentType => (
          <SelectItem key={ documentType.id } value={ documentType.id }>
            { documentType.name }
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
