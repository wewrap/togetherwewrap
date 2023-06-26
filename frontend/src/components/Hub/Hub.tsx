import { useEffect, useState } from 'react'
import currentPlanImg from '../../assets/current_plan_text.png'
import styles from './Hub.module.css'
import axios from 'axios'
import { type PlanCard } from '../../utils/types'
import planBoxWewrapLogo from '../../assets/planBoxWewrapLogo.png'
import hubPlanAddCircleButton from '../../assets/hubPlanAddCircleButton.png'
import { PlanForm } from '../PlanForm'
import { Modal } from '../Modal'
import { removeModal } from '../../utils/helpers'
import classNames from 'classnames'

export interface PlanLeaderUserRecord {
  email: string
  firstName: string
  id: string
  lastName: string
}

export interface PlanMembershipRecord {
  id: string
  inviteStatus: string
  planID: string
  role: string
  userID: string
  plan?: PlanCard
}

interface DBResponse {
  planMembership: PlanMembershipRecord
  planLeaderUserRecord: PlanLeaderUserRecord
}

export const Hub = () => {
  const MAX_PLANS_DISPLAYED = 6
  const [allPlansdata, setAllPlansData] = useState<DBResponse[]>([])
  const [isDisplayPlanFormModal, setIsDisplayPlanFormModal] = useState<boolean>(false)
  const addPlanToDisplay = MAX_PLANS_DISPLAYED - allPlansdata.length

  useEffect(() => {
    const fetchAllPlansData = async () => {
      const response = await axios.get('/api/plan')
      return response
    }
    fetchAllPlansData()
      .then(
        (response: any) => {
          console.log(response.data)
          setAllPlansData(response.data)
        }
      )
      .catch((error: any) => { console.log(error); })
  }, [])

  function handleModalClose() {
    setIsDisplayPlanFormModal(false)
    removeModal()
  }

  return (
    <>
      {isDisplayPlanFormModal && (
        <Modal>
          <div className={classNames(styles.planFormModal)}>
            <PlanForm handleModalClose={handleModalClose} />
          </div>
        </Modal>
      )}

      <div className={styles.background}>
        <div className={styles.hubContainer}>
          <div className={styles.currentPlanContainer}>
            <img src={currentPlanImg} alt="current plan" />
          </div>
          <div className={styles.planContainer}>

            {allPlansdata?.map((plan: DBResponse) => {
              // display only 6 plans
              return (
                <a className={styles.planBoxContainer} key={plan.planMembership.id} href={`/plan/${plan.planMembership.plan?.id}`}>
                  <div className={styles.planTitle}>
                    <h3>{plan.planMembership.plan?.title}</h3>
                  </div>
                  <div className={styles.planImageContainer}>
                    <img src={planBoxWewrapLogo} alt='plan-box-logo' />
                  </div>
                  <div className={styles.planBottomPortionContainer}>
                    <img src={planBoxWewrapLogo} alt='plan-box-logo' />
                    <div className={styles.createdBy}>
                      <p>created by {plan.planLeaderUserRecord.firstName} {plan.planLeaderUserRecord.lastName}</p>
                    </div>
                  </div>
                </a>
              )
            })
            }
            {addPlanToDisplay > 0 && Array.from({ length: addPlanToDisplay }, (_, index) => (
              <button
                className={styles.addPlan}
                key={index}
                onClick={() => { setIsDisplayPlanFormModal(true); }}
              >
                <img src={hubPlanAddCircleButton} alt='add-plan' />
              </button>
            ))}

            {/* {allPlansdata?.map((plan: Plan, index) => {
              // display only 6 plans
              return (
                <a className={styles.planBoxContainer} key={plan.id} href={`/plan/${plan.id}`}>
                  <div className={styles.planTitle}>
                    <h3>{plan.title}</h3>
                  </div>
                  <div className={styles.planImageContainer}>
                    <img src={planBoxWewrapLogo} alt='plan-box-logo' />
                  </div>
                  <div className={styles.planBottomPortionContainer}>
                    <img src={planBoxWewrapLogo} alt='plan-box-logo' />
                    <div className={styles.createdBy}>
                      <p>created by Someone Someone</p>
                    </div>
                  </div>
                </a>
              )
            })
            }
            {addPlanToDisplay > 0 && Array.from({ length: addPlanToDisplay }, (_, index) => (
              <button
                className={styles.addPlan}
                key={index}
                onClick={() => { setIsDisplayPlanFormModal(true); }}
              >
                <img src={hubPlanAddCircleButton} alt='add-plan' />
              </button>
            ))} */}

          </div>
        </div>
      </div>
    </>
  )
}
