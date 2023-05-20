import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PlanInviteVerification = (): JSX.Element => {
  const { id: planInviteID } = useParams()
  const [isWrongEmail, setIsWrongEmail] = useState<boolean>(false)

  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        const response = await axios.get(`/verify-plan-invite/${planInviteID}`, { withCredentials: true })
        return response
      } catch (error) {
        console.error(error)
        return error
      }
    }

    const TWO_SECONDS = 2000;

    const delayLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, TWO_SECONDS));
      sendTokenToBackend()
        .then((response: any) => {
          switch (response.data.reason) {
            case 'NOT_LOGGED_IN':
              const planInviteID = response.data.planInviteID
              window.location.href = `/login/${planInviteID}`
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
    };

    void delayLoading();

  }, [])
  return (
    <div>
      {isWrongEmail ? <h1> Unauthorized acess: Log into the correct account email </h1> : <h1>Loading...</h1>}
    </div>
  )
}
