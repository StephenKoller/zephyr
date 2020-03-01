import React, { FC, SetStateAction, Dispatch, KeyboardEvent, ChangeEvent } from 'react'

interface Props {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string>>
  handleEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Searchbar: FC<Props> = ({ searchTerm, handleEnterKey, setSearchTerm, setError }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.checkValidity()) {
      setError('')
    } else {
      setError('Invalid search term: please use only letters in the search bar.')
    }
    return e.target.value
  }

  return (
    <div id="location-search">
      <img src="/wind-blowing-face.png" alt="wind blowing face" className="icon" />
      <label htmlFor="location-search" aria-hidden="false" style={{ display: 'none' }}>
        Location Search
      </label>
      <input
        type="text"
        name="location-search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
        pattern="[a-zA-Z\s]+"
        tabIndex={1}
        autoFocus
      />
      <style jsx>{`
        #location-search {
          margin: 0 auto;
          max-width: 524px;
          display: flex;
        }

        #location-search > input {
          flex: 0 1 auto;
          padding: 12px 14px 12px 62px;
          font-size: 30px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          background-color: #2e5689;
          color: #d7d7d7;
          box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
          line-height: 1.25;
          margin: 0;
          width: 100%;
          border-radius: 2px;
        }

        #location-search > input:invalid {
          border: red solid 3px;
        }

        #location-search > input:focus {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.45);
          outline: none;
        }

        #location-search > .icon {
          flex: 0 1 auto;
          width: 48px;
          height: 48px;
          margin: 6px -48px 0 0;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}

export default Searchbar
