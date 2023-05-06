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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem suscipit magni repellat architecto fugit vel quasi accusamus laudantium distinctio delectus exercitationem quos soluta, quo explicabo alias eius neque atque est!
        </p>
        <div className={styles.links}>
          <Link to='/learnMore' className={styles.learnMore}>
            <span>Learn more</span>
          </Link>
          <Link to='/getStarted' className={styles.getStarted}>
            <span>Get Started</span>
          </Link>
        </div>
      </div>

      <img src={landingPagePeopleJumping} alt='picture of people jumping' />

    </section>
  )
}
