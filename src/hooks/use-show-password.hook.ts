import { useState } from 'react'

export const useShowPassword = () => {

  const [ isVisible, setIsVisible ] = useState<boolean>( false )
  const toggleVisibility = () => setIsVisible( !isVisible )
  return {
    isVisible,
    toggleVisibility,
  }
}
