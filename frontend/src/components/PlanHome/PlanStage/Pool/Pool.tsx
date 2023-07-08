
import { useContext, useEffect, useState } from 'react'
import { fetchPlanAndContactsData } from '../../../Plan/hook/fetchPlanAndContactsData'
import styles from './Pool.module.css'
import classNames from 'classnames'
import {
  Button,
  Progress,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  FormControl,
  FormLabel
} from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { UserContext } from '../../../UserContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons'
const socket = io() // proxied to localhost:8000
interface PoolProps {
  planID: any // string | undefined
  isCurrentPlanStage: boolean
  isUserPlanLeader: boolean
}

export const Pool = ({ planID, isCurrentPlanStage, isUserPlanLeader }: PoolProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [lastUpdate] = useState(Date.now())
  const { planData, setPlanData, membershipListData } = fetchPlanAndContactsData(planID, lastUpdate)
  const [pledgeGoal, setPledgeGoal] = useState(0)
  const [unconfirmedPledges, setUnconfirmedPledges] = useState<any>([])
  const [confirmedPledges, setConfirmedPledges] = useState<any>([])
  const currentUser = useContext(UserContext)[0]
  // isUserPlanLeader = false

  const handleSetGoal = () => {
    socket.emit('handleSetGoal', { data: { ...planData, pledgeGoal } })
  }

  useEffect(() => {
    socket.on('finishedHandleSetGoal', (responseData) => {
      setPlanData(responseData)
    })

    socket.on('finishedHandleUserNotifyMoneySent', (responseData) => {
      console.log('🚀 ~ file: Pool.tsx:57 ~ socket.on ~ responseData:', responseData)
      setUnconfirmedPledges((prev: any) => [...prev, responseData])

    })
  }, [socket])

  useEffect(() => {
    const pledgeData = async () => {
      try {
        const response = await axios.get(`/api/pledge/?planID=${planID}`)
        console.log('🚀 ~ file: Pool.tsx:61 ~ pledgeData ~ response:', response)
        setUnconfirmedPledges(response.data.filter((pledge: any) => pledge.status === 'NOT_CONFIRMED'))
        setConfirmedPledges(response.data.filter((pledge: any) => pledge.status === 'CONFIRMED'))
      } catch (error) {
        console.log(error)
      }
    }

    void pledgeData()

  }, [])

  const handleUserNotifyMoneySent = (platform: string, amount: number) => {
    const currentUserPlanMembership = membershipListData.find((planMembership: any) => planMembership.userID === currentUser.id)
    socket.emit('handleUserNotifyMoneySent', { planData: JSON.stringify(planData), currentUserPlanMembership, platform, amount })
  }

  return (
    <div className={styles.stageBackground}>
      <div className={styles.stageContainer}>
        <section className={styles.received}>
          <div>
            <h2>Received</h2>
          </div>
          <div className={classNames(styles.scrollable, styles.receivedNotificationContainer)}>
            {confirmedPledges?.map((pledge: any) => (
              <div className={styles.notification}>
                {pledge.membership.user.firstName} {pledge.membership.user.lastName} pledged ${pledge.pledgeAmount}
              </div>
            ))}
          </div>
        </section>
        <section className={styles.pledge}>
          <div className={styles.giftData}>
            <h2 className={styles.giftName}>
              gift: {planData?.chosenGiftName}
            </h2>
            <div className={styles.giftProgressContainer}>
              <div className={styles.giftMoneyProgress}>
                <p>
                  current: ${planData?.currentPledgeAmount}
                </p>
                <p>
                  goal ${planData?.pledgeGoal}
                </p>
              </div>
              <Progress height='20px' value={(20 / planData?.pledgeGoal) * 100} />
            </div>

            {isUserPlanLeader &&
              <div>
                <Button className={styles.setGoalBtn} onClick={onOpen}>Set Goal</Button>
                <Modal
                  onClose={onClose}
                  isOpen={isOpen}
                  isCentered closeOnOverlayClick={true}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Set goal amount</ModalHeader>
                    <ModalBody>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          color='gray.300'
                          fontSize='1.2em'
                          children='$'
                        />
                        <Input variant='outline' placeholder='0' onChange={(e) => { setPledgeGoal((prev: number) => parseInt(e.target.value)) }} />
                      </InputGroup>
                    </ModalBody>
                    <ModalCloseButton />
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                      <Button onClick={() => {
                        handleSetGoal()
                        onClose()
                      }} ml={3} >Set</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </div>
            }
          </div>
          {isUserPlanLeader
            ? <LeaderConfirmMoneyReceivedView pledgeData={unconfirmedPledges} />
            : <MemberSendMoneyView handleNotifyFn={handleUserNotifyMoneySent} />
          }
        </section>

      </div>
    </div>
  )
}

const LeaderConfirmMoneyReceivedView = ({ pledgeData }: any): JSX.Element => {
  console.log('🚀 ~ file: Pool.tsx:161 ~ LeaderConfirmMoneyReceivedView ~ pledgeData:', pledgeData)

  return (
    <>
      <div className={styles.LeaderConfirmMoneyReceivedView}>
        <h2>Confirm money</h2>
        <div className={classNames(styles.confirmDiv, styles.scrollable)}>
          {pledgeData?.map((pledge: any) => (
            <div className={styles.confirmCard}>
              <div>
                <p>Received ${pledge.pledgeAmount} {pledge.membership.user.firstName} {pledge.membership.user.lastName} via {pledge.platform}?</p>
              </div>

              {/* <p>amount: ${pledge.pledgeAmount}</p>
            <p>platform: {pledge.platform}</p> */}
              <div className={styles.controlBtns}>
                <button>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const MemberSendMoneyView = ({ handleNotifyFn }: any): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [platform, setPlatform] = useState('');
  const [amount, setAmount] = useState('');

  const handlePlatformChange = (event: any) => { setPlatform(event.target.value); };
  const handleAmountChange = (event: any) => { setAmount(event.target.value); };

  return (
    <div className={styles.sendMoneyContainer}>
      <h1>
        Send money to your Plan leader!
      </h1>
      <div className={styles.leaderPaymentContainer}>
        <p>Venmo: $kv123</p>
        <p>Cashapp: $kv123</p>

      </div>
      <div className={styles.notifyContainer}>
        <h2 >After you have sent your money, notify your Plan leader</h2>
        <Button onClick={onOpen} className={styles.notifyBtn}>Notify</Button>
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          isCentered closeOnOverlayClick={true}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Notify money sent</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel htmlFor="platform">Platform</FormLabel>
                <Select id="platform" placeholder="Select platform" value={platform} onChange={handlePlatformChange}>
                  <option value="venmo">Venmo</option>
                  <option value="cashapp">Cashapp</option>
                  <option value="paypal">Paypal</option>
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                  />
                  <Input id="amount" placeholder="Enter amount" type="number" value={amount} onChange={handleAmountChange} />
                </ InputGroup>
              </FormControl>
            </ModalBody>
            <ModalCloseButton />
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
              <Button onClick={() => {
                handleNotifyFn(platform, parseInt(amount))
                onClose()
              }} ml={3} >Notify</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}
