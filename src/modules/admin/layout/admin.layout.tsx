import { AdminNavbar } from '../../../components'

interface IAdminLayoutProps {
  children?: JSX.Element | JSX.Element[]
}

export const AdminLayout = ( { children }: IAdminLayoutProps ) => {

  return (
    <div className="flex flex-col w-full gap-4">
      <AdminNavbar title={ 'Kantuta Group S.C.' } />
      <div className="flex flex-col flex-grow w-full gap-4">
        { children }
      </div>
    </div>
  )
}
