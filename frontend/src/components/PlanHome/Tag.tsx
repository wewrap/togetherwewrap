import { type Contact } from '../../utils/types'
import styles from './Tag.module.css'

interface Props {
  contact: Contact
  handleRemoveTag: (data: Contact) => void
}

export const Tag = ({ contact, handleRemoveTag }: Props) => {

  const handleClick = (): void => {
    handleRemoveTag(contact)
  }
  return (
    <div>
      <div className={styles.tagWrapper}>
        <div className={styles.tagText}>{contact.firstName} {contact?.lastName}</div>
        <button className={styles.closeButton} onClick={handleClick}>&times;</button>
      </div>
    </div>
  )
}
