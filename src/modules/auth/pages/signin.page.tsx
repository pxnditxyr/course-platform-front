import { useState } from 'react';
import { AuthLayout } from '..'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons';

export const SigninPage = () => {

  const [ isVisible, setIsVisible ] = useState( false )
  const toggleVisibility = () => setIsVisible( !isVisible )

  return (
    <AuthLayout title="Iniciar Sesión">
      <div className="flex flex-col items-center gap-8 py-8">
        <form className="flex flex-col items-center w-full gap-8 py-4">
          <Input
            isClearable
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
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
          <Button color="primary" variant="ghost">
            Iniciar Sesión
          </Button>  
        </form>
      </div>
    </AuthLayout>
  )
}
