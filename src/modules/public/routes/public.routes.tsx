import { Route, Routes } from 'react-router-dom'
import { ContactPage, CoursesPage, HomePage, NewsPage } from '..'

export const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/courses" element={ <CoursesPage /> } />
        <Route path="/contact" element={ <ContactPage /> } />
        <Route path="/news" element={ <NewsPage /> } />
      </Routes>
    </div>
  )
}
