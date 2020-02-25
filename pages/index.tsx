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

  const handleSearchSubmit = () => {
    console.log(searchTerm)
  }

  return (
    <Layout>
      <h1>🌬 Zephyr</h1>
      <input
        type="text"
        placeholder="Location e.g. Ann Arbor"
        name="location-search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearchSubmit}>Search</button>
      <br />
      <style jsx>{`
        h1 {
          font-family: 'Caesar Dressing', Arial, sans-serif;
          color: #2e5689;
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage
