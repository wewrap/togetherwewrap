import axios from 'axios'
import { useEffect } from 'react'
import { useParams, redirect } from 'react-router-dom'

export const PlanInviteVerification = (): JSX.Element => {
  const { id: planInviteID } = useParams()
  // const navigate = useNavigate()

  useEffect(() => {
    const sendTokenToBackend = async () => {
      try {
        const response = await axios.get(`/verify-plan-invite/${planInviteID}`)
        return response
      } catch (error) {
        console.error(error)
        return error
      }
    }

    const THREE_SECONDS = 3000;

    const delayLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, THREE_SECONDS));
      sendTokenToBackend()
        .then((response: any) => {
          console.info(response)
          if (response.data.status === 'NOT_LOGGED_IN') {
            const planInviteID = response.data.planInviteID
            redirect(`/login/${planInviteID}`)
          } else if (response.data.status === 'LOGGED_IN_AND_EMAIL_MATCH') {
            const planID = response.data.planID
            redirect(`/plan/${planID}`)
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
      Loading...
    </div>
  )
}
