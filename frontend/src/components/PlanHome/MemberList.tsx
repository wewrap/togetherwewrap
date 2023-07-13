import { type PlanMembership, type User } from '../../utils/types'
import styles from './MemberList.module.css'

interface MemberListProps {
  memberships: Array<PlanMembership & { user: User }>
}

export const MemberList = ({
  memberships
}: MemberListProps): JSX.Element => {
  return (
    <>
      <ul className={styles.memberUl}>
        {/* TODO: Fix this map function once this component receives the correct
        and established data between the frontend and backend  */}
        {memberships?.map((membership) => (
          <li key={membership.user.id}>
            <div className={styles.memberContainer}>
              <p>{membership.user.firstName} {membership.user.lastName}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
