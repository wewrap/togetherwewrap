/*
  This component is to display a request message for the user to log in or sign up before accepting a plan invitation
*/
export const PlanInviteLogInRequest = () => {
  const style = {
    padding: '20px',
    marginTop: '40px',
    fontSize: '40px',
    marginLeft: '400px'
  }
  return (
    <>
      <h3 style={style}>Please login or sign up before accepting a plan invitation</h3>
    </>
  )
}
