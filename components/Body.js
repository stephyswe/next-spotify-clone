import { useEffect, useState } from 'react'
import Search from './Search'
import Poster from './Poster'
import Track from './Track'

export default function Body({ chooseTrack, spotifyApi }) {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [newReleases, setNewReleases] = useState([])

  // Searching...
  useEffect(() => {
    if (!search) return setData([])
    let cancel = false

    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return

      setData(
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
  }, [search, spotifyApi])

  // New Releases...
  useEffect(() => {
    spotifyApi.getNewReleases().then((res) => {
      const data = res.body.albums.items.map((track) => {
        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.images[0].url,
        }
      })
      setData(data)
      setNewReleases(data)
    })
  }, [spotifyApi])

  const SongList = ({ Element, unlimited }) => {
    let songData = data
    if (!search) setData(newReleases)
    if (!unlimited) songData = data.slice(0, 4)
    return songData.map((track) => (
      <Element key={track.id} track={track} chooseTrack={chooseTrack} />
    ))
  }

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <Search search={search} setSearch={setSearch} />
      <div
        className="grid h-96 grid-cols-1 gap-x-4 gap-y-8 overflow-y-scroll 
      p-4 py-4 scrollbar-hide sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
      >
        <SongList Element={Poster} />
      </div>

      <div className="absolute ml-6 flex min-w-full gap-x-8 md:relative">
        {/* Genres */}
        <div className="hidden max-w-[270px] xl:inline">
          <h2 className="mb-3 font-bold text-white">Genres</h2>
          <div className="mb-3 flex flex-wrap gap-x-2 gap-y-2.5">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
          </div>
          <button className="btn">All Genres</button>
        </div>

        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="mb-3 font-bold text-white">
            {search && data ? 'Tracks' : 'New Releases'}
          </h2>
          <div
            className="scrollbar-thumb-rounded h-[200px] w-[250px] space-y-3 overflow-y-scroll rounded-2xl border-2 border-[#262626] 
          bg-[#0D0D0D] p-3 scrollbar-thin scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500 sm:h-[200px]
           sm:w-full md:h-96 md:w-full lg:w-full"
          >
            <SongList Element={Track} unlimited />
          </div>
        </div>
      </div>
    </section>
  )
}
