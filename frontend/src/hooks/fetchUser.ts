import { useState, useEffect } from 'react'
import { type User } from '../utils/types'
import axios from 'axios'
import { LoadStatus } from '../utils/loadingStatus'

export const fetchUser = (): Array<string | User | null> => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      setLoadingStatus(LoadStatus.LOADING)
      const userDataResponse = await axios.get('http://localhost:8000/userData/1', { withCredentials: true })
      setUser(userDataResponse.data)
      setLoadingStatus(LoadStatus.LOADED)
    }

    getUserData()
      .catch(err => {
        setLoadingStatus(LoadStatus.FAILED)
        console.error(err)
      })
  }, [])

  return [user, loadingStatus]
}
