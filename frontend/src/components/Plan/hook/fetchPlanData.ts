import { useEffect, useState } from 'react'
import { loadingStatus } from '../../../utils/loadingStatus'
import axios from 'axios'

export const fetchPlanData = (planIdParams: any): any => {
  const [status, setStatus] = useState<loadingStatus>(loadingStatus.UNLOADED)
  const [data, setData] = useState<any>()

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(loadingStatus.LOADING)
        const response = await axios.get(
          `http://localhost:8000/api/planID/${planIdParams}`,
          {
            withCredentials: true,
            signal: controller.signal
          });
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
  }, [planIdParams])

  return [data, status]
}
