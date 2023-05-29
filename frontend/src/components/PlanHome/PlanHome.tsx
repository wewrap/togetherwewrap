import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import classNames from 'classnames';
import { useParams } from 'react-router-dom'
import styles from './PlanHome.module.css'
import inviteModalStyles from './InviteModal.module.css'
import { MemberList } from './MemberList'
import { type Contact, PlanStage, PlanStageView } from '../../utils/types'
import { useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { removeModal } from '../../utils/helpers'
import { SearchBar } from './SearchBar'
import { Tag } from './Tag'
import axios, { AxiosError } from 'axios'
import { contactsMockData } from '../../utils/mockData'
import { fetchPlanAndContactsData } from '../Plan/hook/fetchPlanAndContactsData'

import editButton from '../../assets/editButton.png'
import brainstormIcon from '../../assets/Brainstorm_icon.png'
import voteIcon from '../../assets/Vote_icon.png'
import poolIcon from '../../assets/poolMoney_icon.png'
import purchaseGiftIcon from '../../assets/purchaseGift_icon.png'
import deliveryIcon from '../../assets/delivery_icon.png'
import addMemberButton from '../../assets/addMemberButton.png'

import { Brainstorm } from './PlanStage/Brainstorm'
import { Voting } from './PlanStage/Voting'
import { Pool } from './PlanStage/Pool'
import { Purchase } from './PlanStage/Purchase'
import { Delivery } from './PlanStage/Delivery'

const planProgressCalculator = (currentStage: PlanStage): number[] => {
  switch (currentStage) {
    case PlanStage.UNINITIALIZED:
    case PlanStage.BRAINSTORM:
      return [0, 0]
    case PlanStage.VOTING:
      return [20, 1]
    case PlanStage.POOL:
      return [40, 2]
    case PlanStage.PURCHASE:
      return [60, 3]
    case PlanStage.DELIVERY:
      return [80, 4]
    case PlanStage.COMPLETED:
      return [100, 5]
  }
}

export const PlanHome = (): JSX.Element => {
  const [currentPlanStageView, setCurrentPlanStageView] = useState<PlanStageView>(PlanStageView.HOME)
  // TODO: keep track of max plan participants
  // TODO: prevent plan leader from adding more participants after max participants has reached
  const [progressPercentage, taskCompleted] = planProgressCalculator(PlanStage.DELIVERY)
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [selectedContacts, setSelectedContacts] = useState<Contact[] | []>([]);
  const [message, setMessage] = useState<string | undefined>()
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const { id } = useParams();
  const {
    planData,
    contactData
  } = fetchPlanAndContactsData(id as string)
  useEffect(() => {
    const handleClickOutsideOfModal = (event: any) => {
      if (showInviteModal && event.target.closest('.clickOutsideOfModal') === null) {
        handleDiscardModal()
      }
    }
    if (showInviteModal) {
      document.addEventListener('mousedown', handleClickOutsideOfModal)
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfModal)
    }
  }, [showInviteModal])

  const handleContactSelect = (singleContact: Contact): void => {
    setSelectedContacts((prev: Contact[]) => [...prev, singleContact])
  }
  const handlePlanStageViewChange = (newStage: PlanStageView) => {
    setCurrentPlanStageView(newStage)
  }

  let currentStageRender;

  switch (currentPlanStageView) {
    case PlanStageView.BRAINSTORM:
      currentStageRender = (
        <div className={styles.defaultPlanView}>
          <Brainstorm />
        </div>
      )
      break;
    case PlanStageView.VOTING:
      currentStageRender = (
        <div className={styles.defaultPlanView}>
          <Voting />
        </div>
      )
      break;
    case PlanStageView.POOL:
      currentStageRender = (
        <div className={styles.defaultPlanView}>
          <Pool />
        </div>
      )
      break;
    case PlanStageView.PURCHASE:
      currentStageRender = (
        <div className={styles.defaultPlanView}>
          <Purchase />
        </div>
      )
      break;
    case PlanStageView.DELIVERY:
      currentStageRender = (
        <div className={styles.defaultPlanView}>
          <Delivery />
        </div>
      )
      break;
    case PlanStageView.HOME:
      currentStageRender = null // home view
  }

  const handleRemoveContactTag = (contactToBeRemoved: Contact) => {
    const filteredContacts = selectedContacts.filter(
      (currentContacts: Contact) =>
        currentContacts.id !== contactToBeRemoved.id
    )

    setSelectedContacts(filteredContacts)
  }

  const handleDiscardModal = () => {
    setSelectedContacts([])
    setShowInviteModal(false)
    setMessage(undefined)
    removeModal()
  }

  const handleSubmit = async (): Promise<void> => {
    if (selectedContacts.length === 0) {
      showDisplayMessage('Add at least 1 contact')
      return
    }

    if (message === undefined) {
      showDisplayMessage('Add a message')
      return
    }

    try {
      await axios.post('/api/inviteContacts', {
        selectedContacts,
        message,
        planID: id
      }, {
        withCredentials: true
      })
      // TODO: add 'pending' users to the member list
      showDisplayMessage('Sent successfully')
    } catch (error) {
      if (error instanceof AxiosError) {
        showDisplayMessage('Fail to send. Please retry.')
        // TODO: Add error handling for mutliple simulatenaous invites, aka spamming the send button
        console.error(error?.response?.data)
      }
    }
  }

  // Display a success or error message for 3 seconds
  const showDisplayMessage = (message: string): void => {
    if (displayMessage.length > 0) return // prevent spamming of the display message
    setDisplayMessage(message)
    setTimeout(() => {
      setDisplayMessage('')
    }, 3000)
  }
  return (
    <div className={styles.background}>
      {showInviteModal &&
        <Modal>
          <div className={classNames(inviteModalStyles.inviteModalContainer, 'clickOutsideOfModal')}>
            {
              displayMessage?.length > 0 &&
              <div
                // className={displayMessage.startsWith('Sent') ? `${inviteModalStyles.successMessage}` : `${inviteModalStyles.errorMessage}`}
                className={classNames({
                  [inviteModalStyles.successMessage]: displayMessage.includes('successfully'),
                  [inviteModalStyles.errorMessage]: !displayMessage.includes('successfully')
                })}>
                {displayMessage}
              </div>
            }

            <button className={inviteModalStyles.closeButton}
              onClick={() => {
                handleDiscardModal()
              }}>&times;</button>

            <SearchBar
              handleSelectChangeFn={handleContactSelect}
              data={contactData}
              alreadySelectedData={selectedContacts}
            />

            <div className={inviteModalStyles.tagAndMessageContainer}>
              <div className={inviteModalStyles.tagContainer}>
                {selectedContacts.map((contact: Contact) => (
                  <Tag key={contact.id}
                    contact={contact}
                    handleRemoveTag={handleRemoveContactTag}
                  />
                ))}
              </div>
              <div className={inviteModalStyles.controls}>
                <textarea placeholder='message' className={inviteModalStyles.emailMessage} value={message} onChange={(e) => { setMessage(e.target.value); }}>
                </textarea>
                <div className={inviteModalStyles.sendButtonContainer}>
                  <button className={classNames(inviteModalStyles.modalPlanButton, inviteModalStyles.cancelButton)} onClick={handleDiscardModal}>
                    Cancel
                  </button>
                  <button className={classNames(inviteModalStyles.modalPlanButton, inviteModalStyles.inviteButton)} onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>}
      {currentStageRender ?? (
        <section className={styles.plan}>
          <div className={styles.planTitleContainer}>
            <p className={styles.planTitle}>Write your plan title here</p>
            <p className={styles.giftEndDate}>Gift due by 3-20-23</p>
            <img src={editButton} alt='edit button' className={styles.editButton} />
          </div>
          <div className={styles.pictureContainer}>
            picture
          </div>
          <div className={styles.notesFeedContainer}>
            <h3 className={styles.heading}>
              Notes Feed
            </h3>
            {planData?.description !== undefined &&
              <p className={styles.description}>
                {planData.description}
              </p>
            }
          </div>
          <div className={styles.memberListContainer}>
            <h3 className={styles.heading}>
              Group member
            </h3>
            <div className={styles.whiteDivider}></div>
            <div className={`${styles.scrollable} ${styles.memberListWrapper}`}>
              <MemberList members={contactsMockData} />
            </div>
            <button className={styles.inviteMemberContainer} onClick={() => { setShowInviteModal(!showInviteModal); }}>
              <img src={addMemberButton} />
              <p>
                Invite to group
              </p>
            </button>
          </div>

          <div className={styles.goalContainer}>
            <h3 className={styles.heading}>
              Goal
            </h3>
            <h3 className={styles.goalAmount}>
              $340
            </h3>
          </div>

          <div className={styles.roleContainer}>
            <h3 className={styles.heading}>
              Role
            </h3>

            <h5>
              You are Leader
            </h5>

          </div>
        </section>
      )
      }
      <section className={styles.progress}>
        <div className={styles.progressContainer}>
          <h5 className={styles.planProgressHeading}>Your Plan's Progress</h5>

          <div className={styles.planChoices}>
            <button onClick={() => { handlePlanStageViewChange(PlanStageView.BRAINSTORM); }}
              className={currentPlanStageView === PlanStageView.BRAINSTORM ? styles.isActivePlanStage : undefined}>
              <img src={brainstormIcon} alt='brainstorm icon' />
              <span>BrainStorm</span>
            </button>
            <button onClick={() => { handlePlanStageViewChange(PlanStageView.VOTING); }}
              className={currentPlanStageView === PlanStageView.VOTING ? styles.isActivePlanStage : undefined}>
              <img src={voteIcon} alt='voting icon' />
              <span>Voting</span>
            </button>
            <button onClick={() => { handlePlanStageViewChange(PlanStageView.POOL); }}
              className={currentPlanStageView === PlanStageView.POOL ? styles.isActivePlanStage : undefined}>
              <img src={poolIcon} alt='pool icon' />
              <span>Pool</span>
            </button>
            <button onClick={() => { handlePlanStageViewChange(PlanStageView.PURCHASE); }}
              className={currentPlanStageView === PlanStageView.PURCHASE ? styles.isActivePlanStage : undefined}>
              <img src={purchaseGiftIcon} alt='purchase icon' />
              <span>Purchase</span>
            </button>
            <button onClick={() => { handlePlanStageViewChange(PlanStageView.DELIVERY); }}
              className={currentPlanStageView === PlanStageView.DELIVERY ? styles.isActivePlanStage : undefined}>
              <img src={deliveryIcon} alt='delivery icon' />
              <span>Delivery</span>
            </button>
          </div>
          <div className={styles.progressBarContainer}>
            <p className={styles.progressStatus}>Plan has just started</p>
            <p className={styles.itemsCompleted}>{taskCompleted} out of 5 completed</p>
            <CircularProgressbar
              value={progressPercentage}
              text={`${progressPercentage}%`}
              className={styles.progressBar}
              styles={buildStyles({
                textColor: 'white',
                pathColor: '#FFC43D',
                trailColor: 'white',
                strokeLinecap: 'butt'
              })}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
