import React from 'react';

export const Plan = (): JSX.Element => {
  return (
    <div className='plan-container'>
      <div className='plan-hamburger'>hamburger</div>
      <div className='money-container'>
        <h4>Amount Collected</h4>
        <button>+</button>
      </div>
      <h1 className='special-person-header'>Special Person: Bob Jones</h1>
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
          <h4>Idea list</h4>
          <button>add button</button>
          <ul>
            <li>metallica shirt</li>
            <li>new books</li>
            <li>book shelf</li>
            <li>movie tickets</li>
          </ul>
        </div>
        <div id='friend-list'>
          <h3>Pledges</h3>
          <ul>
            <li>leader: John</li>
            <li>claire</li>
            <li>Jake</li>
          </ul>
          <h3>Pending invites: </h3>
          <ul>
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
