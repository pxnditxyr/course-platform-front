import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'
import { UserRoutes } from '../../user'

export const PrivateRoutes = () => {

  const user = useAuthStore( state => state.user )

  return (
    <div>
      <Routes>
        {
          ( user?.role === 'ADMIN' ) && (
            <Route path="/*" element={ <AdminRoutes /> } />
          )
        }
        {
          ( user?.role === 'USER' ) && (
            <Route path="/*" element={ <UserRoutes /> } />
          )
        }
      </Routes>
    </div>
  )
}
