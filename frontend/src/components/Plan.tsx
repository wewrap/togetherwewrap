import React from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import styles from './Plan.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Plan = (): JSX.Element => {
  'plan-btn burger-btn'
  return (
    <div>
      <div className={styles.top_container}>
        <div className='burger-btn-wrapper'>
          <button className={styles.plan_btn }><FontAwesomeIcon icon={icon({ name: 'bars' })} /></button>
        </div>
        <div id='special-person-wrapper'>
        <h1 className='special-person'>Special Person: Bob Jones</h1>
        </div>
        <div className='collected-container'>
          <h4>Amount Collected: 4124</h4>
          <button className={styles.plan_btn}> <FontAwesomeIcon icon={icon({ name: 'plus' })} /></button>
        </div>
      </div>

      <section className='plan-section'>
        <div id='plan-description'>
          <button className={styles.plan_btn}><FontAwesomeIcon icon={icon({ name: 'pen' })} /></button>
          <article>
            <div className='plan-flex-1'>
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

        <div id='idea-list'>
          <h4 id='idea-list-heading'>Idea list</h4>
          <button className='plan-btn'> <FontAwesomeIcon icon={icon({ name: 'plus' })} /> </button>
          <ul>
            <li>metallica shirt</li>
            <li>new books</li>
            <li>book shelf</li>
            <li>movie tickets</li>
          </ul>
        </div>
        <div id='pledge-list'>
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
