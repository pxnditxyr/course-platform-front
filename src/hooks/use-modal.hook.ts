import { useState } from 'react'

interface IUseModal {
  initialIsOpen?: boolean
  onCloseCallback?: () => void
}


export const useModal = ( { initialIsOpen = false, onCloseCallback = () => {} } : IUseModal ) => {
  const [ isOpenModal, setIsOpenModal ] = useState<boolean>( initialIsOpen )

  const onOpenModal = () => setIsOpenModal( true )
  const onCloseModal = () => {
    setIsOpenModal( false )
    onCloseCallback()
  }

  return {
    isOpenModal,
    onOpenModal,
    onCloseModal,
  }
}
