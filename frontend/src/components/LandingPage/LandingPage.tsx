import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'
import landingPagePeopleJumping from '../../assets/landingPagePeopleJumping.png'

export const LandingPage = (): JSX.Element => {
  return (
    <section className={styles.getStartedSection}>
      <div className={styles.leftSideText}>
        <h2>
          Gifting has never been easier
        </h2>
        <p>
          Say goodbye to the hassle of coordinating group gifts and hello to a seamless
          and efficient way to celebrate special occasions together.
        </p>
        <div className={styles.links}>
          <Link to='/learn-more' className={styles.learnMore}>
            <span>Learn more</span>
          </Link>
          <Link to='/signup' className={styles.getStarted}>
            <span>Get Started</span>
          </Link>
        </div>
      </div>

      <img src={landingPagePeopleJumping} alt='picture of people jumping' />

    </section>
  )
}
