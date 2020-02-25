import * as React from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <h1>🌬 Zephyr</h1>

      <form action="POST">
        <input type="text" placeholder="Location e.g. Ann Arbor" name="location-search" />
        <button>Search</button>
      </form>

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
