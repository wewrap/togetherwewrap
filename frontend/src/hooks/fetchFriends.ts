import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadingStatus } from '../utils/loadingStatus';

export const fetchFriends = (): any => {
  const [status, setStatus] = useState<loadingStatus>(loadingStatus.NOT_LOADED)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const controller = new AbortController();
    const fetchPlanData = async (): Promise<void> => {
      try {
        setStatus(loadingStatus.LOADING)
        const response = await axios.get(
          '/api/friends',
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
  }, [])

  return [data, status]
}
