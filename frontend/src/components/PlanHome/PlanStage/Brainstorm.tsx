import styles from './Brainstorm.module.css'

export const Brainstorm = (): JSX.Element => {
  return (
    <div className={styles.stageBackground}>
      <div className={styles.buttonControls}>
        <button>
          Add
        </button>
      </div>
      <div>
        thing 1
      </div>
      <div>
        thing 2
      </div>
    </div>
  )
}
