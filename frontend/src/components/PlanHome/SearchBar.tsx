import { useState } from 'react'
import { type Contact } from '../../utils/types'
import styles from './SearchBar.module.css'

interface Props {
  handleSelectChangeFn: (data: Contact) => void
  data: Contact[]
  alreadySelectedData: Contact[]
}

export const SearchBar = ({
  handleSelectChangeFn,
  data,
  alreadySelectedData
}: Props): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Contact[]>(data)

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString: string = event.target.value
    setQuery(inputString)

    const filteredSearchResult = data.filter(
      (contact: Contact) => contact.email.toLowerCase().startsWith(inputString)
    )

    setSearchResult(filteredSearchResult)
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
        value={query}/>
      {query.length > 0 &&
        <button className={styles.clear} onClick={handleClearResults}>clear</button>
      }
      <div className={`${styles.searchResultContainer} ${styles.scrollable}`}>
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
