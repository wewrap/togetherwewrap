import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './PlanDescription.module.css'

interface Props {
  description: string
  specialDate: string
}

export const PlanDescription = ({ description, specialDate }: Props): JSX.Element => {
  return (
    <div className={styles.plan_description}>
      <button className={styles.plan_btn}>
        <FontAwesomeIcon icon={icon({ name: 'pen' })} className={styles.fa_pen} />
      </button>
      <article>
        <div className={styles.plan_flex_1}>
          <p id='description'>{description}</p>
          <p id='special-date'>special date: {new Date(specialDate)?.toLocaleDateString()}</p>
          <h5>wish list</h5>
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
