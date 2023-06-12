import { Accordion } from './Accordion/Accordion'
import styles from './Brainstorm.module.css'
import logoCircleIcon from '../../../assets/logoCircleIcon.png'
import classNames from 'classnames'
import { brainstormIdeasMockData } from '../../../utils/mockData'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { type BrainstormIdeaPost } from '../../../utils/types'

export const Brainstorm = (): JSX.Element | null => {
  // const [description, setDescription] = useState<string>('asdasdasdasd')
  const [currentUserPost, setCurrentUserPost] = useState<BrainstormIdeaPost>({
    id: '',
    authorId: '',
    item: '',
    description: '',
    itemLink: '',
    firstName: '',
    lastName: ''

  })
  // if current user is not owner of accordion, then don't show the save button
  const currentUser = useContext(UserContext)[0]

  useEffect(() => {
    const currentUserIdeaPost: BrainstormIdeaPost | undefined = brainstormIdeasMockData.find(ideaPost => currentUser.id === ideaPost.authorId);
    if (currentUserIdeaPost !== undefined) setCurrentUserPost(prev => currentUserIdeaPost ?? prev)
    console.log(currentUserIdeaPost)
  }, [currentUser])

  const handleDescriptionSave = (ideaPostId: string) => async () => {
    try {
      const response = await axios.put(`/api/brainstorm/${ideaPostId}`, {
        currentUserPost
      })
      setCurrentUserPost(response.data.description)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classNames(styles.scrollable, styles.stageBackground)}>
      <div className={styles.buttonControls}>
        <button className={styles.addBtn}>
          Add
        </button>
      </div>
      {brainstormIdeasMockData.map(ideaPost => {
        const isCurrentUserPost: boolean = currentUser.id === ideaPost.authorId
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
                <h2>Description</h2>
                {/* if current user is the author, then allow the ability to edit/save on an ideaPost post */}
                {isCurrentUserPost
                  ? (
                    <div key={ideaPost.id}>
                      <textarea className={styles.textarea}
                        value={currentUserPost.description}
                        maxLength={300}
                        onChange={(e) => {
                          setCurrentUserPost(prev => ({ ...prev, description: e.target.value }))
                        }}>

                      </textarea>
                      <h2>Link</h2>
                      <input
                        className={styles.itemLinkInput} type="text"
                        value={currentUserPost.itemLink}
                        onChange={(e) => { setCurrentUserPost(prev => ({ ...prev, itemLink: e.target.value })); }
                        } />
                      <div className={styles.saveButtonDiv}>
                        <button className={styles.save} onClick={handleDescriptionSave(ideaPost.id)}>Save</button>
                      </div>
                    </div>
                    )
                  : (
                    <div key={ideaPost.id}>
                      <h3 className={styles.ideaPost}> {ideaPost.description}</h3>
                      <h2>Link</h2>
                      <a
                        href={ideaPost.itemLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.itemLink}>
                        {ideaPost.itemLink}
                      </a>
                    </div>
                    )}
              </div>
            } />
        )
      })}
    </div>
  )
}
