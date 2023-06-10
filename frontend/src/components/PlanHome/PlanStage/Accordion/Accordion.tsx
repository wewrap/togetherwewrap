import { useState } from 'react'
import styles from './Accordion.module.css'
import classNames from 'classnames'

export interface AccordionProps {
  title: JSX.Element
  content: JSX.Element
  width?: string | number
  height?: string | number
}

export const Accordion = ({
  title,
  content
}: AccordionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  // TODO: Add dynamic height to content based on content size
  return (
    <div className={
      classNames({
        [styles.accordion]: true,
        [styles.accordionOpen]: isOpen
      })
    }>
      <div className={styles.title} onClick={() => { setIsOpen(!isOpen); }}>
        {title}
        <button> open </button>
      </div>
      {isOpen && (
        <div className={styles.content}>
          {content}
        </div>
      )}
    </div>
  )
}
