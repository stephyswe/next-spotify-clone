import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'
import Player from './Player'
import { playingTrackState } from '../atoms/playerAtom'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

export default function Dashboard() {
  const { data: session } = useSession()
  const accessToken = session.accessToken
  const [init, setInit] = useState(false)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
  const [showPlayer, setShowPlayer] = useState(true)

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
    setInit(true)
  }, [accessToken])

  useEffect(() => {
    setShowPlayer(true)
  }, [])

  const chooseTrack = (track) => {
    setPlayingTrack(track)
  }

  if (!init) return <div>Loading</div>

  return (
    <main className="flex min-h-screen min-w-max bg-black">
      <Sidebar />
      <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
      <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />

      {showPlayer && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri} />
        </div>
      )}
    </main>
  )
}
