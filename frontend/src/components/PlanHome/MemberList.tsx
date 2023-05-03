import styles from './MemberList.module.css'

export const MemberList = ({
  members
}: any): JSX.Element => {
  return (
    <>
      <ul className={styles.memberUl}>
        {members.map((member: any) => (
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
