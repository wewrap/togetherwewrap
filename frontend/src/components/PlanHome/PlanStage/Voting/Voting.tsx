import classNames from 'classnames'
import styles from './Voting.module.css'
import { fetchBrainStormData } from '../Brainstorm/fetchBrainStormData'
import { useContext, useEffect, useState } from 'react'
import { type PlanMembership, type BrainstormIdeaPost, type User } from '../../../../utils/types'
import { Progress } from '@chakra-ui/react'
import axios from 'axios'
import { UserContext } from '../../../UserContext'

interface VotingProps {
  planID: string | undefined
  isCurrentPlanStage: boolean
}

export const Voting = ({ planID, isCurrentPlanStage }: VotingProps): JSX.Element => {
  const [votePosts, setVotePosts] = useState<BrainstormIdeaPost[]>([])
  const [planMemberList, setPlanMemberList] = useState<any[]>([])
  const [selectedVotePost, setSelectedVotePost] = useState<BrainstormIdeaPost | null>(null)
  const { ideaPostsData: votePostData } = fetchBrainStormData(planID)
  const currentUser = useContext(UserContext)[0]
  const totalMembers = planMemberList?.length
  const [currentUserVotedForPostID, setCurrentUserVotedForPostID] = useState<string | null>(null)

  useEffect(() => {
    const sortedVotePostsByVoteCount = votePostData.sort((post1, post2) => {
      if (post1.voteCount < post2.voteCount) {
        return 1
      }
      return -1
    })
    setVotePosts(sortedVotePostsByVoteCount)
  }, [votePostData])

  useEffect(() => {
    // get all plan members of the current plan
    const getMembershipList = async () => {
      try {
        const res = await axios.get(`/api/memberList?planId=${planID}`, {
          withCredentials: true
        })
        setPlanMemberList(res?.data)
        const currentUserPlanMembership = res?.data.find((planMembership: PlanMembership & { user: User }) => planMembership.user.id === currentUser.id)
        setCurrentUserVotedForPostID(currentUserPlanMembership.votedForPlanPostID)
      } catch (error) {
        console.error(error)
      }
    }

    void getMembershipList()
  }, [])

  const handleSubmitVote = async () => {
    if (selectedVotePost === null) {
      alert('Please select an item to vote for')
      return
    }
    try {
      const res = await axios.post(`/api/vote?planID=${planID}`, {
        selectedVotePost
      }, { withCredentials: true })
      setVotePosts(prev => prev.map(votePost => votePost.id === res.data.id ? { ...votePost, voteCount: res.data.voteCount } : votePost))
      setCurrentUserVotedForPostID('voted') // cheesey way to prevent user from voting again
    } catch (error) {
      console.error(error)
      alert('Error submitting vote, please try again')
    }
  }

  // TODO: Add logic for display which post did user voted for... if they voted, display that post w/ green border, and dont allow them to vote. If not, allow them to vote.

  return (
    <div className={classNames(styles.scrollable, styles.stageBackground)}>
      <section className={styles.votePostsSection}>
        {votePosts?.map((votePost: BrainstormIdeaPost) => {
          return (
            <div key={votePost.id}>
              <div
                className={classNames({
                  [styles.voteCardContainer]: true,
                  [styles.selectedVoteCard]: selectedVotePost?.id === votePost.id || currentUserVotedForPostID === votePost.id,
                  [styles.disableVoteCard]: currentUserVotedForPostID !== null
                })}
                onClick={() => {
                  if (currentUserVotedForPostID === null) {
                    console.log('trigger')
                    setSelectedVotePost(votePost)
                  }
                }}
                id={votePost.id}
              >
                <div>
                  <h2> {votePost.item}</h2>
                </div>
                <div>
                  <Progress height='20px' value={(votePost.voteCount / totalMembers) * 100} />
                </div>
                <div className={styles.user}>
                  <p>{votePost.firstName} {votePost.lastName}</p>
                </div>
              </div>
            </div>
          )
        })}
      </section>
      {isCurrentPlanStage &&
        <section className={styles.submitSection}>
          {currentUserVotedForPostID !== null
            ? <p>You have voted, please wait patiently.</p>
            : <button className={styles.submitVote} onClick={handleSubmitVote}>Submit Vote</button>
          }
        </section>
      }
    </div>
  )
}
