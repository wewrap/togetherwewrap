import { useContext, useState } from 'react'
import { FriendsContext } from '../../hooks/FriendsAndUserContext'
import Modal from '../Modal'
import { PlanForm } from '../PlanForm'
import styles from './Hub.module.css'

export const Hub = (): JSX.Element => {
  const [showPlanForm, setShowPlanForm] = useState<boolean>(false)

  const [data, loading] = useContext(FriendsContext)

  console.log(data, loading)

  return (
    <div>
      <button
        className={styles.planFormBtn}
        onClick={() => { setShowPlanForm(!showPlanForm); }}>Create plan
      </button>
      {showPlanForm
        ? <Modal>
          <PlanForm onCloseFunction={setShowPlanForm} />
        </Modal>
        : null}
    </div>
  )
}
