import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Search from './Search'

export default function Body({ spotifyApi }) {
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
      setSearchResults(res)
    })
  }, [search, accessToken])

  console.log(searchResults)

  return (
    <section className="ml-24 flex-grow space-y-8 bg-black py-4 md:mr-2.5 md:max-w-6xl">
      <Search search={search} setSearch={setSearch} />
      <div className="grid h-96 grid-cols-2 gap-x-4 gap-y-8 overflow-y-scroll p-4 py-4 scrollbar-hide lg:grid-cols-3 xl:grid-cols-4">
        BODY
      </div>
    </section>
  )
}
