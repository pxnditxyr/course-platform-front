import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button, Card, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'

import { useCategoriesStore, useCoursesStore } from '../../../stores'
import { LoadingPage } from '../../../components'
import { UserLayout } from '../layout'


const notFoundImage = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

export const CoursesUserPage = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams( location.search )
  const categoryId = atob( searchParams.get( 'category' ) || '' )

  const courses = useCoursesStore( ( state ) => state.courses )
  const findAllCourses = useCoursesStore( ( state ) => state.findAll )
  const isLoading = useCoursesStore( ( state ) => state.isLoading )
  
  const category = useCategoriesStore( ( state ) => state.category )
  const findCategoryById = useCategoriesStore( ( state ) => state.findOne )
  const isLoadingCategory = useCategoriesStore( ( state ) => state.isLoading )

  useEffect( () => {
    if ( categoryId )
      findCategoryById( categoryId )
  }, [] )

  useEffect( () => {
    findAllCourses()
  }, [] )

  if ( isLoading || isLoadingCategory ) return ( <LoadingPage /> )
  
  return (
    <UserLayout title={ `${ ( category ) ? `Cursos de ${ category.name }` : 'Todos los cursos' }` }>
      <div className="flex flex-wrap justify-center items-center gap-12 px-4 py-8 mb-12">
        {
          courses
            .filter( c => c.status )
            .filter( c => ( categoryId ) ? c.categoryId === categoryId : true )
            .map( ( course ) => (
              <div key={ course.id }>
                <Card
                  isFooterBlurred
                  className="w-full h-[300px] col-span-12 sm:col-span-5 w-[400px] transition-all hover:scale-105 cursor-pointer gap-4"
                >
                  <CardHeader className="absolute z-10 top-0 flex-col items-start bg-white/70">
                    <p className="text-tiny text-gray-800"> Ciudad: { course.city } </p>
                    <p className="text-tiny text-gray-800"> Version: { course.version } </p>
                    <h4 className="text-black font-medium text-2xl"> { course.name } </h4>
                  </CardHeader>
                  <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                    src={ course.imageUrl || notFoundImage }
                  />
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                      <p className="text-black text-tiny"> Inicio de clases: { String( new Date( course.startDate ) ) } </p>
                      <p className="text-black text-tiny"> { course.details } </p>
                    </div>
                    <Button
                      className="text-tiny"
                      color="primary"
                      radius="full"
                      size="sm"
                      as={ Link }
                      href={ 'my-data' }
                    >
                      Inscribirme
                    </Button>
                  </CardFooter>
                </Card>
              </div>
          ) )
        }
      </div>
    </UserLayout>
  )
}
