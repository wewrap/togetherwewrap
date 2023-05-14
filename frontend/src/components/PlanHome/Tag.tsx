import { type Contact } from '../../utils/types'
import styles from './Tag.module.css'

interface Props {
  data: Contact
  handleRemoveTag: (data: Contact) => void
}

export const Tag = ({ data, handleRemoveTag }: Props) => {

  const handleClick = (): void => {
    handleRemoveTag(data)
  }
  return (
    <div>
      <div className={styles.tagWrapper}>
        <div className={styles.tagText}>{data.firstName}</div>
        <button className={styles.closeButton} onClick={handleClick}>&times;</button>
      </div>
    </div>
  )
}
