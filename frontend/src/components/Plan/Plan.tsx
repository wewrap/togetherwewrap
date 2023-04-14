/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlanDescription } from './PlanDescription'
import { Memberslist } from './MembersList'
import { fetchPlanData } from './hook/fetchPlanData'
import { loadingStatus } from '../../utils/loadingStatus'
import { PlanIdeaList } from './PlanIdeaList'

interface Pledge {
  leader: string
  friends: string[]
}

export const Plan = (): JSX.Element => {
  const [specialPerson, setSpecialPerson] = useState<string>('Bob Jones')
  const [description, setDescription] = useState<string>('Bob is clebrating his 25th birthday, lets buy him some gifts');
  const [specialDate, setSpecialDate] = useState<string>('5-10-23')
  const [pledges, setPledges] = useState<Pledge>({ leader: 'John', friends: ['claire', 'jake'] })

  const { planID } = useParams()

  // const [data, status] = fetchPlanData(planID)

  // if (status === loadingStatus.LOADING) {
  //   return (
  //     <div>
  //       <p>loading plan</p>
  //     </div>
  //   )
  // } else if (status === loadingStatus.FAILED) {
  //   return (
  //     <div>
  //       <p>couldn't fetch plan</p>
  //     </div>
  //   )
  // }

  // setSpecialPerson(data?.specialPerson)
  // setDescription(data?.description)
  // setSpecialDate(data?.specialDate)
  // setPledges(data?.pledgeList)

  return (
    <div>
      <div className={styles.topContainer}>
        <div className={styles.burgerBtnWrapper}>
          <button className={`${styles.planBtn} ${styles.burgerBtn}`}>
            <FontAwesomeIcon icon={icon({ name: 'bars' })} className={styles.faBars} />
          </button>
        </div>
        <div className={styles.specialPersonWrapper}>
          <h1 className={styles.specialPerson}>Special Person: {specialPerson}</h1>
        </div>
        <div className={styles.collectedContainer}>
          <h4 id={styles.collectedH4}>Amount Collected: 4124</h4>
          <button className={styles.planBtn}>
            <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.faPlus} />
          </button>
        </div>
      </div>
      <section className={styles.planSection}>
        <PlanDescription specialPerson={specialPerson} description={description} specialDate={specialDate} />
        <PlanIdeaList />
        <Memberslist friends={pledges.friends} leader={pledges.leader} />
      </section>
    </div>
  )
}
