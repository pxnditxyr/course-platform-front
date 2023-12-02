import { PublicNavbar } from "../../../components"

interface IAuthLayoutProps {
  children?: JSX.Element | JSX.Element[]
  title?: string
}

export const AuthLayout = ( { children, title }: IAuthLayoutProps ) => {
  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <PublicNavbar />
      <div className="flex flex-col items-center w-full gap-8 py-8">
        <h1 className="text-4xl font-bold text-center"> Bienvenido a Kantuta Group S.C. </h1>
        <h2 className="text-2xl font-bold text-center"> { title } </h2>
      </div>
      <div className="flex flex-col items-center gap-8 py-4">
        <div className="flex flex-wrap justify-center items-center gap-8 p-8 bg-white/10 rounded-md">
          <div
            className="w-[300px] h-[100px]"
            style={{
              backgroundImage: `url(/images/logo.jpeg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          { children }
        </div>
      </div>
    </div>
  )
}
