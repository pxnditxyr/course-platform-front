import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react"

import { useAuthStore } from '../../../../stores'

interface IMenuItem {
  title: string
  link?: string
  isDropdown?: boolean
  subItems?: IMenuItem[]
}

const menuData : IMenuItem[] = [
  {
    title: 'Home',
    link: '/'
  },
  {
    title: 'Todos los cursos',
    link: '/courses'
  },
  {
    title: 'Noticias',
    link: '/news'
  },
  {
    title: 'Contactanos',
    link: '/contact'
  },
]

export const UserNavbar = () => {

  const user = useAuthStore( state => state.user )
  const signout = useAuthStore( state => state.signout )
  const [ isMenuOpen, setIsMenuOpen ] = useState<boolean>( false )

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Navbar
      onMenuOpenChange={ setIsMenuOpen }
      maxWidth="full"
      isMenuOpen={ isMenuOpen }
      className="py-4"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={ isMenuOpen ? "Cerrar Menu" : "Abrir Menu" }
          className="sm:hidden"
        />
        <NavbarBrand className="flex gap-4 items-center">
        <div
          style={{
            backgroundImage: 'url(/images/icon.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '90px',
            height: '40px',
            borderRadius: '10px',
          }}
        ></div>
        <p className="font-bold text-inherit hidden lg:block"> Kantuta Group S.C. </p>
      </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          menuData.map( ( item, index ) => (
            <NavbarItem key={ `${ item.title }-${ index }` }>
              {
                ( item.isDropdown && item.subItems ) ? (
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger className={ `cursor-pointer border border-transparent hover:border-secondary-500 rounded-md p-2 ${ item.subItems.some( subitem => subitem.link === location.pathname ) ? 'border-secondary-500' : '' }` }>
                      <p className={ `${ item.subItems.some( subitem => subitem.link === location.pathname ) ? 'text-secondary-500 font-semibold' : 'text-inherit' }` } > { item.title } ▼ </p>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      {
                        item.subItems.map( ( subitem, subindex ) => (
                          <DropdownItem
                            key={ `${ subitem.title }-${ subindex }` }
                            onClick={ () => navigate( subitem.link || "#" ) }
                          >
                            <p className={ `${ subitem.link === location.pathname ? 'text-secondary-500 font-semibold' : 'text-inherit' }` } > { subitem.title || '' } </p>
                          </DropdownItem>
                        ) )
                      }
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Link
                    to={ item.link || '#' }
                    className={ `rounded-md p-2 ${ item.link === location.pathname ? 'text-secondary-500 font-semibold' : 'text-inherit' }` }
                  >
                    { item.title || '' }
                  </Link>
                )
              }
            </NavbarItem>
          ) )
        }
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="info" className="h-14 gap-2">
              <p className="font-semibold"> { user?.name } </p>
              <p className="font-semibold"> { user?.email } </p>
            </DropdownItem>
            <DropdownItem key="profile" onClick={ () => navigate( '/profile' ) } >
              Mi perfil
            </DropdownItem>
            <DropdownItem key="profile" onClick={ () => navigate( '/my-courses' ) } >
              Mis Cursos
            </DropdownItem>
            <DropdownItem key="profile" onClick={ () => navigate( '/my-data' ) } >
              Mis Datos
            </DropdownItem>
            <DropdownItem key="signout" color="danger" onClick={ signout }>
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        { menuData.map( ( item, index ) => (
          <NavbarMenuItem key={`${ item }-${ index }`}>
            {
              ( item.isDropdown && item.subItems ) ? (
                <Dropdown placement="bottom-start">
                  <DropdownTrigger className={ `cursor-pointer border border-transparent hover:border-secondary-500 rounded-md p-2 ${ item.subItems.some( subitem => subitem.link === location.pathname ) ? 'border-secondary-500' : '' }` }>
                    <p className={ `${ item.subItems.some( subitem => subitem.link === location.pathname ) ? 'text-secondary-500 font-semibold' : 'text-inherit' }` }> { item.title } ▼ </p>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    {
                      item.subItems.map( ( subitem, subindex ) => (
                        <DropdownItem
                          key={ `${ subitem.title }-${ subindex }` }
                          onClick={ () => navigate( subitem.link || "#" ) }
                          className={ `${ subitem.link === location.pathname ? 'text-secondary-500 font-semibold' : 'text-inherit' }` }
                        >
                          { subitem.title }
                        </DropdownItem>
                      ) )
                    }
                  </DropdownMenu>
                </Dropdown>
              ) : (
                  <Link to={ item.link || '#' } className={ `rounded-md p-2 ${ item.link === location.pathname ? 'text-secondary-500 font-semibold' : 'text-inherit' }` }>
                    { item.title }
                  </Link>
                )
            }
          </NavbarMenuItem>
        ) ) }
      </NavbarMenu>
    </Navbar>
  )
}
