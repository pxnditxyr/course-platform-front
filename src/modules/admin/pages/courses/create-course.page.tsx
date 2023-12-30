import { FormEvent, useEffect } from 'react'
import { useCategoriesStore, useCoursesStore } from '../../../../stores'
import Swal from 'sweetalert2'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { LoadingPage } from '../../../../components'

export const CreateCoursePage = () => {

  const create = useCoursesStore( state => state.create )
  const isLoading = useCoursesStore( state => state.isLoading )
  const error = useCoursesStore( state => state.error )
  const clearError = useCoursesStore( state => state.clearError )

  const categories = useCategoriesStore( state => state.categories )
  const findAllCategories = useCategoriesStore( state => state.findAll )
  useEffect( () => {
    findAllCategories()
  }, [] )

  const onSubmit = async ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const {
      courseName, details,
      imageUrl, categoryId,
      city, version,
      startDate, endDate
    } = event.target as HTMLFormElement
    const isCreated = await create({
      name: courseName.value,
      details: details.value,
      imageUrl: ( imageUrl.value.length > 0 ) ? imageUrl.value : undefined,
      categoryId: categoryId.value,
      city: city.value,
      version: version.value,
      startDate: new Date( startDate.value ).toISOString(),
      endDate: new Date( endDate.value ).toISOString()
    })
    
    if ( isCreated ) {
      Swal.fire({
        title: 'Exito!',
        text: 'El curso se ha creado correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
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
      <h1 className="text-3xl font-bold"> Crear Curso </h1>
      <div className="flex flex-col gap-4 w-full items-center mb-20">
        <form
          className="flex flex-col gap-8 w-full max-w-lg"
          onSubmit={ onSubmit }
        >
          <Input
            type="text"
            label="Nombre"
            variant="bordered"
            name="courseName"
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
          />
          <Select
            isRequired
            label="Categoria del curso"
            placeholder="Seleccione una categoria"
            name="categoryId"
          >
            { categories.filter( p => p.status ).map( ( category ) => (
              <SelectItem key={ category.id } value={ category.id }>
                { category.name }
              </SelectItem>
            ) ) }
          </Select>
          <Input
            type="text"
            label="Ciudad"
            variant="bordered"
            name="city"
          />
          <Input
            type="text"
            label="Version"
            variant="bordered"
            name="version"
          />
          <Input
            type="datetime-local"
            label="Fecha de inicio"
            placeholder="Fecha de inicio"
            variant="bordered"
            name="startDate"
            defaultValue={ new Date().toISOString().slice( 0, 16 ) }
          />
          <Input
            type="datetime-local"
            label="Fecha de finalizacion"
            placeholder="Fecha de finalizacion"
            variant="bordered"
            name="endDate"
            defaultValue={ new Date().toISOString().slice( 0, 16 ) }
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
