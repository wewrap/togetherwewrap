import { useState } from 'react'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlanDescription } from './PlanDescription'

interface Pledge {
  leader: string
  friends: string[]
}

export const Plan = (): JSX.Element => {
  const [specialPerson] = useState<string>('Bob Jones')
  const [description] = useState<string>('Bob is clebrating his 25th birthday, lets buy him some gifts');
  const [specialDate] = useState<string>('5-10-23')
  const [pledges] = useState<Pledge>({ leader: 'John', friends: ['claire', 'jake'] })

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
        <PlanDescription description={description} specialDate={specialDate}/>

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
        <div className={styles.pledge_list}>
          <h3 id='pledge'>Pledges</h3>
          <ul className='pledge-accepted'>
            <li>leader: {pledges.leader}</li>
            {pledges.friends.map(friend => (
              <li>{friend}</li>
            ))}
          </ul>
          <h3 id="pending-invites">Pending invites: </h3>
          <ul className='pledge-pending'>
            <li>Nick</li>
            <li>Ana</li>
            <li>emily</li>
            <li>Ed</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
