import { FormEvent, useEffect } from 'react'
import { AuthLayout } from '..'
import { Button, Input } from '@nextui-org/react'
import { EyeFilledIcon, EyeSlashFilledIcon } from '../icons'
import { useAuthStore } from '../../../stores'
import { VioletModal } from '../../../components'
import { useModal, useShowPassword } from '../../../hooks'

export const SigninPage = () => {

  const { isVisible, toggleVisibility } = useShowPassword()
  const signin = useAuthStore( state => state.signin )
  const authError = useAuthStore( state => state.error )
  const clearError = useAuthStore( state => state.clearError )
  const { isOpenModal, onOpenModal, onCloseModal } = useModal({ onCloseCallback: clearError })

  const onSubmit = ( event : FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    const { email, password } = event.target as HTMLFormElement
    signin({ email: email.value, password: password.value })
  }

  useEffect( () => {
    if ( authError ) onOpenModal()
    else onCloseModal()
  }, [ authError ] )

  return (
    <AuthLayout title="Iniciar Sesión">
      <div className="flex flex-col items-center gap-8 py-8">
        <form
          className="flex flex-col items-center w-full gap-8 py-4"
          onSubmit={ onSubmit }
        >
          <Input
            isClearable
            type="email"
            name="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className="max-w-xs"
          />
          <Input
            label="Password"
            variant="bordered"
            name="password"
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
            type={ isVisible ? "text" : "password" }
            className="max-w-xs"
          />
          <Button
            color="primary"
            variant="ghost"
            type="submit"
          >
            Iniciar Sesión
          </Button>  
        </form>
        <VioletModal
          isOpen={ isOpenModal }
          onOpenChange={ onCloseModal }
          title="Error al iniciar sesión"
          content={ String( authError ) }
        />
      </div>
    </AuthLayout>
  )
}
