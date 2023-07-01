import classNames from 'classnames'
import styles from './Voting.module.css'
import { fetchBrainStormData } from '../Brainstorm/fetchBrainStormData'
import { useEffect, useState } from 'react'
import { type BrainstormIdeaPost } from '../../../../utils/types'

export const Voting = ({ planID }: any): JSX.Element => {
  const [votePosts, setVotePosts] = useState<BrainstormIdeaPost[]>([])
  console.log('🚀 ~ file: Voting.tsx:10 ~ Voting ~ votePosts:', votePosts)
  const { ideaPostsData: votePostData } = fetchBrainStormData(planID)

  useEffect(() => {
    const sortedVotePosts = votePostData?.sort((a: any, b: any) => {
      if (a.voteCount > b.voteCount) {
        return 1;
      }
      return 0;
    })
    setVotePosts(sortedVotePosts)

  }, [votePostData])

  return (
    <div className={classNames(styles.scrollable, styles.stageBackground)}>
      {votePostData?.map((votePost: BrainstormIdeaPost) => {
        return (
          <div>
            {votePost.item}
          </div>
        )
      })}

    </div>
  )
}
