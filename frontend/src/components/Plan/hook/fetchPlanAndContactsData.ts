import { useEffect, useState } from 'react'
import { type Plan, type Contact, LoadStatus } from '../../../utils/types'
import axios from 'axios'

export const fetchPlanAndContactsData = (planIdParam: string): any => {
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)
  const [planData, setPlanData] = useState<Plan | undefined>(undefined)
  const [contactData, setContactData] = useState<Contact[] | undefined>(undefined)
  const [hasFetched, setHasFetched] = useState<boolean>(false)

  useEffect(() => {
    if (hasFetched) return
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(LoadStatus.LOADING)

        setPlanData(
          await axios.get(
            `/api/plan/${planIdParam}`,
            {
              withCredentials: true,
              signal: controller.signal
            })
            .then(res => res.data)
        )

        setContactData(
          await axios.get(
            '/api/contacts',
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
    void fetchPlanData();

    return () => {
      controller.abort();
    }
  }, [])

  return { planData, contactData, status }
}
