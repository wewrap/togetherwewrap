import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './PlanDescription.module.css'

interface PlanDescriptionProps {
  description: string
  specialDate: string
  specialPerson: string
}

export const PlanDescription = ({
  description,
  specialDate,
  specialPerson
}: PlanDescriptionProps): JSX.Element => {
  return (
    <div className={styles.planDescription}>
      <button className={styles.planBtn}>
        <FontAwesomeIcon icon={icon({ name: 'pen' })} className={styles.fa_pen} />
      </button>
      <article>
        <div className={styles.plan_flex_1}>
          <p id='description'>{description}</p>
          <p id='special-date'>special date: {new Date(specialDate)?.toLocaleDateString()}</p>
          <h5>{specialPerson}'s wish list</h5>
          {/* TODO: Create a wishlist component */}
          <ul>
            <li>thing 1</li>
            <li>thing 2</li>
            <li>thing 3</li>
          </ul>
        </div>
      </article>
    </div>
  )
}