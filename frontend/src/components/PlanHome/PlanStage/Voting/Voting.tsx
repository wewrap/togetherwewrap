import classNames from 'classnames'
import styles from './Voting.module.css'
import { Accordion } from '../Accordion/Accordion'
import { fetchBrainStormData } from '../Brainstorm/fetchBrainStormData'

export const Voting = ({ planID }: any): JSX.Element => {
  const { ideaPostsData } = fetchBrainStormData(planID)
  console.log(ideaPostsData)

  return (
    <div className={classNames(styles.scrollable, styles.stageBackground)}>
      <Accordion
        title={(
          <div>
            hi
          </div>
        )}
        content={
          (<div>
            hi
          </div>)
        }
        width={600}
      />
    </div>
  )
}
