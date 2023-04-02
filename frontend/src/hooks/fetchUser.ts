import { useState, useEffect } from 'react'
import axios from 'axios'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchUser = () => {
  const [user, setUser] = useState<any>(null)
  const [loadingStatus, setLoadingStatus] = useState<string>('unloaded')

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      try {
        setLoadingStatus('loading')
        const userDataResponse = await axios.get('http://localhost:8000/user-data', { withCredentials: true })
        setUser(userDataResponse.data)
        setLoadingStatus('loaded')
      } catch (error) {
        setLoadingStatus('error')
        console.log(error)
      }
    }
    void getUserData()
  }, [])

  return [user, loadingStatus]
}
