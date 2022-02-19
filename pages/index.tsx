import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </div>
  )
}
