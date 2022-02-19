export const SongList = ({ Element, unlimited, data, chooseTrack }) => {
  let songData = data
  if (!unlimited) songData = data.slice(0, 4)
  return songData.map((track) => (
    <Element key={track.id} track={track} chooseTrack={chooseTrack} />
  ))
}
