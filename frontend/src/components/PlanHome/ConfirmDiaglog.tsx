import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { useRef } from 'react'
import styles from './ConfirmDiaglog.module.css'

interface ConfirmDiaglogProps {
  buttonName: string
  header: string
  body: string
  onConfirm: () => void
}

export function ConfirmDiaglog({ buttonName, header, body, onConfirm }: ConfirmDiaglogProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <Button onClick={onOpen} className={styles.confirmBtn}>
        {buttonName}
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='green' ml={3} onClick={() => {
              onConfirm()
              onClose()
            }}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
