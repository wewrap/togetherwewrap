
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
  console.log('🚀 ~ file: Pool.tsx:40 ~ Pool ~ planData:', planData)
  const [pledgeGoal, setPledgeGoal] = useState(0)
  const [unconfirmedPledges, setUnconfirmedPledges] = useState<any>([])
  const [confirmedPledges, setConfirmedPledges] = useState<any>([])
  const currentUser = useContext(UserContext)[0]

  // isUserPlanLeader = false // For testing purposes

  const handleSetGoal = () => {
    socket.emit('handleSetGoal', { data: { ...planData, pledgeGoal } })
  }

  const handlePledgeMoneyReceivedStatus = (pledgeData: any, confirmationStatus: 'CONFIRMED' | 'DENY' | 'NOT_CONFIRMED') => {
    socket.emit('handlePledgeMoneyReceivedStatus', { pledgeData, confirmationStatus, planData })
  }

  useEffect(() => {
    socket.on('finishedHandleSetGoal', (responseData) => {
      setPlanData(responseData)
    })

    socket.on('finishedHandleUserNotifyMoneySent', (responseData) => {
      console.log('🚀 ~ file: Pool.tsx:57 ~ socket.on ~ responseData:', responseData)
      setUnconfirmedPledges((prev: any) => [...prev, responseData])

    })

    socket.on('finishedHandlePledgeMoneyReceivedStatus', (responseData) => {
      const { updatedPledgeRecord, updatedPlanRecord } = responseData
      if (updatedPledgeRecord.status === 'CONFIRMED') {
        setPlanData(updatedPlanRecord)
        setUnconfirmedPledges((prev: any) => prev.filter((pledge: any) => pledge.id !== updatedPledgeRecord.id))
        setConfirmedPledges((prev: any) => [...prev, updatedPledgeRecord])
      } else {
        setUnconfirmedPledges((prev: any) => prev.filter((pledge: any) => pledge.id !== updatedPledgeRecord.id))
      }
    })
  }, [socket])

  useEffect(() => {
    const pledgeData = async () => {
      try {
        const response = await axios.get(`/api/pledge/?planID=${planID}`)
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
          <div className={styles.receivedDiv}>
            <h2>Received Pledges</h2>
          </div>
          <div className={styles.line}></div>
          <div className={classNames(styles.scrollable, styles.receivedNotificationContainer)}>
            {confirmedPledges?.map((pledge: any) => (
              <div className={styles.notification}>
                <p>
                  {pledge.membership.user.firstName} {pledge.membership.user.lastName} pledged ${pledge.pledgeAmount}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.pledge}>
          <div className={styles.giftData}>
            <h2 className={styles.giftName}>
              Chosen Gift: {planData?.chosenGiftName}
            </h2>
            <div className={styles.line}></div>
            <div className={styles.giftProgressContainer}>
              <div className={styles.giftMoneyProgress}>
                <p>
                  Current: ${planData?.currentPledgeAmount}
                </p>
                <p>
                  Goal: ${planData?.pledgeGoal}
                </p>
              </div>
              <Progress height='20px' value={(planData?.currentPledgeAmount / planData?.pledgeGoal) * 100} animation={'ease'} />
            </div>

            {isUserPlanLeader &&
              <div>
                {isCurrentPlanStage && <Button className={styles.setGoalBtn} onClick={onOpen}>Set Goal</Button>}
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
            ? <LeaderConfirmMoneyReceivedView pledgeData={unconfirmedPledges} handlePledgeMoneyReceivedStatus={handlePledgeMoneyReceivedStatus} isCurrentPlanStage={isCurrentPlanStage} />
            : <MemberSendMoneyView handleNotifyFn={handleUserNotifyMoneySent} planData={planData} isCurrentPlanStage={isCurrentPlanStage} />
          }
        </section>

      </div>
    </div>
  )
}

const LeaderConfirmMoneyReceivedView = ({ pledgeData, handlePledgeMoneyReceivedStatus, isCurrentPlanStage }: any): JSX.Element => {
  console.log('🚀 ~ file: Pool.tsx:161 ~ LeaderConfirmMoneyReceivedView ~ pledgeData:', pledgeData)

  return (
    <>
      <div className={styles.LeaderConfirmMoneyReceivedView}>
        <h2>Confirm money</h2>
        <div className={styles.line}></div>
        <div className={classNames(styles.confirmDiv, styles.scrollable)}>
          {pledgeData?.map((pledge: any) => (
            <div className={styles.confirmCard}>
              <div>
                <p>Received ${pledge.pledgeAmount} {pledge.membership.user.firstName} {pledge.membership.user.lastName} via {pledge.platform}?</p>
              </div>

              {/* <p>amount: ${pledge.pledgeAmount}</p>
            <p>platform: {pledge.platform}</p> */}
              <div className={styles.controlBtns}>
                {isCurrentPlanStage === true &&
                  <div>
                    <button onClick={() => handlePledgeMoneyReceivedStatus(pledge, 'CONFIRMED')}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button onClick={() => handlePledgeMoneyReceivedStatus(pledge, 'DENIED')}>
                      <FontAwesomeIcon icon={faX} />
                    </button>

                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const MemberSendMoneyView = ({ handleNotifyFn, planData, isCurrentPlanStage }: any): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [platform, setPlatform] = useState('');
  const [amount, setAmount] = useState('');

  const handlePlatformChange = (event: any) => { setPlatform(event.target.value); };
  const handleAmountChange = (event: any) => { setAmount(event.target.value); };

  return (
    <div className={styles.sendMoneyContainer}>
      <h2>
        Send money to your Plan leader!
      </h2>
      <div className={styles.line}></div>
      <div className={styles.leaderPaymentContainer}>
        <p>Venmo: ${planData?.members?.planLeader?.venmoID}</p>
        <p>Cashapp: ${planData?.members?.planLeader?.cashappID}</p>
        <p>Paypal: ${planData?.members?.planLeader?.paypalID}</p>
      </div>
      <div className={styles.notifyContainer}>
        <h2 >After you have sent your money, please notify your Plan leader.</h2>
        {isCurrentPlanStage === true &&
          <Button onClick={onOpen} className={styles.notifyBtn}>Notify</Button>
        }
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
