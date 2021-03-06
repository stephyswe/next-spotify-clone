import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtom'

export default function RecentlyPlayed({ track, chooseTrack }) {
  const [play, setPlay] = useRecoilState(playState)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

  const handlePlay = () => {
    chooseTrack(track)

    if (track.uri === playingTrack.uri) {
      setPlay(!play)
    }
  }
  return (
    <div className="flex items-center space-x-3" onClick={handlePlay}>
      <img className="h-10 w-10 rounded-full" src={track.albumUrl} />
      <div>
        <h4
          className="mb-0.5 max-w-[150px] cursor-pointer truncate text-[13px] font-semibold
         text-white hover:underline"
        >
          {track.title}
        </h4>
        <p className="cursor-pointer text-xs font-semibold text-[#686868] hover:underline">
          {track.artist}
        </p>
      </div>
    </div>
  )
}
