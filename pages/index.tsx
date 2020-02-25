import * as React from 'react'
import { useState } from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'

type Props = {
  suntimes: {
    sunrise: string
    sunset: string
  }
}

const IndexPage: NextPage<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      console.log(searchTerm)
    }
  }

  return (
    <Layout>
      <h1>Zephyr</h1>
      <div id="location-search">
        <span className="icon">🌬</span>
        <input
          type="text"
          placeholder="Search for a location..."
          name="location-search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterKey}
        />
        <span className="icon reversed">🌬</span>
      </div>
      <br />
      <style jsx>{`
        h1 {
          color: #2e5689;
          font-family: 'Caesar Dressing', Arial, sans-serif;
          font-size: 4rem;
          font-weight: 500;
          letter-spacing: 0.5rem;
          margin: 2rem 0 1rem 0;
        }

        #location-search {
          align-items: center;
          border-radius: 5px;
          border: 1px solid rgb(216, 216, 216);
          display: inline-flex;
          font-size: 0.875rem;
          height: 2.5rem;
          outline: currentcolor none 0px;
          padding: 0;
          transition: border 0.2s ease 0s;
          width: 100%;
        }

        #location-search > input {
          font-size: 1rem;
          display: flex;
          width: calc(100% - 2rem);
          height: 100%;
          border: medium none;
          outline: currentcolor none 0px;
          padding: 0 1rem 0 1rem;
          text-align: center;
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
    </Layout>
  )
}

export default IndexPage
