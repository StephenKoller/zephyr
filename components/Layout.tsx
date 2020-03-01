import * as React from 'react'
import Head from 'next/head'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({ children, title = '🌬 Zephyr' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="description" content="weather forecast for drone pilots" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Caesar+Dressing&display=swap" />
      <link rel="stylesheet" href="//unpkg.com/spectre.css/dist/spectre.min.css" />
    </Head>
    <header></header>
    <main>{children}</main>

    <style jsx global>{`
      body {
        display: flex;
        justify-content: center;
        text-align: center;
      }
    `}</style>
  </div>
)

export default Layout
