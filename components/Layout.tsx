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
        background: #2980b9; /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #ffffff, #6dd5fa, #2980b9) fixed; /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #ffffff, #6dd5fa, #2980b9) fixed; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        height: 100vh;
      }
    `}</style>
  </div>
)

export default Layout
