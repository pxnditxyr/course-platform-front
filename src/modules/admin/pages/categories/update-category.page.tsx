import { FormEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'

import Swal from 'sweetalert2'

import { useCategoriesStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'

export const UpdateCategoryPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )
  const update = useCategoriesStore( state => state.update )
  const categories = useCategoriesStore( state => state.categories )

  const category = categories.find( category => category.id === id )

  if ( !category ) return (
    <UnexpectedErrorPage
      title="Categoria no encontrada"
      message="La categoria que estas buscando no existe"
    />
  )

  const isLoading = useCategoriesStore( state => state.isLoading )
  const error = useCategoriesStore( state => state.error )
  const clearError = useCategoriesStore( state => state.clearError )


  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { categoryName, details, imageUrl } = event.target as HTMLFormElement
    await update( id, {
      name: categoryName.value,
      details: details.value,
      imageUrl: imageUrl.value
    } )
    Swal.fire({
      title: 'Exito!',
      text: 'La categoria se ha actualizado correctamente',
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
      <h1 className="text-3xl font-bold"> Actualizar Categoria </h1>
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
            defaultValue={ category.name }
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
            defaultValue={ category.details }
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
            defaultValue={ category.imageUrl || '' }
          />
          <Button color="primary" variant="shadow" type="submit">
            Actualizar
          </Button>
        </form>
      </div>
    </div>
  )
}
