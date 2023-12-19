import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage, ListParametersPage } from '../pages'
import { AdminLayout } from '../layout'

export const AdminRoutes = () => {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/" element={ <DashboardPage /> } />
          <Route path="parameters/*" element={
            <>
              <Routes>
                <Route path="/" element={ <ListParametersPage /> } />
                <Route path="create" element={ <h1> Create </h1> } />
                <Route path="view/:id" element={ <h1> View </h1> } />
                <Route path="edit/:id" element={ <h1> Edit </h1> } />
              </Routes>
            </>
          } />
          <Route path="/auth/*" element={ <Navigate to="/" /> } />
        </Routes>
      </AdminLayout>
    </div>
  )
}
