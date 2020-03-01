import React, { FC, SetStateAction, Dispatch, KeyboardEvent, ChangeEvent } from 'react'

interface Props {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  setError: Dispatch<SetStateAction<string>>
  setSearchEnabled: Dispatch<SetStateAction<boolean>>
  handleEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void
}

const Searchbar: FC<Props> = ({ searchTerm, handleEnterKey, setSearchTerm, setError, setSearchEnabled }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    if (e.target.checkValidity()) {
      setError('')
      setSearchEnabled(true)
    } else {
      setError('Invalid search term: please use only letters in the search bar.')
      setSearchEnabled(false)
    }
    return e.target.value
  }

  return (
    <div id="location-search">
      <span className="icon">🌬</span>
      <input
        type="text"
        placeholder="Search for a location..."
        name="location-search"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
        pattern="[a-zA-Z\s]+"
      />
      <span className="icon reversed">🌬</span>
      <style jsx>{`
        #location-search {
          align-items: center;
          border-radius: 5px;
          border: 1px solid rgb(216, 216, 216);
          display: inline-flex;
          font-size: 0.875rem;
          height: 2.25rem;
          outline: currentcolor none 0px;
          padding: 0;
          transition: border 0.2s ease 0s;
          width: 320px;
          background-color: #fff;
        }

        #location-search > input {
          background-color: transparent;
          font-size: 1rem;
          display: flex;
          height: 100%;
          width: 100%;
          border: medium none;
          outline: currentcolor none 0px;
          padding: 0 0.5rem 0 0.5rem;
          text-align: center;
        }

        #location-search > input:invalid {
          border: red solid 3px;
        }

        .icon {
          font-size: 3rem;
        }

        .icon.reversed {
          -moz-transform: scale(-1, 1);
          -webkit-transform: scale(-1, 1);
          -o-transform: scale(-1, 1);
          -ms-transform: scale(-1, 1);
          transform: scale(-1, 1);
        }
      `}</style>
    </div>
  )
}

export default Searchbar
