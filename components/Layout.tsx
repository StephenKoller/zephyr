import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title = '🌬 Zephyr' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css?family=Caesar+Dressing&display=swap" rel="stylesheet" />
    </Head>
    <header></header>
    <main>{children}</main>

    <style jsx global>{`
      html {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Tahoma, Arial, sans-serif;
      }

      body {
        display: flex;
        justify-content: center;
        text-align: center;
      }
    `}</style>
  </div>
)

export default Layout
