import { PublicNavbar, UserNavbar } from '../../../components'

interface IPublicLayoutProps {
  children?: JSX.Element | JSX.Element[]
  title?: string
}

export const UserLayout = ( { children, title } : IPublicLayoutProps ) => {
  
  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      <UserNavbar />
      <div className="w-full h-full py-4">
        <h1 className="text-4xl font-bold text-center"> { ( title ) ? title : 'Kantuta Group S.C.' } </h1>
      </div>
      <div className="w-full h-full flex flex-col items-center gap-12">
        { children }
      </div>
    </div>
  )
}
  
