import { useState } from 'react';
import { AuthLayout } from '..'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

export const SignupPage = () => {

  const [ isVisible, setIsVisible ] = useState( false )
  const toggleVisibility = () => setIsVisible( !isVisible )

  return (
    <AuthLayout title="Registrarse">
      <div className="flex flex-col items-center gap-8 py-8">
        <form className="flex flex-col items-center w-full gap-8 py-4">
          <div className="flex items-center w-full gap-8 py-4">
            <Input
              isClearable
              type="email"
              label="Email"
              variant="bordered"
              placeholder="Ingrese su correo electrónico"
              onClear={ () => console.log("input cleared") }
              className="max-w-xs"
            />
            <Input
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  { isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) }
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-xs"
            />
          </div>
          <div className="flex items-center w-full gap-8 py-4">
            <Input
              isClearable
              type="text"
              label="Documento de Identidad"
              variant="bordered"
              placeholder="Ingrese su Cédula de Identidad"
              onClear={ () => console.log("input cleared") }
              className="max-w-xs"
            />
            <Input
              isClearable
              type="text"
              label="Nombre"
              variant="bordered"
              placeholder="Ingrese su nombre"
              onClear={ () => console.log("input cleared") }
              className="max-w-xs"
            />
          </div>
          <div className="flex items-center w-full gap-8 py-4">
            <Input
              isClearable
              type="text"
              label="Apellido Paterno"
              variant="bordered"
              placeholder="Ingrese su apellido paterno"
              onClear={ () => console.log("input cleared") }
              className="max-w-xs"
            />
            <Input
              isClearable
              type="text"
              label="Apellido Materno"
              variant="bordered"
              placeholder="Ingrese su apellido materno"
              onClear={ () => console.log("input cleared") }
              className="max-w-xs"
            />
          </div>
          <Button color="primary" variant="ghost">
            Iniciar Sesión
          </Button>  
        </form>
      </div>
    </AuthLayout>
  )
}

