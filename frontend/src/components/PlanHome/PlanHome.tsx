import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import classNames from 'classnames';
import { useParams } from 'react-router-dom'
import styles from './PlanHome.module.css'
import inviteModalStyles from './InviteModal.module.css'
import { MemberList } from './MemberList'
import { type Contact, PlanStage, PlanStageView } from '../../utils/types'
import { useContext, useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { removeModal } from '../../utils/helpers'
import { SearchBar } from './SearchBar'
import { Tag } from './Tag'
import axios, { AxiosError } from 'axios'
import { fetchPlanAndContactsData } from '../Plan/hook/fetchPlanAndContactsData'

import brainstormIcon from '../../assets/Brainstorm_icon.png'
import voteIcon from '../../assets/Vote_icon.png'
import poolIcon from '../../assets/poolMoney_icon.png'
import purchaseGiftIcon from '../../assets/purchaseGift_icon.png'
import deliveryIcon from '../../assets/delivery_icon.png'
import addButton from '../../assets/addButton.png'

import { Brainstorm } from './PlanStage/Brainstorm/Brainstorm'
import { Voting } from './PlanStage/Voting/Voting'
import { Pool } from './PlanStage/Pool/Pool'
import { Purchase } from './PlanStage/Purchase/Purchase'
import { Delivery } from './PlanStage/Delivery'
import { UserContext } from '../UserContext';
import { faCheck, faHouse, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfirmDiaglog } from './ConfirmDiaglog';

/*
  This function is meant to calculate the plan progress
  @param currentStage: the current stage of the plan
  @return [number, number, PlanStage[]]
  @return number: the percentage of the plan progress
  @return number: the number of tasks completed
  @return PlanStage[]: the stages that are accessible to the user
*/
const planProgressCalculator = (currentStage: PlanStage): [number, number, PlanStage[], string] => {
  if (currentStage === undefined) return [0, 0, [PlanStage.BRAINSTORM], 'Plan has just started']
  switch (currentStage) {
    case PlanStage.BRAINSTORM:
      // FIXME: this would only be [PlanStage.BRAINSTORM]
      return [0, 0, [PlanStage.BRAINSTORM], 'Plan has just started'];
    case PlanStage.VOTING:
      return [20, 1, [PlanStage.BRAINSTORM, PlanStage.VOTING], 'Vote for gift ideas!']
    case PlanStage.POOL:
      return [40, 2, [PlanStage.BRAINSTORM, PlanStage.VOTING, PlanStage.POOL], 'Start pledging!']
    case PlanStage.PURCHASE:
      return [60, 3, [PlanStage.BRAINSTORM, PlanStage.VOTING, PlanStage.POOL, PlanStage.PURCHASE], 'Purchase the gift!']
    case PlanStage.DELIVERY:
      return [80, 4, [PlanStage.BRAINSTORM, PlanStage.VOTING, PlanStage.POOL, PlanStage.PURCHASE, PlanStage.DELIVERY], 'Delivery is on the way!']
    case PlanStage.COMPLETED:
      return [100, 5, [PlanStage.BRAINSTORM, PlanStage.VOTING, PlanStage.POOL, PlanStage.PURCHASE, PlanStage.DELIVERY], 'The plan is completed!']
  }
}

export const PlanHome = (): JSX.Element => {
  const [currentPlanStageView, setCurrentPlanStageView] = useState<PlanStageView>(PlanStageView.HOME) // default is home view
  // TODO: keep track of max plan participants
  // TODO: prevent plan leader from adding more participants after max participants has reached
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false)
  const [selectedContacts, setSelectedContacts] = useState<Contact[] | []>([]);
  const [message, setMessage] = useState<string | undefined>()
  const [displayMessage, setDisplayMessage] = useState<string>('');
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const { id: planID } = useParams();
  const {
    planData,
    contactData,
    membershipListData
  } = fetchPlanAndContactsData(planID as string, lastUpdate)
  const currentPlanStage = planData?.stage
  const currentUser = useContext(UserContext)[0]
  const isUserPlanLeader = planData?.members.planLeader.id === currentUser.id
  const [progressPercentage, taskCompleted, accessibleStages, planProgressPhrase] = planProgressCalculator(planData?.stage)

  useEffect(() => {
    const handleClickOutsideOfModal = (event: any) => {
      if (showInviteModal && event.target.closest('.clickOutsideOfModal') === null) {
        handleModalClose();
      }
    }
    if (showInviteModal) {
      document.addEventListener('mousedown', handleClickOutsideOfModal);
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfModal);
    }
    return () => { document.removeEventListener('mousedown', handleClickOutsideOfModal); }
  }, [showInviteModal])

  const handleContactSelect = (singleContact: Contact): void => {
    setSelectedContacts((prev: Contact[]) => [...prev, singleContact])
  }
  const handlePlanStageViewChange = (newStage: PlanStageView) => {
    setCurrentPlanStageView(newStage)
  }

  const handleRemoveContactTag = (contactToBeRemoved: Contact) => {
    const filteredContacts = selectedContacts.filter(
      (currentContacts: Contact) =>
        currentContacts.id !== contactToBeRemoved.id
    )

    setSelectedContacts(filteredContacts)
  }

  const handleModalClose = () => {
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

    if (message === undefined || message === '') {
      showDisplayMessage('Add a message')
      return
    }

    try {
      await axios.post('/api/inviteContacts', {
        selectedContacts,
        message,
        planID
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

  const handlePlanFinishPlanStage = (PlanStageView: PlanStageView) => async (): Promise<void> => {
    try {
      await axios.put(`/api/update-plan-stage/${PlanStageView}`, {
        planID
      }, {
        withCredentials: true
      })
      setLastUpdate(Date.now())
    } catch (error) {
      console.error(error)
    }
  }

  const nextButton = (PlanStageView: PlanStageView): JSX.Element => {
    // BRAINSTORM -> Brainstorm
    const planStageViewString = PlanStageView.charAt(0).toUpperCase() + PlanStageView.slice(1).toLowerCase()
    return (
      <div className={styles.nextBtnContainer}>
        <ConfirmDiaglog
          buttonName={`Finish ${planStageViewString}`}
          header={`Finish Plan ${planStageViewString} Stage`}
          body={'Are you sure you want to finish this plan stage? You will not be able to edit this stage after finishing it.'}
          onConfirm={handlePlanFinishPlanStage(PlanStageView)}
        />
      </div>
    )
  }

  let currentStageViewComponent;

  switch (currentPlanStageView) {
    case PlanStageView.BRAINSTORM:
      currentStageViewComponent = (
        <div className={styles.defaultPlanView}>
          <Brainstorm planID={planID} isCurrentPlanStage={planData.stage === PlanStage.BRAINSTORM} />
          {isUserPlanLeader && planData.stage === PlanStageView.BRAINSTORM && nextButton(PlanStageView.BRAINSTORM)}
        </div>
      )
      break;
    case PlanStageView.VOTING:
      currentStageViewComponent = (
        <div className={styles.defaultPlanView}>
          <Voting planID={planID} isCurrentPlanStage={planData.stage === PlanStage.VOTING} />
          {isUserPlanLeader && planData.stage === PlanStageView.VOTING && nextButton(PlanStageView.VOTING)}
        </div>
      )
      break;
    case PlanStageView.POOL:
      currentStageViewComponent = (
        <div className={styles.defaultPlanView}>
          <Pool planID={planID} isCurrentPlanStage={planData.stage === PlanStage.POOL} isUserPlanLeader={isUserPlanLeader} />
          {isUserPlanLeader && planData.stage === PlanStageView.POOL && nextButton(PlanStageView.POOL)}
        </div>
      )
      break;
    case PlanStageView.PURCHASE:
      currentStageViewComponent = (
        <div className={styles.defaultPlanView}>
          <Purchase planID={planID} isCurrentPlanStage={planData.stage === PlanStage.POOL} isUserPlanLeader={isUserPlanLeader}/>
          {isUserPlanLeader && planData.stage === PlanStageView.PURCHASE && nextButton(PlanStageView.PURCHASE)}
        </div>
      )
      break;
    case PlanStageView.DELIVERY:
      currentStageViewComponent = (
        <div className={styles.defaultPlanView}>
          <Delivery />
          {isUserPlanLeader && planData.stage === PlanStageView.DELIVERY && nextButton(PlanStageView.DELIVERY)}
        </div>
      )
      break;
    case PlanStageView.HOME:
      currentStageViewComponent = null // home view
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
                handleModalClose()
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
                  <button className={classNames(inviteModalStyles.modalPlanButton, inviteModalStyles.cancelButton)} onClick={handleModalClose}>
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
      {currentStageViewComponent ?? ( // if null display the home view, otherwise display the current stage view
        <section className={styles.plan}>
          <div className={styles.planTitleContainer}>
            <p className={styles.planTitle}>{planData?.title}</p>
            <p className={styles.giftEndDate}>Gift due by {planData?.endDate}</p>
          </div>
          <div className={styles.planForContainer}>
            <div>
              <h2 className={styles.heading}>Special Person</h2>
              <h3>{planData?.specialPerson.firstName} {planData?.specialPerson.lastName}</h3>
            </div>
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
              <MemberList memberships={membershipListData} />
            </div>
            <button className={styles.inviteMemberContainer} onClick={() => { setShowInviteModal(!showInviteModal); }}>
              <img src={addButton} />
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
              $-
            </h3>
          </div>

          <div className={styles.roleContainer}>
            <h3 className={styles.heading}>
              Role
            </h3>
            <h3 className={styles.role}>
              {isUserPlanLeader ? 'You are Leader' : 'You are Member'}
            </h3>

          </div>
        </section>
      )
      }
      <section className={styles.progress}>
        <div className={styles.progressContainer}>
          <button
            className={styles.homeBtn}
            onClick={() => {
              setCurrentPlanStageView(PlanStageView.HOME)
            }}
          >
            <FontAwesomeIcon icon={faHouse} size='lg' />
          </button>
          <h5 className={styles.planProgressHeading}>Your Plan's Progress</h5>

          <div className={styles.planChoices}>
            <button
              onClick={() => { handlePlanStageViewChange(PlanStageView.BRAINSTORM); }}
              className={currentPlanStageView === PlanStageView.BRAINSTORM ? styles.isActivePlanStage : undefined}
              disabled={!accessibleStages.includes(PlanStage.BRAINSTORM)}
            >
              {currentPlanStage === PlanStage.BRAINSTORM
                // if current plan stage, then add a pen icon
                ? <FontAwesomeIcon icon={faPen} style={{ color: '#EF476F' }} className={styles.faEllipsis} size='xl' />
                // else if stage has already been completed, add a check icon
                : (accessibleStages.includes(PlanStage.BRAINSTORM) ? <FontAwesomeIcon icon={faCheck} style={{ color: '#06D5A0' }} className={styles.faEllipsis} size='xl' /> : null)
              }
              <img src={brainstormIcon} alt='brainstorm icon' />
              <span>BrainStorm</span>
            </button>
            <button
              onClick={() => { handlePlanStageViewChange(PlanStageView.VOTING); }}
              className={
                classNames({
                  [styles.isActivePlanStage]: currentPlanStageView === PlanStageView.VOTING,
                  [styles.isStageDisabled]: !accessibleStages.includes(PlanStage.VOTING)
                })
              }
              disabled={!accessibleStages.includes(PlanStage.VOTING)}
            >
              {currentPlanStage === PlanStage.VOTING
                // if current plan stage, then add a pen icon
                ? <FontAwesomeIcon icon={faPen} style={{ color: '#EF476F' }} className={styles.faEllipsis} size='xl' />
                // else if stage has already been completed, add a check icon
                : (accessibleStages.includes(PlanStage.VOTING) ? <FontAwesomeIcon icon={faCheck} style={{ color: '#06D5A0' }} className={styles.faEllipsis} size='xl' /> : null)
              }
              <img src={voteIcon} alt='voting icon' />
              <span>Voting</span>
            </button>
            <button
              onClick={() => { handlePlanStageViewChange(PlanStageView.POOL); }}
              className={
                classNames({
                  [styles.isActivePlanStage]: currentPlanStageView === PlanStageView.POOL,
                  [styles.isStageDisabled]: !accessibleStages.includes(PlanStage.POOL)
                })
              }
              disabled={!accessibleStages.includes(PlanStage.POOL)}
            >
              {currentPlanStage === PlanStage.POOL
                // if current plan stage, then add a pen icon
                ? <FontAwesomeIcon icon={faPen} style={{ color: '#EF476F' }} className={styles.faEllipsis} size='xl' />
                // else if stage has already been completed, add a check icon
                : (accessibleStages.includes(PlanStage.POOL) ? <FontAwesomeIcon icon={faCheck} style={{ color: '#06D5A0' }} className={styles.faEllipsis} size='xl' /> : null)
              }
              <img src={poolIcon} alt='pool icon' />
              <span>Pool</span>
            </button>
            <button
              onClick={() => { handlePlanStageViewChange(PlanStageView.PURCHASE); }}
              className={
                classNames({
                  [styles.isActivePlanStage]: currentPlanStageView === PlanStageView.PURCHASE,
                  [styles.isStageDisabled]: !accessibleStages.includes(PlanStage.PURCHASE)
                })
              }
              disabled={!accessibleStages.includes(PlanStage.PURCHASE)}
            >
              {currentPlanStage === PlanStage.PURCHASE
                // if current plan stage, then add a pen icon
                ? <FontAwesomeIcon icon={faPen} style={{ color: '#EF476F' }} className={styles.faEllipsis} size='xl' />
                // else if stage has already been completed, add a check icon
                : (accessibleStages.includes(PlanStage.PURCHASE) ? <FontAwesomeIcon icon={faCheck} style={{ color: '#06D5A0' }} className={styles.faEllipsis} size='xl' /> : null)
              }
              <img src={purchaseGiftIcon} alt='purchase icon' />
              <span>Purchase</span>
            </button>
            <button
              onClick={() => { handlePlanStageViewChange(PlanStageView.DELIVERY); }}
              className={
                classNames({
                  [styles.isActivePlanStage]: currentPlanStageView === PlanStageView.DELIVERY,
                  [styles.isStageDisabled]: !accessibleStages.includes(PlanStage.DELIVERY)
                })
              }
              disabled={!accessibleStages.includes(PlanStage.DELIVERY)}
            >
              {currentPlanStage === PlanStage.DELIVERY
                // if current plan stage, then add a pen icon
                ? <FontAwesomeIcon icon={faPen} style={{ color: '#EF476F' }} className={styles.faEllipsis} size='xl' />
                // else if stage has already been completed, add a check icon
                : (accessibleStages.includes(PlanStage.DELIVERY) ? <FontAwesomeIcon icon={faCheck} style={{ color: '#06D5A0' }} className={styles.faEllipsis} size='xl' /> : null)
              }
              <img src={deliveryIcon} alt='delivery icon' />
              <span>Delivery</span>
            </button>
          </div>
          <div className={styles.progressBarContainer}>
            <p className={styles.progressStatus}>{planProgressPhrase}</p>
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
