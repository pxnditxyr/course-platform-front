import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Image, Tooltip } from '@nextui-org/react'

interface IProps {
  headerKeys: string[]
  headerTitles: string[]
  bodyKeys: string[]
  bodyTitles: string[]
  data: Record<string, any>
  hasImage?: boolean
  imageKey?: string
  onEditClick: ( id : string ) => void
  onDeleteClick: ( id : string ) => void
}

const notFoundImage = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
const kantutaIcon = '/images/icon.jpeg'

export const SimpleCard = ( { headerKeys, headerTitles, bodyKeys, bodyTitles, data, onEditClick, onDeleteClick, hasImage, imageKey } : IProps ) => {

  return (
    <Card className="md:min-w-[400px] h-auto">
      <CardHeader className="flex gap-6 py-4 px-8">
        <Image
          alt="kantuta logo"
          radius={ hasImage ? 'md' : 'sm' }
          src={ hasImage ? ( data[ imageKey ?? '' ] ?? notFoundImage ) : kantutaIcon }
          width={ 100 }
          height={ 100 }
        />
        <div className="flex flex-col gap-2">
          {
            headerKeys.map( ( key, index ) => (
              <p key={ index } className="text-md font-bold flex gap-2 items-center"> { headerTitles[ index ] }: 
                <span className="text-md text-default-500"> { data[ key ] } </span>
              </p>
            ) )
          }
          <p className="text-sm font-bold text-default-500 flex gap-2 items-center"> Estado: 
            <Chip
              color={ data.status ? 'success' : 'danger' }
              variant="flat"
            > { data.status ? 'Activo' : 'Inactivo' } </Chip>
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2 py-4 px-8">
        {
          bodyKeys.map( ( key, index ) => (
            <p key={ index } className="text-md font-bold"> { bodyTitles[ index ] }: <span className="text-md text-default-500"> { data[ key ] } </span> </p>
          ) )
        }
      </CardBody>
      <Divider/>
      <CardFooter className="flex gap-3 justify-end py-4 px-8">
        <Tooltip content="Editar">
          <Button onClick={ () => onEditClick( data.id ) } color="warning">
            Editar
          </Button>
        </Tooltip>
        <Tooltip content="Eliminar">
          <Button
            color={ data.status ? 'danger' : 'success' }
            onClick={ () => onDeleteClick( data.id ) }
          >
            { data.status ? 'Desactivar' : 'Activar' }
          </Button>
        </Tooltip>
      </CardFooter>
    </Card>
  )
}
