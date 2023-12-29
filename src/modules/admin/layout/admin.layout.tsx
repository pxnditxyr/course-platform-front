import { useNavigate } from 'react-router-dom'
import { AdminNavbar, BackIcon } from '../../../components'
import { Button } from '@nextui-org/react'

interface IAdminLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export const AdminLayout = ( { children }: IAdminLayoutProps ) => {

  const navigate = useNavigate()
  const onBackClick = () => navigate( -1 )

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminNavbar title={ 'Kantuta Group S.C.' } />
      <div className="flex flex-row w-full py-2 px-8">
        <Button
          isIconOnly
          color="warning"
          variant="faded"
          aria-label="Take a photo"
          onClick={ onBackClick }
        >
          <BackIcon />
        </Button>
      </div>
      <div className="flex flex-col flex-grow w-full gap-4">
        { children }
      </div>
    </div>
  )
}
