import { NextUIProvider } from '@nextui-org/react'
import { AppRouter } from './router'

export const App = () => {

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background min-h-screen w-full">
        <AppRouter />
      </main>
    </NextUIProvider>
  )
}
