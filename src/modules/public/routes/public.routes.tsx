import { Navigate, Route, Routes } from 'react-router-dom'
import { ContactPage, CoursesPage, HomePage, NewsPage } from '..'
import { AuthRoutes } from '../../auth'
import { Simple404Page } from '../../../components'

export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="courses" element={ <CoursesPage /> } />
        <Route path="contact" element={ <ContactPage /> } />
        <Route path="news" element={ <NewsPage /> } />
        <Route path="auth/*" element={ <AuthRoutes /> } />

        <Route path="categories/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="courses/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="parameters/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="subparameters/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="dashboard/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="users/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="profile/*" element={ <Navigate to="/auth/signin" /> } />
        <Route path="*" element={ <Simple404Page /> } />

        <Route path="my-courses" element={ <Navigate to="/auth/signin" /> } />
        <Route path="profile" element={ <Navigate to="/auth/signin" /> } />
        <Route path="my-data" element={ <Navigate to="/auth/signin" /> } />
      </Routes>
    </div>
  )
}
