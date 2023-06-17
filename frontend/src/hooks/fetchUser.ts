import { useState, useEffect } from 'react'
import { LoadStatus, type User } from '../utils/types'
import axios from 'axios'

export const fetchUser = (): Array<string | User | null> => {
  const [user, setUser] = useState<User | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<LoadStatus>(LoadStatus.NOT_LOADED)

  useEffect(() => {
    const getUserData = async (): Promise<void> => {
      setLoadingStatus(LoadStatus.LOADING)
      const userDataResponse = await axios.get('/userData/1', { withCredentials: true })
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
