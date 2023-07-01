/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/indent */
import { Accordion } from './Accordion/Accordion'
import styles from './Brainstorm.module.css'
import logoCircleIcon from '../../../../assets/logoCircleIcon.png'
import classNames from 'classnames'
// import { brainstormIdeasMockData } from '../../../../utils/mockData'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../UserContext'
import axios from 'axios'
import { type BrainstormIdeaPost } from '../../../../utils/types'
import { Modal } from '../../../Modal'
import { removeModal } from '../../../../utils/helpers'
import addButton from '../../../../assets/addButton.png'
import { fetchBrainStormData } from './fetchBrainStormData'

interface BrainstormProps {
  planID: string | undefined
}

export const Brainstorm = ({ planID }: BrainstormProps): JSX.Element | null => {
  const [showAddItemModal, setShowAddItemModal] = useState<boolean>(false)
  const [ideaPostSubmission, setIdeaPostSubmission] = useState<any>({
    item: '',
    description: '',
    itemLink: ''
  })
  const [submissionLoading, setSubmissionLoading] = useState<boolean>(false);
  // if current user is not owner of accordion, then don't show the save button
  const currentUser = useContext(UserContext)[0]

  const { ideaPostsData } = fetchBrainStormData(planID)
  console.log('🚀 ~ file: Brainstorm.tsx:33 ~ Brainstorm ~ ideaPostsData:', ideaPostsData)
  const [ideaPosts, setIdeaPosts] = useState<BrainstormIdeaPost[]>([])
  const [test, setTest] = useState<BrainstormIdeaPost[]>([])

  useEffect(() => {
    setIdeaPosts(ideaPostsData)
    // create a currentUserIdeaPosts Array that holds all of the current user posts
    const currentUserIdeaPosts = ideaPostsData?.filter(ideaPost => currentUser.id === ideaPost.authorId);
    setTest(currentUserIdeaPosts ?? [])

    if (ideaPostsData !== undefined) {
      ideaPostsData?.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.item > b.item) {
          return 1;
        }
        return 0;
      })
    }
  }, [ideaPostsData])

  // When user click mouse outside of modal, close the modal
  useEffect(() => {
    const handleClickOutsideOfModal = (event: any) => {
      if (showAddItemModal && event.target.closest('.clickOutsideOfModal') === null) {
        handleDiscardModal()
      }
    }
    if (showAddItemModal) {
      document.addEventListener('mousedown', handleClickOutsideOfModal)
    } else {
      document.removeEventListener('mousedown', handleClickOutsideOfModal)
    }
  }, [showAddItemModal])

  const handleIdeaPostUpdate = (currentPost: BrainstormIdeaPost) => async () => {
    try {
      await axios.put(`/api/brainstorm/${currentPost.id}`, {
        id: currentPost.id,
        item: currentPost.item,
        description: currentPost.description,
        itemLink: currentPost.itemLink,
        planID
      }, { withCredentials: true })
    } catch (error) {
      console.error(error)
    }
  }

  const handleIdeaPostDelete = (currentPost: BrainstormIdeaPost) => async () => {
    try {
      const response = await axios.delete(`/api/brainstorm/${currentPost.id}`, { withCredentials: true })
      console.log(response)
      const returnedIdeaPost = response.data
      setIdeaPosts((prevIdeaPosts: BrainstormIdeaPost[]) => prevIdeaPosts.filter(ideaPost => ideaPost.id !== returnedIdeaPost.id))
    } catch (error) {
      console.error(error)
    }
  }

  function handleDiscardModal() {
    setSubmissionLoading(false)
    setShowAddItemModal(false)
    removeModal()
  }

  const handleIdeaPostCreate = async () => {
    setSubmissionLoading(true)
    if (ideaPostSubmission.item === '' || ideaPostSubmission.description === '' || ideaPostSubmission.itemLink === '') {
      alert('Please fill out all fields')
      setSubmissionLoading(false)
      return
    }
    try {
      const response = await axios.post('/api/brainstorm', {
        ...ideaPostSubmission,
        planID
      }, { withCredentials: true })
      handleDiscardModal()
      console.log(response.data)
      setIdeaPosts((prevIdeaPosts: BrainstormIdeaPost[]) => [...prevIdeaPosts, response.data])
      // TODO: create accordion for new idea post
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className={classNames(styles.scrollable, styles.stageBackground)}>
        {showAddItemModal && (
          <Modal>
            <div className={classNames(styles.addItemModalContainer, 'clickOutsideOfModal')}>
              <button
                onClick={() => {
                  handleDiscardModal()
                }}
                className={styles.closeModalBtn}
              >&times;
              </button>

              <h1 className={styles.modalTitle}>Add Your Idea!</h1>

              <h2 className={styles.modalSubtitle}>What is your idea?</h2>
              <input
                className={styles.itemLinkInput} type="text"
                value={ideaPostSubmission.item}
                onChange={(e) => { setIdeaPostSubmission((prev: any) => ({ ...prev, item: e.target.value })); }
                } />

              <h2 className={styles.modalSubtitle}>Give a description</h2>

              <textarea className={styles.textarea}
                value={ideaPostSubmission.description}
                maxLength={300}
                onChange={(e) => {
                  setIdeaPostSubmission((prev: any) => ({ ...prev, description: e.target.value }))
                }}>
              </textarea>

              <h2 className={styles.modalSubtitle}>Link</h2>

              <input
                className={styles.itemLinkInput} type="text"
                value={ideaPostSubmission.itemLink}
                onChange={(e) => { setIdeaPostSubmission((prev: any) => ({ ...prev, itemLink: e.target.value })); }
                } />

              <div className={styles.addBtnContainer}>
                <button className={styles.addBtn} onClick={handleIdeaPostCreate}>
                  {submissionLoading ? 'loading...' : 'Add'}
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* <div className={styles.buttonControls}>
        <button className={styles.addBtn} onClick={() => { setShowAddItemModal(prev => !prev); }}>
          Add
        </button>
      </div> */}
        {ideaPosts?.map(ideaPost => {
          const isCurrentUserPost: boolean = currentUser.id === ideaPost.authorId
          const currentPost = test?.find(post => post.id === ideaPost.id)
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
                  {isCurrentUserPost && currentPost !== undefined
                    ? (
                      <div key={ideaPost.id}>
                        <textarea className={styles.textarea}
                          value={currentPost?.description}
                          maxLength={300}
                          onChange={(e) => {
                            /* On change, this will loop thru the currentUserIdeaPosts array, and change the description of the currentPost */
                            setTest(prev => prev.map(post => post.id === currentPost.id
                              ? {
                                ...post,
                                description: e.target.value
                              }
                              : post
                            ))
                          }}>

                        </textarea>
                        <h2>Link</h2>
                        <input
                          className={styles.itemLinkInput} type="text"
                          value={currentPost?.itemLink}
                          onChange={(e) => {
                            setTest(prev => prev.map(ideaPost => ideaPost.id === currentPost.id
                              ? {
                                ...ideaPost,
                                itemLink: e.target.value
                              }
                              : ideaPost
                            ))
                          }
                          } />
                        <div className={styles.bottomBtnsContainer}>
                          <button className={styles.deleteBtn} onClick={handleIdeaPostDelete(currentPost)}>Delete</button>
                          <button className={styles.save} onClick={handleIdeaPostUpdate(currentPost)}>Save</button>
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
              }
              key={ideaPost.id}
            />
          )
        })}

        <div className={styles.addAccordion} onClick={() => { setShowAddItemModal(!showAddItemModal); }}>
          <img src={addButton} className={styles.addButtonImg} />
        </div>

      </div>
    </>
  )
}
