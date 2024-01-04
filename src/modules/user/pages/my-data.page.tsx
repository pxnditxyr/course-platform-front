import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { UserLayout } from '../layout'
import { BillingInfoForm, ContactInfoForm, DocumentsForm, PersonalInfoForm, ProgramDetailsForm, WorkInfoForm } from '../components'
import { useEffect, useState } from 'react'

interface ITab {
  id: string
  label: string
  Form: () => JSX.Element
}

export const MyDataPage = () => {
  let tabs : ITab[] = [
    {
      id: "personal-info",
      label: "Personal",
      Form: PersonalInfoForm
    },
    {
      id: "contact-info",
      label: "Contacto",
      Form: ContactInfoForm
    },
    {
      id: "work-info",
      label: "Laboral",
      Form: WorkInfoForm
    },
    {
      id: "billing-info",
      label: "Facturación",
      Form: BillingInfoForm
    },
    {
      id: "program-details",
      label: "Programa",
      Form: ProgramDetailsForm
    },
    {
      id: "documents",
      label: "Documentos",
      Form: DocumentsForm
    }
  ]

  const [ selectedTab, setSelectedTab ] = useState<string>( localStorage.getItem( 'selectedTab' ) || 'personal-info' )

  const setNewTab = ( tabId : string ) => {
    setSelectedTab( tabId )
  }

  useEffect( () => {
    localStorage.setItem( 'selectedTab', selectedTab )
  }, [ selectedTab ] )


  return (
    <UserLayout title="Mis Datos">
      <div className="flex w-full flex-col items-center gap-8 py-8">
        <Tabs
          aria-label="Dynamic tabs"
          items={ tabs }
          color="success"
          selectedKey={ selectedTab }
          onSelectionChange={ ( key : any ) => {
            setNewTab( key )
          } }
        >

          { ( { id, label, Form } ) => (
            <Tab key={ id } title={ label }>
              <Card>
                <CardBody>
                  { <Form /> }
                </CardBody>
              </Card>  
            </Tab>
          ) }
        </Tabs>
      </div>  
    </UserLayout>
  )
}
