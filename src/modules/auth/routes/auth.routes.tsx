import { Route, Routes } from 'react-router-dom'
import { SigninPage, SignupPage  } from '..'

export const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="signin" element={ <SigninPage /> } />
        <Route path="signup" element={ <SignupPage /> } />
      </Routes>
    </div>
  )
}
