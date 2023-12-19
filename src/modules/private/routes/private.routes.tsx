import { Route, Routes } from 'react-router-dom'
import { useAuthStore } from '../../../stores'
import { AdminRoutes } from '../../admin'

export const PrivateRoutes = () => {

  const user = useAuthStore( state => state.user )

  return (
    <div>
      <Routes>
        {
          ( user?.role === 'ADMIN' ) && (
            <>
              <Route path="/*" element={ <AdminRoutes /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
