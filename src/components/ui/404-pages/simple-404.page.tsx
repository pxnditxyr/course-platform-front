import { useNavigate } from 'react-router-dom'

export const Simple404Page = () => {

  const navigate = useNavigate()
  const onGoBackClick = () => navigate( -1 )
  const onGoHomeClick = () => navigate( '/' )

  return (
    <div className="flex flex-col items-center gap-12 py-24 px-8 w-full min-h-screen">
      <div className="flex flex-col gap-12 w-full items-center bg-white rounded-lg shadow-lg p-20 text-gray-900 max-w-3xl">
        <h1 className="text-5xl font-bold"> Error 404 </h1>
        <div className="flex flex-col gap-12 w-full items-center">
          <img src="/images/logo.jpeg" alt="404" className="w-96" />
          <p className="text-2xl"> La pagina que buscas no existe </p>
          <div className="flex gap-4">
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={ onGoBackClick }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Regresar
            </button>
            <button
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={ onGoHomeClick }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Ir al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
