export default function Genre() {
  return (
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
  )
}
