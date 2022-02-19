import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'
import { playingTrackState } from '../atoms/playerAtom'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

export default function Dashboard() {
  const { data: session } = useSession()
  const accessToken = session.accessToken
  const [init, setInit] = useState(false)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    setInit(true)
  }, [accessToken])

  const chooseTrack = (track) => {
    setPlayingTrack(track)
  }

  if (!init) return <div>Loading</div>

  return (
    <main className="flex min-h-screen min-w-max bg-black">
      <Sidebar />
      <Body
        spotifyApi={spotifyApi}
        chooseTrack={chooseTrack}
        accessToken={accessToken}
      />
      <Right />
    </main>
  )
}
