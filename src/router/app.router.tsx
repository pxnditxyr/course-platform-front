import { Route, Routes } from 'react-router-dom'
import { PublicRoutes } from '../modules'

export const AppRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={ <PublicRoutes /> } />
      </Routes>
    </div>
  )
}
