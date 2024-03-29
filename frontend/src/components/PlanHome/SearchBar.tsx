import { useState } from 'react'
import { type Contact } from '../../utils/types'
import styles from './SearchBar.module.css'
import classNames from 'classnames'
classNames()

interface SearchBarProps {
  handleSelectChangeFn: (data: Contact) => void
  data: Contact[]
  alreadySelectedData: Contact[]
}

export const SearchBar = ({
  handleSelectChangeFn,
  data,
  alreadySelectedData
}: SearchBarProps): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Contact[]>(data)

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString: string = event.target.value
    setQuery(inputString)

    const filteredSearchByQuery = data.filter(
      (contact: Contact) => contact.email.toLowerCase().startsWith(inputString)
    )

    const filteredSearchByAlreadySelected = filteredSearchByQuery.filter(
      (contact: Contact) => !alreadySelectedData.includes(contact)
    )

    setSearchResult(filteredSearchByAlreadySelected)
  }

  const handleClearResults = () => {
    setQuery('')
  }

  const handleSelect = (contact: Contact) => {
    if (alreadySelectedData.includes(contact)) {
      return
    }
    handleSelectChangeFn(contact)
  }
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search by contact email"
        className={styles.searchBar}
        onChange={handleQueryChange}
        value={query}>
      </input>
        {query.length > 0 &&
          <button className={styles.clear} onClick={handleClearResults}>clear</button>
        }
      <div className={classNames(styles.searchResultContainer, styles.scrollable)}>
        {query.length > 0 &&
          searchResult.map((contact: Contact) => (
            <button
              className={styles.searchResults}
              onClick={() => {
                handleSelect(contact)
                handleClearResults()
              }}
              key={contact.firstName}>
              <div className={styles.name}> {contact.firstName} {contact?.lastName}</div>
              <div className={styles.email}> {contact.email} </div>
            </button>))
        }
      </div>
    </div>
  )
}
