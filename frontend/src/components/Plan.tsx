import React from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './Plan.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Plan = (): JSX.Element => {
  return (
    <div className='plan-container'>
      <div className='top-container'>
        <button className='burger-btn'><FontAwesomeIcon icon={icon({ name: 'bars' })} /></button>
        <h1 className='special-person-header'>Special Person: Bob Jones</h1>
        <div className='collected-container'>
          <h4>Amount Collected: 4124</h4>
          <button> <FontAwesomeIcon icon={icon({ name: 'plus' })} /></button>
        </div>
      </div>
      <section className='plan-section'>
        <div id='plan-description'>
          <button>edit</button>
          <article>
            <p id='description'>Bob is clebrating his 25th birthday, lets buy him some gifts</p>
            <div id='special-date'>special date</div>
            <h5>wish list</h5>
            <ul>
              <li>thing 1</li>
              <li>thing 2</li>
              <li>thing 3</li>
            </ul>
          </article>
        </div>

        <div id='idea-list'>
          <h4 id='idea-list-heading'>Idea list</h4>
          <button>add button</button>
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
