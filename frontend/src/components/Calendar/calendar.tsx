import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import CalendarDays from './calendardays';
import './calendar.css';

export function Calendar() {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const [currentDay, setCurrentDay] = useState(new Date());

  const changeCurrentDay = (day: { year: number, month: number, number: number | undefined }) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  const nextDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() + 1)));
  }
  const currently = () => {
    setCurrentDay(new Date());
  }

  const previousDay = () => {
    setCurrentDay(new Date(currentDay.setDate(currentDay.getDate() - 1)));
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="title">
          <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
        </div>
        <div className="tools">
          <button className="prev-button" onClick={previousDay}>
            <FontAwesomeIcon icon={faArrowRight} rotation={180} size="lg" />
          </button>
          <button className="today-button" onClick={currently}>
            TODAY
          </button>
          <button className="next-button" onClick={nextDay}>
            <FontAwesomeIcon icon={faArrowRight} size="lg" />
          </button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {
            weekdays.map((weekday) => {
              return weekday === 'Sun' || weekday === 'Sat'
                ? <div className="weekday weekend"><p>{weekday}</p></div>
                : <div className="weekday"><p>{weekday}</p></div>
            })
          }
        </div>
        <div className="calendar-days">
          <CalendarDays day={currentDay} changeCurrentDay={changeCurrentDay} />
          <div className='grey-box'></div>
        </div>
      </div>
    </div>
  )
}
