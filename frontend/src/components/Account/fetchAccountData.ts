import { useEffect, useState } from 'react'
import { LoadStatus } from '../../utils/types'
import axios from 'axios'

export const fetchAccountData = (accountIdParam: string): any => {
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(LoadStatus.LOADING)
        const response = await axios.get(
          `/api/account/${accountIdParam}`,
          {
            withCredentials: true,
            signal: controller.signal
          });
        setData(response.data);
        setStatus(LoadStatus.LOADED);
      } catch (err) {
        if (err === 'AbortError') {
          console.error('request cancelled')
        }
        setStatus(LoadStatus.FAILED);
        console.error(err);
      }
    }
    void fetchPlanData();

    return () => {
      controller.abort();
    }
  }, [])

  return [data, status]
}
