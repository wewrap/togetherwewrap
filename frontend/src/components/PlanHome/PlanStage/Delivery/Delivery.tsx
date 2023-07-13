import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, useDisclosure, useToast } from '@chakra-ui/react'
import styles from './Delivery.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { fetchPlanAndContactsData } from '../../../Plan/hook/fetchPlanAndContactsData'
import Confetti from 'react-dom-confetti';

const confettiConfig = {
  angle: 90,
  spread: 140,
  startVelocity: 30,
  elementCount: 200,
  decay: 0.9,
  styles: {
    right: '300px'
  }
};

interface DeliveryProps {
  planID: any // string | undefined
  isCurrentPlanStage: boolean
  isUserPlanLeader: boolean
}

enum DeliveryStatus {
  NOT_PURCHASED = 'NOT_PURCHASED',
  PURCHASED = 'PURCHASED',
  AWAITING_GIFT_DELIVERY = 'AWAITING_GIFT_DELIVERY',
  GIFT_DELIVERED = 'GIFT_DELIVERED'
}

const DELIVERY_FLOW: Record<DeliveryStatus, DeliveryStatus | null> = {
  [DeliveryStatus.NOT_PURCHASED]: DeliveryStatus.PURCHASED,
  [DeliveryStatus.PURCHASED]: DeliveryStatus.AWAITING_GIFT_DELIVERY,
  [DeliveryStatus.AWAITING_GIFT_DELIVERY]: DeliveryStatus.GIFT_DELIVERED,
  [DeliveryStatus.GIFT_DELIVERED]: null
}

export const Delivery = ({ planID, isCurrentPlanStage, isUserPlanLeader }: DeliveryProps): JSX.Element => {
  const [isShootingConfetti, setIsShootingConfetti] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [lastUpdate] = useState(Date.now())
  const { planData, setPlanData } = fetchPlanAndContactsData(planID, lastUpdate)
  const toast = useToast();

  useEffect(() => {
    if (planData?.deliveryStatus === DeliveryStatus.GIFT_DELIVERED) {
      setIsShootingConfetti(true);
    }
  }, [planData])

  const handleUpdateDeliveryStatusToNextStatus = async () => {
    const nextStage = DELIVERY_FLOW[planData.deliveryStatus as DeliveryStatus]
    try {
      const response = await axios.put(`/api/plan/${planID}`, {
        deliveryStatus: nextStage
      }, { withCredentials: true })
      if (response.data.deliveryStatus === DeliveryStatus.GIFT_DELIVERED) {
        setIsShootingConfetti(true);
      }
      setPlanData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (planData === undefined) return (<div>Loading...</div>)

  let progress: number = 0;
  if (planData.deliveryStatus === DeliveryStatus.PURCHASED) progress = 1
  else if (planData.deliveryStatus === DeliveryStatus.AWAITING_GIFT_DELIVERY) progress = 2
  else if (planData.deliveryStatus === DeliveryStatus.GIFT_DELIVERED) progress = 3

  return (
    <div className={styles.stageBackground}>
    <div style={{ position: 'absolute', top: '50px', left: '40%' }}>
        <Confetti active={isShootingConfetti} config={confettiConfig} />
      </div>
      <div className={styles.ProgressContainer}>
        <Progress
          value={(progress / 3) * 100}
          width={730}
          height={30}
          backgroundColor={'blackAlpha.200'}
          borderRadius={20}
          color={'green.100'}
        />
        <div className={styles.progressTextStatusContainer}>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <h3>Gift Purchased</h3>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <h3>Awaiting gift delivery</h3>
          </div>
          <div className={styles.lineContainer}>
            <div className={styles.line}></div>
            <h3>Gift Delivered!</h3>
          </div>
        </div>
        {isUserPlanLeader && isCurrentPlanStage && (
          <div>
            <Button onClick={onOpen} marginTop={14} backgroundColor={'var(--green)'} color={'var(--white)'} padding={7} fontSize={15} _hover={{ background: 'var(--green)' }}
            >Update</Button>
            <Modal
              onClose={onClose}
              isOpen={isOpen}
              motionPreset='slideInBottom'
              closeOnEsc
              blockScrollOnMount
              isCentered
              closeOnOverlayClick={true}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update Delivery Status</ModalHeader>
                <ModalBody>
                  <p>Do you want to update the delivery status to next step?</p>
                </ModalBody>
                <ModalCloseButton />
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                  <Button onClick={async () => {
                    await handleUpdateDeliveryStatusToNextStatus()
                    toast({
                      title: 'Successfully update delivery status',
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                      position: 'bottom',
                      variant: 'solid',
                      colorScheme: 'green'
                    });

                    onClose()
                  }} ml={3} >update</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        )}
      </div>
    </div>
  )
}
