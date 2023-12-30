import { FormEvent, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import Swal from 'sweetalert2'

import { useCategoriesStore, useCoursesStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'

export const UpdateCoursePage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const courses = useCoursesStore( state => state.courses )
  const findAllCourses = useCoursesStore( state => state.findAll )
  const update = useCoursesStore( state => state.update )
  const isLoading = useCoursesStore( state => state.isLoading )
  const error = useCoursesStore( state => state.error )
  const clearError = useCoursesStore( state => state.clearError )

  const categories = useCategoriesStore( state => state.categories )
  const findAllCategories = useCategoriesStore( state => state.findAll )
  const course = courses.find( ( c => c.id === id ) )

  useEffect( () => {
    findAllCategories()
    findAllCourses()
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
      courseName, details,
      imageUrl, categoryId,
      city, version,
      startDate, endDate
    } = event.target as HTMLFormElement
    await update( id, {
      name: courseName.value,
      details: details.value,
      imageUrl: ( imageUrl.value.length > 0 ) ? imageUrl.value : undefined,
      categoryId: categoryId.value,
      city: city.value,
      version: version.value,
      startDate: new Date( startDate.value ).toISOString(),
      endDate: new Date( endDate.value ).toISOString()
    } )
    Swal.fire({
      title: 'Exito!',
      text: 'El curso se ha actualizado correctamente',
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  if ( isLoading ) return ( <LoadingPage /> )
  if ( !course ) return (
    <UnexpectedErrorPage
      title={ `El curso no existe` }
      message="El curso que intentas actualizar no existe"
    />
  )
  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Actualizar Curso </h1>
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
            defaultValue={ course.name }
          />
          <Input
            type="text"
            label="Detalles"
            variant="bordered"
            name="details"
            defaultValue={ course.details }
          />
          <Select
            isRequired
            label="Categoria del curso"
            placeholder="Seleccione una categoria"
            name="categoryId"
            defaultSelectedKeys={ ( categories.length > 0 ) ? [ course.categoryId ] : [] }
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
            defaultValue={ course.city }
          />
          <Input
            type="text"
            label="Version"
            variant="bordered"
            name="version"
            defaultValue={ course.version }
          />
          <Input
            type="datetime-local"
            label="Fecha de inicio"
            placeholder="Fecha de inicio"
            variant="bordered"
            name="startDate"
            defaultValue={ new Date( course.startDate ).toISOString().slice( 0, 16 ) }
          />
          <Input
            type="datetime-local"
            label="Fecha de finalizacion"
            placeholder="Fecha de finalizacion"
            variant="bordered"
            name="endDate"
            defaultValue={ new Date( course.endDate ).toISOString().slice( 0, 16 ) }
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
            defaultValue={ course.imageUrl || '' }
          />
          <Button color="primary" variant="shadow" type="submit">
            Actualizar
          </Button>
        </form>
      </div>
    </div>
  )
}
