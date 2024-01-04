import { FormEvent, useEffect } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useAuthStore, useContactInfoStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

export const ContactInfoForm = () => {

  const user = useAuthStore( state => state.user )

  const contactInfo = useContactInfoStore( state => state.contactInfo )
  const findAllContactInfo = useContactInfoStore( state => state.findAll )
  const createContactInfo = useContactInfoStore( state => state.create )
  const updateContactInfo = useContactInfoStore( state => state.update )
  const error = useContactInfoStore( state => state.error )
  const isLoading = useContactInfoStore( state => state.isLoading )
  const clearError = useContactInfoStore( state => state.clearError )
  const contactInformation = contactInfo.find( contact => contact.userId === user?.id )

  useEffect( () => {
    findAllContactInfo()
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
      phone,
      landline,
      department,
      address,
      city
    } = event.target as HTMLFormElement
    const data = {
      phone: phone.value,
      landline: landline.value,
      department: department.value,
      address: address.value,
      city: city.value,
      userId: user?.id || ''
    }
    if ( contactInformation ) {
      const isUpdated = await updateContactInfo( contactInformation.id, data )
      if ( isUpdated ) {
        Swal.fire({
          title: 'Exito!',
          text: 'La Información de contacto se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      return
    } 
    const isCreated = await createContactInfo( data )
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'La Información de contacto se ha actualizado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  const departments = [
    'La Paz',
    'Cochabamba',
    'Santa Cruz',
    'Oruro',
    'Potosí',
    'Chuquisaca',
    'Tarija',
    'Beni',
    'Pando'
  ]

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Input
        isRequired
        type="number"
        label="Teléfono Celular"
        variant="bordered"
        name="phone"
        defaultValue={ contactInformation?.phone }
      />
      <Input
        isRequired
        type="number"
        label="Teléfono Fijo"
        variant="bordered"
        name="landline"
        defaultValue={ contactInformation?.landline }
      />
      <Select
        isRequired
        label="Departamento"
        variant="bordered"
        name="department"
        placeholder="Seleccionar"
        defaultSelectedKeys={ ( contactInformation ) ? [ contactInformation.department ] : [] }
      >
        { departments.map( ( department, index ) => (
          <SelectItem key={ index } value={ department }>
            { department }
          </SelectItem>
        ) ) }
      </Select>
      <Input
        isRequired
        type="text"
        label="Dirección"
        variant="bordered"
        name="address"
        defaultValue={ contactInformation?.address }
      />
      <Input
        isRequired
        type="text"
        label="Ciudad"
        variant="bordered"
        name="city"
        defaultValue={ contactInformation?.city }
      />
      <Button color="primary" variant="shadow" type="submit">
        Actualizar
      </Button>
    </form>
  )
}
