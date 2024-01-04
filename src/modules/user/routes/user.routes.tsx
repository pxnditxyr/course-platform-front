import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeUserPage } from '../pages/home.page'
import { ContactUserPage, CoursesUserPage, NewsUserPage } from '../pages'
import { Simple404Page } from '../../../components'
import { MyCoursesPage } from '../pages/my-courses.page'
import { ProfilePage } from '../pages/profile'
import { MyDataPage } from '../pages/my-data.page'

export const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomeUserPage /> } />
        <Route path="my-courses" element={ <MyCoursesPage /> } />
        <Route path="courses" element={ <CoursesUserPage /> } />
        <Route path="news" element={ <NewsUserPage /> } />
        <Route path="contact" element={ <ContactUserPage /> } />
        <Route path="profile" element={ <ProfilePage /> } />
        <Route path="my-data" element={ <MyDataPage /> } />

        <Route path="users/*" element={ <Simple404Page /> } />
        <Route path="parameters/*" element={ <Simple404Page /> } />
        <Route path="subparameters/*" element={ <Simple404Page /> } />
        <Route path="categories/*" element={ <Simple404Page /> } />
        <Route path="courses/*" element={ <Simple404Page /> } />

        <Route path="auth/*" element={ <Navigate to="/" /> } />
        <Route path="*" element={ <Simple404Page /> } />
      </Routes>
    </div>
  )
}
