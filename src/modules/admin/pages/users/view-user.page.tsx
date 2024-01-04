import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { useBillingStore, useContactInfoStore, useDocumentStore, usePersonalInfoStore, useProgramDetailsStore, useUsersStore, useWorkInfoStore } from '../../../../stores'
import { LoadingPage, SimpleCard, UnexpectedErrorPage } from '../../../../components'
import { serializeDate } from '../../../../utils'
import { Accordion, AccordionItem, Card, CardBody } from '@nextui-org/react'

export const ViewUserPage = () => {
  const location = useLocation()
  const id = atob( location.pathname.split( '/' )[ 3 ] )

  const users = useUsersStore( state => state.users )
  const findAllUsers = useUsersStore( state => state.findAll )
  const isLoading = useUsersStore( state => state.isLoading )
  const error = useUsersStore( state => state.error )
  const clearError = useUsersStore( state => state.clearError )
  const navigate = useNavigate()
  const toggleStatus = useUsersStore( state => state.toggleStatus )
  const user = users.find( user => user.id === id )

  const personalInfo = usePersonalInfoStore( state => state.personalInfo )
  const findAllPersonalInfo = usePersonalInfoStore( state => state.findAll )
  const isLoadingPersonalInfo = usePersonalInfoStore( state => state.isLoading )
  const personalInformation = personalInfo.find( info => info.userId === user?.id )

  const contactInfo = useContactInfoStore( state => state.contactInfo )
  const findAllContactInfo = useContactInfoStore( state => state.findAll )
  const isLoadingContactInfo = useContactInfoStore( state => state.isLoading )
  const contactInformation = contactInfo.find( contact => contact.userId === user?.id )

  const workInfo = useWorkInfoStore( state => state.workInfo )
  const findAllWorkInfo = useWorkInfoStore( state => state.findAll )
  const isLoadingWorkInfo = useWorkInfoStore( state => state.isLoading )
  const workInformation = workInfo.find( info => info.userId === user?.id )

  const billing = useBillingStore( state => state.billing )
  const findAllBillingInfo = useBillingStore( state => state.findAll )
  const isLoadingBillingInfo = useBillingStore( state => state.isLoading )
  const billingInformation = billing.find( info => info.userId === user?.id )

  const programDetails = useProgramDetailsStore( state => state.programDetails )
  const findAllProgramDetails = useProgramDetailsStore( state => state.findAll )
  const isLoadingProgramDetails = useProgramDetailsStore( state => state.isLoading )
  const programDetailsInformation = programDetails.find( info => info.userId === user?.id )

  const documents = useDocumentStore( state => state.documents )
  const findAllDocuments = useDocumentStore( state => state.findAll )
  const isLoadingDocuments = useDocumentStore( state => state.isLoading )
  const documentsInformation = documents.find( info => info.userId === user?.id )

  const onEditClick   = ( id : string ) => navigate( `/users/edit/${ btoa( id ) }` )
  const onDeleteClick = ( id : string ) => toggleStatus( id )

  useEffect( () => {
    findAllUsers()
    findAllPersonalInfo()
    findAllContactInfo()
    findAllWorkInfo()
    findAllBillingInfo()
    findAllProgramDetails()
    findAllDocuments()
  }, [] )

  useEffect( () => {
    if ( error ) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      clearError()
    }
  }, [ error ] )

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  if (
    isLoading || isLoadingPersonalInfo
    || isLoadingContactInfo || isLoadingWorkInfo
    || isLoadingBillingInfo || isLoadingProgramDetails
    || isLoadingDocuments
  ) return ( <LoadingPage /> )

  if ( !user ) return (
    <UnexpectedErrorPage
      title="Usuario no encontrado"
      message="El usuario que estas buscando no existe"
    />
  )


  return (
    <div className="flex flex-col items-center gap-12 py-2 px-12 w-full">
      <h1 className="text-3xl font-bold"> Ver Usuario </h1>
      <div className="flex gap-8 w-full mb-8 flex-wrap justify-center">
        <SimpleCard
          headerKeys={ [ 'name' ] }
          headerTitles={ [ 'Nombre' ] }
          bodyKeys={ [ 'details', 'createdAt', 'updatedAt', 'creator', 'updater' ] }
          bodyTitles={ [ 'Detalles', 'Fecha de creacion', 'Fecha de actualizacion', 'Creado por', 'Actualizado por' ] }
          data={ {
            ...user,
            createdAt: serializeDate( user.createdAt ),
            updatedAt: serializeDate( user.updatedAt ),
            creator: `${ user.creator?.name } - ${ user.creator?.email }`,
            updater: user.updater ? `${ user.updater?.name } - ${ user.updater?.email }` : 'No se ha actualizado',
          } }
          hasImage
          imageKey="imageUrl"
          onEditClick={ onEditClick }
          onDeleteClick={ onDeleteClick }
        />
        <Accordion className="max-w-[400px] w-full">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            subtitle="La informacion personal del usuario"
            title="Informacion Personal"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Nacionalidad: </span>
                  { personalInformation?.nationality }
                </p>
                <p>
                  <span className="font-bold"> Genero: </span>
                  { personalInformation?.gender?.name }
                </p>
                <p>
                  <span className="font-bold"> Extension: </span>
                  { personalInformation?.ciExtension?.name }
                </p>
                <p>
                  <span className="font-bold"> Fecha de Nacimiento: </span>
                  { serializeDate( personalInformation?.birthDate || '' ) }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            subtitle="La informacion de contacto del usuario"
            title="Informacion de contacto"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Celular: </span>
                  { contactInformation?.phone }
                </p>
                <p>
                  <span className="font-bold"> Telefono: </span>
                  { contactInformation?.landline }
                </p>
                <p>
                  <span className="font-bold"> Departamento: </span>
                  { contactInformation?.department }
                </p>
                <p>
                  <span className="font-bold"> Direccion: </span>
                  { contactInformation?.address }
                </p>
                <p>
                  <span className="font-bold"> Ciudad: </span>
                  { contactInformation?.city }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Accordion 3"
            subtitle="La informacion laboral del usuario"
            title="Informacion laboral"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Profesion: </span>
                  { workInformation?.profession }
                </p>
                <p>
                  <span className="font-bold"> institucion: </span>
                  { workInformation?.institutionTitle }
                </p>
                <p>
                  <span className="font-bold"> Direccion Laboral: </span>
                  { workInformation?.jobAddress }
                </p>
                <p>
                  <span className="font-bold"> Cargo: </span>
                  { workInformation?.position }
                </p>
                <p>
                  <span className="font-bold"> Nivel Profesional: </span>
                  { workInformation?.professionLevel?.name }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Accordion 4"
            subtitle="La informacion de facturacion del usuario"
            title="Informacion de facturacion"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Razon Social: </span>
                  { billingInformation?.reason }
                </p>
                <p>
                  <span className="font-bold"> NIT: </span>
                  { billingInformation?.nit }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="Accordion 5"
            subtitle="Los detalles del programa del usuario"
            title="Detalles del programa"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Forma de pago: </span>
                  { programDetailsInformation?.paymentMethod?.name }
                </p>
                <p>
                  <span className="font-bold"> Condicion de inscripcion: </span>
                  { programDetailsInformation?.registrationCondition?.name }
                </p>
                <p>
                  <span className="font-bold"> Como se entero: </span>
                  { programDetailsInformation?.howToFindOut?.name }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
          <AccordionItem
            key="6"
            aria-label="Accordion 6"
            subtitle="Los documentos del usuario"
            title="Documentos"
          >
            <Card>
              <CardBody>
                <p>
                  <span className="font-bold"> Tipo de documento: </span>
                  { documentsInformation?.documentType?.name }
                </p>
                <p>
                  <span className="font-bold"> Documento: </span>
                  {
                    ( documentsInformation?.url ) ? (
                      <a href={ documentsInformation?.url } target="_blank" rel="noreferrer">
                        { documentsInformation?.url }
                      </a>
                    ) : (
                      <span className="text-red-500"> No se ha subido ningun documento </span>
                    )
                  }
                </p>
              </CardBody>
            </Card>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
