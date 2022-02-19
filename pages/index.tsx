import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Loader from 'react-spinners/BeatLoader'
import Dashboard from '../components/Dashboard'

export default function Home() {
  const router = useRouter()
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth/signin')
    },
  })

  // Loading animation...
  if (status === 'loading') {
    return <Loader />
  }

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
