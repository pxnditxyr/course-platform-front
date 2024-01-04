import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../layout'
import {
  DashboardPage, 
  CreateParameterPage, ListParametersPage, UpdateParameterPage, ViewParameterPage,
  CreateSubparameterPage, ListSubparametersPage, UpdateSubparameterPage, ViewSubparameterPage,
  CreateCategoryPage, ListCategoriesPage, UpdateCategoryPage, ViewCategoryPage,
  ListCoursesPage, CreateCoursePage, ViewCoursePage, UpdateCoursePage,
  ListUsersPage, CreateUserPage, ViewUserPage, UpdateUserPage,
} from '../pages'

export const AdminRoutes = () => {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/" element={ <DashboardPage /> } />
          <Route path="parameters/*" element={
            <Routes>
              <Route path="/" element={ <ListParametersPage /> } />
              <Route path="create" element={ <CreateParameterPage /> } />
              <Route path="view/:id" element={ <ViewParameterPage /> } />
              <Route path="edit/:id" element={ <UpdateParameterPage /> } />
            </Routes>
          } />
          <Route path="subparameters/*" element={
            <Routes>
              <Route path="/" element={ <ListSubparametersPage /> } />
              <Route path="create" element={ <CreateSubparameterPage /> } />
              <Route path="view/:id" element={ <ViewSubparameterPage /> } />
              <Route path="edit/:id" element={ <UpdateSubparameterPage /> } />
            </Routes>
          } />
          <Route path="categories/*" element={
            <Routes>
              <Route path="/" element={ <ListCategoriesPage /> } />
              <Route path="create" element={ <CreateCategoryPage /> } />
              <Route path="view/:id" element={ <ViewCategoryPage /> } />
              <Route path="edit/:id" element={ <UpdateCategoryPage /> } />
            </Routes>
          } />
          <Route path="courses/*" element={
            <Routes>
              <Route path="/" element={ <ListCoursesPage /> } />
              <Route path="create" element={ <CreateCoursePage /> } />
              <Route path="view/:id" element={ <ViewCoursePage /> } />
              <Route path="edit/:id" element={ <UpdateCoursePage /> } />
            </Routes>
          } />
          <Route path="users/*" element={
            <Routes>
              <Route path="/" element={ <ListUsersPage /> } />
              <Route path="create" element={ <CreateUserPage /> } />
              <Route path="view/:id" element={ <ViewUserPage /> } />
              <Route path="edit/:id" element={ <UpdateUserPage /> } />
            </Routes>
          } />
          <Route path="dashboard" element={ <DashboardPage /> } />
          <Route path="/auth/*" element={ <Navigate to="/" /> } />
        </Routes>
      </AdminLayout>
    </div>
  )
}
