import { useLocation } from 'react-router-dom'
import { PublicLayout } from '..'
import { Button, Card, CardFooter, CardHeader, Image, Link } from '@nextui-org/react'
import { useEffect, useState } from 'react'

const categoryCourses = [
  {
    id: 1,
    name: 'Cursos de Programación',
    description: 'Cursos de programación en diferentes lenguajes de programación',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 2,
    name: 'Cursos de Diseño',
    description: 'Cursos de diseño en diferentes herramientas de diseño',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 3,
    name: 'Cursos de Marketing',
    description: 'Cursos de marketing en diferentes herramientas de marketing',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 4,
    name: 'Cursos de Idiomas',
    description: 'Cursos de idiomas en diferentes idiomas',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  },
  {
    id: 5,
    name: 'Diplomados',
    description: 'Diplomados en diferentes áreas',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
  }
]

const coursesData = [
  {
    id: 1,
    name: 'Curso de Programación en Python',
    description: 'Aprende a programar en Python desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 1
  },
  {
    id: 2,
    name: 'Curso de Programación en Java',
    description: 'Aprende a programar en Java desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 1
  },
  {
    id: 3,
    name: 'Curso de Programación en C#',
    description: 'Aprende a programar en C# desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 1
  },
  {
    id: 4,
    name: 'Curso de Programación en PHP',
    description: 'Aprende a programar en PHP desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 2
  },
  {
    id: 5,
    name: 'Curso de Programación en JavaScript',
    description: 'Aprende a programar en JavaScript desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 2
  },
  {
    id: 6,
    name: 'Curso de Programación en TypeScript',
    description: 'Aprende a programar en TypeScript desde cero',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    city: 'Nacional',
    version: '20234',
    startDate: '20-Septiembre-2023',
    categoryId: 2
  },
]

export const CoursesPage = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams( location.search )
  const categoryId = atob( searchParams.get( 'category' ) || '' )
  const [ courses, setCourses ] = useState( coursesData )

  const category = categoryCourses.find( ( categoryCourse ) => categoryCourse.id === Number( categoryId ) )

  useEffect( () => {
    if ( category )
      setCourses( courses.filter( ( course ) => course.categoryId === Number( categoryId ) ) )
  }, [] )
  
  return (
    <PublicLayout title={ `${ ( category ) ? `Cursos de ${ category.name }` : 'Todos los cursos' }` }>
      <div className="flex flex-wrap justify-center items-center gap-12 px-4">
        {
          courses.map( ( course ) => (
            <div key={ course.id }>
              <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 top-0 flex-col items-start bg-white/70">
                  <p className="text-tiny text-gray-800"> Ciudad: { course.city } </p>
                  <p className="text-tiny text-gray-800"> Version: { course.version } </p>
                  <h4 className="text-black font-medium text-2xl"> { course.name } </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card example background"
                  className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                  src={ course.image }
                />
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                  <div>
                    <p className="text-black text-tiny"> Inicio de clases: { course.startDate } </p>
                    <p className="text-black text-tiny"> { course.description } </p>
                  </div>
                  <Button
                    className="text-tiny"
                    color="primary"
                    radius="full"
                    size="sm"
                    as={ Link }
                    href="/auth/signin"
                  >
                    Inscribirme
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) )
        }
      </div>
    </PublicLayout>
  )
}
