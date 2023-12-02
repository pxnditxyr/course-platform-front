import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { PublicLayout } from '..'

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

export const HomePage = () => {

  const navigate = useNavigate()

  const goToCourses = ( id : string ) => {
    navigate( `/courses?category=${ btoa( id ) }` )
  }

  return (
    <PublicLayout title="Bienveido a Kantuta Group S.C.">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center"> Nuestros Cursos </h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-12 px-4">
        {
          categoryCourses.map( ( categoryCourse ) => (
            <div
              key={ categoryCourse.id }
              onClick={ () => goToCourses( categoryCourse.id.toString() ) }
            >
              <Card
                key={ categoryCourse.id }
                className="py-4 px-2 max-w-[300px] w-full transition-all hover:scale-105 cursor-pointer gap-4"
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
                  <h4 className="font-bold text-large"> { categoryCourse.name } </h4>
                  <small className="text-default-500"> { categoryCourse.description } </small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={ categoryCourse.image }
                    width={ 270 }
                  />
                </CardBody>
              </Card>
            </div>
          ) )
        }
      </div>
    </PublicLayout>
  )
}
