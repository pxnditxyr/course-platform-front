import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"

interface IVioletModalProps {
  isOpen: boolean
  onOpenChange: () => void
  title: string
  content?: string
}


export const VioletModal = ( { isOpen, onOpenChange, title, content } : IVioletModalProps ) => {
  return (
    <Modal
      backdrop="opaque" 
      isOpen={ isOpen } 
      onOpenChange={ onOpenChange }
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        { ( onClose ) => (
          <>
            <ModalHeader className="flex flex-col gap-1"> { title } </ModalHeader>
            <ModalBody>
              <p> 
                { content }
              </p>
            </ModalBody>
            <ModalFooter>
              {/* <Button */}
              {/*   color="default" */}
              {/*   variant="light" */}
              {/*   onPress={ onClose } */}
              {/*   className="text-white" */}
              {/* > */}
              {/*   Close */}
              {/* </Button> */}
              <Button
                className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20 text-white"
                onPress={ onClose }
                type="submit"
              >
                Cerrar
              </Button>
            </ModalFooter>
          </>
        ) }
      </ModalContent>
    </Modal>
  )
}
