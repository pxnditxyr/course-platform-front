import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Tooltip } from '@nextui-org/react'
import Swal from 'sweetalert2'

import { useParametersStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewParameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )
  const parameters = useParametersStore( state => state.parameters )
  const parameter = parameters.find( parameter => parameter.id === id )

  if ( !parameter ) return (
    <UnexpectedErrorPage
      title="Parametro no encontrado"
      message="El parametro que estas buscando no existe"
    />
  )

  const isLoading = useParametersStore( state => state.isLoading )
  const error = useParametersStore( state => state.error )
  const clearError = useParametersStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useParametersStore( state => state.toggleStatus )

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
  const onEditClick   = ( id : string ) => navigate( `/parameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Parametro </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <Card className="min-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="kantuta logo"
              height={ 40 }
              radius="sm"
              src="/public/images/icon.jpeg"
              width={ 40 }
            />
            <div className="flex flex-col gap-2">
              <p className="text-md font-bold"> Nombre: <span className="text-md text-default-500"> { parameter.name } </span> </p>
              <p className="text-sm font-bold text-default-500 flex gap-2 items-center justify-center"> Estado: 
                <Chip
                  color={ parameter.status ? 'success' : 'danger' }
                  variant="flat"
                > { parameter.status ? 'Activo' : 'Inactivo' } </Chip>
              </p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p className="text-md font-bold"> Detalles: <span className="text-md text-default-500"> { parameter.details } </span> </p>
            <p className="text-md font-bold"> Creado por: <span className="text-md text-default-500"> { parameter.creator?.name } - { parameter.creator?.email } </span> </p>
            <p className="text-md font-bold"> Actualizado por: <span className="text-md text-default-500"> { parameter.updater?.name } - { parameter.updater?.email } </span> </p>
            <p className="text-md font-bold"> Fecha de creacion: <span className="text-md text-default-500"> { serializeDate( parameter.createdAt ) } </span> </p>
            <p className="text-md font-bold"> Fecha de actualizacion: <span className="text-md text-default-500"> { serializeDate( parameter.updatedAt ) } </span> </p>
          </CardBody>
          <Divider/>
          <CardFooter className="flex gap-3 justify-end">
            <Tooltip content="Editar">
              <Button onClick={ () => onEditClick( parameter.id ) } color="warning">
                Editar
              </Button>
            </Tooltip>
            <Tooltip content="Eliminar">
              <Button
                color={ parameter.status ? 'danger' : 'success' }
                onClick={ () => onDeleteClick( parameter.id ) }
              >
                { parameter.status ? 'Desactivar' : 'Activar' }
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
