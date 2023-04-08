import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Plan = (): JSX.Element => {
  // const [description] = useState<any>();
  return (
    <div>
      <div className={styles.top_container}>
        <div className={styles.burger_btn_wrapper}>
          <button className={`${styles.plan_btn} ${styles.burger_btn}`}>
            <FontAwesomeIcon icon={icon({ name: 'bars' })} className={styles.fa_bars} />
          </button>
        </div>
        <div className={styles.special_person_wrapper}>
          <h1 className={styles.special_person}>Special Person: Bob Jones</h1>
        </div>
        <div className={styles.collected_container}>
          <h4 id={styles.collected_h4}>Amount Collected: 4124</h4>
          <button className={styles.plan_btn}>
            <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.fa_plus} />
          </button>
        </div>
      </div>

      <section className={styles.plan_section}>
        <div className={styles.plan_description}>
          <button className={styles.plan_btn}>
            <FontAwesomeIcon icon={icon({ name: 'pen' })} className={styles.fa_pen} />
          </button>
          <article>
            <div className={styles.plan_flex_1}>
              <p id='description'>Bob is clebrating his 25th birthday, lets buy him some gifts</p>
              <div id='special-date'>special date: 5-10-23</div>
              <h5>wish list</h5>
              <ul>
                <li>thing 1</li>
                <li>thing 2</li>
                <li>thing 3</li>
              </ul>
            </div>
          </article>
        </div>

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
            <li>leader: John</li>
            <li>claire</li>
            <li>Jake</li>
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
