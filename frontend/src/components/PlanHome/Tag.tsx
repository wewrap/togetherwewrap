import styles from './Tag.module.css'

export const Tag = ({ singleDataPoint, handleRemoveTag }: any) => {

  const handleClick = (): void => {
    handleRemoveTag(singleDataPoint)
  }
  return (
    <div>
      <div className={styles.tagWrapper}>
        <div className={styles.tagText}>{singleDataPoint.firstName}</div>
        <button className={styles.closeButton} onClick={handleClick}>&times;</button>
      </div>
    </div>
  )
}
