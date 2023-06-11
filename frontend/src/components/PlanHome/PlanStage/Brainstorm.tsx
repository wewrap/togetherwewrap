import { Accordion } from './Accordion/Accordion'
import styles from './Brainstorm.module.css'
import logoCircleIcon from '../../../assets/logoCircleIcon.png'
import classNames from 'classnames'
import { brainstormIdeasMockData } from '../../../utils/mockData'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'

export const Brainstorm = (): JSX.Element | null => {
  const [description, setDescription] = useState<string>('')
  // if current user is not owner of accordion, then don't show the save button
  const currentUser = useContext(UserContext)[0]

  const handleDescriptionSave = (ideaPostId: string) => async () => {
    try {
      const response = await axios.put(`/api/brainstorm/${ideaPostId}`, {
        description
      })
      setDescription(response.data.description)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classNames(styles.scrollable, styles.stageBackground)}>
      <div className={styles.buttonControls}>
        <button>
          Add
        </button>
      </div>
      {brainstormIdeasMockData.map(ideaPost => {
        return (
          <Accordion title={
            <div className={styles.closeView}>
              <img src={logoCircleIcon} className={styles.logo} />
              <h2>{ideaPost.item}</h2>
              <h2 className={styles.username}>{ideaPost.firstName + ' ' + ideaPost.lastName}</h2>
            </div>
          }
            content={
              <div className={styles.openView}>
                <h2>Description:</h2>
                {/* if current user is the author, then allow the ability to edit/save on an ideaPost post */}
                {currentUser !== null && currentUser.id === ideaPost.userId
                  ? (
                    <div key={ideaPost.id}>
                      <textarea className={styles.textarea}
                        value={ideaPost.description}
                        maxLength={300}
                        onChange={(e) => {
                          setDescription(e.target.value)
                        }}></textarea>
                      <div className={styles.saveButtonDiv}>
                        <button className={styles.save} onClick={handleDescriptionSave(ideaPost.id)}>Save</button>
                      </div>
                    </div>
                    )
                  : (
                    <div key={ideaPost.id}>
                      <h3 className={styles.textarea}> {ideaPost.description}</h3>
                    </div>
                    )}
              </div>
            } />
        )
      })}
    </div>
  )
}
