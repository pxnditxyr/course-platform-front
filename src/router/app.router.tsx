import { Route, Routes } from 'react-router-dom'
import { PublicRoutes } from '../modules'
import { useAuthStore } from '../stores'
import { LoadingPage } from '../components'
import { useEffect } from 'react'
import { PrivateRoutes } from '../modules/private/routes/private.routes'

export const AppRouter = () => {

  const status = useAuthStore( state => state.status )
  const checkAuthStatus = useAuthStore( state => state.checkAuthStatus )

  useEffect( () => {
    checkAuthStatus()
  }, [] )

  if ( status === 'pending' ) return ( <LoadingPage /> )

  return (
    <div>
      <Routes>
        {
          ( status === 'unauthenticated' ) ? (
            <>
              <Route path="/*" element={ <PublicRoutes /> } />
            </>
          ) : (
            <>
              <Route path="/*" element={ <PrivateRoutes /> } />
            </>
          )
        }
      </Routes>
    </div>
  )
}
