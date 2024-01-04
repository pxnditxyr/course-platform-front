import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, Image } from '@nextui-org/react'

import { UserLayout } from '../layout'
import { useCategoriesStore } from '../../../stores'
import { LoadingPage } from '../../../components'

const notFoundImage = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'

export const HomeUserPage = () => {

  const categoryCourses = useCategoriesStore( ( state ) => state.categories )
  const findAllCategories = useCategoriesStore( ( state ) => state.findAll )
  const isLoading = useCategoriesStore( ( state ) => state.isLoading )

  useEffect( () => {
    findAllCategories()
  }, [] )

  const navigate = useNavigate()
  const goToCourses = ( id : string ) => {
    navigate( `/courses?category=${ btoa( id ) }` )
  }

  if ( isLoading ) return ( <LoadingPage /> )

  return (
    <UserLayout title="Bienveido a Kantuta Group S.C.">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-center"> Nuestros Cursos </h2>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-12 px-4 mb-20">
        {
          categoryCourses
            .filter( c => c.status )
            .map( ( categoryCourse ) => (
              <div
                key={ categoryCourse.id }
                onClick={ () => goToCourses( categoryCourse.id.toString() ) }
              >
                <Card
                  key={ categoryCourse.id }
                  className="py-4 px-2 w-[300px] h-[350px] w-full transition-all hover:scale-105 cursor-pointer gap-4"
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start gap-2">
                    <h4 className="font-bold text-large"> { categoryCourse.name } </h4>
                    <small className="text-default-500"> { categoryCourse.details } </small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex justify-center items-center">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={ categoryCourse.imageUrl || notFoundImage }
                      width={ 270 }
                      height={ 200 }
                    />
                  </CardBody>
                </Card>
              </div>
          ) )
        }
      </div>
    </UserLayout>
  )
}
