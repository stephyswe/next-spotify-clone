import SpotifyWebApi from 'spotify-web-api-node'
import Sidebar from './Sidebar'
import Body from './Body'
import Right from './Right'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
})

export default function Dashboard() {
  return (
    <main className="flex min-h-screen min-w-max bg-black">
      <Sidebar />
      <Body spotifyApi={spotifyApi} />
      <Right />
    </main>
  )
}
