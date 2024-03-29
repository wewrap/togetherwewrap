import { useEffect, useState } from 'react'
import { type Plan, type Contact, LoadStatus, type User } from '../../../utils/types'
import axios from 'axios'

function localStringDateFormatter(dateInput: string) {
  const date = new Date(dateInput);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const localDateString = date.toLocaleDateString('en-US', options);
  return localDateString;
}

export const fetchPlanAndContactsData = (planIdParam: string, lastUpdate: number): any => {
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)
  const [planData, setPlanData] = useState<Plan | undefined>(undefined)
  const [contactData, setContactData] = useState<Contact[] | undefined>(undefined)
  const [membershipListData, setMembersListData] = useState<User[] | undefined>(undefined)

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(LoadStatus.LOADING)

        setPlanData(
          // TODO: add error handling when a user enters a planId in the url that isn't their plan
          await axios.get(
            `/api/plan/${planIdParam}`,
            {
              withCredentials: true,
              signal: controller.signal
            })
            .then(res => {

              res.data.startDate = localStringDateFormatter(res.data.startDate);
              res.data.endDate = localStringDateFormatter(res.data.endDate);

              return res.data
            })
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

        setMembersListData(
          await axios.get(
            `/api/memberList?planId=${planIdParam}`,
            {
              withCredentials: true,
              signal: controller.signal
            })
            .then(res => res.data)
        )

        setStatus(LoadStatus.LOADED);
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
  }, [lastUpdate])
  return { planData, contactData, setPlanData, status, membershipListData }
}
