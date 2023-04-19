import { useEffect, useState } from 'react'
import { loadingStatus } from '../../../utils/loadingStatus'
import axios from 'axios'

export const fetchPlanData = (planIdParam: string): any => {
  const [status, setStatus] = useState<loadingStatus>(loadingStatus.NOT_LOADED)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(loadingStatus.LOADING)
        const response = await axios.get(
          `http://localhost:8000/api/plan/${planIdParam}`,
          {
            withCredentials: true,
            signal: controller.signal
          });
        console.log(response.data)
        setData(response.data);
        setStatus(loadingStatus.LOADED);
      } catch (err) {
        if (err === 'AbortError') {
          console.error('request cancelled')
        }
        setStatus(loadingStatus.FAILED);
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
