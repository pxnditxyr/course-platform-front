import { Spinner } from '@nextui-org/react'

export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <Spinner />
      <h1 className="text-3xl font-bold text-white animate-pulse">
        Cargando...
      </h1>
    </div>
  )
}
