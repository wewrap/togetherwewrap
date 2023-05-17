import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const PlanInviteVerification = (): JSX.Element => {
  const { id: planInviteID } = useParams()
  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        const response = await axios.post(`/verify-plan-invite/${planInviteID}`)
        return response.data
      } catch (error) {
        console.error(error)
        return error
      }
    }
    sendTokenToBackend()
      .then((response) => {
        console.info(response)
      })
      .catch((response) => {
        console.error(`unable to verify token ${response}`)
      })
  }, [])
  return (
    <div>
      Loading...
    </div>
  )
}
