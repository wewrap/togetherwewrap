import { type User } from '../../utils/types'
import styles from './MemberList.module.css'

interface MemberListProps {
  members: User[]
}

export const MemberList = ({
  members
}: MemberListProps): JSX.Element => {
  return (
    <>
      {/* <ul className={styles.memberUl}>
        {members?.map((member: User) => (
          <li key={member.id}>
            <div className={styles.memberContainer}>
              <p>{member.firstName} {member.lastName}</p>
            </div>
          </li>
        ))}
      </ul> */}
    </>
  )
}
