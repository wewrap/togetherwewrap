import { useEffect, useState } from 'react'
import { type BrainstormIdeaPost, LoadStatus } from '../../../../utils/types'
import axios from 'axios'

export const fetchBrainStormData = (planID: string) => {
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)
  const [ideaPostsData, setIdeaPostsData] = useState<BrainstormIdeaPost[] | undefined>(undefined)
  const [hasFetched, setHasFetched] = useState<boolean>(false)

  useEffect(() => {
    if (hasFetched) return
    const controller = new AbortController();
    const fetchData = async (): Promise<void> => {
      try {
        setStatus(LoadStatus.LOADING)

        setIdeaPostsData(
          await axios.get(
            `/api/brainstorm/${planID}}`,
            {
              withCredentials: true,
              signal: controller.signal
            })
            .then(res => res.data)
        )

        setStatus(LoadStatus.LOADED);
        setHasFetched(true)
      } catch (err) {
        if (err === 'AbortError') {
          console.error('request cancelled')
        }
        console.error(err);
        setStatus(LoadStatus.FAILED);
      }
    }
    void fetchData();

    return () => {
      controller.abort();
    }
  }, [])

  return { status, ideaPostsData }
}
