
import styles from './Pool.module.css'
interface PoolProps {
  planID: string | undefined
}

export const Pool = ({ planID }: PoolProps): JSX.Element => {
  return (
    <div className={styles.stageBackground}>
      <p>Pool</p>
    </div>
  )
}
