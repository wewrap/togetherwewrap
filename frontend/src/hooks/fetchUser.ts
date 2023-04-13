import { useState, useEffect } from 'react'
import axios from 'axios'

export const fetchUser = (): any => {
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
        console.error(error)
      }
    }
    void getUserData()
  }, [])

  return [user, loadingStatus]
}
