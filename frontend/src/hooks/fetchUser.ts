import { useState, useEffect } from 'react'
import { type User } from '../utils/types'
import axios from 'axios'

export const fetchUser = (): Array<string | User | null> => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<string>('unloaded')

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      setLoadingStatus('loading')
      const userDataResponse = await axios.get('http://localhost:8000/userData/1', { withCredentials: true })
      setUser(userDataResponse.data)
      setLoadingStatus('loaded')
    }

    getUserData()
      .catch(err => {
        setLoadingStatus('error')
        console.error(err)
      })
  }, [])

  return [user, loadingStatus]
}
