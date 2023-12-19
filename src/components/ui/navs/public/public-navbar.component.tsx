import { useLocation } from 'react-router-dom'
import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'


export const PublicNavbar = () => {

  const location = useLocation()

  return (
    <Navbar isBordered className="px-4 py-4 w-full" maxWidth="full">
      <NavbarBrand className="flex gap-4 items-center">
        <div
          style={{
            backgroundImage: 'url(/images/icon.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '150px',
            height: '60px',
            borderRadius: '10px',
          }}
        ></div>
        <p className="font-bold text-inherit hidden lg:block"> Kantuta Group S.C. </p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <NavbarItem isActive={ location.pathname === '/' }>
          <Link href="/" color={ location.pathname === '/' ? 'primary' : 'foreground' } aria-current={ location.pathname === '/' ? 'page' : undefined }>
            Inicio
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/news' }>
          <Link href="/news" color={ location.pathname === '/news' ? 'primary' : 'foreground' } aria-current={ location.pathname === '/news' ? 'page' : undefined }>
            Noticias
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/courses' }>
          <Link href="/courses" color={ location.pathname === '/courses' ? 'primary' : 'foreground' } aria-current={ location.pathname === '/courses' ? 'page' : undefined }>
            Cursos
          </Link>
        </NavbarItem>
        <NavbarItem isActive={ location.pathname === '/contact' }>
          <Link href="/contact" color={ location.pathname === '/contact' ? 'primary' : 'foreground' } aria-current={ location.pathname === '/contact' ? 'page' : undefined }>
            Contacto
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={ Link } color="primary" href="/auth/signin" variant="flat">
            Iniciar Sesión
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="/auth/signup"> Regístrate </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
