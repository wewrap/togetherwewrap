import styles from './MembersList.module.css'

interface Props {
  leader: string
  friends: string[]
}

export const Memberslist = ({
  leader,
  friends
}: Props): JSX.Element => {
  return (
    <>
      <div className={styles.members_list}>
        <h3 id='members'>Members</h3>
        <ul className='members-accepted'>
          <li>leader: {leader}</li>
          {friends.map(friend => (
            <li key={friend}>{friend}</li>
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
