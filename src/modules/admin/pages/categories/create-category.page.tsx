import { FormEvent, useEffect } from 'react'
import { useCategoriesStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { Button, Input } from '@nextui-org/react'
import { LoadingPage } from '../../../../components'

export const CreateCategoryPage = () => {

  const create = useCategoriesStore( state => state.create )
  const isLoading = useCategoriesStore( state => state.isLoading )
  const error = useCategoriesStore( state => state.error )
  const clearError = useCategoriesStore( state => state.clearError )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { categoryName, details, imageUrl } = event.target as HTMLFormElement
    const isCreated = await create({
      name: categoryName.value,
      details: details.value,
      imageUrl: imageUrl.value
    })
    if ( !isCreated ) return
    Swal.fire({
      title: 'Exito!',
      text: 'La categoria se ha creado correctamente',
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
      <h1 className="text-3xl font-bold"> Crear Categoria </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <form
          className="flex flex-col gap-8 w-full max-w-lg"
          onSubmit={ onSubmit }
        >
          <Input
            type="text"
            label="Nombre"
            variant="bordered"
            name="categoryName"
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
          />
          {/* <Input */}
          {/*   type="file" */}
          {/*   // label="Imagen" */}
          {/*   variant="bordered" */}
          {/*   name="image" */}
          {/* /> */}
          <Input
            type="text"
            label="Url de la imagen"
            variant="bordered"
            name="imageUrl"
          />
          <Button color="primary" variant="shadow" type="submit">
            Crear
          </Button>
        </form>
      </div>
    </div>
  )
}
