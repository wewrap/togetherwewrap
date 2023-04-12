import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlanDescription } from './PlanDescription'
import { Memberslist } from './MembersList'
import { fetchPlanData } from './hook/fetchPlanData'
import { loadingStatus } from '../../utils/loadingStatus'

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

  const [data, status] = fetchPlanData(planID)

  if (status === loadingStatus.LOADING) {
    return (
      <div>
        <p>loading plan</p>
      </div>
    )
  } else if (status === loadingStatus.FAILED) {
    return (
      <div>
        <p>couldn't fetch plan</p>
      </div>
    )
  }

  setSpecialPerson(data?.specialPerson)
  setDescription(data?.description)
  setSpecialDate(data?.specialDate)
  setPledges(data?.pledgeList)

  return (
    <div>
      <div className={styles.top_container}>
        <div className={styles.burger_btn_wrapper}>
          <button className={`${styles.plan_btn} ${styles.burger_btn}`}>
            <FontAwesomeIcon icon={icon({ name: 'bars' })} className={styles.fa_bars} />
          </button>
        </div>
        <div className={styles.special_person_wrapper}>
          <h1 className={styles.special_person}>Special Person: {specialPerson}</h1>
        </div>
        <div className={styles.collected_container}>
          <h4 id={styles.collected_h4}>Amount Collected: 4124</h4>
          <button className={styles.plan_btn}>
            <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.fa_plus} />
          </button>
        </div>
      </div>

      <section className={styles.plan_section}>
        <PlanDescription description={description} specialDate={specialDate} />

        <div className={styles.idea_list}>
          <h4 id='idea-list-heading'>Idea list</h4>
          <button className={styles.plan_btn}>
            <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.fa_plus} />
          </button>
          <ul>
            <li>metallica shirt</li>
            <li>new books</li>
            <li>book shelf</li>
            <li>movie tickets</li>
          </ul>
        </div>
        <Memberslist friends={pledges.friends} leader={pledges.leader} />
      </section>
    </div>
  )
}
