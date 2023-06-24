import { useEffect, useState } from 'react'
import currentPlanImg from '../../assets/current_plan_text.png'
import styles from './Hub.module.css'
import axios from 'axios'
import { type Plan } from '../../utils/types'
import { hubAllPlansMockData } from '../../utils/mockData'
import planBoxWewrapLogo from '../../assets/planBoxWewrapLogo.png'
import hubPlanAddCircleButton from '../../assets/hubPlanAddCircleButton.png'
import { PlanForm } from '../PlanForm'
import { Modal } from '../Modal'
import { removeModal } from '../../utils/helpers'
import classNames from 'classnames'

export const Hub = () => {
  const MAX_PLANS_DISPLAYED = 6
  const [allPlansdata, setAllPlansData] = useState<Plan[]>([])
  const [isDisplayPlanFormModal, setIsDisplayPlanFormModal] = useState<boolean>(false)
  const addPlanToDisplay = MAX_PLANS_DISPLAYED - allPlansdata.length
  // can only allow 6 plans to be displayed at a time
  // TODO: implement function to fetch all plans

  useEffect(() => {
    const fetchAllPlansData = async () => {
      const allPlansData = await axios.get('/api/plan')
      console.log(allPlansData)
    }
    // FIXME: Set the state to the actual response data from the backend
    fetchAllPlansData()
      .then(
        (response: any) => {
          setAllPlansData(hubAllPlansMockData)
        }
      )
      .catch((error: any) => { console.log(error); })
  }, [])

  // useEffect(() => {
  //   const handleClickOutsideOfModal = (event: any) => {
  //     if (isDisplayPlanFormModal && event.target.closest('.clickOutsideOfModal') === null) {
  //       console.log('clicked outside of modal')
  //       handleModalClose()
  //     }
  //   }
  //   if (isDisplayPlanFormModal) {
  //     document.addEventListener('mousedown', handleClickOutsideOfModal)
  //   } else {
  //     document.removeEventListener('mousedown', handleClickOutsideOfModal)
  //   }
  // }, [isDisplayPlanFormModal])

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

            {allPlansdata?.map((plan: Plan, index) => {
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
            ))}

          </div>
        </div>
      </div>
    </>
  )
}
