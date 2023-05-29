import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PlanInviteVerification = (): JSX.Element => {
  const { id: planInviteID } = useParams()
  const [isWrongEmail, setIsWrongEmail] = useState<boolean>(false)

  useEffect(() => {
    const sendPlanInviteIdForVerification = async () => {
      try {
        const response = await axios.get(`/verify-plan-invite/${planInviteID}`, { withCredentials: true })
        return response
      } catch (error) {
        console.error(error ?? 'unnknown error')
        return error
      }
    }

    sendPlanInviteIdForVerification()
      .then((response: any) => {
        // redirect the user based on server planInviteID verification
        switch (response.data.reason) {
          case 'NOT_LOGGED_IN':
            window.location.href = '/plan-invite-login-request'
            break;
          case 'USER_ALREADY_A_PLAN_MEMBER':
          case 'LOGGED_IN_AND_EMAIL_MATCH':
            const planID = response.data.planID
            window.location.href = `/plan/${planID}`
            break;
          case 'LOGGED_IN_AND_EMAIL_DONT_MATCH':
            setIsWrongEmail(true)
            break;
        }
      })
      .catch((response) => {
        console.error(`unable to verify token ${response}`)
      })
  }, [])

  const style = {
    padding: '20px',
    marginTop: '40px',
    fontSize: '40px',
    marginLeft: '200px'
  }
  return (
    <div>
      {isWrongEmail
        ? <h3 style={style}> Unauthorized access: Please log into the account with the correct email address to join the plan. </h3>
        : <h1 style={style}>Loading...</h1>}
    </div>
  )
}
