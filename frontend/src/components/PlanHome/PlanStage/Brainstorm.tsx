import { Accordion } from './Accordion/Accordion'
import styles from './Brainstorm.module.css'

export const Brainstorm = (): JSX.Element => {
  const closeViewJSX: JSX.Element = (
    <div>
      This is closed
    </div>
  )

  const openViewJSX: JSX.Element = (
    <div>
        This is open
    </div>
  )

  return (
    <div className={styles.stageBackground}>
      <div className={styles.buttonControls}>
        <button>
          Add
        </button>
      </div>
      <Accordion title={closeViewJSX} content={openViewJSX}/>
    </div>
  )
}
