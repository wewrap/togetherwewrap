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
      (search: any) => search.firstName.toLowerCase().includes(inputString)
    )

    setSearchResult(filteredSearchResult)
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
        onChange={handleQueryChange} />
      <div className={`${styles.searchResultContainer} ${styles.scrollable}`}>
        {query.length > 0 && (
          searchResult.map((contact: any) => (
            <button
              className={styles.searchResults}
              onClick={() => {
                handleSelect(contact)
              }}
              key={contact.firstName}>
              <div className={styles.name}> {contact.firstName} </div>
              <div className={styles.email}> {contact.email} </div>
            </button>))
        )}
      </div>
    </div>
  )
}
