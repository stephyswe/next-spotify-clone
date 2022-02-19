import { useEffect } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Loader from '../../components/Loader'

export default function Signin({ providers }) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) router.push('/')
  }, [session])

  return (
    <div className="flex flex-col items-center space-y-8 pt-40">
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src="https://rb.gy/y9mwtb"
        height={250}
        width={600}
        objectFit="contain"
        className="animate-pulse"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="rounded-full bg-[#1db954] py-4 px-6 text-xs
             font-bold uppercase tracking-wider text-white transition duration-300 ease-out
             hover:scale-105 hover:bg-[#0db146] md:text-base"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
          {session && <Loader />}
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
