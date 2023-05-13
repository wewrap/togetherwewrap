import styles from './PlanHome.module.css'
import editButton from '../../assets/editButton.png'
import addMemberButton from '../../assets/addMemberButton.png'
import { MemberList } from './MemberList'
import { PlanStage } from '../../utils/types'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react'
import { Modal } from '../Modal'
import { removeModal } from '../../utils/removeModal'
import { SearchBar } from './SearchBar'
import { Tag } from './Tag'

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

export const fakeUserData = [
  {
    firstName: 'john',
    email: 'john@gmail.com'
  },
  {
    firstName: 'joe',
    email: 'john@gmail.com'

  },
  {
    firstName: 'sarah',
    email: 'john@gmail.com'
  },
  {
    firstName: 'alex',
    email: 'john@gmail.com'
  },
  {
    firstName: 'kevin',
    email: 'john@gmail.com'
  },
  {
    firstName: 'bob',
    email: 'john@gmail.com'
  },
  {
    firstName: 'jenny',
    email: 'john@gmail.com'
  },
  {
    firstName: 'kim',
    email: 'john@gmail.com'
  }, {
    firstName: 'josh',
    email: 'john@gmail.com'
  },
  {
    firstName: 'edward',
    email: 'john@gmail.com'
  },
  {
    firstName: 'lisett',
    email: 'john@gmail.com'
  },
  {
    firstName: 'jordan',
    email: 'john@gmail.com'
  },
  {
    firstName: 'aden',
    email: 'john@gmail.com'
  }
]

export const PlanHome = (): JSX.Element => {
  const [showInviteModal, setShowInviteModal] = useState<boolean>(true)
  const [selectedContacts, setSelectedContacts] = useState<any>([]);
  // TODO: keep track of max plan participants
  // TODO: prevent plan leader from adding more participants after max participants has reached

  useEffect(() => {
    const handleClickOutsideOfModal = (event: any) => {
      if (showInviteModal && event.target.closest('.clickOutsideOfModal') === null) {
        setShowInviteModal(false)
        removeModal()
      }
    }
    if (showInviteModal) {
      document.addEventListener('mousedown', handleClickOutsideOfModal)
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfModal)
    }
  }, [showInviteModal])

  const handleContactSelect = (singleContact: any) => {
    setSelectedContacts((prev: any) => [...prev, singleContact])
  }

  const handleRemoveContactTag = (contactToBeRemoved: any) => {
    const filteredContacts = selectedContacts.filter(
      (currentContacts: any) =>
        currentContacts.firstName !== contactToBeRemoved.firstName
    )

    setSelectedContacts(filteredContacts)
  }

  const [progressPercentage, taskCompleted] = planProgressCalculator(PlanStage.DELIVERY)
  return (
    <div className={styles.background}>
      {showInviteModal
        ? <Modal>
          <div className={`${styles.inviteModalContainer} clickOutsideOfModal`}>
            <button className={styles.closeButton}
              onClick={() => {
                setShowInviteModal(false);
                removeModal()
              }}> X </button>
            <SearchBar handleSelectChangeFn={handleContactSelect} data={fakeUserData} alreadySelectedData={selectedContacts} />
            <div className={styles.tagAndMessageContainer}>
              <div className={styles.tagContainer}>
                {selectedContacts.map((contact: any) => (
                  <Tag singleDataPoint={contact} handleRemoveTag={handleRemoveContactTag} />
                ))}
              </div>
              <div className={styles.controls}>
                <textarea placeholder='message' className={styles.emailMessage}>
                </textarea>
                <div className={styles.sendButtonContainer}>
                  <button className={styles.sendInviteBtn}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        : null}
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
          <p className={styles.description}>
            Hey guys! Justin is retiring and we are buying him a gift.
            Please let me know if you have any questions. This Wrap will be lead by @Kevdev!
            -Adam
          </p>
        </div>
        <div className={styles.memberListContainer}>
          <h3 className={styles.heading}>
            Group member
          </h3>
          <div className={styles.whiteDivider}></div>
          <div className={`${styles.scrollable} ${styles.memberListWrapper}`}>
            <MemberList members={fakeUserData} />
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
      <section className={styles.progress}>
        <div className={styles.progressContainer}>
          <h5 className={styles.planProgressHeading}>Your Plan's Progress</h5>

          <div className={styles.planChoices}>
            <button>
              <span>BrainStorm</span>
            </button>
            <button>
              <span>Voting</span>
            </button>
            <button>
              <span>Pool</span>
            </button>
            <button>
              <span>Purchase</span>
            </button>
            <button>
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
      {/* <Modal>
        <p> hi </p>
      </Modal> */}
    </div>
  )
}
