import { useParams } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlanDescription } from './PlanDescription'
import { Memberslist } from './MembersList'
import { fetchPlanData } from './hook/fetchPlanData'
import { LoadStatus } from '../../utils/loadingStatus'
import { PlanIdeaList } from './PlanIdeaList'

export interface Member {
  leader: string
  friends: Friend[]
}

export interface Friend {
  firstName: string
  lastName: string
  id: string
}

export const Plan = (): JSX.Element => {
  const { id } = useParams()

  const [data, status] = fetchPlanData(id as string)

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

  // TODO: Update this data object when the backend returns right shape
  const { specialPerson, description, specialDate, members } = data

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
          <h4 className={styles.collectedH4}>Amount Collected: 4124</h4>
          <button className={styles.planBtn}>
            <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.faPlus} />
          </button>
        </div>
      </div>
      <section className={styles.planSection}>
        <PlanDescription specialPerson={specialPerson} description={description} specialDate={specialDate} />
        <PlanIdeaList />
        <Memberslist friends={members?.friends} leader={members?.leader} />
      </section>
    </div>
  )
}
