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
    <footer>
      <hr />
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
    </footer>

    <style jsx global>{`
      body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        text-align: center;
      }

      main {
        width: 320px;
      }
    `}</style>
  </div>
)

export default Layout
