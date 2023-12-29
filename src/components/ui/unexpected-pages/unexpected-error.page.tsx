import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  title?: string
  message?: string
}

export const UnexpectedErrorPage = ( { title, message } : IProps ) => {

  const navigate = useNavigate()
  const onBackClick = () => navigate( -1 )

  return (
    <div className="flex flex-col items-center gap-12 p-12 w-full">
      <h1 className="text-3xl font-bold"> { title || 'Error inesperado' } </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        <p className="text-xl"> { message || 'Ha ocurrido un error inesperado' } </p>
        <Button color="primary" variant="shadow" onClick={ onBackClick }>
          Volver atras
        </Button>
      </div>
    </div>
  )
}
