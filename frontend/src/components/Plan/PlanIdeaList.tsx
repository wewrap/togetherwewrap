import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './PlanIdeaList.module.css'

export const PlanIdeaList = (): JSX.Element => {
  return (

    <div className={styles.ideaList}>
      <h4 id='idea-list-heading'>Idea list</h4>
      <button className={styles.planBtn}>
        <FontAwesomeIcon icon={icon({ name: 'plus' })} className={styles.faPlus} />
      </button>
      <ul>
        <li>metallica shirt</li>
        <li>new books</li>
        <li>book shelf</li>
        <li>movie tickets</li>
      </ul>
    </div>
  )
}
