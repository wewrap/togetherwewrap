import styles from './MembersList.module.css'
import { type Member } from './Plan'

type MemberProps = Member

export const Memberslist = ({
  leader,
  friends
}: MemberProps): JSX.Element => {
  return (
    <>
      <div className={styles.membersList}>
        <h3 id='members'>Members</h3>
        <ul className='members-accepted'>
          <li>leader: {leader}</li>
          {friends.map(friend => (
            <li key={friend.id}>{friend.firstName + friend.lastName}</li>
          ))}
        </ul>
        <h3 id="pending-invites">Pending invites: </h3>
        <ul className='members-pending'>
          <li>Nick</li>
          <li>Ana</li>
          <li>emily</li>
          <li>Ed</li>
        </ul>
      </div>
    </>
  )
}
