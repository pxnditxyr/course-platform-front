import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Tooltip } from '@nextui-org/react'
import Swal from 'sweetalert2'

import { useSubparametersStore } from '../../../../stores'
import { LoadingPage, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'

export const ViewSubparameterPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )
  const subparameters = useSubparametersStore( state => state.subparameters )
  const subparameter = subparameters.find( subparameter => subparameter.id === id )

  if ( !subparameter ) return (
    <UnexpectedErrorPage
      title="Parametro no encontrado"
      message="El parametro que estas buscando no existe"
    />
  )

  const isLoading = useSubparametersStore( state => state.isLoading )
  const error = useSubparametersStore( state => state.error )
  const clearError = useSubparametersStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useSubparametersStore( state => state.toggleStatus )

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
  const onEditClick   = ( id : string ) => navigate( `/subparameters/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Subparametro </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <Card className="min-w-[400px]">
          <CardHeader className="flex gap-3 py-4 px-8">
            <Image
              alt="kantuta logo"
              height={ 40 }
              radius="sm"
              src="/public/images/icon.jpeg"
              width={ 40 }
            />
            <div className="flex flex-col gap-2">
              <p className="text-md font-bold"> Nombre: <span className="text-md text-default-500"> { subparameter.name } </span> </p>
              <p className="text-sm font-bold text-default-500 flex gap-2 items-center justify-center"> Estado: 
                <Chip
                  color={ subparameter.status ? 'success' : 'danger' }
                  variant="flat"
                > { subparameter.status ? 'Activo' : 'Inactivo' } </Chip>
              </p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody className="flex flex-col gap-4 p-8">
            <p className="text-md font-bold"> Detalles: <span className="text-md text-default-500"> { subparameter.details } </span> </p>
            <p className="text-md font-bold"> Creado por: <span className="text-md text-default-500"> { subparameter.creator?.name } - { subparameter.creator?.email } </span> </p>
            <p className="text-md font-bold"> Actualizado por: <span className="text-md text-default-500"> { subparameter.updater?.name } - { subparameter.updater?.email } </span> </p>
            <p className="text-md font-bold"> Fecha de creacion: <span className="text-md text-default-500"> { serializeDate( subparameter.createdAt ) } </span> </p>
            <p className="text-md font-bold"> Fecha de actualizacion: <span className="text-md text-default-500"> { serializeDate( subparameter.updatedAt ) } </span> </p>
          </CardBody>
          <Divider/>
          <CardFooter className="flex gap-3 justify-end px-8 py-4">
            <Tooltip content="Editar">
              <Button onClick={ () => onEditClick( subparameter.id ) } color="warning">
                Editar
              </Button>
            </Tooltip>
            <Tooltip content="Eliminar">
              <Button
                color={ subparameter.status ? 'danger' : 'success' }
                onClick={ () => onDeleteClick( subparameter.id ) }
              >
                { subparameter.status ? 'Desactivar' : 'Activar' }
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
