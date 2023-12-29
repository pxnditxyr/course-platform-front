import { Navigate, Route, Routes } from 'react-router-dom'
import { CreateParameterPage, DashboardPage, ListParametersPage, UpdateParameterPage, ViewParameterPage } from '../pages'
import { AdminLayout } from '../layout'
import { CreateSubparameterPage, ListSubparametersPage, UpdateSubparameterPage, ViewSubparameterPage } from '../pages/subparameters'

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
                <Route path="create" element={ <CreateParameterPage /> } />
                <Route path="view/:id" element={ <ViewParameterPage /> } />
                <Route path="edit/:id" element={ <UpdateParameterPage /> } />
              </Routes>
            </>
          } />
          <Route path="subparameters/*" element={
            <>
              <Routes>
                <Route path="/" element={ <ListSubparametersPage /> } />
                <Route path="create" element={ <CreateSubparameterPage /> } />
                <Route path="view/:id" element={ <ViewSubparameterPage /> } />
                <Route path="edit/:id" element={ <UpdateSubparameterPage /> } />
              </Routes>
            </>
          } />
          <Route path="/auth/*" element={ <Navigate to="/" /> } />
        </Routes>
      </AdminLayout>
    </div>
  )
}
