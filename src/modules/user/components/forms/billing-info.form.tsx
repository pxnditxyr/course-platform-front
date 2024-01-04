import { FormEvent, useEffect } from 'react'
import { Button, Input } from '@nextui-org/react'
import { useAuthStore, useBillingStore } from '../../../../stores'
import { LoadingPage } from '../../../../components'
import Swal from 'sweetalert2'

export const BillingInfoForm = () => {

  const user = useAuthStore( state => state.user )

  const billing = useBillingStore( state => state.billing )
  const findAllBillingInfo = useBillingStore( state => state.findAll )
  const createBillingInfo = useBillingStore( state => state.create )
  const updateBillingInfo = useBillingStore( state => state.update )
  const error = useBillingStore( state => state.error )
  const clearError = useBillingStore( state => state.clearError )
  const isLoading = useBillingStore( state => state.isLoading )
  const billingInformation = billing.find( info => info.userId === user?.id )

  useEffect( () => {
    findAllBillingInfo()
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
      nit,
      reason,
    } = event.target as HTMLFormElement
    const data = {
      nit: nit.value,
      reason: reason.value,
      userId: user?.id || ''
    }
    if ( billingInformation ) {
      const isUpdated = await updateBillingInfo( billingInformation.id, data )
      if ( isUpdated ) {
        Swal.fire({
          title: 'Exito!',
          text: 'La Información de facturación se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
      return
    }
    const isCreated = await createBillingInfo( data )
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'La Información de facturación se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <form
      className="flex flex-col gap-8 w-full min-w-[350px]"
      onSubmit={ onSubmit }
    >
      <Input
        isRequired
        type="text"
        label="NIT"
        variant="bordered"
        name="nit"
        defaultValue={ billingInformation?.nit }
      />
      <Input
        isRequired
        type="text"
        label="Razón Social"
        variant="bordered"
        name="reason"
        defaultValue={ billingInformation?.reason }
      />
      <Button color="primary" variant="shadow" type="submit">
        Actualizar
      </Button>
    </form>
  )
}
