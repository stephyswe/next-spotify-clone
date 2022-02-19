import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Search from './Search'
import Poster from './Poster'

export default function Body({ chooseTrack, spotifyApi }) {
  const { data: session } = useSession()
  const accessToken = session.accessToken
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [newReleases, setNewReleases] = useState([])

  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  // Searching...
  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.album.images[0].url,
            popularity: track.popularity,
          }
        })
      )
    })
    return () => (cancel = true)
  }, [search, accessToken])

  // New Releases...
  useEffect(() => {
    if (!accessToken) return

    spotifyApi.getNewReleases().then((res) => {
      setNewReleases(
        res.body.albums.items.map((track) => {
          return {
            id: track.id,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: track.images[0].url,
          }
        })
      )
    })
  }, [accessToken])

  function bodyPoster(data = newReleases) {
    if (searchResults.length) data = searchResults.slice(0, 4)
    return (
      <>
        {data.map((track) => (
          <Poster key={track.id} track={track} chooseTrack={chooseTrack} />
        ))}
      </>
    )
  }

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <Search search={search} setSearch={setSearch} />
      <div className="grid h-96 grid-cols-1 gap-x-4 gap-y-8 overflow-y-scroll p-4 py-4 scrollbar-hide lg:grid-cols-3 xl:grid-cols-4">
        {bodyPoster()}
      </div>
    </section>
  )
}
