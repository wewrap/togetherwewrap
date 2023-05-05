import styles from './MemberList.module.css'

export const MemberList = ({
  members
}: any): JSX.Element => {
  return (
    <>
      <ul className={styles.memberUl}>
        {/* TODO: Fix this map function once this component receives the correct
        and established data between the frontend and backend  */}
        {members.map((member: {
          firstName: string
        }) => (
          <li>
            <div className={styles.memberContainer}>
              <p>{member.firstName}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
