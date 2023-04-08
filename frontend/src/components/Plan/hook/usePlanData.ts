import { useEffect, useState } from 'react'
import axios from 'axios'

export const usePlanData = ({ planIdParams }: any): any => {
  const [status] = useState<string>('unloaded')
  const [data] = useState<any>()
  useEffect(() => {
    void fetchPlanData()
  }, [])

  async function fetchPlanData (): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await axios.get(`http://localhost:8000/planID/${planIdParams}`, { withCredentials: true })
    } catch (err) {
      console.error(err)
    }
  }

  return [data, status]
}
