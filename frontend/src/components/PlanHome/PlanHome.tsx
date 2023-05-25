import styles from './PlanHome.module.css'
import editButton from '../../assets/editButton.png'
import brainstormIcon from '../../assets/Brainstorm_icon.png'
import voteIcon from '../../assets/Vote_icon.png'
import poolIcon from '../../assets/poolMoney_icon.png'
import purchaseGiftIcon from '../../assets/purchaseGift_icon.png'
import deliveryIcon from '../../assets/delivery_icon.png'
import addMemberButton from '../../assets/addMemberButton.png'
import { useParams } from 'react-router-dom'
import { fetchPlanData } from '../Plan/hook/fetchPlanData'
import { LoadStatus } from '../../utils/loadingStatus'
import { fakeUserData } from '../PlanForm'
import { MemberList } from './MemberList'
import { PlanStage, PlanStageView } from '../../utils/types'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState } from 'react'
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
  const [progressPercentage, taskCompleted] = planProgressCalculator(PlanStage.DELIVERY)
  const { id } = useParams();

  // TODO: Make the component load data from backend
  const [, status] = fetchPlanData(id as string)

  if (status === LoadStatus.LOADING || status === LoadStatus.NOT_LOADED) {
    return (
      <div>
        <p>loading plan</p>
      </div>
    )
  } else if (status === LoadStatus.FAILED) {
    return (
      <div>
        <p>couldn't fetch plan</p>
      </div>
    )
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

  return (
    <div className={styles.background}>
      {
        currentStageRender ??
        (
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
              <button className={styles.inviteMemberContainer}>
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
